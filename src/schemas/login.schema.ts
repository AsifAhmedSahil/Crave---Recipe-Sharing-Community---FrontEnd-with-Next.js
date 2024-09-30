/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";


const loginValidationSchema = z.object({
    email: z.string().trim().email("type valid email"),
    password:z.string().trim().min(6,"At least 6 characters long")
})

export default loginValidationSchema