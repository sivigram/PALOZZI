import { AnalysisState, MainSeason, SeasonData } from '../types/colourAnalysis';
export const seasonOrder = ['cool-winter','deep-winter','bright-winter','bright-spring','light-spring','warm-spring','warm-autumn','deep-autumn','soft-autumn','soft-summer','light-summer','cool-summer'];
export const seasonsByMain: Record<MainSeason, string[]> = { winter: ['cool-winter','deep-winter','bright-winter'], spring: ['bright-spring','light-spring','warm-spring'], autumn: ['warm-autumn','deep-autumn','soft-autumn'], summer: ['soft-summer','light-summer','cool-summer'] };
export const compatibleMainSeasons = (state: AnalysisState): MainSeason[] => {
  let active: MainSeason[] = ['winter','spring','summer','autumn'];
  if (state.selectedUndertone === 'cool') active = active.filter((s) => ['winter','summer'].includes(s));
  if (state.selectedUndertone === 'warm') active = active.filter((s) => ['spring','autumn'].includes(s));
  if (state.selectedIntensity === 'high') active = active.filter((s) => ['winter','spring'].includes(s));
  if (state.selectedIntensity === 'low') active = active.filter((s) => ['summer','autumn'].includes(s));
  if (state.selectedMainSeason !== 'not-sure') active = active.includes(state.selectedMainSeason) ? [state.selectedMainSeason] : [state.selectedMainSeason];
  return active;
};
export const isSubseasonCompatible = (season: SeasonData, state: AnalysisState) => {
  if (state.selectedMainSeason !== 'not-sure' && season.mainSeason !== state.selectedMainSeason) return false;
  if (state.selectedUndertone !== 'not-sure' && season.undertone !== state.selectedUndertone) return false;
  if (state.selectedIntensity === 'high' && !['winter','spring'].includes(season.mainSeason)) return false;
  if (state.selectedIntensity === 'low' && !['summer','autumn'].includes(season.mainSeason)) return false;
  if (state.selectedDominant !== 'not-sure' && season.dominantCharacteristic.toLowerCase() !== state.selectedDominant) return false;
  return true;
};
export const visibleFinalOptions = (seasons: SeasonData[], state: AnalysisState, showAll: boolean) => state.selectedMainSeason === 'not-sure' || showAll ? seasons : seasons.filter((s) => s.mainSeason === state.selectedMainSeason);
