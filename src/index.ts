import { Octokit as Core } from "@octokit/core";
import { listReleases } from "./list-releases";
import type { Releases } from "./types";

const Octokit = Core.plugin(listReleases);

const octokit = new Octokit();
octokit.listReleases(
  {
    owner: "code-lts",
    repo: "doctum",
    max_entries: 2
  }
).then((releases: Releases) => {
  console.log(releases);
});
