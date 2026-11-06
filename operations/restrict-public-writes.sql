-- MANUAL CUTOVER ONLY: coordinate every application using these tables first.
-- This prevents legacy anonymous and non-admin authenticated direct inserts.
-- The frensic_request_booking and frensic_send_contact SECURITY DEFINER functions
-- continue to work. Existing admin policy is unchanged.
begin;
drop policy "Public creates pending bookings" on public.bookings;
drop policy "Public sends contact messages" on public.contact_messages;
commit;
