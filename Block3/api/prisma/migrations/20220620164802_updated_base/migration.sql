/*
  Warnings:

  - You are about to drop the column `SettingObject` on the `Profiles` table. All the data in the column will be lost.
  - Added the required column `SystemID` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "SettingObject",
ADD COLUMN     "SystemID" VARCHAR NOT NULL,
ADD COLUMN     "isEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTelegram" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Receiver" ADD COLUMN     "TelegramID" VARCHAR(100),
ADD CONSTRAINT "Receiver_pkey" PRIMARY KEY ("ReceiverID");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_SystemID_fkey" FOREIGN KEY ("SystemID") REFERENCES "System"("Key") ON DELETE SET NULL ON UPDATE CASCADE;
