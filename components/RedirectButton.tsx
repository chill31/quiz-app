"use client";

import { BsBoxArrowUpRight } from "react-icons/bs";
import Button from "./Button";
import { ButtonProps } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type btnProps = ButtonProps & { redirect: string; customContent?: boolean; customContentNode?: React.ReactNode };

export default function RedirectButton(props: btnProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(
    props.customContent ? props.customContentNode : <BsBoxArrowUpRight />
  );

  return (
    <Button
      onPress={() => {
        if(window.location.pathname === props.redirect) return;
        setLoading(true);
        setContent("");
        router.push(props.redirect ?? "/");
      }}
      isIconOnly={props.isIconOnly ?? true}
      {...props}
      isLoading={loading}
    >
      {content}
    </Button>
  );
}
