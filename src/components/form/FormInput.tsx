/* eslint-disable prettier/prettier */
// /* eslint-disable import/order */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react/jsx-sort-props */
// 'use client'


// import { IInput } from "@/src/types";
// import { Input } from "@nextui-org/input";
// import { useFormContext } from "react-hook-form";

// interface IProps extends IInput{}

// export default function FormInput({
//   variant = "bordered",
//   size = "md",
//   required = false,
//   type = "text",
//   label,
//   name,
// }: IProps) {
//   const {
//     register,
//     formState:{errors}
    
//   } = useFormContext();

//   return (
//     <Input
//       {...register(name)}
//       errorMessage={errors[name] ? (errors[name].message as string) : ""}
//       isInvalid={!!errors[name]}
   
//       variant={variant}
//       size={size}
//       required={required}
//       type={type}
//       label={label}
//     />
//   );
// }
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
'use client';

import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

export default function FormInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <Input
      {...register(name)}
      errorMessage={errorMessage || ""}
      isInvalid={!!errorMessage}
      variant={variant}
      size={size}
      required={required}
      type={type}
      label={label}
    />
  );
}
