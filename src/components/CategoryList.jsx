import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryList = ({ categories, selectedCategory, onCategorySelect, onSubcategorySelect, isMobile = false }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
      onCategorySelect(categoryName);
    }
  };

  const handleSubcategoryClick = (categoryName, subcategory) => {
    onSubcategorySelect(subcategory);

    if (isMobile) {
      const encodedSubcategory = encodeURIComponent(subcategory);
      navigate(`/post-form/${encodedSubcategory}`);
    }
  };

  return (
    <div>
      <h3 className="text-base font-medium text-black mb-4 uppercase tracking-wide">Choose a Category</h3>
      <div className="space-y-0">
        {Object.entries(categories).map(([categoryName, categoryData]) => (
          <div key={categoryName} className="border-b border-gray-100">
            <div
              className={`flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-gray-50 transition-all duration-300 ${
                selectedCategory === categoryName ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              } ${expandedCategory === categoryName ? 'bg-gray-50' : ''}`}
              onClick={() => handleCategoryClick(categoryName)}
            >
              <div className="flex items-center space-x-4">
                <span className={`text-lg opacity-90 transition-colors duration-200 ${
                  selectedCategory === categoryName ? 'text-black' : 'text-gray-600'
                }`}>
                  <categoryData.icon />
                </span>
                <span className={`font-normal text-sm opacity-90 transition-colors duration-200 ${
                  selectedCategory === categoryName ? 'text-black font-medium' : 'text-gray-700'
                }`}>{categoryName}</span>
              </div>
              <svg 
                className={`w-4 h-4 opacity-80 transition-all duration-300 ${
                  selectedCategory === categoryName ? 'text-black' : 'text-gray-500'
                } ${expandedCategory === categoryName ? 'rotate-90' : ''}`}
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
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${
              expandedCategory === categoryName ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="bg-gray-50 border-l-4 border-l-blue-300">
                {categoryData.subcategories?.map((subcategory, index) => (
                  <div
                    key={subcategory}
                    className="py-3 px-8 cursor-pointer hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubcategoryClick(categoryName, subcategory);
                    }}
                  >
                    <span className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      {subcategory}
                    </span>
                    {isMobile && (
                      <svg 
                        className="w-3 h-3 text-gray-400" 
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
