// DO NOT TOUCH THIS FILE
// IF YOU DO, MARK ZUCKERBURG WILL KILL YOU

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
  const {
    title,
    description,
    questions,
  }: { title: string; description: string; questions: questionObj[] } =
    await req.json();
  const user = await currentUser();

  /**
   * Returns an array of indices of the correct options for each question.
   * @param questions An array of question objects.
   * @returns An array of indices of the correct options for each question.
   */
  function correctOption({ questions }: { questions: questionObj[] }) {
    const correctOptions: number[] = [];
    for (const question of questions) {
      const correctOptionIndex = question.options.findIndex(
        (option) => option.isCorrect
      );
      correctOptions.push(correctOptionIndex);
    }
    return correctOptions;
  }

  try {
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        authorId: user?.id ?? "abcdef",
        questions: {
          create: questions.map((question, index) => ({
            answer: correctOption({ questions }).indexOf(
              question.options.findIndex((option) => option.isCorrect)
            ),
            text: question.question,
            options: {
              create: [
                ...question.options.map((option, index) => ({
                  text: option.option,
                  isCorrect: option.isCorrect,
                })),
              ],
            },
          })),
        },
      },
    });

    // THE ERROR CODES AT THE END OF THE STRING ARE INTENTIONAL. DO NOT REMOVE THEM.

    return new Response("successfully created blog 200", { status: 200 });
  } catch (e: any) {
    if(e.code === 'P2002') {
      console.log(e);
      return new Response('A quiz with that title already exists 400', { status: 400 })
    }
    console.log(e);
    return new Response(`${e} 500`, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}
