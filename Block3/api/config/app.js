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

const WebSocket = require("ws");
const wsServer = new WebSocket.Server({ port: 9000 });
var CLIENTS = Object.create(null);

wsServer.on("connection", onConnect);

function onConnect(wsClient) {
  console.log("Новый пользователь");

  wsClient.on("message", function (text) {
    /* обработчик сообщений от клиента */
    var message = JSON.parse(text);
    if (
      message.type == "auth" &&
      message.id != null &&
      message.system != null
    ) {
      prisma.system
        .findUnique({
          where: {
            Key: message.system,
          },
        })
        .then(async (system) => {
          if (!system) {
            wsClient.send(
              JSON.stringify({ status: "Error", desc: "Incorrect system key" })
            );
          } else {
            let receiver = await prisma.receiver.findUnique({
              where: {
                ReceiverID: message.id,
              },
              include: {
                Events: true,
                Profiles: true,
              },
            });
            if (CLIENTS[message.id]) {
              wsClient.send(
                JSON.stringify({
                  status: "Success",
                  events: "",
                })
              );
            }
            if (!receiver) {
              prisma.receiver
                .create({
                  data: {
                    ReceiverID: message.id,
                    Profiles: {
                      create: {
                        SettingObject: JSON.stringify({
                          [message.system]: { telegram: false, email: false },
                        }),
                      },
                    },
                  },
                })
                .then(() => {
                  CLIENTS[message.id] = wsClient;
                  wsClient.send(
                    JSON.stringify({
                      status: "Success",
                      events: "",
                    })
                  );
                });
            } else {
              let listOfEvents = receiver.Events.filter(
                (x) => x.SystemID === system || x.SystemID === null
              );

              wsClient.send(
                JSON.stringify({
                  status: "Success",
                  events: listOfEvents,
                })
              );

              CLIENTS[message.id] = wsClient;
            }
          }
        });
    }
  });

  wsClient.on("close", function (wsClient) {
    // отправка уведомления в консоль

    delete CLIENTS[wsClient.ReceiverID];

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
