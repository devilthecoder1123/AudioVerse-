# AudioVerse - Premium Audiobook Store

A modern, responsive audiobook store built with React, TypeScript, and Tailwind CSS. Features a beautiful audio-inspired design with smooth animations and a premium user experience.

## 🎧 Features

### Core Functionality

- **User Authentication**: Login and registration with mock authentication
- **Product Catalog**: Browse audiobooks with search and filtering
- **Product Details**: Detailed book pages with audio samples
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage
- **Responsive Design**: Optimized for desktop and mobile devices

### Design & UX

- **Audio-Inspired Theme**: Sound wave animations and audio visualizations
- **Modern Aesthetics**: Glass-morphism effects and gradient designs
- **Smooth Animations**: Micro-interactions and page transitions
- **Premium Typography**: Inter font with elegant hierarchy
- **Dark Theme**: Sophisticated color palette with purple and amber accents

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for cart and authentication
- **Routing**: React Router v6
- **UI Components**: Shadcn/ui with custom variants
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Animations**: Custom CSS animations with Tailwind

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd audioverse
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## 📱 Pages & Features

### 🏠 Home Page

- Hero section with audio-inspired animations
- Featured audiobooks carousel
- Popular books section
- Statistics and social proof

### 🔐 Authentication

- **Login**: Email/password with show/hide toggle
- **Register**: Full registration form with password validation
- **Demo Access**: Quick demo login options
- **Persistent Sessions**: Auto-save login state

### 📚 Browse Books

- **Search**: Real-time search across titles, authors, and narrators
- **Filters**: Genre filtering and sorting options
- **View Modes**: Grid and list view options
- **Pagination**: Load more functionality

### 📖 Book Details

- **Audio Samples**: Mock audio player with visualizations
- **Full Information**: Author, narrator, duration, ratings
- **Related Books**: Suggestions based on genre/author
- **Purchase Options**: Add to cart with authentication check

### 🛒 Shopping Cart

- **Persistent Storage**: Cart saved in localStorage
- **Quantity Management**: Increase/decrease quantities
- **Order Summary**: Real-time total calculations
- **Checkout Flow**: Mock checkout process

## 🎨 Design System

### Color Palette

- **Primary**: Deep purple gradients (`hsl(258, 90%, 66%)`)
- **Accent**: Warm amber (`hsl(32, 95%, 64%)`)
- **Background**: Dark theme with subtle gradients
- **Glass Effects**: Translucent overlays with backdrop blur

### Typography

- **Font Family**: Inter (Google Fonts)
- **Hierarchy**: From 3xl headings to xs captions
- **Text Gradients**: Primary color gradients for emphasis

### Animations

- **Audio Waves**: CSS keyframes for sound visualization
- **Fade In Up**: Staggered entrance animations
- **Hover Effects**: Scale and glow transformations
- **Float**: Subtle floating animations for accents

## 🔧 Architecture Decisions

### State Management

- **Zustand**: Lightweight alternative to Redux
- **Persistent Storage**: localStorage for cart and auth
- **Type Safety**: Full TypeScript integration

### Component Structure

- **Atomic Design**: Reusable UI components
- **Custom Variants**: Extended shadcn components
- **Layout Components**: Header with responsive navigation
- **Page Components**: Feature-complete route components

### Performance

- **Code Splitting**: React Router lazy loading ready
- **Optimized Builds**: Vite for fast development and builds
- **Responsive Images**: CSS-based responsive design
- **Minimal Bundle**: Tree-shaking and dead code elimination

### Mock Data

- **Realistic Content**: 8 curated audiobooks across genres
- **Flexible Structure**: Easy to replace with real API
- **Type Definitions**: Full TypeScript interfaces

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── layout/             # Layout components (Header)
│   └── audiobook/          # Book-specific components
├── pages/                  # Route components
├── lib/                    # Utilities and stores
│   ├── store.ts           # Zustand stores
│   ├── data.ts            # Mock data
│   └── utils.ts           # Helper functions
├── hooks/                  # Custom React hooks
└── assets/                 # Static assets
```

## 🎯 Key Features Implementation

### Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Collapsible navigation menu
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

### Shopping Cart

- Add/remove items with quantity management
- Persistent storage across browser sessions
- Real-time total calculations
- Empty state with call-to-action

### Authentication Flow

- Mock authentication with realistic delays
- Form validation and error handling
- Protected routes and conditional rendering
- User session management

### Search & Filtering

- Real-time search across multiple fields
- Genre-based filtering
- Sort options (newest, price, rating, title)
- Active filter indicators

## 🚀 Future Enhancements

- Real backend integration with API
- Audio streaming functionality
- User reviews and ratings
- Wishlist and favorites
- Payment processing
- User library and downloads
- Advanced search with faceted filtering
- Social features and recommendations

## 📄 License

This project is built for demonstration purposes. All design elements and code are original work created for this technical assessment.

---

Built with ❤️ and 🎧 for the love of audiobooks and great user experiences.
