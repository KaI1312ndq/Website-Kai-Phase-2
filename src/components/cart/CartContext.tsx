"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { calculatePrice } from "@/lib/payment/config";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image?: string;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  has: (id: string) => boolean;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  toggle: (item: CartItem) => void;
  clear: () => void;
  pricing: ReturnType<typeof calculatePrice> | null;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  syncing: boolean;
  hydrated: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "ndq_cart_v1";
const SYNC_DEBOUNCE_MS = 800;

function dedupeById(items: CartItem[]) {
  const seen = new Set<string>();
  const out: CartItem[] = [];
  for (const i of items) {
    if (!i || !i.id || seen.has(i.id)) continue;
    seen.add(i.id);
    out.push({ id: i.id, slug: i.slug || "", title: i.title || "", price: Number(i.price) || 0, ...(i.image ? { image: i.image } : {}) });
  }
  return out;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = user?.id || null;
  const mergedForUserRef = useRef<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1) Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(dedupeById(parsed));
      }
    } catch {}
    setHydrated(true);
  }, []);

  // 2) When user signs in, merge server cart with local cart (server wins on conflict — most recent device)
  //    Then on subsequent local changes, push to server (debounced).
  useEffect(() => {
    if (!hydrated || !isLoaded) return;
    if (!isSignedIn || !userId) {
      mergedForUserRef.current = null;
      return;
    }
    if (mergedForUserRef.current === userId) return; // already merged this session

    let cancelled = false;
    (async () => {
      setSyncing(true);
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!cancelled && res.ok) {
          const data = await res.json();
          const remote: CartItem[] = Array.isArray(data?.items) ? data.items : [];
          // Merge: union by id, prefer remote fields when duplicated
          setItems((local) => {
            const map = new Map<string, CartItem>();
            for (const i of local) map.set(i.id, i);
            for (const i of remote) map.set(i.id, i);
            return dedupeById(Array.from(map.values()));
          });
        }
      } catch {}
      mergedForUserRef.current = userId;
      setSyncing(false);
    })();

    return () => { cancelled = true; };
  }, [hydrated, isLoaded, isSignedIn, userId]);

  // 3) Persist to localStorage on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  // 4) Debounced push to server when signed in (skip until initial merge done)
  useEffect(() => {
    if (!hydrated || !isSignedIn || !userId) return;
    if (mergedForUserRef.current !== userId) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
        keepalive: true,
      }).catch(() => {});
    }, SYNC_DEBOUNCE_MS);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [items, hydrated, isSignedIn, userId]);

  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);
  const add = useCallback((item: CartItem) => {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  }, []);
  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);
  const toggle = useCallback((item: CartItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item]
    );
  }, []);
  const clear = useCallback(() => setItems([]), []);

  const pricing = useMemo(() => (items.length > 0 ? calculatePrice(items.length) : null), [items]);

  const value: CartContextType = {
    items,
    count: items.length,
    has,
    add,
    remove,
    toggle,
    clear,
    pricing,
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    syncing,
    hydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
