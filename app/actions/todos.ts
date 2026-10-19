"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import pool from "@/lib/db";
import { requireUser } from "@/lib/auth";

const titleSchema = z.string().trim().min(1).max(255);
const idSchema = z.coerce.number().int().positive();

export async function createTask(formData: FormData) {
  const user = await requireUser();
  const title = titleSchema.parse(formData.get("title"));
  await pool.execute(
    "INSERT INTO tasks (user_id, title, completed, created_at, updated_at) VALUES (?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
    [user.id, title],
  );
  revalidatePath("/todos");
}

export async function toggleTask(formData: FormData) {
  const user = await requireUser();
  const id = idSchema.parse(formData.get("taskId"));
  await pool.execute(
    "UPDATE tasks SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?",
    [id, user.id],
  );
  revalidatePath("/todos");
}

export async function updateTask(formData: FormData) {
  const user = await requireUser();
  const id = idSchema.parse(formData.get("taskId"));
  const title = titleSchema.parse(formData.get("title"));
  // Keep updated_at as the completion timestamp. Editing a completed task
  // must not make it look like it was completed again.
  await pool.execute(
    "UPDATE tasks SET title = ?, updated_at = updated_at WHERE id = ? AND user_id = ?",
    [title, id, user.id],
  );
  revalidatePath("/todos");
}

export async function deleteTask(formData: FormData) {
  const user = await requireUser();
  const id = idSchema.parse(formData.get("taskId"));
  await pool.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", [id, user.id]);
  revalidatePath("/todos");
}
