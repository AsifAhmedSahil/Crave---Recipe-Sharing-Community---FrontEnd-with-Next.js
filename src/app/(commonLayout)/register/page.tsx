/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */


"use client";
import Form from "@/src/components/form/Form";
import FormInput from "@/src/components/form/FormInput";
import { Button } from "@nextui-org/button";
import loginGif from "@/src/Animation - 1727688639002.json";
import Lottie from "lottie-react";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerValidationSchema from "@/src/schemas/register.schema";
import { toast } from "sonner";
import { registerUser } from "@/src/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useUserRegistration } from "@/src/hooks/auth.hook";

const RegisterPage = () => {

    const {mutate: handleRegistration} = useUserRegistration()


  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    if (!selectedFile) {
      setFileError("Please select an image file.");
    } else {
      setFileError(null);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!file) {
      setFileError("Please select an image file.");
      return;
    }

    const loadingToastId = "uploading-toast";
    toast.loading("Uploading photo, please wait...", { id: loadingToastId });

    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("upload_preset", "myCloud"); // Adjust as needed
    formData.append("cloud_name", "djbpo9xg5"); // Adjust as needed

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/djbpo9xg5/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataFromCloud = await response.json();
      const profilePhoto = dataFromCloud.secure_url;

      // Here, you can include the image URL in your registration data
    //   console.log({ ...data, profilePhoto }); 

      const userData = {
        ...data,profilePhoto
      }
      console.log(userData)
    //    handleRegistration(userData)
    handleRegistration(userData)
      
    //   if(isSuccess){

    //       toast.success("Registration successful", { id: loadingToastId });
    //   }

      // Navigate to login or another page here
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", { duration: 2000 });
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full items-center justify-center">
      <div className="w-full lg:w-1/2 text-center py-8">
        <h3 className="my-2 text-2xl font-bold">Register</h3>
        <p className="mb-4">Want To Create An Account? Let&lsquo;s Dive In...</p>
        <div className="w-[80%] mx-auto">
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(registerValidationSchema)}
            defaultValues={{
              name: "asif",
              username: "asif007",
              email: "asif@gmail.com",
              password: "123456",
            }}
          >
            <div className="py-3">
              <FormInput name="name" label="Name" type="text" />
            </div>
            <div className="py-3">
              <FormInput name="username" label="User Name" type="text" />
            </div>
            <div className="py-3">
              <FormInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <FormInput name="password" label="Password" type="password" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-white">Upload Your Photo</label>
              <input
                type="file"
                onChange={handleFileChange}
                className={`mt-1 block w-full px-3 py-2 border ${fileError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </Form>
          <div className="text-center">
            Want To Login?{" "}
            <Link href={"/login"}>
              <span className="text-red-600 font-bold">Login</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <div>
          <Lottie animationData={loginGif} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

