"use client";

import { useState } from "react";
import { deleteTask } from "@/app/actions/todos";

export default function DeleteTaskButton({
  taskId,
  title,
}: {
  taskId: number;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`Delete ${title}`}
        onClick={() => setIsOpen(true)}
        className="rounded-lg px-2 py-1 text-sm text-slate-300 transition hover:bg-red-50 hover:text-red-500"
      >
        ×
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-5 py-8 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-title-${taskId}`}
            className="w-full max-w-md rounded-3xl border border-white/70 bg-white p-6 shadow-2xl shadow-slate-950/25 sm:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-500">
                !
              </div>
              <div>
                <h2
                  id={`delete-title-${taskId}`}
                  className="text-lg font-black text-slate-950"
                >
                  Delete this task?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You are about to permanently remove{" "}
                  <span className="font-bold text-slate-700">“{title}”</span>.
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <form action={deleteTask}>
                <input type="hidden" name="taskId" value={taskId} />
                <button className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700">
                  Delete task
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
