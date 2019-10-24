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

  type ViewerPermissions {
    view: Boolean
    update: Boolean
    delete: Boolean
  }

  type Hub implements Node {
    id: ID!
    name: String
    members: HubMemberConnection
  }

  type HubEdge {
    viewerPermissions: ViewerPermissions
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
    viewerPermissions: ViewerPermissions
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
  viewerPermissions: () => ({
    view: true,
    update: true,
    delete: true,
  }),
  node: () => ({
    name: 'EITS',
    members: () => ({
      totalCount: 3,
      edges: () => [
        {
          viewerPermissions: () => ({
            view: true,
            update: true,
            delete: false,
          }),
          viewerAssignableRoles: ['Approver', 'Agent'],
          node: () => ({
            name: 'Jaspaul',
          }),
        },
        {
          viewerPermissions: () => ({
            view: true,
            update: false,
            delete: false,
          }),
          viewerAssignableRoles: [],
          node: () => ({
            name: 'Alec',
          }),
        },
        {
          viewerPermissions: () => ({
            view: true,
            update: false,
            delete: false,
          }),
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
