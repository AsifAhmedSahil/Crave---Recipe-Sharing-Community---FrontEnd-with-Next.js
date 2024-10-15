/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
'use client'
import UserActions from '@/src/components/UserActions'
import { useBlockUser, useDeleteUser } from '@/src/hooks/auth.hook'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

const AllUser =() => {
    const [users, setUsers] = useState<any[]>([]);

    const { mutate: handleDeleteUser } = useDeleteUser();
    const { mutate: handleBlockUser } = useBlockUser();
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://crave-server-assignment-6.vercel.app/api/v1/users/", { cache: "no-store" });
      const { data } = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, [users]);


    const blockUser = async (userId: string) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "Are You want to block this user?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Block it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            handleBlockUser({id: userId})
          
          } catch (err:any) {
            toast.error('Failed to delete booking',err);
          }

        }
      });
      };
    
   
      const DeleteUser = async (userId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                handleDeleteUser({id: userId})
              
              } catch (err:any) {
                toast.error('Failed to delete booking',err);
              }
  
            }
          });
      };

    
  return (
    <div>
      <h2 className='text-center text-3xl lg:text-5xl font-bold mt-8 lg:mb-16'>All User</h2>
        {
            <div className="overflow-x-auto">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="py-2">Image</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
              {users.map((user:any) => (
              <tr key={user._id} className="border-b ">
                <td className="py-2 px-4 ">
                  <div className='flex justify-center items-center'>
                  <img
                    src={user.profilePhoto}
                    alt={user.name}
                    className="h-10 w-10 rounded-full border border-gray-300  "
                  />
                  </div>
                </td>
                <td className="py-2 px-4  text-center">{user.name}</td>
                <td className="py-2 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    user.status === "ACTIVE" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <UserActions 
                userId={user._id} 
                onBlockUser={blockUser} 
                onDeleteUser={DeleteUser} 
              />
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        }
    </div>
  )
}

export default AllUser