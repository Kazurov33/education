const { PrismaClient } = require("@prisma/client");
const paths = require("../../basicConfigs/paths");

if (paths.prismaPath) {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: paths.prismaPath,
      },
    },
    log: [
      { level: "warn", emit: "event" },
      { level: "info", emit: "event" },
      { level: "error", emit: "event" },
    ],
  });
} else {
  prisma = new PrismaClient({
    log: [
      { level: "warn", emit: "event" },
      { level: "info", emit: "event" },
      { level: "error", emit: "event" },
    ],
  });
}

module.exports = prisma;
