import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ image, name, price, type, provider, link }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"
      data-aos="fade-up">
      {/* Car Image */}
      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover hover:scale-105 transition duration-300"
      />

      {/* Car Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">Type: {type}</p>
        <p className="text-gray-600 text-sm mb-2">Provider: {provider}</p>
        <p className="text-indigo-600 font-bold text-lg mb-3">${price} / day</p>

        {/* View Details Button */}
        <Link
          to={link}
          className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
