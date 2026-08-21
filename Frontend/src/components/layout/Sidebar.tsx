import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  GitBranch,
  Settings,
  Code2,
} from "lucide-react";

import {
  NavLink,
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
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-white lg:block">

      <div className="flex h-16 items-center gap-3 border-b px-6">

        <div className="rounded-lg bg-indigo-600 p-2">
          <Code2 className="h-5 w-5 text-white" />
        </div>

        <span className="text-lg font-bold">
          DevFlow
        </span>

      </div>

      <nav className="space-y-1 p-4">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                rounded-lg px-3 py-2.5
                text-sm font-medium
                transition
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }
                `
              }
            >
              <Icon className="h-5 w-5" />

              {link.name}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}