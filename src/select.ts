import { Entry as RestEntry } from "./rest";

export type Entry = Partial<RestEntry>;
export type Selectable = keyof Entry;
export type Parameter = Selectable[] | null | undefined;

export interface Selector {
  from: (entries: Entry[]) => Entry[];
}

export function select(keys: Parameter): Selector {
  const mapper = callback(keys);
  return { from: (entries: Entry[]): Entry[] => entries.map(mapper) };
}

interface Callback {
  (entry: Entry): Entry;
}

function callback(keys: Parameter): Callback {
  if (keys == null) {
    return (entry: Entry): Entry => entry;
  } else {
    return (entry: Entry): Entry =>
      keys
        .filter((key: Selectable) => key in entry)
        .reduce(
          (obj: Entry, key: Selectable): Entry => ({
            ...obj,
            [key]: entry[key],
          }),
          {} as Entry
        );
  }
}

// vim: set ts=2 sw=2 sts=2:
