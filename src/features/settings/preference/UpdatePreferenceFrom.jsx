import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { usePreference } from "./usePreference";
import { useUpdatePreference } from "./useUpdatePreference";
import { useForm } from "react-hook-form";
import { isEmptyObject } from "../../../utils/helpers";

function UpdatePreferenceFrom() {
  const { isLoading, preference } = usePreference([]);
  // Ensure preference is an array before destructuring
  const [preferenceObj] = Array.isArray(preference) ? preference : [{}];

  const [theme, setTheme] = useState("");
  const [viewMode, setViewMode] = useState("");
  const { isUpdating, updatePreference } = useUpdatePreference();
  const { register, formState, handleSubmit } = useForm();

  // console.log(theme, viewMode)

  const { errors } = formState;

  // Initial setting of theme and viewMode
  if (!isLoading && preferenceObj && theme === "" && viewMode === "") {
    setTheme(preferenceObj.theme || "");
    setViewMode(preferenceObj.viewMode || "");
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme !== preferenceObj.theme) {
      updatePreference({
        newPreferenceData: { theme: newTheme },
        id: preferenceObj._id,
      });
    }
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    if (newViewMode !== preferenceObj.viewMode) {
      updatePreference({
        newPreferenceData: { viewMode: newViewMode },
        id: preferenceObj._id,
      });
    }
  };

  function onSubmit({ row }) {
    if (row === preferenceObj.row.toString()) return;

    updatePreference({
      newPreferenceData: { row },
      id: preferenceObj._id,
    });
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={() => {}}>
          <div className="mb-8 flex flex-col gap-4">
            <header>
              <h1 className="text-2xl font-semibold">
                Update preference settings
              </h1>
            </header>
            <div>
              <div className="border-1 rounded-lg bg-dashboard-block px-28 py-6">
                <div className="flex items-center border-b border-[#f3f4f6] py-3 dark:border-[#f3f4f6]/5">
                  <p className="inline-block w-60 flex-none font-semibold">
                    Theme
                  </p>

                  <RadioGroup
                    value={theme}
                    onChange={handleThemeChange}
                    className={`basis-4/6 gap-2`}
                  >
                    <div className="inline-flex items-center rounded-md bg-gray-200 px-1 py-2.5 dark:bg-main-background">
                      <RadioGroup.Option value="light" disabled={isUpdating}>
                        {({ checked }) => (
                          <span
                            className={`${
                              checked
                                ? "bg-purple-500 text-white dark:bg-purple-600/60"
                                : ""
                            } cursor-pointer rounded-md px-4 py-2 transition-colors duration-150`}
                          >
                            Light
                          </span>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option value="dark" disabled={isUpdating}>
                        {({ checked }) => (
                          <span
                            className={`${
                              checked
                                ? "bg-purple-500 text-white dark:bg-purple-600/60"
                                : ""
                            } cursor-pointer rounded-md px-4 py-2 transition-colors duration-150`}
                          >
                            Dark
                          </span>
                        )}
                      </RadioGroup.Option>
                    </div>
                  </RadioGroup>

                  <div className="basis-3/4">&#x200B;</div>
                </div>

                <div className="flex items-center border-b border-[#f3f4f6] py-3 dark:border-[#f3f4f6]/5">
                  <p className="inline-block w-60 flex-none font-semibold">
                    View mode
                  </p>

                  <RadioGroup
                    disabled={isUpdating}
                    value={viewMode}
                    onChange={handleViewModeChange}
                    className={`basis-4/6 gap-2`}
                  >
                    <div className="inline-flex items-center rounded-md bg-gray-200 px-1 py-2.5 dark:bg-main-background">
                      <RadioGroup.Option value="card" disabled={isUpdating}>
                        {({ checked }) => (
                          <span
                            className={`${
                              checked
                                ? "bg-purple-500 text-white dark:bg-purple-600/60"
                                : ""
                            } cursor-pointer rounded-md px-4 py-2 transition-colors duration-150`}
                          >
                            Card
                          </span>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option value="table" disabled={isUpdating}>
                        {({ checked }) => (
                          <span
                            className={`${
                              checked
                                ? "bg-purple-500 text-white dark:bg-purple-600/60"
                                : ""
                            } cursor-pointer rounded-md px-4 py-2 transition-colors duration-150`}
                          >
                            Table
                          </span>
                        )}
                      </RadioGroup.Option>
                    </div>
                  </RadioGroup>
                  <div className="basis-3/4">&#x200B;</div>
                </div>

                <div className="flex items-center py-3">
                  <p className="inline-block w-60 flex-none font-semibold">
                    Number of row per page
                  </p>
                  {/* w-56 */}
                  <input
                    className={`${
                      isUpdating ? "bg-gray-200" : ""
                    } border-1 basis-4/6 rounded-md border-[#D1D5DB] shadow-sm transition-colors duration-300 dark:border-gray-100/20 dark:bg-main-background`}
                    type="number"
                    id="row"
                    disabled={isUpdating}
                    defaultValue={preferenceObj?.row}
                    //   value={name}
                    //   onChange={() => {}}
                    // onChange={(e) => setRow(e.target.value)}
                    // onBlur={handleSubmit(onSubmit)}
                    {...register("row", {
                      required: "This field is required",
                      onBlur: handleSubmit(onSubmit),
                      min: {
                        value: 1,
                        message: "Minimun number of row allowed is 1",
                      },
                      max: {
                        value: 20,
                        message: "Maximun number of row allowed is 20",
                      },
                    })}
                  />

                  <div className="basis-3/4">
                    {errors?.row?.message ? (
                      <span className="text-sm text-red-500">
                        {errors.row.message}
                      </span>
                    ) : (
                      ""
                    )}
                    &#x200B;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default UpdatePreferenceFrom;
