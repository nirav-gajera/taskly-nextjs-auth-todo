import Link from "next/link";
import { redirect } from "next/navigation";
import RegisterForm from "@/app/register/register-form";
import { getSession } from "@/lib/session";

export const instant = false;

export default async function RegisterPage() {
  if (await getSession()) redirect("/todos");

  return (
    <main className="flex min-h-screen bg-[#f7f8fc] text-slate-950">
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-indigo-600"
          >
            ← Back to home
          </Link>
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Get started
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">
              Your best days
              <br />
              start here.
            </h1>
            <p className="mt-3 text-slate-500">
              Create an account and make your first list.
            </p>
          </div>
          <RegisterForm />
          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              className="font-bold text-indigo-600 hover:text-indigo-700"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
      <div className="hidden w-[42%] bg-indigo-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-black">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600">
            ✓
          </span>
          Taskly
        </Link>
        <div>
          <p className="max-w-md text-5xl font-black leading-tight tracking-tight">
            Turn intentions into <span className="text-indigo-200">done.</span>
          </p>
          <div className="mt-8 space-y-4 text-indigo-100">
            <p>✓ Keep every thought in one place</p>
            <p>✓ Build a rhythm that works for you</p>
            <p>✓ Celebrate your progress</p>
          </div>
        </div>
        <p className="text-sm text-indigo-200">
          A little more clarity, every day.
        </p>
      </div>
    </main>
  );
}
