/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use client";
import { useUser } from "@/src/context/user.provider";
import {
  useAddComment,
  useAddRating,
  useFollowUser,
  useUnFollowUser,
} from "@/src/hooks/recipe.hook";
import { getCurrentUser } from "@/src/services/AuthService";
import Image from "next/image";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { FaClock } from "react-icons/fa";
import { Button } from "@nextui-org/button";

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
interface upvote {
  _id: string;
}
interface Rating {
  _id: string; // Unique identifier for the rating
  userId: string; // ID of the user who rated the recipe
  recipeId: string; // ID of the recipe that was rated
  stars: number; // Rating value (e.g., 1 to 5)
}

interface RecipeData {
  _id: string;
  title: string;
  image: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  creator: string;
  averageRating: number;
  comments: Comment[];
  ratings: Rating[];
  upvotes: upvote[]; // New field for upvotes
  downvotes: number;
  tags: string[]; // Array of tags (e.g., ["Vegetarian", "Gluten-Free"])
  cookingTime: number;
}
interface UserData {
  _id: string;
  followerIds: string[];
  followingIds: string[];
  role: string;
}

const RecipeDetails = ({ params }: { params: { recipeId: string } }) => {
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState("");
  const user = useUser();
  const { mutate: handleAddComment } = useAddComment();
  const { mutate: handleAddRating } = useAddRating();
  const { mutate: handleFollowUser } = useFollowUser();
  const { mutate: handleUnFollowUser } = useUnFollowUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isFollowing, setIsFollowing] = useState(false); 

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/items/recipe/${params.recipeId}`,
        {
          cache: "no-store",
        }
      );
      const { data } = await res.json();
      const sanitizedDescription = DOMPurify.sanitize(data.description);
      const sanitizedInstruction = DOMPurify.sanitize(data.instructions);
      const description = parse(sanitizedDescription);
      const instructions = parse(sanitizedInstruction);
      const updatedData = {
        ...data,
        description,
        instructions,
      };
      console.log(updatedData);
      setRecipeData(updatedData);
    };

    fetchRecipe();
  }, [params.recipeId]);

  console.log(user, userData);

  const fetchUser = async () => {
    const res = await fetch(
      `http://localhost:5000/api/v1/users/${recipeData?.creator}`,
      {
        cache: "no-store",
      }
    );
    const { data } = await res.json();
    setUserData(data);
    if (data.followerIds.includes(user?.user?._id)) {
      setIsFollowing(true); // Set follow state if following
    } else {
      setIsFollowing(false); // Set follow state if not following
    }
  };

  

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
        user: "",
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

  const handleUpvote = () => {
    setRecipeData((prevData) => {
      if (!prevData) return prevData;
      const upvoteData = {
        recipeId: recipeData?._id,
        userId: user?.user?._id,
      };

      return {
        ...prevData,
        upvotes: [...prevData.upvotes],
      };
    });

    // Optionally, send the upvote to the backend
  };

  const handleDownvote = () => {
    setRecipeData((prevData) => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        downvotes: prevData.downvotes + 1,
      };
    });

    // Optionally, send the downvote to the backend
  };
  const handleFollow = () => {
    const userData = {
      followerId: user?.user?._id,
      followingId: recipeData?.creator,
    };
    console.log(userData);
    handleFollowUser(userData);
    setIsFollowing(true); 
  };
  const handleunfollow = () => {
    const userData = {
      followerId: user?.user?._id,
      followingId: recipeData?.creator,
    };
    console.log(userData);
    handleUnFollowUser(userData);
    setIsFollowing(false); 
  };

  const handleRatingSubmit = (e: any) => {
    e.preventDefault();
    const ratingData = {
      recipeId: recipeData?._id,
      userId: user?.user?._id,
      stars: parseInt(rating),
    };
    console.log("Rating submitted:", ratingData);
    // Here, you can also send the rating to the backend if needed
    setRating(""); // Clear the input field after submission
    handleAddRating(ratingData);
  };

  // console.log(recipeData?.creator, "************");
  if (!recipeData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <div className=" bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-black">
          {recipeData.title}
        </h1>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 pr-4">
            <Image
              src={recipeData.image}
              width={500}
              height={300}
              alt="Recipe Image"
              className="rounded-lg w-full"
            />
            <p className="text-gray-700 mb-4">{recipeData.description}</p>
          </div>
          <div className="w-full lg:w-1/3 ">
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
            <h2 className="text-xl font-semibold mb-2 text-black mt-8 flex gap-2">
              <div className="flex justify-center items-center gap-2">
                Cooking Time <FaClock />{" "}
              </div>
              : <div>{recipeData.cookingTime} Minutes</div>
            </h2>
            <div className="mb-4 mt-4">
              {recipeData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-200 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            {isFollowing ? (
          <Button onClick={handleunfollow}>Unfollow</Button>
        ) : (
          <Button onClick={handleFollow}>Follow</Button>
        )}

            {/* <Button onClick={handleunfollow}>Unfollow</Button> */}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Instructions:
          </h2>
          <p className="text-gray-600">{recipeData.instructions}</p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <div className="flex gap-4 items-center flex-col lg:flex-row ">
            <span className="text-lg font-semibold text-black">
              Average Rating: {recipeData.averageRating} ⭐
            </span>

            <form onSubmit={handleRatingSubmit} className="flex space-x-2">
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rate (1-5)"
                className="border border-gray-300 rounded-lg p-2 w-48"
                required
              />
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg px-4 py-2"
              >
                Review
              </button>
            </form>
          </div>
          <div className="flex space-x-4">
            <button
              // onClick={handleUpvote}
              className="text-green-500"
            >
              Upvote
              {/* ({recipeData.upvotes}) */}
            </button>
            <button
              // onClick={handleDownvote}
              className="text-red-500"
            >
              Downvote
              {/* ({recipeData.downvotes}) */}
            </button>
          </div>
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
