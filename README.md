# HIKARI — Premium Japanese Sushi Restaurant Landing Page

A refined, luxurious, deeply cinematic landing page for a premium Japanese sushi restaurant. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

## Features

### Visual Design
- **Dark charcoal aesthetic** (#0A0A0A) with warm orange accents (#FF6B35)
- **Premium typography** using Bebas Neue, Oswald, Inter, and Playfair Display
- **Cinematic food photography** integrated throughout the experience
- **Glass morphism effects** on cards and overlays
- **Noise texture overlays** for premium tactile feel
- **Custom scrollbar** styling matching the brand

### Sections
1. **Hero Section** — Dramatic split composition with floating sushi platter, background video/image, stats, and floating card strip
2. **Philosophy Section** — Clean white background with editorial typography and feature cards
3. **Showcase Section** — Dark background with split layout, parallax imagery, and emotional storytelling
4. **Menu Section** — Interactive category navigation with animated menu items
5. **Reservation Section** — Glassmorphism form with split-screen layout
6. **Footer** — Premium dark footer with navigation, contact info, and newsletter

### Animations & Interactions
- **Lenis smooth scrolling** with custom easing
- **Framer Motion** scroll-triggered animations
- **Parallax image effects** on showcase section
- **Hover lift effects** on cards with cubic-bezier easing
- **Staggered reveal animations** for content blocks
- **Menu category transitions** with AnimatePresence
- **Mobile-responsive** navigation with hamburger menu

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (smooth scroll)
- Lucide React (icons)

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
sushi-restaurant/
├── app/
│   ├── globals.css          # Global styles, custom animations, glass morphism
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page with all sections
├── public/
│   └── images/              # Food photography assets
├── tailwind.config.ts       # Custom colors, fonts, animations
├── postcss.config.js        # PostCSS configuration
├── next.config.js           # Next.js configuration (static export)
└── package.json             # Dependencies
```

## Color Palette
- Deep Charcoal Black: `#0A0A0A`
- Pure White: `#FAFAFA`
- Warm Orange Accent: `#FF6B35`
- Soft Gray Typography: `#888888`
- Glass Border: `rgba(255,255,255,0.1)`

## Typography
- **Display**: Bebas Neue (headlines, hero text)
- **Heading**: Oswald (section titles, navigation)
- **Body**: Inter (paragraphs, descriptions)
- **Serif Accent**: Playfair Display (italic accents, quotes)

## Performance Notes
- Images are optimized and lazy-loaded
- Animations use `will-change` for GPU acceleration
- Lenis smooth scroll with RAF loop
- Static export for fast CDN deployment

## Browser Support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile responsive (iOS Safari, Chrome Mobile)
# hikari-restaurant
