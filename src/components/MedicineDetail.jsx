
import React from 'react';
import { X, Star, Check, AlertCircle } from 'lucide-react';

const MedicineDetail = ({ medicine, onClose }) => {
  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={handleModalClick}
      >
        <div className="relative p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
              <img 
                src={medicine.image || '/placeholder.svg'} 
                alt={medicine.name}
                className="max-h-64 max-w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.svg';
                }}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">{medicine.name}</h2>
              <p className="text-gray-600 mb-2">by {medicine.brand}</p>
              
              <div className="flex items-center mb-3">
                <div className="bg-medBlue-light text-medBlue px-2 py-1 rounded text-sm">
                  {medicine.category}
                </div>
                <div className="flex items-center text-yellow-500 ml-3">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1">{medicine.rating}</span>
                </div>
              </div>

              <div className="flex items-baseline mb-4">
                {medicine.discountedPrice !== medicine.price ? (
                  <>
                    <span className="text-2xl font-bold text-medGreen">₹{medicine.discountedPrice.toFixed(2)}</span>
                    <span className="ml-2 text-gray-500 line-through">₹{medicine.price.toFixed(2)}</span>
                    <span className="ml-2 text-medGreen">
                      {(((medicine.price - medicine.discountedPrice) / medicine.price) * 100).toFixed(0)}% off
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">₹{medicine.price.toFixed(2)}</span>
                )}
              </div>

              <div className="flex items-center mb-4">
                {medicine.stockAvailable ? (
                  <div className="flex items-center text-medGreen">
                    <Check className="h-5 w-5 mr-1" />
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <AlertCircle className="h-5 w-5 mr-1" />
                    <span>Out of Stock</span>
                  </div>
                )}
                
                {medicine.prescription && (
                  <div className="ml-4 bg-medBlue text-white px-2 py-1 rounded text-sm">
                    Prescription Required
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-1">Generic Name</h3>
                <p>{medicine.generic}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{medicine.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Contents</h3>
                <p className="text-gray-600">{medicine.contents}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Recommended Dosage</h3>
                <p className="text-gray-600">{medicine.dosage}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Possible Side Effects</h3>
              <p className="text-gray-600">{medicine.sideEffects}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300 transition mr-2"
            >
              Close
            </button>
            <button 
              className="px-4 py-2 bg-medBlue text-white rounded-lg hover:bg-medBlue-dark transition"
              disabled={!medicine.stockAvailable}
            >
              {medicine.stockAvailable ? 'Add to Cart' : 'Notify Me'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
