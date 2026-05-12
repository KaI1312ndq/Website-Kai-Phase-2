-- Applied via Supabase MCP 2026-05-12.
-- Lightweight first-party pageview tracking cho admin analytics.

create table if not exists public.pageviews (
  id          bigserial primary key,
  path        text not null,
  referrer    text,
  user_id     text references public.users(id) on delete set null,
  session_id  text,
  country     text,
  device      text,
  created_at  timestamptz not null default now()
);
create index if not exists pageviews_path_created_idx on public.pageviews(path, created_at desc);
create index if not exists pageviews_created_idx on public.pageviews(created_at desc);

alter table public.pageviews enable row level security;

drop policy if exists "anon insert pageviews" on public.pageviews;
create policy "anon insert pageviews" on public.pageviews
  for insert with check (true);
