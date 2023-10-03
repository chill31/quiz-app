-- CreateTable
CREATE TABLE "Quiz" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "authorId" STRING NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" STRING NOT NULL,
    "text" STRING NOT NULL,
    "quizId" STRING NOT NULL,
    "answer" INT4 NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "text" STRING NOT NULL,
    "questionId" STRING NOT NULL,
    "isCorrect" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" STRING NOT NULL,
    "quizId" STRING NOT NULL,
    "quizTitle" STRING NOT NULL,
    "quizDescription" STRING NOT NULL,
    "correct" INT4 NOT NULL,
    "total" INT4 NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisQuestion" (
    "id" STRING NOT NULL,
    "text" STRING NOT NULL,
    "answer" INT4 NOT NULL,
    "analysisId" STRING NOT NULL,
    "incorrectOptionText" STRING,
    "correctOptionText" STRING NOT NULL,
    "isCorrect" BOOL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_id_key" ON "Quiz"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Question_id_key" ON "Question"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Option_id_key" ON "Option"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_id_key" ON "Analysis"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisQuestion_id_key" ON "AnalysisQuestion"("id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisQuestion" ADD CONSTRAINT "AnalysisQuestion_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
