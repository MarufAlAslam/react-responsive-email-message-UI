import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import Messages from "../pages/message-page";
import Emails from "../pages/email-page";


const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
  };

  return (
    <main>
      <div className="container mx-auto">
        {/* header */}
        <header className="header border-b border-gray-200 py-4">
          <Link
            to="/"
            className="flex justify-start items-center gap-3 text-lg font-bold text-gray-800"
          >
            <IoHome />
            Back to Home
          </Link>
        </header>
        {/* header */}

        {/* main content */}
        <div className="flex flex-col gap-5">
          {/* <nav className="flex gap-3">
            <NavLink
              to="/messages"
              // onClick={() => handleTabClick(1)}
              className={`px-6 nav-link py-1 cursor-pointer rounded-md bg-gray-200 text-gray-800`}
            >
              Messages
            </NavLink>
            <NavLink
              to="/emails"
              // onClick={() => handleTabClick(2)}
              className={`px-6 nav-link py-1 cursor-pointer rounded-md bg-gray-200 text-gray-800`}
            >
              Emails
            </NavLink>
          </nav> */}
          <div className="flex-grow py-4 border-gray-200">
            {/* {activeTab === 1 ? <Messages /> : <Emails />} */}
            <Outlet />
          </div>
        </div>
        {/* main content */}
      </div>
    </main>
  );
};

export default MainLayout;
