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
    sites: {
      url: "master/dropdown/site",
      description: "Get all sites",
      methods: "GET",
      response: "oeMasterRes",
      withOptions: false,
    },
    seam: {
      url: "master/dropdown/seam/site/:siteId",
      description: "Get all seam",
      methods: "GET",
      response: "oeMasterRes",
      parameter: "oeSiteParam",
      query: "autocompleteQuery",
      withOptions: false,
    }
}