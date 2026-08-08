// src/pages/Contact.jsx
import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: 8,
  fontSize: '0.9rem',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([{
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        created_at: new Date().toISOString(),
      }]);
      if (error) throw error;

      // Email notification
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            subject: form.subject,
            message: form.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (_err) {
        console.warn('Email send failed:', _err);
      }

      setSubmitted(true);
      toast.success('Message sent! We will get back to you shortly.');
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
            Reach Out
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 12 }}>
            Contact Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480 }}>
            Have a question or want to make a reservation? We are here to help.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, marginBottom: 12 }}>
                Get In Touch
              </h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.7, marginBottom: 32 }}>
                Our hospitality team is available to assist you with reservations, inquiries, and all your accommodation needs.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  {
                    Icon: MapPin,
                    title: 'Address',
                    lines: ['Wuse 2, Abuja', 'FCT, Nigeria'],
                  },
                  {
                    Icon: Phone,
                    title: 'Phone',
                    lines: ['+234 800 000 0000', '+234 900 000 0000'],
                  },
                  {
                    Icon: Mail,
                    title: 'Email',
                    lines: ['info@frensicluxuryapartment.com.ng', 'bookings@frensicluxuryapartment.com.ng'],
                  },
                  {
                    Icon: Clock,
                    title: 'Business Hours',
                    lines: ['Mon – Fri: 8:00 AM – 8:00 PM', 'Sat – Sun: 9:00 AM – 6:00 PM'],
                  },
                ].map(({ Icon, title, lines }) => (
                  <li key={title} style={{ display: 'flex', gap: 14 }}>
                    <div style={{
                      width: 44, height: 44,
                      background: 'rgba(201,168,76,0.1)',
                      borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={18} color="var(--gold)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{title}</div>
                      {lines.map(l => (
                        <div key={l} style={{ color: 'var(--gray)', fontSize: '0.875rem' }}>{l}</div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div style={{
                  background: 'var(--gray-light)', borderRadius: 16, padding: 40, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: 8 }}>Message Received!</h3>
                  <p style={{ color: 'var(--gray)' }}>
                    Thank you, {form.name}. Our team will respond to {form.email} within 24 hours.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)' }}>Full Name *</span>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)' }}>Email Address *</span>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
                    </label>
                  </div>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)' }}>Phone Number</span>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" style={inputStyle} />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)' }}>Subject</span>
                    <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
                      <option value="">Select a subject</option>
                      <option>Booking Enquiry</option>
                      <option>General Enquiry</option>
                      <option>Corporate Stays</option>
                      <option>Long-term Let</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)' }}>Message *</span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help…"
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </label>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={submitting}
                    style={{ alignSelf: 'flex-start', opacity: submitting ? 0.7 : 1, gap: 8 }}
                  >
                    <Send size={15} />
                    {submitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div style={{
        background: 'var(--gray-light)',
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid rgba(0,0,0,0.08)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <MapPin size={40} color="var(--gold)" style={{ margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--gray)', fontWeight: 500 }}>Wuse 2, Abuja, FCT, Nigeria</p>
          <a
            href="https://maps.google.com/?q=Wuse+2+Abuja+Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: 16, display: 'inline-flex' }}
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </main>
  );
}
