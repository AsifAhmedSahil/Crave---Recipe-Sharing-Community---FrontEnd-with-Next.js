/* eslint-disable prettier/prettier */
import { z } from 'zod';

const resetPasswordValidationSchema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .nonempty('Password is required'),
  
})

export default resetPasswordValidationSchema;
