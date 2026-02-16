import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes safely
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

/**
 * StatsCard component for displaying key metrics with a professional oil & gas industrial aesthetic.
 * Features responsive layout, hover lift animations, and clear trend indicators.
 */
export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 12px 24px -10px oklch(0.45 0.15 240 / 0.15)" 
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative group overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all"
    >
      {/* Top Section: Icon & Trend */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
          <Icon className="h-5 w-5" />
        </div>

        {trend && (
          <div
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold",
              trend.isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                : "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive-foreground"
            )}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            <span>
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          </div>
        )}
      </div>

      {/* Middle Section: Value & Title */}
      <div className="mt-5 space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-extrabold tracking-tight text-foreground font-sans">
            {value}
          </h3>
        </div>
      </div>

      {/* Bottom Section: Description */}
      {description && (
        <div className="mt-3">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-primary/40" />
            {description}
          </p>
        </div>
      )}

      {/* Background Subtle Industrial Decoration */}
      <div className="absolute -bottom-6 -right-6 h-28 w-28 opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.06] pointer-events-none">
        <Icon className="h-full w-full" />
      </div>

      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}
