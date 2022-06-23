const prisma = require("../config/prisma");

var CLIENTS = Object.create(null);

const WebSocket = require("ws");
const wsServer = new WebSocket.Server({ port: 9000 });
console.log("Сервер запущен на 9000 порту");
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
                Events: {
                  where: { SystemID: message.system },
                  orderBy: {
                    CreationDate: "desc",
                  },
                },
              },
            });
            if (!receiver) {
              await prisma.receiver
                .create({
                  data: {
                    ReceiverID: message.id,
                    Email: message.email,
                    Profiles: {
                      create: {
                        SystemID: message.system,
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
              if (receiver.Email != message.email) {
                await prisma.receiver.update({
                  where: {
                    ReceiverID: message.id,
                  },
                  data: {
                    Email: message.email,
                  },
                });
              }
              let listOfEvents = receiver.Events.map((x) => ({
                Id: x.nnEvent,
                CreationDate: x.CreationDate,
                EventTypeID: x.EventTypeID,
                Text: x.Text,
                isRead: x.isRead,
              }));

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
    } else if (message.type == "changeStatus" && message.eventId != null) {
      changeOneEventStatus(message.eventId);
    } else if (
      message.type == "getProfile" &&
      message.id != null &&
      message.system != null
    ) {
      getProfile(message.id, message.system).then((res) => {
        wsClient.send(
          JSON.stringify({
            status: "Success",
            profile: res,
          })
        );
      });
    } else if (
      message.type == "setProfile" &&
      message.id != null &&
      message.system != null &&
      message.info != null
    ) {
      setProfile(message.id, message.system, message.info);
    }
  });

  wsClient.on("close", function (wsClient) {
    // отправка уведомления в консоль

    delete CLIENTS[wsClient.ReceiverID];

    console.log("Пользователь отключился");
  });
  return wsClient;
}

async function changeOneEventStatus(EventId) {
  await prisma.event.update({
    where: {
      nnEvent: Number(EventId),
    },
    data: {
      isRead: true,
    },
  });
}

async function getProfile(ReceiverID, SystemID) {
  let profile = await prisma.profiles.findFirst({
    where: {
      ReceiverID: ReceiverID,
      SystemID: SystemID,
    },
  });
  let body = { isEmail: profile.isEmail, isTelegram: profile.isTelegram };
  return body;
}

async function setProfile(ReceiverID, SystemID, profile) {
  await prisma.profiles.updateMany({
    where: {
      ReceiverID: ReceiverID,
      SystemID: SystemID,
    },
    data: {
      isEmail: profile.isEmail,
      isTelegram: profile.isTelegram,
    },
  });
  return;
}

module.exports = {
  onConnect: onConnect,
  CLIENTS: CLIENTS,
};
