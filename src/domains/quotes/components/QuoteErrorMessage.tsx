import { AlertCircle } from "lucide-react";

interface QuoteErrorMessageProps {
  message: string;
}

export function QuoteErrorMessage({ message }: QuoteErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
      <AlertCircle className="h-5 w-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}