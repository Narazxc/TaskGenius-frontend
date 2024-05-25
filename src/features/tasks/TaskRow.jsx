import { useDeleteTask } from "./useDeleteTask";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateTaskForm from "./CreateTaskForm";

function TaskRow({ task }) {
  const { isDeleting, deleteTask } = useDeleteTask();
  const { _id: taskId, name, dueDate } = task;

  const [isOpenModal, setIsOpenModal] = useState(false);
  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    // bg-blue-200
    <>
      <tr className="">
        <td className="p-4">{name}</td>
        <td>{dueDate}</td>
        <td>
          <button
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
          </button>

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
