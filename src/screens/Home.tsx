import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";

import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";

import { setUser } from "../redux/actions";
import { GET_USER } from "../apollo/graphql/users";

export default function Home() {
  const dispatch: any = useDispatch();

  const { loading } = useQuery(GET_USER, {
    fetchPolicy: "no-cache",
    onCompleted(data) {
      dispatch(setUser(data.getUser, true));
    },
    onError(error) {
      alert(error.message);
    },
  });

  return (
    <div className="flex">
      {loading && <Loading sub="Fetching user" />}
      <Sidebar />
      <main className="flex-1 ml-64 mt-9">
        {Array.from(Array(6).keys()).map(() => (
          <div className="h-full p-10">
            <h1 className="text-base">Lorem Ipsum</h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        ))}
        <div className="h-full p-10">
          <h1 className="text-base">Footer?</h1>
        </div>
      </main>
    </div>
  );
}
