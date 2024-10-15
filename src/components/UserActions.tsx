/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";

import React from 'react';

import { MdDelete } from "react-icons/md";
import { MdBlock } from "react-icons/md";

interface UserActionsProps {
    userId: string;
    onBlockUser: (userId: string) => void;
    onDeleteUser: (userId: string) => void;
  }
const UserActions = ({ userId, onBlockUser, onDeleteUser }:UserActionsProps) => {
  const handleBlockUser = () => {
    onBlockUser(userId);
    
  };

  const handleDeleteUser = () => {
    onDeleteUser(userId);
   
  };

  return (
    <td className="py-2 text-center flex items-center justify-center">
    <button
      onClick={handleBlockUser}
      className="mr-2 text-yellow-600  rounded-xl px-2 py-1"
    >
      <div className="flex justify-center gap-2 items-center">
        Block
        <MdBlock />
      </div>
    </button>
    <button onClick={handleDeleteUser} className="text-red-600">
      <div className="flex justify-center gap-2 items-center">
        Delete
        <MdDelete className="size-5" />
      </div>
    </button>
  </td>
  );
};

export default UserActions;
