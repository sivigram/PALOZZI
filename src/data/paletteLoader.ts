import rawPalettes from './palettes.json';
import { PaletteCategory, PaletteColour } from '../types/colourAnalysis';

const validCategories: PaletteCategory[] = [
  'Neutrals',
  'Reds and pinks',
  'Blues',
  'Greens',
  'Yellows and oranges',
  'Purples',
  'Accent colours',
];
const validPantoneStatuses = ['verified', 'approximate', null] as const;
const hexPattern = /^#[0-9A-Fa-f]{6}$/;

type RawPaletteColour = Partial<Omit<PaletteColour, 'id'>>;
type RawPalettes = Record<string, RawPaletteColour[]>;

const warnInvalid = (seasonId: string, index: number, reason: string) => {
  console.warn(`Invalid palette colour skipped for ${seasonId} at index ${index}: ${reason}`);
};

const isValidCategory = (value: unknown): value is PaletteCategory =>
  typeof value === 'string' && validCategories.includes(value as PaletteCategory);

const normalisePantone = (value: unknown) => (typeof value === 'string' && value.trim() ? value : null);
const normalisePantoneStatus = (value: unknown) =>
  validPantoneStatuses.includes(value as (typeof validPantoneStatuses)[number]) ? value as PaletteColour['pantoneStatus'] : null;

export const paletteCategories = validCategories;
export const palettePantoneStatuses = validPantoneStatuses;

export const loadPalette = (seasonId: string): PaletteColour[] => {
  const palettes = rawPalettes as RawPalettes;
  const palette = palettes[seasonId];
  if (!Array.isArray(palette)) {
    warnInvalid(seasonId, -1, 'season key is missing or is not an array');
    return [];
  }

  return palette.flatMap((colour, index) => {
    if (!colour || typeof colour !== 'object') {
      warnInvalid(seasonId, index, 'record is not an object');
      return [];
    }
    if (typeof colour.name !== 'string' || !colour.name.trim()) {
      warnInvalid(seasonId, index, 'name must be a non-empty string');
      return [];
    }
    if (typeof colour.hex !== 'string' || !hexPattern.test(colour.hex)) {
      warnInvalid(seasonId, index, 'hex must use #RRGGBB format');
      return [];
    }
    if (!isValidCategory(colour.category)) {
      warnInvalid(seasonId, index, 'category is not supported');
      return [];
    }

    return [{
      id: `${seasonId}-${index + 1}`,
      name: colour.name.trim(),
      hex: colour.hex.toUpperCase(),
      pantone: normalisePantone(colour.pantone),
      pantoneStatus: normalisePantoneStatus(colour.pantoneStatus),
      category: colour.category,
    }];
  });
};
