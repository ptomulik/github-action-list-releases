import { RestEndpointMethodTypes } from "@octokit/rest";

type ListReleasesMethodTypes = RestEndpointMethodTypes["repos"]["listReleases"];
export type ListReleasesParameters = ListReleasesMethodTypes["parameters"];
export type ListReleasesResponse = ListReleasesMethodTypes["response"];
export type ListReleasesData = ListReleasesResponse["data"];
export type Release = ListReleasesData[0];

//export type SortableProperty =
//  | "assets_url"
//  | "body"
//  | "created_at"
//  | "draft"
//  | "htlm_url"
//  | "id"
//  | "name"
//  | "node_id"
//  | "prerelease"
//  | "published_at"
//  | "tag_name"
//  | "tarball_url"
//  | "target_commitish"
//  | "upload_url"
//  | "url"
//  | "zipball_url";
//
//export type SortableProperties = SortableProperty[];
//
//export type SelectableProperty =
//  | "assets"
//  | "assets_url"
//  | "author"
//  | "body"
//  | "created_at"
//  | "draft"
//  | "htlm_url"
//  | "id"
//  | "name"
//  | "node_id"
//  | "prerelease"
//  | "published_at"
//  | "tag_name"
//  | "tarball_url"
//  | "target_commitish"
//  | "upload_url"
//  | "url"
//  | "zipball_url";
//
//export type SelectableProperties = SelectableProperty[];
//
///** Sort order specifier: "A" - ascending, "D" - descending. */
//export type SortOrder = "A" | "D";
//
///** Sorting specifier for a single peoperty. */
//export interface PropertySortSpec {
//  property: SortableProperty;
//  order?: SortOrder;
//}
//
///** Sorting specifier for whole object */
//export type SortSpec = PropertySortSpec[];
//
///** Specifies number of entries to be sliced from the beginning of an array */
//export interface SliceFirstSpec {
//  first: number;
//}
//
///** Specifies number of entries to be sliced from the end of an array */
//export interface SliceLastSpec {
//  last: number;
//}
//
///** Specifies range of indices to be sliced from an array */
//export interface SliceRangeSpec {
//  range: [number, number];
//}
//
///** Specifies array slice */
//export type SliceSpec = SliceFirstSpec | SliceLastSpec | SliceRangeSpec;
//
///** Parsed action inputs. */
//export interface ActionInputs {
//  /** Personal token. */
//  token?: string;
//
//  /** Repository owner. */
//  owner: string;
//
//  /** Repository name. */
//  repo: string;
//
//  /** Page size. */
//  per_page?: number;
//
//  /** Max number of entries retrieved from remote repository. */
//  max_entries?: number;
//
//  /** String used to filter retrieved releases by name. */
//  name?: string | RegExp;
//
//  /** String used to filter retrieved releases by tag_name. */
//  tag_name?: string | RegExp;
//
//  /** Value used to filter retrieved releases by draft status. */
//  draft?: boolean;
//
//  /** Value used to filter retrieved releases by prerelease status. */
//  prerelease?: boolean;
//
//  /** List of properties used for sorting the retrieved releases. */
//  sort?: SortSpec;
//
//  /** Default sort order. */
//  order?: SortOrder;
//
//  /* List of properties to be included. */
//  select?: SelectableProperties;
//
//  /* The range of entries to be returned. */
//  slice?: SliceSpec;
//}

// vim: set ts=2 sw=2 sts=2:
