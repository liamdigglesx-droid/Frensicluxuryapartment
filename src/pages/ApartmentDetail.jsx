// src/pages/ApartmentDetail.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApartments } from '../hooks/useApartments';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import {
  BedDouble, Bath, Maximize2, MapPin, CheckCircle2, ArrowLeft, ChevronLeft, ChevronRight,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ApartmentDetail() {
  const { id } = useParams();
  const { apartments, loading } = useApartments();
  const { user, signInWithGoogle } = useAuth();
  const [imgIdx, setImgIdx] = useState(0);
  const [form, setForm] = useState({ checkin: '', checkout: '', guests: 1, notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const apartment = apartments.find((a) => String(a.id) === String(id));

  if (loading) {
    return (
      <main style={{ paddingTop: 100, textAlign: 'center', color: 'var(--gray)', minHeight: '60vh' }}>
        Loading…
      </main>
    );
  }

  if (!apartment) {
    return (
      <main style={{ paddingTop: 100, textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 16 }}>Apartment not found</h2>
        <Link to="/apartments" className="btn-primary">Back to Apartments</Link>
      </main>
    );
  }

  const { title, description, bedrooms, bathrooms, size_sqm, price_per_night, location, images, amenities, type } = apartment;

  const nights = form.checkin && form.checkout
    ? Math.max(1, Math.ceil((new Date(form.checkout) - new Date(form.checkin)) / 86400000))
    : 1;

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to book an apartment');
      return;
    }
    if (!form.checkin || !form.checkout) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (new Date(form.checkout) <= new Date(form.checkin)) {
      toast.error('Check-out must be after check-in');
      return;
    }

    setSubmitting(true);
    try {
      const booking = {
        apartment_id: apartment.id,
        apartment_title: title,
        user_email: user.email,
        user_name: user.displayName,
        checkin_date: form.checkin,
        checkout_date: form.checkout,
        guests: form.guests,
        notes: form.notes,
        total_price: nights * price_per_night,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('bookings').insert([booking]);
      if (error) throw error;

      // Send confirmation email via EmailJS
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_name: user.displayName,
            to_email: user.email,
            apartment_name: title,
            checkin: form.checkin,
            checkout: form.checkout,
            guests: form.guests,
            total: `₦${(nights * price_per_night).toLocaleString()}`,
            location,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (_emailErr) {
        // Email failure is non-critical
        console.warn('Email notification failed:', _emailErr);
      }

      setBooked(true);
      toast.success('Booking submitted successfully! We will confirm shortly.');
    } catch (err) {
      toast.error(err.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Image Gallery */}
      <div style={{ position: 'relative', height: 'clamp(300px, 50vh, 520px)', background: 'var(--dark)', overflow: 'hidden' }}>
        {images?.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${title} - image ${i + 1}`}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: i === imgIdx ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}
        {images?.length > 1 && (
          <>
            <button onClick={() => setImgIdx(i => Math.max(0, i - 1))} style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: 8,
              padding: 8, cursor: 'pointer', display: 'flex',
            }}>
              <ChevronLeft />
            </button>
            <button onClick={() => setImgIdx(i => Math.min(images.length - 1, i + 1))} style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: 8,
              padding: 8, cursor: 'pointer', display: 'flex',
            }}>
              <ChevronRight />
            </button>
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
              {images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{
                  width: i === imgIdx ? 24 : 8, height: 8,
                  borderRadius: 100, border: 'none', cursor: 'pointer',
                  background: i === imgIdx ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s',
                }} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <Link to="/apartments" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--gray)', fontSize: '0.875rem', marginBottom: 24 }}>
          <ArrowLeft size={14} /> Back to Apartments
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 48, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gray)', fontSize: '0.875rem', marginBottom: 8 }}>
              <MapPin size={14} />{location}
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: 8 }}>{title}</h1>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              {[
                { Icon: BedDouble, label: `${bedrooms} Bedroom${bedrooms !== 1 ? 's' : ''}` },
                { Icon: Bath, label: `${bathrooms} Bathroom${bathrooms !== 1 ? 's' : ''}` },
                { Icon: Maximize2, label: `${size_sqm} m²` },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--gray)' }}>
                  <Icon size={15} />{label}
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: 32, fontSize: '1rem' }}>{description}</p>

            <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Amenities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
              {amenities?.map((a) => (
                <div key={a} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', background: 'var(--gray-light)', borderRadius: 100, fontSize: '0.85rem',
                }}>
                  <CheckCircle2 size={13} color="var(--gold)" />{a}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Booking */}
          <div style={{
            background: 'var(--white)',
            borderRadius: 16,
            boxShadow: 'var(--shadow-lg)',
            padding: 32,
            position: 'sticky',
            top: 100,
            border: '1px solid rgba(0,0,0,0.08)',
          }}>
            {booked ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={48} color="var(--gold)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: 8 }}>Booking Submitted!</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                  Thank you {user?.displayName}! We will contact you at {user?.email} to confirm your booking.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700 }}>₦{price_per_night?.toLocaleString()}</span>
                  <span style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>/night</span>
                </div>

                <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Check-in</span>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={form.checkin}
                        onChange={e => setForm(f => ({ ...f, checkin: e.target.value }))}
                        style={inputStyle}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Check-out</span>
                      <input
                        type="date"
                        required
                        min={form.checkin || new Date().toISOString().split('T')[0]}
                        value={form.checkout}
                        onChange={e => setForm(f => ({ ...f, checkout: e.target.value }))}
                        style={inputStyle}
                      />
                    </label>
                  </div>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Guests</span>
                    <select value={form.guests} onChange={e => setForm(f => ({ ...f, guests: Number(e.target.value) }))} style={inputStyle}>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n !== 1 ? 's' : ''}</option>)}
                    </select>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Special Requests (optional)</span>
                    <textarea
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      rows={3}
                      placeholder="Any special requests…"
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </label>

                  {form.checkin && form.checkout && (
                    <div style={{ background: 'var(--gray-light)', borderRadius: 8, padding: '12px 16px', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ color: 'var(--gray)' }}>₦{price_per_night?.toLocaleString()} × {nights} night{nights !== 1 ? 's' : ''}</span>
                        <span>₦{(price_per_night * nights).toLocaleString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 8 }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--gold)' }}>₦{(price_per_night * nights).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {user ? (
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={submitting}
                      style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
                    >
                      {submitting ? 'Submitting…' : 'Request Booking'}
                    </button>
                  ) : (
                    <button type="button" className="btn-primary" onClick={signInWithGoogle} style={{ width: '100%', justifyContent: 'center' }}>
                      Sign in to Book
                    </button>
                  )}

                  <p style={{ color: 'var(--gray)', fontSize: '0.78rem', textAlign: 'center' }}>
                    You won't be charged yet. We will contact you to confirm.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          main > div.container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const inputStyle = {
  padding: '10px 12px',
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: 8,
  fontSize: '0.9rem',
  fontFamily: 'var(--font-sans)',
  width: '100%',
  outline: 'none',
  background: 'var(--white)',
};
