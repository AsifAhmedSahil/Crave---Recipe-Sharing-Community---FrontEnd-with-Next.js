/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client";

import { useUser } from "@/src/context/user.provider";
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

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (user?._id) {
      fetchUserData();
      fetchUserPosts();
    }
  }, [user,page]);

  const fetchUserData = async () => {
    const res = await fetch(`http://localhost:5000/api/v1/users/${user?._id}`);
    const { data } = await res.json();
    setUserData(data);
  };

  const fetchUserPosts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/v1/items/recipe/my-recipe/${user?._id}`
    );
    const data = await res.json();
    console.log(data);
    setPosts(data.data);
  };

  const handleInfiniteScroll =async () =>{
    console.log(window.innerHeight)
    try {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
        ) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.log(error);
      }
     
  }

  useEffect(() =>{
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  },[])

  if (!userData) return <div>Loading...</div>;
  console.log(posts);
  // eslint-disable-next-line padding-line-between-statements
  return (
    <div className="flex max-w-7xl mx-auto p-4">
      {/* User Information Section */}
      <div className="w-1/3 p-4  rounded shadow-md">
        <img
          src={userData.profilePhoto}
          alt="Profile"
          className="rounded-full w-32 h-32 mx-auto"
        />
        <h2 className="text-2xl font-bold text-center mb-6">{userData.name}</h2>
        <p className=" text-center mb-6">@{userData.username}</p>
        <p className="text-center">{userData.bio}</p>
        
        <div className="mt-4 text-center  flex gap-2 justify-center">
          <p>{userData.followerIds.length} Followers</p> |
          <p>{userData.followingIds.length} Following</p>
        </div>
      </div>

      {/* Posts Section */}
      {/* <ProfileData  id={user?._id}/> */}
      <div
        className="w-2/3 p-4  rounded shadow-md overflow-y-scroll"
        style={{ maxHeight: "80vh" }}
      >
        <h3 className="text-xl font-semibold mb-4">My Posts</h3>

        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className=" rounded p-4 mb-4 shadow my-12 border border-gray-400">
              <h4 className="text-lg font-bold">{post.title}</h4>
              <p className="text-gray-600">{post.description}</p>
              <p className="mt-2">
                <strong>Cooking Time:</strong> {post.cookingTime} minutes
              </p>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded mt-2"
              />
              
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
