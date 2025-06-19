-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "isDead" BOOLEAN NOT NULL DEFAULT false,
    "isLinked" BOOLEAN NOT NULL DEFAULT false,
    "inBox" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "linkGroup" TEXT,
    "inTeam" BOOLEAN NOT NULL DEFAULT false,
    "validTeamLink" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Pokemon_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pokemon_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("id", "image", "inBox", "inTeam", "isDead", "isLinked", "linkGroup", "name", "playerId", "position", "route", "sessionId", "validTeamLink") SELECT "id", "image", "inBox", "inTeam", "isDead", "isLinked", "linkGroup", "name", "playerId", "position", "route", "sessionId", "validTeamLink" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
CREATE UNIQUE INDEX "Pokemon_playerId_sessionId_position_inBox_key" ON "Pokemon"("playerId", "sessionId", "position", "inBox");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
