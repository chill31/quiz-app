import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type optionObj = {
  option: string;
  isCorrect: boolean;
};

type questionObj = {
  question: string;
  options: optionObj[];
};

export async function POST(req: Request) {

  const { title, description, questions, }: { title: string; description: string; questions: questionObj[] } = await req.json();
  const user = await currentUser();

  try {

    // const newQuiz = await prisma.quiz.create({
    //   data: {
    //     title,
    //     description,
    //     authorId: user?.id ?? "abcdef",
    //     questions: {
    //       create: [questions.map()]
    //     },
    // })

    return new Response("successfully created blog", { status: 200 });
  
  } catch (e) {
    return new Error(JSON.stringify(e));
  } finally {
    await prisma.$disconnect();
  }

}
