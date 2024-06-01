import TaskPriorityPieChart from "./TaskPriorityPieChart";
import TaskStatusPieChart from "./TaskStatusPieChart";
import { useTasks } from "../tasks/useTasks";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkDoneCircleOutline,
  IoCheckmarkDoneOutline,
  IoLayersOutline,
  IoPauseOutline,
  IoReaderOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import TaskCountCard from "./TaskCountCard";
import { countTasksByStatus } from "../../utils/helpers";
import { useState } from "react";
// import { useActivties } from "./useActivities";
import { useActivitiesForMembersOrCreator } from "./useActivitiesForMembersOrCreator";
import useCollabTasks from "../kanban/useCollabTasks";
import ActivityList from "../activities/ActivityList";
import ActivityItem from "../activities/ActivityItem";

let tasksData = [
  {
    taskCount: 0,
    text: "Total tasks",
    iconBgColor: `bg-[#fdddd3]`, // #7d5548
    icon: <IoLayersOutline className="text-4xl text-[#faa990]" />,
  },

  {
    taskCount: 0,
    text: `To do`,
    iconBgColor: `bg-[#f7bfd0]`, // 753045
    icon: <IoReaderOutline className="text-4xl text-[#EA5F89]" />,
  },

  {
    taskCount: 0,
    text: `In progress`,
    iconBgColor: `bg-[#d7add3]`, // 4e1949
    icon: <IoTrendingUpOutline className="text-4xl text-[#9B3192]" />,
  },

  {
    taskCount: 0,
    text: `On hold`,
    iconBgColor: `bg-[#bca2cb]`, // 2c0b3f
    icon: <IoPauseOutline className="text-4xl text-[#57167E]" />,
  },
  {
    taskCount: 0,
    text: `Completed`,
    iconBgColor: `bg-[#d6eedc]`, // 195429
    // text-[#2B0B3F]
    icon: (
      <IoCheckmarkDoneOutline className="text-4xl  text-[#2d974a] " />
      // text-lime-400
    ),
  },
];

export default function DashboardLayout() {
  const { isLoading: isLoadingTask, tasks } = useTasks();
  const { isLoading: isLoadingCollabTask, tasks: collabTasks } =
    useCollabTasks();
  const [viewCollabTask, setViewCollabTask] = useState(false);
  const { isLoading: isLoadingActivities, activities } =
    useActivitiesForMembersOrCreator();
  // const [taskData, setTaskData] = useState(tasks);

  const isWorking = isLoadingTask || isLoadingActivities || isLoadingCollabTask;

  if (isWorking) return <p>Loading....</p>;

  // console.log(activities);
  // console.log(collabTasks);

  let updatedTasksData = [];
  let taskData = tasks || [];
  if (viewCollabTask) {
    taskData = collabTasks;
  }

  if (!isWorking) {
    updatedTasksData = tasksData.map((item, index) => {
      if (index === 0) {
        const count = countTasksByStatus(taskData);
        return { ...item, taskCount: count };
      }

      const count = countTasksByStatus(taskData, item.text.toLowerCase()); // Access full data
      return { ...item, taskCount: count }; // Spread operator for immutability
    });
  }

  return (
    <>
      <button
        className="rounded-md bg-purple-600 px-3 py-1 text-white"
        onClick={() => setViewCollabTask((viewCollabTask) => !viewCollabTask)}
      >
        View Collab task summary
      </button>
      <div
        className={`grid grid-cols-10 ${
          viewCollabTask ? "grid-rows-5" : "grid-rows-3"
        }  gap-x-8 gap-y-8 dark:text-white`}
      >
        {updatedTasksData.length > 0 &&
          updatedTasksData.map((item) => (
            <TaskCountCard
              isCollabTaskMode={viewCollabTask}
              key={item.text}
              taskCount={item.taskCount}
              text={item.text}
              iconBgColor={item.iconBgColor}
              icon={item.icon}
            />
          ))}
        {/* bg-gray-300 */}
        {viewCollabTask ? (
          <div className="bg-dashboard-block col-span-5 row-span-4 overflow-hidden rounded-md">
            <div className="flex h-full flex-col gap-6 p-8">
              <h2 className="text-2xl font-[600]">Collab Task Activities</h2>

              <ActivityList>
                {activities &&
                  activities.map((a) => (
                    <ActivityItem key={a._id} activity={a} />
                  ))}
              </ActivityList>
            </div>
          </div>
        ) : null}
        <div className={`bg-dashboard-block col-span-5  row-span-2 rounded-md`}>
          <TaskPriorityPieChart tasks={taskData} isLoading={isLoadingTask} />
        </div>
        {/* ${viewCollabTask ? "row-span-2" : ""} */}
        <div className={`bg-dashboard-block col-span-5  row-span-2 rounded-md`}>
          <TaskStatusPieChart tasks={taskData} isLoading={isLoadingTask} />
        </div>
      </div>
    </>
  );
}
