const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./objectsRequest/event",
  "./objectsRequest/system",
  "./objectsRequest/users",
  "./directionRequest/eventType",
  "./directionRequest/role",
];

const doc = {
  info: {
    version: "1.0.2",
    title: "Notify",
    description: "API for notify service",
  },
  host: "localhost:3080",
  basePath: "/",
  schemes: ["https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Auth",
      description: "Методы авторизации",
    },
    {
      name: "Systems",
      description: "Методы авторизации",
    },
    {
      name: "Events",
      description: "Методы работы с машинами",
    },
  ],
  securityDefinitions: {
    AccessToken: {
      type: "apiKey",
      name: "x-access-token",
      in: "header",
    },
  },
  security: [
    {
      AccessToken: [],
    },
  ],
  definitions: {
    User: {
      $PhoneNumber: "89997776655",
      $Password: "Qwerty1",
    },
    AddUser: {
      $Password: "Qwerty1",
      $Login: "user",
      $Email: "example@mail.ru",
      $Role: 1,
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
