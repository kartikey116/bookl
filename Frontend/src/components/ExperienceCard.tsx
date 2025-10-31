import React from "react";
import { Link } from "react-router-dom";
import type { Experience } from "../types/index.ts";

const ExperienceCard: React.FC<Experience> = ({ id, title, location, price, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <img src={image} alt={title} className="w-full h-44 object-cover rounded-t-xl" />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{location}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Curated small-group experience. Certified guide. Safety first with gear included.</p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-xs text-gray-500">From</div>
            <div className="font-semibold text-lg">₹{price}</div>
          </div>
          <Link to={`/details/${id}`}>
            <button className="bg-yellow-400 px-4 py-2 rounded-md font-medium">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
