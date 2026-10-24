# 🌿 Lens & Leaf — Fine-Art Photography & Photoshoot Studio

> *"Where precision optics meet the organic soul of life."*  
> **Brand Tagline:** Capturing Life...  
>  
> 🌐 **Live Website (GitHub Pages):** [https://ashwini-netizen.github.io/Lens-and-Leaf-website/](https://ashwini-netizen.github.io/Lens-and-Leaf-website/)  
> 💻 **Local Development:** `http://localhost:5173/` (Frontend) | `http://localhost:5000` (Backend API)

---

## 📸 Brand Identity & Logo-Based Design System

The visual design system of the **Lens & Leaf** website is extracted directly from the studio's official logo:

| Design Element | Inspiration from Logo | Palette Hex / Value |
| :--- | :--- | :--- |
| **Obsidian Charcoal & Onyx** | Camera lens barrel & primary serif typography | `#120D0E` / `#1C1518` |
| **Lotus Rose Blossom** | Delicate cradling lotus petals & *"Leaf"* script | `#C8526C` / `#DE758B` / `#F8E2E7` |
| **Champagne Sunlit Gold** | Teardrop golden rim, *"&"* symbol, and accent rules | `#C5A059` / `#D4AF37` / `#ECC480` |
| **Silk Ivory & Alabaster** | Soft morning mist, petal glow, clean canvas | `#FDF9F7` / `#F8F0EC` / `#FAEFF2` |
| **Deep Velvet Espresso** | Shadow contours and contrast cards | `#251C20` / `#171012` |

### Typography
- **Headings & Display:** `Cormorant Garamond` (Editorial luxury serif with italic swashes)
- **Body & Controls:** `Plus Jakarta Sans` (Contemporary high-legibility sans-serif)

---

## 🌟 Developed Pages & Interactive Features

1. **Home (`/`)**
   - High-impact Hero with authentic logo emblem, glowing teardrop motif, and tagline *"Capturing Life..."*
   - Floating live statistics ribbon (*1,450+ Sessions*, *12 Years Craft*, *4.98★ Average Rating*)
   - The Artistic Ethos (*The Sacred Union of The Lens & The Leaf*)
   - Featured Photography Disciplines preview
   - **Interactive Before & After Retouching Slider** demonstrating signature rose-gold color science
   - Visual anthology preview & direct reservation invitations

2. **About Us (`/#/about`)**
   - The Genesis of Lens & Leaf: The Kyoto morning dew droplet on the lotus petal
   - The 4-Pillar Creative Journey (Consultation → Styling → Shoot → Master Retouching)
   - The Studio Sanctuary: Hasselblad H6D-100c medium-format, Profoto lighting, botanical solarium
   - Creative Team Profiles (Aurelia Vance, Julian Sterling, Genevieve Chen)

3. **Photography Services (`/#/services`)**
   - 6 Curated Disciplines: Fine-Art Weddings, Heirloom Portraits, Maternity & Newborn, Editorial Fashion, Romantic Proposals, Commercial & Architectural
   - Complete breakdowns with shot lists, inclusions, turnaround times, and direct booking jumps
   - Complimentary Wardrobe & Styling Salon features

4. **Photoshoot Packages (`/#/packages`)**
   - The Blossom Session (Silver - $650)
   - The Heritage Collection (Gold / Most Celebrated - $1,350)
   - The Royal Heirloom (Diamond / Bespoke - $2,950)
   - **Interactive Add-on Investment Calculator** (Live dynamic price estimator for HMUA, Drone, Italian Leather Album, Rush Retouching, and Fine-Art Prints)

5. **Fine-Art Gallery (`/#/gallery`)**
   - Instant category filtering (All, Weddings, Portraits, Maternity, Editorial, Fine Art & Nature)
   - Responsive masonry-style grid with hover details
   - **Interactive Full-Screen Lightbox** with arrow navigation, caption stories, and camera EXIF metadata (Body, Lens, Aperture, Shutter, ISO)

6. **Portfolio Case Studies (`/#/portfolio`)**
   - In-depth client commission monographs
   - Dedicated Before & After Color Grading Inspector
   - Technical camera rigs and lighting setups

7. **Booking & Reservation Wizard (`/#/booking`)**
   - Step 1: Discipline & Tier Selection
   - Step 2: Date Picker & Lighting Time Slot (Morning Ethereal, Solarium Midday, Sunset Golden Hour)
   - Step 3: Artisan Add-on Customizations
   - Step 4: Client Information & Shoot Vision Notes
   - Step 5: Instant Booking Confirmation screen with generated Reference Code (`LL-2026-XXXX`) and direct **WhatsApp Deep-Link** generator!

8. **Testimonials & Reviews (`/#/testimonials`)**
   - Verified client reviews with 5-star ratings and category tags
   - Filter reviews by session discipline
   - Interactive **"Share Your Experience"** modal connected directly to the SQLite backend

9. **Contact & Concierge (`/#/contact`)**
   - Direct WhatsApp click-to-chat, telephone, and email triggers
   - Studio Sanctuary address, parking, and visiting hours
   - Interactive Studio Location map visualizer with driving directions
   - General enquiry form saving directly to SQLite

10. **Frequently Asked Questions (`/#/faqs`)**
    - Instant keyword search filter
    - Categorized accordion cards (Booking, Wardrobe & Styling, Turnaround, Print Rights, Weather Contingencies)

11. **Studio Operations Portal (`/#/admin`)**
    - Internal operations dashboard with live KPI counters
    - Real-time SQLite table of confirmed bookings with one-click status updates (*Confirmed*, *In Progress*, *Completed*, *Cancelled*)
    - Inquiries inbox and published testimonials ledger

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vanilla CSS Design System with CSS Custom Properties, Lucide Icons
- **Build Tool:** Vite 8.3
- **Backend:** Node.js, Express.js REST API
- **Database:** SQLite via `better-sqlite3` with persistent schema in `data/lens_leaf.db`
- **Asset Pipeline:** Responsive images, custom SVG icons, and authentic studio logo

---

## 🚀 Running the Project Locally

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+

### 2. Installation
```bash
npm install
```

### 3. Launch Development Environment
To start both the Express backend (`http://localhost:5000`) and the Vite frontend (`http://localhost:5173`):
```bash
npm run dev
```

Visit **`http://localhost:5173/`** in your browser.

---

## 🚢 Production Build & Deployment

### Build the Static Bundle
```bash
npm run build
```
This bundles the optimized production frontend into the `dist/` directory.

### Start Production Server
```bash
npm start
```
The Express server will automatically serve the API endpoints on `/api/*` and host the optimized Single Page Application from `dist/` on port **5000** (or `process.env.PORT`).

---

## 🗄️ Database Management

The SQLite database file is stored at:
```
data/lens_leaf.db
```
It contains 3 primary tables:
- `bookings`: Client reservations, reference numbers, packages, and totals
- `enquiries`: Client questions, requested dates, and notes
- `reviews`: Verified client testimonials and star ratings

The database automatically initializes and seeds authentic data upon initial launch.
