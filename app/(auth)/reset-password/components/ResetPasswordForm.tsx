"use client";

import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

interface ResetPassword {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleResetPassword = async (values: ResetPassword) => {
    await fetch("/api/reset-password", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(values),
    });
    router.push("/sign-in");
  };
  const handleResetPasswordFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  return (
    <Form
      layout="vertical"
      className="py-6"
      initialValues={{
        email: searchParams.get("email") || "",
        token: "",
        newPassword: "",
        confirmPassword: "",
      }}
      autoComplete="off"
      onFinish={handleResetPassword}
      onFinishFailed={handleResetPasswordFailed}
    >
      <Form.Item<ResetPassword>
        label="Email"
        name="email"
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
        <Input disabled />
      </Form.Item>

      <Form.Item<ResetPassword>
        label="Token"
        name="token"
        rules={[
          {
            required: true,
            message: "${label} is required",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ResetPassword>
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

      <Form.Item<ResetPassword>
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
        <Button className="w-full bg-blue-400" type="primary" htmlType="submit">
          Reset your password
        </Button>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
