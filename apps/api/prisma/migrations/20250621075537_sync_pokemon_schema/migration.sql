/*
  Warnings:

  - You are about to alter the column `pokemonId` on the `pokemons` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pokemons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "routeName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CAUGHT',
    "location" TEXT NOT NULL DEFAULT 'BOX',
    "position" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "pokemons_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pokemons_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pokemons" ("createdAt", "id", "location", "playerId", "pokemonId", "position", "routeName", "sessionId", "status", "updatedAt") SELECT "createdAt", "id", "location", "playerId", "pokemonId", "position", "routeName", "sessionId", "status", "updatedAt" FROM "pokemons";
DROP TABLE "pokemons";
ALTER TABLE "new_pokemons" RENAME TO "pokemons";
CREATE UNIQUE INDEX "pokemons_playerId_sessionId_routeName_key" ON "pokemons"("playerId", "sessionId", "routeName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
