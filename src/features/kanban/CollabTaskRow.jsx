import { useState } from "react";
import Modal from "../../ui/Modal";
import { useDeleteTask } from "../tasks/useDeleteTask";
import CreateCollabTaskForm2 from "./CreateCollabTaskForm2";
import { useUser } from "../authentication/useUser";

export default function CollabTaskRow({ task }) {
  const { isDeleting, deleteTask } = useDeleteTask();
  const { isLoading, user } = useUser();
  const { _id: taskId, name, dueDate, creator } = task;

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
    // bg-blue-200
    <>
      <tr className="">
        <td className="p-4">{name}</td>
        <td>{dueDate}</td>
        <td>
          {creator === userData._id ? (
            <>
              <button
                onClick={() => deleteTask(taskId)}
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
              <button
                onClick={
                  handleOpenModal
                  // () =>
                  // setIsOpenModal((isOpenModal) => {
                  //   // console.log("hello");
                  //   return !isOpenModal;
                  // })
                }
                className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Edit
              </button>
            </>
          ) : null}

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
