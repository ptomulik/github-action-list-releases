import { first, last, range } from "../src/slice";
import pretty from "pretty-format";

describe(".first", () => {
  type Argument = number | null | undefined;
  type Case = [Argument[], unknown[], unknown[]];
  type Adjusted = [string, ...Case];
  function adjust(cases: Case[]): Adjusted[] {
    function callback([args, entries, output]: Case): Adjusted {
      const list = args.map((arg: Argument) => pretty(arg)).join(", ");
      const title = `.first(${list}).from(${JSON.stringify(entries)})`;
      return [title, args, entries, output];
    }
    return cases.map(callback);
  }
  describe.each(
    adjust([
      [[], [0, 1, 2, 3], [0]],
      [[undefined], [0, 1, 2, 3], [0]],
      [[null], [0, 1, 2, 3], [0]],
      [[1], [0, 1, 2, 3], [0]],
      [[3], [0, 1, 2, 3], [0, 1, 2]],
      [[3], [0, 1], [0, 1]],
    ])
  )(
    "%s",
    (_: string, args: Argument[], entries: unknown[], output: unknown[]) => {
      it(`returns ${JSON.stringify(output)}`, () => {
        expect.assertions(1);
        expect(first(...args).from(entries)).toStrictEqual(output);
      });
    }
  );
});

describe(".last", () => {
  type Argument = number | null | undefined;
  type Case = [Argument[], unknown[], unknown[]];
  type Adjusted = [string, ...Case];

  function adjust(cases: Case[]): Adjusted[] {
    function callback([args, entries, output]: Case): Adjusted {
      const list = args.map((arg: Argument) => pretty(arg)).join(", ");
      const title = `.last(${list}).from(${JSON.stringify(entries)})`;
      return [title, args, entries, output];
    }
    return cases.map(callback);
  }

  describe.each(
    adjust([
      [[], [0, 1, 2, 3], [3]],
      [[undefined], [0, 1, 2, 3], [3]],
      [[null], [0, 1, 2, 3], [3]],
      [[1], [0, 1, 2, 3], [3]],
      [[3], [0, 1, 2, 3], [1, 2, 3]],
      [[3], [0, 1], [0, 1]],
    ])
  )(
    "%s",
    (_: string, args: Argument[], entries: unknown[], output: unknown[]) => {
      it(`returns ${JSON.stringify(output)}`, () => {
        expect.assertions(1);
        expect(last(...args).from(entries)).toStrictEqual(output);
      });
    }
  );
});

describe(".range", () => {
  type Argument = number | null | undefined;
  type Case = [Argument[], unknown[], unknown[]];
  type Adjusted = [string, ...Case];

  function adjust(cases: Case[]): Adjusted[] {
    function callback([args, entries, output]: Case): Adjusted {
      const list = args.map((arg: Argument) => pretty(arg)).join(", ");
      const title = `.range(${list}).from(${JSON.stringify(entries)})`;
      return [title, args, entries, output];
    }
    return cases.map(callback);
  }

  describe.each(
    adjust([
      [[], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[undefined], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[null], [0, 1, 2, 3], [0, 1, 2, 3]],
      [
        [undefined, undefined],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
      ],
      [
        [null, undefined],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
      ],
      [
        [undefined, null],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
      ],
      [
        [null, null],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
      ],
      [[0], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[1], [0, 1, 2, 3], [1, 2, 3]],
      [[2], [0, 1, 2, 3], [2, 3]],
      [[3], [0, 1, 2, 3], [3]],
      [[4], [0, 1, 2, 3], []],
      [
        [0, 2],
        [0, 1, 2, 3],
        [0, 1, 2],
      ],
      [
        [null, 2],
        [0, 1, 2, 3],
        [0, 1, 2],
      ],
      [
        [undefined, 2],
        [0, 1, 2, 3],
        [0, 1, 2],
      ],
      [
        [2, 4],
        [0, 1, 2, 3, 4, 5],
        [2, 3, 4],
      ],
    ])
  )(
    "%s",
    (_: string, args: Argument[], entries: unknown[], output: unknown[]) => {
      it(`returns ${JSON.stringify(output)}`, () => {
        expect.assertions(1);
        expect(range(...args).from(entries)).toStrictEqual(output);
      });
    }
  );
});

// vim: set ts=2 sw=2 sts=2:
