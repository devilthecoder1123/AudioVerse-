# AudioVerse - Next.js 14 Architecture Documentation

## Overview

AudioVerse is a production-ready audiobook store built with **Next.js 14 App Router**, following modern React architecture patterns with strict separation of concerns, authentication-first design, and component maintainability standards.

## Core Architecture Principles

### 1. Next.js 14 App Router Architecture

- **Server Components**: Default rendering for optimal performance
- **Client Components**: Interactive features with explicit `"use client"` directives
- **File-based Routing**: Intuitive `/app` directory structure
- **Layout System**: Nested layouts with shared UI components
- **Dynamic Routes**: Parameter-based routing with `[id]` patterns

### 2. Authentication-First Design

- **Route Protection**: Automatic redirects based on authentication state
- **Conditional Navigation**: Smart header that adapts to user authentication
- **Registration Priority**: New users directed to registration by default
- **Session Persistence**: Zustand-powered authentication state

### 3. Component Architecture Standards

- **70-Line Limit**: All components refactored for maintainability
- **Container/Presentation Pattern**: Clean separation of UI and business logic
- **Reusable Components**: Extracted common patterns into shared components
- **Custom Hooks**: Business logic encapsulated in reusable hooks

## Project Structure

```
src/
├── app/                          # Next.js 14 App Router
│   ├── books/
│   │   ├── [id]/                # Dynamic book detail routes
│   │   │   └── page.tsx         # Book detail page
│   │   └── page.tsx             # Books listing page
│   ├── cart/
│   │   └── page.tsx             # Shopping cart page
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── register/
│   │   └── page.tsx             # Registration page
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page (auth-protected)
│   ├── not-found.tsx            # 404 error page
│   └── globals.css              # Global styles and CSS variables
├── components/
│   ├── ui/                      # Shadcn/ui component library
│   │   ├── button.tsx           # Button variants
│   │   ├── avatar.tsx           # User avatar component
│   │   ├── dropdown-menu.tsx    # Dropdown menus
│   │   └── [30+ UI components]  # Complete design system
│   ├── layout/                  # Layout and navigation
│   │   ├── Header.tsx           # Main header export
│   │   ├── HeaderContainer.tsx  # Header business logic
│   │   ├── HeaderPresentation.tsx # Header UI component
│   │   ├── HeaderUserMenu.tsx   # User menu with auth states
│   │   ├── HeaderNavigation.tsx # Navigation with conditional rendering
│   │   ├── HeaderSearch.tsx     # Search functionality
│   │   └── MobileMenu.tsx       # Mobile navigation menu
│   ├── pages/                   # Page-specific components
│   │   ├── BooksPageContainer.tsx     # Books page logic
│   │   ├── BooksPagePresentation.tsx  # Books page UI
│   │   ├── CartPageContainer.tsx      # Cart page logic
│   │   ├── CartPagePresentation.tsx   # Cart page UI
│   │   ├── LoginPageContainer.tsx     # Login page logic
│   │   ├── LoginPagePresentation.tsx  # Login page UI
│   │   ├── RegisterPageContainer.tsx  # Registration logic
│   │   └── RegisterPagePresentation.tsx # Registration UI
│   ├── audiobook/               # Audiobook-specific components
│   │   ├── AudioBookCard.tsx           # Card component export
│   │   ├── AudioBookCardContainer.tsx  # Card business logic
│   │   └── AudioBookCardPresentation.tsx # Card UI component
│   ├── auth/                    # Authentication components
│   │   ├── ProtectedRoute.tsx   # Route protection wrapper
│   │   ├── PublicRoute.tsx      # Public route wrapper
│   │   ├── AuthForm.tsx         # Reusable auth form
│   │   └── FormField.tsx        # Form input component
│   └── home/                    # Home page sections
│       ├── HeroSection.tsx      # Hero with animations
│       ├── FeaturedSection.tsx  # Featured books
│       ├── PopularSection.tsx   # Popular books
│       └── FeaturesSection.tsx  # App features showcase
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts              # Authentication operations
│   ├── useCart.ts              # Shopping cart management
│   ├── useAudiobooks.ts        # Audiobook data and filtering
│   ├── useFormValidation.ts    # Form validation logic
│   ├── usePasswordToggle.ts    # Password visibility toggle
│   ├── useMobile.ts            # Mobile device detection
│   └── useToast.ts             # Toast notifications
├── services/                    # Business logic and API
│   ├── auth.ts                 # Authentication service
│   └── cart.ts                 # Cart operations service
├── stores/                      # Zustand state management
│   ├── authStore.ts            # Authentication state
│   └── cartStore.ts            # Shopping cart state
├── data/                        # Mock data and types
│   ├── mockAudiobooks.ts       # Sample audiobook data
│   └── audiobook-data.ts       # Data utilities
├── utils/                       # Helper functions
│   ├── audiobookFilters.ts     # Filtering logic
│   ├── pagination.ts           # Pagination utilities
│   └── cn.ts                   # Class name utilities
├── lib/                         # Configuration and utilities
│   └── utils.ts                # Shared utility functions
└── providers/                   # React context providers
    └── providers.tsx           # App-wide providers
```

## Key Architectural Components

### Authentication System Architecture

```typescript
// Authentication Flow
1. Root Layout (layout.tsx)
   ├── Providers (auth context)
   ├── Header (conditional navigation)
   └── Protected/Public Route Wrappers

2. Route Protection
   ├── ProtectedRoute.tsx - Requires authentication
   ├── PublicRoute.tsx - Redirects if authenticated
   └── Conditional rendering in components

3. Authentication State
   ├── useAuth hook - Business logic
   ├── authStore (Zustand) - Global state
   └── Persistent storage - localStorage integration
```

### Header System Architecture

```typescript
// Header Component Hierarchy
Header.tsx (Export)
└── HeaderContainer.tsx (Business Logic)
    └── HeaderPresentation.tsx (UI Layout)
        ├── HeaderLogo.tsx
        ├── HeaderSearch.tsx (Conditional)
        ├── HeaderNavigation.tsx (Conditional)
        │   ├── Browse Button (Auth Required)
        │   ├── Cart Button (Auth Required)
        │   └── HeaderUserMenu.tsx
        │       ├── User Avatar (Authenticated)
        │       └── Login/Signup Buttons (Unauthenticated)
        └── MobileMenu.tsx (Responsive)
            ├── Search (Conditional)
            ├── Navigation (Conditional)
            └── MobileMenuActions.tsx
```

### Page Component Architecture

```typescript
// Container/Presentation Pattern
PageContainer.tsx:
- Authentication checks
- Data fetching with custom hooks
- State management
- Event handlers
- Business logic

PagePresentation.tsx:
- Pure UI rendering
- Props-based data display
- No side effects
- Easily testable
- Reusable across contexts
```

## Custom Hooks Architecture

### Authentication Hook

```typescript
// useAuth.ts - Complete authentication management
interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  register: (email: string, password: string, name: string) => Promise<AuthResult>;
  logout: () => void;
  clearError: () => void;
}

// Features:
- Zustand store integration
- Persistent session management
- Mock authentication with realistic delays
- Error handling and loading states
- Google OAuth simulation
```

### Shopping Cart Hook

```typescript
// useCart.ts - Cart operations and state
interface UseCartReturn {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
  addItem: (audiobook: Audiobook) => Promise<CartResult>;
  removeItem: (audiobookId: string) => void;
  updateQuantity: (audiobookId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getItemById: (audiobookId: string) => CartItem | undefined;
}

// Features:
- Authentication-required operations
- Persistent localStorage storage
- Real-time total calculations
- Optimistic UI updates
```

### Form Management Hooks

```typescript
// useFormValidation.ts - Generic form validation
interface UseFormValidationReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  isValid: boolean;
  handleChange: (field: keyof T, value: string) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: FormEvent) => void;
  reset: () => void;
}

// usePasswordToggle.ts - Password visibility management
interface UsePasswordToggleReturn {
  isVisible: boolean;
  toggle: () => void;
  type: 'password' | 'text';
}
```

### Data Management Hooks

```typescript
// useAudiobooks.ts - Audiobook data and filtering
interface UseAudiobooksReturn {
  audiobooks: Audiobook[];
  featuredBooks: Audiobook[];
  filteredBooks: Audiobook[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedGenre: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string) => void;
  setSortBy: (sort: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}
```

## Architecture Benefits

### 1. Next.js 14 Optimization
- **Server Components**: Optimal performance with server-side rendering
- **Client Components**: Minimal JavaScript for interactive features
- **App Router**: File-based routing with nested layouts
- **Image Optimization**: Built-in Next.js image handling
- **Code Splitting**: Automatic optimization for better performance

### 2. Authentication-First Design
- **Route Protection**: Automatic redirects based on authentication state
- **Conditional UI**: Navigation adapts to user authentication status
- **Session Persistence**: Seamless user experience across sessions
- **Security**: Protected routes and authentication-required features

### 3. Component Maintainability
- **70-Line Limit**: All components under maintainable size limits
- **Container/Presentation**: Clear separation of concerns
- **Reusable Components**: Extracted common patterns (FormField, AuthForm, etc.)
- **Custom Hooks**: Business logic encapsulated and reusable

### 4. Developer Experience
- **TypeScript**: Comprehensive type safety throughout
- **ESLint**: Next.js best practices enforcement
- **Tailwind CSS**: Utility-first styling with design system
- **Component Library**: Consistent UI with Radix UI + shadcn/ui

### 5. Scalability
- **Modular Architecture**: Easy to add new features
- **State Management**: Zustand for lightweight global state
- **Custom Hooks**: Reusable business logic across components
- **Clean APIs**: Well-defined interfaces between layers

## Implementation Examples

### Authentication-Based Navigation

```typescript
// HeaderPresentation.tsx - Conditional rendering
export function HeaderPresentation({ isAuthenticated, ...props }) {
  return (
    <header className="sticky top-0 z-[100] bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <HeaderLogo />
          
          {/* Only show search when authenticated */}
          {isAuthenticated && <HeaderSearch />}
          
          <HeaderNavigation {...props} />
        </div>
      </div>
    </header>
  );
}

// HeaderNavigation.tsx - Protected features
export function HeaderNavigation({ isAuthenticated, ...props }) {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      {/* Only show Browse and Cart when authenticated */}
      {isAuthenticated && (
        <>
          <Link href="/books">
            <Button variant="ghost">Browse</Button>
          </Link>
          <CartButton {...props} />
        </>
      )}
      <HeaderUserMenu {...props} />
    </nav>
  );
}
```

### Container/Presentation Pattern

```typescript
// BooksPageContainer.tsx - Business logic
export function BooksPageContainer() {
  const { isAuthenticated, isLoading } = useAuth();
  const { 
    audiobooks, 
    filteredBooks, 
    searchQuery, 
    setSearchQuery,
    // ... other filtering state
  } = useAudiobooks();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <BooksPagePresentation
      audiobooks={filteredBooks}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      // ... other props
    />
  );
}

// BooksPagePresentation.tsx - Pure UI
export function BooksPagePresentation({
  audiobooks,
  searchQuery,
  onSearchChange,
  // ... other props
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Browse Audiobooks" />
      <BookFilters 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        // ... other filter props
      />
      <BookGrid audiobooks={audiobooks} />
    </div>
  );
}
```

### Custom Hook Usage

```typescript
// Using multiple hooks in a container component
function CartPageContainer() {
  const { isAuthenticated, user } = useAuth();
  const { 
    items, 
    total, 
    itemCount, 
    removeItem, 
    updateQuantity, 
    clearCart 
  } = useCart();
  
  const handleCheckout = async () => {
    // Checkout logic
  };

  return (
    <CartPagePresentation
      user={user}
      items={items}
      total={total}
      itemCount={itemCount}
      onRemoveItem={removeItem}
      onUpdateQuantity={updateQuantity}
      onClearCart={clearCart}
      onCheckout={handleCheckout}
    />
  );
}
```

## Key Implementation Features

### Authentication-First Flow
1. **New User Experience**: Automatic redirect to registration page
2. **Protected Navigation**: Search, browse, and cart only visible after login
3. **Smart Redirects**: Context-aware routing based on authentication state
4. **Session Persistence**: Seamless experience across browser sessions

### Component Standards
1. **70-Line Limit**: All components refactored for maintainability
2. **Reusable Patterns**: FormField, AuthForm, PageHeader, etc.
3. **Consistent Styling**: Tailwind CSS with design system variables
4. **Accessibility**: Radix UI primitives for keyboard and screen reader support

### Performance Optimizations
1. **Server Components**: Default rendering strategy for optimal performance
2. **Client Components**: Minimal JavaScript for interactive features only
3. **Code Splitting**: Automatic optimization via Next.js App Router
4. **Image Optimization**: Built-in Next.js image handling
5. **CSS Optimization**: Tailwind purging and PostCSS processing

## Technology Integration

### State Management
- **Zustand**: Lightweight global state for auth and cart
- **React Query**: Server state management (ready for API integration)
- **Local State**: Component-specific state with React hooks
- **Persistent Storage**: localStorage integration for cart and auth

### Styling System
- **Tailwind CSS**: Utility-first styling with custom design system
- **CSS Variables**: Dynamic theming and consistent color palette
- **Radix UI**: Accessible component primitives
- **Responsive Design**: Mobile-first approach with breakpoint system
