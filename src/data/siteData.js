// =====================================================================
// LENS & LEAF PHOTOGRAPHY STUDIO — COMPREHENSIVE BRAND DATA
// Built around the 7 Brand Palette Colors:
// Soft Blush Pink (#FAD6D2), Rose Pink (#F7A1A7), Coral Red (#E94B50),
// Warm Orange (#F28C28), Cream / Peach (#FFF0E7), Deep Black (#17110F), Silver Grey (#A6A6A6)
// Tagline: "Capturing Life..."
// =====================================================================

export const STUDIO_INFO = {
  name: 'Lens & Leaf',
  tagline: 'Capturing Life...',
  subheadline: 'Boutique Fine-Art Photography & Creative Studio',
  phone: '+1 (212) 584-3320',
  phoneDisplay: '+1 (212) 584-3320',
  email: 'studio@lensandleaf.com',
  address: '148 Rosewood Boulevard, Jayalakshmipuram',
  city: 'Mysore, Karnataka 570012',
  whatsappNumber: '15558924377',
  hours: [
    { days: 'Monday – Friday', time: '09:00 AM – 07:00 PM' },
    { days: 'Saturday', time: '10:00 AM – 06:00 PM' },
    { days: 'Sunday', time: 'Private Sessions By Appointment' }
  ],
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    pinterest: 'https://pinterest.com'
  }
};

// All 12 Photography Services specified in Requirement #8
export const SERVICES_DATA = [
  {
    id: 'portrait',
    title: 'Portrait Photography',
    tagline: 'Authentic expression sculpted by gentle, painterly light.',
    shortDesc: 'Artistic individual portraits that capture authentic character, personal milestones, and emotional depth in our serene studio or outdoor natural settings.',
    fullDesc: 'Our portrait sessions are unhurried, collaborative creative journeys. Whether celebrating a life transition, creating personal heirloom artwork, or capturing your sovereign presence, we use soft directional strobes and natural solarium light to produce luminous skin tones and soulful compositions.',
    cover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Pre-session wardrobe & moodboard consultation',
      '60-90 minutes of dedicated studio or solarium time',
      'Up to 3 outfit changes with steam press available',
      'Private online gallery with 20 master-retouched high-resolution images',
      'Full personal printing rights included'
    ],
    duration: '60 - 90 Minutes',
    startingPrice: 450,
    turnaround: '5 to 7 Days',
    badge: 'Signature Classic'
  },
  {
    id: 'couple',
    title: 'Couple Photography',
    tagline: 'Quiet intimacy and spontaneous laughter between two souls.',
    shortDesc: 'Cherish your connection with poetic imagery that celebrates gentle gestures, shared laughter, and genuine affection without rigid or artificial posing.',
    fullDesc: 'We believe romance is best captured in in-between moments: a hand brushing a shoulder, private laughter, or quiet stillness in golden sunset light. We design comfortable settings where couples can simply focus on each other while we document the magic.',
    cover: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Styling advice & location scouting coordination',
      '2 hours of shooting at studio or scenic outdoor vista',
      'Curated online gallery with 35 master-retouched images',
      'Complimentary social media highlight teaser within 48 hours',
      'Archival fine-art 8x10 print included'
    ],
    duration: '90 - 120 Minutes',
    startingPrice: 550,
    turnaround: '7 Days',
    badge: 'Popular'
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding Photoshoots',
    tagline: 'The anticipation and romance before taking the sacred vows.',
    shortDesc: 'Cinematic engagement stories filmed and photographed across architectural estates, blooming gardens, and dramatic sunset backdrops.',
    fullDesc: 'Your journey before the aisle is filled with electric anticipation. We craft cinematic pre-wedding narratives tailored to your unique love story, combining grand environmental perspectives with intimate close-up emotion.',
    cover: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Creative direction & narrative moodboard planning',
      'Two distinct locations (Studio + Sunset Landscape)',
      'Multiple attire styling options & gown movement assistance',
      '50 fully retouched editorial images in high resolution',
      'Signature guestbook canvas print for your wedding day'
    ],
    duration: 'Half Day (3 - 4 Hours)',
    startingPrice: 850,
    turnaround: '10 Days',
    badge: 'Editorial'
  },
  {
    id: 'maternity',
    title: 'Maternity Photography',
    tagline: 'Honoring the sacred bloom of life and maternal grace.',
    shortDesc: 'Celebrate the miraculous journey of motherhood in a tranquil, climate-controlled studio sanctuary with organic silks, gentle lighting, and unhurried comfort.',
    fullDesc: 'Pregnancy is a sacred threshold. Our studio is prepared with warm, relaxing ambient temperatures, organic fabrics, and soothing botanical aromas so expectant mothers feel radiant, supported, and completely at peace before the camera.',
    cover: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Access to curated studio maternity gowns & silk drape wraps',
      'Partner & older sibling portraits seamlessly incorporated',
      'Gentle pacing with rest breaks and refreshments',
      '25 fine-art retouched high-resolution images',
      'Heirloom matted 11x14 cotton print'
    ],
    duration: '90 Minutes',
    startingPrice: 600,
    turnaround: '7 Days',
    badge: 'Gentle Art'
  },
  {
    id: 'newborn-baby',
    title: 'Newborn and Baby Photography',
    tagline: 'Tiny fingers, soft slumbers, and the pure wonder of new life.',
    shortDesc: 'Safety-certified infant sessions conducted in a sanitized, warm sanctuary with natural cashmere swaddles and soothing ambient soundscapes.',
    fullDesc: 'We prioritize infant comfort, hygiene, and warmth above all else. Every wrap is washed in hypoallergenic organic detergents, the studio room is gently warmed to baby-optimal temperatures, and our poses follow natural, restful sleeping positions.',
    cover: 'https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Sterilized organic wraps, baskets, and hypoallergenic knits',
      'Unhurried session allowing for feeding, soothing, and snuggles',
      'Parent and newborn bonding frames included',
      '25 meticulously softened high-resolution files',
      'Birth announcement digital design kit'
    ],
    duration: '2 - 3 Hours (Baby-Led)',
    startingPrice: 650,
    turnaround: '7 to 10 Days',
    badge: 'Safety Certified'
  },
  {
    id: 'family',
    title: 'Family Photography',
    tagline: 'Generations bound by love, preserved in timeless warmth.',
    shortDesc: 'Natural, joy-filled portraits capturing multi-generational family bonds, energetic children, and heartfelt connections in our spacious studio or outdoors.',
    fullDesc: 'Family sessions should feel like play, not a chore. We guide natural interactions that draw out real smiles, loving hugs, and uninhibited childhood joy, creating heirloom wall art that your family will treasure for generations.',
    cover: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Wardrobe color coordination guidance for the entire family',
      'Accommodates nuclear families & multi-generational groups',
      'A mix of structured groupings and dynamic candid captures',
      '30 retouched high-resolution images in private gallery',
      'Option for custom-framed canvas displays'
    ],
    duration: '60 - 90 Minutes',
    startingPrice: 500,
    turnaround: '7 Days',
    badge: 'Family Heirloom'
  },
  {
    id: 'birthday-occasion',
    title: 'Birthday and Special Occasion Photography',
    tagline: 'Milestone celebrations and festive memories preserved forever.',
    shortDesc: 'Vibrant, elegant documentation of milestone birthdays, anniversaries, graduations, baby showers, and festive gatherings with loved ones.',
    fullDesc: 'Every milestone year deserves celebration. We bring artful documentary vision to your birthdays and private gatherings, capturing festive decor, the cake cutting, heartfelt toasts, and the uninhibited laughter of guests.',
    cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'On-location event coverage or studio milestone setup',
      'Comprehensive coverage of guests, decor, and key moments',
      'High-speed delivery option for prompt social sharing',
      'Full curated collection of retouched digital photographs',
      'Private cloud download gallery for all event attendees'
    ],
    duration: '2 - 4 Hours',
    startingPrice: 600,
    turnaround: '5 to 7 Days',
    badge: 'Celebrations'
  },
  {
    id: 'wedding',
    title: 'Wedding Photography',
    tagline: 'Timeless romance captured with poetic light and heartfelt candor.',
    shortDesc: 'Fine-art documentary coverage for destination weddings, royal ceremonies, and intimate garden vows with medium-format optical excellence.',
    fullDesc: 'We treat every wedding as a sacred cinematic monograph. From the quiet morning preparation to emotional vows and energetic dancing under fairy lights, our dual master photographers capture every glance and unspoken feeling with rose-gold warmth.',
    cover: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Two master photographers for full-perspective coverage',
      'Complimentary engagement portrait session included',
      'Full day timeline coordination & lighting planning',
      'Archival Italian flushmount leather album',
      'Complete high-res retouched collection & online cloud archive'
    ],
    duration: '8 - 12 Hours / Full Day',
    startingPrice: 2400,
    turnaround: '3 to 4 Weeks',
    badge: 'Master Discipline'
  },
  {
    id: 'fashion-model',
    title: 'Fashion and Model Photography',
    tagline: 'Haute couture concepts, dynamic movement, and striking silhouettes.',
    shortDesc: 'High-concept fashion portfolios, editorial campaigns, and modeling lookbooks created with tethered medium-format cameras and versatile lighting grids.',
    fullDesc: 'We collaborate with models, designers, and agencies to build commanding visual portfolios. Utilizing high-end Profoto modifiers, colored gel accents, and precision lens optics, we create images that stand out in agency submissions and fashion publications.',
    cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Creative moodboard direction & posing guidance',
      'Multiple background sets (cyclorama, velvet, industrial brick)',
      'Tethered live monitor preview during the shoot',
      'Advanced beauty skin retouching maintaining natural pores',
      'Commercial usage release & comp-card ready files'
    ],
    duration: '2 - 3 Hours',
    startingPrice: 750,
    turnaround: '5 Days',
    badge: 'High Impact'
  },
  {
    id: 'product',
    title: 'Product Photography',
    tagline: 'Sculpted reflections, pristine textures, and elevated commercial appeal.',
    shortDesc: 'Crisp, color-accurate e-commerce stills, macro beauty product close-ups, and luxury lifestyle staging that command customer trust.',
    fullDesc: 'We bring out the tactile essence of your products. Using macro perspective lenses, calibrated polarizing filters, and precision tabletop lighting setups, we highlight textures, glass reflections, and authentic material finishes for digital storefronts and print catalogs.',
    cover: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Product cleaning, dust removal, and prop styling staging',
      'Pure white/transparent background cutouts + styled lifestyle scenes',
      'Color-calibrated with X-Rite ColorChecker charts',
      'Web-optimized and ultra-high-resolution print formats',
      'Full commercial worldwide copyright release'
    ],
    duration: 'Custom per SKU / Half Day',
    startingPrice: 600,
    turnaround: '5 to 7 Days',
    badge: 'Commercial'
  },

  {
    id: 'creative-studio',
    title: 'Creative Studio Photoshoots',
    tagline: 'Boundless artistic concepts brought to life with experimental light.',
    shortDesc: 'Bespoke artistic productions combining floral installations, prism refractions, textured fabrics, and atmospheric smoke in our versatile studio bay.',
    fullDesc: 'Have a visionary concept that does not fit into traditional categories? Our creative studio sessions invite experimental expression. We combine custom set designs, botanical arrangements, colored gels, and specialized optics to craft one-of-a-kind art.',
    cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80'
    ],
    inclusions: [
      'Concept development consultation with our art director',
      'Access to full lighting grid, modifiers, gels, and fog effects',
      'Floral and textured backdrop customization options',
      'Comprehensive master artistic grading on all select images',
      'Exhibition-ready digital master files'
    ],
    duration: '2 - 4 Hours',
    startingPrice: 700,
    turnaround: '7 Days',
    badge: 'Artistic Concept'
  }
];

