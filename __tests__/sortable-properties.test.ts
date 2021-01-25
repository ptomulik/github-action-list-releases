import { sortableProperties } from "../src/sortable-properties";
import { SortableProperties } from "../src/types";

describe("sortableProperties", () => {
  const expected: SortableProperties = [
    "assets_url",
    "body",
    "created_at",
    "draft",
    "htlm_url",
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
  it("has expected entries", () => {
    expect.assertions(1);
    expect(sortableProperties).toStrictEqual(expected);
  });
});
