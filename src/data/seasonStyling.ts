export type SeasonStyling = {
  heroColours: string[];
  bestNeutrals: string[];
  metals: string[];
  avoid: string[];
  contrastStrategy: string;
  howToWear: string;
};

export const seasonStyling: Record<string, SeasonStyling> = {
  'bright-winter': {
    heroColours: ['Electric Blue', 'Cobalt Blue', 'Emerald Green', 'Bright Turquoise', 'Fuchsia', 'Shocking Pink', 'True Red', 'Acid Yellow'],
    bestNeutrals: ['Optic White', 'Ice Grey', 'Silver Grey', 'Anthracite Grey', 'Black'],
    metals: ['Polished silver', 'Platinum', 'White gold'],
    avoid: ['Muted or dusty colours', 'Warm brown and camel', 'Rust and terracotta', 'Mustard and olive', 'Warm orange', 'Cream and ecru'],
    contrastStrategy: 'Use high, graphic contrast. Pair vivid cool colours with black, optic white or another crisp cool neutral.',
    howToWear: 'Keep the palette clean, bright and sharply defined. Let one electric signature colour lead the outfit and support it with crisp cool neutrals.',
  },
  'true-winter': {
    heroColours: ['Cobalt Blue', 'Electric Blue', 'Emerald Green', 'Fuchsia', 'True Red', 'Royal Purple', 'Icy Lavender', 'Acid Yellow'],
    bestNeutrals: ['Optic White', 'Ice Grey', 'Silver Grey', 'Anthracite Grey', 'Black'],
    metals: ['High-shine silver', 'Platinum', 'Chrome'],
    avoid: ['Warm earthy colours', 'Muted or dusty shades', 'Camel and warm beige', 'Rust and terracotta', 'Warm orange', 'Soft greyed colours'],
    contrastStrategy: 'Use clear light-to-dark contrast with crisp separation between colours.',
    howToWear: 'Build around black, white and cool dark neutrals, then add saturated jewel tones or icy accents for a sharp, polished result.',
  },
  'cool-winter': {
    heroColours: ['Cool Emerald Green', 'Cool Teal', 'Cobalt Blue', 'Sapphire Blue', 'Cool Fuchsia', 'Cranberry Red', 'Royal Purple', 'Ice Pink'],
    bestNeutrals: ['Ice White', 'Pearl Grey', 'Silver Grey', 'Anthracite Grey', 'Black'],
    metals: ['Silver', 'Platinum', 'White gold'],
    avoid: ['Warm earthy colours', 'Golden browns', 'Warm orange', 'Muted dusty shades', 'Yellow-based greens', 'Soft warm neutrals'],
    contrastStrategy: 'Use strong cool contrast with more depth and weight than an electric Bright Winter palette.',
    howToWear: 'Anchor icy or vivid cool colours with navy, anthracite or black. Prefer refined saturated colour over neon-like brightness.',
  },
  'deep-winter': {
    heroColours: ['Deep Burgundy', 'Ruby Red', 'Aubergine', 'Deep Violet', 'Sapphire Blue', 'Deep Teal', 'Dark Emerald Green', 'Icy Turquoise'],
    bestNeutrals: ['Optic White', 'Ice Grey', 'Cool Grey', 'Graphite', 'Black'],
    metals: ['Silver', 'White gold', 'Gunmetal', 'Pewter'],
    avoid: ['Warm brown', 'Rust and terracotta', 'Mustard and olive', 'Camel and tan', 'Warm orange and golden yellow', 'Very light or soft muted pastels'],
    contrastStrategy: 'Keep the overall outfit deep and high-contrast. Lighter accents work best when grounded by a dark cool base.',
    howToWear: 'Use deep jewel colours, cool dark neutrals and rich saturated combinations. Avoid allowing pale colours to dominate the outfit.',
  },
  'bright-spring': {
    heroColours: ['Bright Coral', 'Poppy Red', 'Warm Fuchsia', 'Bright Blue', 'Bright Turquoise', 'Emerald Green', 'Sun Yellow', 'Chartreuse Green'],
    bestNeutrals: ['Bright Ivory', 'Peach Beige', 'Golden Camel', 'Cognac Brown'],
    metals: ['Yellow gold', 'Rose gold', 'Bright polished silver', 'Champagne gold'],
    avoid: ['Dusty muted tones', 'Soft greyed pastels', 'Icy cool blues', 'Earthy rust and olive', 'Deep chocolate brown', 'Smoky grey and muted mauve'],
    contrastStrategy: 'Use lively medium-to-high contrast with clear, polished colour combinations.',
    howToWear: 'Choose vivid warm colours with crisp definition. Bright warm colour plus a clean neutral works especially well; avoid muddy or antiqued effects.',
  },
  'true-spring': {
    heroColours: ['Poppy Red', 'Coral', 'Bright Orange', 'Sun Yellow', 'Bright Blue', 'Turquoise', 'Emerald Green', 'Apple Green'],
    bestNeutrals: ['Warm Ivory', 'Vanilla Cream', 'Peach Beige', 'Cognac'],
    metals: ['Bright yellow gold', 'Polished gold', 'Shiny rose gold'],
    avoid: ['Cool icy colours', 'Dusty muted tones', 'Heavy dark earth colours', 'Blue-based reds', 'Cool greys', 'Dull antique finishes'],
    contrastStrategy: 'Use fresh low-to-medium contrast with clear warm colours and enough definition to keep the outfit lively.',
    howToWear: 'Build around warm bright colour with a little more depth than Warm Spring. Keep combinations sunny, clean and energetic rather than soft or smoky.',
  },
  'warm-spring': {
    heroColours: ['Warm Coral', 'Tomato Red', 'Tangerine', 'Sunflower Yellow', 'Warm Turquoise', 'Jade Green', 'Apple Green', 'Warm Purple'],
    bestNeutrals: ['Vanilla Cream', 'Golden Beige', 'Warm Camel', 'Cognac'],
    metals: ['Yellow gold', 'Bronze', 'Warm rose gold'],
    avoid: ['Icy cool colours', 'Blue-based pinks and reds', 'Dusty muted shades', 'Very dark heavy colours', 'Cool silver-grey', 'Smoky tones'],
    contrastStrategy: 'Keep contrast low to medium and let warmth lead. Avoid very sharp light-dark separation.',
    howToWear: 'Use golden, fresh colours in harmonious combinations. Pair warm coral, turquoise or green with creamy and camel-based neutrals.',
  },
  'light-spring': {
    heroColours: ['Light Coral', 'Warm Pink', 'Apricot', 'Butter Yellow', 'Sky Blue', 'Aquamarine', 'Mint Green', 'Pistachio Green'],
    bestNeutrals: ['Bright Ivory', 'Champagne', 'Peach Beige', 'Light Camel', 'Honey Brown'],
    metals: ['Yellow gold', 'Rose gold', 'Champagne gold'],
    avoid: ['True black', 'Deep navy', 'Chocolate brown', 'Icy cool pastels', 'Dusty earthy tones', 'Burnt orange', 'Deep mustard', 'Electric brights'],
    contrastStrategy: 'Keep contrast gentle and light. Use close values rather than dramatic dark-light combinations.',
    howToWear: 'Choose airy warm colours and light neutrals. Soft peach, aqua, mint and warm blush work best when the whole outfit remains fresh and luminous.',
  },
  'light-summer': {
    heroColours: ['Ice Pink', 'Lavender', 'Cornflower Blue', 'Sky Blue', 'Icy Aqua', 'Soft Turquoise', 'Mint Green', 'Light Raspberry'],
    bestNeutrals: ['Soft White', 'Pearl Grey', 'Dove Grey', 'Cool Taupe'],
    metals: ['Silver', 'Platinum', 'Rose gold'],
    avoid: ['True black', 'Deep navy', 'Warm peach and coral', 'Golden yellow', 'Warm orange and rust', 'Electric brights', 'Stark icy pastels', 'Chocolate brown'],
    contrastStrategy: 'Use low contrast and light values throughout. Keep transitions soft and delicate.',
    howToWear: 'Combine powdery cool colours with pale greys, soft white and cool taupe. Avoid letting one dark or vivid piece dominate.',
  },
  'true-summer': {
    heroColours: ['Powder Pink', 'Antique Rose', 'Lavender', 'Wisteria', 'Powder Blue', 'Cornflower Blue', 'Muted Turquoise', 'Sage Green'],
    bestNeutrals: ['Soft White', 'Pearl Grey', 'Dove Grey', 'Cool Taupe', 'Soft Anthracite'],
    metals: ['Soft silver', 'Rose gold', 'White gold'],
    avoid: ['Stark black', 'Warm earthy tones', 'Bright yellow-based colours', 'Highly vivid jewel tones', 'Strong orange', 'Hard graphic contrast'],
    contrastStrategy: 'Use low-to-medium contrast with blended, watercolor-like transitions.',
    howToWear: 'Layer soft cool shades of similar intensity. Let colours flow into one another rather than creating hard visual breaks.',
  },
  'cool-summer': {
    heroColours: ['Cool Powder Pink', 'Muted Raspberry', 'Lavender', 'Periwinkle', 'Cool Medium Blue', 'Ice Blue', 'Soft Teal', 'Cool Sage Green'],
    bestNeutrals: ['Soft White', 'Pearl Grey', 'Cool Taupe Grey', 'Cool Taupe', 'Blue Anthracite'],
    metals: ['Silver', 'Platinum', 'Cool rose gold'],
    avoid: ['Warm Autumn earth tones', 'Golden yellow', 'Warm orange', 'Bright electric colours', 'Very dark Winter contrast', 'Yellow-based beige'],
    contrastStrategy: 'Use low-to-medium contrast with cleaner, cooler definition than True Summer, but never sharp Winter-level contrast.',
    howToWear: 'Choose refined blue-based colours and cool muted neutrals. Slightly icier accents work well when the overall look remains soft.',
  },
  'soft-summer': {
    heroColours: ['Dusty Rose', 'Antique Rose', 'Mauve', 'Dusty Periwinkle', 'Soft Denim Blue', 'Sage Green', 'Eucalyptus Green', 'Muted Raspberry'],
    bestNeutrals: ['Soft White', 'Stone Grey', 'Taupe', 'Mushroom Grey', 'Soft Anthracite'],
    metals: ['Matte silver', 'Brushed platinum', 'Soft rose gold', 'White gold'],
    avoid: ['True black', 'Stark white', 'Warm peach and coral', 'Warm olive, mustard and rust', 'Any bright clear colour', 'Electric blue', 'Vivid fuchsia', 'Golden yellow'],
    contrastStrategy: 'Keep contrast low and blended. Tonal combinations and neighbouring values are more harmonious than sharp separation.',
    howToWear: 'Build soft, smoky combinations with muted rose, mauve, sage and blue-grey. Matte and softly textured finishes support the palette well.',
  },
  'soft-autumn': {
    heroColours: ['Soft Terracotta', 'Dusty Salmon', 'Muted Coral', 'Warm Sage Green', 'Olive Green', 'Muted Avocado Green', 'Dusty Teal', 'Smoky Turquoise'],
    bestNeutrals: ['Warm Cream', 'Oatmeal', 'Warm Beige', 'Soft Camel', 'Warm Taupe', 'Warm Brown'],
    metals: ['Brushed gold', 'Antique gold', 'Matte rose gold', 'Bronze', 'Pewter'],
    avoid: ['True black', 'Bright white', 'Icy pastels', 'Cool grey and cool blue', 'Bright purple', 'Electric blue', 'Fuchsia', 'Bright coral and vivid teal'],
    contrastStrategy: 'Use low, blended contrast with warm muted colours of similar visual weight.',
    howToWear: 'Create tonal, earthy combinations using warm taupes, sage, terracotta and dusty teal. Prefer brushed, matte and softly textured finishes.',
  },
  'true-autumn': {
    heroColours: ['Terracotta', 'Rust', 'Paprika Red', 'Mustard Yellow', 'Olive Green', 'Moss Green', 'Petrol Green', 'Deep Teal'],
    bestNeutrals: ['Warm Cream', 'Caramel Beige', 'Camel', 'Cognac', 'Chocolate Brown'],
    metals: ['Brushed gold', 'Antique gold', 'Rose gold'],
    avoid: ['Cool grey-based colours', 'Icy pastels', 'Pure white', 'Cool blue', 'Electric brights', 'Sharp black-and-white contrast'],
    contrastStrategy: 'Use medium, grounded contrast with warm earthy colours and softened separation.',
    howToWear: 'Build around terracotta, mustard, olive, petrol and rich warm neutrals. Keep the result earthy, balanced and substantial without becoming overly dark.',
  },
  'warm-autumn': {
    heroColours: ['Pumpkin Orange', 'Burnt Orange', 'Terracotta', 'Warm Red', 'Warm Teal', 'Deep Turquoise', 'Olive Green', 'Amber'],
    bestNeutrals: ['Golden Ivory', 'Honey Beige', 'Warm Camel', 'Cognac', 'Chocolate Brown'],
    metals: ['Rich gold', 'Bronze', 'Copper'],
    avoid: ['Cool blues', 'Icy pastels', 'Cool greys', 'Pure white', 'Blue-based pinks', 'Sharp Winter contrast'],
    contrastStrategy: 'Use the strongest contrast in the Autumn family, but keep every colour warm and grounded.',
    howToWear: 'Combine rich warm colours with substantial neutrals. Copper, amber, deep teal and burnt orange can carry more visual weight than in True Autumn.',
  },
  'deep-autumn': {
    heroColours: ['Burnt Orange', 'Rust', 'Wine Red', 'Warm Burgundy', 'Olive Green', 'Forest Green', 'Deep Teal', 'Petrol Blue'],
    bestNeutrals: ['Warm Ivory', 'Camel', 'Cognac', 'Chestnut Brown', 'Chocolate Brown', 'Espresso Brown'],
    metals: ['Yellow gold', 'Bronze', 'Copper', 'Antique gold'],
    avoid: ['Cool black', 'Pure white', 'Icy pastels', 'Light baby blue', 'Soft pink', 'Cool lavender', 'Silver grey', 'Fuchsia and electric blue', 'Cool navy and cool burgundy'],
    contrastStrategy: 'Use deep, high-contrast combinations while keeping the temperature warm and earthy.',
    howToWear: 'Anchor outfits with espresso, chocolate or deep warm greens, then add rust, wine, petrol or teal. Avoid pale colours becoming the dominant value.',
  },
};
