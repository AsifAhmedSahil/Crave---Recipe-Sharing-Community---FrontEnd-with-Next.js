/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import { title } from "@/src/components/primitives";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      
      <div className="container mx-auto px-4 py-10">
      <h1 className="text-6xl font-bold text-center mb-8">About Us</h1>

      <section className="flex flex-wrap justify-between mb-12 border">
  <div className="flex-1 border p-4 m-2">
    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
    <p className="text-lg">
      At [Your Platform Name], our mission is to connect food lovers and inspire culinary creativity. 
      We believe that cooking is not just about food; it’s about community, culture, and joy. 
      Our platform serves as a space where home cooks, professional chefs, and food enthusiasts 
      can share recipes, tips, and experiences.
    </p>
  </div>

  <div className="flex-1 border p-4 m-2">
    <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
    <p className="text-lg">
      We envision a world where everyone feels empowered to cook and share their culinary creations. 
      Our goal is to provide the tools and community support necessary for every individual to discover 
      the joy of cooking and sharing food with others.
    </p>
  </div>
</section>


      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Image
              src="https://i.ibb.co/4K7MwQk/IMG-8417-2.jpg" // Replace with your image path
              alt="Team Member 1"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-black">John Doe</h3>
            <p className="text-black">Co-Founder & Chef</p>
            <p className="text-black">
              Passionate about cooking and sharing recipes, John brings a wealth of experience from the culinary world.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Image
              src="https://i.ibb.co/4K7MwQk/IMG-8417-2.jpg" // Replace with your image path
              alt="Team Member 2"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-black">Jane Smith</h3>
            <p className="text-black">Product Manager</p>
            <p className="text-black">
              With a background in technology and a love for food, Jane ensures our platform is user-friendly and engaging.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Image
              src="https://i.ibb.co/4K7MwQk/IMG-8417-2.jpg" // Replace with your image path
              alt="Team Member 3"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-black">Alice Johnson</h3>
            <p className="text-black">Community Manager</p>
            <p className="text-black">
              Alice loves connecting with our users and helping them share their culinary stories.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center mt-12">
        <p className="">
          &copy; {new Date().getFullYear()} - Crave. All rights reserved.
        </p>
      </footer>
    </div>
    </div>
  );
}
