/* eslint-disable prettier/prettier */
import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  username: z.string(), 
  email: z.string().email("Please enter a valid email address!"),
  
  password: z.string().min(6, "Must be at least 6 characters."),
  profilePhoto: z.string().optional(), 
});

export default registerValidationSchema;



