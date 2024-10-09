/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import parse from 'html-react-parser';
import DOMPurify from "dompurify";

const Card = (item: any) => {
  const sanitizedDescription = DOMPurify.sanitize(item.item.description);
  const description = parse(sanitizedDescription);
  
  return (
    <div className="container mx-auto flex justify-center md:justify-start">
      <div className="max-w-sm w-full"> {/* Ensure full width for each card */}
        <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
          <Image
            src={item.item.image}
            width={400}
            height={200}
            alt="thumbnail_image"
            className="w-full h-60 object-cover rounded-t-lg" // Fixed height and cover
          />
          <div className="py-4 px-5">
            <h2 className="text-2xl font-semibold text-black">
              {item.item.title}
            </h2>
            <p className="text-gray-600">{description}</p>
            {/* Additional content goes here */}
          </div>
          <div className="absolute top-2 right-2 py-2 px-4 bg-black text-yellow-600 rounded-lg">
            <span className="font-medium">{item.item.type}</span>
          </div>
          <Link href={`/recipe/${item.item._id}`}>
            <div className="w-[70%] mx-auto text-center">
              <button
                type="button"
                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              >
                View Details
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
