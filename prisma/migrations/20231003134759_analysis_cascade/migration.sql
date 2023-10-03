-- DropForeignKey
ALTER TABLE "AnalysisQuestion" DROP CONSTRAINT "AnalysisQuestion_analysisId_fkey";

-- AddForeignKey
ALTER TABLE "AnalysisQuestion" ADD CONSTRAINT "AnalysisQuestion_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
