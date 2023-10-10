"use client";
import { Button, Form, Input } from "antd";
import React from "react";

const RequestResetPasswordForm: React.FC = () => {
  const handleRequestForgotPassword = async (values: any) => {
    await fetch("/api/request-reset-password", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: values.email,
      }),
    });
  };

  const handleRequestForgotPasswordFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  return (
    <Form
      layout="vertical"
      className="py-6"
      initialValues={{
        email: "",
      }}
      autoComplete="off"
      onFinish={handleRequestForgotPassword}
      onFinishFailed={handleRequestForgotPasswordFailed}
    >
      <Form.Item
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
        <Input />
      </Form.Item>
      <div>
        <Button className="w-full bg-blue-400" type="primary" htmlType="submit">
          Send an email to reset your password
        </Button>
      </div>
    </Form>
  );
};

export default RequestResetPasswordForm;
