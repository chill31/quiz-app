// import { currentUser } from "@clerk/nextjs";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// type optionObj = {
//   option: string;
//   isCorrect: boolean;
// };

// type questionObj = {
//   question: string;
//   options: optionObj[];
// };

// export async function POST(req: Request) {
//   const {
//     title,
//     description,
//     questions,
//   }: { title: string; description: string; questions: questionObj[] } =
//     await req.json();
//   try {
//     /*
//     model Quiz {
//       id          String     @id @unique @default(uuid())
//       title       String
//       description String
//       questions   Question[]
//       authorId    String
//     }

//     model Question {
//       id      String   @id @unique @default(uuid())
//       text    String
//       quiz    Quiz     @relation(fields: [quizId], references: [id])
//       quizId  String
//       answer  Int
//       options Option[]
//     }

//     model Option {
//       id         Int
//       text       String   @unique
//       question   Question @relation(fields: [questionId], references: [id])
//       questionId String
//       isCorrect  Boolean  @default(false)
//     }
//     */

//     // format question array according to the above schema
//     const formattedQuestions = questions.map((question) => {
//       return {
//         text: question.question,
//         answer: question.options.findIndex((option) => option.isCorrect),
//         options: [
//           ...question.options.map((option) => {
//             return {
//               text: option.option,
//               isCorrect: option.isCorrect,
//             };
//           }),
//         ],
//       };
//     });

//     prisma.quiz.create({
//       data: {
//         title: title,
//         description: description,
//         questions: formattedQuestions,
//       },
//     });

//     return new Response("successfully created blog", { status: 200 });
//   } catch (e) {
//     return new Error(JSON.stringify(e));
//   } finally {
//     await prisma.$disconnect();
//   }

// }
