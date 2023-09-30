'use client';

import { SignOutButton as SignOutBtn } from "@clerk/nextjs";
import {useRouter} from 'next/navigation'
import Button from "./Button";

export default function SignOutButton() {

  const router = useRouter();

  return (
    <Button>
    <SignOutBtn signOutCallback={() => router.push('/')} />
    </Button>
  )
}