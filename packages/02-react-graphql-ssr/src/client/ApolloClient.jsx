import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { getDataFromTree } from "@apollo/react-ssr";
import fetch from "isomorphic-fetch";

const isServer = typeof window === 'undefined';

const httpLink = new HttpLink({
  fetch,
  uri: 'https://rickandmortyapi.com/graphql/',
});

const ssrMode = isServer;

const cache = isServer ? new InMemoryCache() : new InMemoryCache().restore(window.__INITIAL_STATE__);

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  ssrMode,
  cache: cache,
});

export const getApolloSSRInitialaData = async (ReactApp) => {
  await client.resetStore();
  await getDataFromTree(ReactApp)
  return client.extract();
};

export default client;
