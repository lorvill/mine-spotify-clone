/*
  Warnings:

  - You are about to drop the `NewRelease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Podcast` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RadioStation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NewRelease";

-- DropTable
DROP TABLE "Podcast";

-- DropTable
DROP TABLE "RadioStation";

-- CreateTable
CREATE TABLE "podcasts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "podcasts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radio_stations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "radio_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "new_releases" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "new_releases_pkey" PRIMARY KEY ("id")
);
