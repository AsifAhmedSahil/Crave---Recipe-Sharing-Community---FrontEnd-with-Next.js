/* eslint-disable prettier/prettier */
"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const registerAdmin = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/adminRegister", userData);

    

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const forgotPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      userData
    );

    console.log(data);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
// export const resetPassword = async (userData: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.post("/auth/reset-password", userData);

//     console.log(data)

//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

export const resetPassword = async (userData: FieldValues, token: string) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      userData,
      {
        headers: {
          Authorization: token, // Set the token here
        },
      }
    );

    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

// update user profile
export const updateUser = async (userData: FieldValues, id: string) => {
  try {
    const { data } = await axiosInstance.patch(`users/${id}`, userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const deleteUser = async ( id: string) => {
  try {
    const { data } = await axiosInstance.delete(`users/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const blockUser = async ( id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}/block`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};


export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      username: decodedToken.username,
      role: decodedToken.role,
      profilePhoto: decodedToken.profilePhoto,
      status: decodedToken.status,
      bio: decodedToken.bio,
      type: decodedToken.type,
      followerIds: decodedToken.followerIds, // Added followerIds
      followingIds: decodedToken.followingIds, // Added followingIds
    };
  }

  return decodedToken;
};
