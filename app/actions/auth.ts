"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import pool from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72),
});

const loginSchema = z.object({
  email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(72),
});

export type LoginState = {
  error?: string;
  field?: "email" | "password";
};

export type RegisterState = {
  error?: string;
  field?: "name" | "email" | "password";
};

export async function register(_previousState: RegisterState, formData: FormData): Promise<RegisterState> {
  const parsed = registrationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please check your details and try again.", field: "email" };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [parsed.data.name, parsed.data.email, passwordHash],
    );
    await createSession((result as { insertId: number }).insertId);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ER_DUP_ENTRY") {
      return { error: "An account with this email already exists.", field: "email" };
    }
    throw error;
  }

  revalidatePath("/todos");
  redirect("/todos");
}

export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please enter a valid email address and password.", field: "email" };
  }

  const [rows] = await pool.execute(
    "SELECT id, password_hash FROM users WHERE email = ? LIMIT 1",
    [parsed.data.email],
  );
  const user = (rows as { id: number; password_hash: string }[])[0];
  if (!user || !(await bcrypt.compare(parsed.data.password, user.password_hash))) {
    return { error: "Invalid email or password. Please try again.", field: "password" };
  }

  await createSession(user.id);
  revalidatePath("/todos");
  redirect("/todos");
}

export async function logout() {
  await deleteSession();
  revalidatePath("/");
  redirect("/");
}
