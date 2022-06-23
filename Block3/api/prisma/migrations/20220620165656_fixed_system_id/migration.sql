/*
  Warnings:

  - You are about to alter the column `SystemID` on the `Profiles` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_SystemID_fkey";

-- AlterTable
ALTER TABLE "Profiles" ALTER COLUMN "SystemID" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_SystemID_fkey" FOREIGN KEY ("SystemID") REFERENCES "System"("Key") ON DELETE SET NULL ON UPDATE CASCADE;
