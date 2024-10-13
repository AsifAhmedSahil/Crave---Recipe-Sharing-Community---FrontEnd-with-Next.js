/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import logo from "@/src/assets/images/logo.jpg";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { GiQueenCrown } from "react-icons/gi";
import {
  
  SearchIcon,

} from "@/src/components/icons";
import Image from "next/image";
import NavbarDropdown from "./NavbarDropdown";
import { useUser } from "../context/user.provider";
import React, { useEffect, useState } from "react";
interface UserData {
  _id: string;
  followerIds: string[];
  followingIds: string[];
  role: string;
  type:string
}

export const Navbar = () => {
  const { user } = useUser();
  console.log(user,"****")
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:5000/api/v1/users/${user?._id}`, {
        cache: "no-store"
    });
    const { data } = await res.json();
    setUserData(data);
};

useEffect(() => {
  if (user?._id) {
    fetchUser();
  }
}, [user]);
console.log(userData)

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image src={logo} alt="logo" className="w-10 h-10 rounded-full" />
            <p className="font-bold text-inherit text-xl">Crave</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user?.email ? (
          <>
            {user.role === "USER" ? (
              <NavbarItem className="hidden sm:flex gap-2">
                <Link href={"/dashboard/profile"}>
                  <Button>Dashboard</Button>
                </Link>
              </NavbarItem>
            ) : (
              <NavbarItem className="hidden sm:flex gap-2">
                <Link href={"/admin-dashboard/all-user"}>
                  <Button>Dashboard</Button>
                </Link>
              </NavbarItem>
            )}
            {userData?.role === "USER"  && userData?.type === "GENERAL" ? (
            <NavbarItem className="hidden sm:flex gap-2 ">
            <Link href={"/premium"}>
              <Button className="bg-yellow-600">Try Premium</Button>
            </Link>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            {/* <Link href={"/admin-dashboard/all-user"}> */}
              <Button className="bg-yellow-600" disabled>Premium <GiQueenCrown className="size-5"/></Button>
            {/* </Link> */}
          </NavbarItem>
          )}
            <NavbarItem className="hidden sm:flex gap-2">
              <NavbarDropdown />
            </NavbarItem>
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {user?.role === "USER" ? (
            <Link href={"/dashboard/profile"} className="w-full ">
              <Button className="w-full bg-green-600">Dashboard</Button>
            </Link>
          ) : (
            <Link href={"/admin-dashboard/all-user"}>
              <Button>Dashboard</Button>
            </Link>
          )}
          {userData?.type === "GENERAL" ? (
            <Link href={"/premium"} className="w-full ">
              <Button className="w-full bg-green-600">Try Premium</Button>
            </Link>
          ) : (
            <Link href={"/admin-dashboard/all-user"}>
              <Button>Premium</Button>
            </Link>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
