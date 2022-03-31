import {ApolloClient, InMemoryCache} from '@apollo/client';
import config from "../config";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

 const client = new ApolloClient({
  uri: config.API_URL,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});


export default client