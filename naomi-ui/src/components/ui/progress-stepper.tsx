"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressStepper({
  currentStep,
  totalSteps,
  className,
}: ProgressStepperProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar background */}
      <div className="relative h-1 w-full bg-[var(--border)] rounded-full overflow-hidden">
        {/* Animated progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 aurora-gradient rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={i}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCompleted || isCurrent
                    ? "var(--aurora-purple)"
                    : "var(--border)",
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "w-3 h-3 rounded-full flex items-center justify-center",
                  (isCompleted || isCurrent) && "shadow-sm"
                )}
              >
                {isCompleted && (
                  <Check className="w-2 h-2 text-white" />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Step counter text */}
      <div className="flex justify-center mt-3">
        <span className="text-sm text-[var(--text-muted)]">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}

// Simple progress bar variant
interface SimpleProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function SimpleProgress({
  value,
  max = 100,
  className,
  showLabel = false,
}: SimpleProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full bg-[var(--border)] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 aurora-gradient rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-[var(--text-muted)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}
