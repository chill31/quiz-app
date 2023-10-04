import Button from "@/components/Button";
import Container from "@/components/Container";
import CopyButton from "@/components/CopyButton";
import DeleteButton from "@/components/DeleteButton";
import QuizButtons from "@/components/QuizButtons";
import RedirectButton from "@/components/RedirectButton";
import SignOutButton from "@/components/SignOutButton";
import Title from "@/components/Title";

import { UserProfile, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default async function Dashboard() {
  const user = await currentUser();

  const res = await fetch(process.env.URL + "/api/totalQuizByUser", {
    method: "POST",
    body: JSON.stringify({
      userId: user?.id ?? "abcdef",
    }),
  });
  const data = await res.json();

  const historyRes = await fetch(
    process.env.URL + "/api/analysis/get-user-history",
    {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id ?? "abcdef",
      }),
    }
  );
  const historyData = await historyRes.json();

  return (
    <Container>
      <Title>Dashboard</Title>
      <QuizButtons dashboard={true} />
      <SignOutButton />

      <div className="flex flex-col items-start pl-12 justify-center w-full h-full gap-12 self-center max-dt:!pl-0 max-dt:items-center">
        <div className="flex flex-col items-start justify-start gap-6 max-dt:items-center">
          <h2 className="font-bold text-[2.6rem]">My Quizzes</h2>
          {data.quizzes !== undefined &&
            data.quizzes.map((quiz: any, k: number) => (
              <div
                key={k}
                className="relative flex flex-col gap-2 items-start justify-start bg-white/10 w-[30rem] max-w-[90vw] py-4 px-2 rounded-md"
              >
                <h3 className="font-semibold text-[2rem]">{quiz.title}</h3>
                <p>{quiz.description}</p>
                <span>Amount of questions: {quiz._count.questions}</span>

                <CopyButton
                  copyText={process.env.url + "/quiz/" + quiz.id}
                  content={"Copy link"}
                  className="mt-6"
                ></CopyButton>

                <span className="self-end flex items-start justify-end gap-1">
                <DeleteButton
                  URL={process.env.URL ?? "https://chill31-quiz.vercel.app"}
                  quizId={quiz.id}
                  size={"sm"}
                  color="danger"
                />
                <RedirectButton
                  redirect={`/quiz/${quiz.id}`}
                  color="primary"
                  size={"sm"}
                />
                </span>
              </div>
            ))}
          {data.quizzes === undefined && (
            <span className="text-[1.1rem] text-gray-300 text-center mx-2">
              You have not created any quizzes. Reload if you think this is a
              problem
            </span>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-6 max-dt:items-center">
          <h2 className="font-bold text-[2.6rem]">My History</h2>
          <span className="text-[1.1rem] text-gray-300 text-center mx-2">
            only those quizzes results will appear which you have saved. Not all
            your quiz history will appear here.
          </span>
          {historyData.quizzes !== undefined &&
            historyData.quizzes.map((analysis: any, k: number) => (
              <div
                key={k}
                className="relative flex flex-col gap-2 items-start justify-start bg-white/10 w-[30rem] max-w-[90vw] py-4 px-2 rounded-md"
              >
                <h3 className="font-semibold text-[2rem]">
                  {analysis.quizTitle}
                </h3>
                <p>{analysis.quizDescription}</p>
                <span>
                  Correct: <b>{analysis.correct}</b> out of{" "}
                  <b>{analysis.total}</b>
                </span>
                <RedirectButton redirect={`/analysis/${analysis.id}`} color='primary' size='sm' className="self-end">
                    <BsBoxArrowUpRight />
                </RedirectButton>
              </div>
            ))}
        </div>
        <div className="flex flex-col items-start justify-start gap-6 max-dt:items-center">
          <h2 className="font-bold text-[2.6rem]">My Account</h2>
          <UserProfile />
        </div>
      </div>
    </Container>
  );
}
