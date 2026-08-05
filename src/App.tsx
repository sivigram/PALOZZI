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
import { AnalysisState, ClientDetails } from './types/colourAnalysis';

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
  selectedDominant: 'not-sure',
  selectedMainSeason: 'not-sure',
  selectedFinalSubseason: null,
  showTechnicalDetails: false,
});

const summaryLabel = (value: string | null) => (value && value !== 'not-sure' ? value.replace('-', ' ') : 'Not sure');

export default function App() {
  const [client, setClient] = useState(initialClient);
  const [analysis, setAnalysis] = useState(initialAnalysis);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const selected = getSeasonById(analysis.selectedFinalSubseason);

  const resetAnalysis = () => setAnalysis(initialAnalysis());
  const newConsultation = () => {
    setClient(initialClient());
    setAnalysis(initialAnalysis());
  };
  const selectFinalSubseason = (id: string) => setAnalysis({ ...analysis, selectedFinalSubseason: id });
  const toggleTechnicalDetails = () => setAnalysis({ ...analysis, showTechnicalDetails: !analysis.showTechnicalDetails });

  return (
    <>
      <Header />
      <main className="page-shell">
        <div className="analysis-layout">
          <div className="layout-client">
            <ClientDetailsForm details={client} onChange={setClient} />
          </div>
          <div className="layout-controls">
            <AnalysisControls state={analysis} onChange={setAnalysis} onResetAnalysis={resetAnalysis} onNew={newConsultation} />
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
                <p>Main season: {summaryLabel(analysis.selectedMainSeason)}</p>
                <p>Final subseason: {selected?.name ?? 'Not selected'}</p>
              </div>
            </section>
          </aside>
          <div className="layout-result">
            <ResultSummary season={selected} />
          </div>
          {selected && (
            <div className="layout-palette">
              <ColourPalette season={selected} showTechnical={analysis.showTechnicalDetails} onToggle={toggleTechnicalDetails} />
            </div>
          )}
          <div className="layout-actions">
            <ActionButtons season={selected} client={client} pdfRef={pdfRef} />
          </div>
        </div>
      </main>
      <div className="pdf-hidden" aria-hidden="true">
        <div ref={pdfRef}>{selected && <PdfPreview client={client} season={selected} />}</div>
      </div>
    </>
  );
}
