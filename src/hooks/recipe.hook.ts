/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { addComment, deleteRecipe, followUser, postRecipe, ratingRecipe, unFollowUser } from "../services/recipeServices";
import { toast } from "sonner";

export const useAddComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: async (userData) => await addComment(userData),
    onSuccess: () => {
      toast.success("Commented this recipe");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useAddRating = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_RATING"],
    mutationFn: async (ratingData) => await ratingRecipe(ratingData),
    onSuccess: () => {
      toast.success("Rate this recipe");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddRecipe = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_RECIPE"],
    mutationFn: async (postData) => await postRecipe(postData),
    // onSuccess: () => {
    //   toast.success("Post this recipe Successfully");
    // },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteRecipe = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async (id) => await deleteRecipe(id),
    onSuccess: () => {
      toast.success("Recipe Deleted Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useFollowUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FOLLOW"],
    mutationFn: async (userData) => await followUser(userData),
    onSuccess: () => {
      toast.success("Following...");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUnFollowUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UNFOLLOW"],
    mutationFn: async (userData) => await unFollowUser(userData),
    onSuccess: () => {
      toast.success("unfollow user...");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};