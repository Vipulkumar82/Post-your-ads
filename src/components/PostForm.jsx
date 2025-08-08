import React, { useState } from "react";
import {
  formFieldsConfig,
  commonFields,
  indianStates,
  majorCitiesByState,
} from "../data/categories";

const PostForm = ({ subcategory }) => {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [locationTab, setLocationTab] = useState("list");

  const specificFields = formFieldsConfig[subcategory]?.fields || [];

  const availableCities = selectedState
    ? majorCitiesByState[selectedState] || []
    : [];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setFormData((prev) => ({
      ...prev,
      state: state,
      city: "",
    }));

    if (errors.state) {
      setErrors((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setFormData((prev) => ({
      ...prev,
      city: city,
    }));

    if (errors.city) {
      setErrors((prev) => ({
        ...prev,
        city: "",
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length <= 20) {
      setImages((prev) => [...prev, ...files]);
    } else {
      alert("You can upload maximum 20 images");
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];

    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);

    setImages(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  const setCoverPhoto = (index) => {
    if (index === 0) return;

    const newImages = [...images];
    const selectedImage = newImages[index];

    newImages.splice(index, 1);
    newImages.unshift(selectedImage);

    setImages(newImages);
  };

  const handleImageKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCoverPhoto(index);
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      removeImage(index);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    specificFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    commonFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (!selectedState || !formData.state) {
      newErrors.state = "Please select a state";
    }

    if (
      selectedState &&
      availableCities.length > 0 &&
      (!selectedCity || !formData.city)
    ) {
      newErrors.city = "Please select a city";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (formData.price && formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const imageUrls = await Promise.all(
        images.map(image => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(image);
          });
        })
      );
      
      const adData = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: formData.title || 'Untitled Ad',
        description: formData.description || '',
        price: formData.price || 0,
        category: subcategory?.split(' - ')[0] || 'Other',
        subcategory: subcategory,
        city: formData.city || selectedCity,
        state: formData.state || selectedState,
        phone: formData.phone || '',
        images: imageUrls,
        specificFields: {},
        createdAt: new Date().toISOString(),
        ...formData
      };

      specificFields.forEach(field => {
        if (formData[field.name]) {
          adData.specificFields[field.label] = formData[field.name];
        }
      });

      const existingAds = JSON.parse(localStorage.getItem('postedAds') || '[]');
      existingAds.unshift(adData);
      localStorage.setItem('postedAds', JSON.stringify(existingAds));

      alert("Ad posted successfully!");
      window.location.href = '/ads';
    }
  };

  const renderField = (field) => {
    const commonProps = {
      value: formData[field.name] || "",
      onChange: (e) => handleInputChange(field.name, e.target.value),
    };

    switch (field.type) {
      case "selection":
        if (field.name === "facing") {
          return (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="relative max-w-none sm:max-w-md">
                <select
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors[field.name] && (
                <p className="text-sm text-red-500">{errors[field.name]}</p>
              )}
            </div>
          );
        }
        
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-wrap gap-2">
              {field.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 rounded-sm py-2 border border-gray-300 text-sm font-medium transition-colors ${
                    formData[field.name] === option 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleInputChange(field.name, option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              {...commonProps}
              className="w-full max-w-none sm:max-w-md px-3 py-2 border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none min-h-24 resize-y"
              placeholder={field.placeholder}
              maxLength={field.maxLength}
            />
            {field.maxLength && (
              <div className="text-right max-w-none sm:max-w-md">
                <p className="text-xs text-gray-500">
                  {(formData[field.name] || "").length} / {field.maxLength}
                </p>
              </div>
            )}
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );

      default:
        if (field.name === "price") {
          return (
            <div key={field.name} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mt-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 uppercase">
                Set A Price
              </h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative max-w-none sm:max-w-md">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    {...commonProps}
                    type="number"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Enter price"
                  />
                </div>
                {errors[field.name] && (
                  <p className="text-sm text-red-500">{errors[field.name]}</p>
                )}
              </div>
            </div>
          );
        }

        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              {...commonProps}
              type={field.inputType || "text"}
              className="w-full max-w-none sm:max-w-md px-3 py-2 border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none"
              placeholder={field.placeholder}
              maxLength={field.maxLength}
            />
            {field.maxLength && (
              <div className="text-right max-w-none sm:max-w-md">
                <p className="text-xs text-gray-500">
                  {(formData[field.name] || "").length} / {field.maxLength}
                </p>
              </div>
            )}
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {specificFields.length > 0 && (
        <div className="bg-white border border-gray-300 p-3 sm:p-4 md:p-6">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 uppercase">
            Include Some Details
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {specificFields.map(renderField)}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 uppercase">Upload Up To 20 Photos</h3>
        <p className="text-xs sm:text-sm text-red-500 mb-3 sm:mb-4">
          This field is mandatory
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-2 max-w-none sm:max-w-lg md:max-w-md">
          {Array.from({ length: 20 }).map(
            (_, index) => {
              if (index < images.length) {
                const image = images[index];
                return (
                  <div
                    key={`image-${index}`}
                    className={`relative w-full aspect-square group cursor-move ${
                      draggedIndex === index ? "opacity-50 scale-95" : ""
                    } ${
                      dragOverIndex === index
                        ? "ring-2 ring-lazycrazy-primary ring-offset-2"
                        : ""
                    } focus:ring-2 focus:ring-lazycrazy-primary focus:ring-offset-2 focus:outline-none`}
                    draggable
                    tabIndex={0}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragLeave={handleDragLeave}
                    onKeyDown={(e) => handleImageKeyDown(e, index)}
                    role="button"
                    aria-label={`Photo ${index + 1}${
                      index === 0 ? " (Cover Photo)" : ""
                    }. Press Enter to set as cover photo, Delete to remove.`}
                  >
                    {index === 0 && (
                      <div className="absolute top-0.5 left-0.5 bg-lazycrazy-primary text-white text-xs px-1 py-0.5 rounded font-medium z-10">
                        Cover
                      </div>
                    )}

                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => setCoverPhoto(index)}
                        className="absolute top-0.5 left-0.5 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-lazycrazy-primary"
                      >
                        Cover
                      </button>
                    )}

                    <div className="absolute top-0.5 right-5 bg-black bg-opacity-50 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <svg
                        className="w-2 h-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    </div>

                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover border border-black"
                      draggable={false}
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                    >
                      ×
                    </button>

                    <div className="absolute bottom-0.5 left-0.5 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded">
                      {index + 1}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={`placeholder-${index}`}
                  className="relative w-full aspect-square"
                >
                  <label className="border-2 border-gray-300 rounded cursor-pointer hover:border-lazycrazy-primary transition-colors flex flex-col items-center justify-center w-full h-full bg-white">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 mb-0.5 sm:mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {index === images.length && (
                      <span className="text-xs text-gray-600 font-medium text-center leading-none px-0.5 sm:px-1 hidden sm:block">
                        Add Photo
                      </span>
                    )}
                  </label>
                </div>
              );
            }
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 flex items-center mb-2">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Drag and drop photos to reorder them. The first photo will be your
              cover photo.
            </p>
            <p className="text-xs text-blue-600 ml-6">
              💡 Tips: Hover over photos to see "Set as Cover" button • Use Tab
              + Enter to set cover photo • Delete key to remove photo
            </p>
          </div>
        )}

        {images.length > 0 && (
          <div className="mt-2 text-sm text-gray-500 text-center">
            {images.length} / 20 photos uploaded
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
          Confirm Your Location
        </h3>

        <div className="flex border-b border-gray-200 mb-4 sm:mb-6">
          <button
            type="button"
            className={`px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium border-b-2 transition-colors ${
              locationTab === "list"
                ? "border-lazycrazy-primary text-lazycrazy-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setLocationTab("list")}
          >
            LIST
          </button>
          <button
            type="button"
            className={`px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium border-b-2 transition-colors ml-4 sm:ml-8 ${
              locationTab === "current"
                ? "border-lazycrazy-primary text-lazycrazy-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setLocationTab("current")}
          >
            <span className="hidden sm:inline">CURRENT LOCATION</span>
            <span className="sm:hidden">CURRENT</span>
          </button>
        </div>

        {locationTab === "list" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                State <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lazycrazy-primary focus:border-lazycrazy-primary appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.state && (
                <p className="text-sm text-red-500">{errors.state}</p>
              )}
            </div>

            {selectedState && availableCities.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lazycrazy-primary focus:border-lazycrazy-primary appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select City</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>
            )}

            {selectedState && availableCities.length === 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="form-field"
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-lazycrazy-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-lazycrazy-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Use Current Location
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                We'll detect your location automatically to help buyers find you
                easily.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        alert(
                          "Location detected! (This is a demo - would normally set location)"
                        );
                      },
                      (error) => {
                        alert(
                          "Unable to detect location. Please use the LIST tab to select manually."
                        );
                      }
                    );
                  } else {
                    alert(
                      "Geolocation is not supported by this browser. Please use the LIST tab."
                    );
                  }
                }}
              >
                Detect Location
              </button>
            </div>
          </div>
        )}

        {(selectedState || selectedCity) && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm font-medium text-green-800">
                Selected Location: {selectedCity ? `${selectedCity}, ` : ""}
                {selectedState}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Ad details</h3>
        <div className="space-y-4 sm:space-y-6">{commonFields.map(renderField)}</div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          className="btn-secondary w-full sm:w-auto order-2 sm:order-1"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary w-full sm:w-auto order-1 sm:order-2">
          Post now
        </button>
      </div>
    </form>
  );
};

export default PostForm;
