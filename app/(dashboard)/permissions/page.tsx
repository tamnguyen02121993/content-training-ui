import { Card } from "antd";
import { PermissionsTable } from "./components";

export default function PermissionsPage() {
  return (
    <main>
      <Card title="Permissions" className="shadow-sm">
        <PermissionsTable />
      </Card>
    </main>
  );
}
