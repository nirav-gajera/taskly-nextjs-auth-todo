import {
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "@/app/actions/todos";
import DeleteTaskButton from "@/app/todos/delete-task-button";
import { logout } from "@/app/actions/auth";
import { requireUser } from "@/lib/auth";
import pool from "@/lib/db";
import Link from "next/link";

type Task = {
  id: number;
  title: string;
  completed: number | boolean;
  created_at: Date | string;
  updated_at: Date | string;
};
export const instant = false;

function asDate(value: Date | string) {
  if (value instanceof Date) return value;
  return new Date(value.includes("T") ? value : value.replace(" ", "T"));
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(asDate(value));
}

function formatTime(value: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(asDate(value));
}

export default async function TodosPage() {
  const user = await requireUser();
  const [rows] = await pool.execute(
    "SELECT id, title, completed, created_at, updated_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC, completed ASC, id DESC",
    [user.id],
  );
  const tasks = rows as Task[];
  const completed = tasks.filter((task) => Boolean(task.completed)).length;
  const pending = tasks.length - completed;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <nav className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-black tracking-tight"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white shadow-lg shadow-indigo-600/20">
              ✓
            </span>
            Taskly
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <form action={logout}>
              <button className="rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                Log out
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[240px_1fr] lg:px-10 lg:py-12">
        <aside className="hidden lg:block">
          <p className="px-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>
          <div className="mt-4 space-y-1">
            <div className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700">
              <span>▣</span> My tasks
            </div>
            <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500">
              <span>✦</span> Today{" "}
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                {pending}
              </span>
            </div>
          </div>
          <div className="mt-12 rounded-2xl bg-slate-950 p-5 text-white">
            <span className="text-2xl">✦</span>
            <p className="mt-4 text-sm font-bold">Keep the momentum</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Every completed task is a step forward.
            </p>
          </div>
        </aside>
        <section className="min-w-0">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                Your workspace
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">
                Good morning, {user.name.split(" ")[0]}.
              </h1>
              <p className="mt-2 text-slate-500">
                Here&apos;s to making today count.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-400">{today}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              label="All tasks"
              value={tasks.length}
              accent="text-slate-950"
            />
            <Stat label="In progress" value={pending} accent="text-amber-600" />
            <Stat
              label="Completed"
              value={`${progress}%`}
              accent="text-emerald-600"
            />
          </div>
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black">My task list</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {tasks.length === 0
                    ? "Start with one small thing."
                    : `${completed} completed · ${pending} remaining`}
                </p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                {progress}% done
              </span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <form
              action={createTask}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <input
                name="title"
                required
                maxLength={255}
                placeholder="Add a new task..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
              <button className="rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700">
                + Add task
              </button>
            </form>
            <section className="mt-6 space-y-3">
              {tasks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl text-indigo-600">
                    ✦
                  </div>
                  <h3 className="mt-4 font-black">Your list is ready</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Add your first task above and start making progress.
                  </p>
                </div>
              ) : (
                tasks.map((task, index) => {
                  const isCompleted = Boolean(task.completed);
                  const isNewGroup =
                    index === 0 ||
                    formatDate(tasks[index - 1].created_at) !==
                      formatDate(task.created_at);
                  return (
                    <div key={task.id} className="space-y-3">
                      {isNewGroup && (
                        <div className="flex items-center gap-3 pt-4 first:pt-0">
                          <span className="h-px flex-1 bg-slate-200" />
                          <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                            {formatDate(task.created_at)}
                          </h3>
                          <span className="h-px flex-1 bg-slate-200" />
                        </div>
                      )}
                      <div className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-indigo-200 hover:shadow-md sm:gap-4 sm:p-4">
                        <form action={toggleTask}>
                          <input type="hidden" name="taskId" value={task.id} />
                          <button
                            aria-label={
                              isCompleted ? "Mark incomplete" : "Mark complete"
                            }
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 text-sm transition ${isCompleted ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent hover:border-indigo-500"}`}
                          >
                            ✓
                          </button>
                        </form>
                        <form
                          action={updateTask}
                          className="flex min-w-0 flex-1 items-start gap-2"
                        >
                          <input type="hidden" name="taskId" value={task.id} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <input
                                name="title"
                                defaultValue={task.title}
                                className={`min-w-0 flex-1 bg-[#d3d3d375] p-[5px] rounded-[10px] text-sm font-semibold outline-none ${isCompleted ? "text-slate-400 line-through" : "text-slate-700"}`}
                              />
                              <button className="rounded-lg px-2 py-1 text-xs font-bold text-indigo-600 opacity-0 transition hover:bg-indigo-50 group-hover:opacity-100 focus:opacity-100">
                                Save
                              </button>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">
                              Created at {formatTime(task.created_at)}
                              {isCompleted && (
                                <>
                                  {" "}
                                  <span className="mx-1">·</span> Completed at{" "}
                                  {formatTime(task.updated_at)}
                                </>
                              )}
                            </p>
                          </div>
                        </form>
                        <DeleteTaskButton taskId={task.id} title={task.title} />
                        <form action={deleteTask} className="hidden">
                          <input type="hidden" name="taskId" value={task.id} />
                          <button
                            aria-label="Delete task"
                            className="rounded-lg px-2 py-1 text-sm text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                          >
                            x
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-black ${accent}`}>{value}</p>
    </div>
  );
}
