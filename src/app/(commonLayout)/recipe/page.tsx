/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from '@/src/components/card'
import next from 'next'
import React from 'react'

const RecipePage = async () => {
    
    const res = await fetch("http://localhost:5000/api/v1/items/recipes",{
        cache:"no-store"
    })
    // const res = await fetch("http://localhost:5000/api/v1/items/recipes",fetchOptions)
    const {data} = await res.json()
    // console.log(data)

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 '>
        {
            data?.map((item:any) =>(
                <Card key={item._id} item={item}/>
            ))
        }
    </div>
  )
}

export default RecipePage