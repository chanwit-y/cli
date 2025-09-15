# Mock API Server

A comprehensive mock API server built with Bun.js and Elysia framework. Perfect for development, testing, and prototyping.

## Features

- 🚀 **Fast**: Built with Bun.js for maximum performance
- 📊 **Complete CRUD**: Full Create, Read, Update, Delete operations
- 🔍 **Advanced Filtering**: Pagination, search, and filtering capabilities
- 📱 **Multiple Resources**: Users, Todos, and Posts with relationships
- 🔄 **CORS Enabled**: Ready for frontend development
- 🛠️ **Development Tools**: Data reset and seeding utilities
- 📈 **Statistics**: Built-in analytics endpoints

## Quick Start

### Installation

```bash
# Install dependencies
bun install

# Start development server (with hot reload)
bun run dev

# Or start production server
bun run start
```

The server will start on `http://localhost:3001`

### Health Check

```bash
curl http://localhost:3001/health
```

## API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users (with pagination) |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| POST | `/users/bulk` | Create multiple users |

**Example User Object:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "role": "admin"
}
```

**Query Parameters for GET /users:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `search` - Search in name and email fields

### Todos

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | List all todos (with filtering) |
| GET | `/todos/:id` | Get todo by ID |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |
| POST | `/todos/bulk` | Create multiple todos |

**Example Todo Object:**
```json
{
  "id": 1,
  "title": "Learn TypeScript",
  "completed": false,
  "userId": 1
}
```

**Query Parameters for GET /todos:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `userId` - Filter by user ID
- `completed` - Filter by completion status (true/false)

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List all posts |
| GET | `/posts/:id` | Get post by ID |
| POST | `/posts` | Create new post |
| PUT | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |

**Example Post Object:**
```json
{
  "id": 1,
  "title": "Getting Started with Bun",
  "content": "Bun is a fast JavaScript runtime...",
  "authorId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Utility Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stats` | Get database statistics |
| GET | `/search` | Search across all resources |
| POST | `/dev/reset` | Reset data to initial state |
| GET | `/dev/seed` | Add sample data |

## Usage Examples

### Create a new user
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Smith", "email": "alice@example.com", "age": 28, "role": "user"}'
```

### Get users with pagination
```bash
curl "http://localhost:3001/users?page=1&limit=5&search=john"
```

### Create a todo
```bash
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete project", "userId": 1}'
```

### Update a todo
```bash
curl -X PUT http://localhost:3001/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Search across all resources
```bash
curl "http://localhost:3001/search?q=typescript&type=todos"
```

### Get statistics
```bash
curl http://localhost:3001/stats
```

### Reset data (development)
```bash
curl -X POST http://localhost:3001/dev/reset
```

### Add sample data
```bash
curl http://localhost:3001/dev/seed
```

## Response Format

All successful responses return JSON data. List endpoints include pagination information:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

Error responses include error details:

```json
{
  "error": "User not found",
  "code": "NOT_FOUND"
}
```

## Development

### Project Structure
```
api/
├── index.ts          # Main server file
├── package.json      # Dependencies and scripts
├── README.md         # This file
└── tsconfig.json     # TypeScript configuration
```

### Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run build` - Build for production
- `bun run test` - Run tests

### Environment Variables

- `PORT` - Server port (default: 3001)

## Integration with Frontend

This mock API is designed to work seamlessly with the existing UI library and web application in this monorepo. The API endpoints match the expected data structures used by the frontend components.

Example integration with the existing API factory:

```typescript
import { http } from '../ui/src/libs/api/APIMaster';

// Update the base URL to point to your mock API
const mockHttp = new HttpClientFactory(
  'http://localhost:3001/',
  async () => "",
  "1.0.0",
  120000,
  [],
  []
);
```