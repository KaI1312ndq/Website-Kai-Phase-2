-- Phase 2: user data tables (chạy 1 lần trong Supabase SQL Editor)
-- Content (blog, quiz definitions, products, vouchers, testimonials) vẫn ở Sanity.

create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- 1. users (sync từ Clerk webhook user.created / user.updated)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.users (
  id           text primary key,                  -- Clerk user_id (string)
  email        text not null unique,
  name         text,
  phone        text,
  avatar_url   text,
  role         text default 'student',            -- student | manager | admin
  school       text,
  industry     text,
  metadata     jsonb default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists users_email_idx on public.users(email);

-- ─────────────────────────────────────────────────────────────
-- 2. orders + order_items
-- ─────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id              uuid primary key default uuid_generate_v4(),
  order_number    text not null unique,
  user_id         text references public.users(id) on delete set null,
  customer_email  text not null,
  customer_name   text not null,
  customer_phone  text,
  status          text not null default 'pending', -- pending|paid|delivered|cancelled|refunded
  payment_method  text,                            -- bank|momo|cod|free
  payment_status  text default 'unpaid',           -- unpaid|paid|refunded
  subtotal        numeric(12,2) not null default 0,
  discount        numeric(12,2) not null default 0,
  total           numeric(12,2) not null default 0,
  voucher_code    text,
  shipping_addr   jsonb,
  notes           text,
  meta            jsonb default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  paid_at         timestamptz,
  delivered_at    timestamptz
);
create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_created_idx on public.orders(created_at desc);

create table if not exists public.order_items (
  id                  uuid primary key default uuid_generate_v4(),
  order_id            uuid not null references public.orders(id) on delete cascade,
  product_sanity_id   text not null,
  title_snapshot      text not null,
  price_snapshot      numeric(12,2) not null,
  qty                 int not null default 1,
  meta                jsonb default '{}'::jsonb,
  created_at          timestamptz not null default now()
);
create index if not exists order_items_order_idx on public.order_items(order_id);

