export interface Slicer {
  from: (entries: unknown[]) => unknown[];
}

export type Parameters = MarginParameters | RangeParameters;

interface MarginParameters {
  type: 'F' | 'L';
  count?: number | null;
}

interface RangeParameters {
  type: 'R';
  from?: number | null;
  to?: number | null;
}

export function first(count?: number | null): Slicer {
  const args = [0, count == null ? 1 : count];
  return { from: (entries: unknown[]): unknown[] => entries.slice(...args) };
}

export function last(count?: number | null): Slicer {
  const args = [count == null ? -1 : -count];
  return { from: (entries: unknown[]): unknown[] => entries.slice(...args) };
}

export function range(from?: number | null, to?: number | null): Slicer {
  const start = from == null ? 0 : from;
  const args = to == null ? [start] : [start, 1 + to];
  return { from: (entries: unknown[]): unknown[] => entries.slice(...args) };
}

export function slicer(parameters?: Parameters|null): Slicer {
  if (parameters == null) {
    return { from: (entries: unknown[]): unknown[] => entries };
  }

  switch(parameters.type) {
    case 'F':
      return first(parameters.count);
    case 'L':
      return last(parameters.count);
    case 'R':
      return range(parameters.from, parameters.to);
    default:
      return { from: (entries: unknown[]): unknown[] => entries };
  }
}

// vim: set ts=2 sw=2 sts=2:
