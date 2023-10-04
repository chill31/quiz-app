'use client';

import { BsHouse, BsGear } from "react-icons/bs";
import RedirectButton from "./RedirectButton";

export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {

  return (
    <main className={`w-full flex flex-col gap-12 min-h-[700px] pb-12 items-center justify-start bg-bg ${className}`}>
        <RedirectButton redirect="/" className="absolute top-2 left-2 text-lg" size='sm' customContent={true} customContentNode={<BsHouse />} />
        <RedirectButton redirect="/dashboard" className="absolute top-2 left-12 text-lg" size="sm" customContent={true} customContentNode={<BsGear />} />
      {children}
    </main>
  );
}
