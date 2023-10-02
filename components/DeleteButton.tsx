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
  const [contentVisible, setContentVisible] = useState(true);

  function deleteQuiz() {
    setLoading(true);
    setContentVisible(false);
    fetch(props.URL + '/api/delete/', {
      method: 'POST',
      body: JSON.stringify({
        quizId: props.quizId
      })
    }).then(res => res.json()).then(data => {
      if(data.msg.endsWith("[400]")) {
        setLoading(false);
        setContentVisible(true);
        toast.error("Failed to delete quiz. Try again later");
      } else {
        setLoading(false);
        setContentVisible(true);
        toast.success("Quiz deleted successfully");
        router.refresh();
      }
    })
  }

  return (
    <Button onPress={() => deleteQuiz()} isIconOnly={props.isIconOnly ?? true} isLoading={loading} {...props}>
      {contentVisible ? <BsTrash /> : ''}
    </Button>
  );
}
