import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDF_RENDER_SCALE = 1.5;
const PDF_JPEG_QUALITY = 0.8;

export const sanitiseFilenamePart = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'client';
export const createPdf = async (element: HTMLElement) => {
  const pages = Array.from(element.querySelectorAll<HTMLElement>('.pdf-page'));
  if (pages.length !== 4) throw new Error(`Expected 4 PDF pages, found ${pages.length}.`);

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  for (const [index, page] of pages.entries()) {
    const canvas = await html2canvas(page, {
      scale: PDF_RENDER_SCALE,
      backgroundColor: '#fcf9f4',
      logging: false,
      useCORS: true,
    });
    if (index > 0) pdf.addPage('a4', 'portrait');
    // Each fixed A4 page is opaque, so JPEG avoids embedding a multi-megabyte lossless PNG.
    const pageImage = canvas.toDataURL('image/jpeg', PDF_JPEG_QUALITY);
    pdf.addImage(pageImage, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  return pdf;
};

export const exportElementToPdf = async (element: HTMLElement, filename?: string) => {
  const pdf = await createPdf(element);
  if (filename) pdf.save(filename); else window.open(pdf.output('bloburl'), '_blank');
};

const blobToBase64 = (blob: Blob) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
  reader.onerror = () => reject(reader.error ?? new Error('Unable to encode the PDF.'));
  reader.readAsDataURL(blob);
});

type EmailPdfInput = {
  element: HTMLElement;
  filename: string;
  clientName: string;
  clientEmail: string;
  consultantName: string;
  seasonName: string;
};

export const emailElementAsPdf = async ({ element, filename, clientEmail, ...details }: EmailPdfInput) => {
  const pdf = await createPdf(element);
  const pdfBase64 = await blobToBase64(pdf.output('blob'));
  if (!pdfBase64) throw new Error('The PDF could not be prepared for email.');
  const response = await fetch('/.netlify/functions/send-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...details,
      recipientEmail: clientEmail.trim(),
      filename,
      pdfBase64,
    }),
  });
  const result = await response.json().catch(() => ({})) as { error?: string };
  if (!response.ok) throw new Error(result.error || 'The report could not be sent.');
};
