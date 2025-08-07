import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import Header from '../components/Header';
import { categoryData } from '../data/categories';

const PostFormPage = () => {
  const { subcategory } = useParams();
  const navigate = useNavigate();
  
  const decodedSubcategory = decodeURIComponent(subcategory);
  
  const findParentCategory = () => {
    for (const [categoryName, categoryInfo] of Object.entries(categoryData)) {
      if (categoryInfo.subcategories.includes(decodedSubcategory)) {
        return categoryName;
      }
    }
    return null;
  };

  const parentCategory = findParentCategory();

  const handleChangeCategory = () => {
    navigate('/');
  };

  if (!parentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
          <button
            onClick={handleChangeCategory}
            className="btn-primary"
          >
            Go back to categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Post Your Ad" 
        showBackButton={true} 
        onBack={handleChangeCategory}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            POST YOUR AD
          </h1>
          
          <div className="flex items-center space-x-2 text-sm bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <span className="text-gray-600">{parentCategory}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-medium text-gray-900">{decodedSubcategory}</span>
            <div className="ml-auto">
              <button
                onClick={handleChangeCategory}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        <PostForm subcategory={decodedSubcategory} />
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

export default PostFormPage;
