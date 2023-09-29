'use client';

import Link from "next/link";
import { BsHouse, BsGear } from "react-icons/bs";

export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <main className={`w-full flex flex-col gap-12 min-h-[700px] pb-12 items-center justify-start bg-bg ${className}`}>
      {/* <button className="absolute top-2 left-2 !w-fit bg-white/10 p-2 text-xl rounded-md"> */}
        <Link href="/" className="absolute top-2 left-2 !w-fit bg-white/10 p-2 text-xl rounded-md">
          <BsHouse />
        </Link>
      {/* </button> */}
      {/* <button className="absolute top-2 left-12 !w-fit bg-white/10 p-2 text-xl rounded-md"> */}
        <Link href="/dashboard" className="absolute top-2 left-12 !w-fit bg-white/10 p-2 text-xl rounded-md">
          <BsGear />
        </Link>
      {/* </button> */}
      {children}
    </main>
  );
}
