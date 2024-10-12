import React from 'react'

const Banner = () => {
  return (
    <div className="relative  py-20">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
      <div className="bg-black bg-opacity-50 inset-0"></div>
    </div>
    <div className="relative z-10 container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to the Recipe Sharing Community!</h1>
      <p className="text-lg md:text-xl mb-6">Share your favorite recipes, discover new ones, and engage with fellow cooking enthusiasts.</p>
      <a href="/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-md transition duration-300">Join Now</a>
    </div>
  </div>
  )
}

export default Banner