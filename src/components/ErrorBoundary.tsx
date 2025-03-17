// src/components/ErrorBoundary.tsx
"use client";

import { useEffect } from "react";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { useRouter } from "next/navigation";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const router = useRouter();
  useEffect(() => {
    // Opcjonalne logowanie błędów do serwisu monitorowania
    console.error("Application error:", error);

    // Możesz dodać integrację z Sentry lub innym serwisem monitorowania błędów
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Ups! Coś poszło nie tak
        </h2>

        <div className="mb-6 text-gray-300">
          <p className="mb-4">
            Przepraszamy, napotkaliśmy nieoczekiwany błąd podczas przetwarzania
            Twojego żądania.
          </p>

          {process.env.NODE_ENV !== "production" && (
            <div className="bg-gray-900 p-4 rounded-md text-left mb-4 overflow-auto max-h-60">
              <p className="text-red-400 font-mono text-sm">{error.message}</p>
              {error.stack && (
                <pre className="text-gray-400 font-mono text-xs mt-2 whitespace-pre-wrap">
                  {error.stack}
                </pre>
              )}
            </div>
          )}

          <p>
            Spróbuj odświeżyć stronę lub użyj przycisku poniżej, aby spróbować
            ponownie.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <EnhancedButton
            variant="tech"
            onClick={reset}
            className="w-full sm:w-auto"
          >
            Spróbuj ponownie
          </EnhancedButton>

          <EnhancedButton
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto"
          >
            Wróć do strony głównej
          </EnhancedButton>
        </div>
      </div>
    </div>
  );
}
