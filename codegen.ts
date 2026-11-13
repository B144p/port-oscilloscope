import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * Types and documents come from port-server's committed schema, read from
 * the sibling checkout. The output is committed too, so builds (Vercel)
 * never need port-server: run `pnpm codegen` after a schema change and
 * commit the result in the same PR.
 */
const config: CodegenConfig = {
  schema: "../port-server/src/schema.gql",
  documents: ["features/**/*.graphql.ts"],
  ignoreNoDocuments: true,
  generates: {
    "lib/graphql/generated/": {
      preset: "client",
      presetConfig: {
        // Fragment types double as each section's data type (Statistic,
        // Project, …), so they must be readable without unmasking.
        fragmentMasking: false,
        // hash → document map: the BFF only forwards operations listed here.
        persistedDocuments: true,
      },
      config: {
        // Plain typed strings: our fetchers send text, no GraphQL AST runtime.
        documentMode: "string",
        enumsAsTypes: true,
        useTypeImports: true,
        // A selected field is always present in the response (null when
        // empty), so `bio: string | null`, not `bio?: string | null`.
        // Variables stay optional.
        avoidOptionals: { field: true, inputValue: false },
      },
    },
  },
};

export default config;
