import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useTask } from "./useTask";
import { formatDistanceFromNow } from "../../utils/helpers";
import { url } from "../../utils/constants";

function TaskDetail() {
  const moveBack = useMoveBack();
  const { isLoading, task } = useTask();

  if (isLoading) return <p>Loading...</p>;

  console.log(task);
  console.log(task.taskMembers.length);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Task &quot;{task.name}&quot;</h2>

        <button
          onClick={moveBack}
          className="rounded-m flex items-center self-center border-b  border-purple-600 text-purple-600 hover:border-0"
        >
          &larr; Go back
        </button>
      </div>

      <div className="grid h-[500px] grid-cols-4 gap-10">
        {/* bg-red-200 */}
        {/* <div className="col-span-3 h-full overflow-hidden rounded-md bg-white px-4 py-4">
          <p className="text-xl">Create design for web</p>
          <p>priority</p>
          <p>Task Status</p>
          <p>Due in</p>
          <p>Created at date</p>
          <p>Due date</p>

          <button className="mt-auto rounded-md bg-lime-600 px-4 py-1.5 text-white hover:bg-lime-500 active:bg-lime-700">
            Mark as completed
          </button>
        </div> */}
        <div
          className={`${
            task.taskMembers.length <= 0 ? "col-span-4" : "col-span-3"
          } flex flex-col overflow-hidden rounded-md bg-white px-4 py-4`}
        >
          {/* bg-red-200 */}
          <div className="flex items-center gap-4">
            <p className="text-xl">{task.name}</p>

            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-xl">&#183;</span>
              <p className="pt-1 text-sm">
                {formatDistanceFromNow(task.createdAt)}
              </p>
            </div>
          </div>
          <p>priority</p>
          <p>Task Status</p>
          <p>Due in</p>

          {/* <button className="mt-auto inline-flex items-center gap-2 rounded-md bg-lime-600 px-4 py-1.5 text-white hover:bg-lime-500 active:bg-lime-700">
            <IoCheckmarkDoneOutline className="text-xl" />
            <span>Mark as completed</span>
          </button> */}
          <div className="mt-auto border-t pt-4">
            <button className="flex w-52 items-center justify-center gap-2 rounded-md bg-lime-600 px-4 py-2 text-white hover:bg-lime-500 active:bg-lime-700">
              <IoCheckmarkDoneOutline className="text-2xl" />
              <span>Mark as completed</span>
            </button>
          </div>
        </div>

        {task.taskMembers.length <= 0 ? null : (
          <aside className="col-span-1 rounded-md bg-white">
            {/* bg-blue-200 */}
            <div className="flex flex-col gap-3 px-4 py-4">
              <div>
                <h2 className="text-lg font-[500]">Creator</h2>
                <div className="flex items-center gap-3">
                  <img
                    className="h-9 w-9 rounded-full"
                    src={`${
                      task.creator.photo && url + `${task.creator.photo}`
                    }`}
                    alt={`Photo of ${task.creator.name}`}
                  />
                  <p>{task.creator.name}</p>
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-lg font-[500]">Members</h2>

                <ul className="flex flex-col gap-2">
                  {task &&
                    task.taskMembers.map((member) => (
                      <li
                        key={member._id}
                        className="flex items-center gap-3 rounded-md"
                      >
                        <img
                          className="h-9 w-9 rounded-full"
                          src={`${member.photo && url + `${member.photo}`}`}
                          alt={`Photo of ${member.name}`}
                        />
                        <p>{member.name}</p>
                      </li>
                    ))}
                  {/* Monica */}
                  {/* bg-gray-600 */}
                </ul>
              </div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

export default TaskDetail;
