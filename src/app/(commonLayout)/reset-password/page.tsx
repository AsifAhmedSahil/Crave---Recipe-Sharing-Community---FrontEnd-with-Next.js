/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import Form from '@/src/components/form/Form';
import FormInput from '@/src/components/form/FormInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import resetPasswordValidationSchema from '@/src/schemas/reset.schema'; // Adjust the path as necessary
import { useResetPassword } from '@/src/hooks/auth.hook';

const ResetPassword = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordValidationSchema),
    });

    const { mutate: handleResetPassword, isPending } = useResetPassword();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailFromQuery = params.get('email');
        const tokenFromQuery = params.get('token');

        if (emailFromQuery && tokenFromQuery) {
            setEmail(emailFromQuery);
            setToken(tokenFromQuery);
        }
    }, []);

    // Check if email and token are available before rendering the form
    if (!email || !token) {
        return <div>Loading...</div>;
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(email,data.password,token ,data)
        handleResetPassword({ 
            email, 
            password: data.password, 
            token 
        });
    };

    return (
        <div className="flex h-full w-full items-center justify-center ">
            <div className="w-full max-w-md p-8 rounded-lg shadow-md">
                <h3 className="my-2 text-2xl font-bold text-center">Reset Password</h3>
                <p className="mb-4 text-center">Enter your new password.</p>
                <Form onSubmit={onSubmit}
          resolver={zodResolver(resetPasswordValidationSchema)}>
                    <div className="py-3">
                        <FormInput
                            name='email'
                            label="Email"
                            type="email"
                            required
                            // defaultValue={email} // Set default value from URL
                            // readOnly // Make it read-only
                        />
                    </div>
                    <div className="py-3">
                        <FormInput
                            name='password'
                            label="New Password"
                            type="password"
                            required
                        />
                    </div>
                    
                    <Button
                        className="my-3 w-full rounded-md bg-blue-600 text-white font-semibold"
                        size="lg"
                        type="submit"
                        disabled={isPending} // Disable while pending
                    >
                        {isPending ? "Resetting..." : "Reset Password"}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;


