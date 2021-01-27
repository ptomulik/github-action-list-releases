import { Entry as RestEntry } from "./rest";
import { ArrayMapper } from "./mapper";

export type Entry = Partial<RestEntry>;

export interface Options {
  draft?: boolean | null;
  name?: string | RegExp | null;
  prerelease?: boolean | null;
  tag_name?: string | RegExp | null;
}

export type Filter = ArrayMapper<Entry>;

export function filter(options?: Options | null): Filter {
  if (options == null) {
    return (entries: Entry[]): Entry[] => entries;
  }
  const predicate = callback(options);
  return (entries: Entry[]): Entry[] => entries.filter(predicate);
}

interface Predicate {
  (entry: Entry): boolean;
}

interface Constraint {
  (actual: unknown): boolean;
}

function callback(options: Options): Predicate {
  return compose(predicates(options));
}

function match(expected: RegExp): Constraint {
  return (actual: unknown): boolean =>
    typeof actual === "string" && expected.test(actual);
}

function same(expected: unknown): Constraint {
  return (actual: unknown): boolean => actual === expected;
}

function constraint<E>(expected: E): Constraint {
  if (expected instanceof RegExp) {
    return match(expected);
  } else {
    return same(expected);
  }
}

function predicates(options: Options): Predicate[] {
  const predicates: Predicate[] = [];

  function predicate<A, E>(
    select: (entry: Entry) => A,
    expected: E
  ): Predicate {
    const feasible = constraint(expected);
    return (entry: Entry): boolean => feasible(select(entry));
  }

  function compares<A, E>(
    select: (entry: Entry) => A,
    expected?: E | null
  ): void {
    if (expected != null) {
      predicates.push(predicate(select, expected));
    }
  }

  compares((e: Entry) => e.draft, options.draft);
  compares((e: Entry) => e.name, options.name);
  compares((e: Entry) => e.prerelease, options.prerelease);
  compares((e: Entry) => e.tag_name, options.tag_name);
  return predicates;
}

function compose(predicates: Predicate[]): Predicate {
  return (entry: Entry): boolean =>
    predicates.every((predicate: Predicate): boolean => predicate(entry));
}

// vim: set ts=2 sw=2 sts=2:
