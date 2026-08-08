// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useApartments } from '../hooks/useApartments';
import ApartmentCard from '../components/ApartmentCard';
import {
  ShieldCheck,
  Wifi,
  Dumbbell,
  Waves,
  Car,
  UtensilsCrossed,
  Star,
  ArrowRight,
  Phone,
} from 'lucide-react';

const amenities = [
  { icon: Wifi, label: 'High-Speed WiFi', desc: 'Fibre broadband in every apartment' },
  { icon: Waves, label: 'Swimming Pool', desc: 'Temperature-controlled rooftop pool' },
  { icon: Dumbbell, label: 'Fitness Centre', desc: 'State-of-the-art gym facilities' },
  { icon: ShieldCheck, label: '24/7 Security', desc: 'Manned gates & CCTV surveillance' },
  { icon: Car, label: 'Secure Parking', desc: 'Ample covered parking spaces' },
  { icon: UtensilsCrossed, label: 'In-Room Dining', desc: 'Chef-prepared meals on request' },
];

const testimonials = [
  {
    name: 'Adaeze O.',
    role: 'Business Executive, Lagos',
    text: 'Absolutely stunning apartment! The service was impeccable and the location in Maitama was perfect for my meetings. Will definitely return.',
    rating: 5,
  },
  {
    name: 'Chukwuemeka P.',
    role: 'Government Official, Abuja',
    text: 'Frensic Luxury provided exactly what I needed — a peaceful, elegant space after long days. The penthouse views are breathtaking.',
    rating: 5,
  },
  {
    name: 'Fatima A.',
    role: 'Corporate Traveller',
    text: 'Best serviced apartment in Abuja by far. Clean, modern, and the staff go above and beyond. The booking process was smooth and fast.',
    rating: 5,
  },
];

export default function Home() {
  const { apartments, loading } = useApartments();
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

        {/* Stats Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(201,168,76,0.95)',
          backdropFilter: 'blur(8px)',
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              padding: '20px 0',
              textAlign: 'center',
              gap: 16,
            }}>
              {[
                { value: '200+', label: 'Happy Guests' },
                { value: '4', label: 'Apartment Types' },
                { value: '24/7', label: 'Concierge Service' },
                { value: '5★', label: 'Average Rating' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--dark)' }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'rgba(0,0,0,0.7)' }}>{label}</div>
                </div>
              ))}
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

      {/* Amenities */}
      <section className="section">
        <div className="container">
          <p style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
            World-Class Facilities
          </p>
          <h2 className="section-title">Amenities & Services</h2>
          <p className="section-subtitle">
            Every comfort you need, thoughtfully provided
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {amenities.map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{
                padding: '28px',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 12,
                transition: 'box-shadow 0.2s, border-color 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
              >
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(201,168,76,0.1)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <Icon size={22} color="var(--gold)" />
                </div>
                <h3 style={{ fontWeight: 600, marginBottom: 6 }}>{label}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem' }}>{desc}</p>
              </div>
            ))}
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
                'Fully furnished with premium furniture and fittings',
                'Dedicated account manager and concierge',
                'Flexible short-let and long-stay options',
                'Instant booking with secure online payment',
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

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <p style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
            Guest Reviews
          </p>
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">Real experiences from our valued guests</p>

          <div className="grid-3">
            {testimonials.map((t) => (
              <div key={t.name} style={{
                background: 'var(--white)',
                borderRadius: 12,
                padding: 32,
                boxShadow: 'var(--shadow)',
              }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <p style={{ color: 'var(--gray)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic', fontSize: '0.925rem' }}>
                  "{t.text}"
                </p>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--dark)' }}>{t.name}</div>
                  <div style={{ color: 'var(--gray)', fontSize: '0.82rem' }}>{t.role}</div>
                </div>
              </div>
            ))}
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
