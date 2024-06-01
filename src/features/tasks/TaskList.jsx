import { PulseLoader } from "react-spinners";
import TaskItem from "./TaskItem";

function TaskList({ tasks, isLoading }) {
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <PulseLoader color="#4a1d96" speedMultiplier={0.75} size={24} />
      </div>
    );

  if (tasks.length <= 0) return <p>No tasks could be found.</p>;

  return (
    <ul className="flex flex-col gap-5">
      {tasks && tasks.map((task) => <TaskItem task={task} key={task._id} />)}
    </ul>
  );
}

export default TaskList;
