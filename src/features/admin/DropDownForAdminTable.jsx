import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  IoEllipsisVertical,
  IoPersonRemoveOutline,
  IoWarning,
} from "react-icons/io5";
import { useDeleteUser } from "./useDeleteUser";

export default function DropDownForAdminTable({ userId }) {
  const { isDeleting, deleteUser } = useDeleteUser();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="absolute">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-2 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 dark:hover:bg-white/40">
              <IoEllipsisVertical className="text-lg" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-dashboard-block shadow-lg ring-1 ring-black/5 focus:outline-none dark:divide-white/10 dark:border dark:border-gray-100/30">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      // setIsOpen(true);
                      openModal();
                      // deleteUser(userId);
                    }}
                    className={`${
                      active
                        ? "bg-violet-500 text-white dark:bg-violet-900/50"
                        : "text-gray-900 dark:text-[#efeff1]"
                    } group flex w-36 items-center justify-center gap-3 rounded-md px-2 py-2 text-sm `}
                  >
                    <IoPersonRemoveOutline className="text-lg text-red-500" />
                    <p className="text-nowrap inline-block text-red-500">
                      Delete user
                    </p>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <IoWarning className="text-6xl text-red-500" />
                      <p>Are you sure?</p>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