// Gallery items categorized strictly to match Requirement #9
// Categories: All Work, Portraits, Couples, Maternity, Newborns, Weddings, Events, Fashion, Products
export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'The Glasshouse Ceremony Vows',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
    camera: 'Hasselblad H6D-100c',
    lens: 'HC 2,2/100mm',
    settings: 'f/2.2 • 1/500s • ISO 100',
    location: 'Botanical Glasshouse Conservatory',
    caption: 'Soft sunlight filtering through historic leaded glass as Clara and Julian shared their vows.'
  },
  {
    id: 2,
    title: 'Rose Petal Solitude',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    camera: 'Sony α1',
    lens: 'FE 85mm f/1.4 GM',
    settings: 'f/1.4 • 1/800s • ISO 64',
    location: 'Lens & Leaf Sanctuary Studio',
    caption: 'Sculpted key lighting balancing natural ambient glow with soft rose-pink shadow roll-off.'
  },
  {
    id: 3,
    title: 'Sacred First Breath',
    category: 'Maternity',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85',
    camera: 'Canon EOS R5',
    lens: 'RF 50mm f/1.2L USM',
    settings: 'f/1.8 • 1/250s • ISO 200',
    location: 'Private Solarium Suite',
    caption: 'Gentle morning warmth wrapping new parents in an intimate, serene moment of stillness.'
  },
  {
    id: 4,
    title: 'Silk & Structure',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    camera: 'Hasselblad X2D 100C',
    lens: 'XCD 55mm f/2.5 V',
    settings: 'f/4.0 • 1/160s • ISO 64',
    location: 'Atelier Monochrome Suite',
    caption: 'Haute couture editorial exploring organic fluid drape against brutalist architectural lines.'
  },
  {
    id: 5,
    title: 'Golden Hour Embrace',
    category: 'Couples',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
    camera: 'Sony α7R V',
    lens: 'FE 50mm f/1.2 GM',
    settings: 'f/1.2 • 1/2000s • ISO 100',
    location: 'Coastal Bluffs of Big Sur',
    caption: 'Unrehearsed laughter as the Pacific mist caught the last embers of warm sunset light.'
  },
  {
    id: 6,
    title: 'Ethereal Newborn Repose',
    category: 'Newborns',
    image: 'https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=1200&q=85',
    camera: 'Canon EOS R5',
    lens: 'RF 85mm f/1.2L USM DS',
    settings: 'f/1.4 • 1/200s • ISO 160',
    location: 'Lens & Leaf Studio Sanctuary',
    caption: 'Nine days young, curled peacefully inside organic cashmere and gentle feather pillows.'
  },
  {
    id: 7,
    title: 'Candlelit Milestone Gala',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
    camera: 'Sony α1',
    lens: 'FE 24-70mm f/2.8 GM II',
    settings: 'f/2.8 • 1/160s • ISO 800',
    location: 'The Grand Orangery Ballroom',
    caption: 'Heartfelt toasts and clinking crystal under cascading chandeliers during an anniversary gala.'
  },
  {
    id: 8,
    title: 'Bespoke Horology Still Life',
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
    camera: 'Hasselblad X2D 100C',
    lens: 'XCD 120mm Macro',
    settings: 'f/11 • 1/125s • ISO 64',
    location: 'Studio Tabletop Light Stage',
    caption: 'Refined sapphire crystal facets illuminated with micro-diffusers and precision rim accents.'
  },
  {
    id: 9,
    title: 'Chateau Courtyard Vows',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    camera: 'Sony α1',
    lens: 'FE 35mm f/1.4 GM',
    settings: 'f/2.0 • 1/1250s • ISO 100',
    location: 'Loire Valley Chateau',
    caption: 'Chamber music, champagne whispers, and the joyful confetti exit beneath historic arches.'
  },
  {
    id: 10,
    title: 'Architectural Visionary',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
    camera: 'Sony α1',
    lens: 'FE 135mm f/1.8 GM',
    settings: 'f/2.0 • 1/640s • ISO 100',
    location: 'Metropolitan Art Pavilions',
    caption: 'Executive portrait capturing thoughtful visionary composure for an architectural monograph.'
  },
  {
    id: 11,
    title: 'Sunlit Meadow Romance',
    category: 'Couples',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
    camera: 'Canon EOS R5',
    lens: 'RF 85mm f/1.2L',
    settings: 'f/1.4 • 1/1600s • ISO 100',
    location: 'Highland Wildflower Reserve',
    caption: 'Unfiltered laughter and shared whispers as evening breeze ripples through the long grass.'
  },
  {
    id: 12,
    title: 'Floral Sanctuary Maternity',
    category: 'Maternity',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=85',
    camera: 'Hasselblad H6D-100c',
    lens: 'HC 100mm f/2.2',
    settings: 'f/2.8 • 1/320s • ISO 100',
    location: 'Lens & Leaf Floral Sanctuary',
    caption: 'Handcrafted floral halo and flowing blush chiffon embracing maternal anticipation.'
  },
  {
    id: 14,
    title: 'Avant-Garde Silhouette',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
    camera: 'Leica SL2',
    lens: 'Summilux-SL 50mm f/1.4',
    settings: 'f/1.4 • 1/1000s • ISO 50',
    location: 'Dune Sand Pavilion',
    caption: 'Fashion campaign exploring wind, natural drapery, and warm earthy tones in dramatic harmony.'
  },
  {
    id: 15,
    title: 'Artisan Ceramic Tableware',
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    camera: 'Sony α1',
    lens: 'FE 90mm f/2.8 Macro G',
    settings: 'f/8 • 1/160s • ISO 100',
    location: 'Studio Still Life Bay',
    caption: 'Tactile stoneware texture and rich coffee crema captured for an artisanal atelier catalog.'
  },
  {
    id: 16,
    title: 'Garden Soirée Birthday',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=85',
    camera: 'Canon EOS R5',
    lens: 'RF 35mm f/1.8 Macro',
    settings: 'f/2.2 • 1/400s • ISO 200',
    location: 'Rosewood Garden Courtyard',
    caption: 'Bespoke floral cake presentation surrounded by sparklers and joyful family applause.'
  }
];

