import React from "react";

const ProductItem = ({
  id,
  name,
  description,
  exam,
  note,
  features,
  price,
  image
}) => {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={name}
        className="w-full h-32 object-cover rounded"
      />

      <h3 className="text-lg font-semibold mt-3">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="text-sm mt-2">
        <p>Exams: {exam}</p>
        <p>Notes: {note}</p>
      </div>

      <p className="font-bold text-blue-600 mt-2">৳{price}</p>
    </div>
  );
};

export default ProductItem;