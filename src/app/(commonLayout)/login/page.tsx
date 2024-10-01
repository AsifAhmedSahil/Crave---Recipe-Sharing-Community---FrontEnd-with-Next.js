/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
'use client'
import Form from '@/src/components/form/Form'
import FormInput from '@/src/components/form/FormInput'
import { Button } from '@nextui-org/button'
import loginGif from "@/src/Animation - 1727687940332.json"
import Lottie from 'lottie-react'
import Link from 'next/link'
import React from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from '@/src/schemas/login.schema'

const LoginPage = () => {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
      };
  return (
    <div className="flex h-[calc(100vh-200px)] w-full   items-center justify-center ">
      <div className='w-full lg:w-1/2   text-center py-8'>
      <h3 className="my-2 text-2xl font-bold">Login </h3>
      <p className="mb-4">Welcome Back To Crave Let&lsquo;s Dive In...</p>
      <div className="w-[80%] mx-auto ">
        <Form
          onSubmit={onSubmit}
          resolver={zodResolver(loginValidationSchema)}
          defaultValues={{
            name:"Asif",
            email:"asif@gmail.com",
            password:"123456"
          }}
          
        >
          
          
          <div className="py-3">
            <FormInput name="email" label="Email" type="email" />
          </div>
          <div className="py-3">
            <FormInput name="password" label="Password" type="password" />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Login
          </Button>
        </Form>
        <div className="text-center">
          Don&lsquo;t have account ? <Link href={"/register"}><span className='text-red-600 font-bold '>Register</span></Link>
        </div>
      </div>
      </div>

      <div className="hidden md:flex md:w-1/2  items-center justify-center ">
      <div className='w-96 h-96 -mt-96'>

        <Lottie   animationData={loginGif} />
      </div>
      </div>
    </div>
  )
}

export default LoginPage