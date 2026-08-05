import { useRef, useState } from 'react';
import { ActionButtons } from './components/ActionButtons';
import { AnalysisControls } from './components/AnalysisControls';
import { ClientDetailsForm } from './components/ClientDetailsForm';
import { ColourPalette } from './components/ColourPalette';
import { Header } from './components/Header';
import { PdfPreview } from './components/PdfPreview';
import { ResultSummary } from './components/ResultSummary';
import { SeasonalDiagram } from './components/SeasonalDiagram';
import { getSeasonById } from './data/seasons';
import { AnalysisState, ClientDetails, MainSeason } from './types/colourAnalysis';
import { deriveFinalSeason, deriveMainSeason } from './utils/seasonFiltering';

const today = () => new Date().toISOString().slice(0, 10);

const initialClient = (): ClientDetails => ({
  clientName: '',
  consultationDate: today(),
  consultantName: '',
  notes: '',
});

const initialAnalysis = (): AnalysisState => ({
  selectedUndertone: 'not-sure',
  selectedIntensity: 'not-sure',
  selectedDominant: 'true',
  selectedMainSeason: 'not-sure',
  selectedFinalSubseason: null,
  showTechnicalDetails: false,
});

const summaryLabel = (value: string | null) => (value && value !== 'not-sure' ? value.replace('-', ' ') : 'Not sure');

export default function App() {
  const [client, setClient] = useState(initialClient);
  const [analysis, setAnalysis] = useState(initialAnalysis);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const detectedSeason = deriveMainSeason(analysis.selectedUndertone, analysis.selectedIntensity);
  const selected = getSeasonById(analysis.selectedFinalSubseason);

  const applyDerivedResult = (next: AnalysisState) => ({
    ...next,
    selectedMainSeason: deriveMainSeason(next.selectedUndertone, next.selectedIntensity) ?? 'not-sure',
    selectedFinalSubseason: deriveFinalSeason({
      undertone: next.selectedUndertone,
      intensity: next.selectedIntensity,
      dominantCharacteristic: next.selectedDominant,
    }),
  });

  const updateAnalysis = (next: AnalysisState) => setAnalysis(applyDerivedResult(next));
  const resetAnalysis = () => setAnalysis(initialAnalysis());
  const newConsultation = () => {
    setClient(initialClient());
    setAnalysis(initialAnalysis());
  };
  const selectFinalSubseason = (id: string) => {
    const season = getSeasonById(id);
    if (!season || season.dominantCharacteristic === 'True') return;
    const mainSeason = season.mainSeason as MainSeason;
    setAnalysis({
      ...analysis,
      selectedUndertone: season.undertone,
      selectedIntensity: ['winter', 'spring'].includes(mainSeason) ? 'high' : 'low',
      selectedDominant: season.dominantCharacteristic.toLowerCase() as AnalysisState['selectedDominant'],
      selectedMainSeason: mainSeason,
      selectedFinalSubseason: id,
    });
  };
  const toggleTechnicalDetails = () => setAnalysis({ ...analysis, showTechnicalDetails: !analysis.showTechnicalDetails });

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="analysis-layout" aria-label="Consultation analysis workspace">
          <div className="analysis-column">
            <ClientDetailsForm details={client} onChange={setClient} />
            <AnalysisControls state={analysis} onChange={updateAnalysis} onResetAnalysis={resetAnalysis} onNew={newConsultation} />
          </div>

          <aside className="diagram-panel" aria-label="Seasonal diagram and live selection summary">
            <section className="card diagram-card">
              <p className="eyebrow">Interactive chart</p>
              <h2>Seasonal diagram</h2>
              <SeasonalDiagram state={analysis} onSelect={selectFinalSubseason} />
              <div className="selection-summary" aria-live="polite">
                <h3>Live selection summary</h3>
                <p>Undertone: {summaryLabel(analysis.selectedUndertone)}</p>
                <p>Intensity: {summaryLabel(analysis.selectedIntensity)}</p>
                <p>Dominant characteristic: {summaryLabel(analysis.selectedDominant)}</p>
                <p>Detected season: {summaryLabel(detectedSeason)}</p>
                <p>Final result: {analysis.selectedDominant === 'true' && !detectedSeason ? 'Select undertone and intensity to determine the True season.' : selected?.name ?? 'Pending'}</p>
              </div>
            </section>
          </aside>
        </section>

        {selected && (
          <section className="full-width-result">
            <ResultSummary season={selected} />
          </section>
        )}

        {selected && (
          <section className="full-width-palette">
            <ColourPalette season={selected} showTechnical={analysis.showTechnicalDetails} onToggle={toggleTechnicalDetails} />
          </section>
        )}

        {selected && (
          <section className="full-width-pdf-actions">
            <ActionButtons season={selected} client={client} pdfRef={pdfRef} />
          </section>
        )}
      </main>
      <div className="pdf-hidden" aria-hidden="true">
        <div ref={pdfRef}>{selected && <PdfPreview client={client} season={selected} />}</div>
      </div>
    </>
  );
}
