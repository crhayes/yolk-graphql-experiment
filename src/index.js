const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');

const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type User implements Node {
    id: ID!
    name: String
    hubs: HubConnection
  }

  type Hub implements Node {
    id: ID!
    name: String
    members: HubMemberConnection
  }

  type HubEdge {
    viewerPermissions: [String]
    node: Hub
  }

  type HubConnection {
    totalCount: Int
    edges: [HubEdge]
  }

  type HubMemberConnection {
    totalCount: Int
    edges: [HubMemberEdge]
  }

  type HubMemberEdge {
    viewerPermissions: [String]
    viewerAssignableRoles: [String]
    node: User
  }

  type Query {
    me: User
    user(name: String): User
    hubs: HubConnection
    hub(name: String): HubEdge
  }
`;

const user = (_, { name }) => ({
  id: 1,
  name: name || 'Chris',
  hubs,
});

const hub = () => ({
  viewerPermissions: () => ['view', 'update', 'delete'],
  node: () => ({
    name: 'EITS',
    members: () => ({
      totalCount: 3,
      edges: () => [
        {
          viewerPermissions: ['view', 'update'],
          viewerAssignableRoles: ['Approver', 'Agent'],
          node: () => ({
            name: 'Jaspaul',
          }),
        },
        {
          viewerPermissions: ['view'],
          viewerAssignableRoles: [],
          node: () => ({
            name: 'Alec',
          }),
        },
        {
          viewerPermissions: ['view'],
          viewerAssignableRoles: [],
          node: () => ({
            name: 'Spencer',
          }),
        },
      ],
    }),
  }),
});

const hubs = () => ({
  totalCount: 1,
  edges: () => [hub()],
});

const resolvers = {
  Query: {
    me: user,
    user,
    hubs,
    hub,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
