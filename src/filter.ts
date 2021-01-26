import { Entry as RestEntry } from "./rest";

export type Entry = Partial<RestEntry>;

export interface Parameters {
  draft?: boolean | null;
  name?: string | RegExp | null;
  prerelease?: boolean | null;
  tag_name?: string | RegExp | null;
}

export interface Filter {
  apply: (entries: Entry[]) => Entry[];
}

export function filter(parameters: Parameters): Filter {
  const predicate = callback(parameters);
  return { apply: (entries: Entry[]): Entry[] => entries.filter(predicate) };
}

type Callback = Predicate;

function callback(parameters: Parameters): Callback {
  return compose(predicates(parameters));
}

interface Predicate {
  (entry: Entry): boolean;
}

interface Constraint {
  (actual: unknown): boolean;
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

function predicates(parameters: Parameters): Predicate[] {
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

  compares((e: Entry) => e.draft, parameters.draft);
  compares((e: Entry) => e.name, parameters.name);
  compares((e: Entry) => e.prerelease, parameters.prerelease);
  compares((e: Entry) => e.tag_name, parameters.tag_name);
  return predicates;
}

function compose(predicates: Predicate[]): Predicate {
  return (entry: Entry): boolean =>
    predicates.every((predicate: Predicate): boolean => predicate(entry));
}

// vim: set ts=2 sw=2 sts=2:
