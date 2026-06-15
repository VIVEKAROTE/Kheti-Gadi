import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const EquipmentCard = ({ equipment }) => {
  const { _id, name, category, pricePerDay, location, images, isAvailable } = equipment;
  
  // Use first image or a placeholder
  const imageUrl = images?.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c4c40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <Link to={`/equipment/${_id}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative aspect-4/3 overflow-hidden bg-gray-200">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!isAvailable && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Currently Booked
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
          {category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{name}</h3>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4 gap-1">
          <MapPin size={16} />
          <span className="line-clamp-1">{location}</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="text-primary font-bold text-lg">
            ₹{pricePerDay} <span className="text-gray-500 text-sm font-normal">/ day</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EquipmentCard;
