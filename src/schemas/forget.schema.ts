/* eslint-disable prettier/prettier */
// src/schemas/forgotPassword.schema.js

import { z } from 'zod';

const forgotPasswordValidationSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
});

export default forgotPasswordValidationSchema;
