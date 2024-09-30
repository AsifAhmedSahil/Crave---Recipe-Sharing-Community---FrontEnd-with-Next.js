/* eslint-disable prettier/prettier */
import { UserNavbar } from "@/src/components/userNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Crave",
  description: "Next Level Riding Sharing Service",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <UserNavbar/>
      User Dashboard Sidebar
      {children}
    </div>
  );
}
