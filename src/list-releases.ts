import type { Octokit } from "@octokit/core";
import type { RequestParameters, RequestResponse } from "./types";
import { composePaginateRest } from "@octokit/plugin-paginate-rest";

type ListReleasesParameters = RequestParameters & {
  max_entries?: number;
};

export function listReleases(octokit: Octokit) {
  return {
    listReleases: (parameters: ListReleasesParameters) => {
      return composePaginateRest(
        octokit,
        "GET /repos/{owner}/{repo}/releases",
        adjust(parameters),
        callback(parameters)
      );
    }
  }
}

function callback(parameters: ListReleasesParameters) {
  let remain = parameters.max_entries
    ? parameters.max_entries
    : Number.MAX_SAFE_INTEGER;
  return ({ data }: RequestResponse, done: () => void) => {
    remain -= data.length;
    if (remain <= 0) {
      if (remain < 0) {
        data = data.slice(0, remain);
      }
      done();
    }
    return data;
  }
}

function adjust(parameters: ListReleasesParameters): RequestParameters {
  const { max_entries, per_page, ...params } = parameters;

  if (per_page != null && per_page <= 100) {
    if (max_entries != null && max_entries <= 100) {
      params.per_page = Math.min(per_page, max_entries);
    } else {
      params.per_page = per_page;
    }
  } else {
    if (max_entries != null && max_entries <= 100) {
      params.per_page = max_entries;
    }
  }

  return params;
}

// vim: set ts=2 sw=2 sts=2:
