// src/hooks/useApartments.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useApartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApartments() {
      setLoading(true);
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        // Fall back to static data if Supabase not configured
        setApartments(staticApartments);
      } else {
        setApartments(data && data.length > 0 ? data : staticApartments);
      }
      setLoading(false);
    }
    fetchApartments();
  }, []);

  return { apartments, loading, error };
}

export const staticApartments = [
  {
    id: 1,
    title: 'Executive Studio Suite',
    description:
      'A tastefully furnished studio with modern finishes, ideal for short stays and business executives. Features a king-size bed, en-suite bathroom, and a fully equipped kitchenette.',
    bedrooms: 1,
    bathrooms: 1,
    size_sqm: 45,
    price_per_night: 35000,
    location: 'Wuse 2, Abuja',
    amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Kitchenette', '24/7 Security', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    ],
    available: true,
    type: 'Studio',
    featured: true,
  },
  {
    id: 2,
    title: 'Deluxe 2-Bedroom Apartment',
    description:
      'Spacious two-bedroom apartment with a separate living area, dining room, and fully fitted kitchen. Perfect for families or colleagues travelling together.',
    bedrooms: 2,
    bathrooms: 2,
    size_sqm: 85,
    price_per_night: 65000,
    location: 'Maitama, Abuja',
    amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Full Kitchen', 'Swimming Pool', '24/7 Security', 'Gym', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    ],
    available: true,
    type: '2 Bedroom',
    featured: true,
  },
  {
    id: 3,
    title: 'Premium 3-Bedroom Penthouse',
    description:
      'Our flagship penthouse offering panoramic city views, three en-suite bedrooms, a private terrace, cinema room, and butler service. The ultimate luxury experience in Abuja.',
    bedrooms: 3,
    bathrooms: 3,
    size_sqm: 150,
    price_per_night: 120000,
    location: 'Asokoro, Abuja',
    amenities: ['WiFi', 'Air Conditioning', 'Home Cinema', 'Full Kitchen', 'Private Terrace', 'Swimming Pool', 'Gym', '24/7 Security', 'Butler Service', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    available: true,
    type: 'Penthouse',
    featured: true,
  },
  {
    id: 4,
    title: 'Classic 1-Bedroom Apartment',
    description:
      'A well-appointed one-bedroom apartment with elegant décor, a spacious living room and a modern bathroom. Great value for extended stays.',
    bedrooms: 1,
    bathrooms: 1,
    size_sqm: 60,
    price_per_night: 45000,
    location: 'Garki, Abuja',
    amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Full Kitchen', '24/7 Security', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    available: true,
    type: '1 Bedroom',
    featured: false,
  },
];
