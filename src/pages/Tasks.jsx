import { useEffect, useState } from "react";
import CreateTask from "../features/tasks/CreateTask";
import TaskList from "../features/tasks/TaskList";
import TaskTable from "../features/tasks/TaskTable";
import Modal from "../ui/Modal";
import CreateTaskForm from "../features/tasks/CreateTaskForm";
import { IoAddOutline, IoAlbums } from "react-icons/io5";
import { IoList } from "react-icons/io5";
import TaskTableOperations from "../features/tasks/TaskTableOperations";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "../features/tasks/useTasks";
import { PAGE_SIZE } from "../utils/constants";
import Pagination from "../ui/Pagination";
import { usePreference } from "../features/settings/preference/usePreference";
import TaskDetail from "../features/tasks/TaskDetail";

function Tasks() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tableView, setTableView] = useState(false);
  const { isLoading, tasks, error } = useTasks();
  const [searchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState();
  const [pageSize, setPageSize] = useState();

  const { isLoading: isLoadingPreference, preference } = usePreference();
  const isWorking = isLoading || isLoadingPreference;

  // console.log(preference[0].row);

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

  // // console.log(pageSize);

  // if (isLoadingPreference) return <p>Loading...</p>;

  // let filteredTasks;
  // if (filterValue === "all") filteredTasks = tasks;
  // if (filterValue === "to-do")
  //   filteredTasks = tasks.filter((task) => task.status === "to do");
  // if (filterValue === "in-progress")
  //   filteredTasks = tasks.filter((task) => task.status === "in progress");
  // if (filterValue === "on-hold")
  //   filteredTasks = tasks.filter((task) => task.status === "on hold");
  // if (filterValue === "completed")
  //   filteredTasks = tasks.filter((task) => task.status === "completed");
  // console.log(filteredTasks);

  // Client-side pagination
  // Get current posts
  // console.log("indexOfLastPost", indexOfLastPost);
  // console.log("indexOfFirstPost", indexOfFirstPost);

  let currentTasks;
  if (!isWorking) {
    const indexOfLastPost = currPage * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    // console.log(indexOfLastPost, indexOfFirstPost);
    currentTasks = tasks.slice(indexOfFirstPost, indexOfLastPost);
  }

  return (
    // <>
    //   <div className="flex items-center justify-between">
    //     <h2 className="text-4xl font-bold">Task "ABC"</h2>
    //   </div>
    //   <TaskDetail />
    // </>
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">All Tasks</h2>{" "}
        <TaskTableOperations />
      </div>

      {/* <TaskTableOperations /> */}
      <div className="flex justify-end gap-3">
        <button
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleOpenModal}
        >
          <IoAddOutline className="text-2xl font-bold" />
          <span className="pt-0.5">Create New Task</span>
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
        <CreateTaskForm onCloseModal={handleCloseModal} />
      </Modal>

      {tableView ? (
        <TaskTable
          // count={tasks.length}
          tasks={currentTasks}
          isLoading={isWorking}
          isOpenModal={isOpenModal}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
        />
      ) : (
        <TaskList tasks={currentTasks} isLoading={isWorking} />
      )}

      {isWorking === false && typeof pageSize === "number" ? (
        <Pagination count={tasks.length} pageSize={pageSize} />
      ) : null}
    </>
  );
}

export default Tasks;
