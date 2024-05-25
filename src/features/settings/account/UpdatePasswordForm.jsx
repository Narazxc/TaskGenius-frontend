import { useForm } from "react-hook-form";
import { useUpdateCurrentUser } from "./useUpdateCurrentUser";

function UpdatePasswordForm() {
  const { isUpdating, updateCurrentUser } = useUpdateCurrentUser();
  const { register, resetField, handleSubmit, formState, getValues, reset } =
    useForm();
  const { errors } = formState;

  // console.log(errors);

  function onSubmit({ passwordCurrent, password, passwordConfirm }) {
    if (!passwordCurrent && !password && !passwordConfirm) return;
    // console.log(
    //   "in onSubmit handler",
    //   passwordCurrent,
    //   password,
    //   passwordConfirm,
    // );

    updateCurrentUser(
      { passwordCurrent, password, passwordConfirm },
      {
        onSuccess: () => {
          resetField("passwordCurrent");
          resetField("password");
          resetField("passwordConfirm");
          reset();
        },
      },
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <header>
            <h2 className="text-2xl font-semibold ">Change your password</h2>
          </header>
          <div>
            <div className="rounded-lg bg-white px-28 py-6">
              <div className="flex items-center border-b border-[#f3f4f6] pb-3">
                <p className="inline-block w-60 flex-none font-semibold">
                  Current password
                </p>
                <input
                  className="border-1 basis-4/6 rounded-md border-[#D1D5DB] shadow-sm"
                  type="password"
                  disabled={isUpdating}
                  placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  {...register("passwordCurrent", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password needs a minimum of 8 characters",
                    },
                  })}
                />

                <div className="basis-3/4">
                  {errors?.passwordCurrent?.message ? (
                    <span className="text-sm text-red-500">
                      {errors.passwordCurrent.message}
                    </span>
                  ) : (
                    ""
                  )}
                  &#x200B;
                </div>
              </div>

              <div className="flex items-center border-b border-[#f3f4f6] py-3">
                <p className="inline-block w-60 flex-none font-semibold">
                  New password
                </p>

                <input
                  className="border-1 basis-4/6 rounded-md border-[#D1D5DB] shadow-sm"
                  type="password"
                  disabled={isUpdating}
                  placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  {...register("password", {
                    required: "This field is required",
                  })}
                />

                <div className="basis-3/4">
                  {errors?.password?.message ? (
                    <span className="text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  ) : (
                    ""
                  )}
                  &#x200B;
                </div>
              </div>

              <div className="flex items-center border-b border-[#f3f4f6] py-3">
                <p className="inline-block w-60 flex-none font-semibold">
                  Confirm password
                </p>
                <input
                  className="border-1 basis-4/6 rounded-md border-[#D1D5DB] shadow-sm"
                  type="password"
                  disabled={isUpdating}
                  placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  {...register("passwordConfirm", {
                    required: "This field is required",
                  })}
                />

                <div className="basis-3/4">
                  {errors?.passwordConfirm?.message ? (
                    <span className="text-sm text-red-500">
                      {errors.passwordConfirm.message}
                    </span>
                  ) : (
                    ""
                  )}
                  &#x200B;
                </div>
              </div>

              <footer>
                <div className="mt-6 flex items-center justify-end gap-x-3">
                  <button
                    type="reset"
                    onClick={reset}
                    disabled={isUpdating}
                    className="text-md rounded-md bg-gray-200 px-5 py-3 font-semibold text-black shadow-sm transition-colors duration-150 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="text-md rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default UpdatePasswordForm;
