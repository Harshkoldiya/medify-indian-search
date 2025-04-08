
import React from 'react';
import { Filter } from 'lucide-react';

const FilterPanel = ({ filters, setFilters, categories }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-medBlue mr-2" />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>
      
      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => setFilters({...filters, minPrice: e.target.value ? Number(e.target.value) : null})}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value ? Number(e.target.value) : null})}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
      
      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select 
          value={filters.category} 
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          className="w-full p-2 bg-white border border-gray-300 rounded text-sm"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      {/* Availability */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onlyAvailable}
            onChange={(e) => setFilters({...filters, onlyAvailable: e.target.checked})}
            className="rounded text-medBlue focus:ring-medBlue"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>
      
      {/* Prescription Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Type</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="prescriptionType"
              value="All"
              checked={filters.prescriptionType === 'All'}
              onChange={() => setFilters({...filters, prescriptionType: 'All'})}
              className="text-medBlue focus:ring-medBlue"
            />
            <span className="text-sm text-gray-700">All Medicines</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="prescriptionType"
              value="OTC"
              checked={filters.prescriptionType === 'OTC'}
              onChange={() => setFilters({...filters, prescriptionType: 'OTC'})}
              className="text-medBlue focus:ring-medBlue"
            />
            <span className="text-sm text-gray-700">OTC Only</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="prescriptionType"
              value="Prescription"
              checked={filters.prescriptionType === 'Prescription'}
              onChange={() => setFilters({...filters, prescriptionType: 'Prescription'})}
              className="text-medBlue focus:ring-medBlue"
            />
            <span className="text-sm text-gray-700">Prescription Only</span>
          </label>
        </div>
      </div>
      
      {/* Reset Button */}
      <button 
        onClick={() => setFilters({
          minPrice: null,
          maxPrice: null,
          category: 'All',
          onlyAvailable: false,
          prescriptionType: 'All'
        })}
        className="w-full py-2 text-sm text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;
