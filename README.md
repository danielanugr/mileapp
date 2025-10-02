# MileApp Login & Task Manager

Full-stack application with authentication and task CRUD operations.

## Tech Stack

### Backend
- TypeScript
- Express.js
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- Vue.js 3 (Composition API)
- TypeScript
- Pinia (State Management)
- Vue Router
- Tailwind CSS
- Axios

## Project Structure

```
.
├── backend/              # Express API server
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── data/         # Mock data
│   │   ├── middleware/   # Auth middleware
│   │   ├── routes/       # API routes
│   │   └── types/        # TypeScript types
├── frontend/             # Vue.js application
│   ├── src/
│   │   ├── components/   # Vue components
│   │   ├── services/     # API services
│   │   ├── stores/       # Pinia stores
│   │   ├── types/        # TypeScript types
│   │   └── views/        # Page components
└── db/                   # Database indexes (Phase 3)
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

Or install separately:
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd frontend && npm install
```

### Running the Application

#### Run both frontend and backend together:
```bash
npm run dev
```

#### Or run separately:
```bash
# Backend only (port 3001)
npm run dev:backend

# Frontend only (port 3000)
npm run dev:frontend
```

### Building for Production

```bash
# Build both
npm run build

# Build separately
npm run build:backend
npm run build:frontend
```

## Demo Credentials

- **Email:** admin@mileapp.com
- **Password:** password123

or

- **Email:** user@mileapp.com
- **Password:** user123

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks (with filtering, sorting, pagination)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Query Parameters for GET /api/tasks
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (createdAt, updatedAt, title, priority, status)
- `sortOrder` - Sort direction (asc, desc)
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title and description

## Features

### Phase 1 (Complete)
- ✅ User authentication with JWT
- ✅ Login page with form validation
- ✅ Protected routes

### Phase 2 (Complete)
- ✅ Task CRUD operations
- ✅ Filtering by status and priority
- ✅ Sorting by multiple fields
- ✅ Search functionality
- ✅ Pagination
- ✅ Responsive UI with Tailwind CSS

### Phase 3 (Pending)
- ⏳ MongoDB index script
- ⏳ Deployment
- ⏳ Final documentation

## Development

### Backend
```bash
cd backend
npm run dev    # Run with nodemon
npm run build  # Compile TypeScript
```

### Frontend
```bash
cd frontend
npm run dev    # Run Vite dev server
npm run build  # Build for production
```

## Architecture

### Backend Architecture
- **MVC Pattern**: Controllers separate business logic from routes
- **Data Layer**: Mock data isolated in `/data` folder
- **Middleware**: JWT authentication middleware
- **Type Safety**: Full TypeScript coverage

### Frontend Architecture
- **Component-based**: Reusable Vue components
- **State Management**: Pinia stores for auth and tasks
- **Service Layer**: Axios-based API services
- **Route Protection**: Vue Router guards

## License

ISC