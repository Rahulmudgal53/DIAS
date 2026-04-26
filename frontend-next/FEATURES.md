# BookStore - Production-Ready Next.js Application

A fully-featured, market-ready bookstore application with role-based access, advanced features, and professional UI/UX.

## 🚀 Features Overview

### For Readers
- ✅ **Browse & Search Books** - Full-text search with filtering by genre and price
- ✅ **Book Details** - View comprehensive book information, ratings, and reviews
- ✅ **Wishlist** - Save favorite books for later purchase
- ✅ **Purchase & Download** - Buy and download books directly
- ✅ **Reviews & Ratings** - Read reviews and rate books (1-5 stars)
- ✅ **Purchase History** - Track all purchases and downloads
- ✅ **User Profile** - Manage profile and view statistics

### For Authors
- ✅ **Publish Books** - Add new books with detailed metadata
- ✅ **Dashboard** - View all published books at a glance
- ✅ **Analytics** - Track sales, revenue, and book performance
- ✅ **Book Management** - Edit, update, and delete published books
- ✅ **Sales Tracking** - Monitor book sales in real-time
- ✅ **Author Profile** - Build author presence and bio

### General Features
- ✅ **Authentication** - Secure login/registration with JWT
- ✅ **Role-Based Access** - Separate interfaces for readers and authors
- ✅ **Toast Notifications** - Real-time feedback for user actions
- ✅ **Form Validation** - Client-side validation with helpful error messages
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Protected Routes** - Secure pages with automatic redirects
- ✅ **Error Handling** - Comprehensive error management

## 📁 Project Structure

```
frontend-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Login page (home)
│   │   ├── explore/           # Book exploration/search
│   │   ├── home/              # Reader home (deprecated, use explore)
│   │   ├── addbook/           # Add new book (authors)
│   │   ├── dashboard/         # Author dashboard
│   │   ├── analytics/         # Author analytics
│   │   ├── wishlist/          # Reader wishlist
│   │   ├── purchases/         # Purchase history
│   │   └── layout.tsx         # Root layout with providers
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation with role-based menu
│   │   ├── AuthForm.tsx       # Login/Register form
│   │   ├── ProtectedRoute.tsx # Route protection wrapper
│   │   ├── BookCard.tsx       # Individual book card
│   │   ├── BookDetails.tsx    # Book modal with reviews
│   │   ├── ReviewForm.tsx     # Review submission form
│   │   ├── ReviewList.tsx     # Reviews display
│   │   ├── SearchBar.tsx      # Search with filters
│   │   ├── UserProfile.tsx    # User profile modal
│   │   ├── Toast.tsx          # Toast notification
│   │   └── ToastContainer.tsx # Toast container
│   ├── services/              # API service layer
│   │   ├── authService.ts     # Authentication
│   │   ├── bookService.ts     # Book operations
│   │   ├── userService.ts     # User profile
│   │   ├── reviewService.ts   # Reviews & ratings
│   │   ├── wishlistService.ts # Wishlist
│   │   └── purchaseService.ts # Purchases & downloads
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts         # Authentication logic
│   │   ├── useBooks.ts        # Book management
│   │   ├── useSearch.ts       # Search functionality
│   │   └── useToast.ts        # Toast notifications
│   ├── context/
│   │   └── AuthContext.tsx    # Global auth state
│   ├── utils/
│   │   ├── api.ts             # Axios instance with interceptors
│   │   ├── validation.ts      # Form validation functions
│   │   ├── constants.ts       # App-wide constants
│   │   └── toast.ts           # Toast management
│   └── styles/                # CSS modules
│       └── *.module.css       # Component styles
└── public/                    # Static assets
```

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Language**: TypeScript
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API + Custom Hooks
- **Styling**: CSS Modules
- **Authentication**: JWT tokens + Cookies
- **Form Validation**: Custom validation utilities
- **Notifications**: Custom toast system

## 🔑 Key Components

### Authentication & Authorization
- **AuthContext**: Global authentication state provider
- **useAuthHook**: Login/register logic with error handling
- **ProtectedRoute**: Route-level access control
- **JWT Token Management**: Automatic token refresh and validation

### Book Management
- **Book Service**: CRUD operations for books
- **useBooks Hook**: State management for book operations
- **BookCard Component**: Reusable book display
- **BookDetails Modal**: Rich book information with reviews

### Search & Discovery
- **SearchBar Component**: Advanced search with filtering
- **useSearch Hook**: Search logic with genre/price filtering
- **Explore Page**: Main discovery interface

### Reviews & Ratings
- **ReviewForm**: Star rating and comment submission
- **ReviewList**: Display book reviews
- **Review Service**: CRUD for reviews
- **Average Rating Display**: Visual rating indicators

### Wishlist & Purchases
- **Wishlist Service**: Add/remove from wishlist
- **Purchase Service**: Manage purchases and downloads
- **Wishlist Page**: Dedicated wishlist management
- **Purchase History**: Track all purchases

### User Profile & Analytics
- **UserService**: Profile management
- **User Profile Modal**: Edit profile and view stats
- **Author Dashboard**: Overview of published books
- **Analytics Page**: Sales and revenue tracking

### Notifications
- **Toast System**: Non-blocking notifications
- **useToast Hook**: Toast management
- **Toast Component**: Individual toast display
- **Toast Container**: Notification container

## 📋 API Endpoints Expected

### Authentication
```
POST /api/auth/register       # Create new account
POST /api/auth/login          # Login user
GET  /api/auth/profile        # Get user profile
PUT  /api/auth/updateProfile  # Update profile
GET  /api/auth/stats          # User statistics
```

### Books
```
GET  /api/book/fetchbooks     # Get user's books (author)
GET  /api/book/fetchallbooks  # Get all books (reader)
POST /api/book/addbook        # Add new book
PUT  /api/book/updateBook/:id # Update book
DELETE /api/book/deleteBook/:id # Delete book
```

### Reviews
```
GET  /api/reviews/book/:bookId        # Get book reviews
POST /api/reviews/create              # Add review
PUT  /api/reviews/:reviewId           # Update review
DELETE /api/reviews/:reviewId         # Delete review
GET  /api/reviews/rating/:bookId      # Get average rating
```

### Wishlist
```
GET  /api/wishlist              # Get wishlist
POST /api/wishlist/add          # Add to wishlist
DELETE /api/wishlist/:bookId    # Remove from wishlist
GET  /api/wishlist/check/:bookId # Check if in wishlist
```

### Purchases
```
GET  /api/purchases/history     # Get purchase history
POST /api/purchases/buy         # Create purchase
GET  /api/purchases/download/:id # Get download link
GET  /api/purchases/sales       # Get author sales
```

## 🎨 UI/UX Features

- **Responsive Grid Layout**: Mobile-first design
- **Modal Dialogs**: Clean overlays for detailed views
- **Form Validation**: Real-time error messages
- **Toast Notifications**: Non-intrusive feedback
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Color Coding**: Primary, danger, success colors
- **Icons**: Emoji-based icons for accessibility
- **Animations**: Smooth transitions and slide-ins

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Cookie Storage**: HttpOnly cookies for tokens
- **Route Protection**: Unauthorized access prevention
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Client-side validation
- **Error Boundaries**: Graceful error handling

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🚀 Getting Started

### Installation
```bash
cd frontend-next
npm install
```

### Configuration
Update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 📊 User Flows

### Reader Flow
1. Register/Login as Reader
2. Explore books via search and filters
3. View book details, ratings, and reviews
4. Add books to wishlist
5. Purchase and download books
6. View purchase history
7. Manage profile

### Author Flow
1. Register/Login as Author
2. Add new books with metadata
3. View dashboard of published books
4. Monitor sales and revenue in analytics
5. Edit or delete books as needed
6. Manage author profile and bio

## 🎯 Production-Ready Features

✅ **Performance Optimization**
- Code splitting with Next.js
- Image optimization
- CSS module scoping

✅ **Error Handling**
- Try-catch blocks in services
- Error boundary components
- User-friendly error messages

✅ **User Experience**
- Form validation with tooltips
- Loading states for async operations
- Toast notifications for feedback
- Responsive design

✅ **Code Quality**
- TypeScript for type safety
- Consistent naming conventions
- Modular component architecture
- Service layer separation

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Descriptive button titles

## 🔄 State Management

- **Auth State**: AuthContext Provider
- **Book State**: useBooks Hook + Custom Logic
- **UI State**: Component-level useState
- **Toast State**: useToast Hook with Event System

## 🎓 Best Practices Implemented

- ✅ Component composition
- ✅ Custom hooks for logic reuse
- ✅ Service layer for API calls
- ✅ Context API for global state
- ✅ Type-safe TypeScript
- ✅ CSS module scoping
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ Accessibility features

## 📝 Future Enhancements

- Advanced search with Elasticsearch
- Book recommendations engine
- Social features (follow authors)
- Payment gateway integration
- Email notifications
- Admin dashboard
- Advanced analytics
- Book categories/subcategories
- Author verification
- Bestseller tracking
- Reading progress tracking

---

**Ready for deployment and market launch!** 🎉
