import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AssessmentProvider } from "@/lib/context/assessment-context";
import { Header } from "@/components/header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Learning Archetype Assessment",
  description:
    "Discover your unique learning style and unlock personalized strategies for academic success",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <AssessmentProvider>{children}</AssessmentProvider>
        </Suspense>
      </body>
    </html>
  );
}
