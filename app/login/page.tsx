import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/app/login/login-form";
import { getSession } from "@/lib/session";

export const instant = false;

export default async function LoginPage() {
  if (await getSession()) {
    redirect("/todos");
  }

  return (
    <main className="flex min-h-screen bg-[#f7f8fc] text-slate-950">
      <AuthAside />
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
              Welcome back
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">
              Good to see you.
            </h1>
            <p className="mt-3 text-slate-500">
              Log in and pick up where you left off.
            </p>
          </div>
          <LoginForm />
          <p className="mt-7 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              className="font-bold text-indigo-600 hover:text-indigo-700"
              href="/register"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function AuthAside() {
  return (
    <aside className="relative hidden w-[42%] overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-indigo-600/40 blur-3xl" />
      <div className="relative">
        <Link href="/" className="flex items-center gap-3 text-xl font-black">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950">
            ✓
          </span>
          Taskly
        </Link>
      </div>
      <div className="relative max-w-md">
        <p className="text-5xl font-black leading-tight tracking-tight">
          Small steps.
          <br />
          <span className="text-indigo-400">Big momentum.</span>
        </p>
        <p className="mt-6 leading-7 text-slate-400">
          A focused workspace for the things you want to make happen.
        </p>
      </div>
      <p className="relative text-sm text-slate-500">© 2026 Taskly</p>
    </aside>
  );
}
