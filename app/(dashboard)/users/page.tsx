import { Card } from "antd";
import { UsersTable } from "./components";

export default async function UsersPage() {
  return (
    <main>
      <Card title="Users" className="shadow-sm">
        <UsersTable />
      </Card>
    </main>
  );
}
