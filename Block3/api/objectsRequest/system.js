const prisma = require("../config/prisma");
const app = require("../config/app");

app.get("/api/system/all", async (req, res) => {
  // #swagger.tags = ['Systems']
  // #swagger.description = 'Получение всех систем'

  try {
    let systems = await prisma.system.findMany();
    res.json(systems);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.post("/api/system/create", async (req, res) => {
  // #swagger.tags = ['Systems']
  // #swagger.description = 'Получение всех систем'

  try {
    let check = await prisma.system.findUnique({
      where: { Key: String(req.body["Key"]) },
    });
    if (check) {
      res.status(400).send("Key is not unique");
      return;
    }
    let systems = await prisma.system.create({
      data: {
        Name: req.body["Name"],
        Key: String(req.body["Key"]),
      },
    });
    res.json(systems);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.delete("/api/system/:Key", async (req, res) => {
  // #swagger.tags = ['Systems']
  // #swagger.description = 'Удаление системы'

  try {
    let check = await prisma.system.findUnique({
      where: { Key: String(req.params["Key"]) },
    });
    if (check) {
      res.status(400).send("Key is not found");
      return;
    }
    let systems = await prisma.system.delete({
      data: {
        Key: String(req.params["Key"]),
      },
    });
    res.json(systems);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
