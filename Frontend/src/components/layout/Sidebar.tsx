import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  GitBranch,
  Settings,
  Code2,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "GitHub",
    path: "/github",
    icon: GitBranch,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <aside className="relative hidden w-64 shrink-0 border-r border-gray-200/60 bg-white/70 backdrop-blur-xl lg:block">
      <div className="flex h-16 items-center gap-3 border-b border-gray-200/60 px-6">
        <div className="rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-2 shadow-lg shadow-indigo-500/30">
          <Code2 className="h-5 w-5 text-white" />
        </div>

        <span className="text-lg font-bold">
          Dev<span className="text-gradient">Flow</span>
        </span>
      </div>

      <nav className="space-y-1.5 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                flex items-center gap-3
                rounded-xl px-3.5 py-2.5
                text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                }
              `}
            >
              <Icon className="h-5 w-5" />

              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 border-t border-gray-200/60 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />

          Sign out
        </button>
      </div>
    </aside>
  );
}