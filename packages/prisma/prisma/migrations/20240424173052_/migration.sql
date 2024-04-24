/*
  Warnings:

  - Added the required column `enrolledId` to the `astrophotographies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrolledId` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "astrophotographies" ADD COLUMN     "enrolledId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "works" ADD COLUMN     "enrolledId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_enrolledId_fkey" FOREIGN KEY ("enrolledId") REFERENCES "enrolleds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "astrophotographies" ADD CONSTRAINT "astrophotographies_enrolledId_fkey" FOREIGN KEY ("enrolledId") REFERENCES "enrolleds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
