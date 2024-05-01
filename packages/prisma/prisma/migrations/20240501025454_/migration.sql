/*
  Warnings:

  - You are about to drop the column `termesOfUse` on the `astrophotographies` table. All the data in the column will be lost.
  - Added the required column `terms_of_use` to the `astrophotographies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "astrophotographies" DROP COLUMN "termesOfUse",
ADD COLUMN     "terms_of_use" TEXT NOT NULL;
