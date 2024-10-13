/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import React from 'react'
import RecipeCard from './RecipeCard';

const recipesData = [
    {
      title: "Vegan Tikka Masala",
      description: "A flavorful vegan version of the classic Tikka Masala made with tofu and a rich tomato-based sauce.",
      image: "https://res.cloudinary.com/djbpo9xg5/image/upload/v1725030840/nd8yozibne5pn7xoqki0.jpg",
      averageRating: 4.5,
      cookingTime: 30, // Cooking time in minutes
    },
    {
      title: "Spaghetti Aglio e Olio",
      description: "A quick and simple pasta dish made with garlic, olive oil, and chili flakes for breakfast topped with maple",
      image: "https://res.cloudinary.com/djbpo9xg5/image/upload/v1725030840/nd8yozibne5pn7xoqki0.jpg",
      averageRating: 4.0,
      cookingTime: 15, // Cooking time in minutes
    },
    {
      title: "Classic Pancakes",
      description: "Fluffy pancakes perfect for breakfast topped with maple syrup for breakfast topped with maple",
      image: "https://res.cloudinary.com/djbpo9xg5/image/upload/v1725030840/nd8yozibne5pn7xoqki0.jpg",
      averageRating: 4.8,
      cookingTime: 20, // Cooking time in minutes
    },
  ]
  
  
  

const ViewHomeCard = () => {
  return (
    <section className="container mx-auto px-4 py-10 ">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipesData.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      <div className="text-center mt-6">
        <a 
          href="/recipes" 
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
        >
          View More Recipes
        </a>
      </div>
    </section>
  )
}

export default ViewHomeCard