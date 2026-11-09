"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

type Task = { id: string; text: string; done: boolean };
// week: son 7 gün, sonuncu element — bu gün. base: həftədən əvvəlki ardıcıl günlər.
type Habit = { id: string; name: string; week: boolean[]; base: number };
type State = { tasks: Task[]; habits: Habit[] };

const STORAGE_KEY = "fokusapp-demo-v1";
const DAY_NAMES = ["B", "B.e", "Ç.a", "Ç", "C.a", "C", "Ş"]; // getDay(): 0 = bazar
// Intl-in "az" dəstəyi hər brauzerdə yoxdur — adlar əl ilə
const WEEKDAYS = ["bazar", "bazar ertəsi", "çərşənbə axşamı", "çərşənbə", "cümə axşamı", "cümə", "şənbə"];
const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"];

const START: State = {
  tasks: [
    { id: "t1", text: "Birinci dərsin tapşırığını yaz", done: false },
    { id: "t2", text: "Bazardan meyvə al", done: false },
    { id: "t3", text: "Hesabatı göndər", done: true },
  ],
  habits: [
    { id: "h1", name: "Səhər idmanı", week: [true, true, true, true, true, true, false], base: 8 },
    { id: "h2", name: "20 səhifə oxu", week: [true, false, true, true, true, true, false], base: 0 },
    { id: "h3", name: "2 litr su", week: [false, false, true, true, true, true, false], base: 0 },
  ],
};

function streak(h: Habit) {
  let i = h.week[6] ? 6 : 5; // bu gün hələ işarələnməyibsə, seriya dünəndən sayılır
  let n = 0;
  while (i >= 0 && h.week[i]) { n++; i--; }
  return i < 0 ? n + h.base : n;
}

// Demo vəziyyəti localStorage-da saxlanılır; brauzer icazə verməsə yaddaşda qalır.
const listeners = new Set<() => void>();
let memory: string | null = null;
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
function readSaved() {
  try { return localStorage.getItem(STORAGE_KEY) ?? memory; } catch { return memory; }
}
function save(next: State) {
  memory = JSON.stringify(next);
  try { localStorage.setItem(STORAGE_KEY, memory); } catch {}
  listeners.forEach((l) => l());
}
const noop = () => () => {};
// Tarix yalnız brauzerdə hesablanır (server render-i sabit qalır)
function todayInfo() {
  const now = new Date();
  const heading = `${now.getDate()} ${MONTHS[now.getMonth()]}, ${WEEKDAYS[now.getDay()]}`;
  const days = Array.from({ length: 7 }, (_, k) => DAY_NAMES[(now.getDay() - 6 + k + 7) % 7]);
  return [heading, ...days].join("|");
}

