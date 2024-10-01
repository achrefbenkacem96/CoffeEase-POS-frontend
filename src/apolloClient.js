import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Your NestJS GraphQL API URL
  cache: new InMemoryCache(),
});

export default client;
