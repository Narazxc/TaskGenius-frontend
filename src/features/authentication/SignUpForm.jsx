import { useState } from "react";
import { useSignUp } from "./useSignUp";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function SignUpForm() {
  const { isLoading, signUp } = useSignUp();
  // Manually handle form state
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] =
    useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  // function onError(errors) {
  //   console.log(errors);
  // }

  // Using react hook form
  function onSubmit(data) {
    const { name, email, password, passwordConfirm } = data;
    if (!name || !email || !password || !passwordConfirm) return;

    console.log(data);

    signUp(
      { name, email, password, passwordConfirm },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  }

  // Manually handle submission
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   if (!name || !email || !password || !passwordConfirm) return;
  //   console.log({ name, email, password, passwordConfirm });

  //   signUp(
  //     { name, email, password, passwordConfirm },
  //     {
  //       onSettled: () => {
  //         setName("");
  //         setEmail("");
  //         setPassword("");
  //         setPasswordConfirm("");
  //       },
  //     },
  //   );
  // }

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
        <form
          className="space-y-4"
          // onSubmit={handleSubmit}
          onSubmit={handleSubmit(onSubmit)}
        >
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
                // name="name"
                type="text"
                autoComplete="name"
                className={` ${
                  isLoading ? "bg-gray-200" : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                // value={name}
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                {...register("name", {
                  required: "This field is required",
                })}
                disabled={isLoading}
              />

              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
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
                // name="email"
                type="email"
                autoComplete="email"
                className={` ${
                  isLoading ? "bg-gray-200" : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                // value={email}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                disabled={isLoading}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
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
            {/* <div className="">
              <input
                id="password"
                // name="password"
                type="password"
                autoComplete="off"
                className={` ${
                  isLoading ? "bg-gray-200" : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Minimum length is 8 characters",
                  },
                })}
                disabled={isLoading}
              />

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div> */}
            <div>
              <div
                className={`mt-2 flex justify-between  ${
                  isLoading ? "bg-gray-200" : "bg-white"
                } block w-full overflow-hidden rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 placeholder:text-gray-400 ${
                  isFocused ? "ring-2 ring-inset ring-indigo-600" : ""
                } sm:text-sm sm:leading-6`}
              >
                <input
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  aria-label="Password"
                  autoComplete="off"
                  onFocus={() => setIsFocused(true)}
                  // onBlur={() => setIsFocused(false)}
                  className={`h-[24px] flex-1 border-none bg-transparent p-0 focus:ring-0 sm:text-sm sm:leading-6`}
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Minimum length is 8 characters",
                    },
                    // onFocus: () => setIsFocused(true),
                    onBlur: () => setIsFocused(false),
                  })}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsShowPassword((isShowPassword) => !isShowPassword)
                  }
                >
                  {isShowPassword ? (
                    <IoEyeOffOutline className="text-lg" />
                  ) : (
                    <IoEyeOutline className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
            </div>
            {/* <div className="">
              <input
                id="passwordConfirm"
                // name="passwordConfirm"
                type="password"
                autoComplete="off"
                className={` ${
                  isLoading ? "bg-gray-200" : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                // value={passwordConfirm}
                // onChange={(e) => {
                //   setPasswordConfirm(e.target.value);
                // }}
                {...register("passwordConfirm", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password || "Password need to match",
                })}
                disabled={isLoading}
              />

              {errors.passwordConfirm && (
                <span className="text-sm text-red-500">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </div> */}

            <div>
              <div
                className={`mt-2 flex justify-between  ${
                  isLoading ? "bg-gray-200" : "bg-white"
                } block w-full overflow-hidden rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 placeholder:text-gray-400 ${
                  isFocusedPasswordConfirm
                    ? "ring-2 ring-inset ring-indigo-600"
                    : ""
                } sm:text-sm sm:leading-6`}
              >
                <input
                  id="passwordConfirm"
                  type={isShowPasswordConfirm ? "text" : "password"}
                  aria-label="Confirm Password"
                  autoComplete="off"
                  onFocus={() => setIsFocusedPasswordConfirm(true)}
                  // onBlur={() => setIsFocusedPasswordConfirm(false)}
                  className={`h-[24px] flex-1 border-none bg-transparent p-0 focus:ring-0 sm:text-sm sm:leading-6`}
                  {...register("passwordConfirm", {
                    required: "This field is required",
                    validate: (value) =>
                      value === getValues().password ||
                      "Password need to match",
                    // onFocus: () => setIsFocused(true),
                    onBlur: () => setIsFocusedPasswordConfirm(false),
                  })}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsShowPasswordConfirm(
                      (isShowPasswordConfirm) => !isShowPasswordConfirm,
                    )
                  }
                >
                  {isShowPasswordConfirm ? (
                    <IoEyeOffOutline className="text-lg" />
                  ) : (
                    <IoEyeOutline className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            {errors.passwordConfirm && (
              <span className="text-sm text-red-500">
                {errors.passwordConfirm.message}
              </span>
            )}
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

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
