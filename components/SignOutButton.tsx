'use client';

import { SignOutButton as SignOutBtn, useClerk } from "@clerk/nextjs";
import {useRouter} from 'next/navigation'
import Button from "./Button";
import { useState } from "react";

export default function SignOutButton() {

  const router = useRouter();
  const {signOut} = useClerk();
  const [loading, setLoading] = useState(false);

  return (
    <Button isLoading={loading} onClick={() => {
      setLoading(true);
      signOut().then(() => {
        router.push("/")
      })
    }}>Sign Out</Button>
  )
}