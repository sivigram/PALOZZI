import { PaletteColour } from '../types/colourAnalysis';
import { bestTextColour, formatHsl, formatRgb, pantoneLabel } from '../utils/colourConversions';

type Props = {
  colour: PaletteColour;
  showTechnical: boolean;
};

export function ColourCard({ colour, showTechnical }: Props) {
  return (
    <article className="colour-card">
      <div
        className="swatch"
        style={{ backgroundColor: colour.hex, color: bestTextColour(colour.hex) }}
      >
        <strong className="swatch-name">{colour.name}</strong>
      </div>
      <div className="colour-info">
        <span>{colour.hex}</span>
        {showTechnical && (
          <>
            <span>{pantoneLabel(colour.pantone, colour.pantoneStatus)}</span>
            <span>{formatRgb(colour.hex)}</span>
            <span>{formatHsl(colour.hex)}</span>
          </>
        )}
      </div>
    </article>
  );
}
