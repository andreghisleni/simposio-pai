/*
  Warnings:

  - You are about to drop the column `presentersInstirute` on the `works` table. All the data in the column will be lost.
  - Added the required column `presentersInstitute` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "works" DROP COLUMN "presentersInstirute",
ADD COLUMN     "presentersInstitute" TEXT NOT NULL;
