"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[var(--text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full h-12 px-4 pr-10 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-xl transition-all duration-200 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--aurora-purple)] focus:ring-offset-1 focus:border-[var(--aurora-purple)] disabled:cursor-not-allowed disabled:opacity-50",
              error &&
                "border-[var(--emotion-stress)] focus:border-[var(--emotion-stress)] focus:ring-[var(--emotion-stress)]",
              !props.value && "text-[var(--text-muted)]",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)] pointer-events-none" />
        </div>
        {error && (
          <p className="text-sm text-[var(--emotion-stress)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-sm text-[var(--text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
