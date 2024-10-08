/* eslint-disable padding-line-between-statements */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { forgotPassword, loginUser, registerUser, resetPassword } from "../services/AuthService";
import { toast } from "sonner";

/* eslint-disable prettier/prettier */
export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGGEDIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User Logged in successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_FORGOT_PASSWORD"],
    mutationFn: async (userData) => await forgotPassword(userData),
    onSuccess: () => {
      toast.success("Check Your Email.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// export const useResetPassword = () => {
//   return useMutation<any, Error, FieldValues>({
//     mutationKey: ["USER_RESET_PASSWORD"],
//     mutationFn: async (userData) => await resetPassword(userData),
//     onSuccess: () => {
//       toast.success("Password Reset Successfully!");
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };

export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_RESET_PASSWORD"],
    mutationFn: async (userData) => {
      const { email, password, token } = userData; // Destructure to get token
      return await resetPassword({ email, password }, token); // Pass token in the function
    },
    onSuccess: () => {
      toast.success("Password Reset Successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

