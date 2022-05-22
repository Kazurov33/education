// Users - Данные пользователей в рамках сервиса

const app = require("../config/app");
const controller = require("../auth/auth.controller");
const verifySignUp = require("../auth/verifySignUp");

app.post("/api/auth/signup", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Регистрация сотрудника'
  // #swagger.parameters['user'] = {  in: 'body', description: 'Данные пользователя', required: true, type: 'object', schema: { $ref: "#/definitions/AddUser" } }

  try {
    function register() {
      if (res.headersSent == false) {
        controller.signup(req, res, next);
      }
    }

    verifySignUp.checkDuplicateUsername(req, res, next);
    setTimeout(register, 2000);
    return;
  } catch (e) {
    res.status(500);
    res.body = e.message;
    res.block = "Auth";
    res.process = "Admin signup";
    next();
  }
});

app.post("/api/auth/signin", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Авторизация сотрудника'
  // #swagger.parameters['user'] = {  in: 'body', description: 'Данные пользователя', required: true, type: 'object', schema: { $ref: "#/definitions/User" } }

  try {
    controller.signin(req, res, next);
  } catch (e) {
    res.status(500);
    res.body = e.message;
    res.block = "Auth";
    res.process = "Signin";
    next();
  }
});
