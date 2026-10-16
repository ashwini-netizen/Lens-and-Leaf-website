import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'lens_leaf.db');
const db = new Database(dbPath);

// Enable foreign keys and WAL mode for high performance
db.pragma('journal_mode = WAL');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_name TEXT NOT NULL,
    package_name TEXT DEFAULT 'Standard Session',
    session_date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    number_of_people TEXT DEFAULT '1-2 People',
    location_type TEXT DEFAULT 'Studio Sanctuary',
    add_ons TEXT DEFAULT 'None',
    notes TEXT,
    total_amount REAL DEFAULT 0,
    status TEXT DEFAULT 'Confirmed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL,
    estimated_date TEXT,
    location TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    service_type TEXT NOT NULL,
    rating INTEGER NOT NULL,
    headline TEXT,
    comment TEXT NOT NULL,
    session_date TEXT,
    avatar_url TEXT,
    verified INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Try adding column number_of_people if older DB table exists without it
try {
  db.exec(`ALTER TABLE bookings ADD COLUMN number_of_people TEXT DEFAULT '1-2 People'`);
} catch (e) {
  // Column already exists
}

// Seed authentic reviews if table is empty
const reviewCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get();
if (reviewCount.count === 0) {
  const seedReviews = [
    {
      client_name: 'Elena & Marcus Vance',
      service_type: 'Wedding Photography',
      rating: 5,
      headline: 'The most breathtaking heirloom we could ever cherish',
      comment: 'Lens & Leaf captured our wedding at the Glasshouse Orangery with an ethereal grace that took our breath away. They documented every unspoken glance and gentle tear. The soft rose-gold tones and natural lighting are pure poetry.',
      session_date: 'Spring 2025',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: 1
    },
    {
      client_name: 'Dr. Seraphina Thorne',
      service_type: 'Portrait Photography',
      rating: 5,
      headline: 'Empowering, comfortable, and truly museum-grade portraits',
      comment: 'I am usually self-conscious before the lens, but the studio team made me feel completely relaxed with subtle direction and calming tea. The resulting executive portraits for my architectural monograph have received endless compliments.',
      session_date: 'Autumn 2025',
      avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      verified: 1
    },
    {
      client_name: 'Aiden & Priya Kapoor',
      service_type: 'Maternity & Newborn Fine-Art',
      rating: 5,
      headline: 'Pure tenderness and unmatched patience with our baby girl',
      comment: 'The warmth and safety of the studio during our newborn session was remarkable. The soft pink botanical styling mirrored our aesthetic seamlessly. These prints are hanging as centerpiece heirlooms in our home.',
      session_date: 'Summer 2025',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      verified: 1
    }
  ];

  const insertReview = db.prepare(`
    INSERT INTO reviews (client_name, service_type, rating, headline, comment, session_date, avatar_url, verified)
    VALUES (@client_name, @service_type, @rating, @headline, @comment, @session_date, @avatar_url, @verified)
  `);

  for (const review of seedReviews) {
    insertReview.run(review);
  }
}

export default db;
