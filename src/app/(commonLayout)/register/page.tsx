"use client";
import Form from "@/src/components/form/Form";
import FormInput from "@/src/components/form/FormInput";
import { Button } from "@nextui-org/button";
import loginGif from "@/src/Animation - 1727688639002.json";
import Lottie from "lottie-react";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerValidationSchema from "@/src/schemas/register.schema";

const RegisterPage = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
