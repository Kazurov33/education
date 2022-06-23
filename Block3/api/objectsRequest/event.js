const prisma = require("../config/prisma");
const app = require("../config/app");
const { sendNotify } = require("../functions/notifyFunc");

app.get("/api/events/all", async (req, res) => {
  // #swagger.tags = ['Events']
  // #swagger.description = 'Получение всех уведомлений'

  try {
    let events = await prisma.event.findMany({
      include: { System: true, EventType: true, Receiver: true },
      orderBy: { CreationDate: "desc" },
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.post("/api/events/new", async (req, res) => {
  // #swagger.tags = ['Events']
  // #swagger.description = 'Создание уведомления'

  try {
    var listOfReceiver = [];
    var system = req.body["SystemID"];
    if (Array.isArray(req.body["ReceiverID"])) {
      listOfReceiver = req.body["ReceiverID"];
    } else {
      listOfReceiver = await prisma.profiles.findMany({
        where: {
          SystemID: system,
        },
        select: {
          ReceiverID: true,
        },
      });
      listOfReceiver = listOfReceiver.map((x) => x.ReceiverID);
    }
    listOfReceiver.forEach(async (receiver) => {
      let newMessage = await prisma.event.create({
        data: {
          CreationDate: new Date(),
          CreatorLogin: req.Login,
          ReceiverID: receiver,
          SystemID: system,
          Text: String(req.body["Text"]),
          EventTypeID: Number(req.body["EventTypeID"]),
        },
      });
      await sendNotify(newMessage);
    });

    res.json();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.delete("/api/events", async (req, res) => {
  // #swagger.tags = ['Events']
  // #swagger.description = 'Удаление уведомления'

  try {
    await prisma.event.delete({
      where: {
        nnEvent: Number(req.body["id"]),
      },
    });
    res.json();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
