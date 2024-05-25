import { useState } from "react";
import { useSignUp } from "./useSignUp";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { isLoading, signUp } = useSignUp();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password || !passwordConfirm) return;
    console.log({ name, email, password, passwordConfirm });

    signUp(
      { name, email, password, passwordConfirm },
      {
        onSettled: () => {
          setName("");
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
        },
      },
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={` ${
                  isLoading ? "bg-gray-200" : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={` ${
                  isLoading ? "bg-gray-200" : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={` ${
                  isLoading ? "bg-gray-200" : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
            </div>
            <div className="">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="current-password"
                required
                className={` ${
                  isLoading ? "bg-gray-200" : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
