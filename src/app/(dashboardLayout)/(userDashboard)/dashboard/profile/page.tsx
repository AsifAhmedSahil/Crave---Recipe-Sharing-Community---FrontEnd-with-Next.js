/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
'use client'
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserData {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  profilePhoto: string;
  followerIds: string[];
  followingIds: string[];
}
interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
  cookingTime: number;
}

const UserDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?._id) {
      fetchUserData();
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserData = async () => {
    const res = await fetch(`https://crave-server-assignment-6.vercel.app/api/v1/users/${user?._id}`);
    const { data } = await res.json();
    setUserData(data);
  };

  const fetchUserPosts = async () => {
    const res = await fetch(
      `https://crave-server-assignment-6.vercel.app/api/v1/items/recipe/my-recipe/${user?._id}`
    );
    const data = await res.json();
    console.log(data);
    setPosts(data.data);
  };

  


  return (
    <div className="max-w-3xl mx-auto p-6 ">
      
      <div className=" p-4 rounded-lg shadow-md flex items-center mb-6">
        <Image
          src={userData?.profilePhoto as string}
          alt="Profile Photo"
          width={100}
          height={100}
          className="rounded-full border-4 border-blue-500"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{userData?.name}</h1>
          <p className="text-gray-600">@{userData?.username}</p>
          <p className="text-gray-500">{userData?.bio}</p>
          <div className="mt-2">
            <span className="text-gray-700">
              Followers: {userData?.followerIds.length}
            </span>
            <span className="mx-2">|</span>
            <span className="text-gray-700">
              Following: {userData?.followingIds.length}
            </span>
          </div>
        </div>
      </div>

     
      <div className=" p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">My Recipes</h2>
        {posts.slice(0, 2).map((recipe) => (
          <div key={recipe._id} className="border-b py-4 last:border-b-0">
            <h3 className="text-lg font-bold">{recipe.title}</h3>
            <p className="text-gray-600">{recipe.description}</p>
            <Link href={`/recipe/${recipe._id}`}>
              <button className="mt-2 text-blue-500 hover:underline">
                View Recipe
              </button>
            </Link>
          </div>
        ))}
        
      </div>

    
      <div className="flex justify-between">
        <Button
          as={Link}
          href={"/dashboard/update-profile"}
          className="py-2 px-4 bg-blue-600  rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Manage Profile
        </Button>

        <Link href="/premium">
          <button className="py-2 px-4 bg-green-600  rounded-lg shadow hover:bg-green-700 transition duration-300">
            Get Membership
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
