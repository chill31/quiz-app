'use client';

import { SignOutButton as SignOutBtn } from "@clerk/nextjs";
import {useRouter} from 'next/navigation'

export default function SignOutButton() {

  const router = useRouter();

  return (
    <SignOutBtn signOutCallback={() => router.push('/')} data-sign-out-button />
  )
}