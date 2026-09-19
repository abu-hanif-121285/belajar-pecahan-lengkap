import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export function Fraction({
  n,
  d,
  size = "md",
  className,
}: {
  n: number | string;
  d: number | string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-4xl",
  };
  return (
    <span
      className={cn("inline-flex flex-col items-center leading-none align-middle font-bold", sizes[size], className)}
      aria-label={`${n} per ${d}`}
    >
      <span className="px-1">{n}</span>
      <span className="w-full border-t-2 border-current" />
      <span className="px-1">{d}</span>
    </span>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "cheese" | "tomato" | "green" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

export function Button({ variant = "primary", size = "md", className, children, ...rest }: BtnProps) {
  const base =
    "btn-juicy no-select inline-flex items-center justify-center gap-2 font-extrabold rounded-2xl shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-b from-orange-400 to-orange-500 text-white shadow-orange-200 focus-visible:ring-orange-300 hover:brightness-105",
    secondary: "bg-gradient-to-b from-sky-400 to-blue-500 text-white shadow-blue-200 focus-visible:ring-sky-300 hover:brightness-105",
    cheese: "bg-gradient-to-b from-amber-300 to-yellow-400 text-amber-900 shadow-yellow-200 focus-visible:ring-yellow-300 hover:brightness-105",
    tomato: "bg-gradient-to-b from-red-400 to-red-500 text-white shadow-red-200 focus-visible:ring-red-300 hover:brightness-105",
    green: "bg-gradient-to-b from-emerald-400 to-green-500 text-white shadow-green-200 focus-visible:ring-green-300 hover:brightness-105",
    outline: "bg-white text-slate-700 border-2 border-slate-200 shadow-slate-100 focus-visible:ring-slate-300 hover:bg-slate-50",
    ghost: "bg-white/70 text-slate-700 hover:bg-white focus-visible:ring-slate-300 shadow-none",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3.5 text-lg",
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl bg-white shadow-lg shadow-orange-100/50 border border-orange-100/60", className)}>
      {children}
    </div>
  );
}

export function ProgressBar({ value, max = 100, className }: { value: number; max?: number; className?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("h-4 w-full rounded-full bg-orange-100 overflow-hidden", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Star({ filled = true, className }: { filled?: boolean; className?: string }) {
  return (
    <span className={cn(filled ? "text-amber-400" : "text-slate-300", className)}>★</span>
  );
}
