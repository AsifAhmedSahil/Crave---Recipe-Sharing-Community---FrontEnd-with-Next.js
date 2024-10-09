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
      <div>
        {/* <UserNavbar /> */}
        <DashboardTitle />
        <Container>
        <div className="w-full my-12 flex gap-12 ">
          <div className=" lg:w-2/5">
            {/* sidebar */}
            <Sidebar />
          </div>
          <div className="w-full lg:w-3/5 ">{children}</div>
        </div>
        </Container>
      </div>
    </>
  );
}
