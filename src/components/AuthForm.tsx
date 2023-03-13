import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { LOGIN_USER, REGISTER_USER } from "../apollo/graphql/users";
import { setUser } from "../redux/actions";

export default function AuthForm() {
  const dispatch: any = useDispatch();

  const [remember, setRemember] = useState(true);
  const [reg, setReg] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(true);

  const [values, setValues] = useState<{
    name: string;
    email: string;
    password: string;
    error: string | null;
  }>({
    name: "",
    email: "",
    password: "",
    error: null,
  });

  const [login, { loading: logging }] = useMutation(LOGIN_USER, {
    variables: {
      creds: {
        email: values.email,
        password: values.password,
      },
    },
    onCompleted(data) {
      dispatch(setUser(data.login, remember));
    },
    onError(error) {
      setValues({ ...values, password: "", error: error.message });
      alert(error.message);
    },
  });

  const [register, { loading: registering }] = useMutation(REGISTER_USER, {
    variables: {
      creds: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    },
    onCompleted(data) {
      dispatch(setUser(data.register, remember));
    },
    onError(error) {
      setValues({ ...values, password: "", error: error.message });
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
          <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">
            {reg ? "Make a new account" : "Sign in to your account"}
          </h2>
        </div>
        <div className="p-4 max-w-md mx-auto bg-white">
          {reg && (
            <>
              <label className="text-sm font-medium block mb-1 text-gray-700">
                Name
              </label>
              <input
                className="text-sm appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono mb-6"
                id="name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                type="text"
              />
            </>
          )}

          <label className="text-sm font-medium block mb-1 text-gray-700">
            Email
          </label>
          <input
            className="text-sm appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <label className="text-sm font-medium block mb-1 mt-6 text-gray-700">
            Password
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <button
                className="text-sm bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                onClick={() => setHidden(!hidden)}
              >
                {hidden ? "show" : "hide"}
              </button>
            </div>
            <input
              className="text-sm appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 js-password"
              id="password"
              type={hidden ? "password" : "text"}
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              onClick={() => setRemember(!remember)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-6 mr-2"
            />
            <label className="text-sm font-medium block mb-1 mt-7 text-gray-700">
              Remember me
            </label>
          </div>

          <button
            className="text-sm w-full bg-indigo-700 hover:bg-indigo-900 text-white font-medium py-3 px-4 mt-10 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setHidden(true);
              reg
                ? register({
                    variables: {
                      creds: {
                        name: values.name,
                        email: values.email,
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
                  });
            }}
            disabled={logging || registering}
          >
            {logging
              ? "Logging In..."
              : registering
              ? "Registering..."
              : reg
              ? "Sign Up"
              : "Sign in"}
          </button>
        </div>
        {!(logging || registering) && (
          <div className="text-sm text-center">
            <button
              onClick={() => setReg(!reg)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {reg ? "Already have an account?" : "Don't have an account yet?"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
