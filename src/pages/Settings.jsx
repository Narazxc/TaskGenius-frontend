import { Tab } from "@headlessui/react";
import React from "react";
import UpdateAccountForm from "../features/settings/account/UpdateAccountForm";
import UpdatePasswordForm from "../features/settings/account/UpdatePasswordForm";
import UpdatePreferenceFrom from "../features/settings/preference/UpdatePreferenceFrom";

function Settings() {
  return (
    <>
      <div className="flex">
        <h2 className="text-4xl font-bold">Settings</h2>
      </div>

      <Tab.Group>
        <Tab.List className={`flex gap-4`}>
          <Tab className="" as={React.Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              //     <button
              //       className={`
              //         ${
              //           selected
              //             ? "border-purple-800 text-purple-800 dark:text-red-500"
              //             : "border-transparent"
              //         }
              //           border-b-2 px-3 pb-[6px] text-lg text-black outline-none dark:text-white`}
              //     >
              //       Account
              //     </button>
              //   )}
              // </Tab>
              // <Tab className="" as={React.Fragment}>
              //   {({ selected }) => (
              //     /* Use the `selected` state to conditionally style the selected tab. */
              //     <button
              //       className={`
              //         ${
              //           selected
              //             ? "border-purple-800 text-purple-800 dark:text-red-500"
              //             : "border-transparent"
              //         }
              //            border-b-2 px-3 pb-[6px] text-lg text-black outline-none dark:text-white`}
              //     >
              //       Preference
              //     </button>
              <button
                className={`border-b-2 px-3 pb-[6px] text-lg outline-none 
            ${
              selected
                ? "border-purple-800 text-purple-800"
                : "border-transparent text-black hover:border-purple-800/50 dark:text-white"
            }`}
              >
                Account
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
                Preference
              </button>
            )}
          </Tab>
          {/* ...  */}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <UpdateAccountForm />
            <UpdatePasswordForm />
          </Tab.Panel>
          <Tab.Panel>
            <UpdatePreferenceFrom />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default Settings;
