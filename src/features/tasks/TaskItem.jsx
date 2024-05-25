import { format } from "date-fns";
import { formatDistanceFromNow } from "../../utils/helpers";
import PriorityTag from "../../ui/PriorityTag";
import TaskStatusTag from "./TaskStatusTag";
import DropDown from "../../ui/DropDown";
import Modal from "../../ui/Modal";
import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import { useDeleteTask } from "./useDeleteTask";
import { IoAlarmOutline, IoHourglassOutline } from "react-icons/io5";

function TaskItem({ task }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isDeleting, deleteTask } = useDeleteTask();

  function handleOpenModal() {
    console.log("open");
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  // const currentDate = new Date();
  // console.log(parseISO(task.dueDate), currentDate);

  // console.log(formatDistance(new Date(task.dueDate), new Date()));
  // console.log("a", new Date(task.dueDate));

  const formattedDate1 = format(task.dueDate, "dd-MM-yyyy");
  // console.log("formattedDate1", formattedDate1);

  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  // console.log(today);

  const formattedDate2 = format(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    "dd-MM-yyyy",
  );
  // console.log("formattedDate2", formattedDate2);

  const inputDateString = task.dueDate;

  // Parse the string to a Date object
  const dateObject = new Date(inputDateString);

  // Format as "dd-MM-yyyy-HH-mm"
  // const formattedDate = format(dateObject, "dd-MMMM-yyyy hh:mm a");
  const formattedDate = format(
    new Date(task.dueDate),
    "EEEE, dd MMMM, yyyy hh:mm a",
  );

  const now = new Date();
  const nowInMs = now.getTime();
  const dueDate = new Date(task.dueDate);
  const dueDateInMs = dueDate.getTime();
  const statusCheck = `${nowInMs > dueDateInMs ? "Pass due" : "Due "}`;

  const createAtDate = format(new Date(task.createdAt), "EEEE, dd MMMM, yyyy");

  return (
    <>
      <li className="relative h-60 rounded-lg border-l-[6px] border-solid border-gray-300 bg-gray-300 p-10 pl-[34px] shadow-sm hover:border-l-[6px] hover:border-solid hover:border-indigo-500">
        <div className="grid grid-cols-2 items-center gap-y-2.5">
          <p className="text-xl font-[600]">{task.name}</p>
          <div className="flex gap-4">
            <span>Priority:</span> <PriorityTag priorityText={task.priority} />
          </div>
          <div className="flex items-center gap-2">
            <IoHourglassOutline className="text-2xl" />
            <span
              className={`${
                formattedDate1 === formattedDate2 ? "text-red-500" : ""
              } text-lg`}
            >
              {formattedDate1 === formattedDate2 ? "Today " : ""}
            </span>
            {`${statusCheck} ${formatDistanceFromNow(task.dueDate)}`}
          </div>
          <div className="flex gap-4">
            <span>Status:</span>
            <TaskStatusTag statusText={task.status} />
          </div>

          <div className="flex gap-4">
            <IoAlarmOutline className="text-2xl text-red-600" />
            {/* Due Date: */}
            <span>{formattedDate}</span>
          </div>

          {/* {message} */}

          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>

          <div>{formatDistanceFromNow(task.createdAt)}</div>
        </div>
        <DropDown
          taskCreator={task.creator}
          onOpenModal={handleOpenModal}
          onDeleteTask={() => deleteTask(task._id)}
          taskId={task._id}
        />
      </li>
      <Modal
        isOpenModal={isOpenModal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
      >
        <CreateTaskForm onCloseModal={handleCloseModal} taskToEdit={task} />
      </Modal>
    </>
  );
}

{
  /* <div>
        {isToday(dueDate)
          ? "Due today" + formatDistanceFromNow(task.dueDate)
          : formatDistanceFromNow(task.dueDate)}
      </div> */
}

export default TaskItem;
