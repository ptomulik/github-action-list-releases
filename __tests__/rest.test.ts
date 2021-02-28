import { listReleases, Parameters } from "../src/rest";
import { Octokit } from "@octokit/rest";
import { repr } from "./util";

jest.mock("@octokit/rest");

describe(".listReleases", () => {
  describe.each([
    [{}, [], {}, []],
    [{ owner: null, repo: null }, [], { owner: null, repo: null }, []],
    [
      { owner: "github", repo: "docs" },
      [1, 2],
      { owner: "github", repo: "docs" },
      [1, 2],
    ],
    [{ per_page: 100 }, [], { per_page: 100 }, []],
    [{ per_page: 101 }, [], {}, []],
    [{ max_entries: 100 }, [], { per_page: 100 }, []],
    [{ max_entries: 101 }, [], {}, []],
    [{ max_entries: 100, per_page: 30 }, [], { per_page: 30 }, []],
    [{ max_entries: 30, per_page: 100 }, [], { per_page: 30 }, []],
    [{ max_entries: 101, per_page: 101 }, [], {}, []],
    [
      { max_entries: 4 },
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
      { per_page: 4 },
      [0, 1, 2, 3],
    ],
    [
      { max_entries: 4, per_page: 3 },
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
      { per_page: 3 },
      [0, 1, 2, 3],
    ],
  ])(
    ".listReleases(octokit, %j) with releases: %j",
    (params, releases, pparams, output) => {
      it(`calls octokit.paginate("...", ${repr(pparams)}, ...)`, async () => {
        expect.assertions(1);
        const octokit = new Octokit(releases);
        const spy = jest.spyOn(octokit, "paginate");
        await listReleases(octokit, params as Parameters);
        expect(spy).toHaveBeenCalledWith(
          "GET /repos/{owner}/{repo}/releases",
          pparams,
          expect.anything()
        );
        spy.mockRestore();
      });

      it(`returns ${repr(output)}`, async () => {
        expect.assertions(1);
        const octokit = new Octokit(releases);
        const data = await listReleases(octokit, params as Parameters);
        expect(data).toStrictEqual(output);
      });
    }
  );
});
