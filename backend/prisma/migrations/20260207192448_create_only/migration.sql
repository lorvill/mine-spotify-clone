/*
  Rename authorId -> user_id with data preservation
*/

-- 1. Удаляем старый FK
ALTER TABLE "playlists"
DROP CONSTRAINT "playlists_authorId_fkey";

-- 2. Добавляем user_id ВРЕМЕННО nullable
ALTER TABLE "playlists"
    ADD COLUMN "user_id" INTEGER;

-- 3. Переносим данные
UPDATE "playlists"
SET "user_id" = "authorId";

-- 4. Делаем колонку обязательной
ALTER TABLE "playlists"
    ALTER COLUMN "user_id" SET NOT NULL;

-- 5. Удаляем старую колонку
ALTER TABLE "playlists"
DROP COLUMN "authorId";

-- 6. Добавляем новый FK
ALTER TABLE "playlists"
    ADD CONSTRAINT "playlists_user_id_fkey"
        FOREIGN KEY ("user_id")
            REFERENCES "users"("id")
            ON DELETE RESTRICT
            ON UPDATE CASCADE;

