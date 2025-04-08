
import React from 'react';
import { Search } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="bg-gray-100 p-4 rounded-full">
        <Search className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">No medicines found</h3>
      <p className="mt-1 text-gray-500">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
};

export default EmptyState;
