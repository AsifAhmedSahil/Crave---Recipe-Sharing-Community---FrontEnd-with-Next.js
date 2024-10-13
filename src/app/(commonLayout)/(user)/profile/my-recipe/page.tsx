/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
'use client'
import { useUser } from "@/src/context/user.provider";
import React from "react";

const MyRecipe = async () => {
  const { user } = useUser();
  console.log(user?._id);
  const res = await fetch("http://localhost:5000/api/v1/items/recipes",{
    cache:"no-store"
})

const {data} = await res.json()
console.log(data)
  // const res = await fetch(
  //   `http://localhost:5000/api/v1/items/recipe/my-recipe/${user?._id}`,
  //   {
  //     cache: "no-store",
  //   }
  // );
  // const { data } = await res.json();
  // console.log(data);
  return <div>MyRecipe</div>;
};

export default MyRecipe;
