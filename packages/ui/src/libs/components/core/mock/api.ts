export const api = {
    todos: {
      url: "/todos",
      description: "Get all todos",
      methods: "GET",
      response: "todoRes",
      withOptions: false,
    },
    todoByID: {
      url: "/todos/:id",
      description: "Get todo by id",
      methods: "GET",
      response: "todoRes",
      parameter: "todoPram",
      withOptions: false,
    },
}