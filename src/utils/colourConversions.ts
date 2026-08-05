export const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '');
  const value = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
};
export const formatRgb = (hex: string) => { const { r, g, b } = hexToRgb(hex); return `rgb(${r}, ${g}, ${b})`; };
export const hexToHsl = (hex: string) => {
  const { r, g, b } = hexToRgb(hex); const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn); let h = 0; const l = (max + min) / 2; const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) { if (max === rn) h = ((gn - bn) / d) % 6; else if (max === gn) h = (bn - rn) / d + 2; else h = (rn - gn) / d + 4; h = Math.round(h * 60); if (h < 0) h += 360; }
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
};
export const formatHsl = (hex: string) => { const { h, s, l } = hexToHsl(hex); return `hsl(${h}, ${s}%, ${l}%)`; };
export const bestTextColour = (hex: string) => { const { r, g, b } = hexToRgb(hex); const yiq = (r * 299 + g * 587 + b * 114) / 1000; return yiq >= 145 ? '#1f1d1b' : '#fffaf2'; };
export const pantoneLabel = (pantone?: string | null, status?: string | null) => !pantone ? 'Not specified' : status === 'approximate' ? `Closest Pantone reference: ${pantone}` : pantone;
