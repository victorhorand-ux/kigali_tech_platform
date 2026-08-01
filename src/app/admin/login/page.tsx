"use client";

import { useActionState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { loginAdminAction } from "@/actions/adminAuth";

export default function AdminLoginPage() {
  // useActionState replaces useFormState in newer React/Next.js versions
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex rounded-full bg-orange-100 p-4 text-[#F97316]">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your secure passcode to access the CRM dashboard.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter admin password..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
            />
          </div>

          {state?.error && (
            <p className="text-center text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1B3D] px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isPending ? "Verifying..." : "Unlock Dashboard"}
            {!isPending && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>
      </div>
    </main>
  );
}