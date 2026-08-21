import {
  Bell,
  Search,
} from "lucide-react";

export default function Header() {
  const user = JSON.parse(
    localStorage.getItem("user") ||
      "{}"
  );

  return (
    <header className="glass sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200/60 px-6">
      <div>
        <p className="text-sm text-gray-500">
          Welcome back,
        </p>

        <p className="font-semibold text-gray-900">
          {user.name || "Developer"}{" "}
          <span className="ml-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            placeholder="Search..."
            className="w-56 rounded-xl border border-gray-200 bg-white/80 py-2 pl-9 pr-3 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <button className="relative rounded-xl p-2.5 text-gray-500 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600">
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500 ring-2 ring-white" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
          {(user.name || "D").charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}