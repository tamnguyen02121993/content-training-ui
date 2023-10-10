"use client";

import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignIn {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const router = useRouter();
  const handleSignIn = async (values: any) => {
    const response = await fetch("/api/sign-in", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const result = await response.json();
    localStorage.setItem("fullName", result.fullName);
    router.push("/users");
  };

  const handleSignInFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <Form
      layout="vertical"
      className="py-6"
      initialValues={{
        email: "",
        password: "",
      }}
      autoComplete="off"
      onFinish={handleSignIn}
      onFinishFailed={handleSignInFailed}
    >
      <Form.Item<SignIn>
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

      <Form.Item<SignIn>
        label="Password"
        name="password"
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
        className="text-xs"
      >
        <Input.Password />
      </Form.Item>

      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-400 hover:text-blue-500 transition-all inline-block"
        >
          Forgot password
        </Link>
      </div>
      <div className="mt-6">
        <Button className="w-full bg-blue-400" type="primary" htmlType="submit">
          Sign In
        </Button>
      </div>
      <div className="mt-6">
        <p className="uppercase text-center font-medium">OR</p>
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/sign-up"
          className="text-sm text-blue-400 hover:text-blue-500 transition-all"
        >
          Create account
        </Link>
      </div>
    </Form>
  );
};

export default SignInForm;
