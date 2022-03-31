import {ApolloClient} from '@apollo/client';
import config from "../config";


export const client = new ApolloClient({
  uri: config.API_URL,
});
