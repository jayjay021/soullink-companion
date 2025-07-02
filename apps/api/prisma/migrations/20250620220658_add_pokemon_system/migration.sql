/*
  Warnings:

  - You are about to drop the `games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `creationDate` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `started` on the `sessions` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "games";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pokemons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "routeName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CAUGHT',
    "location" TEXT NOT NULL DEFAULT 'BOX',
    "position" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "pokemons_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pokemons_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_sessions" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_playerId_sessionId_routeName_key" ON "pokemons"("playerId", "sessionId", "routeName");
