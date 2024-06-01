import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { useLogout } from "../features/authentication/useLogout";
import { Link } from "react-router-dom";
import { url } from "../utils/constants";
import {
  // IoCogOutline,
  IoLogOutOutline,
  IoMoonOutline,
  IoSettingsOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { useDarkMode } from "../hooks/useDarkMode";
import { useUpdatePreference } from "../features/settings/preference/useUpdatePreference";
import { usePreference } from "../features/settings/preference/usePreference";

function ProfileDropDownMenu({ user }) {
  const { logout, isLoading } = useLogout();
  const { isLoading: isLoadingPreference, preference } = usePreference();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isUpdating, updatePreference } = useUpdatePreference();

  if (isLoading || isLoadingPreference) return <p>Loading...</p>;

  // console.log("theme", preference[0].theme);

  // const url = "http://localhost:3030/img/users/";

  {
    /* Profile dropdown */
  }
  return (
    <Menu as="div" className="relative">
      <div>
        {/*     */}
        <Menu.Button className="relative flex h-9 w-9 rounded-full bg-purple-900 text-sm ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2 focus:ring-offset-purple-800 ">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            className="h-9 w-9 rounded-full"
            // src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
            src={`${user.photo && url + `${user.photo}`}`}
            alt={`Photo of ${user.name}`}
          />
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 flex w-48 origin-top-right flex-col rounded-md bg-dashboard-block px-[6px] py-[6px] shadow-lg ring-1 ring-black ring-opacity-5 transition-colors duration-300 focus:outline-none">
          <Menu.Item className="hover:bg-gray-200 dark:text-[#e5e7eb] dark:hover:bg-purple-800/50">
            {({ active }) => (
              <Link
                to="/settings"
                className={`

                  flex items-center gap-[12px] rounded-md py-2 pl-[8px] pr-4 text-sm text-gray-700
                `}
                // ${active ? "bg-gray-200" : ""}
              >
                <IoSettingsOutline className="text-xl" />

                <span>Settings</span>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item className="hover:bg-gray-200 dark:text-[#e5e7eb] dark:hover:bg-purple-800/50">
            {({ active }) => (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  updatePreference({
                    newPreferenceData: {
                      theme: preference[0].theme === "dark" ? "light" : "dark",
                    },
                    id: preference[0]._id,
                  });
                }}
                className={`
                  flex items-center gap-3 rounded-md px-[8px] py-2 text-sm text-gray-700 
                `}
              >
                {preference[0].theme === "dark" ? (
                  <>
                    <IoSunnyOutline className="text-xl" />
                    <span>Light mode</span>
                  </>
                ) : (
                  <>
                    <IoMoonOutline className="text-xl" />
                    <span>Dark mode</span>
                  </>
                )}
              </button>
            )}
          </Menu.Item>

          <div className="my-[6px] h-[1px] w-[95%] self-center rounded-full bg-gray-200 dark:bg-white/10" />

          <Menu.Item className="hover:bg-gray-200 dark:hover:bg-purple-800/50">
            {({ active }) => (
              <button
                disabled={isLoading}
                onClick={logout}
                className={`
                   flex w-full items-center gap-3 rounded-md px-[8px] py-2 text-left text-sm text-red-500 
                `}
              >
                <IoLogOutOutline className="text-2xl" />
                <span>Log out</span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ProfileDropDownMenu;
