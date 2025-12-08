"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  // Base styles
  "rounded-2xl transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface)] border border-[var(--border)] shadow-sm",
        glass:
          "bg-white/80 backdrop-blur-[12px] border border-white/20 shadow-md",
        elevated:
          "bg-[var(--surface-elevated)] shadow-lg hover:shadow-xl",
        aura:
          "bg-[var(--surface)] border border-[var(--border)] animate-breathing",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart">,
    VariantProps<typeof cardVariants> {
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable = false, children, ...props }, ref) => {
    const motionProps: HTMLMotionProps<"div"> = hoverable
      ? {
          whileHover: { y: -2, boxShadow: "var(--shadow-lg)" },
          transition: { duration: 0.15 },
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...motionProps}
        {...(props as HTMLMotionProps<"div">)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

// Card Title Component
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold text-[var(--text-primary)] leading-tight",
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

// Card Description Component
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--text-secondary)]", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

// Card Content Component
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

// Card Footer Component
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
