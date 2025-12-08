"use client";

import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const initials = fallback || alt?.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-[var(--aurora-purple)] to-[var(--aurora-teal)]",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium text-white">{initials}</span>
      )}
    </div>
  );
}

// Naomi's avatar with special styling
export function NaomiAvatar({ size = "md", className }: Omit<AvatarProps, "src" | "alt" | "fallback">) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden aurora-gradient",
        sizeClasses[size],
        className
      )}
    >
      <span className="font-semibold text-white">N</span>
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full animate-breathing opacity-50" />
    </div>
  );
}
