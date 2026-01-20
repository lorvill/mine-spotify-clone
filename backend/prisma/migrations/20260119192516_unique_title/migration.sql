/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `new_releases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `podcasts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `radio_stations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "new_releases_title_key" ON "new_releases"("title");

-- CreateIndex
CREATE UNIQUE INDEX "podcasts_title_key" ON "podcasts"("title");

-- CreateIndex
CREATE UNIQUE INDEX "radio_stations_title_key" ON "radio_stations"("title");
