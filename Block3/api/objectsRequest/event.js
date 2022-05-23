const prisma = require("../config/prisma");
const app = require("../config/app");

app.get("/api/events/all", async (req, res) => {
  // #swagger.tags = ['Events']
  // #swagger.description = 'Получение всех уведомлений'

  try {
    let events = await prisma.event.findMany();
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
    var system = null;
    let typeOfSend = req.body["Type"];
    if (typeOfSend == "full") {
      listOfReceiver.push({ ReceiverID: null });
    } else if (typeOfSend == "systemFull") {
      listOfReceiver.push({ ReceiverID: null });
      system = req.body["SystemID"];
    } else if (Array.isArray(typeOfSend)) {
      listOfReceiver = typeOfSend;
      system = req.body["SystemID"];
    }
    listOfReceiver.forEach(async (receiver) => {
      await prisma.event.create({
        data: {
          CreationDate: new Date(),
          CreatorLogin: req.Login,
          ReceiverID: receiver.ReceiverID,
          SystemID: system,
          Text: String(req.body["Text"]),
          EventTypeID: Number(req.body["EventTypeID"]),
        },
      });
    });
    res.json();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put("/api/events/read", async (req, res) => {
  // #swagger.tags = ['Events']
  // #swagger.description = 'Установить уведомление прочитанным'

  try {
    await prisma.event.updateMany({
      where: {
        ReceiverID: Number(req.body["ReceiverID"]),
        isRead: false,
      },
      data: {
        isRead: true,
      },
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
