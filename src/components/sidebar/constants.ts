/* eslint-disable prettier/prettier */
// export const userLinks = [
//     { href: "/profile", label: "Posts" },
//     { href: "/profile/settings", label: "Settings" },
//   ];
// constants.js
// import { FaHome, FaUser, FaCog } from "react-icons/fa";

export const userLinks = [
  
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
    href: "/dashboard/my-recipe",
    label: "My Recipe",
    // icon: <FaUser />,
  },
  {
    href: "/settings",
    label: "Settings",
    // icon: <FaCog />,
  },
];

export const adminLinks = [{ href: "/admin-dashboard", label: "Admin" }];
