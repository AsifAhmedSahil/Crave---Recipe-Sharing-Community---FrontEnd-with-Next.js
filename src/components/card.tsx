/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = (item: any) => {
  console.log(item.item, "*********************");
  return (
    <div className="container mx-auto flex justify-center md:justify-start">
      <div className="max-w-sm">
        <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
          <Image
            src={item.item.image}
            width={400}
            height={200}
            alt="thumbnail_image"
            className="rounded-t-lg "
          />
          <div className="py-6 px-5">
            <h2 className="text-2xl font-semibold text-black">
              {item.item.title}
            </h2>
            <p className="text-gray-600">{item.item.description}</p>
            {/* Additional content goes here */}
          </div>
          <div className="absolute top-2 right-2 py-2 px-4 bg-black text-yellow-600 rounded-lg">
            <span className="font-medium">{item.item.type}</span>
          </div>
         <Link href={`/recipe/${item.item._id}`}>
         <div className="w-[70%] mx-auto text-center">
          <button
            type="button"
            className="w-[70%] mx-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
