'use client';

import { BsTrash } from "react-icons/bs";
import Button from "./Button";
import {ButtonProps} from '@nextui-org/button'
import {useRouter} from 'next/navigation';
import { useState } from "react";
import toast from "react-hot-toast";

type btnProps = ButtonProps & {quizId: string; URL: string}

export default function DeleteButton(props: btnProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function deleteQuiz() {
    setLoading(true);
    fetch(props.URL + '/api/delete/', {
      method: 'POST',
      body: JSON.stringify({
        quizId: props.quizId
      })
    }).then(res => res.json()).then(data => {
      if(data.msg.endsWith("[400]")) {
        setLoading(false);
        toast.error("Failed to delete quiz. Try again later");
      } else {
        setLoading(false);
        toast.success("Quiz deleted successfully");
        router.refresh();
      }
    })
  }

  return (
    <Button onPress={() => deleteQuiz()} isIconOnly={props.isIconOnly ?? true} isLoading={loading} {...props}>
      <BsTrash />
    </Button>
  );
}
