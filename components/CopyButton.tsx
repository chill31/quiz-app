'use client'

import { BsClipboard } from "react-icons/bs";
import Button from "./Button";
import toast from "react-hot-toast";

export default function CopyButton({ copyText, icon, content, className }: { copyText: string, icon?: boolean, content?: React.ReactNode, className?: string }) {

  function copy() {
    navigator.clipboard.writeText(copyText);
    toast.success("Copied quiz id");
  }

  if(icon && !content) {
    return (
      <Button isIconOnly={true} className={className ? className : ''} onClick={copy}><BsClipboard /></Button>
    )
  } else {
    return (
      <Button className={className ? className : ''} onClick={copy}>
        <BsClipboard />
        {content}
      </Button>
    )
  }

}