/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
'use client';

import { Button } from '@nextui-org/button';
import FormInput from '@/src/components/form/FormInput'; // Ensure this path is correct
import Form from '@/src/components/form/Form'; // Ensure this path is correct
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import forgotPasswordValidationSchema from '@/src/schemas/forget.schema';
import { useForgetPassword } from '@/src/hooks/auth.hook';
 // Add this validation schema

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordValidationSchema),
  });

  const {mutate: handleForgotPassword ,isPending,isSuccess} = useForgetPassword()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    handleForgotPassword(data)
  };

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="w-full max-w-md p-8  rounded-lg shadow-md">
        <h3 className="my-2 text-2xl font-bold text-center">Forgot Password</h3>
        <p className="mb-4 text-center">Enter your email to receive a password reset link.</p>
        <Form onSubmit={onSubmit}
        resolver={zodResolver(forgotPasswordValidationSchema)}
        >
          <div className="py-3">
            <FormInput
              name="email"
              label="Email"
              type="email"
              required
            />
            
          </div>
          <Button
            className="my-3 w-full rounded-md bg-blue-600 text-white font-semibold"
            size="lg"
            type="submit"
          >
            Send Reset Link
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
