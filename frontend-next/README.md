# BookStore Frontend - Next.js

A modern, fully-featured BookStore frontend built with Next.js 14, React 18, and TypeScript.

## Project Structure

```
frontend-next/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Authentication pages
│   │   ├── home/         # Reader home page
│   │   ├── addbook/      # Add book page (authors)
│   │   ├── dashboard/    # Author dashboard
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Login page
│   ├── components/       # Reusable React components
│   │   ├── AuthForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── BookCard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/          # React Context (Auth)
│   │   └── AuthContext.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useBooks.ts
│   ├── services/         # API services
│   │   ├── authService.ts
│   │   └── bookService.ts
│   ├── utils/            # Utility functions
│   │   └── api.ts
│   └── styles/           # CSS modules
│       ├── globals.css
│       ├── navbar.module.css
│       ├── authform.module.css
│       ├── bookcard.module.css
│       ├── home.module.css
│       ├── addbook.module.css
│       └── dashboard.module.css
├── public/               # Static assets
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Features

- **Authentication**: Login/Register with role-based access (Reader/Author)
- **Role-Based Routing**: Different pages for readers and authors
- **Book Management**: Authors can add, edit, and delete books
- **Book Browsing**: Readers can view available books
- **Protected Routes**: Secure routes based on user role
- **Context API**: Global state management for authentication
- **Custom Hooks**: Reusable logic for auth and book operations
- **API Integration**: Axios with interceptors for seamless API calls
- **Responsive Design**: Mobile-friendly CSS modules

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Navigate to the frontend-next directory:
```bash
cd frontend-next
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints Expected

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books/fetchbooks` - Get user's books (author)
- `GET /api/books/allbooks` - Get all books (reader)
- `POST /api/books/addbook` - Add a new book
- `PUT /api/books/updateBook/:id` - Update book
- `DELETE /api/books/deleteBook/:id` - Delete book

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:5000)

## Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Axios**: HTTP client
- **Context API**: State management
- **CSS Modules**: Component-scoped styling
- **js-cookie**: Cookie management

## Authentication Flow

1. User registers or logs in with role selection
2. Backend returns JWT token
3. Token stored in cookies (auth-token)
4. Role stored in localStorage (user-role)
5. Axios interceptor adds token to all requests
6. ProtectedRoute component prevents unauthorized access
