/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
"use client";
/* eslint-disable prettier/prettier */
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import React from "react";
import { logout } from "../services/AuthService";

const NavbarDropdown = () => {
  const router = useRouter();
  const handleNavigation = (pathName: string) => {
    router.push(pathName);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" name="Asif" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/profile/my-profile")}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/my-recipe")}>
          My Recipe
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/post-recipe")}>
          Post Recipe
        </DropdownItem>
        <DropdownItem onClick={()=> logout()}  className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
