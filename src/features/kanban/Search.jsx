import { IoClose } from "react-icons/io5";
import { isObjEmpty } from "../../utils/helpers";
import { SyncLoader } from "react-spinners";

export default function Search({
  isWorking,
  taskQuery,
  setTaskQuery,
  register,
  selectedTask,
  handleDeSelectTask,
  isLoadingMyTask,
  handleSearch,
}) {
  const htmlFor = selectedTask ? null : { htmlFor: "taskSearch" };

  function validateSelectedTask(selectedTask) {
    if (isObjEmpty(selectedTask)) {
      return "You must choose a task";
    }
    return undefined; // No error if validation passes
  }

  return (
    <div>
      <label
        {...htmlFor}
        className="mb-1 block text-lg font-medium leading-6 text-gray-900 dark:text-[#e5e7eb]"
      >
        Choose From Existing Task
      </label>

      <div
        className={`${
          !isObjEmpty(selectedTask) ? "p-2" : ""
        } mb-1 flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 dark:bg-dashboard-block dark:ring-gray-300/20 dark:focus-within:ring-indigo-600/50 sm:max-w-full`}
      >
        {isObjEmpty(selectedTask) ? (
          <input
            type="text"
            autoComplete="off"
            id="taskSearch"
            disabled={isWorking}
            className={`sm:text-md block flex-1 border-0 bg-transparent px-5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-[#e5e7eb] sm:leading-6`}
            placeholder="Create Plan vs Zombie game"
            value={taskQuery}
            {...register("taskSearch", {
              // required: "This field is required",
              onChange: (e) => {
                setTaskQuery(e.target.value);
                handleSearch(e.target.value);
              },
              validate: () => validateSelectedTask(selectedTask),
            })}
          />
        ) : (
          <div
            className="flex w-full items-center rounded-md bg-red-200 p-2 hover:cursor-pointer hover:bg-red-400"
            key={selectedTask._id}
          >
            {selectedTask.name}
            <button className="ml-auto" onClick={handleDeSelectTask}>
              <IoClose />
            </button>
          </div>
        )}

        {isLoadingMyTask && (
          <SyncLoader
            className="mr-3"
            color="#5521b5"
            size={8}
            speedMultiplier={0.85}
          />
        )}
      </div>
    </div>
  );
}
