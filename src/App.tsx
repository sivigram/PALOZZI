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
  selectedMainSeason: null,
  selectedFinalSubseason: null,
  showTechnicalDetails: false,
});

export default function App() {
  const [client, setClient] = useState(initialClient);
  const [analysis, setAnalysis] = useState(initialAnalysis);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const selected = getSeasonById(analysis.selectedFinalSubseason);

  const applyDerivedResult = (next: AnalysisState): AnalysisState => ({
    ...next,
    selectedMainSeason: deriveMainSeason(next.selectedUndertone, next.selectedIntensity),
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

          <aside className="diagram-panel" aria-label="Seasonal diagram">
            <section className="card diagram-card">
              <p className="eyebrow">Interactive chart</p>
              <h2>Seasonal diagram</h2>
              <SeasonalDiagram state={analysis} onSelect={selectFinalSubseason} />
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
