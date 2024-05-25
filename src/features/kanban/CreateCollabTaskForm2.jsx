import { useState } from "react";
import { useForm } from "react-hook-form";
import Fuse from "fuse.js";

import Modal from "../../ui/Modal";
import AddMembersInputField from "./AddMembersInputField";
import { useUsersToAddToTask } from "./useUsersToAddToTask";
import { getFormattedDateTime, isObjEmpty } from "../../utils/helpers";
import { useCreateCollabTask } from "./useCreateCollabTask";
import { url } from "../../utils/constants";
import TaskStatusListbox from "../tasks/TaskStatusListbox";
import { useUpdateTask } from "../tasks/useUpdateTask";

function CreateCollabTaskForm2({ onCloseModal, taskToEdit = {} }) {
  const { isCreating, createCollabTask } = useCreateCollabTask();
  const { updateTask, isUpdating } = useUpdateTask();

  const isWorking = isCreating;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isLoading, data } = useUsersToAddToTask();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [taskStatus, setTaskStatus] = useState("");

  // React hook form and edit session
  const { _id: editId, ...editValues } = taskToEdit;
  const isEditSession = Boolean(editId);
  if (isEditSession) {
    editValues.dueDate = getFormattedDateTime(editValues.dueDate);
  }
  const { register, handleSubmit, resetField, formState } = useForm({
    defaultValues: isEditSession
      ? {
          ...editValues,
          taskMembers: [],
        }
      : {},
  });

  // custom register for radio
  const customRegister = (name, options) => {
    const { ref, ...field } = register(name, options);

    const customRef = (...args) => {
      setTimeout(() => ref(...args));
    };

    return { ...field, ref: customRef };
  };

  const { errors } = formState;
  if (!isObjEmpty(errors) && errors?.taskMembers?.message === "") {
    errors.message.taskMembers = "This field is required";
  }

  // Store member into state if edit session
  const [members, setMembers] = useState(
    isEditSession ? editValues.taskMembers : [],
  );
  // console.log("members", members);

  // console.log("task to edit", taskToEdit);

  // console.log(data?.data?.users[0]);
  // console.log(selectedUsers);

  const fuse = new Fuse(data?.data?.users, { keys: [`name`] });

  // Handler functions
  function onSubmit(data) {
    if (isEditSession) {
      data.taskMembers = members;

      if (taskStatus !== "") {
        const status = taskStatus;
        updateTask(
          { newTaskData: { ...data, status }, id: editId },
          { onSuccess: onCloseModal },
        );
      } else {
        updateTask(
          { newTaskData: { ...data }, id: editId },
          { onSuccess: onCloseModal },
        );
      }
      // return null;
    } else {
      const { dueDate, name, priority } = data;
      let { taskMembers } = data;

      // Select only userId from selectedUsers
      taskMembers = selectedUsers.map((user) => user.id);

      const submitData = {
        dueDate,
        name,
        priority,
        taskMembers,
      };

      // console.log("This is submit data", submitData);

      createCollabTask(submitData, { onSuccess: onCloseModal });

      // reset();
      // onCloseModal();
    }

    // console.log(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleAddUsers({ _id: id, name }) {
    // console.log("in handle add users", id, name);

    // Only id property
    // if (selectedUsers.includes(id)) return;
    // setSelectedUsers([...selectedUsers, id]);

    if (isEditSession) {
      if (members.some((user) => user._id === id)) {
        return;
      }

      setMembers([...members, { _id: id, name }]);
    } else {
      // Check if a user with the same 'id' already exists
      if (selectedUsers.some((user) => user.id === id)) {
        return;
      }

      setSelectedUsers([...selectedUsers, { id, name }]);
    }
  }

  function handleSearch(string) {
    setResult(fuse.search(string).slice(0, 5));
  }

  function handleDeleteTag(id) {
    if (isEditSession) {
      const updatedTagList = members.filter((user) => user._id !== id);
      setMembers(updatedTagList);
    } else {
      const updatedTagList = selectedUsers.filter((user) => user.id !== id);
      setSelectedUsers(updatedTagList);
    }
  }

  function handleChangeTaskStatus(taskStatusVal) {
    setTaskStatus(taskStatusVal);
    console.log(taskStatus);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-1 block text-lg font-medium leading-6 text-gray-900"
          >
            Task name
          </label>

          <div className="mb-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
            <input
              type="text"
              id="name"
              disabled={isWorking}
              className="sm:text-md block flex-1 border-0 bg-transparent px-5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6"
              placeholder="Create Plan vs Zombie game"
              {...register("name", { required: "This field is required" })}
            />
          </div>

          {errors?.name?.message && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="mb-1 block text-lg font-medium leading-6 text-gray-900"
          >
            Due date
          </label>
          <div className="mb-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
            <input
              className="sm:text-md block flex-1 border-0  bg-transparent px-5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6"
              // type="date"
              type="datetime-local"
              id="dueDate"
              // min={today}
              disabled={isWorking}
              {...register("dueDate", { required: "This field is required" })}
            />
          </div>

          {errors?.dueDate?.message && (
            <p className="text-sm text-red-500">{errors.dueDate.message}</p>
          )}
        </div>

        <fieldset className="mb-6">
          <legend className="text-lg font-semibold leading-6 text-gray-900">
            Priority
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please select the priority level of this task.
          </p>
          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-x-3">
              <input
                id="high"
                type="radio"
                disabled={isWorking}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                value="high"
                {...customRegister("priority", {
                  required: "This field is required",
                })}
              />
              <label
                htmlFor="high"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                High
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="medium"
                type="radio"
                disabled={isWorking}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                value="medium"
                {...customRegister("priority", {
                  required: "This field is required",
                })}
              />
              <label
                htmlFor="medium"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Medium
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="low"
                type="radio"
                disabled={isWorking}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                value="low"
                {...customRegister("priority", {
                  required: "This field is required",
                })}
              />
              <label
                htmlFor="low"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Low
              </label>
            </div>
          </div>
          {errors?.priority?.message && (
            <p className="text-sm text-red-500">{errors.priority.message}</p>
          )}
        </fieldset>

        {isEditSession && (
          <div className="flex gap-10">
            <label
              htmlFor="name"
              className="mb-1 block text-lg font-medium leading-6 text-gray-900"
            >
              Task status
            </label>
            <TaskStatusListbox
              onChangeTaskStatus={handleChangeTaskStatus}
              taskStatusToEdit={editValues.status}
            />
          </div>
        )}

        <div className="mb-4">
          <AddMembersInputField
            isEditSession={isEditSession}
            membersForEdit={members}
            isOpenModal={isOpenModal}
            setQuery={setQuery}
            query={query}
            selectedUsers={selectedUsers}
            handleDeleteTag={handleDeleteTag} // handleRemoveSelectedUser
            onOpenModal={handleOpenModal}
            isWorking={isWorking}
            register={register}
            handleSearch={handleSearch}
            autoComplete={false}
          />

          {errors?.taskMembers?.message && (
            <p className="text-sm text-red-500">
              {errors?.taskMembers?.message}
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-3">
          <button
            type="reset"
            disabled={isWorking}
            onClick={(e) => {
              e.preventDefault();
              onCloseModal();
            }}
            className="text-md rounded-md bg-gray-200 px-5 py-3 font-semibold text-black shadow-sm transition-colors duration-150 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isWorking}
            className="text-md rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isEditSession ? "Update" : "Create"}
          </button>
        </div>
      </form>

      <Modal
        resetField={resetField}
        query={query}
        isOpenModal={isOpenModal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        isClosable={true}
        bgTransparent={true}
        bgBlur={true}
        setQuery={setQuery}
      >
        <div className="flex h-[600px] flex-col gap-8">
          {/* <input type="text" className="mt-2 w-full rounded-md p-3" /> */}
          <AddMembersInputField
            isEditSession={isEditSession}
            membersForEdit={members}
            isOpenModal={isOpenModal}
            selectedUsers={selectedUsers}
            handleDeleteTag={handleDeleteTag} // handleRemoveSelectedUser
            query={query}
            setQuery={setQuery}
            result={result}
            headerTextWhite={true}
            bgWhite={false}
            onOpenModal={handleOpenModal}
            isWorking={isWorking}
            register={register}
            handleSearch={handleSearch}
          />

          <div className="overflow-y-auto rounded-md bg-white">
            <ul className="grid grid-cols-1 divide-y">
              {result.length !== 0 && !(query === "")
                ? result.map((user) => (
                    <li
                      key={user.item._id}
                      onClick={() => handleAddUsers(user.item)}
                      className="flex cursor-pointer items-center gap-8 rounded-md p-5 transition-colors duration-200 hover:bg-purple-300"
                    >
                      <img
                        className="h-28 w-28 rounded-full"
                        src={`${user.item.photo && url + `${user.item.photo}`}`}
                        alt={`Photo of ${user.item.name}`}
                      />

                      <span>{user.item.name}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>

          {/* <div className="mt-10 rounded-md bg-white p-10"></div> */}
        </div>
      </Modal>
    </>
  );
}

export default CreateCollabTaskForm2;
