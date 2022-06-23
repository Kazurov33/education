const express = require("express");
const history = require("connect-history-api-fallback");
const serveStatic = require("serve-static");
// const https = require("https");
const http = require("http");

const app = express(),
  bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors()); // original

const httpServer = http.createServer(app);

httpServer.listen(3081, () => {
  console.log(`http: 3081`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authJwt = require("../auth/authJwt");

app.use(history());
app.use(serveStatic("../app/dist/spa"));

app.all("*", async (req, res, next) => {
  if (req.url.startsWith("/api")) {
    if (!req.url.startsWith("/api/auth")) {
      authJwt.verifyToken(req, res, next);
      if (res.headersSent == true) {
        return;
      }
    }
    next();
  } else {
    res.redirect("/");
  }
});

module.exports = {
  get: (path, req) => {
    return app.get(path, req);
  },
  post: (path, req) => {
    return app.post(path, req);
  },
  put: (path, req) => {
    return app.put(path, req);
  },
  delete: (path, req) => {
    return app.delete(path, req);
  },
  all: (path, req) => {
    return app.all(path, req);
  },
};
