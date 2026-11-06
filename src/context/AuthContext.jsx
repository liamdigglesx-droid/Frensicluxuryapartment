import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!supabase);
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    const update = (session) => {
      if (!active) return;
      const u = session?.user;
      setUser(u ? { ...u, displayName: u.user_metadata?.full_name || u.email, photoURL: u.user_metadata?.avatar_url } : null);
      setLoading(false);
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => update(session));
    supabase.auth.getSession().then(({ data }) => update(data.session)).catch(() => update(null));
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  const logout = async () => { if (supabase) { const { error } = await supabase.auth.signOut(); if (error) throw error; } };
  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
