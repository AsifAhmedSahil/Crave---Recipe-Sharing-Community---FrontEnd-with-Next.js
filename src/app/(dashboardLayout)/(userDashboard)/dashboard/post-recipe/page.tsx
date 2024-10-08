/* eslint-disable prettier/prettier */
"use client"; // Use client-side rendering
import { useUser } from "@/src/context/user.provider";
import { useAddRecipe } from "@/src/hooks/recipe.hook";
import { useState } from "react";
import { toast } from "sonner"; // Import toast for notifications
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles
import DOMPurify from 'dompurify'; // Import DOMPurify
import parse from 'html-react-parser';


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

  const handleIngredientChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
    formData.append("upload_preset", "myCloud"); // Adjust as needed
    formData.append("cloud_name", "djbpo9xg5"); // Adjust as needed

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/djbpo9xg5/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataFromCloud = await response.json();
      const uploadedImageUrl = dataFromCloud.secure_url;

      // Sanitize the description and instructions
      const sanitizedDescription = DOMPurify.sanitize(description);
      
      const sanitizedInstructions = DOMPurify.sanitize(instructions);
     

      const recipeData = {
        title,
        description: sanitizedDescription,
        ingredients,
        instructions: sanitizedInstructions,
        image: uploadedImageUrl, // Use uploaded image URL
        creator: user?._id,
        isDeleted,
        type,
      };

      // Log the recipe data or send it to your backend
      console.log(recipeData);
      handleRecipePost(recipeData);
      toast.success("Recipe posted successfully!", { id: loadingToastId });
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", { id: loadingToastId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-black rounded-lg shadow-lg">
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
        className="bg-gray-800 text-white"
      />

      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex flex-col gap-3 lg:flex-row lg:space-x-2">
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
        className="bg-gray-800 text-white"
      />

      <input
        type="file"
        onChange={handleFileChange}
        className={`w-full p-3 border ${fileError ? 'border-red-500' : 'border-gray-600'} rounded bg-gray-800 text-white placeholder-gray-400`}
        required
      />
      {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

      <button type="submit" className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-500">
        Post Recipe
      </button>
    </form>
  );
};

// Component to display the recipe
const RecipeDetails: React.FC<{ title: string, description: string, ingredients: Ingredient[], instructions: string, image: string }> = ({ title, description, ingredients, instructions, image }) => {
  return (
    <div className="recipe-details">
      <h1 className="text-2xl font-bold">{title}</h1>
      <img src={image} alt={title} className="w-full h-auto rounded-lg" />
      <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
      <h2 className="text-xl font-bold">Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.name}
          </li>
        ))}
      </ul>
      <div className="instructions" dangerouslySetInnerHTML={{ __html: instructions }} />
    </div>
  );
};

export default RecipePostForm;
