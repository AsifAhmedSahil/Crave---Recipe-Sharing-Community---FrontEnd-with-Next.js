/* eslint-disable prettier/prettier */
"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";

import { cookies } from "next/headers";
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
