import TaskRow from "./TaskRow";
import { PulseLoader } from "react-spinners";

function TaskTable({ tasks, isLoading, count }) {
  if (isLoading)
    return (
      <div className="flex items-center justify-center ">
        <PulseLoader color="#4a1d96" speedMultiplier={0.75} size={24} />
      </div>
    );

  return (
    <>
      <table className="table-auto border-collapse  overflow-hidden rounded-xl border-2 border-slate-500 bg-[#374151] text-gray-100 dark:text-white">
        <thead>
          <tr className=" border-slate-600">
            <th className="border border-slate-600 py-3">Task name</th>
            <th className="border border-slate-600">Due Date</th>
            <th className="border border-slate-600">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600">
          {tasks && tasks.map((task) => <TaskRow key={task._id} task={task} />)}
        </tbody>
      </table>
    </>
  );
}

export default TaskTable;
