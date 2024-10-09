/* eslint-disable prettier/prettier */
import { AdminNavbar } from "@/src/components/AdminNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Crave",
  description: "Next Level Riding Sharing Service",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminNavbar/>
      Admin Dashboard Sidebar
      {children}
    </div>
  );
}
