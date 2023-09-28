'use client';

import Link from "next/link";
import { BsHouse } from "react-icons/bs";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex flex-col gap-12 min-h-[650px] h-[100vh] items-center justify-start bg-bg">
      <button className="absolute top-2 left-2 !w-fit bg-white/10 p-2 text-xl rounded-md">
        <Link href="/" tabIndex={-1}>
          <BsHouse />
        </Link>
      </button>
      {children}
    </main>
  );
}
