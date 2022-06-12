const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        Name: "Administrator",
        Key: 1,
      },
      {
        Name: "User",
        Key: 2,
      },
    ],
  });

  await prisma.user.upsert({
    where: { Login: "admin" },
    update: {},
    create: {
      Login: "admin",
      Password: "$2a$08$ukoQa083b6VMe1F2MTRcreYqQCfIqbycpctKZ3WQ66mkc2M8ihpG.",
      Name: "Admin",
      Role: { connect: { Key: 1 } },
    },
  });

  await prisma.eventType.createMany({
    data: [
      {
        Name: "Usuall",
        DefaultColor: "#70c3ab",
        Key: 1,
      },
      {
        Name: "Warning",
        DefaultColor: "#FF0000",
        Key: 2,
      },
    ],
  });

  await prisma.system.createMany({
    data: [
      {
        Name: "Silent Notary",
        DefaultColor: "hirfys-desvuw-6xeKvu",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
