/* eslint-disable prettier/prettier */
"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addComment = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/items/addComment", userData);

    revalidateTag("recipes")

    

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};