import { Link } from "react-router-dom";
import { formatDistanceFromNow } from "../../utils/helpers";

const taskStatusColors = [
  {
    statusText: "on hold",
    textColor: "",
    bgColor: "bg-[#ff6b6b]",
  },
  {
    statusText: "in progress",
    textColor: "",
    bgColor: "bg-[#fcc419] ",
  },
  {
    statusText: "completed",
    textColor: "",
    bgColor: "bg-[#51cf66]",
  },
];

function ActivityItem({ activity }) {
  // console.log(activity);
  // const user = activity?.user?.name;
  // const taskName = activity?.task?.name;
  // const taskStatus = activity?.task?.status;

  const pattern = /^(\w+)\s+update\s+task\s+(.+)\s+status\s+to\s+(.+)$/;
  const match = activity.action.match(pattern);

  let user;
  let taskName;
  let taskStatus;

  if (match) {
    user = match[1];
    taskName = match[2];
    taskStatus = match[3];
  }

  let taskStatusObj;
  if (taskStatus) {
    taskStatusColors.forEach((el) => {
      if (el.statusText.toLowerCase() === taskStatus.toLowerCase())
        taskStatusObj = el;
    });
  }

  // console.log(taskStatusObj);

  return (
    // bg-purple-300
    <div>
      <div className="flex items-center justify-between rounded-md px-4 py-2 text-gray-700 hover:bg-purple-200">
        <div className="flex basis-[450px] flex-col justify-center gap-3 hover:cursor-pointer">
          <p className="leading-8">
            <span className="font-bold">{user}</span> update task{" "}
            <span className="font-bold">{taskName}</span> status to{" "}
            <span
              className={`inline-flex h-6 items-center justify-center rounded-full ${taskStatusObj.bgColor} px-3`}
            >
              {taskStatusObj.statusText}
            </span>
          </p>
          <span className="text-sm">
            {formatDistanceFromNow(activity.createdAt)}
          </span>
        </div>

        <Link
          to={`/tasks/${activity.task._id}`}
          className="rounded-md bg-purple-500 px-4 py-1 text-sm font-[500] text-white"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default ActivityItem;
