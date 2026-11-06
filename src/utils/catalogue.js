export function mapRoom(room) {
  return {
    id: room.id, title: room.name || 'Apartment', description: room.description || '',
    price_per_night: Number(room.price_per_night), bedrooms: room.bedrooms,
    size_sqm: room.size_sqm, max_guests: room.max_guests,
    location: '', amenities: room.amenities || [],
    images: [...new Set([room.image_url, ...(room.gallery || [])].filter(Boolean))],
    featured: room.featured, available: true,
    type: room.bedrooms ? `${room.bedrooms} Bedroom${room.bedrooms === 1 ? '' : 's'}` : '',
  };
}
export function safeDestination(next) {
  return next && /^\/(?!\/)[^\\]*$/.test(next) ? next : '/apartments';
}

// Booking dates follow the property's time zone, not the guest's device time zone.
export function lagosDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}
