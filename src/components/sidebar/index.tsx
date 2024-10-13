/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import {  getAdminLinks, getUserLinks} from "./constants"; // Adjust the path as necessary
import Image from "next/image";
import logo from "@/src/assets/images/logo.jpg";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/context/user.provider";


interface UserData {
  _id: string;
  followerIds: string[];
  followingIds: string[];
  role: string;
}
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { user } = useUser();
  console.log(user)
  console.log(userData)

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:5000/api/v1/users/${user?._id}`, {
        cache: "no-store"
    });
    const { data } = await res.json();
    setUserData(data);
};

useEffect(() => {
    fetchUser();
}, [user?.followingIds,user?.followerIds]);
  
  
  const userLinks = getUserLinks(user?._id );
  const adminLinks = getAdminLinks()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex  ">
      {/* Toggle button for mobile */}
      <button
        className="fixed top-4 left-4 lg:hidden p-2 text-white bg-blue-600 rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full  bg-gray-800 text-white p-4 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-full lg:h-full`}
      >
        {/* Close button inside the sidebar */}
        <button
          className="lg:hidden p-2 text-white bg-red-600 rounded mb-4"
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>

        <Link href={"/"} className="flex justify-start items-center gap-2 mb-8">
          <Image src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <p className="font-bold text-inherit text-xl">Crave</p>
        </Link>
        {user?.role === "USER" && <div className="flex gap-2 w-full mb-8">
          <Button className="bg-blue-500 w-1/2" disabled>
            Follower ({userData?.followerIds?.length || 0})
            
          </Button>
          <Button className="bg-blue-500 w-1/2" disabled>
            Following ({userData?.followingIds?.length || 0})
          </Button>
        </div>}
        <nav>
          { user?.role === "USER" ?
            <ul className="space-y-4">
            {userLinks.map((link, index) => (
              <li key={index}>
                <Button
                  as={Link}
                  className="mt-2 w-full rounded-md"
                  href={link.href}
                >
                  {link.label}
                </Button>
              </li>
            ))}
          </ul> :
           <ul className="space-y-4">
           {adminLinks.map((link, index) => (
             <li key={index}>
               <Button
                 as={Link}
                 className="mt-2 w-full rounded-md"
                 href={link.href}
               >
                 {link.label}
               </Button>
             </li>
           ))}
         </ul>
          }
        </nav>
      </div>

      {/* Main content */}
      {/* <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold">Main Content</h1>
        <p>This is where your main content will go.</p>
        
      </div> */}
    </div>
  );
};

export default Sidebar;
