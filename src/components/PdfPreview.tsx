import type { CSSProperties, ReactNode } from 'react';
import type { AnalysisState, ClientDetails, DominantChoice, MainSeason, PaletteColour, SeasonData } from '../types/colourAnalysis';
import { formatHsl, formatRgb, pantoneLabel } from '../utils/colourConversions';
import { SeasonalDiagram } from './SeasonalDiagram';

type Props = {
  client: ClientDetails;
  season: SeasonData;
};

type ScaleProps = {
  heading: string;
  labels: string[];
  position: number;
};

const scalePosition = {
  undertone: { warm: 20, cool: 80 },
  intensity: { soft: 20, medium: 50, bright: 80 },
  value: { light: 20, medium: 50, deep: 80 },
  contrast: { low: 20, medium: 50, high: 80 },
} as const;

const analysisCoordinates: Record<MainSeason, Pick<AnalysisState, 'selectedUndertone' | 'selectedIntensity'>> = {
  winter: { selectedUndertone: 'cool', selectedIntensity: 'high' },
  spring: { selectedUndertone: 'warm', selectedIntensity: 'high' },
  summer: { selectedUndertone: 'cool', selectedIntensity: 'low' },
  autumn: { selectedUndertone: 'warm', selectedIntensity: 'low' },
};

const dominantChoices: DominantChoice[] = ['bright', 'soft', 'light', 'deep', 'cool', 'warm', 'true'];

const getDominantChoice = (season: SeasonData): DominantChoice => {
  const normalised = season.dominantCharacteristic.trim().toLowerCase();
  const dominant = dominantChoices.find((choice) => choice === normalised);
  if (!dominant) throw new Error(`Unsupported dominant characteristic: ${season.dominantCharacteristic}`);
  return dominant;
};

function PdfBrand() {
  return (
    <header className="pdf-brand">
      <p className="pdf-brand-eyebrow">Colour Analysis Experience</p>
      <p className="pdf-brand-title">THE COLOR RITUAL</p>
    </header>
  );
}

function PdfFooter({ page }: { page: number }) {
  return (
    <footer className="pdf-footer">
      <span>THE COLOR RITUAL</span>
      <span>{String(page).padStart(2, '0')}</span>
    </footer>
  );
}

function PdfPage({ page, children }: { page: number; children: ReactNode }) {
  return (
    <section className="pdf-page">
      <div className="pdf-page-content">{children}</div>
      <PdfFooter page={page} />
    </section>
  );
}

function CharacteristicScale({ heading, labels, position }: ScaleProps) {
  return (
    <div className="pdf-scale">
      <p className="pdf-scale-heading">{heading}</p>
      <div className="pdf-scale-track">
        <span className="pdf-scale-marker" style={{ left: `${position}%` }} />
      </div>
      <div className="pdf-scale-labels">
        {labels.map((label) => <span key={label}>{label}</span>)}
      </div>
    </div>
  );
}

