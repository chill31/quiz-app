"use client";

import { useState } from "react";
import Button from "./Button";

export default function QuizCard({
  questions,
  options,
  quiz,
}: {
  questions: any;
  options: any;
  quiz: any;
}) {
  const defaultClasses =
    "w-[50rem] max-w-[95vw] min-h-[25rem] h-fit bg-black/20 mt-6 flex flex-col";

  const [isStart, setIsStart] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);

  console.log('questions: ', questions);
  console.log('options: ', options);

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
          onPress={() => setIsStart(false)}
        >
          Start
        </Button>
      </div>
    );
  } else {
    return (
      <div
        className={`${defaultClasses} gap-6 items-start justify-start py-4 px-2`}
      >
        <h2 className="text-[2.2rem] font-bold">
          {questions[currentQuestion].text}
        </h2>

        <div className="flex flex-col gap-3 w-full items-start justify-start">
          {options[currentQuestion].options.map((option: any, k: number) => (
            <span className={`flex items-center justify-start gap-4 bg-black/25 px-2 py-3 w-full cursor-pointer ${selectedOption === k ? '!bg-blue-600' : ''}`} key={k} onClick={() => {
              setSelectedOption(k);
              console.log(k);
            }}>
              <span className={`p-1 h-fit aspect-[1] rounded-full bg-white/10 `}>{k}</span>
              <span>{option.text}</span>
            </span>
          ))}
        </div>

        {currentQuestion < questions.length - 1 ? <Button className="self-end" color='primary' onPress={() => {
          setCurrentQuestion(prev => prev+1);
          setSelectedOption(0);
        }}>Next</Button> : <Button className="self-end" color='success'>Finish</Button>}

      </div>
    );
  }
}
