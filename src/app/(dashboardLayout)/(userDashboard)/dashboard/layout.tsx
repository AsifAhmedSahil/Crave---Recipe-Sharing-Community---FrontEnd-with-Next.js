/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import Container from "@/src/components/Container";
import DashboardTitle from "@/src/components/DashboardTitle";
import Footer from "@/src/components/footer";
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
   
      {/* <UserNavbar /> */}
      <div className="overflow-x-hidden ">
        <div className="sticky top-0 z-10 bg-white hidden lg:block">
          <DashboardTitle />
        </div>
        <div className="sticky top-0 z-10 bg-white  block lg:hidden">
          <UserNavbar />
        </div>
        <Container>
          <div className="w-full  my-12 flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-2/5 sticky top-0 z-10 ">
              {/* Sidebar */}
              <Sidebar />
            </div>
            <div className="w-full lg:w-3/5 overflow-y-auto max-h-[calc(100vh-3rem)]">
              {/* Set max height based on your layout */}
              {children}
            </div>
          </div>
        </Container>
        <Footer/>
      </div>
    </>
  );
}
