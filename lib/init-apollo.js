import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { GRAPHCOOL_PROJECT_ID, GRAPHCOOL_TOKEN } from '../constants';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  const token = process.browser ? localStorage.getItem(GRAPHCOOL_TOKEN) : null;
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: `https://api.graph.cool/simple/v1/${GRAPHCOOL_PROJECT_ID}`,
      credentials: 'same-origin',
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
