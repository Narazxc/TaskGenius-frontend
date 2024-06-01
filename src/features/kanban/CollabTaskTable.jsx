import { IoAlarmOutline } from "react-icons/io5";
import CollabTaskRow from "./CollabTaskRow";

export default function CollabTaskTable({ isLoading, tasks }) {
  if (isLoading) return <p>Loading...</p>;

  if (tasks.length === 0) return <p>No tasks could be found.</p>;

  // border-gray-100 text-black dark:border-opacity-30

  return (
    <>
      <div className="">
        <table className="w-full rounded-lg border-[0.5px] border-white/20 bg-card-background dark:text-[#efeff1]">
          <thead className=" text-left">
            <tr className="grid w-full grid-cols-[1.5fr_110px_100px_1fr_1fr_1fr_1fr_30px] grid-rows-[40px] items-center gap-10 px-[24px] py-[16px] text-sm uppercase">
              <th className="">Task name</th>
              <th className="">Status</th>
              <th className="">Priority</th>
              <th className="flex items-center gap-2">
                <IoAlarmOutline className="text-2xl text-red-600 dark:text-red-400" />
                <span>Due Date</span>
              </th>
              <th className="">Members</th>
              <th className="">Created by</th>
              <th className="">Created at</th>
              <th className=""></th>
              {/* font-[600] */}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-white/5">
            {tasks &&
              tasks.map((task) => <CollabTaskRow key={task._id} task={task} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}

// return (
//   <table className="table-auto border-collapse  overflow-hidden rounded-xl border-2 border-slate-500 bg-[#374151] text-gray-100 dark:text-white">
//     <thead>
//       <tr className=" border-slate-600">
//         <th className="border border-slate-600 py-3">Task name</th>
//         <th className="border border-slate-600">Due Date</th>
//         <th className="border border-slate-600">Action</th>
//       </tr>
//     </thead>
//     <tbody className="divide-y divide-slate-600">
//       {tasks.map((task) => (
//         <CollabTaskRow key={task._id} task={task} />
//       ))}
//     </tbody>
//   </table>
// );
