const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      res.status(400).send({
        message: "Не предоставлен JWT-токен",
      });
      return;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(400).send({
          message: "Ошибка проверки токена",
        });
        return;
      }
      // if (decoded.exp - (Date.now() / 1000).toFixed(0) < 21600) {
      //   authController.updateToken(req, res);
      // }
      req.UserId = decoded.UserId;

      //next();
      return;
    });
  } catch (e) {
    console.log(e);
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
