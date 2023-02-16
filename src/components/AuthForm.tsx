import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_USER, REGISTER_USER } from "../apollo/graphql/users";
import { setUser } from "../redux/actions";

export default function AuthForm() {
  const dispatch: any = useDispatch();

  const [remember, setRemember] = useState(false);
  const [reg, setReg] = useState<boolean>(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [login] = useMutation(LOGIN_USER, {
    variables: {
      creds: {
        email: values.email,
        password: values.password,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      console.log(data);
      dispatch(setUser(data.login, remember));
    },
    onError(error) {
      console.log(error);
      alert(error.message);
    },
  });

  const [register] = useMutation(REGISTER_USER, {
    variables: {
      creds: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      console.log(data);
      dispatch(setUser(data.register, remember));
    },
    onError(error) {
      alert(error.message);
    },
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <svg
            className="w-12 h-12 fill-current mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {!reg ? "Make a new account" : "Sign in to your account"}
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            {!reg && (
              <div className="mb-5">
                <label className="sr-only">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
            )}
            <div>
              <label className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              onClick={() => setRemember(!remember)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div>
            <button
              onClick={() =>
                !reg
                  ? register({
                      variables: {
                        creds: {
                          email: values.email,
                          name: values.name,
                          password: values.password,
                        },
                      },
                    })
                  : login({
                      variables: {
                        creds: {
                          email: values.email,
                          password: values.password,
                        },
                      },
                    })
              }
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {!reg ? "Sign Up" : "Sign in"}
            </button>
          </div>
        </div>
        <div className="text-sm text-center">
          <button
            onClick={() => setReg(!reg)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {reg ? "Don't have an account yet?" : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}
