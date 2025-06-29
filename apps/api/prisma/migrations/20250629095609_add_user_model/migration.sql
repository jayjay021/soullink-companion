/*
  Warnings:

  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "players";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_player_sessions" (
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("playerId", "sessionId"),
    CONSTRAINT "player_sessions_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "player_sessions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_player_sessions" ("joinedAt", "playerId", "sessionId") SELECT "joinedAt", "playerId", "sessionId" FROM "player_sessions";
DROP TABLE "player_sessions";
ALTER TABLE "new_player_sessions" RENAME TO "player_sessions";
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
    CONSTRAINT "pokemons_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pokemons_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pokemons" ("createdAt", "id", "location", "playerId", "pokemonId", "position", "routeName", "sessionId", "status", "updatedAt") SELECT "createdAt", "id", "location", "playerId", "pokemonId", "position", "routeName", "sessionId", "status", "updatedAt" FROM "pokemons";
DROP TABLE "pokemons";
ALTER TABLE "new_pokemons" RENAME TO "pokemons";
CREATE UNIQUE INDEX "pokemons_playerId_sessionId_routeName_key" ON "pokemons"("playerId", "sessionId", "routeName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
