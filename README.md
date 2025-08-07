# LazyCrazy-Style Post Your Ad Application

A modern React + Tailwind CSS application that replicates the LazyCrazy "Post Your Ad" functionality with category selection, subcategory filtering, and dynamic form loading.

## 🚀 Features

- **Category Selection**: Clean, intuitive category browsing with icons
- **Dynamic Subcategories**: Context-aware subcategory filtering
- **Smart Form Generation**: Dynamic form fields based on selected category
- **Image Upload**: Multi-image upload with preview and management
- **Form Validation**: Comprehensive client-side validation
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **LazyCrazy-Inspired UI**: Clean, modern interface inspired by LazyCrazy design

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd post-your-ad
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── CategoryList.jsx      # Main category selection
│   ├── SubCategoryList.jsx   # Subcategory filtering
│   └── PostForm.jsx         # Dynamic form component
├── pages/
│   ├── HomePage.jsx         # Category selection page
│   └── PostFormPage.jsx     # Post ad form page
├── data/
│   └── categories.js        # Category data and form configs
├── App.jsx                  # Main app with routing
└── main.jsx                 # App entry point
```

## 🎨 Design System

The application uses a custom color scheme inspired by LazyCrazy:

- **Primary**: `#002F34` (Dark teal)
- **Secondary**: `#23E5DB` (Light teal)
- **Accent**: `#FFCE32` (Yellow)
- **Background**: `#F8F9FA` (Light gray)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Features in Detail

### Category Selection
- Visual category cards with icons
- Hover effects and active states
- Smooth transitions

### Dynamic Forms
- Form fields change based on category selection
- Support for text inputs, dropdowns, and multi-select buttons
- Real-time validation with error messages

### Image Upload
- Drag & drop image upload
- Image preview with remove functionality
- Support for up to 20 images
- Responsive image grid

### Form Validation
- Required field validation
- Phone number format validation
- Price validation
- Real-time error feedback

## 🎯 Usage

1. **Select Category**: Choose from available categories on the home page
2. **Pick Subcategory**: Select a specific subcategory to proceed
3. **Fill Form**: Complete the dynamic form with product details
4. **Upload Images**: Add photos to showcase your item
5. **Submit**: Post your ad (demo functionality)

## 🔮 Future Enhancements

- User authentication and profiles
- Real backend integration
- Advanced search and filtering
- Chat functionality
- Payment integration
- Mobile app version

## 📄 License

This project is created for demonstration purposes and is not affiliated with LazyCrazy.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React and Tailwind CSS
