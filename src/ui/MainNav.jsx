import {
  IoGridOutline,
  // IoKeypadOutline,
  IoLayersOutline,
  IoPeopleOutline,
  IoGrid,
  IoLayers,
  // IoKeypad,
  IoPeople,
  IoShield,
  IoShieldOutline,
} from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

function MainNav({ isOpen }) {
  const { pathname } = useLocation();
  const { isLoading, user } = useUser();
  // console.log(pathname);

  return (
    <nav>
      {isLoading && <p>Loading...</p>}
      {/* gap-[0.8rem] */}
      {!isLoading && (
        <ul className={`mt-1 flex flex-col ${isOpen && "gap-1"} gap-1`}>
          <li>
            <NavLink className="link hover:bg-blue-200" to="/dashboard">
              <div
                className={`${
                  isOpen
                    ? "flex items-center gap-5 px-5 py-2"
                    : "mx-auto flex flex-col items-center justify-center gap-1.5 px-2 py-2"
                }`}
              >
                {pathname === "/dashboard" || pathname === "/dashboard/" ? (
                  <IoGrid className="text-2xl" />
                ) : (
                  <IoGridOutline className="text-2xl" />
                )}
                <span className={`${isOpen ? "" : "text-xs"}`}>Dashboard</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink className="link hover:bg-blue-200" to="/tasks">
              <div
                className={`${
                  isOpen
                    ? "flex items-center gap-5 px-5 py-2"
                    : "mx-auto flex flex-col items-center justify-center gap-1.5 px-2 py-2"
                }`}
              >
                {pathname === "/tasks" || pathname === "/tasks/" ? (
                  <IoLayers className="text-2xl" />
                ) : (
                  <IoLayersOutline className="text-2xl" />
                )}
                <span className={`${isOpen ? "" : "text-xs"} `}>Task</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink className="link hover:bg-blue-200" to="/kanban">
              <div
                className={`${
                  isOpen
                    ? "flex items-center gap-5 px-5 py-2"
                    : "mx-auto flex flex-col items-center justify-center gap-1.5  py-2"
                }`}
              >
                {pathname === "/kanban" || pathname === "/kanban/" ? (
                  <IoPeople className="text-2xl" />
                ) : (
                  <IoPeopleOutline className="text-2xl" />
                )}
                <span className={`${isOpen ? "" : "text-xs"}`}>
                  Collaboration
                </span>
              </div>
            </NavLink>
          </li>

          {user.data.data.role !== "admin" ? null : (
            <li>
              <NavLink className="link hover:bg-blue-200" to="/admin">
                <div
                  className={`${
                    isOpen
                      ? "flex items-center gap-5 px-5 py-2"
                      : "mx-auto flex flex-col items-center justify-center gap-1.5  py-2"
                  }`}
                >
                  {pathname === "/admin" || pathname === "/admin/" ? (
                    <IoShield className="text-2xl" />
                  ) : (
                    <IoShieldOutline className="text-2xl" />
                  )}
                  <span className={`${isOpen ? "" : "text-xs"}`}>
                    Administrator
                  </span>
                </div>
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

// {isOpen ? (
//   <div className="flex items-center  gap-5 px-5 py-2">
//     <IoKeypadOutline className="text-2xl" />
//     <span>Kanban</span>
//   </div>
// ) : (
//   <div
//     className={`w-30 mx-auto flex flex-col items-center gap-1.5 px-2 py-2`}
//   >
//     <IoKeypadOutline className="text-2xl" />
//     <span className="text-xs">Kanban</span>
//   </div>
// )}
{
  /* <div className="flex items-center gap-2">
  <IoKeypadOutline className="text-xl" />
  {isOpen && <span>Kanban</span>}
</div> */
}
export default MainNav;
