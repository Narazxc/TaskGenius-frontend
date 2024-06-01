import { useDeleteTask } from "./useDeleteTask";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateTaskForm from "./CreateTaskForm";
import { formatDistanceFromNow } from "../../utils/helpers";
import DropDownForTable from "./DropDownForTable";
import { url } from "../../utils/constants";
import { format } from "date-fns";
import TaskStatusTag from "./TaskStatusTag";
import PriorityTag from "../../ui/PriorityTag";

function TaskRow({ task }) {
  const { isDeleting, deleteTask } = useDeleteTask();
  const {
    _id: taskId,
    name,
    dueDate,
    priority,
    status,
    creator,
    createdAt,
  } = task;

  console.log(task);

  const [isOpenModal, setIsOpenModal] = useState(false);
  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  // const date = new Date("2024-05-27T10:30:00"); // Example date
  // const formattedDate = format(date, "M/d/yyyy h:mma"); // 5/28/2024 11:12PM
  // "MMMM dd, yyyy h:mma" May 27, 2024 10:11AM

  // const formattedDate = format(date, "MMMM dd, yyyy");
  // const formattedTime = format(date, "h:mma");

  return (
    // bg-blue-200
    <>
      <tr className="grid w-full grid-cols-[2fr_110px_100px_1fr_1fr_1fr_30px] grid-rows-[40px] items-center gap-10 bg-gray-100 px-[24px] py-[12px] last:rounded-b-lg dark:bg-[#0f0f0f]">
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
            {/* <button
            onClick={() => deleteTask(taskId)}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
          <button
            onClick={() =>
              setIsOpenModal((isOpenModal) => {
                // console.log("hello");
                return !isOpenModal;
              })
            }
            className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Edit
          </button> */}
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
            <CreateTaskForm onCloseModal={handleCloseModal} taskToEdit={task} />
          </Modal>
        </td>
      </tr>
    </>
  );
}

export default TaskRow;
