/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { logout } from "../services/AuthService";
import { useUser } from "../context/user.provider";
import { protectedRoute } from "../constants/constants";
import { toast } from "sonner";


const NavbarDropdown = () => {
  const router = useRouter();
  const pathName = usePathname()
  const {setIsLoading,user} = useUser()

  const handleLogout = () =>{
    logout()
    setIsLoading(true)

    if(protectedRoute.some((route)=> pathName.match(route))){
      router.push("/")
    }

    toast.success("User Logged Out Successfully")

  }
  const handleNavigation = (pathName: string) => {
    router.push(pathName);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar src={user?.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/profile")}>
          Profile
        </DropdownItem>
        
        <DropdownItem onClick={()=> handleLogout()}  className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
