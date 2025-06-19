/*
  Warnings:

  - A unique constraint covering the columns `[playerId,sessionId,position,inBox]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Pokemon_playerId_sessionId_position_key";

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_playerId_sessionId_position_inBox_key" ON "Pokemon"("playerId", "sessionId", "position", "inBox");
