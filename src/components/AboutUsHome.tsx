/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import React from 'react'

const AboutUsHome = () => {
  return (
    <section className="flex flex-col md:flex-row items-center container mx-auto px-4 py-20" style={{ height: '600px', width: '100%' }}>
    <div className="md:w-1/2 h-full">
      <img 
        src="https://res.cloudinary.com/djbpo9xg5/image/upload/v1725030840/nd8yozibne5pn7xoqki0.jpg" // Replace with the actual image path
        alt="Cooking Community"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
    <div className="md:w-1/2 md:pl-10 mt-10 md:mt-0 flex flex-col justify-center h-full">
      <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
      <p className="text-lg mb-6">
        At the Recipe Sharing Community, we believe in the power of food to bring people together. Our vision is to create a vibrant platform where culinary enthusiasts can share their passion for cooking, discover new flavors, and foster connections through the joy of sharing recipes.
      </p>
      <p className="text-lg mb-6">
        We aim to empower home cooks, culinary students, and anyone with a love for cooking to express themselves, learn from each other, and build a supportive community. Join us in celebrating the art of cooking, one recipe at a time!
      </p>
    </div>
  </section>
  
  )
}

export default AboutUsHome