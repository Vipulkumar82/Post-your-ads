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
      <div className='flex w-full justify-center bg-white p-4'>
        <h1 className="text-2xl sm:text-3xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            POST YOUR AD
        </h1>
      </div>
      <div className="max-w-4xl mx-auto border">
        <div >
          
          <div className="flex items-center text-sm bg-white border p-4">
            <div className="text-lg font-semibold text-gray-900 uppercase">Selected Category</div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm bg-white border-t-0 border border-gray-300 p-4">
            <span className="text-gray-600 text-sm">{parentCategory}</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-400 text-sm">{decodedSubcategory}</span>
            <div className="ml-auto">
              <button
                onClick={handleChangeCategory}
                className="text-blue-600 font-bold underline hover:text-blue-700"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        <PostForm subcategory={decodedSubcategory} />
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

export default PostFormPage;
