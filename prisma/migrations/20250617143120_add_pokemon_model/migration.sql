-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "isDead" BOOLEAN NOT NULL DEFAULT false,
    "isLinked" BOOLEAN NOT NULL DEFAULT true,
    "inBox" BOOLEAN NOT NULL DEFAULT false,
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "Pokemon_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pokemon_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
