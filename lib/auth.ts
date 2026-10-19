import "server-only";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { getSession } from "@/lib/session";

export async function requireUser() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const [rows] = await pool.execute(
    "SELECT id, name, email FROM users WHERE id = ? LIMIT 1",
    [session.userId]
  );

  const users = rows as {
    id: number;
    name: string;
    email: string;
  }[];

  if (!users[0]) {
    redirect("/login");
  }

  return users[0];
}
