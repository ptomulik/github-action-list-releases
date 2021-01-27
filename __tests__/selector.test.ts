import { selector, Entry } from "../src/selector";
import { repr, entitleMapperCases } from "./util";

describe(".selector", () => {
  type Args = Parameters<typeof selector>;

  describe.each(
    entitleMapperCases(".selector", [
      [[null], [{ name: "foo", id: 1234 }], [{ name: "foo", id: 1234 }]],
      [[undefined], [{ name: "foo", id: 1234 }], [{ name: "foo", id: 1234 }]],
      [
        [["name"]],
        [{ name: "foo", id: 1234, url: "https://x.com" }],
        [{ name: "foo" }],
      ],
      [
        [["url", "name"]],
        [{ name: "foo", id: 1234, url: "https://x.com" }],
        [{ name: "foo", url: "https://x.com" }],
      ],
      [
        [["url", "id"]],
        [
          { name: "v1.1", id: 1234, url: "http://x.com/v1.1" },
          { name: "v1.2", id: 1235, url: "http://x.com/v1.2" },
        ],
        [
          { id: 1234, url: "http://x.com/v1.1" },
          { id: 1235, url: "http://x.com/v1.2" },
        ],
      ],
      [
        [["name", "id"]],
        [
          { id: 1234, url: "http://x.com/v1.1" },
          { id: 1235, url: "http://x.com/v1.2" },
        ],
        [{ id: 1234 }, { id: 1235 }],
      ],
    ])
  )("%s", (_, args, entries, output) => {
      it(`returns ${repr(output)}`, () => {
        expect.assertions(1);
        expect(
          selector(...(args as Args))(entries as Entry[])
        ).toStrictEqual(output);
      });
    }
  );
});

// vim: set ts=2 sw=2 sts=2:
