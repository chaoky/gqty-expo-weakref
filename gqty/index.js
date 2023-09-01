/**
 * GQty: You can safely modify this file based on your needs.
 */

import { createReactClient } from "@gqty/react";
import { Cache, GQtyError, createClient } from "gqty";
import { generatedSchema, scalarsEnumsHash } from "./schema.generated";

/**
 * @type {import("gqty").QueryFetcher}
 */
const queryFetcher = async function (
  { query, variables, operationName },
  fetchOptions
) {
  // Modify "/api/graphql" if needed
  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
      operationName,
    }),
    mode: "cors",
    ...fetchOptions,
  });

  if (response.status >= 400) {
    throw new GQtyError(
      `GraphQL endpoint responded with HTTP status ${response.status}.`
    );
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new GQtyError(
      `Malformed JSON response: ${
        text.length > 50 ? text.slice(0, 50) + "..." : text
      }`
    );
  }
};

const cache = new Cache(
  undefined,
  /**
   * Default option is immediate cache expiry but keep it for 5 minutes,
   * allowing soft refetches in background.
   */
  {
    maxAge: 0,
    staleWhileRevalidate: 5 * 60 * 1000,
    normalization: true,
  }
);

/**
 * @type {import("gqty").GQtyClient<import("./schema.generated").GeneratedSchema>}
 */
export const client = createClient({
  schema: generatedSchema,
  scalars: scalarsEnumsHash,
  cache,
  fetchOptions: {
    fetcher: queryFetcher,
  },
});

// Core functions
export const { resolve, subscribe, schema } = client;

// Legacy functions
export const {
  query,
  mutation,
  mutate,
  subscription,
  resolved,
  refetch,
  track,
} = client;

export const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
} =
  /**
   * @type {import("@gqty/react").ReactClient<import("./schema.generated").GeneratedSchema>}
   */
  createReactClient(client, {
    defaults: {
      // Enable Suspense, you can override this option for each hook.
      suspense: true,
    },
  });

export * from "./schema.generated";
