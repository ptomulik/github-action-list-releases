import { Entry as RestEntry } from "./rest";
import { ArrayMapper } from "./mapper";

export type Entry = Partial<RestEntry>;
export type Selectable = keyof Entry;
export type Selector = ArrayMapper<Entry>;

export function selector(keys?: Selectable[] | null): Selector {
  if (!(keys instanceof Array)) {
    return (entries: Entry[]): Entry[] => entries;
  } else {
    const mapper = callback(keys);
    return (entries: Entry[]): Entry[] => entries.map(mapper);
  }
}

interface Callback {
  (entry: Entry): Entry;
}

function callback(keys: Selectable[]): Callback {
  return (entry: Entry): Entry =>
    keys
      .filter((key) => key in entry)
      .reduce(
        (obj: Entry, key: Selectable): Entry => ({
          ...obj,
          [key]: entry[key],
        }),
        {} as Entry
      );
}

// vim: set ts=2 sw=2 sts=2:
