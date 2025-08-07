export const categoryData = {
  Properties: {
    icon: "🏠",
    subcategories: [
      "For Sale: Houses & Apartments",
      "For Rent: Houses & Apartments", 
      "Lands & Plots",
      "PG & Guest Houses",
      "Commercial Property"
    ]
  },
  Cars: {
    icon: "🚗",
    subcategories: [
      "Used Cars",
      "Cars Accessories"
    ]
  },
  Mobiles: {
    icon: "📱",
    subcategories: [
      "Smartphones",
      "Mobile Accessories",
      "Tablets"
    ]
  },
  Jobs: {
    icon: "💼",
    subcategories: [
      "Full Time Jobs",
      "Part Time Jobs",
      "Work From Home",
      "Internships"
    ]
  },
  Bikes: {
    icon: "🏍️",
    subcategories: [
      "Motorcycles",
      "Scooters",
      "Bicycles",
      "Bike Accessories"
    ]
  },
  "Electronics & Appliances": {
    icon: "📺",
    subcategories: [
      "TVs, Video - Audio",
      "Kitchen & Other Appliances",
      "Computers & Laptops",
      "Cameras & Lenses",
      "Games & Entertainment"
    ]
  },
  "Fashion": {
    icon: "👕",
    subcategories: [
      "Men",
      "Women", 
      "Kids"
    ]
  },
  "Books, Sports & Hobbies": {
    icon: "📚",
    subcategories: [
      "Books",
      "Sports Equipment",
      "Musical Instruments",
      "Gym & Fitness"
    ]
  },
  "Pets": {
    icon: "🐕",
    subcategories: [
      "Dogs",
      "Cats", 
      "Other Pets",
      "Pet Accessories"
    ]
  },
  "Services": {
    icon: "🛠️",
    subcategories: [
      "Education & Classes",
      "Tours & Travel",
      "Electronics Repair",
      "Other Services"
    ]
  }
};

export const formFieldsConfig = {
  "For Sale: Houses & Apartments": {
    fields: [
      {
        label: "Type",
        name: "propertyType",
        type: "selection",
        required: true,
        options: ["Flats/Apartments", "Independent Builder Floors", "Farm House", "House & Villa"]
      },
      {
        label: "BHK",
        name: "bhk",
        type: "selection",
        options: ["1", "2", "3", "4", "4+"]
      },
      {
        label: "Bathrooms",
        name: "bathrooms",
        type: "selection",
        options: ["1", "2", "3", "4", "4+"]
      },
      {
        label: "Furnishing",
        name: "furnishing",
        type: "selection",
        options: ["Furnished", "Semi-Furnished", "Unfurnished"]
      },
      {
        label: "Project Status",
        name: "listedBy",
        type: "selection",
        options: ["New Launched", "Under Construction", "Ready to Move"]
      },
      {
        label: "Listed by",
        name: "listedBy",
        type: "selection",
        options: ["Builder", "Owner", "Dealer"]
      },
      {
        label: "Super Buildup area (ft²)",
        name: "builtupArea",
        type: "input",
        inputType: "number",
        placeholder: "Enter area in square feet"
      },
      {
        label: "Carpet Area (ft²)",
        name: "carpetArea",
        type: "input",
        inputType: "number",
        placeholder: "Enter carpet area"
      },
      {
        label: "Maintenance (Monthly)",
        name: "maintenance",
        type: "input",
        inputType: "number",
        placeholder: "Enter monthly maintenance"
      },
      {
        label: "Total Floors",
        name: "totalFloors",
        type: "input",
        inputType: "number",
        placeholder: "Total floors in building"
      },
      {
        label: "Floor No",
        name: "floorNo",
        type: "input",
        inputType: "number",
        placeholder: "Property floor number"
      },
      {
        label: "Car Parking",
        name: "parking",
        type: "selection",
        options: ["0", "1", "2", "3", "4+"]
      },
      {
        label: "Facing",
        name: "facing",
        type: "selection",
        options: ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"]
      },
      {
        label: "Project Name",
        name: "projectName",
        type: "input",
        inputType: "text",
        placeholder: "Enter project name",
        maxLength: 70
      },
      {
        label: "Ad title",
        name: "title",
        type: "input",
        inputType: "text",
        placeholder: "Mention the key features of your item (e.g. brand, model, age, type)",
        required: true,
        maxLength: 70
      },
      {
        label: "Description",
        name: "description",
        type: "textarea",
        placeholder: "Include condition, features and reason for selling",
        required: true,
        maxLength: 4096
      },
      {
        label: "Set a price",
        name: "price",
        type: "input",
        inputType: "number",
        placeholder: "Enter price",
        required: true
      }
    ]
  },
  "For Rent: Houses & Apartments": {
    fields: [
      {
        label: "Type",
        name: "propertyType",
        type: "selection",
        required: true,
        options: ["Flats/Apartments", "Independent House", "Independent Builder Floors", "1 RK/ Studio Apartment"]
      },
      {
        label: "BHK",
        name: "bhk",
        type: "selection",
        options: ["1", "2", "3", "4", "4+"]
      },
      {
        label: "Bathrooms",
        name: "bathrooms",
        type: "selection",
        options: ["1", "2", "3", "4", "4+"]
      },
      {
        label: "Furnishing",
        name: "furnishing",
        type: "selection",
        options: ["Furnished", "Semi-Furnished", "Unfurnished"]
      },
      {
        label: "Listed by",
        name: "listedBy",
        type: "selection",
        options: ["Owner", "Dealer"]
      },
      {
        label: "Bachelors Allowed",
        name: "bachelorsAllowed",
        type: "selection",
        options: ["Yes", "No"]
      },
      {
        label: "Pets Allowed",
        name: "petsAllowed",
        type: "selection",
        options: ["Yes", "No"]
      },
      {
        label: "Deposit",
        name: "deposit",
        type: "input",
        inputType: "number",
        placeholder: "Security deposit amount"
      },
      {
        label: "Monthly Rent",
        name: "rent",
        type: "input",
        inputType: "number",
        placeholder: "Monthly rent amount",
        required: true
      },
      {
        label: "Ad title",
        name: "title",
        type: "input",
        inputType: "text",
        placeholder: "Mention the key features of your item (e.g. brand, model, age, type)",
        required: true,
        maxLength: 70
      },
      {
        label: "Description",
        name: "description",
        type: "textarea",
        placeholder: "Include condition, features and reason for selling",
        required: true,
        maxLength: 4096
      },
      {
        label: "Set a price",
        name: "price",
        type: "input",
        inputType: "number",
        placeholder: "Enter price",
        required: true
      }
    ]
  },
  "Used Cars": {
    fields: [
      {
        label: "Brand",
        name: "brand",
        type: "selection",
        required: true,
        options: ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota", "Ford", "Chevrolet", "Volkswagen", "BMW", "Mercedes-Benz", "Audi", "Others"]
      },
      {
        label: "Fuel",
        name: "fuel",
        type: "selection",
        options: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]
      },
      {
        label: "Transmission",
        name: "transmission",
        type: "selection",
        options: ["Manual", "Automatic"]
      },
      {
        label: "KM driven",
        name: "kmDriven",
        type: "input",
        inputType: "number",
        placeholder: "Kilometers driven"
      },
      {
        label: "No. of Owners",
        name: "owners",
        type: "selection",
        options: ["1st", "2nd", "3rd", "4th", "4th+"]
      },
      {
        label: "Year",
        name: "year",
        type: "input",
        inputType: "number",
        placeholder: "Manufacturing year"
      },
      {
        label: "Ad title",
        name: "title",
        type: "input",
        inputType: "text",
        placeholder: "Mention the key features of your item (e.g. brand, model, age, type)",
        required: true,
        maxLength: 70
      },
      {
        label: "Description",
        name: "description",
        type: "textarea",
        placeholder: "Include condition, features and reason for selling",
        required: true,
        maxLength: 4096
      },
      {
        label: "Set a price",
        name: "price",
        type: "input",
        inputType: "number",
        placeholder: "Enter price",
        required: true
      }
    ]
  },
  "Smartphones": {
    fields: [
      {
        label: "Brand",
        name: "brand",
        type: "selection",
        required: true,
        options: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Oppo", "Vivo", "Google", "Nothing", "Others"]
      },
      {
        label: "Condition",
        name: "condition",
        type: "selection",
        options: ["New", "Like New", "Good", "Fair", "Poor"]
      },
      {
        label: "Storage",
        name: "storage",
        type: "selection",
        options: ["16 GB", "32 GB", "64 GB", "128 GB", "256 GB", "512 GB", "1 TB"]
      },
      {
        label: "RAM",
        name: "ram",
        type: "selection",
        options: ["2 GB", "3 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB"]
      },
      {
        label: "Ad title",
        name: "title",
        type: "input",
        inputType: "text",
        placeholder: "Mention the key features of your item (e.g. brand, model, age, type)",
        required: true,
        maxLength: 70
      },
      {
        label: "Description",
        name: "description",
        type: "textarea",
        placeholder: "Include condition, features and reason for selling",
        required: true,
        maxLength: 4096
      },
      {
        label: "Set a price",
        name: "price",
        type: "input",
        inputType: "number",
        placeholder: "Enter price",
        required: true
      }
    ]
  }
};

export const commonFields = [
  {
    label: "Your name",
    name: "name",
    type: "input",
    inputType: "text",
    placeholder: "Enter your name",
    required: true
  },
  {
    label: "Phone number",
    name: "phone",
    type: "input",
    inputType: "tel",
    placeholder: "Enter your phone number",
    required: true
  }
];

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh", 
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export const majorCitiesByState = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur"],
  "Delhi": ["New Delhi", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Allahabad"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Udaipur", "Ajmer"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Korba", "Bilaspur"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"]
};
