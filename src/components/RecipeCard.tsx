/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */

import React from 'react'


const RecipeCard = ({ recipe }:{ recipe :any }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:border-2 hover:border-white hover:ring-2 hover:ring-white">
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-72 object-cover" 
      />
      <div className="px-6 py-3">
        <h3 className="text-xl font-semibold mb-2 text-black">{recipe.title}</h3>
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center mb-4">
            
            <span className="text-yellow-500 mr-2">
              {'★'.repeat(Math.floor(recipe.averageRating))} 
              {'☆'.repeat(5 - Math.floor(recipe.averageRating))}
            </span>
            <span className="text-gray-600">({recipe.averageRating})</span>
          </div>

          <div>
          <span className="text-gray-600 font-medium">Time: {recipe.cookingTime} min</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard