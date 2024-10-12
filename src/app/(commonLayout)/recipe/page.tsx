/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Card from "@/src/components/card";
import Pagination from "@/src/components/Pagination";

const RecipePage = () => {
  const [data, setData] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  console.log(selectedTags);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/v1/items/recipes", {
        cache: "no-store",
      });
      const result = await res.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (query === '') {
      setIngredients('');
      setCookingTime(null);
      setSelectedTags([]);
    }
  }, [query]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Filter products based on search query, tags, ingredients, and cooking time
  // Filter products based on search query, tags, ingredients, and cooking time
  const filteredProducts = currentProducts?.filter((item: any) => {
    // Check if the item matches the search query in title or description
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                         item.description.toLowerCase().includes(query.toLowerCase());

    // Check if the item matches the selected tags
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
    
    // Prepare the ingredient list and check if it's empty or contains only spaces
    const ingredientList = ingredients.split(/[, ]+/).map(ingredient => ingredient.trim().toLowerCase());
    const isIngredientEmpty = ingredientList.length === 0 || ingredientList.every(ingredient => ingredient === "");

    // If ingredients input is empty or only spaces, consider all items matching
    const matchesIngredients = isIngredientEmpty || 
      ingredientList.some(ingredient =>
        item.ingredients.some((ing: any) => 
          ing.name.toLowerCase().includes(ingredient)
        )
      );

    // Check if the item's cooking time matches the specified cooking time
    const matchesCookingTime = cookingTime === null || item.cookingTime <= cookingTime;

    // Return true if all conditions are met and the item is not deleted
    return matchesQuery && matchesTags && matchesIngredients && matchesCookingTime && !item.isDeleted;
});


  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="p-6  rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4">Recipe Search</h2>

<div className="flex gap-2">
<input
    type="text"
    placeholder="Search Recipes"
    className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={(e) => setQuery(e.target.value)}
  />

  <input
    type="text"
    placeholder="Search Ingredients"
    className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={(e) => setIngredients(e.target.value)}
  />

  <input
    type="number"
    placeholder="Max Cooking Time (minutes)"
    className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={(e) =>
      setCookingTime(e.target.value ? parseInt(e.target.value) : null)
    }
  />
</div>

  <div className="mb-4">
    <h3 className="font-semibold text-lg mb-2">Select Tags:</h3>
    <div className="flex flex-wrap">
      {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Spicy"].map(
        (tag) => (
          <label key={tag} className="flex items-center mr-6 mb-2">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
              className="mr-2"
            />
            <span className="">{tag}</span>
          </label>
        )
      )}
    </div>
  </div>

  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-6">
  {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Card key={item._id} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center text-3xl font-bold italic my-32">
            No recipes found ...
          </div>
        )}
  </div>

  <Pagination
    productsPerPage={productsPerPage}
    totalProducts={data?.length}
    paginate={paginate}
    activePage={currentPage}
  />
</div>

  );
};

export default RecipePage;
