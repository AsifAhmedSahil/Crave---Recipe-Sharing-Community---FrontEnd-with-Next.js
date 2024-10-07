/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
'use client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import Form from '@/src/components/form/Form';
import FormInput from '@/src/components/form/FormInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import resetPasswordValidationSchema from '@/src/schemas/reset.schema'; // Adjust the path as necessary

const ResetPassword = () => {
    // const router = useRouter();
    // const { email, token } = router.query;

    // Check if the router query is available
    // if (!email || !token) {
    //     return <div>Loading...</div>; 
    // }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordValidationSchema),
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        // Handle the password reset API call here
    };

    return (
        <div className="flex h-full w-full items-center justify-center ">
            <div className="w-full max-w-md p-8  rounded-lg shadow-md">
                <h3 className="my-2 text-2xl font-bold text-center">Reset Password</h3>
                <p className="mb-4 text-center">Enter your new password.</p>
                <Form onSubmit={onSubmit}
                resolver={zodResolver(resetPasswordValidationSchema)}
                > {/* Use handleSubmit directly */}
                    <div className="py-3">
                        <FormInput
                            name='email'
                            label="Email"
                            type="email"
                            required
                            
                            // errorMessage={errors.password?.message} // Handle error messages
                        />
                    </div>
                    <div className="py-3">
                        <FormInput
                        name='password'
                            label="New Password"
                            type="password"
                            required
                            
                            // errorMessage={errors.password?.message} // Handle error messages
                        />
                    </div>
                    
                    <Button
                        className="my-3 w-full rounded-md bg-blue-600 text-white font-semibold"
                        size="lg"
                        type="submit"
                    >
                        Reset Password
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;


// import React from 'react'

// const ResetPassword = () => {
//   return (
//     <div>ResetPassword</div>
//   )
// }

// export default ResetPassword