/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Message sent successfully!", {
      duration: 3000,
      style: {
        backgroundColor: "#32cd32",
        color: "#000",
      },
    });

    if (formRef.current) {
      formRef.current.reset();
    }
  };
  return (
    <div className="px-4  lg:py-8  w-full">
      <h1 className="text-4xl font-bold mb-4 text-center ">Get in Touch</h1>

      <div className="   py-2 lg:py-[24px]">
        <div className="container mx-auto px-4 py-12">
          <div className="lg:flex lg:space-x-12">
            <div className="lg:w-1/2 bg-gray-700 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <div className="h-full w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.481674339187!2d91.17953601565982!3d22.34143022221516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b950fc8e871d%3A0x6a7a631e0d8f6b0!2sChattogram%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1634856810895!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Map of Chittagong, Bangladesh"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">
              Contact Details
            </h2>
            <p className="">
              Phone:{" "}
              <Link href="tel:+1234567890" className=" hover:underline">
                +1 (234) 567-890
              </Link>
            </p>
            <p className="">Email: crave.recipe@gmail.com</p>
            <p className="">
              Address: Chandgaon Abashikh, Road No.12, Chittagong
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
