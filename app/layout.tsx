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
        <Header />
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground text-sm">Loading...</p>
              </div>
            </div>
          }
        >
          <AssessmentProvider>{children}</AssessmentProvider>
        </Suspense>
      </body>
    </html>
  );
}
