"use client";

import { useEffect, useState } from "react";

/** Digits with at most one decimal point. Commas and spaces are stripped. */
function parseAmount(text: string): number | null {
  const cleaned = text.replace(/[,\s₹]/g, "");
  if (cleaned === "") return null;
  if (!/^\d*\.?\d*$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/**
 * One labelled input. The number can be typed or dragged — people reach for
 * the slider to explore and the keyboard when they already know the figure,
 * and a calculator offering only one of those is annoying to use.
 *
 * Typing is held in local state so a half-finished number ("1", "1.") does
 * not fight the parent. Anything unparseable is simply not committed, and
 * leaving the box always restores a clean, in-range value — so the result
 * on screen can never come from a number the user cannot see.
 */
export default function Field({
  label,
  value,
  display,
  prefix,
  suffix,
  min,
  max,
  step,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  /** Shown when the box is not focused — e.g. "₹32,789" or "6 months". */
  display: string;
  /** Sits inside the box while editing, usually "₹". */
  prefix?: string;
  /** Sits after the box, e.g. "%" or "months". */
  suffix?: string;
  min: number;
  max: number;
  step: number;
  /** Shown under the field when the typed value was pulled into range. */
  hint?: string;
  onChange: (v: number) => void;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const [clamped, setClamped] = useState<null | "min" | "max">(null);

  // Keep the box in step when the slider moves it.
  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  function commit(text: string) {
    setDraft(text);
    const n = parseAmount(text);
    if (n === null) return;

    if (n > max) {
      setClamped("max");
      onChange(max);
      return;
    }
    // Below the minimum is normal while typing "5" on the way to "50000",
    // so accept it and let blur tidy up rather than fighting each keystroke.
    setClamped(null);
    onChange(n);
  }

  function finish() {
    setEditing(false);
    const n = parseAmount(draft);
    if (n === null) {
      setClamped(null);
      onChange(min);
      return;
    }
    if (n < min) {
      setClamped("min");
      onChange(min);
      return;
    }
    if (n > max) {
      setClamped("max");
      onChange(max);
      return;
    }
    setClamped(null);
    onChange(n);
  }

  return (
    <div className="border-t border-rule py-3 last:border-b">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.95rem]">
          {label}
        </label>

        <div className="flex items-baseline gap-1">
          {editing && prefix && <span className="num text-ink">{prefix}</span>}
          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={editing ? draft : display}
            onChange={(e) => commit(e.target.value)}
            onFocus={() => {
              setEditing(true);
              setDraft(String(value));
              setClamped(null);
            }}
            onBlur={finish}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
            aria-label={label}
            className="num w-[10ch] rounded-[4px] border-b border-transparent bg-transparent px-1 text-right font-semibold text-ink focus:border-ink focus:outline-none"
          />
          {editing && suffix && <span className="num text-ink">{suffix}</span>}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          setClamped(null);
          onChange(Number(e.target.value));
        }}
        aria-label={`${label} slider`}
        className="mt-2.5 h-1 w-full cursor-pointer appearance-none bg-rule accent-ink"
      />

      {clamped && (
        <p className="mt-1.5 text-[0.82rem] text-muted">
          {clamped === "max"
            ? `This calculator stops at ${display}.`
            : `The lowest this goes is ${display}.`}
          {hint ? ` ${hint}` : ""}
        </p>
      )}
    </div>
  );
}
