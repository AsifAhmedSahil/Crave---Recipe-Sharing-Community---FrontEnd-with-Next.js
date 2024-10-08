/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

interface Ingredient {
  _id: string;
  name: string;
  quantity: string;
}

interface Comment {
  _id: string;
  user: string;
  content: string;
}

interface RecipeData {
  title: string;
  image: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  averageRating: number;
  comments: Comment[];
}

const RecipeDetails = ({ params }: { params: { recipeId: string } }) => {
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`http://localhost:5000/api/v1/items/recipe/${params.recipeId}`, {
        cache: "no-store",
      });
      const { data } = await res.json();
      setRecipeData(data);
    };

    fetchRecipe();
  }, [params.recipeId]);

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Logic to post the comment can go here
      console.log(newComment);
      setNewComment(""); // Clear the input field
    }
  };

  console.log(recipeData);
  if (!recipeData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{recipeData.title}</h1>
        <div className="flex">
          <div className="w-2/3 pr-4">
            <Image src={recipeData.image} width={500} height={300} alt="Recipe Image" className="rounded-lg w-full" />
            <p className="text-gray-700 mb-4">{recipeData.description}</p>
          </div>
          <div className="w-1/3">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside space-y-1">
              {recipeData.ingredients.map((ingredient) => (
                <li key={ingredient._id} className="text-gray-600">
                  {ingredient.name} - {ingredient.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <p className="text-gray-600">{recipeData.instructions}</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Average Rating: {recipeData.averageRating} ★</span>
          <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg px-4 py-2">
            Rate Recipe
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Comments:</h2>
          <div className="space-y-4 mb-6">
            {recipeData.comments.map((comment) => (
              <div key={comment._id} className="border p-4 rounded-lg">
                <span className="font-bold">{comment.user}:</span>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow border border-gray-300 rounded-lg p-2"
              required
            />
            <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
