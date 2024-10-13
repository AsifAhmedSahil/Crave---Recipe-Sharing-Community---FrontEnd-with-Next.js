/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'
import { useDeleteRecipe } from '@/src/hooks/recipe.hook';
import React, { useEffect, useState } from 'react';
import { FaRegStar } from "react-icons/fa";
import { toast } from 'sonner';
import Swal from 'sweetalert2';

const RecipeTable = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const { mutate: handledeleteRecipe } = useDeleteRecipe();

  useEffect(() => {
    const fetchRecipes = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/v1/items/recipes", { cache: "no-store" });
            const result = await res.json();
    
            if (result.data) {
              // Check if data exists and filter for non-deleted recipes
              setRecipes(result.data);
            } else {
              toast.error("No recipes found.");
            }
          } catch (error) {
            toast.error("Failed to fetch recipes.");
          }
    };
    fetchRecipes();
  }, [recipes]);

  const DeleteRecipe = async (recipeId: string) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Delete This Recipe?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            handledeleteRecipe(recipeId)
          
          } catch (err:any) {
            toast.error('Failed to delete booking',err);
          }

        }
      });
   
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full ">
        <thead>
          <tr>
            <th className="py-2">Image</th>
            <th className="py-2">Title</th>
            <th className="py-2">Average Rating</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe._id} className="border-b ">
              <td className="py-2 px-4 text-center">
              <div className='flex justify-center items-center'>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-10 w-10 rounded-full border border-gray-300"
                />
                </div>
              </td>
              <td className="py-2 px-4 ">{recipe.title}</td>
              <td className="py-2 px-4 text-center">
                {recipe.averageRating > 0 ? <div className='flex justify-center items-center gap-2'>{recipe.averageRating} <FaRegStar className='text-yellow-500 ' /> </div>  : "Not Rated"}
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => DeleteRecipe(recipe._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
