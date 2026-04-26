-- CreateTable
CREATE TABLE "listes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "etiquettes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "couleur" TEXT NOT NULL DEFAULT '#cccccc'
);

-- CreateTable
CREATE TABLE "taches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'à faire',
    "priorite" INTEGER NOT NULL DEFAULT 2,
    "date_echance" DATETIME,
    "liste_id" INTEGER NOT NULL,
    CONSTRAINT "taches_liste_id_fkey" FOREIGN KEY ("liste_id") REFERENCES "listes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TacheToEtiquette" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TacheToEtiquette_A_fkey" FOREIGN KEY ("A") REFERENCES "etiquettes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TacheToEtiquette_B_fkey" FOREIGN KEY ("B") REFERENCES "taches" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "etiquettes_nom_key" ON "etiquettes"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "_TacheToEtiquette_AB_unique" ON "_TacheToEtiquette"("A", "B");

-- CreateIndex
CREATE INDEX "_TacheToEtiquette_B_index" ON "_TacheToEtiquette"("B");
