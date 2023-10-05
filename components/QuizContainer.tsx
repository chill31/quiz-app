import { BsHash, BsCardText, BsQuestion, BsCheck2 } from "react-icons/bs";

type PageState =
  | "quiz_title"
  | "quiz_description"
  | "quiz_question"
  | "quiz_final";

export default function QuizContainer({
  children,
  pageState,
  className,
}: {
  children: React.ReactNode;
  pageState: PageState;
  className?: string;
}) {
  return (
    <div
      className={`w-full mx-2 flex flex-col items-center justify-center gap-8 mt-12 ${className}`}
    >
      <div className="flex items-center justify-start gap-4">
        <span className={`p-4 flex items-center justify-center bg-gray-700 rounded-md ${pageState === 'quiz_title' ? '!bg-blue-500' : ''}`}>
          <BsHash />
        </span>
        <span className={`p-4 flex items-center justify-center bg-gray-700 rounded-md ${pageState === 'quiz_description' ? '!bg-blue-500' : ''}`}>
          <BsCardText />
        </span>
        <span className={`p-4 flex items-center justify-center bg-gray-700 rounded-md ${pageState === 'quiz_question' ? '!bg-blue-500' : ''}`}>
          <BsQuestion />
        </span>
        <span className={`p-4 flex items-center justify-center bg-gray-700 rounded-md ${pageState === 'quiz_final' ? '!bg-blue-500' : ''}`}>
          <BsCheck2 />
        </span>
      </div>
      {children}
    </div>
  );
}
