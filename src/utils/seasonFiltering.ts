import { AnalysisState, DominantChoice, MainSeason, MainSeasonChoice, SeasonData, Undertone, IntensityChoice } from '../types/colourAnalysis';

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

const trueSeasonByMain: Record<MainSeason, string> = {
  winter: 'true-winter',
  spring: 'true-spring',
  autumn: 'true-autumn',
  summer: 'true-summer',
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
  mainSeason: MainSeasonChoice;
};

export const deriveFinalSeason = ({ undertone, intensity, dominantCharacteristic, mainSeason }: DeriveFinalSeasonInput): string | null => {
  if (mainSeason === 'not-sure') return null;
  if (undertone === 'cool' && !coolMainSeasons.includes(mainSeason)) return null;
  if (undertone === 'warm' && !warmMainSeasons.includes(mainSeason)) return null;
  if (intensity === 'high' && !highIntensityMainSeasons.includes(mainSeason)) return null;
  if (intensity === 'low' && !lowIntensityMainSeasons.includes(mainSeason)) return null;
  return resultByMainAndDominant[mainSeason][dominantCharacteristic] ?? null;
};

export const getTrueSeasonId = (mainSeason: MainSeason): string => trueSeasonByMain[mainSeason];

export const compatibleMainSeasons = (state: AnalysisState): MainSeason[] => {
  let active: MainSeason[] = ['winter', 'spring', 'summer', 'autumn'];

  if (state.selectedUndertone === 'cool') active = active.filter((season) => coolMainSeasons.includes(season));
  if (state.selectedUndertone === 'warm') active = active.filter((season) => warmMainSeasons.includes(season));
  if (state.selectedIntensity === 'high') active = active.filter((season) => highIntensityMainSeasons.includes(season));
  if (state.selectedIntensity === 'low') active = active.filter((season) => lowIntensityMainSeasons.includes(season));
  if (state.selectedMainSeason !== 'not-sure') active = [state.selectedMainSeason];

  return active;
};

export const isSubseasonCompatible = (season: SeasonData, state: AnalysisState): boolean => {
  if (season.dominantCharacteristic === 'True') return false;
  if (state.selectedMainSeason !== 'not-sure' && season.mainSeason !== state.selectedMainSeason) return false;
  if (state.selectedDominant === 'true') return state.selectedMainSeason !== 'not-sure' && season.mainSeason === state.selectedMainSeason;
  if (state.selectedUndertone !== 'not-sure' && season.undertone !== state.selectedUndertone) return false;
  if (state.selectedIntensity === 'high' && !highIntensityMainSeasons.includes(season.mainSeason)) return false;
  if (state.selectedIntensity === 'low' && !lowIntensityMainSeasons.includes(season.mainSeason)) return false;
  if (season.dominantCharacteristic.toLowerCase() !== state.selectedDominant) return false;

  return true;
};
