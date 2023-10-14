"use client";

import { BsTrash } from "react-icons/bs";
import { FaRedoAlt } from "react-icons/fa";
import Button from "./Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AnalysisEndButtons({
  URL = "https://chill31-quiz.vercel.app",
  id,
  quizId,
}: {
  URL: string;
  id: string;
  quizId: string;
}) {
  const router = useRouter();

  function deleteAnalysis() {
    fetch(URL + "/api/analysis/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    }).then(res => res.json()).then(data => {
      if(data.msg.endsWith('[200]')) {
        toast.success('Analysis deleted successfully');
        router.refresh();
        redirect('/dashboard');
      } else {
        toast.error('Error deleting analysis');
      }
    });
  }

  function redirect(url: string) {
    router.push(url);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <Button
        color="primary"
        onClick={() => redirect(`/quiz/${quizId}`)}
        startContent={<FaRedoAlt />}
      >
        Take Quiz Again
      </Button>
      <Button
        variant="ghost"
        color="danger"
        startContent={<BsTrash />}
        onClick={() => deleteAnalysis()}
      >
        Delete Analysis
      </Button>
    </div>
  );
}
