import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format time for chat timestamps
 */
export function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Naomi-style text transformation (lowercase except proper nouns)
 */
export function naomiText(text: string): string {
  return text.toLowerCase();
}

/**
 * Get emotion color CSS class
 */
export function getEmotionClass(emotion: string): string {
  const emotionMap: Record<string, string> = {
    joy: "emotion-joy",
    calm: "emotion-calm",
    stress: "emotion-stress",
    sadness: "emotion-sadness",
    anxiety: "emotion-anxiety",
  };
  return emotionMap[emotion.toLowerCase()] || "emotion-calm";
}

/**
 * Get emotion hex color
 */
export function getEmotionColor(emotion: string): string {
  const colorMap: Record<string, string> = {
    joy: "#F5D76E",
    calm: "#7DCEA0",
    stress: "#E57373",
    sadness: "#7986CB",
    anxiety: "#81D4FA",
  };
  return colorMap[emotion.toLowerCase()] || colorMap.calm;
}

/**
 * Delay utility for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
