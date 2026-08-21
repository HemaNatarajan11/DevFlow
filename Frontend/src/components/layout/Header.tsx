import {
  Bell,
} from "lucide-react";

export default function Header() {
  const user = JSON.parse(
    localStorage.getItem("user") ||
      "{}"
  );

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <div>
        <p className="text-sm text-gray-500">
          Welcome back,
        </p>

        <p className="font-semibold">
          {user.name || "Developer"}
        </p>
      </div>

      <button className="rounded-full p-2 hover:bg-gray-100">
        <Bell className="h-5 w-5" />
      </button>

    </header>
  );
}