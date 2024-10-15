/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// export const userLinks = [
//     { href: "/profile", label: "Posts" },
//     { href: "/profile/settings", label: "Settings" },
//   ];
// constants.js

// import { FaHome, FaUser, FaCog } from "react-icons/fa";

// constants.js

// import { FaHome, FaUser, FaCog } from "react-icons/fa";

export const getUserLinks = (user: any) => {
  return [
    {
      href: "/dashboard/profile",
      label: "Profile",
     
    },
    {
      href: "/dashboard/update-profile",
      label: "Update Profile",
      
    },
    {
      href: "/dashboard/post-recipe",
      label: "Post Recipe",
      
    },
    {
      href: `/dashboard/my-recipe/${user}`,
      label: "My Recipe",
      
    },
  ];
};
export const getAdminLinks = () => {
  return [
    {
      href: "/admin-dashboard/all-user",
      label: "All User",
      
    },
    {
      href: "/admin-dashboard/all-recipe",
      label: "All Recipe",
      
    },
    {
      href: "/admin-dashboard/add-admin",
      label: "Add Admin",
      
    },
   
  ];
};


