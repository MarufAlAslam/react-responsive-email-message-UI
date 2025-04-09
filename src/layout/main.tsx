import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
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
        <header className="header border-b border-gray-200 mb-5 py-4">
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
          <nav className="flex gap-3">
            <button
              onClick={() => handleTabClick(1)}
              className={`px-6 py-1 cursor-pointer rounded-md ${activeTab === 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
                }`}
            >
              Messages
            </button>
            <button
              onClick={() => handleTabClick(2)}
              className={`px-6 py-1 cursor-pointer rounded-md ${activeTab === 2
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
                }`}
            >
              Emails
            </button>
          </nav>
          <div className="flex-grow py-4 border-t border-gray-200">
            {activeTab === 1 ? <Messages /> : <Emails />}
          </div>
        </div>
        {/* main content */}
      </div>
    </main>
  );
};

export default MainLayout;
