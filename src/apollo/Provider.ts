// apollo
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

const BASE_URL = process.env.REACT_APP_SERVER_URI || "localhost:5000";

const URI = `https://${BASE_URL}/graphql`;

// http link
const httpLink = createHttpLink({
  uri: URI,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("jwtToken");
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