function PaletteSelection({ title, colours }: { title: string; colours: PaletteColour[] }) {
  return (
    <section className="pdf-palette-section">
      <h3>{title}</h3>
      {colours.length > 0 && (
        <div className="pdf-palette-grid">
          {colours.map((colour) => (
            <div className="pdf-palette-item" key={colour.id}>
              <span className="pdf-palette-swatch" style={{ backgroundColor: colour.hex }} />
              <span className="pdf-palette-name">{colour.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function GuideSection({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="pdf-guide-section">
      <h3>{title}</h3>
      <p>{values.join(' · ')}</p>
    </section>
  );
}

export function PdfPreview({ client, season }: Props) {
  const state: AnalysisState = {
    ...analysisCoordinates[season.mainSeason],
    selectedDominant: getDominantChoice(season),
    selectedMainSeason: season.mainSeason,
    selectedFinalSubseason: season.id,
    showTechnicalDetails: true,
  };
  const characteristicSummary = [
    season.undertone,
    season.intensity,
    `${season.value} value`,
    `${season.contrast} contrast`,
  ].map((value) => value.toUpperCase()).join(' · ');
  const emptyNotes = client.notes.trim().length === 0;
  const neutralColours = season.palette.filter((colour) => colour.category === 'Neutrals');
  const bestColours = season.palette.filter((colour) => colour.category !== 'Neutrals');

  return (
    <div className="pdf-document">
      <PdfPage page={1}>
        <PdfBrand />
        <div className="pdf-meta">
          <span className="pdf-meta-item"><span className="pdf-meta-label">Client</span>{client.clientName || 'Not specified'}</span>
          <span className="pdf-meta-item"><span className="pdf-meta-label">Date</span>{client.consultationDate}</span>
          <span className="pdf-meta-item"><span className="pdf-meta-label">Consultant</span>{client.consultantName || 'Not specified'}</span>
        </div>

        <p className="pdf-kicker pdf-serif-label">Your Colour Season</p>
        <h1 className="pdf-season-title">{season.name}</h1>

        <div className="pdf-result-layout">
          <div className="pdf-scales">
            <CharacteristicScale heading="Undertone" labels={['Warm', 'Cool']} position={scalePosition.undertone[season.undertone]} />
            <CharacteristicScale heading="Intensity" labels={['Soft', 'Medium', 'Bright']} position={scalePosition.intensity[season.intensity]} />
            <CharacteristicScale heading="Value" labels={['Light', 'Medium', 'Deep']} position={scalePosition.value[season.value]} />
            <CharacteristicScale heading="Contrast" labels={['Low', 'Medium', 'High']} position={scalePosition.contrast[season.contrast]} />
          </div>
          <div className="pdf-diagram">
            <SeasonalDiagram state={state} onSelect={() => undefined} compact />
          </div>
        </div>

        <section className="pdf-description">
          <h2>About Your Season</h2>
          <p>{season.description}</p>
          <p className="pdf-characteristics">{characteristicSummary}</p>
        </section>
      </PdfPage>

      <PdfPage page={2}>
        <PdfBrand />
        <p className="pdf-kicker pdf-serif-label">Your Colour Palette</p>
        <h1 className="pdf-page-title">{season.name}</h1>
        <PaletteSelection title="Best Colours" colours={bestColours} />
        <PaletteSelection title="Best Neutrals" colours={neutralColours} />
        <p className="pdf-palette-note">
          Your palette is designed as a visual wardrobe reference. Colours may appear differently depending on screen,
          material, lighting and print conditions.
        </p>
      </PdfPage>

      <PdfPage page={3}>
        <PdfBrand />
        <h1 className="pdf-page-title">How to Wear Your Palette</h1>
        <div className="pdf-guide">
          <GuideSection title="Best Colours" values={season.bestColours} />
          <GuideSection title="Best Neutrals" values={season.bestNeutrals} />
          <GuideSection title="Metals" values={season.metals} />
          <GuideSection title="Colours to Avoid" values={season.avoid} />
          {!emptyNotes && (
            <section className="pdf-guide-section pdf-notes">
              <h3>Consultation Notes</h3>
              <p>{client.notes}</p>
            </section>
          )}
        </div>
      </PdfPage>

      <PdfPage page={4}>
        <PdfBrand />
        <h1 className="pdf-page-title pdf-technical-title">Technical Colour Reference</h1>
        <p className="pdf-page-subtitle">A digital reference for your complete palette</p>
        <table className="pdf-technical-table">
          <thead>
            <tr><th>Colour</th><th>Name</th><th>HEX</th><th>RGB</th><th>HSL</th><th>Pantone</th></tr>
          </thead>
          <tbody>
            {season.palette.map((colour) => (
              <tr key={colour.id}>
                <td><span className="pdf-technical-swatch" style={{ backgroundColor: colour.hex } as CSSProperties} /></td>
                <td>{colour.name}</td>
                <td>{colour.hex}</td>
                <td>{formatRgb(colour.hex)}</td>
                <td>{formatHsl(colour.hex)}</td>
                <td>{pantoneLabel(colour.pantone, colour.pantoneStatus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="pdf-disclaimer">
          Digital colour values are provided as a practical reference. Colour appearance may vary between screens,
          materials, lighting conditions and printing methods. Pantone references marked as approximate are not
          certified colour matches.
        </p>
      </PdfPage>
    </div>
  );
}
