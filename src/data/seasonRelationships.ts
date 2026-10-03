export type SubseasonId =
  | 'bright-winter'
  | 'deep-winter'
  | 'cool-winter'
  | 'bright-spring'
  | 'light-spring'
  | 'warm-spring'
  | 'warm-autumn'
  | 'deep-autumn'
  | 'soft-autumn'
  | 'soft-summer'
  | 'light-summer'
  | 'cool-summer';

export type SeasonRelationship = {
  primary: SubseasonId;
  related: SubseasonId[];
  excluded: SubseasonId[];
};

export type SeasonVisualState = 'primary' | 'related' | 'non-related';

export const seasonRelationships: Record<SubseasonId, SeasonRelationship> = {
  'bright-winter': { primary: 'bright-winter', related: ['deep-winter', 'bright-spring'], excluded: ['cool-winter'] },
  'deep-winter': { primary: 'deep-winter', related: ['cool-winter', 'deep-autumn'], excluded: ['bright-winter'] },
  'cool-winter': { primary: 'cool-winter', related: ['deep-winter', 'cool-summer'], excluded: ['bright-winter'] },
  'bright-spring': { primary: 'bright-spring', related: ['light-spring', 'bright-winter'], excluded: ['warm-spring'] },
  'light-spring': { primary: 'light-spring', related: ['warm-spring', 'light-summer'], excluded: ['bright-spring'] },
  'warm-spring': { primary: 'warm-spring', related: ['light-spring', 'warm-autumn'], excluded: ['bright-spring'] },
  'warm-autumn': { primary: 'warm-autumn', related: ['deep-autumn', 'warm-spring'], excluded: ['soft-autumn'] },
  'deep-autumn': { primary: 'deep-autumn', related: ['warm-autumn', 'deep-winter'], excluded: ['soft-autumn'] },
  'soft-autumn': { primary: 'soft-autumn', related: ['deep-autumn', 'soft-summer'], excluded: ['warm-autumn'] },
  'soft-summer': { primary: 'soft-summer', related: ['light-summer', 'soft-autumn'], excluded: ['cool-summer'] },
  'light-summer': { primary: 'light-summer', related: ['cool-summer', 'light-spring'], excluded: ['soft-summer'] },
  'cool-summer': { primary: 'cool-summer', related: ['light-summer', 'cool-winter'], excluded: ['soft-summer'] },
};

const isSubseasonId = (id: string): id is SubseasonId => id in seasonRelationships;

export const getSeasonVisualState = (
  seasonId: string,
  selectedFinalSubseason: string | null,
): SeasonVisualState | null => {
  if (!isSubseasonId(seasonId) || !selectedFinalSubseason || !isSubseasonId(selectedFinalSubseason)) return null;

  const relationship = seasonRelationships[selectedFinalSubseason];
  if (seasonId === relationship.primary) return 'primary';
  if (relationship.related.includes(seasonId)) return 'related';
  return 'non-related';
};
