import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export const sanitiseFilenamePart = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'client';
export const exportElementToPdf = async (element: HTMLElement, filename?: string) => {
  const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#fffaf2' });
  const pdf = new jsPDF('p', 'mm', 'a4'); const img = canvas.toDataURL('image/png'); const width = 210; const height = (canvas.height * width) / canvas.width;
  let y = 0; pdf.addImage(img, 'PNG', 0, y, width, height); let remaining = height - 297;
  while (remaining > 0) { y -= 297; pdf.addPage(); pdf.addImage(img, 'PNG', 0, y, width, height); remaining -= 297; }
  if (filename) pdf.save(filename); else window.open(pdf.output('bloburl'), '_blank');
};
