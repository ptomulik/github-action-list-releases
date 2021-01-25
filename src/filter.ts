import { Release } from "../src/types";

type Entry = Partial<Release>;

type MakeFilterParameter<T> =
  T extends string
  ? string | RegExp
  : T extends boolean
  ? boolean :
  undefined;

type MakeFilterParameters<E> = {
  [K in keyof E]: MakeFilterParameter<E[K]>
}

export type FilterParametrers = MakeFilterParameters<Entry>;

/*
export type FilterableProperty = "draft" | "name" | "prerelease" | "tag_name";

export const filterableProperties: FilterableProperty[] = [
  "draft",
  "name",
  "prerelease",
  "tag_name",
];

export interface FilterParameters {
  name?: string|RegExp;
  tag_name?: string|RegExp;
  draft?: boolean;
  prerelease?: boolean;
}

interface TestFuncInterface {
  (entry: Entry): boolean
}

interface ComparatorInterface {
  (value: string, expect: string | RegExp): boolean;
  (value: any, expect: any): boolean;
}

function match(value: string | null, expect: string | RegExp): boolean {
  if (expect instanceof RegExp) {
    return value != null ? expect.test(value) : false;
  } else {
    return value === expect;
  }
}

function same(value: any, expect: any): boolean {
  return value === expect;
}

const comparators: Record<FilterableProperty, ComparatorInterface> = {
  draft: same,
  name: match,
  prerelease: same,
  tag_name: match,
};

function makeTestFuncs(parameters: FilterParameters): TestFuncInterface[] {
  const tests: TestFuncInterface[] = [];
  for (let key of filterableProperties) {
    if (parameters[key] != null) {
      const parameter = parameters[key];
      const comparator = comparators[key];
      tests.push((entry: Entry): boolean => comparator(entry[key], parameter));
    }
  }
  return tests;
}

export class Filter {
  tests: TestFuncInterface[];

  constructor(parameters: FilterParameters) {
    this.tests = makeTestFuncs(parameters);
  }

  get callback(): TestFuncInterface {
    return (entry: Entry): boolean => (
      this.tests.reduce(
        (result: boolean, test: TestFuncInterface) => result && test(entry),
        true
      )
    );
  }

  filter(entries: Entry[]): Entry[] {
    return entries.filter(this.callback)
  }
}
*/

// vim: set ts=2 sw=2 sts=2:
