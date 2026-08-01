import { CheckCircle } from "lucide-react";

interface QuoteSuccessMessageProps {
  message: string;
  onReset: () => void;
}

export function QuoteSuccessMessage({ message, onReset }: QuoteSuccessMessageProps) {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center shadow-sm">
      <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
      <h3 className="mb-2 text-xl font-semibold text-gray-900">Quote Request Received</h3>
      <p className="text-gray-600">{message}</p>
      <button
        onClick={onReset}
        className="mt-6 rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
      >
        Submit Another Request
      </button>
    </div>
  );
}