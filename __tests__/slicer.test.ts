import { slicer } from "../src/slicer";
import { repr, entitleMapperCases } from "./util";

describe(".slicer", () => {
  type Args = Parameters<typeof slicer>;

  describe.each(
    entitleMapperCases(".slicer", [
      [[], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[undefined], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[null], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[{ type: "F" }], [0, 1, 2, 3], [0]],
      [[{ type: "F", count: undefined }], [0, 1, 2, 3], [0]],
      [[{ type: "F", count: null }], [0, 1, 2, 3], [0]],
      [[{ type: "F", count: 1 }], [0, 1, 2, 3], [0]],
      [[{ type: "F", count: 2 }], [0, 1, 2, 3], [0, 1]],
      [[{ type: "F", count: 3 }], [0, 1, 2, 3], [0, 1, 2]],
      [[{ type: "F", count: 3 }], [0, 1], [0, 1]],
      [[{ type: "L" }], [0, 1, 2, 3], [3]],
      [[{ type: "L", count: undefined }], [0, 1, 2, 3], [3]],
      [[{ type: "L", count: null }], [0, 1, 2, 3], [3]],
      [[{ type: "L", count: 1 }], [0, 1, 2, 3], [3]],
      [[{ type: "L", count: 2 }], [0, 1, 2, 3], [2, 3]],
      [[{ type: "L", count: 3 }], [0, 1, 2, 3], [1, 2, 3]],
      [[{ type: "L", count: 3 }], [0, 1], [0, 1]],
      [[{ type: "R" }], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[{ type: "R", from: undefined }], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[{ type: "R", from: null }], [0, 1, 2, 3], [0, 1, 2, 3]],
      [
        [{ type: "R", from: undefined, to: undefined }],
        [0, 1, 2, 3],
        [0, 1, 2, 3],
      ],
      [[{ type: "R", from: null, to: undefined }], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[{ type: "R", from: undefined, to: null }], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[{ type: "R", from: null, to: null }], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[{ type: "R", from: 0 }], [0, 1, 2, 3], [0, 1, 2, 3]],
      [[{ type: "R", from: 1 }], [0, 1, 2, 3], [1, 2, 3]],
      [[{ type: "R", from: 2 }], [0, 1, 2, 3], [2, 3]],
      [[{ type: "R", from: 3 }], [0, 1, 2, 3], [3]],
      [[{ type: "R", from: 4 }], [0, 1, 2, 3], []],
      [[{ type: "R", from: 0, to: 2 }], [0, 1, 2, 3], [0, 1, 2]],
      [[{ type: "R", from: null, to: 2 }], [0, 1, 2, 3], [0, 1, 2]],
      [[{ type: "R", from: undefined, to: 2 }], [0, 1, 2, 3], [0, 1, 2]],
      [[{ type: "R", from: 2, to: 4 }], [0, 1, 2, 3, 4, 5], [2, 3, 4]],
    ])
  )("%s", (_, args, entries, output) => {
      it(`returns ${repr(output)}`, () => {
        expect.assertions(1);
        expect(
          slicer(...(args as Args))(entries as unknown[])
        ).toStrictEqual(output);
      });
    }
  );
});

// vim: set ts=2 sw=2 sts=2:
