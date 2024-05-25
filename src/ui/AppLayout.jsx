// styles
import "./../index.css";

// components
import TwSidebar from "./tailwind-components/TwSidebar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Tasks from "../pages/Tasks";
import { Outlet, useLocation } from "react-router-dom";
import CustomSidebar from "./CustomSidebar";
import { useState } from "react";

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  function handleOpenSidebar() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div
      className={`grid h-screen grid-cols-[auto,1fr]
        grid-rows-[60px,1fr] overflow-x-hidden`}
    >
      <Navbar />
      {/* <Sidebar /> */}
      <CustomSidebar isOpen={isOpen} onHandleSidebar={handleOpenSidebar} />

      <main className="overflow-scroll overflow-x-hidden bg-gray-200 pb-40 pl-10 pr-10 pt-10  ">
        {location.pathname === "/dashboard" && (
          <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
            <Outlet />
          </div>
        )}

        {location.pathname !== "/dashboard" && (
          <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
}

export default AppLayout;
