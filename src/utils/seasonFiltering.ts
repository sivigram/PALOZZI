import { AnalysisState, DominantChoice, IntensityChoice, MainSeason, MainSeasonChoice, SeasonData, Undertone } from '../types/colourAnalysis';

export const seasonOrder: string[] = [
  'bright-spring',
  'light-spring',
  'warm-spring',
  'warm-autumn',
  'deep-autumn',
  'soft-autumn',
  'soft-summer',
  'light-summer',
  'cool-summer',
  'cool-winter',
  'deep-winter',
  'bright-winter',
];

export const seasonsByMain: Record<MainSeason, string[]> = {
  winter: ['cool-winter', 'deep-winter', 'bright-winter'],
  spring: ['bright-spring', 'light-spring', 'warm-spring'],
  autumn: ['warm-autumn', 'deep-autumn', 'soft-autumn'],
  summer: ['soft-summer', 'light-summer', 'cool-summer'],
};

export const dominantOptionsBySeason: Record<MainSeason, DominantChoice[]> = {
  winter: ['bright', 'deep', 'cool', 'true'],
  spring: ['bright', 'light', 'warm', 'true'],
  summer: ['soft', 'light', 'cool', 'true'],
  autumn: ['soft', 'deep', 'warm', 'true'],
};

const resultByMainAndDominant: Record<MainSeason, Partial<Record<DominantChoice, string>>> = {
  winter: { bright: 'bright-winter', deep: 'deep-winter', cool: 'cool-winter', true: 'true-winter' },
  spring: { bright: 'bright-spring', light: 'light-spring', warm: 'warm-spring', true: 'true-spring' },
  summer: { soft: 'soft-summer', light: 'light-summer', cool: 'cool-summer', true: 'true-summer' },
  autumn: { soft: 'soft-autumn', deep: 'deep-autumn', warm: 'warm-autumn', true: 'true-autumn' },
};

const coolMainSeasons: MainSeason[] = ['winter', 'summer'];
const warmMainSeasons: MainSeason[] = ['spring', 'autumn'];
const highIntensityMainSeasons: MainSeason[] = ['winter', 'spring'];
const lowIntensityMainSeasons: MainSeason[] = ['summer', 'autumn'];

type DeriveFinalSeasonInput = {
  undertone: Undertone;
  intensity: IntensityChoice;
  dominantCharacteristic: DominantChoice;
};

export const deriveMainSeason = (undertone: Undertone, intensity: IntensityChoice): MainSeasonChoice => {
  if (undertone === 'cool' && intensity === 'high') return 'winter';
  if (undertone === 'warm' && intensity === 'high') return 'spring';
  if (undertone === 'warm' && intensity === 'low') return 'autumn';
  if (undertone === 'cool' && intensity === 'low') return 'summer';
  return null;
};

export const deriveFinalSeason = ({ undertone, intensity, dominantCharacteristic }: DeriveFinalSeasonInput): string | null => {
  const mainSeason = deriveMainSeason(undertone, intensity);
  if (!mainSeason) return null;
  return resultByMainAndDominant[mainSeason][dominantCharacteristic] ?? null;
};

export const isDominantCharacteristicAllowed = (dominant: DominantChoice, mainSeason: MainSeason | null): boolean =>
  !mainSeason || dominantOptionsBySeason[mainSeason].includes(dominant);

export const compatibleMainSeasons = (state: AnalysisState): MainSeason[] => {
  const detected = deriveMainSeason(state.selectedUndertone, state.selectedIntensity);
  if (detected) return [detected];

  let active: MainSeason[] = ['winter', 'spring', 'summer', 'autumn'];
  if (state.selectedUndertone === 'cool') active = active.filter((season) => coolMainSeasons.includes(season));
  if (state.selectedUndertone === 'warm') active = active.filter((season) => warmMainSeasons.includes(season));
  if (state.selectedIntensity === 'high') active = active.filter((season) => highIntensityMainSeasons.includes(season));
  if (state.selectedIntensity === 'low') active = active.filter((season) => lowIntensityMainSeasons.includes(season));
  return active;
};

export const isSubseasonCompatible = (season: SeasonData, state: AnalysisState): boolean => {
  if (season.dominantCharacteristic === 'True') return false;
  const detected = deriveMainSeason(state.selectedUndertone, state.selectedIntensity);
  if (detected && season.mainSeason !== detected) return false;
  if (state.selectedDominant === 'true') return Boolean(detected && season.mainSeason === detected);
  if (state.selectedUndertone !== 'not-sure' && season.undertone !== state.selectedUndertone) return false;
  if (state.selectedIntensity === 'high' && !highIntensityMainSeasons.includes(season.mainSeason)) return false;
  if (state.selectedIntensity === 'low' && !lowIntensityMainSeasons.includes(season.mainSeason)) return false;
  if (season.dominantCharacteristic.toLowerCase() !== state.selectedDominant) return false;

  return true;
};
