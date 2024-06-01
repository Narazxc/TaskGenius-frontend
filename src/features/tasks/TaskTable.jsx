import { IoAlarmOutline } from "react-icons/io5";
import TaskRow from "./TaskRow";
import { PulseLoader } from "react-spinners";

function TaskTable({ tasks, isLoading, count }) {
  if (isLoading)
    return (
      <div className="flex items-center justify-center ">
        <PulseLoader color="#4a1d96" speedMultiplier={0.75} size={24} />
      </div>
    );

  if (tasks.length === 0) return <p>No tasks could be found.</p>;

  // border-gray-100 text-black dark:border-opacity-30

  return (
    <>
      <div className="">
        <table className="bg-card-background w-full rounded-lg border-[0.5px] border-white/20 dark:text-[#efeff1]">
          <thead className=" text-left">
            <tr className="grid w-full grid-cols-[2fr_110px_100px_1fr_1fr_1fr_30px] grid-rows-[40px] items-center gap-10 px-[24px] py-[16px] text-sm uppercase">
              <th className="">Task name</th>
              <th className="">Status</th>
              <th className="">Priority</th>
              <th className="flex items-center gap-2">
                <IoAlarmOutline className="text-2xl text-red-600 dark:text-red-400" />
                <span>Due Date</span>
              </th>
              <th className="">Created by</th>
              <th className="">Created at</th>
              <th className=""></th>
              {/* font-[600] */}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-white/5">
            {tasks &&
              tasks.map((task) => <TaskRow key={task._id} task={task} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TaskTable;
