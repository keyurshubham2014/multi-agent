"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  // Base styles
  "w-full bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--aurora-purple)] focus:ring-offset-1 focus:border-[var(--aurora-purple)] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      inputSize: {
        sm: "h-10 px-3 text-sm rounded-lg",
        md: "h-12 px-4 text-base rounded-xl",
        lg: "h-14 px-5 text-lg rounded-xl",
      },
      hasError: {
        true: "border-[var(--emotion-stress)] focus:border-[var(--emotion-stress)] focus:ring-[var(--emotion-stress)]",
        false: "",
      },
    },
    defaultVariants: {
      inputSize: "md",
      hasError: false,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, hasError, label, error, hint, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--text-primary)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            inputVariants({ inputSize, hasError: hasError || !!error, className })
          )}
          {...props}
        />
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

Input.displayName = "Input";

export { Input, inputVariants };
