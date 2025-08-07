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
          <p className="text-lg">Select a category to see subcategories</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Choose a subcategory in {selectedCategory}
      </h3>
      <div className="space-y-0">
        {subcategories?.map((subcategory) => (
          <div
            key={subcategory}
            className={`flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 ${
              selectedSubcategory === subcategory ? 'bg-white border-l-4 border-l-blue-500' : 'text-gray-600'
            }`}
            onClick={() => handleSubcategoryClick(subcategory)}
          >
            <span className="text-gray-900">{subcategory}</span>
            <svg 
              className="w-4 h-4 text-gray-400" 
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

export default SubCategoryList;
