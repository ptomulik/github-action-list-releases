import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

type RequestTypes = RestEndpointMethodTypes["repos"]["listReleases"];
export type RequestParameters = RequestTypes["parameters"];
export type RequestResponse = RequestTypes["response"];
export type Releases = RequestResponse["data"];
export type Release = Releases[0];
