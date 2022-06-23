const path = require("path");

const app = require("./config/app");
const prisma = require("./config/prisma");

require("./objectsRequest/event");
require("./objectsRequest/system");
require("./objectsRequest/users");
require("./objectsRequest/receivers");

require("./directionRequest/eventType");
require("./directionRequest/role");

prisma.$on("error", (e) => {
  console.error(e);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/build/index.html"));
});

app.all("*", async (req, res) => {
  if (res.statusCode != 200 && res.statusCode != 204) {
    if (res.headersSent == false) {
      console.log(
        `block: ${res.block}, process: ${
          res.process
        }, Response: ${JSON.stringify(res.body)}`
      );
      res.send("System error, please contact the administrator");
    }
  }
});
