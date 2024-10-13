/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import React from 'react'

const NewsLetter = () => {
  return (
    <section className=" py-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg mb-6">
          Stay updated with the latest recipes, cooking tips, and community events!
        </p>
        <form className="flex flex-col md:flex-row justify-center items-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full md:w-1/3 p-3 mb-4 md:mb-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default NewsLetter