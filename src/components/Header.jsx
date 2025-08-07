import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title = "Post Your Ad", showBackButton = false, onBack }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={handleBackClick}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              LazyCrazy
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/ads')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-600 px-3 py-1 hover:bg-blue-50 transition-colors"
            >
              View Posted Ads
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
