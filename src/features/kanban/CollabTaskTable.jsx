import CollabTaskRow from "./CollabTaskRow";

export default function CollabTaskTable({ isLoading, tasks }) {
  if (isLoading) return <p>Loading...</p>;

  return (
    <table className="table-auto border-collapse  overflow-hidden rounded-xl border-2 border-slate-500 bg-[#374151] text-gray-100 dark:text-white">
      <thead>
        <tr className=" border-slate-600">
          <th className="border border-slate-600 py-3">Task name</th>
          <th className="border border-slate-600">Due Date</th>
          <th className="border border-slate-600">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-600">
        {tasks.map((task) => (
          <CollabTaskRow key={task._id} task={task} />
        ))}
      </tbody>
    </table>
  );
}
