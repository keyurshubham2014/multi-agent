"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aurora-purple)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--aurora-purple)] text-white hover:bg-[#9775f0] shadow-md hover:shadow-lg",
        secondary:
          "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--background)] hover:border-[var(--aurora-purple)]",
        ghost:
          "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background)]",
        danger:
          "bg-[var(--emotion-stress)] text-white hover:bg-[#d45656] shadow-md",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-lg",
        md: "h-11 px-4 text-base rounded-lg",
        lg: "h-12 px-6 text-base rounded-xl",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    // Type-safe motion props
    const motionProps: HTMLMotionProps<"button"> = {
      whileTap: { scale: 0.97 },
      whileHover: { y: -1 },
      transition: { duration: 0.15 },
    };

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...motionProps}
        {...(props as HTMLMotionProps<"button">)}
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
