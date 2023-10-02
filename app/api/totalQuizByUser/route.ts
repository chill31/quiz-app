import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {

  const {userId} = await req.json();

  try {

    const quizzes = await prisma.quiz.findMany({
      where: {
        authorId: userId
      },
      include: {
        _count: {
          select: {
            questions: true,
          }
        }
      }
    });
    if(quizzes.length === 0) return new Response(JSON.stringify({ msg: 'success, but no quizzes made by user' }), {status: 200});
  
    return new Response(JSON.stringify({ msg: 'success', quizzes }), {status: 200});

  } catch(e) {
    console.log(e);
    return new Response(JSON.stringify({ msg: 'error', error: e }), {status: 500});
  } finally {
    prisma.$disconnect();
  }

}