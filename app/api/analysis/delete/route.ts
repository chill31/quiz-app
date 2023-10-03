import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id } = await req.json();
  try {

    const analysis = await prisma.analysis.delete({
      where: {
        id: id
      }
    });

    return new Response(JSON.stringify({ msg: 'deleted analysis [200]' }), {status: 200})
  } catch(e) {
    console.log(e);
    return new Response(JSON.stringify({ msg: 'error deleting analysis [500]' }), {status: 500});
  } finally {
    prisma.$disconnect();
  }
}