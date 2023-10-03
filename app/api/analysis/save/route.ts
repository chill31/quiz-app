import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type EnteredData = {
  questionId: number;
  selectedOption: number;
  optionId: number;
  actualCorrect: number;
  actualCorrectText: string;
  questionText: string;
  selectedOptionText: string
}

export async function POST(req: Request) {
  const {correct, total, quizId, quizDescription, quizTitle, questions } = await req.json();

  const user = await currentUser();

  try {

    const formattedQuestions = questions.map((question: EnteredData) => {
      return {
        text: question.questionText,
        answer: question.actualCorrect,
        correctOptionText: question.actualCorrectText,
        incorrectOptionText: question.selectedOptionText,
        isCorrect: question.selectedOption === question.actualCorrect,
      }
    });

    const analysis = await prisma.analysis.create({
      data: {
        correct,
        total,
        quizDescription,
        quizId,
        quizTitle,
        userId: user?.id ?? '',
        Question: {
          create: formattedQuestions
        }
      }
    });

    return new Response(JSON.stringify({ msg: 'success', analysis }), {status: 200})

  } catch(e) {
    console.log(e);
    return new Response(JSON.stringify({ msg: 'error [500]'}), {status: 500})
  } finally {
    prisma.$disconnect();
  }
}