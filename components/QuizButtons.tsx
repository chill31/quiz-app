"use client";

import Button from "@/components/Button";
import { Input } from "@nextui-org/react";
import { BsPlus } from "react-icons/bs";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuizButtons() {
  const router = useRouter();
  const [input, setInput] = useState("");

  function redirect(url: string) {
    router.push(url);
  }

  return (
    <div className="flex flex-col gap-9 w-full items-center justify-start mt-6">
      <Button onPress={() => redirect('/create-quiz')}>
        <BsPlus className="text-xl" /> Create Quiz
      </Button>
      <div className="flex items-center justify-center gap-2">
        <hr className="w-[45vw] max-sm:w-[37vw]" />
        OR
        <hr className="w-[45vw] max-sm:w-[37vw]" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Input
          label="Enter quiz id..."
          className="w-[25rem] max-w-[67vw]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          radius="sm"
        />
        <Button className={`[padding-block:1.7rem_!important] ${input.length === 0 ? 'text-gray-500 pointer-events-none' : ''}`} onPress={() => redirect('/quiz/' + input)}>Go</Button>
      </div>
    </div>
  );
}
