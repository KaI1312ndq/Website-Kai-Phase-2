-- Applied via Supabase MCP 2026-05-12.
-- CV Builder tool tables.

create table if not exists public.cv_drafts (
  id          uuid primary key default uuid_generate_v4(),
  user_id     text not null references public.users(id) on delete cascade,
  data        jsonb not null default '{}'::jsonb,
  template    text default 'ats',
  ai_feedback jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists cv_drafts_user_idx on public.cv_drafts(user_id, updated_at desc);

create table if not exists public.cv_user_quota (
  user_id              text primary key references public.users(id) on delete cascade,
  free_downloads_used  int not null default 0,
  is_pro               boolean not null default false,
  pro_purchased_at     timestamptz,
  ai_feedback_used     int not null default 0,
  updated_at           timestamptz not null default now()
);

create table if not exists public.cv_downloads (
  id          uuid primary key default uuid_generate_v4(),
  user_id     text not null references public.users(id) on delete cascade,
  cv_id       uuid references public.cv_drafts(id) on delete set null,
  template    text,
  is_pro      boolean default false,
  created_at  timestamptz not null default now()
);
create index if not exists cv_downloads_user_idx on public.cv_downloads(user_id, created_at desc);

create table if not exists public.cv_purchases (
  id          uuid primary key default uuid_generate_v4(),
  user_id     text not null references public.users(id) on delete cascade,
  amount      numeric(12,2) not null,
  payment_method text,
  payment_ref text,
  status      text not null default 'pending',
  created_at  timestamptz not null default now(),
  paid_at     timestamptz
);
create index if not exists cv_purchases_user_idx on public.cv_purchases(user_id);

alter table public.cv_drafts        enable row level security;
alter table public.cv_user_quota    enable row level security;
alter table public.cv_downloads     enable row level security;
alter table public.cv_purchases     enable row level security;

drop trigger if exists cv_drafts_touch on public.cv_drafts;
create trigger cv_drafts_touch before update on public.cv_drafts
  for each row execute function public.touch_updated_at();

drop trigger if exists cv_quota_touch on public.cv_user_quota;
create trigger cv_quota_touch before update on public.cv_user_quota
  for each row execute function public.touch_updated_at();
