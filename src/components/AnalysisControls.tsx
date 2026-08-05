import { AnalysisState, DominantChoice, IntensityChoice, MainSeasonChoice, Undertone } from '../types/colourAnalysis';

type Props = { state: AnalysisState; onChange: (state: AnalysisState) => void; onResetAnalysis: () => void; onNew: () => void };

const label = (value: string) => {
  if (value === 'not-sure') return 'Not sure';
  if (value === 'true') return 'True';
  return value[0].toUpperCase() + value.slice(1);
};

export function AnalysisControls({ state, onChange, onResetAnalysis, onNew }: Props) {
  const set = (patch: Partial<AnalysisState>) => onChange({ ...state, ...patch });
  const group = <T extends string>(title: string, key: keyof AnalysisState, options: T[]) => (
    <fieldset className="control-group">
      <legend>{title}</legend>
      <div className="button-row">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={state[key] === option ? 'selected' : ''}
            aria-pressed={state[key] === option}
            onClick={() => set({ [key]: option } as Partial<AnalysisState>)}
          >
            {label(option)}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <section className="card controls">
      <h2>Analysis controls</h2>
      {group<Undertone>('Undertone', 'selectedUndertone', ['cool', 'warm', 'not-sure'])}
      {group<IntensityChoice>('Intensity', 'selectedIntensity', ['high', 'low', 'not-sure'])}
      {group<DominantChoice>('Dominant characteristic', 'selectedDominant', ['bright', 'soft', 'light', 'deep', 'cool', 'warm', 'true'])}
      {group<MainSeasonChoice>('Main season', 'selectedMainSeason', ['winter', 'spring', 'summer', 'autumn', 'not-sure'])}
      <div className="button-row">
        <button type="button" onClick={onResetAnalysis}>Reset analysis</button>
        <button type="button" onClick={onNew}>Start new consultation</button>
      </div>
    </section>
  );
}
