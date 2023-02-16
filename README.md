This is a ReactJS Web client with 2 basic auth routes `\` and `\auth` for the basic graphql server[https://github.com/porcelaincode/gql-client].

It is themed with TailwindCSS as CSS framework and `@apollo/client` as client backbone.

## Types

### Queries

```javascript
// user
getUser;
```

### Mutations

```javascript
// user
login;
register;
```

## Configure server

Setup env variables after creating `.env` file in the root directory. Following env variables are necessary for fully functioning client. More can be added accordingly

```sh
REACT_APP_SERVER_URI=
```
