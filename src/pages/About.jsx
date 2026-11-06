// src/pages/About.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Users, Shield } from 'lucide-react';

const values = [
  { icon: Award, title: 'Excellence', desc: 'We maintain the highest standards in furnishing, cleanliness, and service delivery in every apartment.' },
  { icon: Heart, title: 'Hospitality', desc: 'Genuine Nigerian warmth and hospitality is at the core of everything we do for our guests.' },
  { icon: Users, title: 'Community', desc: 'We value long-term relationships with our guests, corporate clients, and local partners.' },
  { icon: Shield, title: 'Trust & Safety', desc: 'We aim to provide clear information and a thoughtful guest experience.' },
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
              Explore the collection for details on each apartment, including its location and amenities.
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
