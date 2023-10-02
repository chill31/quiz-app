'use client';

import { BsBoxArrowUpRight } from "react-icons/bs";
import Button from "./Button";
import {ButtonProps} from '@nextui-org/button'
import {useRouter} from 'next/navigation';

type btnProps = ButtonProps & {redirect: string}

export default function RedirectButton(props: btnProps) {
  const router = useRouter();

  return (
    <Button onPress={() => router.push(props.redirect ?? "/")} isIconOnly={props.isIconOnly ?? true} {...props}>
      <BsBoxArrowUpRight />
    </Button>
  );
}
