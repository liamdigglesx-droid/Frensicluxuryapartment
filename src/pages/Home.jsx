// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useApartments } from '../hooks/useApartments';
import ApartmentCard from '../components/ApartmentCard';
import {
  ArrowRight,
  Phone,
} from 'lucide-react';

export default function Home() {
  const { apartments, loading, error, demo } = useApartments();
  const featured = apartments.filter((a) => a.featured).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 100%), url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=90) center/cover no-repeat',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}>
        <div className="container">
          <div style={{ maxWidth: 640, paddingTop: 80 }}>
            <span className="badge" style={{ marginBottom: 20, display: 'inline-block' }}>
              Premium Serviced Apartments · Abuja, Nigeria
            </span>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.15,
              marginBottom: 20,
            }}>
              Where Luxury Meets <span style={{ color: 'var(--gold)' }}>Comfort</span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 500,
            }}>
              Discover meticulously designed apartments in the heart of Abuja, offering an unrivalled
              blend of elegance, modern amenities, and personalised service.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/apartments" className="btn-primary">
                Explore Apartments <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline">
                <Phone size={16} /> Contact Us
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Featured Apartments */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <p className="section-subtitle" style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
            Our Collection
          </p>
          <h2 className="section-title">Featured Apartments</h2>
          <p className="section-subtitle">
            Hand-picked residences offering the finest in luxury short-let living
          </p>

          {demo && <p className="notice">Explore sample apartments below. These listings are for demonstration only.</p>}
          {error && <p className="notice" role="alert">Unable to load apartments. Please try again later.</p>}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray)' }}>
              Loading apartments…
            </div>
          ) : (
            <div className="grid-3">
              {featured.map((apt) => (
                <ApartmentCard key={apt.id} apartment={apt} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/apartments" className="btn-primary">
              View All Apartments <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-3) 100%)',
        color: 'var(--white)',
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
              Why Frensic
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>
              The Premier Choice for <span style={{ color: 'var(--gold)' }}>Luxury Living</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: 32 }}>
              At Frensic Luxury Apartment, we believe your accommodation should enhance your experience in Abuja.
              Our fully serviced, elegantly furnished apartments combine the warmth of home with the
              excellence of a five-star hotel.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Flexible short-let and long-stay options',
                'Booking requests reviewed by our team',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(255,255,255,0.82)', fontSize: '0.92rem' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '1rem', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/apartments" className="btn-primary" style={{ marginTop: 36, display: 'inline-flex' }}>
              Book Your Stay <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
              alt="Luxury apartment interior"
              style={{ borderRadius: 16, boxShadow: 'var(--shadow-lg)', width: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, var(--gold) 0%, #b8922e 100%)',
        padding: '64px 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--dark)', marginBottom: 12 }}>
            Ready to Experience the Best of Abuja?
          </h2>
          <p style={{ color: 'rgba(0,0,0,0.65)', marginBottom: 32, fontSize: '1.05rem' }}>
            Book your stay today and enjoy unparalleled luxury
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/apartments" style={{
              background: 'var(--dark)',
              color: 'var(--white)',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              Browse Apartments <ArrowRight size={16} />
            </Link>
            <Link to="/contact" style={{
              background: 'transparent',
              color: 'var(--dark)',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 600,
              border: '2px solid var(--dark)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <Phone size={16} /> Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
