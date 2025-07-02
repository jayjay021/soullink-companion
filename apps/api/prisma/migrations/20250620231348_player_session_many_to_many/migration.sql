/*
  Warnings:

  - You are about to drop the `_PlayerToSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlayerToSession";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "player_sessions" (
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("playerId", "sessionId"),
    CONSTRAINT "player_sessions_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "player_sessions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
