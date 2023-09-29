"use client";

import { useState } from "react";
import QuizContainer from "./QuizContainer";
import Button from "./Button";
import QuizInput from "./QuizInput";
import { Checkbox, Tooltip } from "@nextui-org/react";

export default function NewQuizForm() {

  // function to generate default set of questions + options.
  const generateQuestions = (n: number) => {
    const questionsArray = [];
    for (let i = 0; i < n; i++) {
      const questionObject = {
        question: `Question ${i + 1}`,
        options: Array.from({ length: 5 }, (value, index) => {
          return {
            option: `Option ${index + 1}`,
            isCorrect: index === 0,
          };
        }),
      };
      questionsArray.push(questionObject);
    }
    return questionsArray;
  };

  const maxQuestions = 15;
  const maxOptions = 5;
  const minOptions = 2;

  const [quizTitle, setQuizTitle] = useState("");
  const [quizTitleIsEntered, setQuizTitleIsEntered] = useState(false);

  const [quizDesc, setQuizDesc] = useState("");
  const [quizDescIsEntered, setQuizDescIsEntered] = useState(false);

  const [questionsAmounIstEntered, setQuestionsAmountIsEntered] = useState(false);
  const [questionsAmount, setQuestionsAmount] = useState(5);

  const [questionsEntered, setQuestionsEntered] = useState(false);
  const [questions, setQuestions] = useState<any>([]);

  const exampleQues = [
    {
      question: "what is the answer to question?",
      options: [
        {
          option: "this is option 1",
          isCorrect: false,
        },
        {
          option: "this is option 2",
          isCorrect: false,
        },
        {
          option: "this is option 3",
          isCorrect: true,
        },
        {
          option: "this is option 4",
          isCorrect: false,
        }
      ]
    },
    {
      question: "what is the answer to question 2?",
      options: [
        {
          option: "this is option 1",
          isCorrect: true,
        },
        {
          option: "this is option 2",
          isCorrect: false,
        },
        {
          option: "this is option 3",
          isCorrect: false,
        },
        {
          option: "this is option 4",
          isCorrect: false,
        }
      ]
    }
  ]

  if (!quizTitleIsEntered) {
    return (
      <QuizContainer pageState={'quiz_title'}>
        <QuizInput onInput={(e) => setQuizTitle((e.target as HTMLInputElement).value)} value={quizTitle} label={'Enter quiz title'} />
        <Button className={`${quizTitle.length < 1 ? 'pointer-events-none text-gray-400' : ''}`} onPress={() => {
          if(quizTitle.length < 1) return;
          console.log(quizTitle);
          setQuizTitleIsEntered(true)
        }}>Next</Button>
      </QuizContainer>
    )
  }

  if(!quizDescIsEntered && quizTitleIsEntered) {

    return (
      <QuizContainer pageState={'quiz_description'}>
        <QuizInput onInput={(e) => setQuizDesc((e.target as HTMLInputElement).value)} value={quizDesc} label={'Enter quiz description'} />
        <Button className={`${quizDesc.length < 1 ? 'pointer-events-none text-gray-400' : ''}`} onPress={() => {
          if(quizDesc.length < 1) return;
          console.log(quizDesc);
          setQuizDescIsEntered(true)
        }}>Next</Button>
      </QuizContainer>
    )

  }

  if(!questionsAmounIstEntered && quizTitleIsEntered && quizDescIsEntered) {
      return (
        <QuizContainer pageState="quiz_description">
          <QuizInput
            className="w-[25rem] max-w-[95vw]"
            label={"Enter amount of questions (1-15)"}
            value={`${questionsAmount}`}
            type={'number'}
            onInput={(e) => {

              if (isNaN(Number((e.target as HTMLInputElement).value))) {
                setQuestionsAmount((prev) => prev);
                setQuestions(generateQuestions(questionsAmount));
                return;
              };

              if (Number((e.target as HTMLInputElement).value) > maxQuestions) return setQuestionsAmount(maxQuestions);

              if (Number((e.target as HTMLInputElement).value) < 1) return setQuestionsAmount(1);

              setQuestionsAmount(Number((e.target as HTMLInputElement).value));

            }}
          ></QuizInput>
          <Button onPress={() => setQuestionsAmountIsEntered(true)}>
            Next
          </Button>
        </QuizContainer>
      );
  }

  if(!questionsEntered && questionsAmounIstEntered && quizTitleIsEntered && quizDescIsEntered) {

    return (
      <QuizContainer pageState="quiz_question">

        {/* converting number into array, whose items are the number from 1 - 'n', just to map it */}
        {Array.from({ length: questionsAmount }, (_, index) => index + 1).map((number, key) => (
          <div key={key} className="w-[35rem] max-w-[92vw] px-2 py-4 flex flex-col gap-8 items-start justify-start bg-white/10 rounded-lg">
            <h3 className="text-xl">Question {number}</h3>
            <div className="flex flex-col gap-2">

              <span className="flex items-center justify-start gap-2">
                <QuizInput className="!max-w-[75vw]" value="" label={`Enter Option 1`} />
                  <Checkbox checked />
              </span>
              <span className="flex items-center justify-start gap-2">
                <QuizInput className="!max-w-[75vw]" value="" label={`Enter Option 2`} />
                  <Checkbox checked />
              </span>
              <span className="flex items-center justify-start gap-2">
                <QuizInput className="!max-w-[75vw]" value="" label={`Enter Option 3`} />
                  <Checkbox checked />
              </span>
              <span className="flex items-center justify-start gap-2">
                <QuizInput className="!max-w-[75vw]" value="" label={`Enter Option 4`} />
                  <Checkbox checked />
              </span>
              <span className="flex items-center justify-start gap-2">
                <QuizInput className="!max-w-[75vw]" value="" label={`Enter Option 5`} />
                  <Checkbox checked />
              </span>
            </div>
          </div>
        ))}

      </QuizContainer>
    )

  }
}
