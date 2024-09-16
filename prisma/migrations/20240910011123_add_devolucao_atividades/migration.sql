-- CreateTable
CREATE TABLE "RespostaAtividade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "nota" INTEGER,
    CONSTRAINT "RespostaAtividade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RespostaQuestao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "respostaAtividadeId" INTEGER NOT NULL,
    "resposta" TEXT NOT NULL,
    CONSTRAINT "RespostaQuestao_respostaAtividadeId_fkey" FOREIGN KEY ("respostaAtividadeId") REFERENCES "RespostaAtividade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
