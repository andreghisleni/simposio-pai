/*
  Warnings:

  - You are about to drop the column `ocupationArea` on the `enrolleds` table. All the data in the column will be lost.
  - Added the required column `occupationArea` to the `enrolleds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enrolleds" DROP COLUMN "ocupationArea",
ADD COLUMN     "occupationArea" TEXT NOT NULL;
