import { SeasonData } from '../types/colourAnalysis';
import { ColourCard } from './ColourCard';

export function ColourPalette({ season, showTechnical, onToggle }: { season: SeasonData; showTechnical: boolean; onToggle: () => void }) {
  return (
    <section className="card">
      <div className="section-head">
        <h2>Colour palette</h2>
        <button type="button" onClick={onToggle}>{showTechnical ? 'Hide technical details' : 'Show technical details'}</button>
      </div>
      {season.palette.length > 0 ? (
        <div className="palette-grid">{season.palette.map((colour) => <ColourCard key={colour.id} colour={colour} showTechnical={showTechnical} />)}</div>
      ) : (
        <p className="muted">No palette colours have been configured for this season.</p>
      )}
      <p className="note">Pantone references marked as approximate are visual references only. Digital colour values and printed Pantone colours may vary depending on the display, material, lighting and printing process.</p>
    </section>
  );
}
