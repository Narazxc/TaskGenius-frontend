import { Listbox, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { IoCheckmarkOutline } from "react-icons/io5";

const options = [
  { label: "To do", value: "to do" },
  { label: "On hold", value: "on hold" },
  { label: "In progress", value: "in progress" },
  { label: "Completed", value: "completed" },
];

function TaskStatusListbox({ onChangeTaskStatus, taskStatusToEdit }) {
  const matchingOption = options.find(
    (option) => option.value === taskStatusToEdit,
  );
  // Extract the label if a match is found, otherwise return an empty string
  const currentLabel = matchingOption ? matchingOption.label : "";
  const [label, setLabel] = useState(currentLabel || options[0].label);

  // useEffect({}, []);

  function handleChange(val) {
    onChangeTaskStatus(val);
  }

  return (
    <div className="top-16 w-64">
      <Listbox value={label} onChange={setLabel}>
        <div className="relative">
          <Listbox.Button className="relative h-11 w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 sm:text-sm">
            <span className="text-md block truncate font-[500]">{label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineChevronUpDown className="text-2xl  text-gray-400" />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-purple-300 text-purple-900" : "text-gray-900"
                    }`
                  }
                  value={option.label}
                >
                  {({ selected }) => (
                    <>
                      <span
                        onClick={() => handleChange(option.value)}
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                          <IoCheckmarkOutline
                            className="text-xl"
                            aria-hidden={true}
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default TaskStatusListbox;
