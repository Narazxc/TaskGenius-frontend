import { Dialog, Transition } from "@headlessui/react";
import React from "react";

function Modal({
  isClosable,
  onOpenModal,
  isOpenModal,
  onCloseModal,
  children,
  bgTransparent,
  bgBlur,
  setQuery,
  query,
  resetField,
  noBorder,
}) {
  return (
    <Transition show={isOpenModal} as={React.Fragment}>
      {/* onCloseModal(false) */}
      <Dialog
        className="relative z-50"
        onClose={
          isClosable === true
            ? () => {
                onCloseModal();
                resetField("taskMembers");
                setQuery("");
              }
            : () => {}
        }
      >
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
          <div
            className={`dark:bg-dark/50 fixed inset-0 bg-black/30 ${
              bgBlur ? "backdrop-blur-sm" : ""
            }`}
            aria-hidden="true"
          />
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
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel
              className={`mx-auto w-2/3 max-w-5xl rounded-xl ${
                noBorder ? "" : "border dark:border dark:border-gray-100/10"
              }  dark:bg-main-background ${
                bgTransparent ? "dark:bg-dark/90 bg-transparent" : "bg-white"
              } p-10`}
            >
              {/* <Dialog.Title>Create Task Form with Transition</Dialog.Title> */}
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default Modal;
