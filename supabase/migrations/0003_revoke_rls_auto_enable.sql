-- Applied via Supabase MCP 2026-05-12.
-- rls_auto_enable là function template của Supabase platform (không phải custom).
-- Revoke EXECUTE để tránh anon/authenticated gọi qua /rest/v1/rpc/.

revoke execute on function public.rls_auto_enable() from anon;
revoke execute on function public.rls_auto_enable() from authenticated;
revoke execute on function public.rls_auto_enable() from public;
