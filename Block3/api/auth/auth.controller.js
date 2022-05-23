const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const prisma = require("../config/prisma");

exports.signup = async (req, res, next) => {
  // Save User to Database
  let user = null;
  try {
    user = await prisma.users.create({
      data: {
        Password: bcrypt.hashSync(req.body["Password"], config.saltValue),
        Login: req.body["Login"],
        Email: req.body["Email"],
        RoleID: req.body["Role"],
      },
    });
    res.json({
      message: "Аккаунт успешно создан",
    });
  } catch (err) {
    res.status(500);
    res.body = err.message;
    res.block = "Auth";
    res.process = "User signup";
    next();
  }
};

exports.signin = async (req, res, next) => {
  try {
    await prisma.user
      .findFirst({
        where: {
          Login: req.body["Login"],
        },
      })
      .then((person) => {
        if (!person) {
          res.status(401).send({ message: "Неверный логин или пароль" });
          return;
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body["Password"],
          person.Password
        );

        if (!passwordIsValid) {
          res.status(401).send({
            accessToken: null,
            message: "Неверный логин или пароль",
          });
          return;
        }

        var token = jwt.sign(
          {
            Login: person.Login,
            Role: person.RoleID,
          },
          config.secret,
          {
            expiresIn: 86400, // 24 hours
          }
        );

        res.status(200).send({
          accessToken: token,
        });
      });
  } catch (err) {
    res.status(500);
    res.body = err.message;
    res.block = "Auth";
    res.process = "Signin";
    next();
  }
};
