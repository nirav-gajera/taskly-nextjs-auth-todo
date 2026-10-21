"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const emailHasError = state.field === "email";
  const passwordHasError = state.field === "password";

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50"
    >
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">
          Email address
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={emailHasError}
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${emailHasError ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200 focus:border-indigo-500"}`}
        />
        {emailHasError && (
          <p className="mt-2 text-sm font-medium text-red-600">{state.error}</p>
        )}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">
          Password
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={passwordHasError}
          aria-describedby={
            passwordHasError ? "login-password-error" : undefined
          }
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${passwordHasError ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200 focus:border-indigo-500"}`}
        />
        {passwordHasError && (
          <p
            id="login-password-error"
            role="alert"
            className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600"
          >
            <span aria-hidden>!</span>
            {state.error}
          </p>
        )}
      </label>
      <button
        disabled={isPending}
        className="w-full rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          "Checking..."
        ) : (
          <>
            Log in <span className="ml-1">→</span>
          </>
        )}
      </button>
    </form>
  );
}
