"use client";

import Button from "@/components/Button";
import { Input } from "@nextui-org/input";
import { BsPlus } from "react-icons/bs";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuizButtons({
  dashboard = false,
}: {
  dashboard?: boolean;
}) {
  const router = useRouter();
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [goLoading, setGoLoading] = useState(false);

  function redirect(url: string) {
    router.push(url);
  }

  if (dashboard) {
    return (
      <Button
        onPress={() => {
          setLoading(true);
          redirect("/create-quiz");
        }}
        isLoading={loading}
      >
        <BsPlus className={`text-xl ${loading ? "hidden" : ""}`}/> Create Quiz
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-9 w-full items-center justify-start mt-6">
      <Button
        onPress={() => {
          setLoading(true);
          redirect("/create-quiz");
        }}
        isLoading={loading}
      >
        <BsPlus className={`text-xl ${loading ? "hidden" : ""}`} /> Create Quiz
      </Button>
      <div className="flex items-center justify-center gap-2 sm:hidden">
        <hr className="w-[45vw] max-sm:w-[37vw]" />
        OR
        <hr className="w-[45vw] max-sm:w-[37vw]" />
      </div>
      <span className="max-sm:hidden">OR</span>
      <div className="flex items-center justify-center gap-2">
        <Input
          label="Enter quiz id..."
          className="w-[25rem] max-w-[67vw]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          radius="sm"
          placeholder="aaaaaaaa-bbbb-4ccc-dddd-eeeeeeeeeeee format"
        />
        <Button
          className={`[padding-block:1.7rem_!important] ${
            input.length === 0 ? "text-gray-500 pointer-events-none" : ""
          }`}
          isLoading={goLoading}
          onPress={() => {
            if (input.length === 0) return;
            setGoLoading(true);
            redirect("/quiz/" + input);
          }}
        >
          {goLoading ? "" : "Go"}
        </Button>
      </div>
    </div>
  );
}
