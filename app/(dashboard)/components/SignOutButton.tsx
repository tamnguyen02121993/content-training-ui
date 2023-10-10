"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

const SignOutButton: React.FC = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await fetch("/api/sign-out", {
      method: "POST",
    });
    router.push("/sign-in");
  };
  return (
    <Button type="link" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
