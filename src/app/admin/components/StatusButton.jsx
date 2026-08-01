"use client";

import { useTransition } from "react";
import { updateQuoteStatusAction } from "@/actions/updateQuoteStatus";
import { Clock, CheckCircle, Loader2 } from "lucide-react";

export function StatusButton({ id, currentStatus }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    // Flip the status based on current state
    const newStatus = currentStatus === "pending" ? "contacted" : "pending";
    
    startTransition(() => {
      updateQuoteStatusAction(id, newStatus);
    });
  };

  if (currentStatus === "pending") {
    return (
      <button
        onClick={handleToggle}
        disabled={isPending}
        className="group inline-flex w-28 items-center justify-center gap-1 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800 transition-colors hover:bg-yellow-200 disabled:opacity-50"
        title="Click to mark as Contacted"
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Clock className="h-3 w-3" />
        )}
        {isPending ? "Updating..." : "Pending"}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="group inline-flex w-28 items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-800 transition-colors hover:bg-green-200 disabled:opacity-50"
      title="Click to mark as Pending"
    >
      {isPending ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <CheckCircle className="h-3 w-3" />
      )}
      {isPending ? "Updating..." : "Contacted"}
    </button>
  );
}