import {
  Outlet,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <Header />

        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}