/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useUser } from "../context/user.provider";
import { Button } from "@nextui-org/button";
import { CiLock } from "react-icons/ci";

const Card = ({ item }: { item: any }) => {
  // Adjusted prop destructuring
  const sanitizedDescription = DOMPurify.sanitize(item.description);
  const description = parse(sanitizedDescription);
  const {user} = useUser()

  return (
    <div className="container mx-auto flex justify-center md:justify-start">
      <div className="max-w-sm w-full">
        {" "}
        {/* Ensure full width for each card */}
        <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
          <Image
            src={item.image}
            width={400}
            height={200}
            alt="thumbnail_image"
            className="w-full h-60 object-cover rounded-t-lg" // Fixed height and cover
          />
          <div className="py-4 px-5">
            <h2 className="text-2xl font-semibold text-black">
              {item.title.length > 25
                ? `${item.title.substring(0, 25)}...`
                : item.title}
            </h2>
            <p className="text-gray-600">
              {item.ingredients.length} ingredients
            </p>
            <p className="text-gray-600">
            <ul className="text-gray-600 list-disc pl-5">
          {item.ingredients.slice(0, 2).map((ing: any) => (
            <li key={ing.name}>{ing.name}</li>
          ))}
          {item.ingredients.length > 2 && (
            <li>{`... +${item.ingredients.length - 2} more`}</li>
          )}
        </ul>
            </p>
            <p className="text-gray-600 mb-2 overflow-hidden max-h-16">
              {item.description.length > 80
                ? `${item.description.substring(0, 80)}...`
                : item.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Additional content goes here */}
          </div>
          <div className="absolute top-2 right-2 py-2 px-4 bg-black text-yellow-600 rounded-lg">
            <span className="font-medium">{item.type}</span>
          </div>
          <Link href={`/recipe/${item._id}`}>
            <div className="w-[70%] mx-auto text-center">
              { user?.type === 'GENERAL' && item.type === "premium" ?
                <Button
                as={Link}
                href={"/premium"}
                type="button"
                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              >
                View Recipe <CiLock className="size-5 font-bold"/>
              </Button> : <Button
                type="button"
                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              >
                View Recipe
              </Button>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
