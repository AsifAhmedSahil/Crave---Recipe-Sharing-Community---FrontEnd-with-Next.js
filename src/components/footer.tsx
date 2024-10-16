/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import Link from "next/link";
import React from "react";
import logo from "@/src/assets/images/logo.jpg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 ">
      <div className="md:flex md:justify-between ">
        <div className="flex items-center justify-start gap-4 mb-10">
          <div className="">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="saas image"
                className="h-12 w-12 relative"
              />
            </Link>
          </div>
          <div className="text-white text-2xl font-bold">
            <Link href={"/"}>Crave</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold  uppercase">
              Facilities
            </h2>
            <ul className=" font-medium">
              <li className="mb-4">
                <Link href="https://flowbite.com/" className="hover:underline">
                  Courts
                </Link>
              </li>
              <li>
                <Link
                  href="https://tailwindcss.com/"
                  className="hover:underline"
                >
                  Trainers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold  uppercase ">
              Follow us
            </h2>
            <ul className=" font-medium">
              <li className="mb-4">
                <Link href="https://facebook.com/" className="hover:underline ">
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://instragram.gg/4eeurUVvTy"
                  className="hover:underline"
                >
                  Instragram
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold  uppercase ">Legal</h2>
            <ul className=" font-medium">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6  sm:mx-auto  lg:my-8" />

      <footer className="">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="px-4 py-6  md:flex md:items-center md:justify-between">
            <span className="text-sm  sm:text-center">
              © 2024 <Link href="https://flowbite.com/">- Crave</Link>. All
              Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
              <Link href="#" className="">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  
                </svg>
                <span className="sr-only">Facebook page</span>
              </Link>
              <Link href="#" className="">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </Link>
              <Link href="#" className="">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  
                </svg>
                <span className="sr-only">Twitter page</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
