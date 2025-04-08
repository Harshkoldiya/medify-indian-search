
// Fuzzy search function for medicine names
export const fuzzySearch = (medicines, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return medicines;
  }
  
  const term = searchTerm.toLowerCase();
  
  return medicines.filter(medicine => {
    // Check if search term is in name, brand, or generic name
    return medicine.name.toLowerCase().includes(term) || 
           medicine.brand.toLowerCase().includes(term) || 
           medicine.generic.toLowerCase().includes(term);
  });
};

// Filter medicines by various criteria
export const filterMedicines = (medicines, filters) => {
  return medicines.filter(medicine => {
    // Price range filter
    if (filters.minPrice && medicine.discountedPrice < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && medicine.discountedPrice > filters.maxPrice) {
      return false;
    }
    
    // Category filter
    if (filters.category && filters.category !== 'All' && medicine.category !== filters.category) {
      return false;
    }
    
    // Availability filter
    if (filters.onlyAvailable && !medicine.stockAvailable) {
      return false;
    }
    
    // Prescription filter
    if (filters.prescriptionType === 'Prescription' && !medicine.prescription) {
      return false;
    }
    if (filters.prescriptionType === 'OTC' && medicine.prescription) {
      return false;
    }
    
    return true;
  });
};

// Get all unique categories from medicine data
export const getAllCategories = (medicines) => {
  const categories = medicines.map(medicine => medicine.category);
  return ['All', ...new Set(categories)];
};
