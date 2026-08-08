// src/pages/About.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Users, Shield } from 'lucide-react';

const values = [
  { icon: Award, title: 'Excellence', desc: 'We maintain the highest standards in furnishing, cleanliness, and service delivery in every apartment.' },
  { icon: Heart, title: 'Hospitality', desc: 'Genuine Nigerian warmth and hospitality is at the core of everything we do for our guests.' },
  { icon: Users, title: 'Community', desc: 'We value long-term relationships with our guests, corporate clients, and local partners.' },
  { icon: Shield, title: 'Trust & Safety', desc: '24/7 security, verified reviews, and transparent pricing — your safety is our priority.' },
];

const team = [
  {
    name: 'Amaka Okonkwo',
    role: 'Founder & CEO',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'With over 15 years in Nigerian real estate, Amaka founded Frensic to redefine luxury short-let living in Abuja.',
  },
  {
    name: 'Emeka Nwosu',
    role: 'Head of Operations',
    img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&q=80',
    bio: 'Emeka ensures every apartment is immaculately maintained and that guests receive seamless service from check-in to check-out.',
  },
  {
    name: 'Chinaza Ibrahim',
    role: 'Guest Experience Manager',
    img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80',
    bio: 'Chinaza\'s passion is creating unforgettable stays, handling all guest communications and special requests with care.',
  },
];

export default function About() {
  return (
    <main style={{ paddingTop: 80 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-3) 100%)',
        padding: '60px 0',
        color: 'var(--white)',
      }}>
        <div className="container">
          <p style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
            Our Story
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 12 }}>
            About Frensic Luxury Apartment
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 540 }}>
            We are dedicated to providing the finest serviced apartment experience in Abuja, Nigeria.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
              Who We Are
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: 20, lineHeight: 1.3 }}>
              Redefining Luxury Short-Let Living in Abuja
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.85, marginBottom: 16 }}>
              Frensic Luxury Apartment was founded with a singular vision: to offer discerning travellers, business executives,
              and families the finest short-let and serviced apartment experience in Nigeria's Federal Capital Territory.
            </p>
            <p style={{ color: 'var(--gray)', lineHeight: 1.85, marginBottom: 24 }}>
              Located in some of Abuja's most prestigious neighbourhoods — Wuse 2, Maitama, Asokoro, and Garki —
              our apartments combine thoughtfully designed interiors with hotel-grade amenities and the privacy of a home.
            </p>
            <p style={{ color: 'var(--gray)', lineHeight: 1.85, marginBottom: 32 }}>
              Since our founding, we have hosted over 200 guests ranging from visiting dignitaries and corporate teams to
              families relocating to Abuja. Each guest receives personalised attention and a commitment to excellence that
              we are proud to stand behind.
            </p>
            <Link to="/apartments" className="btn-primary">
              Explore Our Apartments <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              alt="Luxury apartment living area"
              style={{ borderRadius: 16, boxShadow: 'var(--shadow-lg)', width: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <p style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
            Our Principles
          </p>
          <h2 className="section-title">What We Stand For</h2>
          <p className="section-subtitle">The values that guide every decision we make</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                background: 'var(--white)',
                borderRadius: 12,
                padding: 28,
                boxShadow: 'var(--shadow)',
              }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(201,168,76,0.1)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <Icon size={22} color="var(--gold)" />
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <p style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
            The People Behind the Experience
          </p>
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">Dedicated professionals committed to making your stay exceptional</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
            {team.map(({ name, role, img, bio }) => (
              <div key={name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={img} alt={name} style={{ width: '100%', height: 260, objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{name}</h3>
                  <p style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>{role}</p>
                  <p style={{ color: 'var(--gray)', fontSize: '0.875rem', lineHeight: 1.65 }}>{bio}</p>
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
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: 'var(--dark)', marginBottom: 12 }}>
            Experience Frensic Luxury Today
          </h2>
          <p style={{ color: 'rgba(0,0,0,0.65)', marginBottom: 32 }}>
            Join our growing community of satisfied guests
          </p>
          <Link to="/contact" style={{
            background: 'var(--dark)', color: 'var(--white)',
            padding: '14px 32px', borderRadius: 8, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