// Studio Experience Data for Requirement #10
export const STUDIO_EXPERIENCE_DATA = {
  intro: {
    headline: 'An Art-Directed Sanctuary for Light & Emotion',
    description: 'Located in the heart of Mysore, the Lens & Leaf Studio is an intimate 2,400-square-foot sanctuary thoughtfully curated to put clients at ease. Designed with soaring 14-foot ceilings, north-facing frosted solarium glass, and sound-dampened acoustics, every square foot is optimized for pure photographic artistry.'
  },
  gallery: [
    {
      title: 'Solarium Natural Light Bay',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      description: 'Expansive north-facing windows providing diffuse, wrap-around daylight all day long.'
    },
    {
      title: 'Fine-Art Textured Canvas Wall',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      description: 'Hand-painted canvas backdrops in signature blush pink, deep obsidian, and warm peach.'
    },
    {
      title: 'Private Client Lounge & Tea Bar',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
      description: 'A relaxing haven offering bespoke botanical teas, espresso, and quiet pre-session reflection.'
    },
    {
      title: 'Vanity & Styling Dressing Suite',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      description: 'Professional high-CRI makeup illumination, garment steamers, and full-length mirrors.'
    }
  ],
  backdrops: [
    {
      name: 'Signature Blush Canvas',
      color: '#FAD6D2',
      type: 'Hand-Painted Canvas',
      bestFor: 'Fine-Art Portraits, Maternity & Floral Concepts'
    },
    {
      name: 'Warm Peach Solarium',
      color: '#FFF0E7',
      type: 'Architectural Lime-Wash',
      bestFor: 'Couples, Warm Editorial & Family Warmth'
    },
    {
      name: 'Deep Obsidian Charcoal',
      color: '#17110F',
      type: 'Textured Velvet & Matte Seamless',
      bestFor: 'Dramatic Low-Key Portraits, High-Fashion & Luxury Horology'
    },
    {
      name: 'Pure Seamless White / Silver',
      color: '#E8E8E8',
      type: 'Superior Seamless Paper Cyclorama',
      bestFor: 'Executive Headshots, E-Commerce Products & Lookbooks'
    }
  ],
  equipment: [
    {
      title: 'Profoto Pro-11 & B10X Strobes',
      detail: 'Ultra-fast recycling and color consistency within ±50K for impeccable skin tones.'
    },
    {
      title: 'Large Octa & Parabolic Diffusers',
      detail: 'Up to 7-foot parabolic umbrellas providing soft, wrap-around illumination.'
    },
    {
      title: 'Calibrated EIZO ColorEdge Tethering',
      detail: 'Review every capture live in real-time on 4K color-accurate IPS displays.'
    },
    {
      title: 'Optical Snoot & Gobo Projectors',
      detail: 'Precision light sculpting for dramatic window-shadow and organic leaf projections.'
    }
  ],
  amenities: [
    'Private dressing room & en-suite bathroom',
    'Professional garment steam press & styling station',
    'Artisan botanical tea and Nespresso coffee service',
    'High-speed Wi-Fi and Bluetooth sound system with client playlist pairing',
    'Climate-controlled temperature tailored for newborn and maternity comfort',
    'Discreet street-level private entrance with elevator access'
  ]
};

