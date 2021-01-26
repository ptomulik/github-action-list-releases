import { RestEndpointMethodTypes } from "@octokit/rest";

type MethodTypes = RestEndpointMethodTypes["repos"]["listReleases"];
export type Parameters = MethodTypes["parameters"];
export type Response = MethodTypes["response"];
export type Data = Response["data"];
export type Entry = Data[0];

// vim: set ts=2 sw=2 sts=2:
