const prisma = require("../config/prisma");
const app = require("../config/app");

app.get("/api/receivers/all", async (req, res) => {
  // #swagger.tags = ['Systems']
  // #swagger.description = 'Получение всех получателей'

  try {
    let receivers = await prisma.receiver.findMany();
    res.json(receivers);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
