import { ClientDetails } from '../types/colourAnalysis';

type Props = {
  details: ClientDetails;
  onChange: (details: ClientDetails) => void;
};

export function ClientDetailsForm({ details, onChange }: Props) {
  const update = (key: keyof ClientDetails, value: string) => onChange({ ...details, [key]: value });

  return (
    <section className="card">
      <h2>Client details</h2>
      <div className="form-grid">
        <label>
          Client name
          <input value={details.clientName} onChange={(event) => update('clientName', event.target.value)} />
        </label>
        <label>
          Client email
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            value={details.clientEmail}
            onChange={(event) => update('clientEmail', event.target.value)}
          />
        </label>
        <label>
          Consultation date
          <input type="date" value={details.consultationDate} onChange={(event) => update('consultationDate', event.target.value)} />
        </label>
        <label>
          Consultant name
          <input value={details.consultantName} onChange={(event) => update('consultantName', event.target.value)} />
        </label>
        <label className="wide">
          Consultation notes
          <textarea value={details.notes} onChange={(event) => update('notes', event.target.value)} rows={4} />
        </label>
      </div>
    </section>
  );
}
