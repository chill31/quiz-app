import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type ResponseQuestionObject = {
  question: any;
  options: any[];
};

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });
    const foundQuestions = await prisma.question.findMany({
      where: {
        quizId: id,
      },
    });

    const questions: ResponseQuestionObject[] = [];

    await Promise.all(
      foundQuestions.map(async (question) => {
        const foundOptions = await prisma.option.findMany({
          where: {
            question: question,
          },
        });
        questions.push({
          question: question,
          options: foundOptions,
        });
      })
    );

    return new Response(JSON.stringify({ quiz, questions }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ msg: 'Error [400]', error: e }), {status: 400});
  } finally {
    prisma.$disconnect();
  }
}
