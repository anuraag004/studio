'use client'; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
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
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center py-10">
      <AlertCircle className="h-16 w-16 text-destructive mb-4" />
      <h1 className="text-4xl font-headline font-bold mb-2">Something went wrong!</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        We're sorry, but an unexpected error occurred. You can try to refresh the page or go back to the homepage.
      </p>
      <Button
        onClick={() => reset()}
        variant="default"
        size="lg"
      >
        Try again
      </Button>
    </div>
  );
}
