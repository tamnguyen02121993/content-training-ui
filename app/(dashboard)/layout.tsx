import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="w-full h-full lg:max-w-[1200px] mx-auto flex flex-col my-6">
        {children}
      </main>
    </>
  );
}
