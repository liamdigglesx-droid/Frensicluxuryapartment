// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const signInUrl = `/sign-in?next=${encodeURIComponent(location.pathname === '/sign-in' ? '/apartments' : location.pathname)}`;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <nav className={`navbar${scrolled || location.pathname !== '/' ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            Frensic<span>Luxury</span>
          </Link>

          <ul className="navbar-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/apartments">Apartments</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          <div className="navbar-actions">
            {user ? (
              <div className="user-menu">
                {user.photoURL && (
                  <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
                )}
                <span className="user-name">{user.displayName}</span>
                <button className="btn-logout" onClick={() => logout().catch(() => toast.error('Unable to sign out.'))}>Sign Out</button>
              </div>
            ) : (
              <Link className="btn-signin" to={signInUrl}>Sign in</Link>
            )}
          </div>

          <button
            className="hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/apartments" onClick={() => setMobileOpen(false)}>Apartments</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink>
          {user ? (
            <button className="btn-logout" style={{ alignSelf: 'flex-start' }} onClick={() => logout().catch(() => toast.error('Unable to sign out.'))}>
              Sign Out
            </button>
          ) : (
            <Link className="btn-signin" style={{ alignSelf: 'flex-start' }} to={signInUrl} onClick={() => setMobileOpen(false)}>Sign in</Link>
          )}
        </div>
      )}
    </nav>
  );
}
