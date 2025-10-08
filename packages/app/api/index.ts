import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

// Mock data generators
const generateId = () => Math.floor(Math.random() * 10000) + 1;

// Sample data
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    role: "admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    role: "user",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 35,
    role: "user",
  },
];

let todos = [
  { id: 1, title: "Learn TypeScript", completed: false, userId: 1 },
  { id: 2, title: "Build API", completed: true, userId: 1 },
  { id: 3, title: "Write tests", completed: false, userId: 2 },
  { id: 4, title: "Deploy app", completed: false, userId: 3 },
];

let posts = [
  {
    id: 1,
    title: "Getting Started with Bun",
    content: "Bun is a fast JavaScript runtime...",
    authorId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Building APIs with Elysia",
    content: "Elysia is a fast web framework...",
    authorId: 2,
    createdAt: new Date().toISOString(),
  },
];

// Create Elysia app
const app = new Elysia()
  .use(cors())
  .onError(({ code, error }) => {
    return { error: error.toString(), code };
  })

  // Health check
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))

  .get("/mock/users", () => {
    return {
      data: [
        {
          id: "1",
          firstName: "Tanner",
          lastName: "Linsley",
          age: 33,
          visits: 100,
          progress: 50,
          status: "Married",
        },
        {
          id: "2",
          firstName: "Kevin",
          lastName: "Vandy",
          age: 27,
          visits: 200,
          progress: 100,
          status: "Single",
        },
        {
          id: "3",
          firstName: "John",
          lastName: "Doe",
          age: 33,
          visits: 150,
          progress: 75,
          status: "Single",
        },
        {
          id: "4",
          firstName: "Jane",
          lastName: "Smith",
          age: 28,
          visits: 100,
          progress: 50,
          status: "Married",
        },
        {
          id: "5",
          firstName: "Alice",
          lastName: "Johnson",
          age: 35,
          visits: 300,
          progress: 90,
          status: "Divorced",
        },
        {
          id: "6",
          firstName: "Bob",
          lastName: "Brown",
          age: 27,
          visits: 75,
          progress: 25,
          status: "Single",
        },
        {
          id: "7",
          firstName: "Emily",
          lastName: "Davis",
          age: 31,
          visits: 180,
          progress: 65,
          status: "Married",
        },
        {
          id: "8",
          firstName: "Michael",
          lastName: "Wilson",
          age: 29,
          visits: 220,
          progress: 85,
          status: "Single",
        },
        {
          id: "9",
          firstName: "Sarah",
          lastName: "Miller",
          age: 26,
          visits: 95,
          progress: 40,
          status: "Single",
        },
        {
          id: "10",
          firstName: "David",
          lastName: "Garcia",
          age: 38,
          visits: 350,
          progress: 95,
          status: "Married",
        },
        {
          id: "11",
          firstName: "Lisa",
          lastName: "Martinez",
          age: 32,
          visits: 125,
          progress: 60,
          status: "Divorced",
        },
        {
          id: "12",
          firstName: "James",
          lastName: "Anderson",
          age: 24,
          visits: 80,
          progress: 30,
          status: "Single",
        },
        {
          id: "13",
          firstName: "Maria",
          lastName: "Rodriguez",
          age: 36,
          visits: 280,
          progress: 88,
          status: "Married",
        },
        {
          id: "14",
          firstName: "Robert",
          lastName: "Taylor",
          age: 41,
          visits: 420,
          progress: 92,
          status: "Divorced",
        },
        {
          id: "15",
          firstName: "Jennifer",
          lastName: "Thomas",
          age: 30,
          visits: 160,
          progress: 70,
          status: "Single",
        },
        {
          id: "16",
          firstName: "William",
          lastName: "Jackson",
          age: 25,
          visits: 90,
          progress: 35,
          status: "Single",
        },
        {
          id: "17",
          firstName: "Amanda",
          lastName: "White",
          age: 34,
          visits: 240,
          progress: 80,
          status: "Married",
        },
        {
          id: "18",
          firstName: "Christopher",
          lastName: "Harris",
          age: 37,
          visits: 310,
          progress: 87,
          status: "Divorced",
        },
        {
          id: "19",
          firstName: "Jessica",
          lastName: "Clark",
          age: 28,
          visits: 140,
          progress: 55,
          status: "Single",
        },
        {
          id: "20",
          firstName: "Daniel",
          lastName: "Lewis",
          age: 39,
          visits: 380,
          progress: 93,
          status: "Married",
        },
        {
          id: "21",
          firstName: "Ashley",
          lastName: "Walker",
          age: 26,
          visits: 110,
          progress: 45,
          status: "Single",
        },
        {
          id: "22",
          firstName: "Matthew",
          lastName: "Hall",
          age: 33,
          visits: 190,
          progress: 72,
          status: "Married",
        },
        {
          id: "23",
          firstName: "Stephanie",
          lastName: "Allen",
          age: 31,
          visits: 170,
          progress: 68,
          status: "Divorced",
        },
        {
          id: "24",
          firstName: "Anthony",
          lastName: "Young",
          age: 29,
          visits: 130,
          progress: 58,
          status: "Single",
        },
        {
          id: "25",
          firstName: "Michelle",
          lastName: "King",
          age: 35,
          visits: 260,
          progress: 82,
          status: "Married",
        },
        {
          id: "26",
          firstName: "Joshua",
          lastName: "Wright",
          age: 27,
          visits: 105,
          progress: 42,
          status: "Single",
        },
        {
          id: "27",
          firstName: "Kimberly",
          lastName: "Lopez",
          age: 32,
          visits: 200,
          progress: 75,
          status: "Divorced",
        },
        {
          id: "28",
          firstName: "Andrew",
          lastName: "Hill",
          age: 40,
          visits: 400,
          progress: 90,
          status: "Married",
        },
        {
          id: "29",
          firstName: "Nicole",
          lastName: "Scott",
          age: 28,
          visits: 145,
          progress: 62,
          status: "Single",
        },
        {
          id: "30",
          firstName: "Ryan",
          lastName: "Green",
          age: 26,
          visits: 85,
          progress: 38,
          status: "Single",
        },
        {
          id: "31",
          firstName: "Elizabeth",
          lastName: "Adams",
          age: 34,
          visits: 230,
          progress: 78,
          status: "Married",
        },
        {
          id: "32",
          firstName: "Brandon",
          lastName: "Baker",
          age: 30,
          visits: 175,
          progress: 66,
          status: "Single",
        },
        {
          id: "33",
          firstName: "Megan",
          lastName: "Gonzalez",
          age: 29,
          visits: 155,
          progress: 64,
          status: "Divorced",
        },
        {
          id: "34",
          firstName: "Jason",
          lastName: "Nelson",
          age: 36,
          visits: 290,
          progress: 84,
          status: "Married",
        },
        {
          id: "35",
          firstName: "Rachel",
          lastName: "Carter",
          age: 25,
          visits: 95,
          progress: 41,
          status: "Single",
        },
        {
          id: "36",
          firstName: "Justin",
          lastName: "Mitchell",
          age: 31,
          visits: 185,
          progress: 71,
          status: "Single",
        },
        {
          id: "37",
          firstName: "Samantha",
          lastName: "Perez",
          age: 33,
          visits: 210,
          progress: 76,
          status: "Married",
        },
        {
          id: "38",
          firstName: "Kevin",
          lastName: "Roberts",
          age: 28,
          visits: 120,
          progress: 52,
          status: "Single",
        },
        {
          id: "39",
          firstName: "Laura",
          lastName: "Turner",
          age: 37,
          visits: 320,
          progress: 89,
          status: "Divorced",
        },
        {
          id: "40",
          firstName: "Steven",
          lastName: "Phillips",
          age: 42,
          visits: 450,
          progress: 96,
          status: "Married",
        },
        {
          id: "41",
          firstName: "Amy",
          lastName: "Campbell",
          age: 27,
          visits: 115,
          progress: 48,
          status: "Single",
        },
        {
          id: "42",
          firstName: "Brian",
          lastName: "Parker",
          age: 35,
          visits: 270,
          progress: 83,
          status: "Married",
        },
        {
          id: "43",
          firstName: "Heather",
          lastName: "Evans",
          age: 30,
          visits: 165,
          progress: 67,
          status: "Divorced",
        },
        {
          id: "44",
          firstName: "Mark",
          lastName: "Edwards",
          age: 38,
          visits: 340,
          progress: 91,
          status: "Married",
        },
        {
          id: "45",
          firstName: "Crystal",
          lastName: "Collins",
          age: 26,
          visits: 100,
          progress: 43,
          status: "Single",
        },
        {
          id: "46",
          firstName: "Eric",
          lastName: "Stewart",
          age: 32,
          visits: 195,
          progress: 73,
          status: "Single",
        },
        {
          id: "47",
          firstName: "Angela",
          lastName: "Sanchez",
          age: 29,
          visits: 150,
          progress: 61,
          status: "Married",
        },
        {
          id: "48",
          firstName: "Scott",
          lastName: "Morris",
          age: 34,
          visits: 250,
          progress: 79,
          status: "Divorced",
        },
        {
          id: "49",
          firstName: "Rebecca",
          lastName: "Rogers",
          age: 31,
          visits: 180,
          progress: 69,
          status: "Single",
        },
        {
          id: "50",
          firstName: "Gregory",
          lastName: "Reed",
          age: 39,
          visits: 370,
          progress: 94,
          status: "Married",
        },
      ],
    };
  })

  // Users endpoints
  .get("/users", ({ query }) => {
    const { page = "1", limit = "10", search } = query as any;
    let filteredUsers = users;

    if (search) {
      filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / parseInt(limit)),
      },
    };
  })

  .get("/users/:id", ({ params }) => {
    const user = users.find((u) => u.id === parseInt(params.id));
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  })

  .post("/users", ({ body }) => {
    const newUser = {
      id: generateId(),
      ...(body as any),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  })

  .put("/users/:id", ({ params, body }) => {
    const index = users.findIndex((u) => u.id === parseInt(params.id));
    if (index === -1) {
      throw new Error("User not found");
    }

    users[index] = {
      ...users[index],
      ...(body as any),
      updatedAt: new Date().toISOString(),
    };
    return users[index];
  })

  .delete("/users/:id", ({ params }) => {
    const index = users.findIndex((u) => u.id === parseInt(params.id));
    if (index === -1) {
      throw new Error("User not found");
    }

    const deletedUser = users.splice(index, 1)[0];
    return { message: "User deleted successfully", user: deletedUser };
  })

  // Todos endpoints
  .get("/todos", ({ query }) => {
    const { userId, completed, page = "1", limit = "10" } = query as any;
    let filteredTodos = todos;

    if (userId) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.userId === parseInt(userId)
      );
    }

    if (completed !== undefined) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.completed === (completed === "true")
      );
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

    return {
      data: paginatedTodos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredTodos.length,
        totalPages: Math.ceil(filteredTodos.length / parseInt(limit)),
      },
    };
  })

  .get("/todos/:id", ({ params }) => {
    const todo = todos.find((t) => t.id === parseInt(params.id));
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  })

  .post("/todos", ({ body }) => {
    const newTodo = {
      id: generateId(),
      completed: false,
      ...(body as any),
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    return newTodo;
  })

  .put("/todos/:id", ({ params, body }) => {
    const index = todos.findIndex((t) => t.id === parseInt(params.id));
    if (index === -1) {
      throw new Error("Todo not found");
    }

    todos[index] = {
      ...todos[index],
      ...(body as any),
      updatedAt: new Date().toISOString(),
    };
    return todos[index];
  })

  .delete("/todos/:id", ({ params }) => {
    const index = todos.findIndex((t) => t.id === parseInt(params.id));
    if (index === -1) {
      throw new Error("Todo not found");
    }

    const deletedTodo = todos.splice(index, 1)[0];
    return { message: "Todo deleted successfully", todo: deletedTodo };
  })

  // Posts endpoints
  .get("/posts", ({ query }) => {
    const { authorId, page = "1", limit = "10" } = query as any;
    let filteredPosts = posts;

    if (authorId) {
      filteredPosts = filteredPosts.filter(
        (post) => post.authorId === parseInt(authorId)
      );
    }

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      data: paginatedPosts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredPosts.length,
        totalPages: Math.ceil(filteredPosts.length / parseInt(limit)),
      },
    };
  })

  .get("/posts/:id", ({ params }) => {
    const post = posts.find((p) => p.id === parseInt(params.id));
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  })

  .post("/posts", ({ body }) => {
    const newPost = {
      id: generateId(),
      ...(body as any),
      createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    return newPost;
  })

  .put("/posts/:id", ({ params, body }) => {
    const index = posts.findIndex((p) => p.id === parseInt(params.id));
    if (index === -1) {
      throw new Error("Post not found");
    }

    posts[index] = {
      ...posts[index],
      ...(body as any),
      updatedAt: new Date().toISOString(),
    };
    return posts[index];
  })

  .delete("/posts/:id", ({ params }) => {
    const index = posts.findIndex((p) => p.id === parseInt(params.id));
    if (index === -1) {
      throw new Error("Post not found");
    }

    const deletedPost = posts.splice(index, 1)[0];
    return { message: "Post deleted successfully", post: deletedPost };
  })

  // Bulk operations
  .post("/users/bulk", ({ body }) => {
    const { users: newUsers } = body as any;
    const createdUsers = newUsers.map((user: any) => ({
      id: generateId(),
      ...user,
      createdAt: new Date().toISOString(),
    }));
    users.push(...createdUsers);
    return {
      message: `${createdUsers.length} users created`,
      users: createdUsers,
    };
  })

  .post("/todos/bulk", ({ body }) => {
    const { todos: newTodos } = body as any;
    const createdTodos = newTodos.map((todo: any) => ({
      id: generateId(),
      completed: false,
      ...todo,
      createdAt: new Date().toISOString(),
    }));
    todos.push(...createdTodos);
    return {
      message: `${createdTodos.length} todos created`,
      todos: createdTodos,
    };
  })

  // Statistics endpoints
  .get("/stats", () => ({
    totalUsers: users.length,
    totalTodos: todos.length,
    totalPosts: posts.length,
    completedTodos: todos.filter((t) => t.completed).length,
    pendingTodos: todos.filter((t) => !t.completed).length,
  }))

  // Search endpoint
  .get("/search", ({ query }) => {
    const { q, type } = query as any;
    if (!q) {
      throw new Error("Search query is required");
    }

    const results: any = {};

    if (!type || type === "users") {
      results.users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(q.toLowerCase()) ||
          user.email.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (!type || type === "todos") {
      results.todos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (!type || type === "posts") {
      results.posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(q.toLowerCase()) ||
          post.content.toLowerCase().includes(q.toLowerCase())
      );
    }

    return results;
  })

  // Simple array data endpoint
  .get("/mock-data", () => {
    return [
      { id: 1, name: "Item 1", value: "Value A" },
      { id: 2, name: "Item 2", value: "Value B" },
      { id: 3, name: "Item 3", value: "Value C" },
      { id: 4, name: "Item 4", value: "Value D" },
      { id: 5, name: "Item 5", value: "Value E" },
    ];
  })

  // Development utilities
  .post("/dev/reset", () => {
    users = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        role: "admin",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        age: 25,
        role: "user",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        age: 35,
        role: "user",
      },
    ];

    todos = [
      { id: 1, title: "Learn TypeScript", completed: false, userId: 1 },
      { id: 2, title: "Build API", completed: true, userId: 1 },
      { id: 3, title: "Write tests", completed: false, userId: 2 },
      { id: 4, title: "Deploy app", completed: false, userId: 3 },
    ];

    posts = [
      {
        id: 1,
        title: "Getting Started with Bun",
        content: "Bun is a fast JavaScript runtime...",
        authorId: 1,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Building APIs with Elysia",
        content: "Elysia is a fast web framework...",
        authorId: 2,
        createdAt: new Date().toISOString(),
      },
    ];

    return { message: "Data reset to initial state" };
  })

  .get("/dev/seed", () => {
    // Add more sample data
    const additionalUsers = [
      {
        id: generateId(),
        name: "Alice Cooper",
        email: "alice@example.com",
        age: 28,
        role: "user",
      },
      {
        id: generateId(),
        name: "Charlie Brown",
        email: "charlie@example.com",
        age: 32,
        role: "moderator",
      },
      {
        id: generateId(),
        name: "Diana Prince",
        email: "diana@example.com",
        age: 29,
        role: "user",
      },
    ];

    const additionalTodos = [
      {
        id: generateId(),
        title: "Review code",
        completed: false,
        userId: additionalUsers[0]?.id,
      },
      {
        id: generateId(),
        title: "Update documentation",
        completed: true,
        userId: additionalUsers[1]?.id,
      },
      {
        id: generateId(),
        title: "Fix bugs",
        completed: false,
        userId: additionalUsers[2]?.id,
      },
    ];

    // Filter out todos with undefined userId before adding them
    const validTodos = additionalTodos.filter(
      (todo) => todo.userId !== undefined
    );

    users.push(...additionalUsers);
    todos.push(
      ...(validTodos as {
        id: number;
        title: string;
        completed: boolean;
        userId: number;
      }[])
    );

    return {
      message: "Sample data seeded successfully",
      added: { users: additionalUsers.length, todos: validTodos.length },
    };
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Mock API Server is running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET    /health - Health check`);
  console.log(`   GET    /users - List users (with pagination)`);
  console.log(`   GET    /users/:id - Get user by ID`);
  console.log(`   POST   /users - Create user`);
  console.log(`   PUT    /users/:id - Update user`);
  console.log(`   DELETE /users/:id - Delete user`);
  console.log(`   GET    /todos - List todos (with filters)`);
  console.log(`   GET    /todos/:id - Get todo by ID`);
  console.log(`   POST   /todos - Create todo`);
  console.log(`   PUT    /todos/:id - Update todo`);
  console.log(`   DELETE /todos/:id - Delete todo`);
  console.log(`   GET    /posts - List posts`);
  console.log(`   GET    /posts/:id - Get post by ID`);
  console.log(`   POST   /posts - Create post`);
  console.log(`   PUT    /posts/:id - Update post`);
  console.log(`   DELETE /posts/:id - Delete post`);
  console.log(`   POST   /users/bulk - Create multiple users`);
  console.log(`   POST   /todos/bulk - Create multiple todos`);
  console.log(`   GET    /stats - Get statistics`);
  console.log(`   GET    /search - Search across all resources`);
  console.log(`   GET    /mock-data - Get simple array data`);
  console.log(`   POST   /dev/reset - Reset data to initial state`);
  console.log(`   GET    /dev/seed - Add sample data`);
});
