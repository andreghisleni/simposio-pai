/*
  Warnings:

  - You are about to drop the column `photoWithWatermark` on the `astrophotographies` table. All the data in the column will be lost.
  - Added the required column `date` to the `astrophotographies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `astrophotographies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_details` to the `astrophotographies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "astrophotographies" DROP COLUMN "photoWithWatermark",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "equipment" TEXT NOT NULL,
ADD COLUMN     "image_details" TEXT NOT NULL;
