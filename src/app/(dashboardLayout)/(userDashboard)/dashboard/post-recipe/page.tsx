/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client"; // Use client-side rendering

import { useUser } from "@/src/context/user.provider";
import { useAddRecipe } from "@/src/hooks/recipe.hook";
import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Ingredient {
  name: string;
  quantity: string;
}

const RecipePostForm: React.FC = () => {
  const { user } = useUser();
  const { mutate: handleRecipePost } = useAddRecipe();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "" },
  ]);
  const [instructions, setInstructions] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isDeleted] = useState<boolean>(false);
  const [type] = useState<string>("free");
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState<number | null>(null);

  const availableTags = [
    "Spicy",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
  ];

  const handleIngredientChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][e.target.name as keyof Ingredient] = e.target.value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const deleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setImage(selectedFile);
    if (!selectedFile) {
      setFileError("Please select an image file.");
    } else {
      setFileError(null);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      setFileError("Please select an image file.");
      return;
    }

    const loadingToastId = "uploading-toast";
    toast.loading("Uploading image, please wait...", { id: loadingToastId });

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "myCloud");
    formData.append("cloud_name", "djbpo9xg5");

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

      const sanitizedDescription = DOMPurify.sanitize(description);
      const sanitizedInstructions = DOMPurify.sanitize(instructions);

      const recipeData = {
        title,
        description: sanitizedDescription,
        ingredients,
        instructions: sanitizedInstructions,
        image: uploadedImageUrl,
        creator: user?._id,
        isDeleted,
        type,
        tags: selectedTags,
        cookingTime,
      };

      console.log(recipeData);
      handleRecipePost(recipeData);
      toast.success("Recipe posted successfully!", { id: loadingToastId });
      setTitle("");
    setDescription("");
    setIngredients([{ name: "", quantity: "" }]);
    setInstructions("");
    setImage(null);
    setSelectedTags([]);
    setCookingTime(null);
    setFileError(null);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", {
        id: loadingToastId,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 bg-black rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold text-white">Post a Recipe</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
        required
      />

      <ReactQuill
        value={description}
        onChange={setDescription}
        placeholder="Description"
        className="bg-white text-black"
      />

      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 lg:flex-row lg:space-x-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, e)}
            className="flex-1 p-3 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
            required
          />
          <div className="flex gap-3">
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, e)}
              className="flex-1 p-3 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => deleteIngredient(index)}
              className="px-2 lg:p-3 text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addIngredient}
        className="text-blue-400 hover:underline"
      >
        Add Ingredient
      </button>

      <ReactQuill
        value={instructions}
        onChange={setInstructions}
        placeholder="Instructions"
        className="bg-white text-black"
      />

      <input
        type="file"
        onChange={handleFileChange}
        className={`w-full p-3 border ${fileError ? "border-red-500" : "border-gray-600"} rounded bg-gray-800 text-white placeholder-gray-400`}
        required
      />
      {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Select Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <label key={tag} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="mr-2"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      <input
        type="number"
        placeholder="Cooking Time (in minutes)"
        value={cookingTime || ""}
        onChange={(e) =>
          setCookingTime(e.target.value ? parseInt(e.target.value) : null)
        }
        className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
      />

      <button
        type="submit"
        className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-500"
      >
        Post Recipe
      </button>
    </form>
  );
};

export default RecipePostForm;
