// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

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
            <div style={{ display: 'flex', gap: '12px' }}>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
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

          {/* Contact */}
          <div>
            <h4 style={{ color: 'var(--white)', fontWeight: 600, marginBottom: '16px', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
                <MapPin size={16} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
                <span>Wuse 2, Abuja, FCT, Nigeria</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                <Phone size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <a href="tel:+2348000000000" style={{ color: 'inherit' }}>+234 800 000 0000</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                <Mail size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <a href="mailto:info@frensicluxuryapartment.com.ng" style={{ color: 'inherit' }}>
                  info@frensicluxuryapartment.com.ng
                </a>
              </li>
            </ul>
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
