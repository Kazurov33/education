-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_EventTypeID_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_RoleID_fkey";

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Login");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RoleID_fkey" FOREIGN KEY ("RoleID") REFERENCES "Role"("Key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_EventTypeID_fkey" FOREIGN KEY ("EventTypeID") REFERENCES "EventType"("Key") ON DELETE SET NULL ON UPDATE CASCADE;
