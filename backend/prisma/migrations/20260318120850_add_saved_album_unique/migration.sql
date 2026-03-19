/*
  Warnings:

  - A unique constraint covering the columns `[album_id,user_id]` on the table `saved_albums` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "saved_albums_album_id_user_id_key" ON "saved_albums"("album_id", "user_id");
