/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Ensure you have a toast library for notifications
import DOMPurify from 'dompurify';

interface RecipeItem {
  _id: string; 
  title: string;
  description: string;
  image: string;
  type: string;
}

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: RecipeItem; // Includes _id
  onUpdate: (updatedItem: RecipeItem) => void; 
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, item, onUpdate }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(item.image);
  const [type, setType] = useState(item.type);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setImageUrl(item.image);
      setType(item.type);
    }
  }, [item]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setImage(selectedFile);
    if (!selectedFile) {
      setFileError("Please select an image file.");
    } else {
      setFileError(null);
    }
  };

  const handleUpdate = async () => {
    let updatedImageUrl = imageUrl;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "myCloud"); // Replace with your preset
      formData.append("cloud_name", "djbpo9xg5"); // Replace with your cloud name

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
        updatedImageUrl = dataFromCloud.secure_url;
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    }

    const sanitizedDescription = DOMPurify.sanitize(description);
    setDescription(sanitizedDescription)
    const updatedItem = { ...item, title, description, image: updatedImageUrl, type }; 
    onUpdate(updatedItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transition-transform transform">
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">Update Recipe</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-black">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            className="border border-gray-300 rounded-md p-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 text-black">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter recipe description"
            className="border border-gray-300 rounded-md p-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            rows={4}
          />
        </div>

        

        <input
          type="file"
          onChange={handleFileChange}
          className={`w-full p-3 border ${fileError ? "border-red-500" : "border-gray-600"} rounded bg-gray-800 text-white placeholder-gray-400`}
          required
        />
        {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

        {/* <div className="mb-4">
          <label htmlFor="type" className="block mb-2 text-black">Type</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter recipe type"
            className="border border-gray-300 rounded-md p-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div> */}

        <div className="flex justify-between mt-6">
          <button 
            onClick={handleUpdate} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update
          </button>
          <button 
            onClick={onClose} 
            className="border border-gray-300 px-4 py-2 rounded-md bg-black text-white transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