// 8 Frequently Asked Questions matching Requirement #14 precisely
export const FAQS = [
  {
    category: 'Booking & Scheduling',
    question: 'How do I book a photoshoot with Lens & Leaf?',
    answer: 'Booking your session is simple: select your preferred photography discipline through our online enquiry and booking system, choose your ideal date and time window, and provide your session details. Our studio concierge will contact you within 24 hours to confirm availability, answer any questions, and guide you through the initial consultation.'
  },
  {
    category: 'Available Services',
    question: 'What photography services do you offer?',
    answer: 'We specialize in 12 core disciplines: Portrait Photography, Couple Photography, Pre-Wedding Photoshoots, Maternity Photography, Newborn and Baby Photography, Family Photography, Birthday & Special Occasion Photography, Wedding Photography, Fashion & Model Photography, Product Photography, Professional Headshots, and Creative Studio Sessions.'
  },
  {
    category: 'Session Details',
    question: 'How long does a typical photography session last?',
    answer: 'Session duration varies by service. Professional headshots typically take 30 to 45 minutes, individual portraits and family sessions run 60 to 90 minutes, while newborn sessions are paced unhurriedly at 2 to 3 hours to allow for baby comfort and feedings. Wedding and commercial coverage can span from half-day to full-day multi-hour commissions.'
  },
  {
    category: 'Styling & Preparation',
    question: 'What guidance do you provide for outfits and session preparation?',
    answer: 'Every client receives a pre-session styling consultation. We provide palette recommendations that harmonize with our soft blush, cream, and rose-gold studio tones. We also offer a curated studio wardrobe of maternity gowns and newborn wraps, along with an on-site garment steamer and private vanity suite.'
  },
  {
    category: 'Delivery & Turnaround',
    question: 'How and when will our edited photographs be delivered?',
    answer: 'Standard studio sessions (portraits, headshots, maternity) are delivered within 5 to 7 business days via a private, password-protected high-resolution online gallery. Wedding collections are delivered within 3 to 4 weeks. Every image is carefully color-calibrated and master-retouched for both digital sharing and archival museum printing.'
  },
  {
    category: 'Pricing & Packages',
    question: 'What are your pricing guidelines and payment terms?',
    answer: 'Our sessions start from $250 for headshots, $450 for portraits, and $2,400 for comprehensive wedding commissions. A 30% retainer reserves your dedicated calendar slot, with the balance due before final gallery release. Custom packages and bespoke commercial licensing can be configured upon request.'
  },
  {
    category: 'Policies',
    question: 'What is your rescheduling and cancellation policy?',
    answer: 'We understand that unexpected illness or weather changes occur. For studio sessions, we offer complimentary rescheduling with at least 48 hours notice. For outdoor sessions affected by adverse weather, we easily transition to our studio sanctuary or reschedule to an agreed backup date with zero penalty fees.'
  },
  {
    category: 'Studio Experience',
    question: 'Is the studio available for private walkthroughs or studio rental?',
    answer: 'Yes. Prospective clients are welcome to schedule a complimentary 15-minute studio walkthrough to view our backdrops, lighting bays, and sample flushmount albums. We also offer private studio booking for photographers, creators, and brands depending on calendar availability.'
  }
];

// Authentic Client Testimonials (Requirement #13)
export const TESTIMONIALS_DATA = [
  {
    id: 1,
    client: 'Elena & Marcus Vance',
    service: 'Wedding Photography',
    quote: 'Lens & Leaf captured our wedding at the Glasshouse Conservatory with an ethereal grace that took our breath away. The soft rose-gold tones and gentle natural lighting are pure poetry.',
    location: 'Hudson Valley, NY',
    date: 'Spring 2025'
  },
  {
    id: 2,
    client: 'Dr. Seraphina Thorne',
    service: 'Portrait Photography',
    quote: 'I am usually self-conscious before the lens, but the studio team made me feel completely relaxed with subtle direction. The resulting portraits for my architectural monograph are museum-grade.',
    location: 'Manhattan, NY',
    date: 'Autumn 2025'
  },
  {
    id: 3,
    client: 'Aiden & Priya Kapoor',
    service: 'Maternity & Newborn',
    quote: 'The patience and gentle warmth during our newborn session was remarkable. The soft pink botanical styling mirrored our home aesthetic seamlessly. These prints are cherished heirlooms.',
    location: 'Brooklyn, NY',
    date: 'Summer 2025'
  }
];
