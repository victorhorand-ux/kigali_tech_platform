"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

import { CreateQuoteSchema, CreateQuoteDTO } from "../schemas/quote.schema";
import { submitQuoteAction } from "../actions/createQuote";

export function QuoteRequestForm() {
  const [isPending, startTransition] = useTransition();
  const [serverState, setServerState] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuoteDTO>({
    resolver: zodResolver(CreateQuoteSchema),
    defaultValues: {
      urgency: "medium",
    },
  });

  const onSubmit = (data: CreateQuoteDTO) => {
    setServerState({ type: "idle", message: "" });

    startTransition(async () => {
      const response = await submitQuoteAction(data);

      if (response.success) {
        setServerState({
          type: "success",
          message: response.message || "Request submitted successfully.",
        });
        reset(); // Clear the form on success
      } else {
        setServerState({
          type: "error",
          message: response.error,
        });
      }
    });
  };

  if (serverState.type === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center shadow-sm">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Quote Request Received</h3>
        <p className="text-gray-600">{serverState.message}</p>
        <button
          onClick={() => setServerState({ type: "idle", message: "" })}
          className="mt-6 rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md border border-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Request a Service Quote</h2>

      {serverState.type === "error" && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p>{serverState.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Customer Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register("customerName")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
              placeholder="e.g. Jean Claude"
            />
            {errors.customerName && (
              <p className="text-xs text-red-500">{errors.customerName.message}</p>
            )}
          </div>

          {/* Customer Phone */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              {...register("customerPhone")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
              placeholder="078..."
            />
            {errors.customerPhone && (
              <p className="text-xs text-red-500">{errors.customerPhone.message}</p>
            )}
          </div>
        </div>

        {/* Service Requested */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Service Needed</label>
          <select
            {...register("serviceRequested")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
          >
            <option value="">Select a service...</option>
            <option value="TV Wall Mounting">TV Wall Mounting</option>
            <option value="CCTV Installation">CCTV Installation</option>
            <option value="Smart Home Setup">Smart Home Setup</option>
            <option value="Network/WiFi Setup">Network/WiFi Setup</option>
          </select>
          {errors.serviceRequested && (
            <p className="text-xs text-red-500">{errors.serviceRequested.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* District */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">District (Kigali)</label>
            <select
              {...register("location.district")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
            >
              <option value="">Select district...</option>
              <option value="Gasabo">Gasabo</option>
              <option value="Kicukiro">Kicukiro</option>
              <option value="Nyarugenge">Nyarugenge</option>
            </select>
            {errors.location?.district && (
              <p className="text-xs text-red-500">{errors.location.district.message}</p>
            )}
          </div>

          {/* Sector */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Sector</label>
            <input
              {...register("location.sector")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
              placeholder="e.g. Kimironko"
            />
            {errors.location?.sector && (
              <p className="text-xs text-red-500">{errors.location.sector.message}</p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Additional Details</label>
          <textarea
            {...register("notes")}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
            placeholder="Describe your property or specific requirements..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F97316] px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Request Quote"
          )}
        </button>
      </form>
    </div>
  );
}