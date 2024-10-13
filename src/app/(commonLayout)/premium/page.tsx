/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
// components/PaymentForm.tsx
'use client'
import { useUser } from '@/src/context/user.provider';
import { usePaymentUser } from '@/src/hooks/recipe.hook';
import React, { useState } from 'react';

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    amount: 0,
    phoneNumber: '',
  });

  const { mutate: handlePayment,data } = usePaymentUser();
  const user = useUser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData ={
      ...formData,
      amount:399,
      userId:user.user?._id
    }
    console.log(userData); 
    handlePayment(userData)
    
  };
  if(data){
    window.location.href = data?.data?.payment_url
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 rounded shadow-md">
      <h2 className="text-2xl text-center font-semibold my-12">Payment Information</h2>
      <p className="text-lg text-center  mb-4">
        One month subscription only 399 Taka
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={399} // Fixed amount
          readOnly // Make the field read-only
          className="w-full p-2 border  rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Proceed to Payment
      </button>
    </form>
  );
};

export default PaymentForm;
