import { AnalysisState, DominantChoice, IntensityChoice, Undertone } from '../types/colourAnalysis';
import { deriveMainSeason, isDominantCharacteristicAllowed } from '../utils/seasonFiltering';

type Props = { state: AnalysisState; onChange: (state: AnalysisState) => void; onResetAnalysis: () => void; onNew: () => void };

const label = (value: string) => {
  if (value === 'not-sure') return 'Not sure';
  if (value === 'true') return 'True';
  return value[0].toUpperCase() + value.slice(1);
};

export function AnalysisControls({ state, onChange, onResetAnalysis, onNew }: Props) {
  const detectedSeason = deriveMainSeason(state.selectedUndertone, state.selectedIntensity);
  const set = (patch: Partial<AnalysisState>) => onChange({ ...state, ...patch });
  const group = <T extends string>(title: string, key: keyof AnalysisState, options: T[], disabledOptions: string[] = []) => (
    <fieldset className="control-group">
      <legend>{title}</legend>
      <div className="button-row">
        {options.map((option) => {
          const disabled = disabledOptions.includes(option);
          const optionLabel = label(option);
          return (
            <button
              key={option}
              type="button"
              className={state[key] === option ? 'selected' : ''}
              aria-label={optionLabel}
              aria-pressed={state[key] === option}
              disabled={disabled}
              onClick={() => set({ [key]: option } as Partial<AnalysisState>)}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </fieldset>
  );

  const dominantOptions: DominantChoice[] = ['bright', 'soft', 'light', 'deep', 'cool', 'warm', 'true'];
  const disabledDominants = dominantOptions.filter((option) => !isDominantCharacteristicAllowed(option, detectedSeason));

  return (
    <section className="card controls">
      <h2>Analysis controls</h2>
      {group<Undertone>('Undertone', 'selectedUndertone', ['cool', 'warm', 'not-sure'])}
      {group<IntensityChoice>('Intensity', 'selectedIntensity', ['high', 'low', 'not-sure'])}
      {group<DominantChoice>('Dominant characteristic', 'selectedDominant', dominantOptions, disabledDominants)}
      <div className="button-row">
        <button type="button" onClick={onResetAnalysis}>Reset analysis</button>
        <button type="button" onClick={onNew}>Start new consultation</button>
      </div>
    </section>
  );
}