export default function TodayDemo() {
  const raw = useSyncExternalStore(subscribe, readSaved, () => null);
  const state: State = useMemo(() => (raw ? JSON.parse(raw) : START), [raw]);
  const [heading, ...days] = useSyncExternalStore(noop, todayInfo, () => "|||||||").split("|");
  const [draft, setDraft] = useState("");
  const [bumped, setBumped] = useState<string | null>(null);
  const setState = (fn: (s: State) => State) => save(fn(state));

  const doneCount = state.tasks.filter((t) => t.done).length;

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setState((s) => ({ ...s, tasks: [{ id: crypto.randomUUID(), text, done: false }, ...s.tasks] }));
    setDraft("");
  }
  const toggleTask = (id: string) =>
    setState((s) => ({ ...s, tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) }));
  const removeTask = (id: string) => setState((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== id) }));
  function toggleToday(id: string) {
    setState((s) => ({
      ...s,
      habits: s.habits.map((h) => (h.id === id ? { ...h, week: [...h.week.slice(0, 6), !h.week[6]] } : h)),
    }));
    setBumped(id);
  }

  return (
    <section
      id="demo"
      aria-label="FokusApp demosu"
      className="scroll-mt-28 rounded-[28px] border border-line bg-white p-6 shadow-[0_30px_70px_-40px_rgba(27,16,36,0.45)] sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-2xl font-bold">Bu gün</h2>
        <p className="text-sm text-muted">{heading}</p>
      </div>

      <div className="mt-5" aria-live="polite">
        <div className="flex justify-between text-sm text-muted">
          <span>{state.tasks.length ? `${state.tasks.length} tapşırıqdan ${doneCount}-i bitib` : "Siyahı boşdur"}</span>
          <span>{state.tasks.length ? Math.round((doneCount / state.tasks.length) * 100) : 0}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-2">
          <div
            className="bg-progress h-full rounded-full transition-[width] duration-500"
            style={{ width: `${state.tasks.length ? (doneCount / state.tasks.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <form onSubmit={addTask} className="mt-6 flex gap-2">
        <label htmlFor="new-task" className="sr-only">Yeni tapşırıq</label>
        <input
          id="new-task"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Məsələn: təqdimatı hazırla"
          className="min-w-0 flex-1 rounded-[14px] border border-line bg-paper px-4 py-3 text-base outline-none placeholder:text-faint focus:border-grape"
        />
        <button type="submit" className="rounded-[14px] bg-ink px-5 py-3 font-semibold text-white hover:bg-[#2c1b3b]">
          Əlavə et
        </button>
      </form>

      <ul className="mt-4 space-y-2">
        {state.tasks.length === 0 && (
          <li className="rounded-[14px] border border-dashed border-line px-4 py-5 text-center text-muted">
            Hələ tapşırıq yoxdur. Yuxarıda birini yaz.
          </li>
        )}
        {state.tasks.map((t) => (
          <li key={t.id} className="group flex items-center gap-3 rounded-[14px] border border-line px-4 py-3">
            <button
              role="checkbox"
              aria-checked={t.done}
              aria-label={`${t.text} — bitdi kimi işarələ`}
              onClick={() => toggleTask(t.id)}
              className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${t.done ? "border-mint bg-mint" : "border-faint/60 hover:border-mint"}`}
            >
              {t.done && (
                <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span className={`flex-1 ${t.done ? "text-faint line-through" : ""}`}>{t.text}</span>
            <button
              onClick={() => removeTask(t.id)}
              aria-label={`${t.text} — sil`}
              className="rounded-md px-1.5 text-faint opacity-60 hover:text-coral hover:opacity-100 group-hover:opacity-100"
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <h3 className="mt-8 font-display text-lg font-bold">Vərdişlər</h3>
      <p className="mt-1 text-sm text-muted">Bu günün dairəsinə toxun — seriya böyüsün.</p>
      <ul className="mt-4 space-y-3">
        {state.habits.map((h) => {
          const s = streak(h);
          return (
            <li key={h.id} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="w-28 shrink-0 font-semibold sm:w-32">{h.name}</span>
              <div className="flex gap-1">
                {h.week.map((on, k) => {
                  const today = k === 6;
                  const label = days[k];
                  if (!today)
                    return (
                      <span key={k} title={label} className={`size-6 rounded-md ${on ? "bg-mint/85" : "bg-paper-2"}`} aria-hidden />
                    );
                  return (
                    <button
                      key={k}
                      role="checkbox"
                      aria-checked={on}
                      aria-label={`${h.name} — bu gün etdim`}
                      onClick={() => toggleToday(h.id)}
                      className={`size-6 rounded-md border-2 ${on ? "border-mint bg-mint" : "border-coral bg-white hover:bg-coral/10"}`}
                    />
                  );
                })}
              </div>
              <span
                key={bumped === h.id ? `${h.id}-${s}` : h.id}
                className={`ml-auto rounded-full px-3 py-1 text-sm font-bold ${s ? "bg-[#fff0ea] text-coral" : "bg-paper-2 text-faint"} ${bumped === h.id ? "animate-pop" : ""}`}
              >
                {s} gün
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-7 border-t border-line pt-4 text-xs text-faint">
        Bu demo məlumatı yalnız sənin brauzerində saxlayır.
      </p>
    </section>
  );
}
