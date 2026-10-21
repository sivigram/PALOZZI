export type SeasonStyling = {
  heroColours: string[];
  bestNeutrals: string[];
  contrastStrategy: string;
  howToWear: string;
};

export const seasonStyling: Record<string, SeasonStyling> = {
  'bright-winter': {
    heroColours: ['Vivid Pink', 'Electric Blue', 'Bright Turquoise', 'Violet', 'Jade', 'Magenta', 'Hot Pink', 'Cornflower Blue'],
    bestNeutrals: ['Near Black', 'Cool White', 'Pale Grey', 'Black', 'Optical White'],
    contrastStrategy: 'Use high, graphic contrast. Pair vivid cool colours with black, optic white or another crisp cool neutral.',
    howToWear: 'Keep the palette clean, bright and sharply defined. Let one electric signature colour lead the outfit and support it with crisp cool neutrals.',
  },
  'true-winter': {
    heroColours: ['Midnight Blue', 'Crimson', 'Royal Blue', 'Deep Teal', 'Indigo', 'Turquoise', 'Berry Red', 'Cool Scarlet'],
    bestNeutrals: ['Cool White', 'Silver Grey', 'Black', 'Deep Navy'],
    contrastStrategy: 'Use clear light-to-dark contrast with crisp separation between colours.',
    howToWear: 'Build around black, white and cool dark neutrals, then add saturated jewel tones or icy accents for a sharp, polished result.',
  },
  'cool-winter': {
    heroColours: ['Fuchsia', 'Cobalt Blue', 'Cool Teal', 'Purple', 'Bright Turquoise', 'Berry', 'Cool Red', 'Electric Violet'],
    bestNeutrals: ['Black Navy', 'Optic White', 'Silver Grey', 'Black', 'Dark Navy', 'Optical White'],
    contrastStrategy: 'Use strong cool contrast with more depth and weight than an electric Bright Winter palette.',
    howToWear: 'Anchor icy or vivid cool colours with navy, anthracite or black. Prefer refined saturated colour over neon-like brightness.',
  },
  'deep-winter': {
    heroColours: ['Burgundy', 'Deep Pine', 'Deep Violet', 'Petrol Blue', 'Dark Berry', 'Deep Raspberry', 'Dark Iris', 'Evergreen'],
    bestNeutrals: ['Black', 'Deep Navy', 'Icy White', 'Charcoal', 'Midnight Navy', 'Cool Silver'],
    contrastStrategy: 'Keep the overall outfit deep and high-contrast. Lighter accents work best when grounded by a dark cool base.',
    howToWear: 'Use deep jewel colours, cool dark neutrals and rich saturated combinations. Avoid allowing pale colours to dominate the outfit.',
  },
  'bright-spring': {
    heroColours: ['Coral Pink', 'Bright Blue', 'Emerald', 'Golden Yellow', 'Bright Orchid', 'Teal', 'Bright Coral', 'Tangerine'],
    bestNeutrals: ['Charcoal', 'Cream', 'Warm Ivory'],
    contrastStrategy: 'Use lively medium-to-high contrast with clear, polished colour combinations.',
    howToWear: 'Choose vivid warm colours with crisp definition. Bright warm colour plus a clean neutral works especially well; avoid muddy or antiqued effects.',
  },
  'true-spring': {
    heroColours: ['Coral Red', 'Tropical Blue', 'Fresh Green', 'Sunny Yellow', 'Warm Orchid', 'Turquoise', 'Warm Pink', 'Orange'],
    bestNeutrals: ['Chocolate', 'Ivory', 'Golden Sand', 'Warm Ivory'],
    contrastStrategy: 'Use fresh low-to-medium contrast with clear warm colours and enough definition to keep the outfit lively.',
    howToWear: 'Build around warm bright colour with a little more depth than Warm Spring. Keep combinations sunny, clean and energetic rather than soft or smoky.',
  },
  'warm-spring': {
    heroColours: ['Warm Pink', 'Deep Turquoise', 'Fresh Green', 'Golden Yellow', 'Warm Orchid', 'Clear Teal', 'Tangerine', 'Apricot'],
    bestNeutrals: ['Chocolate Brown', 'Warm Sand', 'Warm Ivory', 'Golden Beige'],
    contrastStrategy: 'Keep contrast low to medium and let warmth lead. Avoid very sharp light-dark separation.',
    howToWear: 'Use golden, fresh colours in harmonious combinations. Pair warm coral, turquoise or green with creamy and camel-based neutrals.',
  },
  'light-spring': {
    heroColours: ['Warm Pink', 'Light Blue', 'Fresh Mint', 'Butter Yellow', 'Light Peach Pink', 'Pale Turquoise', 'Peach', 'Marigold'],
    bestNeutrals: ['Ivory Beige', 'Warm Ivory', 'Vanilla', 'Champagne', 'Light Honey'],
    contrastStrategy: 'Keep contrast gentle and light. Use close values rather than dramatic dark-light combinations.',
    howToWear: 'Choose airy warm colours and light neutrals. Soft peach, aqua, mint and warm blush work best when the whole outfit remains fresh and luminous.',
  },
  'light-summer': {
    heroColours: ['Soft Pink', 'Powder Blue', 'Seafoam', 'Lilac', 'Pale Aqua', 'Dusty Blush', 'Cool Blush', 'Periwinkle'],
    bestNeutrals: ['Light Grey', 'Cool Pearl', 'Off White', 'Pearl Grey', 'Light Cool Taupe'],
    contrastStrategy: 'Use low contrast and light values throughout. Keep transitions soft and delicate.',
    howToWear: 'Combine powdery cool colours with pale greys, soft white and cool taupe. Avoid letting one dark or vivid piece dominate.',
  },
  'true-summer': {
    heroColours: ['Muted Pink', 'Summer Blue', 'Soft Sage', 'Lavender', 'Seafoam', 'Dusty Berry', 'Rose Pink', 'Periwinkle'],
    bestNeutrals: ['Slate Grey', 'Cool Light Taupe', 'Pale Grey', 'Cool White', 'Soft Navy', 'Blue Grey'],
    contrastStrategy: 'Use low-to-medium contrast with blended, watercolor-like transitions.',
    howToWear: 'Layer soft cool shades of similar intensity. Let colours flow into one another rather than creating hard visual breaks.',
  },
  'cool-summer': {
    heroColours: ['Slate', 'Muted Rose', 'Dusty Blue', 'Sea Green', 'Cool Greige', 'Lavender', 'Muted Teal', 'Berry Rose'],
    bestNeutrals: ['Silver Grey', 'Cool White', 'Soft Navy', 'Cool Taupe'],
    contrastStrategy: 'Use low-to-medium contrast with cleaner, cooler definition than True Summer, but never sharp Winter-level contrast.',
    howToWear: 'Choose refined blue-based colours and cool muted neutrals. Slightly icier accents work well when the overall look remains soft.',
  },
  'soft-summer': {
    heroColours: ['Dusty Rose', 'Muted Cornflower', 'Grey Sage', 'Dusty Violet', 'Soft Sea Green', 'Muted Berry', 'Cool Rose', 'Periwinkle'],
    bestNeutrals: ['Slate Grey', 'Soft Cool Ivory', 'Silver Stone', 'Cool Stone', 'Mushroom Grey', 'Dusty Navy'],
    contrastStrategy: 'Keep contrast low and blended. Tonal combinations and neighbouring values are more harmonious than sharp separation.',
    howToWear: 'Build soft, smoky combinations with muted rose, mauve, sage and blue-grey. Matte and softly textured finishes support the palette well.',
  },
  'soft-autumn': {
    heroColours: ['Dusty Rose', 'Muted Petrol', 'Soft Olive', 'Muted Gold', 'Warm Dusty Mauve', 'Soft Teal', 'Muted Brick', 'Soft Terracotta'],
    bestNeutrals: ['Warm Taupe', 'Stone Beige', 'Soft Cream', 'Soft Cocoa', 'Mushroom'],
    contrastStrategy: 'Use low, blended contrast with warm muted colours of similar visual weight.',
    howToWear: 'Create tonal, earthy combinations using warm taupes, sage, terracotta and dusty teal. Prefer brushed, matte and softly textured finishes.',
  },
  'true-autumn': {
    heroColours: ['Deep Terracotta', 'Forest Green', 'Olive', 'Ochre', 'Warm Plum', 'Teal', 'Brick Red', 'Copper'],
    bestNeutrals: ['Dark Chocolate', 'Taupe', 'Warm Cream', 'Warm Chocolate', 'Camel', 'Golden Camel'],
    contrastStrategy: 'Use medium, grounded contrast with warm earthy colours and softened separation.',
    howToWear: 'Build around terracotta, mustard, olive, petrol and rich warm neutrals. Keep the result earthy, balanced and substantial without becoming overly dark.',
  },
  'warm-autumn': {
    heroColours: ['Rust Red', 'Deep Pine', 'Olive Green', 'Golden Ochre', 'Warm Plum', 'Dark Turquoise', 'Brick Red', 'Burnt Orange'],
    bestNeutrals: ['Dark Chocolate', 'Warm Taupe', 'Warm Cream', 'Camel', 'Caramel'],
    contrastStrategy: 'Use the strongest contrast in the Autumn family, but keep every colour warm and grounded.',
    howToWear: 'Combine rich warm colours with substantial neutrals. Copper, amber, deep teal and burnt orange can carry more visual weight than in True Autumn.',
  },
  'deep-autumn': {
    heroColours: ['Oxide Red', 'Deep Forest Teal', 'Dark Olive', 'Burnished Copper', 'Warm Aubergine', 'Rich Teal', 'Black Cherry', 'Rust'],
    bestNeutrals: ['Espresso Black', 'Warm Charcoal', 'Warm Cream', 'Dark Chocolate', 'Deep Warm Navy', 'Warm Stone'],
    contrastStrategy: 'Use deep, high-contrast combinations while keeping the temperature warm and earthy.',
    howToWear: 'Anchor outfits with espresso, chocolate or deep warm greens, then add rust, wine, petrol or teal. Avoid pale colours becoming the dominant value.',
  },
};
