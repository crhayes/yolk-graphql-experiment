# Yolk GraphQL Experiment

Illustrates (very roughly) what a GraphQL API could look like when querying for permissions on edges.

Note that resolvers and data are hardcoded, so don't expect too much ;)

## Usage

`npm run start`

Open `http://localhost:4000`

## Test Queries

### Query for current user

```gql
{
  me {
    hubs {
      edges {
        node {
          name
          members {
            totalCount
            edges {
              node {
                name
              }
              viewerPermissions {
                view
                update
                delete
              }
              viewerAssignableRoles
            }
          }
        }
        viewerPermissions {
          view
          update
          delete
        }
      }
    }
  }
}
```

### Query for hubs

```gql
{
  hubs {
    edges {
      node {
        name
        members {
          totalCount
          edges {
            node {
              name
            }
            viewerPermissions {
              view
              update
              delete
            }
            viewerAssignableRoles
          }
        }
      }
      viewerPermissions {
        view
        update
        delete
      }
    }
  }
}
```

### Query for specific hub

```gql
{
  hub(name: "SecOps") {
    node {
      name
      members {
        totalCount
        edges {
          node {
            name
          }
          viewerPermissions {
            view
            update
            delete
          }
          viewerAssignableRoles
        }
      }
    }
    viewerPermissions {
      view
      update
      delete
    }
  }
}
```

### Query for specific user

```gql
{
  user(name: "Spencer") {
    name
    hubs {
      edges {
        node {
          name
          members {
            totalCount
            edges {
              node {
                name
              }
              viewerPermissions {
                view
                update
                delete
              }
              viewerAssignableRoles
            }
          }
        }
        viewerPermissions {
          view
          update
          delete
        }
      }
    }
  }
}
```
