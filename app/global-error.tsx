"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-sm font-medium text-neutral-500">Something went wrong.</p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
