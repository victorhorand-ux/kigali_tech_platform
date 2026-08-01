"use client";

import { useTransition } from "react";
import { deleteQuoteAction } from "@/actions/deleteQuote";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // Add a safety check to prevent accidental clicks
    const confirmed = window.confirm("Are you sure you want to permanently delete this lead?");
    
    if (confirmed) {
      startTransition(() => {
        deleteQuoteAction(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      title="Delete Lead"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin text-red-600" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}