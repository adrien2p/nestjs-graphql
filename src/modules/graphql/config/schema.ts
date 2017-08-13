import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  scalar JSON
  
  schema {
    query: Query
  }
  
  type User {
    id: ID!
    email: String!,
    firstName: String!,
    lastName: String!
  }

  type Query {
    getUsers(filter: SearchFilter, limit: Int, offset: Int): [User!]!
  }
  
  input SearchFilter {
    search: String!
  }
`;

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});