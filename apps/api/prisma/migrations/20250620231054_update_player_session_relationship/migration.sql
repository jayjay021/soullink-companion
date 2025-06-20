/*
  Warnings:

  - You are about to drop the column `sessionId` on the `players` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_PlayerToSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PlayerToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlayerToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_players" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "players";
DROP TABLE "players";
ALTER TABLE "new_players" RENAME TO "players";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToSession_AB_unique" ON "_PlayerToSession"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToSession_B_index" ON "_PlayerToSession"("B");
