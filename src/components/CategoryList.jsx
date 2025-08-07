import React from 'react';

const CategoryList = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div>
      <h3 className="text-base font-medium text-black mb-4 uppercase tracking-wide">Choose a Category</h3>
      <div className="space-y-0">
        {Object.entries(categories).map(([categoryName, categoryData]) => (
          <div
            key={categoryName}
            className={`flex items-center justify-between py-4 px-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
              selectedCategory === categoryName ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            }`}
            onClick={() => onCategorySelect(categoryName)}
          >
            <div className="flex items-center space-x-4">
              <span className={`text-lg opacity-90 ${
                selectedCategory === categoryName ? 'text-black' : 'text-gray-600'
              }`}>
                <categoryData.icon />
              </span>
              <span className={`font-normal text-sm opacity-90 ${
                selectedCategory === categoryName ? 'text-black font-medium' : 'text-gray-700'
              }`}>{categoryName}</span>
            </div>
            <svg 
              className={`w-4 h-4 opacity-80 ${
                selectedCategory === categoryName ? 'text-black' : 'text-gray-500'
              }`} 
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
