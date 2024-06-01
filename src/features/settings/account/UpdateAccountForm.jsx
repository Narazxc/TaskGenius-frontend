import { useUpdateCurrentUser } from "./useUpdateCurrentUser";
import { useUser } from "../../authentication/useUser";
import { useState } from "react";

function UpdateAccountForm() {
  const { isLoading, user } = useUser();
  const { isUpdating, updateCurrentUser } = useUpdateCurrentUser();

  const url = "http://localhost:3030/img/users/";

  const { data: { data: userData } = {} } = user;

  const [name, setName] = useState(userData?.name);
  const [photo, setPhoto] = useState(null);

  // const { register, handleSubmit, reset, formState } = useForm();

  // const { errors } = formState;

  // function onSubmit(data) {
  //   updateCurrentUser(data, { onSuccess: reset });
  // }

  // function onError(errors) {
  //   console.log(errors);
  // }

  function handleSubmit(e) {
    e.preventDefault();
    // if (name === userData.name) return;

    if (!name || (name === userData.name && !photo)) return;
    // console.log({ name });
    updateCurrentUser(
      { name, photo },
      {
        onSuccess: () => {
          setPhoto(null);
          e.target.reset();
        },
      },
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-8 flex flex-col gap-4">
          <header>
            <h1 className="text-2xl font-semibold ">Update your account</h1>
          </header>
          <div>
            <div className="border-1 bg-dashboard-block rounded-lg px-28 py-6">
              <div className="flex items-center border-b border-[#f3f4f6] pb-3 dark:border-opacity-10">
                <p className="inline-block w-60 flex-none font-semibold">
                  Email address
                </p>
                <input
                  className="border-1 dark:bg-main-background basis-4/6 cursor-not-allowed rounded-md border-[#D1D5DB] bg-gray-200 shadow-sm dark:border-gray-100/20"
                  type="text"
                  disabled={true}
                  defaultValue={userData?.email}
                />
                <div className="h-1 basis-3/4">&#x200B;</div>
              </div>

              <div className="flex items-center border-b border-[#f3f4f6] py-3 dark:border-opacity-10">
                <p className="inline-block w-60 flex-none font-semibold">
                  Name
                </p>
                {/* w-56 */}
                <input
                  className={`${
                    isUpdating ? "bg-gray-200" : ""
                  } border-1 dark:bg-main-background basis-4/6 rounded-md border-[#D1D5DB] shadow-sm transition-colors duration-300 dark:border-gray-100/20`}
                  type="text"
                  id="name"
                  disabled={isUpdating}
                  // defaultValue={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // {...register("name", { required: "This field is required" })}
                />

                {/* {isLoading && null}
                {!isLoading && <span>{name}</span>} */}

                <div className="basis-3/4">
                  {/* {errors?.name?.message ? (
                    <span className="text-sm text-red-500">
                      {errors.name.message}
                    </span>
                  ) : (
                    ""
                  )} */}
                  &#x200B;
                </div>
              </div>

              <div className="items-center border-b border-[#f3f4f6] py-3 dark:border-opacity-10">
                <div className="my-3 flex h-[42px] items-center">
                  <p className="w-60 flex-none font-semibold">Profile photo</p>
                </div>

                <div className="flex items-center">
                  <div className="min-w-[240px]">
                    <img
                      // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      src={`${userData.photo && url + `${userData.photo}`}`}
                      alt=""
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  </div>
                  {/* #d1d5db */}
                  <input
                    className="dark:bg-main-background basis-4/6 rounded-md border border-[#D1D5DB] shadow-sm dark:border-gray-100/20"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    disabled={isUpdating}
                  />
                  <div className="h-1 basis-3/4">&#x200B;</div>
                </div>
              </div>

              <footer>
                <div className="mt-6 flex items-center justify-end gap-x-3">
                  <button
                    type="reset"
                    onClick={() => {
                      setName(userData?.name);
                    }}
                    className="text-md rounded-md bg-gray-200 px-5 py-3 font-semibold text-black shadow-sm transition-colors duration-150 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
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

export default UpdateAccountForm;
