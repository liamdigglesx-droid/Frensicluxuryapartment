-- Emergency rollback. Restores the original permissive policies and their risks.
begin;
create policy "Public creates pending bookings" on public.bookings for insert to anon, authenticated
  with check (payment_status = 'pending' and payment_reference is null);
create policy "Public sends contact messages" on public.contact_messages for insert to anon, authenticated
  with check (true);
commit;
