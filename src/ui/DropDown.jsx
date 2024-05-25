import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  IoCheckmarkDoneOutline,
  IoCreateOutline,
  IoEllipsisVertical,
  IoEyeOutline,
  IoPauseOutline,
  IoTrashOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useUpdateTask } from "../features/tasks/useUpdateTask";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DropDown({
  taskCreator,
  onOpenModal,
  onDeleteTask,
  taskId,
}) {
  const { isLoading, user: { data: { data: userData } } = {} } = useUser();
  const navigate = useNavigate();
  const { isUpdating, updateTask } = useUpdateTask();

  function handleUpdateStatus(data) {
    updateTask({ newTaskData: { ...data }, id: taskId });
    // { onSuccess: onCloseModal },
    // console.log({ newTaskData: { ...data }, id: taskId });
  }

  return (
    <div className="absolute right-2 top-2">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-2 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <IoEllipsisVertical className="text-lg" />

            {/* <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            /> */}
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {!isLoading && userData._id === taskCreator && (
              <div className="px-1 py-1">
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate(`/tasks/${taskId}`)}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <IoEyeOutline className="text-lg" />
                        {/* pt-[2.5px] */}
                        <span className="inline-block ">View detail</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onOpenModal}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <IoCreateOutline className="text-lg" />
                        <span className="inline-block pt-1">Edit</span>
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onDeleteTask}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-500`}
                      >
                        <IoTrashOutline className="text-lg" />
                        <span className="inline-block pt-0.5">Delete</span>
                      </button>
                    )}
                  </Menu.Item>
                </>
              </div>
            )}

            {!isLoading && userData._id !== taskCreator && (
              <>
                <div className="px-1 py-1 ">
                  {/* <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {}}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <IoEyeOutline
                          className="text-lg"
                          // pt-[2.5px]
                        />
                        <span className="inline-block ">View detail</span>
                      </button>
                    )}
                  </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate(`/tasks/${taskId}`)}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <IoEyeOutline className="text-lg" />
                        {/* pt-[2.5px] */}
                        <span className="inline-block ">View detail</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>

                <div className="px-1 py-1 ">
                  <div className="px-1.5 pb-2 pt-1.5 text-gray-400">
                    <p className="text-sm">Set status</p>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          handleUpdateStatus({ status: "on hold" })
                        }
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <IoPauseOutline className="text-lg" />
                        <span className="inline-block pt-[2.5px]">On hold</span>
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          handleUpdateStatus({ status: "in progress" })
                        }
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <IoTrendingUpOutline className="text-lg" />
                        <span className="inline-block pt-[2.5px]">
                          In progress
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          handleUpdateStatus({ status: "completed" })
                        }
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-[500] text-lime-500`}
                      >
                        <IoCheckmarkDoneOutline className="text-2xl" />
                        <span className="inline-block pt-[2.5px]">
                          Mark as completed
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
