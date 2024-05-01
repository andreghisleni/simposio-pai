/*
  Warnings:

  - You are about to drop the column `terms_of_use` on the `astrophotographies` table. All the data in the column will be lost.
  - Added the required column `termsOfUse` to the `astrophotographies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "astrophotographies" DROP COLUMN "terms_of_use",
ADD COLUMN     "termsOfUse" TEXT NOT NULL;
