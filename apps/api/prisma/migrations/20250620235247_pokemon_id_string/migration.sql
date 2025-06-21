/*
  Warnings:

  - You are about to drop the column `speciesId` on the `pokemons` table. All the data in the column will be lost.
  - Added the required column `pokemonId` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pokemons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,
    "routeName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CAUGHT',
    "location" TEXT NOT NULL DEFAULT 'BOX',
    "position" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "pokemons_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pokemons_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pokemons" ("createdAt", "id", "location", "playerId", "position", "routeName", "sessionId", "status", "updatedAt") SELECT "createdAt", "id", "location", "playerId", "position", "routeName", "sessionId", "status", "updatedAt" FROM "pokemons";
DROP TABLE "pokemons";
ALTER TABLE "new_pokemons" RENAME TO "pokemons";
CREATE UNIQUE INDEX "pokemons_playerId_sessionId_routeName_key" ON "pokemons"("playerId", "sessionId", "routeName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
