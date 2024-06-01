// styles
import "./../index.css";

// components
import TwSidebar from "./tailwind-components/TwSidebar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Tasks from "../pages/Tasks";
import { Outlet, useLocation } from "react-router-dom";
import CustomSidebar from "./CustomSidebar";
import { useEffect, useState } from "react";
import { usePreference } from "../features/settings/preference/usePreference";
import { useDarkMode } from "../hooks/useDarkMode";
import { useUser } from "../features/authentication/useUser";
import PageNotFound from "../pages/PageNotFound";

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isLoading: isLoadingUser, user } = useUser();

  // theme
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isLoading, preference } = usePreference();

  function handleOpenSidebar() {
    setIsOpen((isOpen) => !isOpen);
  }

  useEffect(() => {
    if (!isLoading && preference) {
      const theme = preference[0].theme;
      setIsDarkMode(theme === "dark");
    }
  }, [isLoading, preference]);

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode],
  );

  if (location.pathname === "/admin" || location.pathname === "/admin/")
    if (!isLoadingUser && user.data.data.role !== "admin") {
      return <PageNotFound />;
    }

  return (
    <>
      <div
        className={`grid h-screen grid-cols-[auto,1fr]
        grid-rows-[60px,1fr] overflow-x-hidden`}
      >
        <Navbar />
        {/* <Sidebar /> */}
        <CustomSidebar isOpen={isOpen} onHandleSidebar={handleOpenSidebar} />
        <main className="overflow-scroll overflow-x-hidden bg-main-background pb-40 pl-10 pr-10 pt-10 transition-colors duration-150 dark:[color-scheme:dark]">
          {/* bg-gray-200 */}
          {location.pathname === "/dashboard" && (
            <div className="mx-auto flex max-w-[1400px] flex-col gap-12 dark:text-[#efeff1]">
              <Outlet />
            </div>
          )}
          {location.pathname !== "/dashboard" && (
            <div className="mx-auto flex max-w-[1200px] flex-col gap-12 dark:text-[#efeff1]">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default AppLayout;
