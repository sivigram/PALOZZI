import type { KeyboardEvent } from 'react';
import { seasons } from '../data/seasons';
import { AnalysisState, MainSeason } from '../types/colourAnalysis';
import { compatibleMainSeasons, isSubseasonCompatible, seasonOrder } from '../utils/seasonFiltering';

type Props = { state: AnalysisState; onSelect: (id: string) => void; compact?: boolean };
type SegmentAngle = { id: string; start: number; end: number };

const centre = 200;
const colours: Record<MainSeason, string> = {
  winter: 'var(--winter)',
  spring: 'var(--spring)',
  summer: 'var(--summer)',
  autumn: 'var(--autumn)',
};

export const subseasonAngles: SegmentAngle[] = seasonOrder.map((id, index) => ({
  id,
  start: -90 + index * 30,
  end: -60 + index * 30,
}));

const quadrantAngles: Array<[MainSeason, number, number, string]> = [
  ['spring', -90, 0, 'Spring'],
  ['autumn', 0, 90, 'Autumn'],
  ['summer', 90, 180, 'Summer'],
  ['winter', 180, 270, 'Winter'],
];

const polar = (cx: number, cy: number, radius: number, angle: number) => {
  const radians = (angle * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
};

const arc = (innerRadius: number, outerRadius: number, start: number, end: number) => {
  const outerStart = polar(centre, centre, outerRadius, start);
  const outerEnd = polar(centre, centre, outerRadius, end);
  const innerEnd = polar(centre, centre, innerRadius, end);
  const innerStart = polar(centre, centre, innerRadius, start);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${outerStart.x} ${outerStart.y} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
};

const readableTextRotation = (midAngle: number) => {
  const tangent = midAngle + 90;
  return tangent > 90 && tangent < 270 ? tangent + 180 : tangent;
};

export function SeasonalDiagram({ state, onSelect, compact = false }: Props) {
  const active = compatibleMainSeasons(state);
  const ordered = subseasonAngles.map(({ id, start, end }) => ({ season: seasons.find((s) => s.id === id)!, start, end }));

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <figure className={compact ? 'diagram compact' : 'diagram'}>
      <svg viewBox="0 0 400 400" role="img" aria-label="Interactive circular seasonal colour analysis diagram">
        <text className="axis-label" x="200" y="24" textAnchor="middle">High intensity</text>
        <text className="axis-label" x="200" y="388" textAnchor="middle">Low intensity</text>
        <text className="axis-label" x="24" y="204" textAnchor="middle" transform="rotate(-90 24 204)">Cool undertone</text>
        <text className="axis-label" x="376" y="204" textAnchor="middle" transform="rotate(90 376 204)">Warm undertone</text>
        <line className="diagram-axis" x1="200" y1="34" x2="200" y2="366" />
        <line className="diagram-axis" x1="34" y1="200" x2="366" y2="200" />
        {quadrantAngles.map(([season, start, end, name]) => {
          const mid = (start + end) / 2;
          const point = polar(centre, centre, 78, mid);
          const stateClass = active.includes(season) ? 'compatible' : 'incompatible';
          return (
            <g key={season} className={`quadrant ${stateClass}`}>
              <path d={arc(48, 118, start, end)} fill={colours[season]} />
              <text className="season-label" x={point.x} y={point.y} textAnchor="middle">{name}</text>
            </g>
          );
        })}
        {ordered.map(({ season, start, end }) => {
          const mid = (start + end) / 2;
          const point = polar(centre, centre, 154, mid);
          const compatible = isSubseasonCompatible(season, state);
          const selected = state.selectedFinalSubseason === season.id;
          return (
            <g
              key={season.id}
              className={`segment ${selected ? 'selected' : compatible ? 'compatible' : 'incompatible'}`}
              onClick={() => onSelect(season.id)}
              onKeyDown={(event) => handleKeyDown(event, season.id)}
              tabIndex={0}
              role="button"
              aria-label={`Select ${season.name}`}
              aria-pressed={selected}
            >
              <path d={arc(122, 186, start, end)} fill={colours[season.mainSeason]} />
              <text
                className="subseason-label"
                x={point.x}
                y={point.y}
                textAnchor="middle"
                transform={`rotate(${readableTextRotation(mid)} ${point.x} ${point.y})`}
              >
                {season.name}
              </text>
            </g>
          );
        })}
        <circle cx="200" cy="200" r="44" fill="var(--paper)" />
        <text className="centre-label" x="200" y="196" textAnchor="middle">Seasonal</text>
        <text className="centre-label" x="200" y="214" textAnchor="middle">flow</text>
      </svg>
    </figure>
  );
}
