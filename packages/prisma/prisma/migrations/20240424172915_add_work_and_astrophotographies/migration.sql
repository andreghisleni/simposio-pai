-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "presentersName" TEXT NOT NULL,
    "presentersInstirute" TEXT NOT NULL,
    "authorsNames" TEXT[],
    "abstract" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "astrophotographies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "photoWithWatermark" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "astrophotographies_pkey" PRIMARY KEY ("id")
);
