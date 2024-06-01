// import Datepicker from "react-tailwindcss-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTask } from "./useCreateTask";
import { useUpdateTask } from "./useUpdateTask";
import { getFormattedDateTime } from "../../utils/helpers";
import TaskStatusListbox from "./TaskStatusListbox";

function CreateTaskForm({ onCloseModal, taskToEdit = {} }) {
  const { createTask, isCreating } = useCreateTask();
  const { updateTask, isUpdating } = useUpdateTask();
  const isWorking = isCreating || isUpdating;
  const [taskStatus, setTaskStatus] = useState("");

  const { _id: editId, ...editValues } = taskToEdit;
  const isEditSession = Boolean(editId);

  if (isEditSession) {
    editValues.dueDate = getFormattedDateTime(editValues.dueDate);
  }

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // for radio
  const customRegister = (name, options) => {
    const { ref, ...field } = register(name, options);

    const customRef = (...args) => {
      setTimeout(() => ref(...args));
    };

    return { ...field, ref: customRef };
  };

  function onSubmit(data) {
    if (isEditSession) {
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
    } else {
      createTask(data, { onSuccess: onCloseModal });
    }

    // console.log(data);
  }

  function resetFormAndCloseModal() {
    reset();
    onCloseModal();
  }

  function onError(errors) {
    // console.log(errors);
  }

  function handleChangeTaskStatus(taskStatusVal) {
    setTaskStatus(taskStatusVal);
    // console.log(taskStatus);
  }

  // const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-1 block text-lg font-medium leading-6 text-gray-900 dark:text-[#e5e7eb]"
        >
          Task name
        </label>

        <div className="mb-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 dark:ring-gray-300/20 dark:focus-within:ring-indigo-600/50 sm:max-w-full">
          <input
            type="text"
            id="name"
            disabled={isWorking}
            className="sm:text-md block flex-1 border-0 bg-transparent px-5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0  dark:text-[#e5e7eb] sm:leading-6"
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
          className="mb-1 block text-lg font-medium leading-6 text-gray-900 dark:text-[#e5e7eb]"
        >
          Due date
        </label>
        <div className="mb-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 dark:ring-gray-300/20 dark:focus-within:ring-indigo-600/50 sm:max-w-full">
          <input
            className="sm:text-md block flex-1 border-0 bg-transparent px-5  py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-[#e5e7eb] dark:[color-scheme:dark] sm:leading-6"
            type="datetime-local"
            // type="date"
            id="dueDate"
            // min={today}
            disabled={isWorking}
            {...register("dueDate", { required: "This field is required" })}
          />
          {/* <DatePicker
            {...register("dueDate", { required: "This field is required" })}
            minDate={today}
            placeholderText="Select a day"
          /> */}
        </div>

        {errors?.dueDate?.message && (
          <p className="text-sm text-red-500">{errors.dueDate.message}</p>
        )}
      </div>

      <fieldset className="mb-6">
        <legend className="text-lg font-semibold leading-6 text-gray-900 dark:text-[#e5e7eb]">
          Priority
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200/40">
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
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-[#e5e7eb]"
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
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-[#e5e7eb]"
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
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-[#e5e7eb]"
            >
              Low
            </label>
          </div>

          {errors?.priority?.message && (
            <p className="text-sm text-red-500">{errors.priority.message}</p>
          )}
        </div>
      </fieldset>

      {/* <div>
        <input type="radio" {...customRegister("test")} id="one" value="one" />
        <input type="radio" {...customRegister("test")} id="two" value="two" />
        <input
          type="radio"
          {...customRegister("test")}
          id="three"
          value="three"
        />
      </div> */}
      {isEditSession && (
        <div className="flex gap-10">
          <label
            htmlFor="name"
            className="mb-1 block text-lg font-medium leading-6 text-gray-900 dark:text-[#e5e7eb]"
          >
            Task status
          </label>
          <TaskStatusListbox
            onChangeTaskStatus={handleChangeTaskStatus}
            taskStatusToEdit={editValues.status}
          />
        </div>
      )}

      <div className="mt-6 flex items-center justify-end gap-x-3">
        <button
          type="reset"
          disabled={isWorking}
          onClick={(e) => {
            e.preventDefault();
            onCloseModal();
          }}
          // text-sm font-semibold leading-6 text-gray-900
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
  );
}

export default CreateTaskForm;
