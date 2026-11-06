# Frensic Luxury Apartment

React/Vite catalogue connected to the existing Frensic Supabase platform. Rooms are read from `public.rooms`; booking and contact requests use the additive functions in `supabase/migrations/20261106000000_existing_platform_requests.sql`, which write to the existing `bookings` and `contact_messages` tables. Requests are pending enquiries, not reservations, and do not collect payment or hold dates.

## Development

Use Node 20.19+ or 22.12+. Run `npm ci`, copy `.env.example` to `.env.local`, set the Supabase URL and public publishable/anon key, and run `npm run dev`. Never put a service-role key in a Vite variable. Without configuration, labelled sample listings are shown and cannot be booked. Run `npm test`, `npm run build`, `npm run lint`, and `npm audit` for checks.

## Existing platform integration

The migration is intended for the existing schema, not a blank database. It adds two security-definer RPCs and does not modify existing tables, data or access policies. The functions require a signed-in user with a verified email, validate request fields, use the current database price and room capacity, and apply per-account limits. The site uses Supabase email magic links. Email authentication is enabled on the selected project, but production email requires a configured custom SMTP provider, approved sender domain and appropriate rate limits. Configure the production Site URL and allow the deployed origin and its paths in Supabase Auth redirect URLs; preview origins also need explicit allowlisting. Sign-in links must be opened in the same browser. Verify delivery and authenticated submissions end to end before launch. The customer sees an estimate; the database is authoritative at submission time.

**Security and launch blockers:** Existing RLS policies allow anonymous direct inserts into `bookings` and `contact_messages`, bypassing these RPC validations and rate limits. Do not rely on the new functions to secure the whole project. Coordinate a migration of every existing client before restricting those policies, and add abuse prevention and CAPTCHA. The existing schema does not guarantee against overlapping confirmed bookings; staff must check availability before confirming. Do not claim automatic availability checks or instant booking. No request notifications are configured. Establish monitoring, guest communication, backups, privacy and retention procedures, and review all public content and imagery. Test OAuth, authenticated submissions and admin workflows in staging before accepting customers.

The project requires verified business content and settings; some marketing copy and stock photography may still need replacing. SPA fallback routing is included for Firebase and Vercel. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the hosting project, deploy, and enable HTTPS.

### Coordinated security cutover

`operations/restrict-public-writes.sql` and `operations/restore-public-writes.sql` are manual runbooks, not automatically applied migrations. The first removes the two existing public-insert policies and will break legacy direct submissions; test all clients in staging and update them before applying it. The second restores the original permissive policies in an emergency, including their security risks. Confirm RLS remains enabled, admin access is unchanged, RPC submissions succeed for authenticated users, direct inserts fail for anonymous and non-admin users, and the existing live application's booking and contact flows work after the coordinated cutover. These scripts have not been applied to production.
