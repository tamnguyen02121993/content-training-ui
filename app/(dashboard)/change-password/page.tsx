import { Card } from "antd";
import { ChangePasswordForm } from "./components";

const ChangePasswordPage: React.FC = () => {
  return (
    <main>
      <Card title="Change password" className="shadow-sm">
        <ChangePasswordForm />
      </Card>
    </main>
  );
};

export default ChangePasswordPage;
