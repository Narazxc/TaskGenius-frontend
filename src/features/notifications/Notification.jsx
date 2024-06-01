import { Popover, Transition } from "@headlessui/react";
import {
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { useNotifications } from "./useNotifications";
import { url } from "../../utils/constants";
import { useUpdateNotification } from "./useUpdateNotification";
// import { useState } from "react";
import { useMarkAllMyNotificationsAsRead } from "./useMarkAllMyNotificationsAsRead";
import React from "react";
import { formatDistanceFromNow } from "../../utils/helpers";
import { Link } from "react-router-dom";

function Notification() {
  const { isLoading, notifications } = useNotifications();
  const { isUpdating: isUpdating1, updateNotification } =
    useUpdateNotification();
  const { isUpdating: isUpdating2, markAllNotifyAsRead } =
    useMarkAllMyNotificationsAsRead();
  // const [open, setOpen] = useState(false);

  const isUpdating = isUpdating1 || isUpdating2;
  const numNotifications = notifications.length;

  // console.log(notifications);
  function handleMarkAllAsRead() {
    markAllNotifyAsRead();
  }

  function handleMarkAsRead(id) {
    updateNotification({ newNotificationData: { isRead: true }, id });
  }

  return (
    <Popover className={`mr-10`}>
      {isLoading ? (
        <Popover.Button
          className={`relative rounded-md bg-gray-300 p-2 text-black active:bg-gray-400 dark:bg-gray-400/40 dark:text-[#efeff1] dark:active:bg-gray-500/40`}
        >
          <IoNotificationsOutline className="text-2xl" />
        </Popover.Button>
      ) : (
        <Popover.Button
          className={`relative rounded-md bg-gray-300 p-2 text-black active:bg-gray-400 dark:bg-gray-400/40  dark:text-[#efeff1] dark:active:bg-gray-500/40`}
        >
          <IoNotificationsOutline className="text-2xl" />
          {!isLoading && numNotifications === 0 ? null : (
            <div className="absolute right-[-8px] top-[-8px] flex h-6 w-6  rounded-full border-2 border-white bg-red-600 text-sm dark:border-[#efeff1]">
              {/* items-center justify-center */}
              <span className="mx-auto text-white dark:text-[#efeff1]">
                {numNotifications}
              </span>
            </div>
          )}
        </Popover.Button>
      )}

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="absolute z-[2] mt-4 w-[380px] -translate-x-1/2 text-sm">
          <div className="overflow-hidden rounded-md bg-dashboard-block p-2 shadow-md">
            <div className="flex items-center justify-between pb-2">
              <p className="text-xl font-bold">Notifications</p>
              {notifications && numNotifications > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-purple-800/50"
                >
                  <IoMailOpenOutline className="text-xl" />
                  <span className="pt-[2px]">Mark all as read</span>
                </button>
              )}
            </div>

            <div className="grid gap-y-2">
              {isLoading && <p className="text-center">Loading...</p>}
              {!isLoading &&
                notifications &&
                notifications.length > 0 &&
                notifications.map((notification) => (
                  <Popover.Button
                    as={Link}
                    to={`/tasks/${notification.task}`}
                    key={notification._id}
                    className="flex items-center justify-between rounded-md bg-main-background px-2 py-2 text-sm"
                  >
                    <div>
                      <img
                        src={`${url}${notification?.fromUser?.photo}`}
                        className="w-14 rounded-full object-contain"
                        alt={`photo of ${notification.fromUser.name} `}
                      />
                    </div>
                    <div className="flex w-48 flex-col gap-3">
                      {/* <p className="mb-2 font-bold">{notification.title}</p> */}
                      <p>
                        <span className="font-bold">
                          {formatText(notification.description).firstWord}
                        </span>
                        {"  "}
                        {formatText(notification.description).remainingWords}
                      </p>

                      <span>
                        {formatDistanceFromNow(notification.createdAt)}
                      </span>
                    </div>
                    <div>
                      <button
                        className="rounded-md p-3 text-gray-600 hover:bg-gray-300 dark:text-[#efeff1] dark:hover:bg-purple-900/80"
                        onClick={() => handleMarkAsRead(notification._id)}
                      >
                        <IoTrashBinOutline className="text-xl" />
                      </button>

                      {/* <span>Update</span> */}
                      {/* {!isLoading && notifications && (
                        <p>{`${
                          notification.isRead === false ? "new" : "seen"
                        }`}</p>
                      )} */}
                    </div>
                  </Popover.Button>
                ))}

              {!isLoading && notifications && numNotifications === 0 && (
                <p className="my-6 text-center">
                  You don't have any new notifications
                </p>
              )}
            </div>
          </div>

          {/* <img src="/solutions.jpg" alt="" /> */}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Notification;

function formatText(str) {
  if (!str) return ""; // Handle empty string case

  const firstWord = str.split(" ")[0];
  const remainingWords = str.slice(firstWord.length + 1); // Slice remaining words

  return { firstWord, remainingWords };
}

// <button
//   onClick={handleToggle}
//   className="mr-10 rounded-md bg-slate-200 px-2 py-2 transition-colors duration-150 active:bg-purple-500 active:text-white"
// >
//   <IoNotificationsOutline className="text-xl" />

//   {/* {open && <div className="absolute right-8 top-6 h-40">name</div>} */}
// </button>
