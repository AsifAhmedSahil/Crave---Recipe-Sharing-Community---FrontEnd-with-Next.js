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
      // icon: <FaUser />,
    },
    {
      href: "/dashboard/update-profile",
      label: "Update Profile",
      // icon: <FaUser />,
    },
    {
      href: "/dashboard/post-recipe",
      label: "Post Recipe",
      // icon: <FaUser />,
    },
    {
      href: `/dashboard/my-recipe/${user}`,
      label: "My Recipe",
      // icon: <FaUser />,
    },
  ];
};
export const getAdminLinks = () => {
  return [
    {
      href: "/admin-dashboard/all-user",
      label: "All User",
      // icon: <FaUser />,
    },
    {
      href: "/admin-dashboard/all-recipe",
      label: "All Recipe",
      // icon: <FaUser />,
    },
    {
      href: "/admin-dashboard/add-admin",
      label: "Add Admin",
      // icon: <FaUser />,
    },
   
  ];
};

// export const adminLinks = [
//   { href: "/admin-dashboard", label: "Admin" }
// ];
