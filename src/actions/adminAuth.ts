"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// FIX: Added `prevState` as the first argument to satisfy useActionState
export async function loginAdminAction(
  prevState: { error: string } | null, 
  formData: FormData
) {
  const password = formData.get("password");
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    console.error("🚨 ADMIN_PASSWORD is not set in environment variables!");
    return { error: "Server configuration error." };
  }

  if (password !== correctPassword) {
    return { error: "Invalid password." };
  }

  const cookieStore = await cookies();
  
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, 
    path: "/",
  });

  redirect("/admin");
}