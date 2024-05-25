import CollabTaskItem from "./CollabTaskItem";

function CollabTaskList({ isLoading, tasks }) {
  // console.log(tasks);

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <ul className="flex flex-col gap-5">
      {tasks &&
        tasks.map((task) => <CollabTaskItem task={task} key={task._id} />)}
    </ul>
  );
}

export default CollabTaskList;
