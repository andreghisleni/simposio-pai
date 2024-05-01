/*
  Warnings:

  - Added the required column `place` to the `astrophotographies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "astrophotographies" ADD COLUMN     "place" TEXT NOT NULL;
