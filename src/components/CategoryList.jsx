import React from 'react';

const CategoryList = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase">Choose a Category</h3>
      <div className="space-y-0">
        {Object.entries(categories).map(([categoryName, categoryData]) => (
          <div
            key={categoryName}
            className={`flex items-center justify-between py-3 px-4 cursor-pointer border-b border-gray-200 hover:bg-gray-50 ${
              selectedCategory === categoryName ? 'bg-gray-100 border-l-4 border-l-blue-500' : ''
            }`}
            onClick={() => onCategorySelect(categoryName)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl text-gray-600">{categoryData.icon}</span>
              <span className="text-gray-900 font-medium">{categoryName}</span>
            </div>
            <svg 
              className="w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
