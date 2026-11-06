// src/pages/Apartments.jsx
import { useState } from 'react';
import { useApartments } from '../hooks/useApartments';
import ApartmentCard from '../components/ApartmentCard';
import { Search, SlidersHorizontal } from 'lucide-react';


export default function Apartments() {
  const { apartments, loading, error, demo } = useApartments();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  const types = ['All', ...new Set(apartments.map(a => a.type).filter(Boolean))];

  const filtered = apartments.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase());
    const matchType = type === 'All' || a.type === type;
    const matchPrice = (!maxPrice || a.price_per_night <= Number(maxPrice));
    return matchSearch && matchType && matchPrice;
  });

  return (
    <main style={{ paddingTop: 80 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-3) 100%)',
        padding: '60px 0',
        color: 'var(--white)',
      }}>
        <div className="container">
          {demo && <p className="notice">These are sample apartments for demonstration, not bookable listings.</p>}
          {error && <p className="notice" role="alert">Unable to load apartments. Please try again later.</p>}
          <p style={{ color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: 8 }}>
            Our Collection
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 12 }}>
            Luxury Apartments
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500 }}>
            Choose from our curated selection of premium serviced apartments in prime Abuja locations.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ background: 'var(--gray-light)', padding: '24px 0', position: 'sticky', top: 70, zIndex: 50, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or location…"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  border: '1px solid rgba(0,0,0,0.15)',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans)',
                  background: 'var(--white)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Type filter */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 100,
                    border: '1px solid',
                    borderColor: type === t ? 'var(--gold)' : 'rgba(0,0,0,0.15)',
                    background: type === t ? 'var(--gold)' : 'var(--white)',
                    color: type === t ? 'var(--dark)' : 'var(--gray)',
                    fontWeight: type === t ? 600 : 400,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Price filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--gray)' }}>
              <SlidersHorizontal size={16} />
              <label>Max ₦/night <input
                type="number" min="0" step="1000" value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)} placeholder="Any price"
                style={{ width: 130, padding: 8, border: '1px solid #ccc', borderRadius: 8 }}
              /></label>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section">
        <div className="container">
          <p style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: 24 }}>
            {loading ? 'Loading…' : `${filtered.length} apartment${filtered.length !== 1 ? 's' : ''} found`}
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray)' }}>
              Loading apartments…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: 'var(--gray)', fontSize: '1.05rem' }}>
                No apartments match your filters. Try adjusting your search.
              </p>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((apt) => (
                <ApartmentCard key={apt.id} apartment={apt} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
