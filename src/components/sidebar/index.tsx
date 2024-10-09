/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { userLinks } from "./constants"; // Adjust the path as necessary
import Image from "next/image";
import logo from "@/src/assets/images/logo.jpg";
import { Button } from "@nextui-org/button";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Toggle button for mobile */}
      <button
        className="fixed top-4 left-4 lg:hidden p-2 text-white bg-blue-600 rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64`}
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
        <nav>
          <ul className="space-y-4">
            {userLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="flex items-center space-x-2 w-full">
                  {/* {link.icon} */}
                  <Button className="w-full">{link.label}</Button>
                </Link>
              </li>
            ))}
          </ul>
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
