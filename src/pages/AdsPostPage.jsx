import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const AdsPostPage = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const savedAds = JSON.parse(localStorage.getItem('postedAds') || '[]');
    console.log('Loaded ads from localStorage:', savedAds);
    if (savedAds.length > 0) {
      console.log('First ad images:', savedAds[0].images);
    }
    
    if (savedAds.length === 0) {
      const sampleAd = {
        id: 'sample-123',
        title: 'Sample Ad - LazyCrazy',
        description: 'This is a sample ad to test the card display functionality.',
        price: 800000,
        category: 'For Sale: Houses & Apartments',
        subcategory: 'Houses & Apartments',
        city: 'Muzaffarpur',
        state: 'Bihar',
        phone: '9876543210',
        images: [], // No images for now
        specificFields: {
          'Property Type': 'House',
          'Bedrooms': '3 BHK'
        },
        createdAt: new Date().toISOString()
      };
      const adsWithSample = [sampleAd];
      localStorage.setItem('postedAds', JSON.stringify(adsWithSample));
      setAds(adsWithSample);
    } else {
      setAds(savedAds);
    }
  }, []);

  const filteredAds = ads;

  const sortedAds = filteredAds;

  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    return `₹ ${Number(price).toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString('en-IN');
  };

  const deleteAd = (adId) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      const updatedAds = ads.filter(ad => ad.id !== adId);
      setAds(updatedAds);
      localStorage.setItem('postedAds', JSON.stringify(updatedAds));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Posted Ads" showBackButton={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Posted Ads</h1>
            <p className="text-gray-600">
              {ads.length} {ads.length === 1 ? 'ad' : 'ads'} posted
            </p>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="btn-primary mt-4 md:mt-0"
          >
            Post New Ad
          </button>
        </div>

        {ads.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No ads posted yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by posting your first ad to see it here
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Post Your First Ad
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAds.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {ad.images && ad.images.length > 0 ? (
                    <div className="relative">
                      <img
                        src={ad.images[0]}
                        alt={ad.title}
                        className="w-full h-48 object-cover"
                        onLoad={() => {
                          console.log('Image loaded successfully:', ad.images[0].substring(0, 50) + '...');
                        }}
                        onError={(e) => {
                          console.log('Image failed to load:', ad.images[0].substring(0, 50) + '...');
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs">Image not available</p>
                        </div>
                      </div>
                      {ad.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
                          +{ad.images.length - 1} more
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">No Image</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {ad.title}
                      </h3>
                      <button
                        onClick={() => deleteAd(ad.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete ad"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-xl font-bold text-lazycrazy-primary mb-2">
                      {formatPrice(ad.price)}
                    </div>
                    
                    {ad.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {ad.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      {ad.category && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {ad.category} {ad.subcategory && `• ${ad.subcategory}`}
                        </div>
                      )}
                      
                      {(ad.city || ad.state) && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {ad.city && ad.state ? `${ad.city}, ${ad.state}` : (ad.city || ad.state)}
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(ad.createdAt)}
                      </div>
                    </div>
                    
                    {Object.keys(ad.specificFields || {}).length > 0 && (
                      <div className="border-t pt-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(ad.specificFields).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="text-gray-600">
                              <span className="font-medium">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-4 pt-3 border-t">
                      <span className="text-xs text-gray-500">
                        ID: {ad.id?.slice(-8)}
                      </span>
                      
                      <div className="flex space-x-2">
                        <button className="text-sm text-lazycrazy-primary hover:underline">
                          View Details
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default AdsPostPage;
