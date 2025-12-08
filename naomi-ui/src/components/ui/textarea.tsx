"use client";

import { forwardRef, type TextareaHTMLAttributes, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  autoResize?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, autoResize = false, ...props }, ref) => {
    const inputId = id || props.name;
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        const adjustHeight = () => {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textarea.addEventListener("input", adjustHeight);
        adjustHeight();
        return () => textarea.removeEventListener("input", adjustHeight);
      }
    }, [autoResize, textareaRef]);

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
        <textarea
          ref={textareaRef}
          id={inputId}
          className={cn(
            "w-full min-h-[100px] px-4 py-3 bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border)] rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--aurora-purple)] focus:ring-offset-1 focus:border-[var(--aurora-purple)] disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            error &&
              "border-[var(--emotion-stress)] focus:border-[var(--emotion-stress)] focus:ring-[var(--emotion-stress)]",
            autoResize && "overflow-hidden",
            className
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

Textarea.displayName = "Textarea";

export { Textarea };
