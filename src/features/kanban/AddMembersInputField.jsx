// eslint-disable-next-line react/display-name

import React from "react";
import { UserTag } from "./UserTag";

const AddMembersInputField = React.forwardRef(function AddMembersInputField(
  {
    isEditSession,
    membersForEdit,
    isOpenModal,
    selectedUsers: users,
    register,
    query,
    setQuery,
    handleSearch,
    headerTextWhite,
    bgWhite,
    onOpenModal,
    isWorking,
    handleDeleteTag,
    autoComplete,
  },
  ref,
) {
  let userToRender;
  if (isEditSession && membersForEdit.length > 0) {
    userToRender = membersForEdit;
  } else {
    userToRender = users;
  }

  const validateUsers = (userToRender) => {
    if (userToRender && userToRender.length <= 0) {
      return "You must select at least one member.";
    }
    return undefined; // No error if validation passes
  };

  // console.log("user to render", userToRender[1]._id);
  userToRender.map((u) => console.log(u._id));

  return (
    <div>
      <label
        htmlFor="searchUser"
        className={`mb-1 block text-lg font-medium leading-6 ${
          headerTextWhite ? "text-xl text-white" : ""
        } text-gray-900 `}
      >
        Add members
      </label>

      <div className="mb-1 rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
        {/* Render selected user */}
        <div className="flex items-center gap-1 px-2">
          {userToRender &&
            userToRender.length !== 0 &&
            userToRender.map((u) => (
              <UserTag
                userId={isEditSession ? u._id : u.id}
                key={
                  isEditSession
                    ? u._id // Use _id if in edit session
                    : u.id // Use id otherwise
                }
                name={u.name}
                onDeleteTag={handleDeleteTag}
              />
            ))}

          <input
            ref={ref}
            onClick={() => {
              onOpenModal();
            }}
            onFocus={(e) => {
              !isOpenModal ? e.target.blur() : e.target.focus();
            }}
            // defaultValue={isEditSession ? null : null}
            type="text"
            id="searchUser"
            autoComplete={`${autoComplete ? "on" : "off"}`}
            value={query}
            // onChange={(e) => {
            //   setQuery(e.target.value);
            //   handleSearch(e.target.value);
            //   // console.log(e.target.value);
            // }}
            className={`sm:text-md inline-block flex-1 rounded-md border-0 bg-transparent px-5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6 ${
              bgWhite ? "bg-white" : ""
            }`}
            placeholder="John Smith"
            {...register("taskMembers", {
              onChange: (e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              },
              validate: () => validateUsers(userToRender),
            })}
          />
        </div>
      </div>
    </div>
  );
});

// AddMembersInputField.displayName = "AddMembersInputField";
export default AddMembersInputField;

// export const AddMembersInputFieldRef = forwardRef(AddMembersInputField);
