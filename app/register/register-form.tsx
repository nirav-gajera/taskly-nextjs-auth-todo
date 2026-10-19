"use client";

import { useActionState } from "react";
import { register, type RegisterState } from "@/app/actions/auth";

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);
  const hasError = (field: RegisterState["field"]) => state.field === field;
  const inputClass = (field: RegisterState["field"]) =>
    `w-full rounded-xl border bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${hasError(field) ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200 focus:border-indigo-500"}`;

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50"
    >
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">
          Your name
        </span>
        <input
          name="name"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          placeholder="John doe"
          aria-invalid={hasError("name")}
          className={inputClass("name")}
        />
        {hasError("name") && (
          <p className="mt-2 text-sm font-medium text-red-600">{state.error}</p>
        )}
      </label>
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
          aria-invalid={hasError("email")}
          aria-describedby={
            hasError("email") ? "register-email-error" : undefined
          }
          className={inputClass("email")}
        />
        {hasError("email") && (
          <p
            id="register-email-error"
            role="alert"
            className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600"
          >
            <span aria-hidden>!</span>
            {state.error}
          </p>
        )}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">
          Create a password
        </span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={72}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          aria-invalid={hasError("password")}
          className={inputClass("password")}
        />
        <span className="mt-2 block text-xs text-slate-400">
          Use 8 or more characters for a secure password.
        </span>
        {hasError("password") && (
          <p className="mt-2 text-sm font-medium text-red-600">{state.error}</p>
        )}
      </label>
      <button
        disabled={isPending}
        className="w-full rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          "Creating account..."
        ) : (
          <>
            Create my account <span className="ml-1">→</span>
          </>
        )}
      </button>
    </form>
  );
}
