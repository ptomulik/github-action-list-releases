import { select, Entry, Parameter } from "../src/select";

describe(".select", () => {
  type Case = [Parameter, Entry[], Entry[]];
  type Adjusted = [string, Parameter, Entry[], Entry[]];

  function adjust(cases: Case[]): Adjusted[] {
    function callback([parameter, entries, output]: Case): Adjusted {
      const parm = JSON.stringify(parameter);
      const ents = JSON.stringify(entries);
      const title = `.select(${parm}).from(${ents})`;
      return [title, parameter, entries, output];
    }
    return cases.map(callback);
  }

  describe.each(
    adjust([
      [null, [{ name: "foo", id: 1234 }], [{ name: "foo", id: 1234 }]],
      [undefined, [{ name: "foo", id: 1234 }], [{ name: "foo", id: 1234 }]],
      [
        ["name"],
        [{ name: "foo", id: 1234, url: "https://x.com" }],
        [{ name: "foo" }],
      ],
      [
        ["url", "name"],
        [{ name: "foo", id: 1234, url: "https://x.com" }],
        [{ name: "foo", url: "https://x.com" }],
      ],
      [
        ["url", "id"],
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
        ["name", "id"],
        [
          { id: 1234, url: "http://x.com/v1.1" },
          { id: 1235, url: "http://x.com/v1.2" },
        ],
        [{ id: 1234 }, { id: 1235 }],
      ],
    ])
  )(
    "%s",
    (_: string, parameter: Parameter, entries: Entry[], output: Entry[]) => {
      it(`returns ${JSON.stringify(output)}`, () => {
        expect.assertions(1);
        expect(select(parameter).from(entries)).toStrictEqual(output);
      });
    }
  );
});

// vim: set ts=2 sw=2 sts=2:
