import { RefObject, useState } from 'react';
import { ClientDetails, SeasonData } from '../types/colourAnalysis';
import { emailElementAsPdf, exportElementToPdf, sanitiseFilenamePart } from '../utils/pdfHelpers';

type Props = {
  season: SeasonData | null;
  client: ClientDetails;
  pdfRef: RefObject<HTMLDivElement | null>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ActionButtons({ season, client, pdfRef }: Props) {
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [emailMessage, setEmailMessage] = useState('');
  const filename = season
    ? `colour-analysis-${sanitiseFilenamePart(client.clientName)}-${sanitiseFilenamePart(season.name)}.pdf`
    : '';
  const recipientEmail = client.clientEmail.trim();
  const hasEmail = recipientEmail.length > 0;
  const validEmail = emailPattern.test(recipientEmail);
  const canEmail = Boolean(season && validEmail);

  const run = (download: boolean) => {
    if (season && pdfRef.current) void exportElementToPdf(pdfRef.current, download ? filename : undefined);
  };

  const sendEmail = async () => {
    if (!season || !pdfRef.current || !validEmail) return;
    setEmailStatus('sending');
    setEmailMessage('Preparing and sending the report…');
    try {
      await emailElementAsPdf({
        element: pdfRef.current,
        filename,
        clientName: client.clientName,
        clientEmail: recipientEmail,
        consultantName: client.consultantName,
        seasonName: season.name,
      });
      setEmailStatus('sent');
      setEmailMessage(`Report sent to ${recipientEmail}.`);
    } catch (error) {
      setEmailStatus('error');
      setEmailMessage(error instanceof Error ? error.message : 'The report could not be sent.');
    }
  };

  return (
    <section className="card actions">
      <h2>PDF actions</h2>
      <div className="pdf-actions">
        <button type="button" disabled={!season} onClick={() => run(false)}>Preview PDF</button>
        <button type="button" disabled={!season} onClick={() => run(true)}>Download PDF</button>
      </div>
      <div className="email-pdf-action">
        <button type="button" disabled={!canEmail || emailStatus === 'sending'} onClick={sendEmail}>
          {emailStatus === 'sending' ? 'Sending PDF…' : 'Send PDF by email'}
        </button>
        {!hasEmail && season && <p>Enter the client email above to send the report.</p>}
        {hasEmail && !validEmail && season && <p className="email-status error">Enter a valid email address.</p>}
        {emailMessage && <p className={emailStatus === 'error' ? 'email-status error' : 'email-status'} aria-live="polite">{emailMessage}</p>}
      </div>
    </section>
  );
}
