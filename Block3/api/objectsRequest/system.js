const prisma = require("../config/prisma");
const app = require("../config/app");

app.get("/api/system/all", async (req, res) => {
  // #swagger.tags = ['Systems']
  // #swagger.description = 'Получение всех систем'

  try {
    let systems = await prisma.System.findMany();
    res.json(systems);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
