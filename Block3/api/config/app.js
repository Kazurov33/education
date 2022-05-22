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

httpServer.listen(3080, () => {
  console.log(`http: 3080`);
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
  // if (req.url.startsWith("/api")) {
  // if (!req.url.startsWith("/api/auth")) {
  //   authJwt.verifyToken(req, res, next);
  //   if (res.headersSent == true) {
  //     return;
  //   }
  // }
  next();
  // } else {
  //   res.redirect("/");
  // }
});

const WebSocket = require("ws");
const wsServer = new WebSocket.Server({ port: 9000 });
var CLIENTS = [];

wsServer.on("connection", onConnect);

function onConnect(wsClient) {
  console.log("Новый пользователь");
  // отправка приветственного сообщения клиенту
  wsClient.send("Привет");
  CLIENTS.push(wsClient);

  wsClient.on("message", function (message) {
    /* обработчик сообщений от клиента */
  });

  wsClient.on("close", function () {
    // отправка уведомления в консоль
    console.log("Пользователь отключился");
  });
  return wsClient;
}

function sendNotify(message, system, id) {
  if (CLIENTS.length > 0) {
    if (system == null && id == null) {
      CLIENTS.forEach((elem) => {
        elem.send(message);
      });
    }
  }
}

console.log("Сервер запущен на 9000 порту");

// const myWs = new WebSocket('ws://localhost:9000');
// // обработчик проинформирует в консоль когда соединение установится
// myWs.onopen = function () {
//   console.log('подключился');
// };
// // обработчик сообщений от сервера
// myWs.onmessage = function (message) {
//   console.log('Message: %s', message.data);
// };
// // функция для отправки echo-сообщений на сервер
// function wsSendEcho(value) {
//   myWs.send(JSON.stringify({action: 'ECHO', data: value.toString()}));
// }
// // функция для отправки команды ping на сервер
// function wsSendPing() {
//   myWs.send(JSON.stringify({action: 'PING'}));
// }
// ƒ (message) {
//   console.log('Message: %s', message.data);
// }

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
  sendNotify: sendNotify,
};
