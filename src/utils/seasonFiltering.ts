import { AnalysisState, MainSeason, SeasonData } from '../types/colourAnalysis';

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

const coolMainSeasons: MainSeason[] = ['winter', 'summer'];
const warmMainSeasons: MainSeason[] = ['spring', 'autumn'];
const highIntensityMainSeasons: MainSeason[] = ['winter', 'spring'];
const lowIntensityMainSeasons: MainSeason[] = ['summer', 'autumn'];

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
  if (state.selectedMainSeason !== 'not-sure' && season.mainSeason !== state.selectedMainSeason) return false;
  if (state.selectedUndertone !== 'not-sure' && season.undertone !== state.selectedUndertone) return false;
  if (state.selectedIntensity === 'high' && !highIntensityMainSeasons.includes(season.mainSeason)) return false;
  if (state.selectedIntensity === 'low' && !lowIntensityMainSeasons.includes(season.mainSeason)) return false;
  if (state.selectedDominant !== 'not-sure' && season.dominantCharacteristic.toLowerCase() !== state.selectedDominant) return false;

  return true;
};

export const visibleFinalOptions = (seasons: SeasonData[], state: AnalysisState, showAll: boolean): SeasonData[] =>
  state.selectedMainSeason === 'not-sure' || showAll ? seasons : seasons.filter((season) => season.mainSeason === state.selectedMainSeason);
