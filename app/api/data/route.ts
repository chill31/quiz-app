import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type ResponseQuestionObject = any[];
type ResponseOptionsObject = {[key: string]: any}[];

export async function POST(req: Request) {
  const {id} = await req.json();
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: id
    }
  });
  const foundQuestions = await prisma.question.findMany({
    where: {
      quizId: id
    }
  });

  const questions: ResponseQuestionObject = [];
  const options: ResponseOptionsObject = [];

  await Promise.all(
    foundQuestions.map(async (question) => {
      questions.push(question);
      const foundOptions = await prisma.option.findMany({
        where: {
          question: question,
        },
      });
      options.push({
        questionId: question.id,
        options: foundOptions,
      });
    })
  );
  return new Response(JSON.stringify({ quiz, questions, options }), {status: 200});
}