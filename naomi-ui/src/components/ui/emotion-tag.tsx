"use client";

import { cn, getEmotionClass } from "@/lib/utils";
import type { Emotion } from "@/types";

interface EmotionTagProps {
  emotion: Emotion;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const emotionLabels: Record<Emotion, string> = {
  joy: "Joy",
  calm: "Calm",
  stress: "Stress",
  sadness: "Sadness",
  anxiety: "Anxiety",
};

export function EmotionTag({ emotion, size = "md", className }: EmotionTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full transition-transform hover:scale-105",
        sizeClasses[size],
        getEmotionClass(emotion),
        className
      )}
    >
      {emotionLabels[emotion]}
    </span>
  );
}

// Emotion breakdown for displaying multiple emotions
interface EmotionBreakdownTagsProps {
  emotions: Partial<Record<Emotion, number>>;
  showPercentages?: boolean;
  size?: "sm" | "md" | "lg";
}

export function EmotionBreakdownTags({
  emotions,
  showPercentages = false,
  size = "sm",
}: EmotionBreakdownTagsProps) {
  const sortedEmotions = Object.entries(emotions)
    .filter(([, value]) => value && value > 0)
    .sort(([, a], [, b]) => (b || 0) - (a || 0));

  return (
    <div className="flex flex-wrap gap-2">
      {sortedEmotions.map(([emotion, value]) => (
        <span
          key={emotion}
          className={cn(
            "inline-flex items-center gap-1 font-medium rounded-full",
            sizeClasses[size],
            getEmotionClass(emotion)
          )}
        >
          {emotionLabels[emotion as Emotion]}
          {showPercentages && (
            <span className="opacity-80">{value}%</span>
          )}
        </span>
      ))}
    </div>
  );
}
