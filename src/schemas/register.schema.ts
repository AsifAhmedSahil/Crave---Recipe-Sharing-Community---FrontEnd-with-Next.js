/* eslint-disable prettier/prettier */
import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  username: z.string().min(1,"Please enter a valid user name"),
  email: z.string().email("Please enter a valid Email"),
  
  password: z.string().min(6, "Must be at least 6 characters."),
});

export default registerValidationSchema;