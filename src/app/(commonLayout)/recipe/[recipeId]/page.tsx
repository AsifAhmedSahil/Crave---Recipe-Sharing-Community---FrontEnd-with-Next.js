/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use client";
import { useUser } from "@/src/context/user.provider";
import { useAddComment } from "@/src/hooks/recipe.hook";
import { getCurrentUser } from "@/src/services/AuthService";
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
    name: string;
    profilePhoto: string;
    createdAt: Date;
  }

interface RecipeData {
  _id: string;
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
  const user = useUser();
  const { mutate: handleAddComment } = useAddComment();

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

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    if (newComment.trim() && recipeData) {
      const userData = {
        recipeId: recipeData._id,
        userId: user?.user?._id,
        content: newComment,
        name: user?.user?.name || "Anonymous", // Provide a default name if undefined
        profilePhoto: user?.user?.profilePhoto || "", // Provide a default value if undefined
      };
  
      // Optimistically update the comments
      const newCommentData: Comment = {
        _id: Date.now().toString(), // Temporary ID, replace with the actual ID after server response
        ...userData,
        createdAt: new Date(),
        user: ""
      };
  
      setRecipeData((prevData) => {
        if (!prevData) return prevData; // Ensure prevData is not null
  
        return {
          ...prevData,
          comments: [newCommentData, ...prevData.comments], // Add new comment to the beginning
        };
      });
  
      setNewComment(""); // Clear the input field
  
      // Send the comment to the server
      await handleAddComment(userData);
      // Optionally, you can refetch the recipe data after adding the comment
      // fetchRecipe();
    }
  };

  console.log(recipeData?.comments, "************");
  if (!recipeData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <div className=" bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-black">
          {recipeData.title}
        </h1>
        <div className="flex">
          <div className="w-2/3 pr-4">
            <Image
              src={recipeData.image}
              width={500}
              height={300}
              alt="Recipe Image"
              className="rounded-lg w-full"
            />
            <p className="text-gray-700 mb-4">{recipeData.description}</p>
          </div>
          <div className="w-1/3">
            <h2 className="text-xl font-semibold mb-2 text-black">
              Ingredients:
            </h2>
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
          <h2 className="text-xl font-semibold mb-2 text-black">
            Instructions:
          </h2>
          <p className="text-gray-600">{recipeData.instructions}</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-black">
            Average Rating: {recipeData.averageRating} ★
          </span>
          <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg px-4 py-2">
            Rate Recipe
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-black">Comments:</h2>
          <form onSubmit={handleCommentSubmit} className="flex space-x-2 mb-5">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow border border-gray-300 rounded-lg p-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
              Comment
            </button>
          </form>
          <div className="space-y-4 mb-6">
            {recipeData.comments
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((comment) => (
                <div
                  key={comment._id}
                  className="border p-4 rounded-lg text-black flex space-x-3"
                >
                  <Image
                    width={50}
                    height={50}
                    src={comment.profilePhoto}
                    alt={`${comment.name}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{comment.name}</span>
                      <span className="text-gray-500 text-sm">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
