/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use client";
import { useUser } from "@/src/context/user.provider";
import {
  useAddComment,
  useAddRating,
  useDeleteComment,
  useDownvoteRecipe,
  useFollowUser,
  useUnFollowUser,
  useUpvoteRecipe,
} from "@/src/hooks/recipe.hook";
import Image from "next/image";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { FaClock } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import Loading from "@/src/components/Loading";

interface Ingredient {
  _id: string;
  name: string;
  quantity: string;
}

interface Comment {
  _id: string;
  userId: string;
  content: string;
  name: string;
  profilePhoto: string;
  createdAt: Date;
}
interface upvote {
  _id: string;
}
interface downvote {
  _id: string;
}
interface Rating {
  _id: string;
  userId: string;
  recipeId: string;
  stars: number;
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
  upvotes: upvote[];
  downvotes: downvote[];
  tags: string[];
  cookingTime: number;
}
interface UserData {
  _id: string;
  followerIds: string[];
  followingIds: string[];
  role: string;
}
interface IUserContextProps {
  _id: string;
  name: string;
  email: string;
}

const RecipeDetails = ({ params }: { params: { recipeId: string } }) => {
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState<number>(0);
  const user = useUser();
  const { mutate: handleAddComment } = useAddComment();
  const { mutate: handleUpvoteRecipe } = useUpvoteRecipe();
  const { mutate: handleDownvoteRecipe } = useDownvoteRecipe();
  const { mutate: handleAddRating, data: ratingData } = useAddRating();
  const { mutate: handleDeleteComment, data: commentData } = useDeleteComment();
  const { mutate: handleFollowUser } = useFollowUser();
  const { mutate: handleUnFollowUser } = useUnFollowUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const fetchRecipe = async () => {
    const res = await fetch(
      `https://crave-server-assignment-6.vercel.app/api/v1/items/recipe/${params.recipeId}`,
      { cache: "no-store" }
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
    setHasUpvoted(data.upvotes.includes(user?.user?._id));
    setHasDownvoted(data.downvotes.includes(user?.user?._id));
  };

  useEffect(() => {
    fetchRecipe();
  }, [params.recipeId, rating]);

  useEffect(() => {
    if (recipeData?.averageRating) {
      fetchRecipe();
    }
  }, [recipeData?.averageRating, rating]);

  console.log(user, recipeData);

  const fetchUser = async () => {
    const res = await fetch(
      `https://crave-server-assignment-6.vercel.app/api/v1/users/${recipeData?.creator}`,
      {
        cache: "no-store",
      }
    );
    const { data } = await res.json();
    setUserData(data);
    if (data.followerIds.includes(user?.user?._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  };

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    if (newComment.trim() && recipeData) {
      const userData = {
        recipeId: recipeData._id,
        userId: user?.user?._id,
        content: newComment,
        name: user?.user?.name || "Anonymous",
        profilePhoto: user?.user?.profilePhoto || "",
      };

      const newCommentData: Comment = {
        _id: Date.now().toString(),
        ...userData,
        createdAt: new Date(),
        // user: "",
      };

      setRecipeData((prevData) => {
        if (!prevData) return prevData;

        return {
          ...prevData,
          comments: [newCommentData, ...prevData.comments],
        };
      });

      setNewComment("");

      await handleAddComment(userData);
    }
  };

  const handleUpvote = () => {
    const userData = {
      recipeId: recipeData?._id,
      userId: user?.user?._id,
    };

    if (hasUpvoted) {
      handleDownvoteRecipe(userData);
      setHasUpvoted(false);
    } else {
      handleUpvoteRecipe(userData);
      setHasUpvoted(true);
      if (hasDownvoted) {
        setHasDownvoted(false);
      }
    }

    fetchRecipe();
  };

  const handleDownvote = () => {
    const userData = {
      recipeId: recipeData?._id,
      userId: user?.user?._id,
    };

    if (hasDownvoted) {
      handleDownvoteRecipe(userData);
      setHasDownvoted(false);
    } else {
      handleDownvoteRecipe(userData);
      setHasDownvoted(true);
      if (hasUpvoted) {
        setHasUpvoted(false);
      }
    }

    fetchRecipe();
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
      _id: recipeData?.creator,
      recipeId: recipeData?._id,
      userId: user?.user?._id,
      stars: rating,
    };
    console.log("Rating submitted:", ratingData);

    setRating(ratingData.stars);
    handleAddRating(ratingData);
  };

  const deleteComment = async (id: string) => {
    const userData = {
      userId: user?.user?._id,
      commentId: id,
      recipeId: recipeData?._id,
    };
  
    try {
      
      await handleDeleteComment(userData);
  
      
      setRecipeData((prevData) => {
        if (!prevData) return prevData;
  
        return {
          ...prevData,
          comments: prevData.comments.filter(comment => comment._id !== id),
        };
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };
  

  if (!recipeData) return <Loading />;

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
                onChange={(e) => setRating(Number(e.target.value))}
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
            <button onClick={handleUpvote} className="text-green-500">
              Upvote ({recipeData.upvotes.length + (hasUpvoted ? 1 : 0)})
            </button>
            <button onClick={handleDownvote} className="text-red-500">
              Downvote ({recipeData.downvotes.length + (hasDownvoted ? 1 : 0)})
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
                  className="border p-4 rounded-lg text-black flex space-x-3 justify-between"
                >
                  
                  <div className="flex space-x-3">
                    <Image
                      width={50}
                      height={50}
                      src={comment.profilePhoto}
                      alt={`${comment.name}'s profile`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="">
                      <div className="flex items-center space-x-2 ">
                        <span className="font-bold">{comment.name}</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1">{comment.content}</p>
                    </div>
                  </div>
                  {user?.user?._id === comment.userId && <button onClick={()=>deleteComment(comment._id)}>Delete</button>}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
