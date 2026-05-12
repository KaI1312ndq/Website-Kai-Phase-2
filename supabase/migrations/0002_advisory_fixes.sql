-- Applied via Supabase MCP 2026-05-12.
-- Fix advisory warnings:
--   1. touch_updated_at search_path mutable
--   2. RLS-enabled-no-policy cho course_applications, order_items, voucher_usage

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop policy if exists "anon insert course apps" on public.course_applications;
create policy "anon insert course apps" on public.course_applications
  for insert with check (true);
drop policy if exists "user reads own course apps" on public.course_applications;
create policy "user reads own course apps" on public.course_applications
  for select using (auth.jwt() ->> 'sub' = user_id);

drop policy if exists "user reads own order items" on public.order_items;
create policy "user reads own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and o.user_id = auth.jwt() ->> 'sub'
    )
  );

drop policy if exists "user reads own voucher usage" on public.voucher_usage;
create policy "user reads own voucher usage" on public.voucher_usage
  for select using (auth.jwt() ->> 'sub' = user_id);
