import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import { useCreateTask } from "../tasks/useCreateTask";
import { useUpdateTask } from "../tasks/useUpdateTask";
import Search from "./Search";
import { getFormattedDate, isObjEmpty } from "../../utils/helpers";
import { useMyTasks } from "./useMyTask";
import Fuse from "fuse.js";
import { useTasks } from "../tasks/useTasks";
import { useMyTaskReactQuery } from "./useMyTaskReactQuery";
import AddMembersInputField from "./AddMembersInputField";
import Modal from "../../ui/Modal";
import { useUsersToAddToTask } from "./useUsersToAddToTask";
import { useEffect } from "react";
import { url } from "../../utils/constants";

function CreateCollabTaskForm({ onCloseModal, taskToEdit = {} }) {
  // const { createTask, isCreating } = useCreateTask();
  const { updateTask, isUpdating } = useUpdateTask();
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const isWorking = isCreating || isUpdating;
  const isWorking = isUpdating;

  const { tasks, isLoading } = useTasks();
  const [taskQuery, setTaskQuery] = useState("");
  const [taskResult, setTaskResult] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  // console.log(selectedTask);

  const { isLoading: isLoadingUsers, data } = useUsersToAddToTask();
  const [userQuery, setUserQuery] = useState("");
  const [userResult, setUserResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  // console.log(selectedUsers);

  // const { isLoading: isLoadingMyTask, myTasks, error } = useMyTasks(taskQuery);
  // const { task, isLoading } = useMyTaskReactQuery();

  const { _id: editId, ...editValues } = taskToEdit;
  const isEditSession = Boolean(editId);

  if (isEditSession) {
    editValues.dueDate = getFormattedDate(editValues.dueDate);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    clearErrors,
    resetField,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  useEffect(() => {
    if (!isObjEmpty(selectedTask)) {
      clearErrors("taskSearch");
    }
  }, [selectedTask, clearErrors]);

  function onSubmit() {
    const { _id: id } = selectedTask;
    let taskMembers;

    // Select only userId from selectedUsers
    taskMembers = selectedUsers.map((user) => user.id);

    // console.log({ newTaskData: { ...selectedTask, taskMembers }, id });
    updateTask({ newTaskData: { ...selectedTask, taskMembers }, id });
    // console.log("This is submit data", submitData);

    // createCollabTask(submitData);

    reset();
    onCloseModal();
  }

  function onError(errors) {
    console.log(errors);
  }

  function handleDeSelectTask() {
    setSelectedTask({});
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  const fuseTask = new Fuse(tasks, { keys: [`name`] });
  const fuseUser = new Fuse(data?.data?.users, { keys: [`name`] });

  function handleSearchTasks(string) {
    setTaskResult(fuseTask.search(string).slice(0, 5));
  }

  function handleSearchUsers(string) {
    setUserResult(fuseUser.search(string).slice(0, 5));
  }

  function handleDeleteTag(id) {
    const updatedTagList = selectedUsers.filter((user) => user.id !== id);
    setSelectedUsers(updatedTagList);
  }

  function handleAddUsers({ _id: id, name }) {
    if (selectedUsers.some((user) => user.id === id)) return;

    setSelectedUsers([...selectedUsers, { id, name }]);
  }

  if (isLoading) return <p>Loading...</p>;

  const firstFiveTasks = tasks?.slice(0, 5);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="mb-4">
        <Search
          isWorking={isWorking}
          taskQuery={taskQuery}
          register={register}
          setTaskQuery={setTaskQuery}
          selectedTask={selectedTask}
          handleDeSelectTask={handleDeSelectTask}
          // isLoadingMyTask={isLoadingMyTask}
          handleSearch={handleSearchTasks}
        />

        {errors?.taskSearch?.message && (
          <p className="text-sm text-red-500">{errors.taskSearch.message}</p>
        )}
      </div>

      {tasks && isObjEmpty(selectedTask) ? (
        <ul>
          {taskResult && !(taskQuery === "")
            ? taskResult.map((task) => (
                <li
                  key={task.item._id}
                  onClick={() => setSelectedTask(task.item)}
                  className="mb-2 rounded-md bg-red-200 p-2 hover:cursor-pointer hover:bg-red-400"
                >
                  {task.item.name}
                </li>
              ))
            : firstFiveTasks.map((task) => (
                <li
                  key={task._id}
                  onClick={() => setSelectedTask(task)}
                  className="mb-2 rounded-md bg-red-200 p-2 hover:cursor-pointer hover:bg-red-400"
                >
                  {task.name}
                </li>
              ))}
        </ul>
      ) : null}

      {!isObjEmpty(selectedTask) && (
        <div>
          <AddMembersInputField
            errors={errors}
            isOpenModal={isOpenModal}
            setQuery={setUserQuery}
            query={userQuery}
            selectedUsers={selectedUsers}
            handleDeleteTag={handleDeleteTag} // handleRemoveSelectedUser
            onOpenModal={handleOpenModal}
            isWorking={isWorking}
            register={register}
            handleSearch={handleSearchUsers}
            autoComplete={false}
          />

          {errors?.taskMembers?.message && (
            <p className="text-sm text-red-500">{errors.taskMembers.message}</p>
          )}
        </div>
      )}

      <Modal
        resetField={resetField}
        isOpenModal={isOpenModal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        isClosable={true}
        bgTransparent={true}
        bgBlur={true}
        setQuery={setUserQuery}
      >
        <div className="flex h-[600px] flex-col gap-8">
          {/* <input type="text" className="mt-2 w-full rounded-md p-3" /> */}
          <AddMembersInputField
            errors={errors}
            isOpenModal={isOpenModal}
            selectedUsers={selectedUsers}
            handleDeleteTag={handleDeleteTag} // handleRemoveSelectedUser
            query={userQuery}
            setQuery={setUserQuery}
            result={userResult}
            headerTextWhite={true}
            bgWhite={false}
            onOpenModal={handleOpenModal}
            isWorking={isWorking}
            register={register}
            handleSearch={handleSearchUsers}
          />

          <div className="overflow-y-auto rounded-md bg-white">
            <ul className="grid grid-cols-1 divide-y">
              {userResult.length !== 0 && !(userQuery === "")
                ? userResult.map((user) => (
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
        </div>
      </Modal>

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
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateCollabTaskForm;
