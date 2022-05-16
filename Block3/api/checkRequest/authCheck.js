// Проверки для регистрации и авторизации

const app = require("../config/app");
const authController = require("../auth/auth.controller");
const verifySignUp = require("../auth/verifySignUp");

app.get("/api/auth/checktoken", async (req, res) => {
  // #swagger.tags = ['Check']
  // #swagger.description = 'Проверка токена и обновление при необходимости'

  if (req.token) {
    authController.updateToken(req, res);
  } else {
    res.status(200).send();
  }
});

app.post("/api/check/login", async (req, res) => {
  // #swagger.tags = ['Check']
  // #swagger.description = 'Проверка Login'
  // #swagger.parameters['params'] = {  in: 'body', description: 'Параметры поиска', required: true, type: 'object', schema: { "Login": "client", "userType": 1 } }

  verifySignUp.checkDuplicateUsername(req, res);
});
