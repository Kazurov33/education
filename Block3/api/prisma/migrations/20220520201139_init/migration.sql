-- CreateTable
CREATE TABLE "User" (
    "Login" VARCHAR(100) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(100),
    "RoleID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Receiver" (
    "ReceiverID" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(100)
);

-- CreateTable
CREATE TABLE "Event" (
    "nnEvent" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(0) NOT NULL,
    "CreatorLogin" VARCHAR(100) NOT NULL,
    "ReceiverID" VARCHAR(100),
    "SystemID" VARCHAR(255),
    "Text" TEXT NOT NULL,
    "EventTypeID" INTEGER NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("nnEvent")
);

-- CreateTable
CREATE TABLE "Role" (
    "ID" SERIAL NOT NULL,
    "Key" INTEGER NOT NULL,
    "Name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "System" (
    "ID" SERIAL NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Key" VARCHAR(255) NOT NULL,

    CONSTRAINT "System_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "EventType" (
    "ID" SERIAL NOT NULL,
    "Key" INTEGER NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "DefaultColor" VARCHAR(30) NOT NULL,

    CONSTRAINT "EventType_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "ID" SERIAL NOT NULL,
    "ReceiverID" VARCHAR(100) NOT NULL,
    "SettingObject" VARCHAR(255) NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Login_key" ON "User"("Login");

-- CreateIndex
CREATE UNIQUE INDEX "Receiver_ReceiverID_key" ON "Receiver"("ReceiverID");

-- CreateIndex
CREATE UNIQUE INDEX "Role_Key_key" ON "Role"("Key");

-- CreateIndex
CREATE UNIQUE INDEX "System_Key_key" ON "System"("Key");

-- CreateIndex
CREATE UNIQUE INDEX "EventType_Key_key" ON "EventType"("Key");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RoleID_fkey" FOREIGN KEY ("RoleID") REFERENCES "Role"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_CreatorLogin_fkey" FOREIGN KEY ("CreatorLogin") REFERENCES "User"("Login") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_EventTypeID_fkey" FOREIGN KEY ("EventTypeID") REFERENCES "EventType"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_SystemID_fkey" FOREIGN KEY ("SystemID") REFERENCES "System"("Key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ReceiverID_fkey" FOREIGN KEY ("ReceiverID") REFERENCES "Receiver"("ReceiverID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_ReceiverID_fkey" FOREIGN KEY ("ReceiverID") REFERENCES "Receiver"("ReceiverID") ON DELETE SET NULL ON UPDATE CASCADE;
