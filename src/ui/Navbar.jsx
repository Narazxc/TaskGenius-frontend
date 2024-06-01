// import { QueryCache } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import ProfileDropDownMenu from "./ProfileDropDownMenu";
import { useNotifications } from "../features/notifications/useNotifications";
import Notification from "../features/notifications/Notification";
// import { IoNotificationsOutline } from "react-icons/io5";

function Navbar() {
  const { isLoading, user } = useUser();

  // console.log("notification", notifications);

  const { data: { data: userData } = {} } = user;

  // px-[4.8rem] py-[1.2rem]
  return (
    <nav className="bg-dashboard-block col-span-full transition-colors duration-150 dark:text-[#e5e7eb]">
      <div className="flex h-full items-center px-5">
        <div className="ml-auto flex items-center">
          <Notification />
          <div className=" flex items-center gap-5">
            {!isLoading && userData && <span>{userData?.name}</span>}
            {/* <span>{user?.data?.data?.name}</span> */}
            <ProfileDropDownMenu user={userData} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
