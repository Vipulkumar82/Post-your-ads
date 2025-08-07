import React from 'react';

const CategoryList = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">All categories</h3>
      {Object.entries(categories).map(([categoryName, categoryData]) => (
        <div
          key={categoryName}
          className={`category-card flex items-center space-x-3 ${
            selectedCategory === categoryName ? 'active' : ''
          }`}
          onClick={() => onCategorySelect(categoryName)}
        >
          <span className="text-2xl">{categoryData.icon}</span>
          <span className="font-medium text-gray-700">{categoryName}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
