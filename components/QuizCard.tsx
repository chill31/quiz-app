"use client";

import React, { useState } from "react";
import Button from "./Button";

import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";

// for analysis function

type Option = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answer: number;
  options: Option[];
};

type EnteredData = {
  questionId: number;
  selectedOption: number;
  optionId: number;
  actualCorrect: number;
  actualCorrectText: string;
  questionText: string;
  selectedOptionText: string;
}[];

export default function QuizCard({
  questions,
  quiz,
  URL,
}: {
  questions: any;
  quiz: any;
  URL: string;
}) {
  const defaultClasses =
    "w-[50rem] max-w-[95vw] min-h-[25rem] h-fit bg-black/20 mt-6 flex flex-col rounded-lg";

  const { isSignedIn } = useUser();
  const router = useRouter();

  const [isStart, setIsStart] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const [enteredData, setEnteredData] = useState<EnteredData>([]);

  function nextQuestion(ques: number) {
    let fnData = [...enteredData];
    fnData.push({
      questionId: ques,
      selectedOption: selectedOption,
      optionId: questions[currentQuestion].options[selectedOption].id,
      actualCorrect: questions[currentQuestion].options.findIndex(
        (option: any) => option.isCorrect
      ),
      actualCorrectText: questions[currentQuestion].options.find(
        (option: any) => option.isCorrect
      ).text,
      questionText: questions[currentQuestion].question.text,
      selectedOptionText:
        questions[currentQuestion].options[selectedOption].text,
    });
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(0);
    setEnteredData(fnData);
  }

  function finishQuiz(ques: number) {
    let fnData = [...enteredData];
    fnData.push({
      questionId: ques,
      selectedOption: selectedOption,
      optionId: questions[currentQuestion].options[selectedOption].id,
      actualCorrect: questions[currentQuestion].options.findIndex(
        (option: any) => option.isCorrect
      ),
      actualCorrectText: questions[currentQuestion].options.find(
        (option: any) => option.isCorrect
      ).text,
      questionText: questions[currentQuestion].question.text,
      selectedOptionText:
        questions[currentQuestion].options[selectedOption].text,
    });
    setEnteredData(fnData);
    setQuizDone(true);
  }

  function calculateFraction(value: number, max: number) {
    return Math.round((value / max) * 100);
  }

  function createAnalysis({
    correct,
    total,
    quizDescription,
    quizId,
    quizTitle,
  }: {
    correct: number;
    total: number;
    quizDescription: string;
    quizId: string;
    quizTitle: string;
  }) {
    fetch(URL + "/api/analysis/save", {
      method: "POST",
      body: JSON.stringify({
        correct,
        total,
        quizDescription,
        quizId,
        quizTitle,
        questions: enteredData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg.endsWith("success")) {
          toast.success("Analysis saved to history");
          return router.push(`/analysis/${data.analysis.id}`);
        }
        return toast.error("Error saving analysis to history");
      });
  }

  if (!quizDone) {
    if (isStart) {
      return (
        <div
          className={`${defaultClasses} gap-4 items-center justify-center py-2`}
        >
          <h2 className="text-[2.2rem] font-bold text-center">Ready?</h2>
          <p className="text-center">
            Are you ready to take the <b>{quiz.title}</b> quiz? It has{" "}
            {questions.length} questions.
          </p>
          <Button
            color="primary"
            className="mt-4"
            onClick={() => {
              setIsStart(false);
              setCurrentQuestion(0);
              setEnteredData([]);
              setSelectedOption(0);
            }}
          >
            Start
          </Button>
        </div>
      );
    } else if (!isStart) {
      return (
        <div
          className={`${defaultClasses} gap-6 items-start justify-start py-4 px-2`}
        >
          <h2 className="text-[2.2rem] font-bold">
            Question {currentQuestion + 1}
          </h2>
          <span className="text-[1.1rem] text-gray-300">
            <ReactMarkdown
              allowedElements={[
                "p",
                "span",
                "code",
                "pre",
                "img",
                "b",
                "em",
                "i",
                "div",
                "strong",
              ]}
            >
              {questions[currentQuestion].question.text}
            </ReactMarkdown>
          </span>

          <div className="flex flex-col gap-3 w-full items-start justify-start">
            {questions[currentQuestion].options.map(
              (option: any, k: number) => (
                <span
                  className={`flex items-center justify-start gap-4 bg-black/25 px-2 py-3 w-full cursor-pointer hover:bg-gray-200/10 transition-colors rounded-md ${
                    selectedOption === k ? "!bg-blue-600" : ""
                  }`}
                  key={k}
                  onClick={() => {
                    setSelectedOption(k);
                  }}
                >
                  <span
                    className={`p-1 h-fit aspect-[1] rounded-full bg-white/10 `}
                  >
                    {k + 1}
                  </span>
                  <ReactMarkdown allowedElements={["strong", "em", "p", "code"]}>
                    {option.text}
                  </ReactMarkdown>
                </span>
              )
            )}
          </div>

          {questions.length - 1 > currentQuestion ? (
            <Button
              className="self-end"
              color="primary"
              onClick={() => nextQuestion(currentQuestion)}
            >
              Next
            </Button>
          ) : (
            <Button
              className="self-end"
              color="success"
              onClick={() => finishQuiz(currentQuestion)}
            >
              Finish
            </Button>
          )}
        </div>
      );
    }
  } else {
    return (
      <div className="flex flex-col gap-12 items-center justify-center mt-6">
        <div>
          <h2 className="text-center text-[2.4rem] font-bold">Quiz Done.</h2>
          <p>Check the below results for how you did.</p>
        </div>

        <div className="w-[50rem] max-w-[95vw] min-h-[25rem] h-fit bg-black/20 flex flex-col gap-4 items-center justify-center py-4 px-2 rounded-md">
          <h2 className="text-[2.2rem] font-bold">Results</h2>

          <div className="flex flex-col gap-3 w-full items-start justify-start">
            {enteredData.map((data: any, k: number) => (
              <React.Fragment key={k}>
                <ReactMarkdown
                  allowedElements={[
                    "p",
                    "span",
                    "code",
                    "pre",
                    "img",
                    "b",
                    "em",
                    "i",
                    "div",
                    "strong",
                  ]}
                  className="mt-4 text-gray-300 text-[1.1rem] italic"
                >
                  {questions[data.questionId].question.text}
                </ReactMarkdown>
                <span
                  className={`flex items-center justify-start gap-4 bg-black/25 px-2 py-3 w-full hover:bg-gray-200/10 rounded-md transition-colors ${
                    data.selectedOption === data.actualCorrect
                      ? "!bg-green-500/50"
                      : "!bg-red-600/50"
                  }`}
                >
                  <span
                    className={`p-1 h-fit aspect-[1] rounded-full bg-white/10 flex items-center justify-center min-w-max`}
                  >
                    Q. {k + 1}
                  </span>
                  <span>
                    <ReactMarkdown allowedElements={['p', 'span', 'code', 'pre', 'img', 'b', 'em', 'i', 'div', 'strong']}>
                    {
                      questions[data.questionId].options[data.selectedOption]
                        .text
                    }
                    </ReactMarkdown>
                    {data.selectedOption !== data.actualCorrect ? (
                      <span className="inline-flex gap-2">
                        Correct:{" "}
                        <ReactMarkdown
                          allowedElements={["strong", "em", "p", "code"]}
                        >
                          {
                            questions[data.questionId].options.find(
                              (option: any) => option.isCorrect
                            )?.text
                          }
                        </ReactMarkdown>
                      </span>
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
              calculateFraction(
                enteredData.filter(
                  (data: any) => data.selectedOption === data.actualCorrect
                ).length,
                enteredData.length
              ) <= 50
                ? "border-red-600"
                : "border-green-500"
            } h-[10rem] aspect-square rounded-full bg-white/10 border-[10px] flex flex-col gap-2 items-center justify-center mt-6`}
          >
            <span className="text-[2.3rem] font-bold">
              {
                enteredData.filter(
                  (data: any) => data.selectedOption === data.actualCorrect
                ).length
              }
            </span>
            <span className="text-[1.2rem] text-gray-400">
              out of {enteredData.length}
            </span>
          </div>
          <p className="text-center">
            You got{" "}
            {calculateFraction(
              enteredData.filter(
                (data: any) => data.selectedOption === data.actualCorrect
              ).length,
              enteredData.length
            )}
            % of questions correct.
          </p>
        </div>

        {isSignedIn ? (
          <Button
            className="mt-5"
            onClick={() => {
              createAnalysis({
                correct: enteredData.filter(
                  (data: any) => data.selectedOption === data.actualCorrect
                ).length,
                quizDescription: quiz.description,
                quizId: quiz.id,
                quizTitle: quiz.title,
                total: enteredData.length,
              });
            }}
          >
            Save to History
          </Button>
        ) : null}
      </div>
    );
  }
}
