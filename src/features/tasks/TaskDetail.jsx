import {
  IoAlarmOutline,
  IoCheckmarkDoneOutline,
  IoHourglassOutline,
} from "react-icons/io5";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useTask } from "./useTask";
import { formatDistanceFromNow } from "../../utils/helpers";
// import { url } from "../../utils/constants";  use cloundinary instead
import { useUpdateTask } from "./useUpdateTask";
import { format } from "date-fns";
import { memo, useEffect, useState } from "react";

function TaskDetail() {
  const moveBack = useMoveBack();
  const { isLoading, task, error } = useTask();
  const { isUpdating, updateTask } = useUpdateTask();

  // console.log(task);

  const [currDate, setCurrDate] = useState(new Date());

  function handleUpdateStatus(data) {
    updateTask({ newTaskData: { ...data }, id: task._id });
  }

  // const isWorking = isLoading || isUpdating;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrDate(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p className="text-xl">No task could be found.</p>;

  const formattedDueDate = format(
    new Date(task.dueDate),
    "EEEE, dd MMMM, yyyy hh:mm a",
  );

  const formattedDate1 = format(task.dueDate, "dd-MM-yyyy");

  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  const formattedDate2 = format(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    "dd-MM-yyyy",
  );

  const now = new Date();
  const nowInMs = now.getTime();
  const dueDate = new Date(task.dueDate);
  const dueDateInMs = dueDate.getTime();
  const statusCheck = `${nowInMs > dueDateInMs ? "Pass due" : "Due "}`;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Task &quot;{task.name}&quot;</h2>

        <button
          onClick={moveBack}
          className="rounded-m flex items-center self-center border-b  border-purple-600 text-purple-600 hover:border-0"
        >
          &larr; Go back
        </button>
      </div>

      <div className="grid h-[500px] grid-cols-4 gap-10">
        <div
          className={`${
            task.taskMembers.length <= 0 ? "col-span-4" : "col-span-3"
          } relative flex flex-col gap-4 overflow-hidden rounded-md bg-dashboard-block px-4 py-4`}
        >
          {/* bg-red-200 */}
          <div className="flex items-center gap-4">
            <p className="text-nowrap flex-1 text-xl">{task.name}</p>

            <p className="absolute right-3 top-3 text-sm text-gray-400">
              Created <span>{formatDistanceFromNow(task.createdAt)}</span>
            </p>
          </div>
          <div className="gap grid grid-cols-[auto_1fr] items-center gap-x-10 gap-y-3">
            {/* <p>Task</p>
            <div>{task.name}</div> */}

            <p>priority</p>
            <div>{task.priority}</div>

            <p>Task Status</p>
            <div>{task.status}</div>

            <div className="flex gap-2 rounded-md bg-red-300/20 p-2">
              <IoAlarmOutline className="text-2xl text-red-600" />
              <p className="text-red-600">Due date</p>
            </div>
            <div>{formattedDueDate}</div>

            <p>Current date</p>
            {/* <div>{format(currDate, "EEEE, dd MMMM, yyyy hh:mm a")}</div> */}
            <CurrentDate currDate={currDate} />

            <p>Due in</p>
            <div className="flex items-center gap-2">
              <IoHourglassOutline className="text-2xl" />
              <span
                className={`${
                  formattedDate1 === formattedDate2 ? "text-red-500" : ""
                } text-lg`}
              >
                {formattedDate1 === formattedDate2 ? "Today " : ""}
              </span>
              {`${statusCheck} ${formatDistanceFromNow(task.dueDate)}`}
            </div>
          </div>

          <div className="mt-auto border-t border-white pt-4 dark:border-opacity-20">
            {task.status === "completed" ? (
              <div className="w-52 cursor-not-allowed rounded-md bg-gray-100 px-4 py-2 text-center text-black dark:bg-gray-400/50 dark:text-[#efeff1]">
                <p>Completed</p>
              </div>
            ) : (
              <button
                disabled={isUpdating}
                onClick={() => {
                  handleUpdateStatus({ status: "completed" });
                }}
                className={`flex w-52 ${
                  isUpdating ? "bg-slate-400" : ""
                }  items-center justify-center gap-2 rounded-md bg-lime-600 px-4 py-2 text-white hover:bg-lime-500 active:bg-lime-700`}
              >
                <IoCheckmarkDoneOutline className="text-2xl" />
                <span>Mark as completed</span>
              </button>
            )}
          </div>
        </div>

        {task.taskMembers.length <= 0 ? null : (
          <aside className="col-span-1 rounded-md bg-dashboard-block">
            {/* bg-blue-200 */}
            <div className="flex flex-col gap-3 px-4 py-4">
              <div>
                <h2 className="text-lg font-[500]">Creator</h2>
                <div className="flex items-center gap-3">
                  <img
                    className="h-9 w-9 rounded-full"
                    // src={`${
                    //   task.creator.photo && url + `${task.creator.photo}`
                    // }`}
                    src={task.creator.cloudinaryPhoto}
                    alt={`Photo of ${task.creator.name}`}
                  />
                  <p>{task.creator.name}</p>
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-lg font-[500]">Members</h2>

                <ul className="flex flex-col gap-2">
                  {task &&
                    task.taskMembers.map((member) => (
                      <li
                        key={member._id}
                        className="flex items-center gap-3 rounded-md"
                      >
                        <img
                          className="h-9 w-9 rounded-full"
                          // src={`${member.photo && url + `${member.photo}`}`}
                          src={member.cloudinaryPhoto}
                          alt={`Photo of ${member.name}`}
                        />
                        <p>{member.name}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

export default TaskDetail;

const CurrentDate = memo(({ currDate }) => (
  <div>{format(currDate, "EEEE, dd MMMM, yyyy hh:mm a")}</div>
));

CurrentDate.displayName = "CurrentDate";
