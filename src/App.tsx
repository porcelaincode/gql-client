import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";

import { Provider, useSelector } from "react-redux";
import { Store } from "./redux/store";

// handling auth
import { client } from "./apollo/Provider";

// screens
import Home from "./screens/Home";
import Auth from "./screens/Auth";

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function Router() {
  const { user } = useSelector((state: any) => state.userReducer);

  return <RouterProvider router={user ? userRouter : authRouter} />;
}
function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={Store}>
        <Router />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
