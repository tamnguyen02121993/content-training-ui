import { Card } from "antd";
import { RolesTable } from "./components";

export default async function RolesPage() {
  return (
    <main>
      <Card title="Roles" className="shadow-sm">
        <RolesTable />
      </Card>
    </main>
  );
}
