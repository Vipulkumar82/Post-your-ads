import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import SubCategoryList from '../components/SubCategoryList';
import Header from '../components/Header';
import { categoryData } from '../data/categories';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Category Selection" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            POST YOUR AD
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Choose a category for your product or service and provide details for your ad
          </p>
        </div>

        <div className="bg-white border border-gray-300 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-96">
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-300">
              <CategoryList
                categories={categoryData}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            <div className="p-6 bg-gray-100">
              <SubCategoryList
                subcategories={categoryData[selectedCategory]?.subcategories}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onSubcategorySelect={handleSubcategorySelect}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
              Need help posting your ad?
            </h3>
            <p className="text-sm sm:text-base text-blue-700 mb-4">
              Follow our simple guidelines to create the perfect ad that gets noticed
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <div className="text-center py-2">
                <div className="text-xl sm:text-2xl mb-2">📸</div>
                <p className="text-xs sm:text-sm text-blue-700">Add clear photos</p>
              </div>
              <div className="text-center py-2">
                <div className="text-xl sm:text-2xl mb-2">📝</div>
                <p className="text-xs sm:text-sm text-blue-700">Write detailed description</p>
              </div>
              <div className="text-center py-2">
                <div className="text-xl sm:text-2xl mb-2">💰</div>
                <p className="text-xs sm:text-sm text-blue-700">Set competitive price</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-500 text-xs sm:text-sm">
            <p>&copy; 2025 LazyCrazy. This is a demo application.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
