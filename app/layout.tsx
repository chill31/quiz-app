import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chill31 Quiz App",
  description:
    "Quiz app created by Chill31 with the help of Satindar31. You can create and share quizzes to other people.",
};

import { Providers } from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <body className={inter.className}>
          <Providers>
            {children}
            <Toaster position="top-center" />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
