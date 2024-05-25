import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import CreateTaskForm from "./CreateTaskForm";

function CreateTask({ onOpenModal, isOpenModal, onCloseModal }) {
  // const [isOpenModal, setIsOpenModal] = useState(false);

  // function handleOpenModal() {
  //   setIsOpenModal(true);
  // }

  // function handleCloseModal() {
  //   setIsOpenModal(false);
  // }

  return (
    <>
      {/* <div>
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onOpenModal}
        >
          Create Task
        </button>
      </div> */}
      {/* Use the `Transition` component at the root level */}
      <Transition show={isOpenModal} as={React.Fragment}>
        <Dialog onClose={() => onCloseModal(false)}>
          {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* Full-screen container to center the panel */}
            {/* <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <Dialog.Panel className="mx-auto w-3/5 max-w-sm rounded-xl bg-white p-10">
                <Dialog.Title>Create Task Form with Transition</Dialog.Title>

                <CreateTaskForm />
              </Dialog.Panel>
            </div> */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <Dialog.Panel className="mx-auto w-2/3 max-w-5xl rounded-xl bg-white p-10">
                <Dialog.Title>Create Task Form with Transition</Dialog.Title>
                <CreateTaskForm onCloseModal={onCloseModal} />
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

export default CreateTask;

// return (
//   <div>
//     <button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
//       Add new cabin
//     </button>
//     {isOpenModal && (
//       <Modal onClose={() => setIsOpenModal(false)}>
//         <CreateCabinForm />
//       </Modal>
//     )}
//   </div>
// );

//===============================================================================================

// return (
//   <>
//     <div>
//       <button onClick={handleOpenModal}>Create Task</button>
//     </div>

//     <Dialog
//       open={isOpenModal}
//       onClose={() => setIsOpenModal(false)}
//       className="relative z-50"
//     >
//       {/* The backdrop, rendered as a fixed sibling to the panel container */}
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//       {/* Full-screen container to center the panel */}
//       <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//         {/* The actual dialog panel  */}
//         <Dialog.Panel className="mx-auto w-3/5 max-w-sm rounded bg-white p-10">
//           <Dialog.Title>Complete your order</Dialog.Title>
//           <CreateTaskForm />
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   </>
// );