-- ─────────────────────────────────────────────────────────────
-- 3. carts (1 cart per user, items as JSONB)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.carts (
  user_id     text primary key references public.users(id) on delete cascade,
  items       jsonb not null default '[]'::jsonb,
  updated_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- 4. comments (UGC on blog posts)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.comments (
  id              uuid primary key default uuid_generate_v4(),
  post_sanity_id  text not null,                  -- Sanity post _id
  user_id         text references public.users(id) on delete set null,
  guest_name      text,                           -- fallback nếu không login
  guest_email     text,
  parent_id       uuid references public.comments(id) on delete cascade,
  body            text not null,
  approved        boolean not null default false,
  created_at      timestamptz not null default now()
);
create index if not exists comments_post_idx on public.comments(post_sanity_id) where approved = true;
create index if not exists comments_user_idx on public.comments(user_id);

-- ─────────────────────────────────────────────────────────────
-- 5. product_reviews
-- ─────────────────────────────────────────────────────────────
create table if not exists public.product_reviews (
  id                  uuid primary key default uuid_generate_v4(),
  product_sanity_id   text not null,
  user_id             text references public.users(id) on delete set null,
  order_id            uuid references public.orders(id) on delete set null,
  rating              int not null check (rating between 1 and 5),
  body                text,
  approved            boolean not null default false,
  created_at          timestamptz not null default now()
);
create index if not exists product_reviews_product_idx on public.product_reviews(product_sanity_id) where approved = true;

-- ─────────────────────────────────────────────────────────────
-- 6. quiz_results + quiz_leads
-- ─────────────────────────────────────────────────────────────
create table if not exists public.quiz_results (
  id          uuid primary key default uuid_generate_v4(),
  user_id     text references public.users(id) on delete set null,
  session_id  text,                              -- cho anonymous flow
  quiz_slug   text not null,
  answers     jsonb not null,
  archetype   text,
  scores      jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists quiz_results_user_idx on public.quiz_results(user_id);
create index if not exists quiz_results_quiz_idx on public.quiz_results(quiz_slug);

create table if not exists public.quiz_leads (
  id              uuid primary key default uuid_generate_v4(),
  email           text,
  phone           text,
  name            text not null,
  quiz_slug       text not null,
  quiz_name       text,
  result_type     text,
  scores          jsonb,
  source          text,
  utm             jsonb,
  ip_hash         text,
  created_at      timestamptz not null default now(),
  check (email is not null or phone is not null)
);
create index if not exists quiz_leads_email_idx on public.quiz_leads(email);
create index if not exists quiz_leads_quiz_idx on public.quiz_leads(quiz_slug);

-- ─────────────────────────────────────────────────────────────
-- 7. newsletter_subscribers
-- ─────────────────────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id              uuid primary key default uuid_generate_v4(),
  email           text not null unique,
  source          text,
  tags            text[] default '{}',
  subscribed      boolean not null default true,
  created_at      timestamptz not null default now(),
  unsubscribed_at timestamptz
);
create index if not exists newsletter_subscribed_idx on public.newsletter_subscribers(subscribed) where subscribed = true;

-- ─────────────────────────────────────────────────────────────
-- 8. voucher_usage (vouchers definitions ở Sanity, usage ở Postgres)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.voucher_usage (
  id              uuid primary key default uuid_generate_v4(),
  voucher_code    text not null,
  user_id         text references public.users(id) on delete set null,
  order_id        uuid references public.orders(id) on delete cascade,
  discount_amount numeric(12,2) not null default 0,
  used_at         timestamptz not null default now()
);
create index if not exists voucher_usage_code_idx on public.voucher_usage(voucher_code);
create index if not exists voucher_usage_user_idx on public.voucher_usage(user_id);

-- ─────────────────────────────────────────────────────────────
-- 9. course_applications (move từ course-apply route)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.course_applications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     text references public.users(id) on delete set null,
  course_slug text not null,
  name        text not null,
  email       text not null,
  phone       text,
  motivation  text,
  experience  text,
  status      text default 'pending', -- pending|approved|rejected|enrolled
  meta        jsonb default '{}'::jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists course_apps_course_idx on public.course_applications(course_slug);

-- ─────────────────────────────────────────────────────────────
-- updated_at triggers
-- ─────────────────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists users_touch on public.users;
create trigger users_touch before update on public.users
  for each row execute function public.touch_updated_at();

drop trigger if exists carts_touch on public.carts;
create trigger carts_touch before update on public.carts
  for each row execute function public.touch_updated_at();

-- ─────────────────────────────────────────────────────────────
-- RLS: tạm thời TẮT hết (server-side service_role write all)
-- Bật sau khi setup Clerk JWT bridge xong
-- ─────────────────────────────────────────────────────────────
alter table public.users                  enable row level security;
alter table public.orders                 enable row level security;
alter table public.order_items            enable row level security;
alter table public.carts                  enable row level security;
alter table public.comments               enable row level security;
alter table public.product_reviews        enable row level security;
alter table public.quiz_results           enable row level security;
alter table public.quiz_leads             enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.voucher_usage          enable row level security;
alter table public.course_applications    enable row level security;

-- Policy: service_role bypass tất cả (luôn có sẵn, không cần khai báo)
-- Anon read public approved comments + reviews:
create policy "anon read approved comments" on public.comments
  for select using (approved = true);
create policy "anon read approved reviews" on public.product_reviews
  for select using (approved = true);

-- Anon insert quiz_leads + newsletter (capture lead không cần auth):
create policy "anon insert quiz leads" on public.quiz_leads
  for insert with check (true);
create policy "anon insert newsletter" on public.newsletter_subscribers
  for insert with check (true);
create policy "anon insert quiz results" on public.quiz_results
  for insert with check (true);

-- Authenticated user (qua Clerk JWT 'sub' claim) đọc/sửa data của chính mình:
create policy "user reads own profile" on public.users
  for select using (auth.jwt() ->> 'sub' = id);
create policy "user updates own profile" on public.users
  for update using (auth.jwt() ->> 'sub' = id);
create policy "user reads own orders" on public.orders
  for select using (auth.jwt() ->> 'sub' = user_id);
create policy "user reads own cart" on public.carts
  for all using (auth.jwt() ->> 'sub' = user_id);
create policy "user reads own quiz results" on public.quiz_results
  for select using (auth.jwt() ->> 'sub' = user_id);
