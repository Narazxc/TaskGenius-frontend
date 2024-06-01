import React, { useEffect, useState } from "react";
import CreateTask from "../features/tasks/CreateTask";
import TaskList from "../features/tasks/TaskList";
import TaskTable from "../features/tasks/TaskTable";
import Modal from "../ui/Modal";
import CreateCollabTaskForm from "../features/kanban/CreateCollabTaskForm";
import { IoAddOutline, IoAlbums } from "react-icons/io5";
import { IoList } from "react-icons/io5";
import CollabTaskList from "../features/kanban/CollabTaskList";
import { Tab } from "@headlessui/react";
import CreateTaskForm from "../features/tasks/CreateTaskForm";
import CreateCollabTaskForm2 from "../features/kanban/CreateCollabTaskForm2";
import CollabTaskTable from "../features/kanban/CollabTaskTable";
import Pagination from "../ui/Pagination";
import useCollabTasks from "../features/kanban/useCollabTasks";
import { PAGE_SIZE } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import TaskTableOperations from "../features/tasks/TaskTableOperations";
import { usePreference } from "../features/settings/preference/usePreference";

function CollaborationTask() {
  const { isLoading, tasks } = useCollabTasks();
  const [searchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [pageSize, setPageSize] = useState();

  const { isLoading: isLoadingPreference, preference } = usePreference();
  const isWorking = isLoading || isLoadingPreference;

  useEffect(() => {
    const initialPage = searchParams.get("page") || 1;
    setCurrPage(initialPage);
  }, [searchParams]);

  useEffect(() => {
    if (!isWorking && preference.length > 0) {
      setPageSize(preference[0]?.row);
      preference[0]?.viewMode === "card"
        ? setTableView(false)
        : setTableView(true);
    }

    // console.log("pageSize", pageSize);
  }, [isWorking, preference, pageSize]);

  function handleOpenTableView() {
    setTableView(true);
  }

  function handleCloseTableView() {
    setTableView(false);
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  let currentTasks;
  if (!isWorking) {
    const indexOfLastPost = currPage * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    currentTasks = tasks.slice(indexOfFirstPost, indexOfLastPost);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">All Collaboration Tasks</h2>
        <TaskTableOperations />
      </div>

      <div className="flex justify-end gap-3">
        <button
          className="flex gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleOpenModal}
        >
          <IoAddOutline className="text-2xl font-bold" />
          <span className="mt-[3.4px]">Create New Collaboration Task</span>
        </button>
        <div className="ml-auto flex gap-3">
          <button
            className={`rounded-md ${
              !tableView ? " bg-purple-800 dark:bg-purple-800/70" : ""
            } bg-gray-400 px-4 py-1 text-white shadow-sm transition-colors duration-100 dark:bg-[#353535]`}
            onClick={handleCloseTableView}
          >
            <IoAlbums className="text-3xl" />
          </button>
          <button
            className={`rounded-md ${
              tableView ? " bg-purple-800 dark:bg-purple-800/70" : ""
            } bg-gray-400 px-4 py-1 text-white shadow-sm transition-colors duration-100 dark:bg-[#353535]`}
            onClick={handleOpenTableView}
          >
            <IoList className="text-3xl" />
          </button>
        </div>
      </div>

      <Modal
        isOpenModal={isOpenModal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
      >
        {/* <div className="h-[496px]"> */}
        {/* Choose From Existing Task */}
        {/* className="flex-1 rounded-md bg-purple-700 py-4 text-white" */}
        <Tab.Group>
          <Tab.List className="mb-5 flex justify-center gap-2 rounded-md bg-gray-300 p-2 dark:bg-dashboard-block">
            <Tab as={React.Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={`
                    ${
                      selected
                        ? "bg-purple-700 text-white dark:bg-purple-700/70"
                        : " text-black dark:text-[#efeff1]"
                    }
                    flex-1 rounded-md  py-4
                  `}
                >
                  Choose from existing task
                </button>
              )}
            </Tab>
            <Tab className="flex-1" as={React.Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={`
                     ${
                       selected
                         ? "bg-purple-700 text-white dark:bg-purple-700/70"
                         : " text-black dark:text-[#efeff1]"
                     }
                    flex-1 rounded-md  py-4
                  `}
                >
                  Create new collab task
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <CreateCollabTaskForm onCloseModal={handleCloseModal} />
            </Tab.Panel>
            <Tab.Panel>
              <CreateCollabTaskForm2 onCloseModal={handleCloseModal} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {/* </div> */}
      </Modal>

      {tableView ? (
        <CollabTaskTable
          isLoading={isWorking}
          tasks={currentTasks}
          isOpenModal={isOpenModal}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
        />
      ) : (
        <CollabTaskList
          tasks={currentTasks}
          isLoading={isWorking}
          isOpenModal={isOpenModal}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
        />
      )}

      {isWorking === false && typeof pageSize === "number" ? (
        <Pagination count={tasks && tasks.length} pageSize={pageSize} />
      ) : null}
    </>
  );
}

export default CollaborationTask;
