"use client";

type PageState =
  | "quiz_title"
  | "quiz_description"
  | "quiz_question"
  | "quiz_final";

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
const defaultQuizObj: QuizObj = [
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
];

import { useState } from "react";
import QuizContainer from "./QuizContainer";
import Button from "./Button";
import QuizInput from "./QuizInput";
import { Checkbox } from "@nextui-org/checkbox";
import { Tooltip } from "@nextui-org/tooltip";
import {
  BsCheckLg,
  BsPlus,
  BsTrash,
  BsHash,
  BsCardText,
  BsQuestion,
  BsCheck2,
} from "react-icons/bs";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function NewQuizForm({ URL }: { URL: string }) {
  const router = useRouter();

  const maxQuestions = 15;
  const maxOptions = 5;
  const minOptions = 2;

  const [pageState, setPageState] = useState<PageState>("quiz_title");

  const [quizTitle, setQuizTitle] = useState("");
  const [quizTitleIsEntered, setQuizTitleIsEntered] = useState(false);

  const [quizDesc, setQuizDesc] = useState("");
  const [quizDescIsEntered, setQuizDescIsEntered] = useState(false);

  const [confirmBtnIsLoading, setConfirmBtnIsLoading] = useState(false);

  const [questionsEntered, setQuestionsEntered] = useState(false);
  // setting default 2 questions with each 2 options.
  const [questions, setQuestions] = useState<QuizObj>(defaultQuizObj);

  function changePageState(state: PageState, nextButton: boolean = true) {
    if (nextButton) {
      setPageState(state);
      if (state === "quiz_description") {
        setQuizTitleIsEntered(true);
      } else if (state === "quiz_question") {
        setQuizDescIsEntered(true);
      } else if (state === "quiz_final") {
        setQuestionsEntered(true);
      }
    } else {
      if (!quizTitleIsEntered) return;
      if (state === "quiz_description" && !quizTitleIsEntered) return;
      if (state === "quiz_question" && !quizDescIsEntered) return;

      if (state === "quiz_title") {
        setQuizTitleIsEntered(false);
        setQuizDescIsEntered(false);
        setQuestionsEntered(false);
      } else if (state === "quiz_description") {
        setQuizTitleIsEntered(true);
        setQuizDescIsEntered(false);
        setQuestionsEntered(false);
      } else if (state === "quiz_question") {
        setQuizTitleIsEntered(true);
        setQuizDescIsEntered(true);
        setQuestionsEntered(false);
      } else if (state === "quiz_final") {
        if (quizDesc === "") return;
        if (questions === defaultQuizObj) return;

        setQuizTitleIsEntered(true);
        setQuizDescIsEntered(true);
        setQuestionsEntered(true);
      }
      setPageState(state);
      return;
    }
  }

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

  function deleteOption(optKey: number, quesKey: number) {
    let newQuestions = [...questions];
    if (newQuestions[quesKey].options.length <= minOptions) return;

    if (newQuestions[quesKey].options[optKey].isCorrect) {
      if (optKey === 0) {
        newQuestions[quesKey].options[1].isCorrect = true;
        setQuestions(newQuestions);
      } else {
        newQuestions[quesKey].options[optKey - 1].isCorrect = true;
        setQuestions(newQuestions);
      }
    }

    newQuestions[quesKey].options.splice(optKey, 1);
    setQuestions(newQuestions);
  }

  function createQuiz() {
    async function handleQuizCreation() {
      try {
        setConfirmBtnIsLoading(true);

        const response = await fetch(URL + "/api/create/", {
          method: "POST",
          body: JSON.stringify({
            title: quizTitle,
            description: quizDesc,
            questions: questions,
          }),
        });

        const data = await response.text();

        if (data.endsWith("400")) {
          toast.error(
            "A quiz with that data already exists. Try changing title or description."
          );
        } else if (data.endsWith("500")) {
          toast.error("Something went wrong. Try again later.");
        } else {
          toast.success("Quiz created successfully.");
          router.refresh();
          router.push("/dashboard");
        }

        setConfirmBtnIsLoading(false);
      } catch (error) {
        console.error("Error creating quiz:", error);
        toast.error(
          "An error occurred while creating the quiz. Please try again."
        );
        setConfirmBtnIsLoading(false);
      }
    }

    handleQuizCreation();
  }

  if (!quizTitleIsEntered) {
    return (
      <div className="w-full mx-2 flex flex-col items-center justify-center gap-8 mt-12">
        <div className="flex items-center justify-start gap-4">
          <span
            className={`p-4 flex items-center justify-center bg-blue-500 rounded-md`}
          >
            <BsHash />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
          >
            <BsCardText />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
          >
            <BsQuestion />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_final", false)}
          >
            <BsCheck2 />
          </span>
        </div>
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
            changePageState("quiz_description");
          }}
        >
          Next
        </Button>
      </div>
    );
  }

  if (!quizDescIsEntered && quizTitleIsEntered) {
    return (
      <div className="w-full mx-2 flex flex-col items-center justify-center gap-8 mt-12">
        <div className="flex items-center justify-start gap-4">
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_title", false)}
          >
            <BsHash />
          </span>
          <span
            className={`p-4 flex items-center justify-center rounded-md !bg-blue-500`}
          >
            <BsCardText />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
          >
            <BsQuestion />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_final", false)}
          >
            <BsCheck2 />
          </span>
        </div>{" "}
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
            changePageState("quiz_question");
          }}
        >
          Next
        </Button>
      </div>
    );
  }

  if (!questionsEntered && quizTitleIsEntered && quizDescIsEntered) {
    return (
      <div className="w-full mx-2 flex flex-col items-center justify-center gap-8 mt-12">
        <div className="flex items-center justify-start gap-4">
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_title", false)}
          >
            <BsHash />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_description", false)}
          >
            <BsCardText />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-blue-500 rounded-md`}
          >
            <BsQuestion />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_final", false)}
          >
            <BsCheck2 />
          </span>
        </div>{" "}
        {questions.map((question, quesKey) => (
          <div
            key={quesKey}
            className="w-[35rem] max-w-[92vw] px-2 py-4 flex flex-col gap-8 items-start justify-start bg-white/10 rounded-lg relative"
          >
            <button
              className="text-xl text-red-500 absolute top-4 right-4"
              onClick={() => deleteQuestion(quesKey)}
            >
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
                    className="!max-w-[65vw]"
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
                  <Button
                    size="sm"
                    isIconOnly={true}
                    color="danger"
                    variant="bordered"
                    className="border-red-500 text-red-500"
                    onClick={() => deleteOption(optKey, quesKey)}
                  >
                    <BsTrash className="text-lg" />
                  </Button>
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
        <Button
          onPress={() => {
            changePageState("quiz_final");
          }}
        >
          Confirm
        </Button>
      </div>
    );
  }

  if (questionsEntered && quizTitleIsEntered && quizDescIsEntered) {
    return (
      <div className="w-full mx-2 flex flex-col items-center justify-center gap-8 mt-12">
        <div className="flex items-center justify-start gap-4">
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_title", false)}
          >
            <BsHash />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_description", false)}
          >
            <BsCardText />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-gray-700 rounded-md`}
            onClick={() => changePageState("quiz_question", false)}
          >
            <BsQuestion />
          </span>
          <span
            className={`p-4 flex items-center justify-center bg-blue-500 rounded-md`}
          >
            <BsCheck2 />
          </span>
        </div>{" "}
        <h3 className="text-4xl mt-5 text-center">Almost done.</h3>
        <p className="text-center mx-4">
          Just one click away from creating your quiz. You have finished
          entering data for your quiz. Here&apos;s your quiz preview. Questions
          and options are only shown in numbers.
        </p>
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
                  <span
                    key={optKey}
                    className={`w-full flex gap-2 justify-start items-center overflow-x-scroll whitespace-nowrap relative border-1 border-transparent ${
                      option.isCorrect ? "border-white" : ""
                    }`}
                  >
                    <span className="overflow-scroll max-sm:!w-[12rem] w-[70%]">
                      {option.option}
                    </span>
                    {option.isCorrect && (
                      <BsCheckLg className="text-green-500 text-xl absolute top-[50%] translate-y-[-50%] right-1 " />
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          color={"success"}
          isLoading={confirmBtnIsLoading}
          onPress={() => createQuiz()}
        >
          Confirm
        </Button>
      </div>
    );
  }
}
