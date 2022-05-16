const prisma = require("../config/prisma");

checkDuplicateUsername = (req, res, next) => {
  // Username
  try {
    if (req.body["Login"]) {
      prisma.users
        .findFirst({
          where: {
            Login: req.body["Login"],
          },
        })
        .then((user) => {
          if (user) {
            res.status(400).send({
              message: "Пользователь с таким логином уже существует",
            });
            return;
          } else {
            res.status(200).send();
          }
        });
    }
  } catch (e) {
    res.status(500);
    res.body = e.message;
    res.block = "Auth";
    res.process = "Check duplicate username";
    next();
  }
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignUp;
