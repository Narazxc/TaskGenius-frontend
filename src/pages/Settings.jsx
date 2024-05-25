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
          <Tab as={React.Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={`
                  ${selected ? "border-b-2 text-purple-800" : ""}
                    border-purple-800 px-3 pb-2 text-lg text-black`}
              >
                Account
              </button>
            )}
          </Tab>
          <Tab as={React.Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={`
                  ${selected ? "border-b-2 text-purple-800" : ""}
                    border-purple-800 px-3 pb-2 text-lg text-black`}
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
