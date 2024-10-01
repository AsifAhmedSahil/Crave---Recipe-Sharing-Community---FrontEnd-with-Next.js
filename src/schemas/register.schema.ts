/* eslint-disable prettier/prettier */
import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  username: z.string(), // Keep this if you need it; otherwise, you can remove it.
  email: z.string().email("Please enter a valid email address!"),
  
  password: z.string().min(6, "Must be at least 6 characters."),
  profilePhoto: z.string().optional(), // Mark this as optional if it's not required
});

export default registerValidationSchema;



/* eslint-disable prettier/prettier */
// import { z } from "zod";

// const registerValidationSchema = z.object({
//   name: z.string().min(1, "Please enter your name!"),
//   email: z.string().email("Please enter a valid email address!"),
//   mobileNumber: z
//     .string()
//     .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
//   password: z.string().min(6, "Must be at least 6 characters."),
// });

// export default registerValidationSchema;