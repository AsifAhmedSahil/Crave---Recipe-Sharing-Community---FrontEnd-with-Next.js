/* eslint-disable prettier/prettier */
import Container from "@/src/components/Container";
import DashboardTitle from "@/src/components/DashboardTitle";
import Sidebar from "@/src/components/sidebar";
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
    <>
      {/* <div>
        <UserNavbar/>
      User Dashboard Sidebar
      {children}
    </div> */}
        {/* <UserNavbar /> */}
        <div className="overflow-x-hidden">
  <DashboardTitle />
  <Container>
    <div className="w-full my-12 flex flex-col lg:flex-row gap-12">
      <div className="w-full lg:w-2/5"> {/* Full width on small screens */}
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="w-full lg:w-3/5"> {/* Full width on small screens */}
        {children}
      </div>
    </div>
  </Container>
</div>

    </>
  );
}
