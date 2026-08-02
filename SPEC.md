# P&A Coquette - Landing Page Specification

## 1. Concept & Vision

**Subject:** A luxury e-commerce boutique called "P&A Coquette" selling artisanal purses and curated makeup products for women who appreciate feminine elegance.

**Audience:** Women aged 20-40 who seek distinctive, high-quality accessories that express their personal style—someone who would rather invest in one meaningful piece than accumulate disposable trends.

**Page's single job:** Convert visitors into shoppers through an immersive, dreamy experience that makes the products feel like treasures worth owning.

**Aesthetic direction chosen:** French boudoir meets Japanese kawaii—soft, tactile, and unapologetically feminine. Think silk ribbons, porcelain perfume bottles, and the inside of a jewellery box. This is NOT a generic pink gradient site; it's an editorial moment that feels like opening a gift.

**Scroll philosophy:** Smooth, fluid scrolling with custom easing. Sections reveal gracefully as the user scrolls, not abruptly. Navigation uses smooth-scroll behavior for a premium feel.

## 2. Design Language

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `rose-blush` | `#FFB5C5` | Primary soft pink, cards, accents |
| `lavender-dream` | `#E6E6FA` | Secondary, category backgrounds |
| `cream-white` | `#FFF8F9` | Page background |
| `hot-pink` | `#FF69B4` | CTA buttons, important actions |
| `deep-rose` | `#C71585` | Hover states on CTAs |
| `soft-lavender` | `#DCD0FF` | Highlights, gradients |
| `text-primary` | `#4A3340` | Main body text (warm brown-purple) |
| `text-secondary` | `#8B7082` | Captions, secondary text |

### Typography
- **Display:** `Cormorant Garamond` (Google Fonts) - Elegant serif with high contrast, used for hero headline at large scale. Carries editorial sophistication.
- **Body:** `Quicksand` (Google Fonts) - Rounded, friendly sans-serif. Clean legibility with feminine softness.
- **Accent:** `Petit Formal Script` (Google Fonts) - For decorative labels, "new arrival" tags, price highlights.

### Type Scale
- Hero headline: 4rem/64px (mobile: 2.5rem), Cormorant Garamond 600
- Section titles: 2.5rem/40px, Cormorant Garamond 500
- Body: 1rem/16px, Quicksand 400
- Small/labels: 0.875rem/14px, Quicksand 500
- Price: 1.25rem, Petit Formal Script

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical (mobile: 48px)
- Card padding: 24px
- Border radius: 16px (cards), 24px (buttons), 9999px (pills)
- Max content width: 1280px

### Motion Philosophy
All animation serves the "dreamy gift opening" feeling:
- **Page load:** Staggered fade-up sequence, 400ms per element, 100ms stagger
- **Scroll reveals:** Soft slide-up with opacity, triggered at 20% viewport
- **Hover states:** Gentle scale (1.02-1.05), soft shadow lift
- **3D model:** Continuous slow rotation, mouse-parallax response
- **Signature moment:** Floating sparkle particles around 3D model

### Visual Assets
- **Icons:** Lucide React (consistent stroke weight, rounded style)
- **3D Model:** Interactive floating purse using React Three Fiber + Drei
- **Decorative:** CSS-generated sparkles, soft blob shapes as background accents
- **Images:** Placeholder product images via picsum.photos with specific seeds for consistency

## 3. Layout & Structure

### Page Flow (Single Page)
```
┌─────────────────────────────────────┐
│           HEADER (sticky)           │
│  [♡]    ARIADNA    [cart] [profile] │
├─────────────────────────────────────┤
│                                     │
│              HERO                   │
│   "Treasures for the               │
│    Extraordinary You"               │
│                                     │
│        [3D PURSE CANVAS]            │
│                                     │
│      [ Shop the Collection ]        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         CATEGORIES                   │
│    [Carteras]    [Maquillaje]       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│       PRODUCTOS DESTACADOS          │
│   ┌───┐  ┌───┐  ┌───┐  ┌───┐       │
│   │   │  │   │  │   │  │   │       │
│   └───┘  └───┘  └───┘  └───┘       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         TESTIMONIOS                 │
│     ◀ [  Card Carousel  ] ▶        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         FOOTER                      │
│   Subscribe: [email] [Join]         │
│                                     │
└─────────────────────────────────────┘
```

### Responsive Strategy
- **Mobile-first:** Stack everything vertically, full-width cards
- **Tablet (768px+):** 2-column product grid, side-by-side categories
- **Desktop (1024px+):** 4-column product grid, 3D canvas at full size
- **Large (1280px+):** Max-width container, generous whitespace

## 4. Features & Interactions

### Header
- Transparent on load, white background on scroll (backdrop blur)
- Logo: "ARIADNA" in Cormorant Garamond, letterspaced
- Nav: Home, Shop, About, Contact (hidden on mobile, hamburger menu)
- Actions: Wishlist (heart icon), Cart (bag icon with count badge)

### Hero Section
- Headline with word-by-word stagger animation
- 3D Canvas taking 50% of hero width on desktop
- CTA button: Hot pink, scale 1.05 on hover, press effect on click
- Floating sparkle particles around 3D model (CSS animated)

### Categories
- Two large cards: "Carteras" (purses) and "Maquillaje" (makeup)
- On hover: scale 1.03, shadow deepens, subtle gradient shift
- Each card has icon, title, and "Explorar" link

### Product Cards
- Image with zoom effect on hover (scale 1.08, overflow hidden)
- Floating action button appears on hover: "Add to cart" + quick wishlist
- Heart icon toggles filled/outlined with bounce animation
- Price displayed in Petit Formal Script
- "Nuevo" ribbon on some products (CSS triangular ribbon)

### Testimonials Carousel
- Auto-advances every 5 seconds (pauses on hover)
- Manual navigation with arrow buttons
- Cards have soft shadow, avatar, name, and star rating
- Dots indicator below

### Newsletter Footer
- Email input with pink focus ring
- Submit button matches CTA style
- Success state: Input replaced with "¡Bienvenida!" message

## 5. Component Inventory

### `<Header />`
- States: transparent (initial), solid (scrolled), mobile-menu-open
- Transitions: background 300ms ease, menu slide-down 250ms

### `<HeroSection />`
- Contains: headline, 3D canvas, CTA
- Animation: sequence stagger on load

### `<ThreeDCanvas />`
- Loads GLB model of purse (or fallback geometric shape)
- Mouse parallax: model rotates slightly toward cursor
- Ambient rotation when idle
- Sparkle particles floating around model

### `<CategoryCard />`
- Props: title, icon, href, gradient colors
- States: default, hover (scale + shadow), active (slight press)

### `<ProductCard />`
- Props: image, title, price, isNew, inWishlist
- States: default, hover (image zoom + action reveal), wishlist-active

### `<TestimonialCarousel />`
- Auto-play with pause-on-hover
- Navigation: arrows + dots
- Smooth slide transition

### `<Footer />`
- Newsletter form with validation
- Social links
- Copyright

## 6. Technical Approach

### Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom config
- **Animation:** Framer Motion
- **3D:** Three.js via React Three Fiber + Drei
- **Icons:** Lucide React
- **Fonts:** Google Fonts (next/font)

### Key Implementation Details
- Use `next/font` for optimal font loading
- `Suspense` boundary around 3D canvas with skeleton loader
- Framer Motion `useInView` for scroll animations
- CSS custom properties for theme tokens
- `prefers-reduced-motion` media query respected

### 3D Model Loading
- Model path: `/models/purse.glb` (placeholder, will use geometric fallback)
- `<Canvas>` with `dpr` capped at 2 for performance
- `<Environment>` for soft lighting
- `<Float>` component for gentle bobbing animation
- `<OrbitControls>` disabled for auto-rotate only (mouse parallax enabled)
