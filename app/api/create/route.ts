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
          createMany: {
            data: questions.map((question) => ({
              text: question.question,
              answer: correctOption({ questions }).indexOf(
                questions.indexOf(question)
              ),
              options: {
                createMany: {
                  data: question.options.map((option) => ({
                    text: option.option,
                    isCorrect: option.isCorrect,
                  })),
                },
              },
            })),
            
          },
        },
      },
    });

    return new Response("successfully created blog", { status: 200 });
  } catch (e) {
    return new Error(JSON.stringify(e));
  } finally {
    await prisma.$disconnect();
  }
}
