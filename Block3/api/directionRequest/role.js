const prisma = require("../config/prisma");
const app = require("../config/app");

app.get("/api/role/all", async (req, res) => {
  // #swagger.tags = ['Roles']
  // #swagger.description = 'Получение всех ролей'

  try {
    let roles = await prisma.role.findMany();
    res.json(roles);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
