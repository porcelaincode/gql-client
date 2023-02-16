// apollo
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const BASE_URL = process.env.REACT_APP_SERVER_URI || "localhost:5000";

const URI = `http://${BASE_URL}/graphql`;

console.log(URI);

// http link
const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext(async () => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
  };
});

const link = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
}, authLink.concat(httpLink));

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: true,
  }),
});
