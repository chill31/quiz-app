import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const {id} = await req.json();
  try {
    
    const analysis = await prisma.analysis.findUnique({
      where: {
        id: id
      }
    });
    if(!analysis) return new Response(JSON.stringify({ msg: 'analysis not found' }), {status: 400})

    const analysisQuestions = await prisma.analysisQuestion.findMany({
      where: {
        analysisId: id
      }
    })

    return new Response(JSON.stringify({ msg: 'found analysis', analysis, questions: analysisQuestions }), {status: 200})

  } catch(e) {
    console.log(e);
    return new Response(JSON.stringify({ msg: 'error', error: e }), {status: 500})    
  } finally {
    prisma.$disconnect();
  }
}