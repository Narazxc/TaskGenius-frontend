import { Tab } from "@headlessui/react";
import UserTable from "../features/admin/UserTable";
import React from "react";
import Filter from "../ui/Filter";
import AdminTableOperations from "../features/admin/AdminTableOperations";

function Admin() {
  return (
    <>
      <div className="flex">
        <h2 className="text-4xl font-bold">Admin</h2>
      </div>

      <Tab.Group>
        <Tab.List className={`flex gap-4`}>
          <Tab className="" as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`border-b-2 px-3 pb-[6px] text-lg outline-none 
            ${
              selected
                ? "border-purple-800 text-purple-800"
                : "border-transparent text-black hover:border-purple-800/50 dark:text-white"
            }`}
              >
                Users
              </button>
            )}
          </Tab>
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`border-b-2 px-3 pb-[6px] text-lg outline-none 
            ${
              selected
                ? "border-purple-800 text-purple-800"
                : "border-transparent text-black hover:border-purple-800/50 dark:text-white"
            }`}
              >
                Others
              </button>
            )}
          </Tab>
          {/* ...  */}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <UserTable />
          </Tab.Panel>
          <Tab.Panel>Others</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default Admin;
