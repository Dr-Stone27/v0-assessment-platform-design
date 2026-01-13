"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800 mb-2">404</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-8"></div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go Home
          </Link>

          <div className="text-sm text-gray-500">
            or{" "}
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 cursor-pointer hover:text-blue-700 underline"
            >
              go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
