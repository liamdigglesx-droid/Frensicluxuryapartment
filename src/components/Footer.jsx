// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark)',
      color: 'rgba(255,255,255,0.7)',
      padding: '64px 0 24px',
      fontFamily: 'var(--font-sans)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--white)',
              fontSize: '1.5rem',
              marginBottom: '12px',
            }}>
              Frensic<span style={{ color: 'var(--gold)' }}>Luxury</span>
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Experience premium serviced apartments in the heart of Abuja, Nigeria.
              Your comfort and elegance, guaranteed.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--white)', fontWeight: 600, marginBottom: '16px', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['Home', '/'], ['Apartments', '/apartments'], ['About Us', '/about'], ['Contact', '/contact']].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--white)', marginBottom: 16 }}>Get in touch</h4>
            <p style={{ marginBottom: 12 }}>Questions about your stay?</p>
            <Link to="/contact" style={{ color: 'var(--gold)' }}>Send an enquiry</Link>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.82rem',
        }}>
          <p>&copy; {new Date().getFullYear()} Frensic Luxury Apartment. All rights reserved.</p>
          <p>Abuja, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
