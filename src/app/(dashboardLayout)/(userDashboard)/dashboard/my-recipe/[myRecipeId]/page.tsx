/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use client";

import FbCard from "@/src/components/fbCard";
import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
import DOMPurify from "dompurify";

interface RecipeItem {
  _id: string;
  title: string;
  description: string;
  instructions: string;
  image: string;
  type: string;
  creator: string;
}

const MyRecipeId = ({ params }: { params: { myRecipeId: string } }) => {
  const [data, setData] = useState<RecipeItem[]>([]);

  const fetchRecipes = async () => {
    const res = await fetch(
      `https://crave-server-assignment-6.vercel.app/api/v1/items/recipe/my-recipe/${params.myRecipeId}`,
      {
        cache: "no-store",
      }
    );
    const { data } = await res.json();
    const sanitizedData = data.map((item: any) => ({
      ...item,
      description: DOMPurify.sanitize(item.description),
      instructions: DOMPurify.sanitize(item.instructions),
    }));
    setData(sanitizedData);
  };

  useEffect(() => {
    fetchRecipes();
  }, [params.myRecipeId]);

  const handleDeleteRecipe = async (id: string) => {
    try {
      await fetch(`https://crave-server-assignment-6.vercel.app/api/v1/items/recipe/${id}`, {
        method: "DELETE",
      });

      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete recipe", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((item) => (
        <FbCard key={item._id} item={{ ...item, description: parse(item.description), instructions: parse(item.instructions) }} onDelete={handleDeleteRecipe} />
      ))}
    </div>
  );
};

export default MyRecipeId;
