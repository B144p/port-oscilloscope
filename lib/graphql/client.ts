import type { TypedDocumentString } from "./generated/graphql";
import type { GraphQLResponse } from "./types";

/**
 * Fetches one section through this app's /api/graphql (never port-server
 * directly), sending only the operation's persisted hash. Runs when the
 * SSR boot prefetch didn't seed that section, on ErrorState's retry, or
 * for queries the boot doesn't cover (AI usage 7D/30D, the view ping).
 *
 * Throws on an HTTP failure or when the section came back null, so React
 * Query surfaces the usual LINK FAILURE state for that section only.
 */
export async function fetchSection<
  TResult,
  TVariables,
  TRoot extends keyof TResult & string,
>(
  document: TypedDocumentString<TResult, TVariables>,
  root: TRoot,
  variables?: TVariables,
): Promise<NonNullable<TResult[TRoot]>> {
  const id = document.__meta__?.hash;
  if (typeof id !== "string") {
    throw new Error(`${root}: document has no persisted hash — run pnpm codegen`);
  }

  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(variables ? { id, variables } : { id }),
  });
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} ${root}`);

  const body = (await res.json()) as GraphQLResponse<TResult>;
  const section = body.data?.[root];
  if (section == null) throw new Error(`LINK FAILURE // ${root}`);
  return section;
}
