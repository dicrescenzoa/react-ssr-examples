import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import fetch from "isomorphic-fetch";

const isServer = typeof window === 'undefined';

const httpLink = new HttpLink({
  fetch,
  uri: 'https://rickandmortyapi.com/graphql/',
});

const ssrMode = isServer;

const cache = isServer ? new InMemoryCache() : new InMemoryCache().restore(window.__INITIAL_STATE__);

const getApolloClient = () => new ApolloClient({
  link: ApolloLink.from([httpLink]),
  ssrMode,
  cache: cache,
});

export default getApolloClient;
