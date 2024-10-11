/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
/* eslint-disable prettier/prettier */
"use client"; // Use client-side rendering
import { useUser } from "@/src/context/user.provider";
import { useState } from "react";
import { toast } from "sonner"; // Import toast for notifications
import Image from "next/image"; // For image rendering
import { FaCamera } from "react-icons/fa";

const UpdateProfile: React.FC = () => {
  const { user } = useUser(); // Get user data from context
  const [name, setName] = useState<string>(user?.name || "");
  const [username, setUsername] = useState<string>(user?.username || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [bio, setBio] = useState<string>(user?.bio || ""); // Assuming there's a bio in user data
  const [image, setImage] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setImage(selectedFile);
    if (!selectedFile) {
      setFileError("Please select an image file.");
    } else {
      setFileError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      setFileError("Please select an image file.");
      return;
    }

    // image upload to the cloudinary
    const loadingToastId = "uploading-toast";
    toast.loading("Uploading image, please wait...", { id: loadingToastId });

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "myCloud"); // Adjust as needed
    formData.append("cloud_name", "djbpo9xg5"); // Adjust as needed

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djbpo9xg5/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataFromCloud = await response.json();
      const uploadedImageUrl = dataFromCloud.secure_url;

      // Prepare user data to log
      const updatedUserData = {
        name,
        username,
        email,
        bio,
        profilePhoto: uploadedImageUrl, // Just logging the file name for demonstration
      };

      // Log the updated user data to the console
      console.log(updatedUserData);

      // Optionally show a success message
      toast.success("Profile updated successfully!", { id: loadingToastId });
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", {
        id: loadingToastId,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4  rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold ">Update Profile</h1>

      <div className=" items-center relative mb-4 inline-flex">
        <Image
          src={
            user?.profilePhoto ||
            "https://res.cloudinary.com/djbpo9xg5/image/upload/v1728660454/yqwhnxncvnxueunxtk71.jpg"
          }
          alt="Profile Photo"
          width={100}
          height={100}
          className="rounded-full border-4 border-blue-500 mr-4"
        />
        <label className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full shadow-lg hover:bg-blue-500">
            <FaCamera className="" />
          </div>
        </label>
      </div>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
        required
      />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
        required
      />

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
        rows={3}
      />

      {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

      <button
        type="submit"
        className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-500"
      >
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfile;
