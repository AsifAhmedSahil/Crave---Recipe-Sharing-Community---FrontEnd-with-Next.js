/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
'use client'

import FbCard from '@/src/components/fbCard'
import React, { useState, useEffect } from 'react'

interface RecipeItem {
    _id: string;
    // Add other properties of the recipe item as needed
}

const MyRecipeId = ({ params }: { params: { myRecipeId: string } }) => {
    const [data, setData] = useState<RecipeItem[]>([]);

    const fetchRecipes = async () => {
        const res = await fetch(`http://localhost:5000/api/v1/items/recipe/my-recipe/${params.myRecipeId}`, {
            cache: "no-store"
        });
        const { data } = await res.json();
        setData(data);
    };

    useEffect(() => {
        fetchRecipes();
    }, [params.myRecipeId]);

    const handleDeleteRecipe = async (id: string) => {
        try {
            await fetch(`http://localhost:5000/api/v1/items/recipe/${id}`, {
                method: 'DELETE'
            });
            // Update the local state to remove the deleted recipe
            setData(prevData => prevData.filter(item => item._id !== id));
        } catch (error) {
            console.error('Failed to delete recipe', error);
        }
    };

    return (
        <div className='grid lg:grid-cols-1 md:grid-cols-2 gap-4'>
            {
                data.map((item) => (
                    <FbCard key={item._id} item={item} onDelete={handleDeleteRecipe} />
                ))
            }
        </div>
    );
}

export default MyRecipeId;
