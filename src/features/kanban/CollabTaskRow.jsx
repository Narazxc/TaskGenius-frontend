import { useState } from "react";
import Modal from "../../ui/Modal";
import { useDeleteTask } from "../tasks/useDeleteTask";
import CreateCollabTaskForm2 from "./CreateCollabTaskForm2";
import { useUser } from "../authentication/useUser";
import TaskStatusTag from "../tasks/TaskStatusTag";
import PriorityTag from "../../ui/PriorityTag";
import { format } from "date-fns";
import { url } from "../../utils/constants";
import DropDownForTable from "../tasks/DropDownForTable";

export default function CollabTaskRow({ task }) {
  const { isDeleting, deleteTask } = useDeleteTask();
  const { isLoading, user } = useUser();
  const {
    _id: taskId,
    name,
    dueDate,
    creator,
    createdAt,
    priority,
    status,
    taskMembers,
  } = task;

  const {
    data: { data: userData },
  } = user;

  // console.log("user", userData);

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <tr className="grid w-full grid-cols-[1.5fr_110px_100px_1fr_1fr_1fr_1fr_30px] grid-rows-[40px] items-center gap-10 bg-gray-100 px-[24px] py-[12px] last:rounded-b-lg dark:bg-[#0f0f0f]">
        <td className="truncate">{name}</td>
        <td className="">
          <TaskStatusTag statusText={status} />
        </td>
        <td className="">
          <PriorityTag priorityText={priority} />
        </td>
        <td className="text-md flex flex-col justify-center">
          {format(dueDate, "MMMM dd, yyyy")} <br />
          <span className="text-sm text-black/50 dark:text-white/50">
            {format(dueDate, "h:mm a")}
          </span>
        </td>
        <td>
          <div className="ml-[8px] flex">
            {taskMembers.map((member) => (
              <img
                key={member.photo}
                className="ml-[-10px] h-8 w-8 rounded-full shadow-lg"
                src={`${member.photo && url + `${member.photo}`}`}
                alt={`Photo of ${member.name}`}
              />
            ))}
          </div>
        </td>
        <td className="">
          <div className="flex items-center gap-4">
            <img
              className="h-8 w-8 rounded-full"
              src={`${creator.photo && url + `${creator.photo}`}`}
              alt={`Photo of ${creator.name}`}
            />
            <span>{creator?.name}</span>
          </div>
        </td>

        <td className="text-md flex flex-col justify-center">
          {format(createdAt, "MMMM dd, yyyy")} <br />
          <span className="text-sm text-black/50 dark:text-white/50">
            {format(createdAt, "h:mm a")}
          </span>
        </td>
        <td className="">
          <div className="relative flex h-full w-full items-center justify-center">
            <DropDownForTable
              taskCreator={task.creator._id}
              onOpenModal={handleOpenModal}
              onDeleteTask={() => deleteTask(task._id)}
              taskId={task._id}
            />
          </div>

          <Modal
            isOpenModal={isOpenModal}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
          >
            <CreateCollabTaskForm2
              onCloseModal={handleCloseModal}
              taskToEdit={task}
            />
          </Modal>
        </td>
      </tr>
    </>
  );
}

//  <>
// // bg-blue-200
//       <tr className="">
//         <td className="p-4">{name}</td>
//         <td>{dueDate}</td>
//         <td>
//           {creator === userData._id ? (
//             <>
//               <button
//                 onClick={() => deleteTask(taskId)}
//                 className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={
//                   handleOpenModal
//                   // () =>
//                   // setIsOpenModal((isOpenModal) => {
//                   //   // console.log("hello");
//                   //   return !isOpenModal;
//                   // })
//                 }
//                 className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
//               >
//                 Edit
//               </button>
//             </>
//           ) : null}

//           <Modal
//             isOpenModal={isOpenModal}
//             onOpenModal={handleOpenModal}
//             onCloseModal={handleCloseModal}
//           >
//             <CreateCollabTaskForm2
//               onCloseModal={handleCloseModal}
//               taskToEdit={task}
//             />
//           </Modal>
//         </td>
//       </tr>
//     </>
