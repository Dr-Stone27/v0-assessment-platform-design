"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Authentication Error
          </CardTitle>
          <CardDescription className="text-center">
            There was a problem with your authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertDescription>
              The authentication code is invalid or has expired. Please try
              signing in again.
            </AlertDescription>
          </Alert>
          <Button asChild className="w-full">
            <Link href="/auth/signin">Back to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
