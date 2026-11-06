import test from 'node:test';
import assert from 'node:assert/strict';
import { mapRoom, safeDestination, lagosDate } from '../src/utils/catalogue.js';

test('maps real room data without inventing bathrooms or duplicating images', () => {
  const room = mapRoom({ id: 'abc', name: 'Royal Haven', price_per_night: '250000.00', bedrooms: 3, image_url: 'a', gallery: ['a', 'b'], max_guests: 6 });
  assert.equal(room.price_per_night, 250000);
  assert.equal(room.type, '3 Bedrooms');
  assert.deepEqual(room.images, ['a', 'b']);
  assert.equal(room.bathrooms, undefined);
});
test('only permits same-origin sign-in destinations', () => {
  assert.equal(safeDestination('/apartments/abc'), '/apartments/abc');
  assert.equal(safeDestination('//evil.example'), '/apartments');
  assert.equal(safeDestination('/\\evil.example'), '/apartments');
  assert.equal(safeDestination('https://evil.example'), '/apartments');
  assert.equal(safeDestination(null), '/apartments');
});

test('uses the property time zone around midnight', () => {
  assert.equal(lagosDate(new Date('2026-11-06T23:30:00Z')), '2026-11-07');
  assert.equal(lagosDate(new Date('2026-11-06T22:30:00Z')), '2026-11-06');
});
