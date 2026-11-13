/** Client-safe shapes of a GraphQL-over-HTTP response. */

export interface GraphQLErrorLike {
  message: string;
  /** Root field first, e.g. ["statistic"] — names the section that failed. */
  path?: ReadonlyArray<string | number>;
}

/**
 * port-server's root fields are nullable, so a response can be partial:
 * a failed section is null in `data` with a matching entry in `errors`.
 */
export interface GraphQLResponse<TData> {
  data?: TData | null;
  errors?: GraphQLErrorLike[];
}
