import { selectableProperties } from "../src/selectable-properties";
import { SelectableProperties } from "../src/types";

describe("selectableProperties", () => {
  const expected: SelectableProperties = [
    "assets",
    "assets_url",
    "author",
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
    expect(selectableProperties).toStrictEqual(expected);
  });
});
