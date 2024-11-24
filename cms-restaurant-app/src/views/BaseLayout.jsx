import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function BaseLayout({ base_url }) {
  return (
    <>
      <div className="flex bg-green-50 text-slate-800 h-full min-h-screen">
        {/* Sidebar */}
        <Sidebar base_url={base_url} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar base_url={base_url} />

          {/* Content Area */}
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
