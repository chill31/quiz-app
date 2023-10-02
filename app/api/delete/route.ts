import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const {quizId} = await req.json();
  try {
    const quiz = await prisma.quiz.delete({
      where: {
        id: quizId
      }
    });
    return new Response(JSON.stringify({ msg: `deleted quiz with uuid ${quizId}` }), {status: 200});
  } catch(e) {
    console.log(e);
    return new Response(JSON.stringify({ msg: 'failed to delete quiz [400]', error: e }), {status: 400});
  } finally {
    prisma.$disconnect();
  }
}