
import React from 'react';
import { Star } from 'lucide-react';

const MedicineCard = ({ medicine, onClick }) => {
  return (
    <div 
      className="medicine-card bg-white p-4 rounded-lg shadow cursor-pointer flex flex-col h-full"
      onClick={() => onClick(medicine)}
    >
      <div className="relative mb-2">
        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
          <img 
            src={medicine.image || '/placeholder.svg'}
            alt={medicine.name} 
            className="h-40 w-auto mx-auto object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder.svg';
            }}
          />
        </div>
        {!medicine.stockAvailable && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
        {medicine.prescription && (
          <div className="absolute top-2 left-2 bg-medBlue text-white text-xs px-2 py-1 rounded">
            Rx
          </div>
        )}
      </div>
      
      <h3 className="font-semibold text-lg mb-1 flex-grow">{medicine.name}</h3>
      
      <div className="text-sm text-gray-600 mb-1">{medicine.brand}</div>
      
      <div className="flex items-center mb-2">
        <div className="flex items-center text-yellow-500 mr-1">
          <Star className="h-4 w-4 fill-current" />
          <span className="ml-1 text-sm">{medicine.rating}</span>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline">
          {medicine.discountedPrice !== medicine.price ? (
            <>
              <span className="text-lg font-bold text-medGreen">₹{medicine.discountedPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">₹{medicine.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold">₹{medicine.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
