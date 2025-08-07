import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubCategoryList = ({ subcategories, selectedCategory, selectedSubcategory, onSubcategorySelect }) => {
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategory) => {
    onSubcategorySelect(subcategory);
    const encodedSubcategory = encodeURIComponent(subcategory);
    navigate(`/post-form/${encodedSubcategory}`);
  };

  if (!selectedCategory) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-4">👈</div>
          <p className="text-lg">Select a category to see subcategories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Choose a subcategory in {selectedCategory}
      </h3>
      {subcategories?.map((subcategory) => (
        <div
          key={subcategory}
          className={`category-card flex items-center justify-between ${
            selectedSubcategory === subcategory ? 'active' : ''
          }`}
          onClick={() => handleSubcategoryClick(subcategory)}
        >
          <span className="font-medium text-gray-700">{subcategory}</span>
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
  );
};

export default SubCategoryList;
