/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useDeleteRecipe } from "../hooks/recipe.hook";
import parse from 'html-react-parser';
import DOMPurify from "dompurify";

const FbCard = ({ item, onDelete }: { item: any; onDelete: (id: string) => void }) => {
  const sanitizedDescription = DOMPurify.sanitize(item.description);
  const description = parse(sanitizedDescription);

  const handleDeleteItem = async () => {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
          if (result.isConfirmed) {
              try {
                  await onDelete(item._id);
              } catch (err: any) {
                  toast.error('Failed to delete booking', err);
              }
          }
      });
  };

  return (
      <div className="container mx-auto flex justify-center md:justify-start">
          <div className="w-full">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out overflow-hidden">
                  <Image
                      src={item.image}
                      width={400}
                      height={200}
                      alt="Recipe Thumbnail"
                      className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                      <p className="text-gray-600 mt-2">{description}</p>
                      <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-500">{item.type}</span>
                          <span className="text-sm text-gray-500">{item.creator}</span>
                      </div>
                  </div>
                  <div className="flex justify-between px-4 mb-4">
                      <Link href={`/recipe/${item._id}`}>
                          <button type="button" className="w-full text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-l font-medium rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out">
                              View Details
                          </button>
                      </Link>
                      <div className="flex gap-2">
                          <Link href={`/recipe/update/${item._id}`}>
                              <button type="button" className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white font-medium rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out">
                                  Update
                              </button>
                          </Link>
                          <button onClick={handleDeleteItem} type="button" className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-medium rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out">
                              Delete
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default FbCard;

