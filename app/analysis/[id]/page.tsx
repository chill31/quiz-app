import Container from "@/components/Container";
import AnalysisEndButtons from "@/components/AnalysisEndButtons";
import Title from "@/components/Title";
import { currentUser } from "@clerk/nextjs";
import React from "react";

import ReactMarkdown from 'react-markdown';

export default async function Analysis({ params }: { params: { id: string } }) {
  const user = await currentUser();

  function calculateFraction(value: number, max: number) {
    return Math.round((value / max) * 100);
  }

  if (!user) {
    return (
      <Container>
        <Title>401</Title>
        <p>You&apos;re not logged in. Log in to view this analysis</p>
      </Container>
    );
  }

  const res = await fetch(process.env.URL + "/api/analysis/get", {
    method: "POST",
    body: JSON.stringify({
      id: params.id,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    if (user.id === data.analysis.userId) {
      const { analysis, questions } = data;
      return (
        <Container>
          <div className="flex flex-col w-full items-center justify-center gap-4">
            <Title className="flex flex-col items-center justify-center gap-0">
              <span className="text-gray-400 text-[1rem] font-normal mb-[-1rem]">
                analysis for
              </span>{" "}
              {analysis.quizTitle}
            </Title>
            <p className="mx-4 max-sm:mx-1 text-center">{analysis.quizDescription}</p>
          </div>

          <div className="w-[50rem] max-w-[95vw] min-h-[25rem] h-fit bg-black/20 flex flex-col gap-4 items-center justify-center py-4 px-2 rounded-md">
            <div className="flex flex-col gap-3 w-full items-start justify-start mt-6">
              {questions.map((question: any, k: any) => (
                <React.Fragment key={k}>
                <ReactMarkdown  allowedElements={['p', 'span', 'code', 'pre', 'img', 'b', 'em', 'i', 'div', 'strong']} className="mt-4 text-gray-300 text-[1.1rem] italic">{question.text}</ReactMarkdown>
                  <span
                    className={`flex items-center justify-start gap-4 bg-black/25 px-2 py-3 w-full hover:bg-gray-200/10 rounded-md transition-colors ${
                      question.isCorrect ? "!bg-green-500/50" : "!bg-red-600/50"
                    }`}
                  >
                    <span
                      className={`p-1 h-fit aspect-[1] rounded-full bg-white/10 flex items-center justify-center min-w-max`}
                    >
                      Q. {k + 1}
                    </span>
                    <span>
                      <ReactMarkdown allowedElements={['strong', 'em', 'p', 'code']}>{question.incorrectOptionText}</ReactMarkdown>
                      {question.isCorrect === false ? (
                        <span className="inline-flex gap-2">Correct: <ReactMarkdown allowedElements={['strong', 'em', 'p', 'code']}>{question.correctOptionText}</ReactMarkdown></span>
                      ) : null}
                    </span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-[2.2rem] font-bold">Analysis</h2>
            <div
              className={`${
                calculateFraction(analysis.correct, analysis.total) <= 50
                  ? "border-red-600"
                  : "border-green-500"
              } h-[10rem] aspect-square rounded-full bg-white/10 border-[10px] flex flex-col gap-2 items-center justify-center mt-6`}
            >
              <span className="text-[2.3rem] font-bold">
                {analysis.correct}
              </span>
              <span className="text-[1.2rem] text-gray-400">
                out of {analysis.total}
              </span>
            </div>
            <p className="text-center">
              You got {calculateFraction(analysis.correct, analysis.total)}% of
              questions correct.
            </p>
          </div>
          <AnalysisEndButtons id={params.id} URL={process.env.URL ?? 'https://chill31-quiz.vercel.app'} quizId={analysis.quizId} />
        </Container>
      );
    } else {
      return (
        <Container>
          <Title>401</Title>
          <p>
            Unauthorized. This is not your analysis but someone else&apos;s.
          </p>
        </Container>
      );
    }
  } else {
    return (
      <Container>
        <Title>404</Title>
        <p>Analysis not found</p>
      </Container>
    );
  }
}
