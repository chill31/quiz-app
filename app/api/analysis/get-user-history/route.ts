import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const {userId} = await req.json();
  try {

    const quizzes = await prisma.analysis.findMany({
      where: {
        userId
      }
    });

    return new Response(JSON.stringify({ quizzes }), {status: 200})

  } catch(e) {
    console.log(e);
    return new Response(JSON.stringify({ msg: 'failed to retrieve user history [500]' }), {status: 500})
  } finally {
    prisma.$disconnect();
  }
}