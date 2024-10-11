/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

const UserDashboard = () => {
  const userData = {
    name: "Asif",
    username: "asif007",
    email: "user2@gmail.com",
    profilePhoto:
      "https://res.cloudinary.com/djbpo9xg5/image/upload/v1728660454/yqwhnxncvnxueunxtk71.jpg",
    followerCount: 10,
    followingCount: 5,
    bio: "Welcome to my profile! I love coding and sharing knowledge.",
    recipes: [
      {
        id: 1,
        title: "Spaghetti Bolognese",
        description: "A classic Italian pasta dish.",
      },
      {
        id: 2,
        title: "Chicken Curry",
        description: "Spicy and flavorful chicken dish.",
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      {/* Profile Header */}
      <div className=" p-4 rounded-lg shadow-md flex items-center mb-6">
        <Image
          src={userData.profilePhoto}
          alt="Profile Photo"
          width={100}
          height={100}
          className="rounded-full border-4 border-blue-500"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-gray-600">@{userData.username}</p>
          <p className="text-gray-500">{userData.bio}</p>
          <div className="mt-2">
            <span className="text-gray-700">
              Followers: {userData.followerCount}
            </span>
            <span className="mx-2">|</span>
            <span className="text-gray-700">
              Following: {userData.followingCount}
            </span>
          </div>
        </div>
      </div>

      {/* User Recipes (Posts) */}
      <div className=" p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">My Recipes</h2>
        {userData.recipes.slice(0, 2).map((recipe) => (
          <div key={recipe.id} className="border-b py-4 last:border-b-0">
            <h3 className="text-lg font-bold">{recipe.title}</h3>
            <p className="text-gray-600">{recipe.description}</p>
            <Link href={`/recipe/${recipe.id}`}>
              <button className="mt-2 text-blue-500 hover:underline">
                View Recipe
              </button>
            </Link>
          </div>
        ))}
        {/* <Link href="/more-recipes">
          <button className="mt-4 text-blue-600 hover:underline">
            Get More Recipes
          </button>
        </Link> */}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          as={Link}
          href={"/dashboard/update-profile"}
          className="py-2 px-4 bg-blue-600  rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Manage Profile
        </Button>

        <Link href="/membership">
          <button className="py-2 px-4 bg-green-600  rounded-lg shadow hover:bg-green-700 transition duration-300">
            Get Membership
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
