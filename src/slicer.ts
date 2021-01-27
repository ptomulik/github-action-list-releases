import { ArrayMapper } from "./mapper";

export type Slicer = ArrayMapper<unknown>;

export type Parameters =
  | {
      type: "F" | "L";
      count?: number | null;
    }
  | {
      type: "R";
      from?: number | null;
      to?: number | null;
    };

export function slicer(parameters?: Parameters | null): Slicer {
  if (parameters == null) {
    return (entries: unknown[]): unknown[] => entries;
  }

  switch (parameters.type) {
    case "F":
      return first(parameters.count);
    case "L":
      return last(parameters.count);
    case "R":
      return range(parameters.from, parameters.to);
    default:
      return (entries: unknown[]): unknown[] => entries;
  }
}

function first(count?: number | null): Slicer {
  const args = [0, count == null ? 1 : count];
  return (entries: unknown[]): unknown[] => entries.slice(...args);
}

function last(count?: number | null): Slicer {
  const args = [count == null ? -1 : -count];
  return (entries: unknown[]): unknown[] => entries.slice(...args);
}

function range(from?: number | null, to?: number | null): Slicer {
  const start = from == null ? 0 : from;
  const args = to == null ? [start] : [start, 1 + to];
  return (entries: unknown[]): unknown[] => entries.slice(...args);
}

// vim: set ts=2 sw=2 sts=2:
