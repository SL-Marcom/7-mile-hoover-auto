export interface VariantOption<T> {
  id: string;
  label: string;
  value: T;
}

export interface DesignRecipe {
  hero: string;
  services: string;
  cta: string;
  about: string;
  testimonials: string;
  gallery: string;
  faq: string;
  footer: string;
  navigation: string;
  card: string;
  spacing: string;
  typography: string;
  radius: string;
  shadow: string;
  animation: string;
  colorStrategy: string;
}

export const heroVariations = [
  { id: "hero-split", label: "Split layout", value: "split" },
  { id: "hero-stacked", label: "Stacked narrative", value: "stacked" },
  { id: "hero-contrast", label: "High contrast", value: "contrast" },
  { id: "hero-editorial", label: "Editorial intro", value: "editorial" },
  { id: "hero-immersive", label: "Immersive visual", value: "immersive" },
  { id: "hero-compact", label: "Compact lead", value: "compact" },
  { id: "hero-symmetric", label: "Symmetric composition", value: "symmetric" },
  { id: "hero-overlap", label: "Layered overlap", value: "overlap" },
  { id: "hero-foreground", label: "Foreground focus", value: "foreground" },
  { id: "hero-vertical", label: "Vertical rhythm", value: "vertical" },
];

export const serviceVariations = [
  { id: "services-grid", label: "Grid cards", value: "grid" },
  { id: "services-list", label: "List narrative", value: "list" },
  { id: "services-split", label: "Split feature", value: "split" },
  { id: "services-stack", label: "Stacked story", value: "stack" },
  { id: "services-icon-led", label: "Icon-led", value: "icon-led" },
  { id: "services-collage", label: "Collage cards", value: "collage" },
  { id: "services-contrast", label: "Contrast panels", value: "contrast" },
  { id: "services-steps", label: "Step-based", value: "steps" },
  { id: "services-menu", label: "Menu style", value: "menu" },
  { id: "services-tiles", label: "Tiles", value: "tiles" },
];

export const ctaVariations = [
  { id: "cta-banner", label: "Banner CTA", value: "banner" },
  { id: "cta-split", label: "Split CTA", value: "split" },
  { id: "cta-floating", label: "Floating CTA", value: "floating" },
  { id: "cta-inline", label: "Inline CTA", value: "inline" },
  { id: "cta-contrast", label: "Contrast CTA", value: "contrast" },
  { id: "cta-minimal", label: "Minimal CTA", value: "minimal" },
  { id: "cta-strong", label: "Strong CTA", value: "strong" },
  { id: "cta-anchored", label: "Anchored CTA", value: "anchored" },
  { id: "cta-quote", label: "Quote CTA", value: "quote" },
  { id: "cta-progressive", label: "Progressive CTA", value: "progressive" },
];

export const aboutVariations = [
  { id: "about-story", label: "Story introduction", value: "story" },
  { id: "about-points", label: "Key points", value: "points" },
  { id: "about-portrait", label: "Portrait-driven", value: "portrait" },
  { id: "about-split", label: "Split narrative", value: "split" },
  { id: "about-mission", label: "Mission-led", value: "mission" },
  { id: "about-timeline", label: "Timeline", value: "timeline" },
  { id: "about-contrast", label: "Contrast panel", value: "contrast" },
  { id: "about-proof", label: "Proof-led", value: "proof" },
  { id: "about-quote", label: "Quote-led", value: "quote" },
  { id: "about-grid", label: "Grid summary", value: "grid" },
];

export const testimonialVariations = [
  { id: "testimonials-cards", label: "Card grid", value: "cards" },
  { id: "testimonials-slider", label: "Slider-like", value: "slider" },
  { id: "testimonials-statements", label: "Statement list", value: "statements" },
  { id: "testimonials-inline", label: "Inline quotes", value: "inline" },
  { id: "testimonials-spotlight", label: "Spotlight", value: "spotlight" },
  { id: "testimonials-split", label: "Split review", value: "split" },
  { id: "testimonials-surface", label: "Surface panel", value: "surface" },
  { id: "testimonials-mosaic", label: "Mosaic", value: "mosaic" },
  { id: "testimonials-compact", label: "Compact", value: "compact" },
  { id: "testimonials-quote-wall", label: "Quote wall", value: "quote-wall" },
];

export const galleryVariations = [
  { id: "gallery-masonry", label: "Masonry", value: "masonry" },
  { id: "gallery-columns", label: "Columns", value: "columns" },
  { id: "gallery-scrolling", label: "Scrolling", value: "scrolling" },
  { id: "gallery-collage", label: "Collage", value: "collage" },
  { id: "gallery-split", label: "Split view", value: "split" },
  { id: "gallery-grid", label: "Grid", value: "grid" },
  { id: "gallery-featured", label: "Featured first", value: "featured" },
  { id: "gallery-stack", label: "Stacked", value: "stack" },
  { id: "gallery-tiles", label: "Tiles", value: "tiles" },
  { id: "gallery-immersive", label: "Immersive", value: "immersive" },
];

