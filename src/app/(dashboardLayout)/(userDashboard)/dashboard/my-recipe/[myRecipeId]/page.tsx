/* eslint-disable prettier/prettier */
import Card from '@/src/components/card'
import FbCard from '@/src/components/fbCard'
import React from 'react'

const MyRecipeId = async ({ params }: { params: { myRecipeId: string } }) => {
    console.log(params.myRecipeId)

    const res = await fetch(`http://localhost:5000/api/v1/items/recipe/my-recipe/${params.myRecipeId}`,{
        cache:"no-store"
    })
   
    const {data} = await res.json()
    console.log(data)

  return (
    <div className='grid lg:grid-cols-1 md:grid-cols-2 gap-4 '>
        {
            data?.map((item:any) =>(
                <FbCard key={item._id} item={item}/>
            ))
        }
    </div>
  )
}

export default MyRecipeId