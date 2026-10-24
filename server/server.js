import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to receive videos from browser context
app.post('/api/save-hero-video', express.raw({ type: '*/*', limit: '60mb' }), (req, res) => {
  try {
    const filename = req.query.filename || 'studio_interview_spotlight.webm';
    const dest = path.join(__dirname, '..', 'public', 'videos', filename);
    fs.writeFileSync(dest, req.body);
    // Also sync to dist and docs if they exist
    const distDest = path.join(__dirname, '..', 'dist', 'videos', filename);
    const docsDest = path.join(__dirname, '..', 'docs', 'videos', filename);
    if (fs.existsSync(path.dirname(distDest))) fs.writeFileSync(distDest, req.body);
    if (fs.existsSync(path.dirname(docsDest))) fs.writeFileSync(docsDest, req.body);
    console.log(`✓ Successfully saved ${filename}! Size:`, req.body.length);
    res.json({ success: true, size: req.body.length });
  } catch (e) {
    console.error('Failed to save video:', e);
    res.status(500).json({ error: e.message });
  }
});

// Endpoint to receive images from browser context
app.post('/api/save-image', express.raw({ type: '*/*', limit: '20mb' }), (req, res) => {
  try {
    const filename = req.query.filename || 'studio_poster.png';
    const dest = path.join(__dirname, '..', 'public', 'images', filename);
    fs.writeFileSync(dest, req.body);
    const assetDest = path.join(__dirname, '..', 'src', 'assets', filename);
    fs.writeFileSync(assetDest, req.body);
    const distDest = path.join(__dirname, '..', 'dist', 'images', filename);
    const docsDest = path.join(__dirname, '..', 'docs', 'images', filename);
    if (fs.existsSync(path.dirname(distDest))) fs.writeFileSync(distDest, req.body);
    if (fs.existsSync(path.dirname(docsDest))) fs.writeFileSync(docsDest, req.body);
    console.log(`✓ Successfully saved image ${filename}! Size:`, req.body.length);
    res.json({ success: true, size: req.body.length });
  } catch (e) {
    console.error('Failed to save image:', e);
    res.status(500).json({ error: e.message });
  }
});

// Serve static assets from public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve production build from dist if present
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

// 12 Photography Services per Requirement #8
const SERVICES = [
  { id: 'portrait', title: 'Portrait Photography', startingPrice: 450, turnaround: '5 to 7 Days' },
  { id: 'couple', title: 'Couple Photography', startingPrice: 550, turnaround: '7 Days' },
  { id: 'pre-wedding', title: 'Pre-Wedding Photoshoots', startingPrice: 850, turnaround: '10 Days' },
  { id: 'maternity', title: 'Maternity Photography', startingPrice: 600, turnaround: '7 Days' },
  { id: 'newborn-baby', title: 'Newborn and Baby Photography', startingPrice: 650, turnaround: '7 to 10 Days' },
  { id: 'family', title: 'Family Photography', startingPrice: 500, turnaround: '7 Days' },
  { id: 'birthday-occasion', title: 'Birthday and Special Occasion Photography', startingPrice: 600, turnaround: '5 to 7 Days' },
  { id: 'wedding', title: 'Wedding Photography', startingPrice: 2400, turnaround: '3 to 4 Weeks' },
  { id: 'fashion-model', title: 'Fashion and Model Photography', startingPrice: 750, turnaround: '5 Days' },
  { id: 'product', title: 'Product Photography', startingPrice: 600, turnaround: '5 to 7 Days' },
  { id: 'headshots', title: 'Professional Headshots', startingPrice: 250, turnaround: '2 to 3 Days' },
  { id: 'creative-studio', title: 'Creative Studio Photoshoots', startingPrice: 700, turnaround: '7 Days' }
];

// API: Services
app.get('/api/services', (req, res) => {
  res.json({ services: SERVICES });
});

// API: Reviews (GET)
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC').all();
    const avgRow = db.prepare('SELECT AVG(rating) as average, COUNT(*) as total FROM reviews').get();
    res.json({
      reviews,
      stats: {
        average: avgRow.average ? parseFloat(avgRow.average.toFixed(1)) : 5.0,
        total: avgRow.total || 0
      }
    });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
});

// API: Reviews (POST)
app.post('/api/reviews', (req, res) => {
  try {
    const { client_name, service_type, rating, headline, comment } = req.body;
    
    if (!client_name || !comment || !rating) {
      return res.status(400).json({ error: 'Name, rating, and feedback comment are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO reviews (client_name, service_type, rating, headline, comment, session_date, avatar_url, verified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      client_name.trim(),
      service_type || 'General Session',
      parseInt(rating, 10),
      headline ? headline.trim() : 'Unforgettable Experience',
      comment.trim(),
      'Recently Captured',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      1
    );

    const newReview = db.prepare('SELECT * FROM reviews WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ message: 'Review successfully submitted! Thank you.', review: newReview });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ error: 'Failed to save review.' });
  }
});

// API: Bookings (GET)
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
    res.json({ bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to load bookings' });
  }
});

// API: Bookings (POST) - Requirement #12
app.post('/api/bookings', (req, res) => {
  try {
    const {
      full_name,
      customer_name,
      email,
      phone,
      service_name,
      photoshoot_type,
      package_name,
      session_date,
      preferred_date,
      time_slot,
      preferred_time,
      number_of_people,
      location_type,
      add_ons,
      notes,
      additional_requirements,
      total_amount
    } = req.body;

    const nameVal = full_name || customer_name;
    const phoneVal = phone;
    const emailVal = email;
    const serviceVal = photoshoot_type || service_name;
    const dateVal = preferred_date || session_date;
    const timeVal = preferred_time || time_slot;
    const peopleVal = number_of_people || '1-2 People';
    const notesVal = additional_requirements || notes || '';

    // Validate required fields per Requirement #12
    if (!nameVal || !emailVal || !phoneVal || !serviceVal || !dateVal || !timeVal) {
      return res.status(400).json({
        error: 'Please complete all required fields: name, phone, email, photoshoot type, date, and time.'
      });
    }

    const ref_code = 'LL-' + Math.floor(1000 + Math.random() * 9000) + '-' + new Date().getFullYear();
    const addOnsStr = Array.isArray(add_ons) ? add_ons.join(', ') : (add_ons || 'None');

    const insert = db.prepare(`
      INSERT INTO bookings (
        ref_code, full_name, email, phone, service_name, package_name,
        session_date, time_slot, number_of_people, location_type, add_ons, notes, total_amount, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')
    `);

    const result = insert.run(
      ref_code,
      nameVal.trim(),
      emailVal.trim(),
      phoneVal.trim(),
      serviceVal,
      package_name || 'Standard Commission',
      dateVal,
      timeVal,
      peopleVal,
      location_type || 'Studio Sanctuary',
      addOnsStr,
      notesVal.trim(),
      parseFloat(total_amount) || 0
    );

    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);

    // WhatsApp deep link message
    const waMessage = encodeURIComponent(
      `Hello Lens & Leaf! I just booked a photoshoot session.\n\n` +
      `Reference Code: ${booking.ref_code}\n` +
      `Name: ${booking.full_name}\n` +
      `Discipline: ${booking.service_name}\n` +
      `Date & Time: ${booking.session_date} at ${booking.time_slot}\n` +
      `People: ${booking.number_of_people}\n` +
      `Requirements: ${booking.notes || 'None'}\n\n` +
      `Looking forward to confirming with the studio concierge!`
    );

    res.status(201).json({
      message: 'Booking confirmed! Your reference number is ' + ref_code,
      booking,
      whatsappLink: `https://wa.me/15558924377?text=${waMessage}`
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to process booking reservation. Please try again.' });
  }
});

// API: Enquiries (POST)
app.post('/api/enquiries', (req, res) => {
  try {
    const { full_name, email, phone, event_type, estimated_date, location, message } = req.body;

    if (!full_name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and inquiry message are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO enquiries (full_name, email, phone, event_type, estimated_date, location, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      full_name.trim(),
      email.trim(),
      phone ? phone.trim() : '',
      event_type || 'General Inquiry',
      estimated_date || '',
      location || '',
      message.trim()
    );

    res.status(201).json({ message: 'Thank you! Your message has reached the studio concierge.' });
  } catch (err) {
    console.error('Error saving enquiry:', err);
    res.status(500).json({ error: 'Failed to send inquiry.' });
  }
});

app.listen(PORT, () => {
  console.log(`[Lens & Leaf Server] Running on http://localhost:${PORT}`);
});
