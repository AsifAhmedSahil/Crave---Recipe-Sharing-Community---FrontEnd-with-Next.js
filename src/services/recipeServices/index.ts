/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use server";

import axiosInstance from "@/src/lib/AxiosInstance";



import { FieldValues } from "react-hook-form";

export const addComment = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/items/addComment", userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ratingRecipe = async (ratingData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/items/rating", ratingData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postRecipe = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/items/recipes", postData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const deleteRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/items/recipe/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const deleteComment = async (userData:FieldValues) => {
  try {
    const { data } = await axiosInstance.delete(`items/${userData.recipeId}/comment/${userData.commentId}/${userData.userId}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateRecipe = async (id: string,userData: FieldValues) => {
  console.log(id,userData)
  try {
    const { data } = await axiosInstance.put(`/items/recipe/${id}`,userData);

    return data;
  } catch (error: any) {
    return {
      success: false,
      //* you can return error message from here
      message: error,
    }
  }
};
export const followUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("users/follow",userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const unFollowUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("users/unfollow",userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const upvoteRecipe = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("items/recipe/upvote",userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const downvoteRecipe = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("items/recipe/downvote",userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const paymentUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("payment/create-payment",userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
