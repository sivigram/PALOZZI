import { RefObject } from 'react';
import { ClientDetails, SeasonData } from '../types/colourAnalysis';
import { exportElementToPdf, sanitiseFilenamePart } from '../utils/pdfHelpers';

type Props = {
  season: SeasonData | null;
  client: ClientDetails;
  pdfRef: RefObject<HTMLDivElement | null>;
};

export function ActionButtons({ season, client, pdfRef }: Props) {
const formatPdfDate = (date: string) => date.replace(/-/g, '');

const formatClientName = (name: string) =>
  name
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '');

const filename = season
  ? `CR_${formatPdfDate(client.consultationDate)}_${formatClientName(client.clientName)}.pdf`
  : '';
  const run = (download: boolean) => {
    if (season && pdfRef.current) void exportElementToPdf(pdfRef.current, download ? filename : undefined);
  };

  return (
    <section className="card actions">
      <h2>PDF actions</h2>
      <div className="pdf-actions">
        <button type="button" disabled={!season} onClick={() => run(false)}>Preview PDF</button>
        <button type="button" disabled={!season} onClick={() => run(true)}>Download PDF</button>
      </div>
    </section>
  );
}
