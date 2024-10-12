/* eslint-disable padding-line-between-statements */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { blockUser, deleteUser, forgotPassword, loginUser, registerAdmin, registerUser, resetPassword, updateUser } from "../services/AuthService";
import { toast } from "sonner";

/* eslint-disable prettier/prettier */
export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    // onSuccess: () => {
    //   toast.success("User registration successful.");
    // },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useAdminRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADMIN_REGISTRATION"],
    mutationFn: async (userData) => await registerAdmin(userData),
    // onSuccess: () => {
    //   toast.success("User registration successful.");
    // },
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
export const useUpdateUSer = () => {
  return useMutation<any, Error, { userData: any; id: string }>({
    mutationKey: ["USER_UPDATE_USER"],
    mutationFn: async ({userData,id}) => await updateUser(userData,id),
    
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, {  id: string }>({
    mutationKey: ["USER_DELETE_USER"],
    mutationFn: async ({id}) => await deleteUser(id),
    
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useBlockUser = () => {
  return useMutation<any, Error, {  id: string }>({
    mutationKey: ["USER_BLOCK_USER"],
    mutationFn: async ({id}) => await blockUser(id),
    
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

