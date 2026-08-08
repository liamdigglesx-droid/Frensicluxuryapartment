// src/components/ApartmentCard.jsx
import { Link } from 'react-router-dom';
import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react';

export default function ApartmentCard({ apartment }) {
  const {
    id,
    title,
    description,
    bedrooms,
    bathrooms,
    size_sqm,
    price_per_night,
    location,
    images,
    type,
    featured,
    available,
  } = apartment;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
        <img
          src={images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8 }}>
          {featured && <span className="badge">Featured</span>}
          {!available && (
            <span className="badge" style={{ background: '#6b7280', color: '#fff' }}>Unavailable</span>
          )}
        </div>
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.7)', color: 'var(--white)',
          padding: '4px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600,
        }}>
          {type}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gray)', fontSize: '0.82rem', marginBottom: 8 }}>
          <MapPin size={13} />
          <span>{location}</span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>
          {title}
        </h3>

        <p style={{ color: 'var(--gray)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
          {description.length > 100 ? description.slice(0, 100) + '…' : description}
        </p>

        {/* Specs */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          {[
            { Icon: BedDouble, label: `${bedrooms} Bed${bedrooms !== 1 ? 's' : ''}` },
            { Icon: Bath, label: `${bathrooms} Bath${bathrooms !== 1 ? 's' : ''}` },
            { Icon: Maximize2, label: `${size_sqm} m²` },
          ].map(({ Icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--gray)' }}>
              <Icon size={14} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--gray-light)', paddingTop: 16 }}>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)' }}>
              ₦{price_per_night?.toLocaleString()}
            </span>
            <span style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>/night</span>
          </div>
          <Link
            to={`/apartments/${id}`}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
