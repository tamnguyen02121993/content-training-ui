"use client";

import Link from "next/link";
import { SignOutButton } from ".";
import { usePathname } from "next/navigation";
import { Dropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";

interface MenuItem {
  label: string;
  key: string;
  href: string;
}

const items: MenuItem[] = [
  {
    href: "/users",
    key: "users",
    label: "Users",
  },
  {
    href: "/roles",
    key: "roles",
    label: "Roles",
  },
  {
    href: "/permissions",
    key: "permissions",
    label: "Permissions",
  },
];

const rightMenuItems: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/change-password">Change password</Link>,
  },
  {
    key: "2",
    label: <SignOutButton />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [fullName, setFullName] = useState<string | null>("");
  useEffect(() => {
    setFullName(localStorage.getItem("fullName"));
  }, []);
  return (
    <nav className="bg-white h-10 lg:h-12 border-b border-b-gray-400 shadow-sm">
      <div className="w-full h-full lg:max-w-[1200px]  mx-auto flex justify-between items-center">
        <Link href="/users">
          <h1 className="font-bold text-2xl text-blue-700 hover:text-blue-500 transition-all">
            Content Training
          </h1>
        </Link>
        <ul className="flex flex-row gap-x-4">
          {items.map((item) => (
            <li
              className="text-sm font-medium text-blue-700 hover:text-blue-500 transition-all"
              key={item.key}
            >
              <Link
                href={item.href}
                className={
                  pathname === item.href ? "underline text-blue-500" : ""
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          {/* <span className="font-semibold">{fullName}</span> <SignOutButton /> */}
          <Dropdown menu={{ items: rightMenuItems }}>
            <span className="font-semibold">{fullName}</span>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
