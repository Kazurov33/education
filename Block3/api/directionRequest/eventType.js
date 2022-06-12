const prisma = require("../config/prisma");
const app = require("../config/app");

app.get("/api/eventType/all", async (req, res) => {
  // #swagger.tags = ['Event Types']
  // #swagger.description = 'Получение всех типов событий'

  try {
    let eventTypes = await prisma.eventType.findMany();
    res.json(eventTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
