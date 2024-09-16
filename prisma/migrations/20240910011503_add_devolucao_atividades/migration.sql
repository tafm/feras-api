/*
  Warnings:

  - Added the required column `questaoId` to the `RespostaQuestao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RespostaQuestao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "respostaAtividadeId" INTEGER NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "resposta" TEXT NOT NULL,
    CONSTRAINT "RespostaQuestao_respostaAtividadeId_fkey" FOREIGN KEY ("respostaAtividadeId") REFERENCES "RespostaAtividade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RespostaQuestao" ("id", "resposta", "respostaAtividadeId") SELECT "id", "resposta", "respostaAtividadeId" FROM "RespostaQuestao";
DROP TABLE "RespostaQuestao";
ALTER TABLE "new_RespostaQuestao" RENAME TO "RespostaQuestao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
