"use client";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

interface ChangePassword {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm: React.FC = () => {
  const router = useRouter();
  const handleChangePassword = async (values: ChangePassword) => {
    await fetch("/api/reset-password", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(values),
    });

    await fetch("/api/sign-out", {
      method: "POST",
    });

    router.push("/sign-in");
  };
  const handleChangePasswordFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  return (
    <div className="flex flex-col items-center">
      <Form
        layout="vertical"
        className="py-6 lg:w-[500px]"
        initialValues={{
          email: "",
          newPassword: "",
          confirmPassword: "",
        }}
        autoComplete="off"
        onFinish={handleChangePassword}
        onFinishFailed={handleChangePasswordFailed}
      >
        <Form.Item<ChangePassword>
          label="Email"
          name="email"
          hidden
          rules={[
            {
              required: true,
              message: "${label} is required",
            },
            {
              type: "email",
              message: "${label} is invalid",
            },
            {
              max: 255,
              message: "${label} length is exceed ${max}",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ChangePassword>
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "${label} is required",
            },
            {
              max: 255,
              message: "${label} length is exceed ${max}",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<ChangePassword>
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "${label} is required",
            },
            {
              max: 255,
              message: "${label} length is exceed ${max}",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div>
          <Button
            className="w-full bg-blue-400"
            type="primary"
            htmlType="submit"
          >
            Change password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
