
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import MedicineCard from '../components/MedicineCard';
import MedicineDetail from '../components/MedicineDetail';
import EmptyState from '../components/EmptyState';
import { medicines } from '../data/medicines';
import { fuzzySearch, filterMedicines, getAllCategories } from '../utils/searchUtils';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [categories, setCategories] = useState(['All']);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    category: 'All',
    onlyAvailable: false,
    prescriptionType: 'All'
  });

  // Initialize categories
  useEffect(() => {
    setCategories(getAllCategories(medicines));
  }, []);

  // Update filtered medicines when search term or filters change
  useEffect(() => {
    const searchResults = fuzzySearch(medicines, searchTerm);
    const filtered = filterMedicines(searchResults, filters);
    setFilteredMedicines(filtered);
  }, [searchTerm, filters]);

  // Open medicine detail modal
  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  // Close medicine detail modal
  const handleCloseModal = () => {
    setSelectedMedicine(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl md:text-3xl font-bold text-medBlue">
            Indian Medicine Search
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <FilterPanel 
              filters={filters} 
              setFilters={setFilters} 
              categories={categories}
            />
          </div>

          {/* Results grid */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
              <div>
                <span className="font-medium">{filteredMedicines.length}</span> medicines found
              </div>
              <div className="text-sm text-gray-500">
                {filters.category !== 'All' && `Category: ${filters.category}`}
              </div>
            </div>

            {filteredMedicines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMedicines.map((medicine) => (
                  <MedicineCard 
                    key={medicine.id} 
                    medicine={medicine} 
                    onClick={handleMedicineClick}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>

      {selectedMedicine && (
        <MedicineDetail medicine={selectedMedicine} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Index;
