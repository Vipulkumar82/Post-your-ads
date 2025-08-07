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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            POST YOUR AD
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a category for your product or service and provide details for your ad
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-96">
            <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
              <CategoryList
                categories={categoryData}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            <div className="p-6 lg:p-8">
              <SubCategoryList
                subcategories={categoryData[selectedCategory]?.subcategories}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onSubcategorySelect={handleSubcategorySelect}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Need help posting your ad?
            </h3>
            <p className="text-blue-700 mb-4">
              Follow our simple guidelines to create the perfect ad that gets noticed
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">📸</div>
                <p className="text-sm text-blue-700">Add clear photos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <p className="text-sm text-blue-700">Write detailed description</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💰</div>
                <p className="text-sm text-blue-700">Set competitive price</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2025 LazyCrazy. This is a demo application.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
