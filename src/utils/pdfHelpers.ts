import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export const sanitiseFilenamePart = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'client';
export const exportElementToPdf = async (element: HTMLElement, filename?: string) => {
  const pages = Array.from(element.querySelectorAll<HTMLElement>('.pdf-page'));
  if (pages.length !== 4) throw new Error(`Expected 4 PDF pages, found ${pages.length}.`);

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  for (const [index, page] of pages.entries()) {
    const canvas = await html2canvas(page, {
      scale: 2,
      backgroundColor: '#fcf9f4',
      logging: false,
      useCORS: true,
    });
    if (index > 0) pdf.addPage('a4', 'portrait');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
  }

  if (filename) pdf.save(filename); else window.open(pdf.output('bloburl'), '_blank');
};
