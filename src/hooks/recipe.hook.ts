/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { addComment } from "../services/recipeServices";
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