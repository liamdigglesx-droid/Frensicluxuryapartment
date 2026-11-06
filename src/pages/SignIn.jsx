import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { safeDestination } from '../utils/catalogue';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const next = new URLSearchParams(location.search).get('next');
  // Only allow local paths, not protocol-relative or arbitrary external URLs.
  const destination = safeDestination(next);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!supabase) { setError('Sign-in is not configured yet.'); return; }
    setSending(true);
    setError('');
    try {
      const redirect = new URL(destination, window.location.origin);
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim(), options: { emailRedirectTo: redirect.href },
      });
      if (authError) throw authError;
      setSent(true);
    } catch {
      setError('Could not send the sign-in link. Please wait a moment and try again.');
    } finally { setSending(false); }
  }

  return <main className="signin-page">
    <div className="signin-card">
      <p className="signin-eyebrow">Welcome to Frensic</p>
      <h1>Sign in to continue</h1>
      {user ? <><p>You are signed in as {user.email}.</p><button className="btn-primary" onClick={() => navigate(destination)}>Continue</button></> : sent ?
        <><p>Check your inbox for a sign-in link. Open it in the same browser to continue. If you don't see it, check your spam folder.</p><button className="signin-link" onClick={() => setSent(false)}>Use a different email</button></> :
        <form onSubmit={handleSubmit}>
          <p>Enter your email and we’ll send you a secure sign-in link. No password needed.</p>
          <label htmlFor="signin-email">Email address</label>
          <input id="signin-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          {error && <p role="alert" className="signin-error">{error}</p>}
          <button className="btn-primary" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Email me a sign-in link'}</button>
        </form>}
      <Link to="/apartments" className="signin-back">Back to apartments</Link>
    </div>
  </main>;
}
