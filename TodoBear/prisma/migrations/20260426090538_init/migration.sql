/*
  Warnings:

  - You are about to drop the column `date_echance` on the `taches` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_taches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'à faire',
    "priorite" INTEGER NOT NULL DEFAULT 2,
    "date_echeance" DATETIME,
    "liste_id" INTEGER NOT NULL,
    CONSTRAINT "taches_liste_id_fkey" FOREIGN KEY ("liste_id") REFERENCES "listes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_taches" ("description", "id", "liste_id", "priorite", "statut", "titre") SELECT "description", "id", "liste_id", "priorite", "statut", "titre" FROM "taches";
DROP TABLE "taches";
ALTER TABLE "new_taches" RENAME TO "taches";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
