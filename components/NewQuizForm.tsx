"use client";

import { useState } from "react";
import QuizContainer from "./QuizContainer";
import Button from "./Button";
import QuizInput from "./QuizInput";
import { Checkbox } from "@nextui-org/checkbox";
import { Tooltip } from "@nextui-org/tooltip";
import { BsCheckLg, BsPlus, BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";

import {useRouter} from 'next/navigation'

export default function NewQuizForm({ URL }: { URL: string }) {

  const router = useRouter();

  const maxQuestions = 15;
  const maxOptions = 5;
  const minOptions = 2;

  const [quizTitle, setQuizTitle] = useState("");
  const [quizTitleIsEntered, setQuizTitleIsEntered] = useState(false);

  const [quizDesc, setQuizDesc] = useState("");
  const [quizDescIsEntered, setQuizDescIsEntered] = useState(false);

  const [confirmBtnIsLoading, setConfirmBtnIsLoading] = useState(false);

  // defining option object to put in the question object type for better checking.
  type optionObj = {
    option: string;
    isCorrect: boolean;
  };

  // defining question object type to put in the quiz type for better checking.
  type questionObj = {
    question: string;
    options: optionObj[];
  };

  type QuizObj = questionObj[];

  const [questionsEntered, setQuestionsEntered] = useState(false);
  // setting default 2 questions with each 2 options.
  const [questions, setQuestions] = useState<QuizObj>([
    {
      question: "Question 1",
      options: [
        {
          option: "option 1 of question 1",
          isCorrect: true,
        },
        {
          option: "option 2 of question 1",
          isCorrect: false,
        },
      ],
    },
    {
      question: "Question 2",
      options: [
        {
          option: "option 1 of question 2",
          isCorrect: true,
        },
        {
          option: "option 2 of question 2",
          isCorrect: false,
        },
      ],
    },
  ]);

  function newQuestion() {
    let newQuestions = [...questions];
    if (newQuestions.length >= maxQuestions) return;
    newQuestions.push({
      question: "Question " + (newQuestions.length + 1),
      options: [
        {
          isCorrect: true,
          option: "Option 1 of Question " + (newQuestions.length + 1),
        },
        {
          isCorrect: false,
          option: "Option 2 of Question " + (newQuestions.length + 1),
        },
      ],
    });
    setQuestions(newQuestions);
  }

  function deleteQuestion(quesKey: number) {
    let newQuestions = [...questions];
    if (newQuestions.length <= 2) return;
    newQuestions.splice(quesKey, 1);
    setQuestions(newQuestions);
  }

  function newOption(quesKey: number) {
    let newQuestions = [...questions];
    if (newQuestions[quesKey].options.length >= maxOptions) return;
    newQuestions[quesKey].options.push({
      isCorrect: false,
      option:
        "Option " +
        (newQuestions[quesKey].options.length + 1) +
        " of Question " +
        (quesKey + 1),
    });
    setQuestions(newQuestions);
  }

  function createQuiz() {
    setConfirmBtnIsLoading(true);
    fetch(URL + '/api/create/', {
      method: 'POST',
      body: JSON.stringify({title: quizTitle, description: quizDesc, questions: questions}),
    }).then(res => res.text()).then(data => {
      
      if(data.endsWith("400")) {
        toast.error("A quiz with that data already exists. Try changing title or description.");
      } else if(data.endsWith("500")) {
        toast.error("Something went wrong. Try again later.");
      } else {
        toast.success("Quiz created successfully.");
        router.refresh();
        router.push('/dashboard');
      }

      setConfirmBtnIsLoading(true);
      
    })
  }

  if (!quizTitleIsEntered) {
    return (
      <QuizContainer pageState={"quiz_title"}>
        <QuizInput
          onInput={(e) => setQuizTitle((e.target as HTMLInputElement).value)}
          value={quizTitle}
          label={"Enter quiz title"}
          variant={"flat"}
        />
        <Button
          className={`${
            quizTitle.length < 1 ? "pointer-events-none text-gray-400" : ""
          }`}
          onPress={() => {
            if (quizTitle.length < 1) return;
            setQuizTitleIsEntered(true);
          }}
        >
          Next
        </Button>
      </QuizContainer>
    );
  }

  if (!quizDescIsEntered && quizTitleIsEntered) {
    return (
      <QuizContainer pageState={"quiz_description"}>
        <QuizInput
          onInput={(e) => setQuizDesc((e.target as HTMLInputElement).value)}
          value={quizDesc}
          label={"Enter quiz description"}
          textarea={true}
          variant={"flat"}
        />
        <Button
          className={`${
            quizDesc.length < 1 ? "pointer-events-none text-gray-400" : ""
          }`}
          onPress={() => {
            if (quizDesc.length < 1) return;
            setQuizDescIsEntered(true);
          }}
        >
          Next
        </Button>
      </QuizContainer>
    );
  }

  if (!questionsEntered && quizTitleIsEntered && quizDescIsEntered) {
    return (
      <QuizContainer pageState="quiz_question">
        {questions.map((question, quesKey) => (
          <div
            key={quesKey}
            className="w-[35rem] max-w-[92vw] px-2 py-4 flex flex-col gap-8 items-start justify-start bg-white/10 rounded-lg relative"
          >
            <button className="text-xl text-red-500 absolute top-4 right-4" onClick={() => deleteQuestion(quesKey)}>
              <BsTrash className="cursor-pointer" />
            </button>
            <QuizInput
              className="mt-5"
              variant={"underlined"}
              value={question.question}
              label={"Enter question"}
              size={"lg"}
              onInput={(e) => {
                setQuestions((prev) => {
                  const newQuestions = [...prev];
                  newQuestions[quesKey].question = (
                    e.target as HTMLInputElement
                  ).value;
                  return newQuestions;
                });
              }}
            ></QuizInput>
            <div className="flex flex-col gap-2">
              {question.options.map((option, optKey) => (
                <span
                  key={optKey}
                  className="flex items-center justify-start gap-2"
                >
                  <QuizInput
                    className="!max-w-[75vw]"
                    value={option.option}
                    label={`Enter Option ${optKey + 1}`}
                    onInput={(e) =>
                      setQuestions((prev) => {
                        const newQuestions = [...prev];
                        newQuestions[quesKey].options[optKey].option = (
                          e.target as HTMLInputElement
                        ).value;
                        return newQuestions;
                      })
                    }
                  />
                  <Tooltip
                    content="if this option is correct"
                    closeDelay={0}
                    delay={0}
                  >
                    <div>
                      <Checkbox
                        isSelected={option.isCorrect}
                        onInput={(e) => {
                          // uncheck all the other options checkbox and then check this one.
                          const newQuestions = [...questions];
                          newQuestions[quesKey].options.forEach((option) => {
                            option.isCorrect = false;
                          });
                          newQuestions[quesKey].options[optKey].isCorrect =
                            true;

                          setQuestions(newQuestions);
                        }}
                      />
                    </div>
                  </Tooltip>
                </span>
              ))}
              <Button onPress={() => newOption(quesKey)} className="mt-5">
                <BsPlus />
                Add Option
              </Button>
            </div>
          </div>
        ))}
        <Button onPress={() => newQuestion()}>New Question</Button>
        <Button onPress={() => setQuestionsEntered(true)}>Confirm</Button>
      </QuizContainer>
    );
  }

  if (questionsEntered && quizTitleIsEntered && quizDescIsEntered) {
    return (
      <QuizContainer pageState="quiz_final">
        <h3 className="text-4xl mt-5 text-center">Almost done.</h3>
        <p className="text-center mx-4">
          Just one click away from creating your quiz. You have finished entering data for your quiz. Here&apos;s your quiz preview. Questions
          and options are only shown in numbers.
        </p>

        {/* show quiz title, description, question numbers and options */}
        <div className="w-[35rem] max-w-[92vw] px-2 py-4 flex flex-col gap-8 items-start justify-start bg-white/10 rounded-lg relative">
          <h3 className="text-2xl">{quizTitle}</h3>
          <p className="text-lg">{quizDesc}</p>
          {questions.map((question, quesKey) => (
            <div
              key={quesKey}
              className="w-[35rem] max-w-[92%] px-2 py-4 flex flex-col gap-8 items-start justify-start bg-white/10 rounded-lg relative"
            >
              <h4 className="text-xl">Question {quesKey + 1}</h4>
              <div className="flex flex-col gap-2 w-full">
                {question.options.map((option, optKey) => (
                  <span key={optKey} className={`w-full flex gap-2 justify-start items-center overflow-x-scroll whitespace-nowrap relative border-1 border-transparent ${option.isCorrect ? 'border-white' : ''}`}>
                    <span className="overflow-scroll max-sm:!w-[12rem] w-[70%]">{option.option}</span>
                    {option.isCorrect && <BsCheckLg className='text-green-500 text-xl absolute top-[50%] translate-y-[-50%] right-1 ' />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* add create quiz on press thing. */}
        <Button color={'success'} isLoading={confirmBtnIsLoading} onPress={() => createQuiz()}>Confirm</Button>
      </QuizContainer>
    );
  }
}