export const faqVariations = [
  { id: "faq-accordion", label: "Accordion", value: "accordion" },
  { id: "faq-cards", label: "Card rows", value: "cards" },
  { id: "faq-columns", label: "Two columns", value: "columns" },
  { id: "faq-compact", label: "Compact", value: "compact" },
  { id: "faq-split", label: "Split form", value: "split" },
  { id: "faq-narrative", label: "Narrative", value: "narrative" },
  { id: "faq-steps", label: "Step style", value: "steps" },
  { id: "faq-contrast", label: "Contrast", value: "contrast" },
  { id: "faq-list", label: "List", value: "list" },
  { id: "faq-highlight", label: "Highlight", value: "highlight" },
];

export const footerVariations = [
  { id: "footer-minimal", label: "Minimal", value: "minimal" },
  { id: "footer-split", label: "Split footer", value: "split" },
  { id: "footer-contrast", label: "Contrast footer", value: "contrast" },
  { id: "footer-compact", label: "Compact", value: "compact" },
  { id: "footer-grid", label: "Grid footer", value: "grid" },
  { id: "footer-bold", label: "Bold footer", value: "bold" },
  { id: "footer-simple", label: "Simple footer", value: "simple" },
  { id: "footer-immersive", label: "Immersive footer", value: "immersive" },
  { id: "footer-cta-led", label: "CTA-led", value: "cta-led" },
  { id: "footer-vertical", label: "Vertical stack", value: "vertical" },
];

export const navigationStyles = [
  { id: "nav-inline", label: "Inline", value: "inline" },
  { id: "nav-centered", label: "Centered", value: "centered" },
  { id: "nav-split", label: "Split", value: "split" },
  { id: "nav-overlay", label: "Overlay", value: "overlay" },
  { id: "nav-sticky", label: "Sticky", value: "sticky" },
  { id: "nav-minimal", label: "Minimal", value: "minimal" },
];

export const cardStyles = [
  { id: "card-default", label: "Default", value: "default" },
  { id: "card-elevated", label: "Elevated", value: "elevated" },
  { id: "card-outline", label: "Outline", value: "outline" },
  { id: "card-surface", label: "Surface", value: "surface" },
  { id: "card-contrast", label: "Contrast", value: "contrast" },
  { id: "card-tilted", label: "Tilted", value: "tilted" },
];

export const spacingSystems = [
  { id: "spacing-tight", label: "Tight", value: "tight" },
  { id: "spacing-balanced", label: "Balanced", value: "balanced" },
  { id: "spacing-generous", label: "Generous", value: "generous" },
  { id: "spacing-editorial", label: "Editorial", value: "editorial" },
  { id: "spacing-compact", label: "Compact", value: "compact" },
];

export const typographySystems = [
  { id: "type-modern", label: "Modern sans", value: "modern" },
  { id: "type-editorial", label: "Editorial serif", value: "editorial" },
  { id: "type-technical", label: "Technical", value: "technical" },
  { id: "type-warm", label: "Warm", value: "warm" },
  { id: "type-contrast", label: "High contrast", value: "contrast" },
];

export const radiusSystems = [
  { id: "radius-soft", label: "Soft", value: "soft" },
  { id: "radius-rounded", label: "Rounded", value: "rounded" },
  { id: "radius-square", label: "Square", value: "square" },
  { id: "radius-pill", label: "Pill", value: "pill" },
  { id: "radius-structured", label: "Structured", value: "structured" },
];

export const shadowSystems = [
  { id: "shadow-none", label: "None", value: "none" },
  { id: "shadow-subtle", label: "Subtle", value: "subtle" },
  { id: "shadow-float", label: "Float", value: "float" },
  { id: "shadow-dramatic", label: "Dramatic", value: "dramatic" },
  { id: "shadow-soft", label: "Soft", value: "soft" },
];

export const animationStyles = [
  { id: "anim-none", label: "None", value: "none" },
  { id: "anim-fade", label: "Fade", value: "fade" },
  { id: "anim-slide", label: "Slide", value: "slide" },
  { id: "anim-reveal", label: "Reveal", value: "reveal" },
  { id: "anim-energetic", label: "Energetic", value: "energetic" },
];

export const colorStrategies = [
  { id: "color-neutral", label: "Neutral", value: "neutral" },
  { id: "color-contrast", label: "Contrast", value: "contrast" },
  { id: "color-warm", label: "Warm", value: "warm" },
  { id: "color-cool", label: "Cool", value: "cool" },
  { id: "color-bold", label: "Bold", value: "bold" },
  { id: "color-minimal", label: "Minimal", value: "minimal" },
];

export function createDesignRecipe(seed: number): DesignRecipe {
  const pick = (index: number, options: VariantOption<string>[]) => {
    const value = options[(seed + index) % options.length];
    return value.value;
  };

  return {
    hero: pick(0, heroVariations),
    services: pick(1, serviceVariations),
    cta: pick(2, ctaVariations),
    about: pick(3, aboutVariations),
    testimonials: pick(4, testimonialVariations),
    gallery: pick(5, galleryVariations),
    faq: pick(6, faqVariations),
    footer: pick(7, footerVariations),
    navigation: pick(8, navigationStyles),
    card: pick(9, cardStyles),
    spacing: pick(10, spacingSystems),
    typography: pick(11, typographySystems),
    radius: pick(12, radiusSystems),
    shadow: pick(13, shadowSystems),
    animation: pick(14, animationStyles),
    colorStrategy: pick(15, colorStrategies),
  };
}

export function createDesignRecipeSet(count: number): DesignRecipe[] {
  return Array.from({ length: count }, (_, index) => createDesignRecipe(index + 1));
}
