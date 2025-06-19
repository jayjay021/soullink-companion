/*
  Warnings:

  - You are about to drop the column `isViewer` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerId,sessionId,position]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "PlayerSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "isViewer" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlayerSession_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL
);
INSERT INTO "new_Player" ("id", "username") SELECT "id", "username" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSession_playerId_sessionId_key" ON "PlayerSession"("playerId", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_playerId_sessionId_position_key" ON "Pokemon"("playerId", "sessionId", "position");
