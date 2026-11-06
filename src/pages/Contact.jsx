// src/pages/Contact.jsx
import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

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
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!supabase) {
      toast.error('The contact form is not configured yet.');
      return;
    }
    if (!user) { toast.error('Please sign in to send a message.'); return; }
    setSubmitting(true);
    try {
      const { error } = await supabase.rpc('frensic_send_contact', {
        p_name: form.name, p_phone: form.phone, p_subject: form.subject, p_message: form.message,
      });
      if (error) throw error;

      setSubmitted(true);
      toast.success('Message sent! We will get back to you shortly.');
    } catch {
      toast.error('Unable to send your message. Please try again later.');
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

              <p style={{ color: 'var(--gray)', lineHeight: 1.7 }}>Sign in and send us a message using the form. We will reply to the email address on your account.</p>
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
                    Thank you, {form.name}. Your message has been received.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {!user && <Link className="btn-primary" to="/sign-in?next=%2Fcontact">Sign in to send a message</Link>}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)' }}>Full Name *</span>
                      <input name="name" required maxLength={200} value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)' }}>Email Address *</span>
                      <input name="email" type="email" required value={user?.email || ''} readOnly placeholder="Sign in to use your email" style={inputStyle} />
                    </label>
                  </div>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)' }}>Phone Number</span>
                    <input name="phone" type="tel" maxLength={40} value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" style={inputStyle} />
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
                      maxLength={5000}
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
                    disabled={submitting || !user}
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


    </main>
  );
}
