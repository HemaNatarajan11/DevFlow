import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import {
  useAuth,
} from "../../hooks/useAuth";

export default function Settings() {
  const {
    logout,
  } = useAuth();

  const user = JSON.parse(
    localStorage.getItem("user") ||
      "{}"
  );

  return (
    <div className="max-w-3xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your DevFlow account.
        </p>
      </div>

      <Card className="p-6">

        <h2 className="text-lg font-semibold">
          Profile
        </h2>

        <div className="mt-5 space-y-4">

          <div>
            <p className="text-sm text-gray-500">
              Name
            </p>

            <p className="font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-medium">
              {user.email}
            </p>
          </div>

        </div>

      </Card>

      <Card className="p-6">

        <h2 className="text-lg font-semibold">
          Account
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Sign out from your DevFlow account.
        </p>

        <Button
          variant="danger"
          className="mt-5"
          onClick={logout}
        >
          Sign out
        </Button>

      </Card>

    </div>
  );
}