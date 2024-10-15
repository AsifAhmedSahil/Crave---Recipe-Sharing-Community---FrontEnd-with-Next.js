/* eslint-disable prettier/prettier */
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface IUser {
  _id: any;
  name: any;
  email: any;
  username: any;
  role: any;
  bio: any;
  profilePhoto: any;
  status: any;
  followerIds: any;
  followingIds: any;
  type: any; 
}


export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?:boolean;
}