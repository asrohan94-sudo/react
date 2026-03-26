import React from 'react';
import { assets } from '../assets/assets';

const Reviews = () => {
  // Put all review images into an array
  const reviewImages = [
    assets.r1,
    assets.r2,
    assets.r3,
    assets.r4,
    assets.r5,
    assets.r6,
    assets.r7,
    assets.r8,
    assets.r9,
    assets.r10,
  ];

  return (
    <section className="py-10 px-5">
      <h1 className="text-3xl text-center font-bold mb-5">Our Success</h1>
      <hr className="border-gray-300 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviewImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Review ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
