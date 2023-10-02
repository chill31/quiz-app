"use client";

import { useEffect, useState, useRef } from "react";
import Button from "./Button";

export default function QuizCard({
  questions,
  quiz,
}: {
  questions: any;
  quiz: any;
}) {
  const defaultClasses =
    "w-[50rem] max-w-[95vw] min-h-[25rem] h-fit bg-black/20 mt-6 flex flex-col";

  const [isStart, setIsStart] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const [enteredData, setEnteredData] = useState<any>([]);

  function nextQuestion(ques: number) {
    let fnData = [...enteredData];
    fnData.push({
      questionId: ques,
      selectedOption: selectedOption,
      optionId: questions[currentQuestion].options[selectedOption].id,
      actualCorrect: questions[currentQuestion].options.findIndex(
        (option: any) => option.isCorrect
      ),
    });
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(0);
    setEnteredData(fnData);
  }

  function finishQuiz() {
    let fnData = [...enteredData];
    fnData.push({
      actualCorrect: questions[currentQuestion].options.findIndex((option: any) => option.isCorrect),
      questionId: currentQuestion,
      selectedOption: selectedOption,
      optionId: questions[currentQuestion].options[selectedOption].id,
    });
    setEnteredData(fnData);
    setQuizDone(true);
  }

  function calculateFraction(value: number, max: number) {
    return (value / max) * 100;
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
            {questions[currentQuestion].question.text}
          </h2>

          <div className="flex flex-col gap-3 w-full items-start justify-start">
            {questions[currentQuestion].options.map(
              (option: any, k: number) => (
                <span
                  className={`flex items-center justify-start gap-4 bg-black/25 px-2 py-3 w-full cursor-pointer hover:bg-gray-200/10 transition-colors ${
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
                    {k}
                  </span>
                  <span>{option.text}</span>
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
              onClick={() => finishQuiz()}
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

        <div className="w-[50rem] max-w-[95vw] min-h-[25rem] h-fit bg-black/20 flex flex-col gap-4 items-center justify-center py-4 px-2">
          <h2 className="text-[2.2rem] font-bold">Results</h2>

          <div className="flex flex-col gap-3 w-full items-start justify-start">
            {enteredData.map((data: any, k: number) => (
              <span
                className={`flex items-center justify-start gap-4 bg-black/25 px-2 py-3 w-full cursor-pointer hover:bg-gray-200/10 transition-colors ${
                  data.selectedOption === data.actualCorrect
                    ? "!bg-green-500/50"
                    : "!bg-red-600/50"
                }`}
                key={k}
              >
                <span
                  className={`p-1 h-fit aspect-[1] rounded-full bg-white/10 flex items-center justify-center`}
                >
                  Q. {k+1}
                </span>
                <span>
                  {questions[data.questionId].options[data.selectedOption].text}
                  <br />
                  {data.selectedOption !== data.actualCorrect ? (
                    <span>Correct: {questions[data.questionId].options.find((option: any) => option.isCorrect)?.text}</span>
                  ) : null}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-[2.2rem] font-bold">Analysis</h2>
          <div className={`${calculateFraction(enteredData.filter((data: any) => data.selectedOption === data.actualCorrect).length, enteredData.length) <= 50 ? 'border-red-600' : 'border-green-500'} h-[10rem] aspect-square rounded-full bg-white/10 border-[10px] flex flex-col gap-2 items-center justify-center mt-6`}>
              {/* show amount of correct questions done */}
              <span className="text-[2.3rem] font-bold">{enteredData.filter((data: any) => data.selectedOption === data.actualCorrect).length}</span>
              <span className="text-[1.2rem] text-gray-400">out of {enteredData.length}</span>
          </div>
          <p className="text-center">You got {calculateFraction(enteredData.filter((data: any) => data.selectedOption === data.actualCorrect).length, enteredData.length)}% of questions correct.</p>
        </div>
      </div>
    );
  }
}
