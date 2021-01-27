import { inspect } from "util";

export function repr(value: unknown): string {
  return inspect(value, {
    compact: true,
    breakLength: Infinity,
  });
}

type MapperCase = [unknown[], unknown, unknown];
type AdjustedMapperCase = [string, unknown[], unknown, unknown];

export function entitleMapperCase(
  mapper: string,
  [args, input, output]: MapperCase
): AdjustedMapperCase {
  const title = `${mapper}(${args.map(repr).join(", ")})(${repr(input)})`;
  return [title, args, input, output];
}

export function entitleMapperCases(
  mapper: string,
  cases: MapperCase[]
): AdjustedMapperCase[] {
  return cases.map((c) => entitleMapperCase(mapper, c));
}

// vim: set ts=2 sw=2 sts=2:
