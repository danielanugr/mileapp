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

### Phase 3 (Complete)

- ✅ MongoDB index script
- ✅ Design decisions documentation
- ✅ Database index explanations

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

## Design Decisions

### Backend Design

#### 1. **MVC Architecture Pattern**

- **Controllers**: Centralized business logic, easy to test and maintain
- **Routes**: Clean route definitions, focused on HTTP concerns only
- **Data Layer**: Mock data separated from logic, easy to swap with real database

#### 2. **TypeScript Implementation**

- **Type Safety**: Prevents runtime errors with compile-time checks
- **Developer Experience**: Better autocomplete and refactoring support
- **API Contracts**: Shared types between frontend and backend

#### 3. **Authentication Strategy**

- **JWT Tokens**: Stateless authentication, scalable for distributed systems
- **bcrypt Hashing**: Industry-standard password security (salt rounds: 10)
- **Bearer Token**: Standard Authorization header implementation

#### 4. **API Design**

- **RESTful Endpoints**: Predictable and standard API structure
- **Query Parameters**: Flexible filtering, sorting, and pagination
- **Proper HTTP Status Codes**: 200, 201, 400, 401, 403, 404, 500
- **Consistent Response Format**: All responses follow the same structure

### Frontend Design

#### 1. **Vue 3 Composition API**

- **Better Logic Reuse**: Composable functions for shared logic
- **TypeScript Support**: Superior type inference
- **Performance**: Optimized reactivity system

#### 2. **State Management (Pinia)**

- **Type Safety**: Full TypeScript support out of the box
- **Lightweight**: Simpler and more performant than Vuex

#### 3. **Tailwind CSS**

- **Utility-First**: Rapid UI development without leaving HTML
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Consistency**: Design system built into the framework

#### 4. **API Service Layer**

- **Centralized HTTP Client**: Single axios instance with interceptors
- **Token Management**: Automatic token injection in requests
- **Error Handling**: Global 401/403 redirect to login
- **Type Safety**: Typed request/response interfaces

## Database Index Strategy

### Index Design Philosophy

The indexes were designed based on actual query patterns in the application.

#### 1. **Users Collection Indexes**

**`idx_users_email` (Unique)**

```javascript
{
  email: 1
}
```

- **Purpose**: Fast login queries and prevent duplicate emails
- **Justification**: Every login queries by email; uniqueness enforced at DB level
- **Performance Impact**: O(log n) lookup instead of O(n) table scan

**`idx_users_created_at`**

```javascript
{
  createdAt: -1
}
```

- **Purpose**: User analytics and admin panels
- **Justification**: Common query for "recently registered users"

#### 2. **Tasks Collection Indexes**

**`idx_tasks_user_created` (Compound)**

```javascript
{ userId: 1, createdAt: -1 }
```

- **Purpose**: Default task listing (newest first)
- **Justification**: Most common query - get user's tasks sorted by date
- **Performance**: Supports both filtering (userId) and sorting (createdAt)

**`idx_tasks_user_status_created` (Compound)**

```javascript
{ userId: 1, status: 1, createdAt: -1 }
```

- **Purpose**: Filter tasks by status (pending/in-progress/completed)
- **Justification**: Users frequently filter by status to focus on active tasks
- **Query Coverage**: `?status=pending&sortBy=createdAt`

**`idx_tasks_user_priority_created` (Compound)**

```javascript
{ userId: 1, priority: 1, createdAt: -1 }
```

- **Purpose**: Filter tasks by priority (low/medium/high)
- **Justification**: Priority-based task management is a core feature
- **Query Coverage**: `?priority=high&sortBy=createdAt`

**`idx_tasks_user_updated` (Compound)**

```javascript
{ userId: 1, updatedAt: -1 }
```

- **Purpose**: Sort by recently updated tasks
- **Justification**: Users want to see what changed recently
- **Query Coverage**: `?sortBy=updatedAt`

**`idx_tasks_text_search` (Text Index)**

```javascript
{ title: 'text', description: 'text' }
```

- **Purpose**: Full-text search in task title and description
- **Justification**: Users need to search for tasks by keywords
- **Query Coverage**: `?search=documentation`

**`idx_tasks_user_status_priority_created` (Compound)**

```javascript
{ userId: 1, status: 1, priority: 1, createdAt: -1 }
```

- **Purpose**: Combined filters (status + priority)
- **Justification**: Power users combine multiple filters
- **Query Coverage**: `?status=in-progress&priority=high`

### Index Selection Strategy

1. **Left-to-Right Rule**: Indexes can be used for queries matching the leftmost fields

   - `{ userId: 1, status: 1, createdAt: -1 }` works for:
     - `{ userId }` ✅
     - `{ userId, status }` ✅
     - `{ userId, status, createdAt }` ✅
     - `{ status }` ❌ (doesn't start with userId)

2. **ESR (Equality, Sort, Range) Rule**:

   - **Equality** fields first (userId, status, priority)
   - **Sort** fields next (createdAt, updatedAt)
   - **Range** fields last (not used in this app)

3. **Cardinality Considerations**:
   - High cardinality first: `userId` (many unique values)
   - Low cardinality next: `status` (3 values), `priority` (3 values)

### Index Trade-offs

**Pros:**

- Significantly faster queries (O(log n) vs O(n))
- Supports all application query patterns
- Enables efficient pagination
- Text search capability

**Cons:**

- Slower writes (indexes must be updated)
- Memory usage for index maintenance

**Decision**: Indexes are worth it because:

- Read operations >> Write operations in this app
- User experience benefits from fast queries

## Module Strengths

### 1. **Type Safety**

- Full TypeScript coverage on both frontend and backend
- Prevents runtime errors and improves developer experience
- Shared type definitions ensure API contract consistency

### 2. **Clean Architecture**

- Separation of concerns (routes, controllers, data, services)
- Easy to test, maintain, and extend
- Clear file structure and naming conventions

### 3. **Security**

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Automatic token expiration handling
- 401/403 automatic logout

### 4. **Performance**

- Optimized MongoDB indexes for all query patterns
- Efficient pagination (cursor-based ready)
- Lazy loading and code splitting (Vite)
- Production-optimized builds

### 5. **User Experience**

- Responsive design (mobile-first)
- Real-time validation
- Loading states and error handling
- Smooth navigation with Vue Router
- Debounced search (300ms)

### 6. **Developer Experience**

- Single command to run both servers (`npm run dev`)
- Hot reload for both frontend and backend
- Comprehensive README
- Well-documented code
- Easy to extend with new features

### 7. **Scalability**

- Stateless authentication (horizontal scaling ready)
- Indexed database queries (handles large datasets)
- Component-based architecture (reusable UI)
- Modular backend structure (easy to add microservices)

**Backend:**

```env
PORT=3001
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

**Frontend:**

```env
VITE_API_URL=https://your-backend-url.com/api
```
