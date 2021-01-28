import { Entry as RestEntry } from "./rest";
import { ArrayMapper } from "./mapper";

export type Entry = Partial<RestEntry>;

export type Sortable =
  | "assets_url"
  | "body"
  | "created_at"
  | "draft"
  | "html_url"
  | "id"
  | "name"
  | "node_id"
  | "prerelease"
  | "published_at"
  | "tag_name"
  | "tarball_url"
  | "target_commitish"
  | "upload_url"
  | "url"
  | "zipball_url";

export const sortable: Sortable[] = [
  "assets_url",
  "body",
  "created_at",
  "draft",
  "html_url",
  "id",
  "name",
  "node_id",
  "prerelease",
  "published_at",
  "tag_name",
  "tarball_url",
  "target_commitish",
  "upload_url",
  "url",
  "zipball_url",
];

export type Order = "A" | "D";
export type Specifier = [Sortable, Order];
export type Parameter = Specifier | Sortable;
export type Parameters = Parameter[];

export type Sorter = ArrayMapper<Entry>;

export function sorter(specs?: Parameters | null, order?: Order): Sorter {
  if (!(specs instanceof Array)) {
    return (entries: Entry[]): Entry[] => entries;
  }

  const validate = (spec: Parameter): Specifier => {
    if (typeof spec === "string") {
      return [spec, order || "A"];
    }
    return spec;
  };
  const callback = comparator(specs.map(validate));
  return (entries: Entry[]): Entry[] => entries.sort(callback);
}

interface Comparator {
  (left: Entry, right: Entry): number;
}

function comparator(specs: Specifier[]): Comparator {
  function compare(left: unknown, right: unknown): number {
    // nulls and undefined values shall be moved to the end
    for (const special of [undefined, null]) {
      if (left === special && right === special) {
        return 0;
      } else if (left === special) {
        return 1;
      } else if (right === special) {
        return -1;
      }
    }

    if (typeof left === "boolean" && typeof right === "boolean") {
      return (left ? 1 : 0) - (right ? 1 : 0);
    }

    if (typeof left === "number" && typeof right === "number") {
      return Math.sign(left - right);
    }

    return Object(left).toString().localeCompare(Object(right).toString());
  }

  return (left: Entry, right: Entry): number => {
    const select = ([key, ord]: Specifier): [unknown, unknown] =>
      ord === "D" ? [right[key], left[key]] : [left[key], right[key]];
    const evaluate = (
      result: number,
      [left, right]: [unknown, unknown]
    ): number => (result === 0 ? compare(left, right) : result);
    return specs.map(select).reduce(evaluate, 0);
  };
}

// vim: set ts=2 sw=2 sts=2:
