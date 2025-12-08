"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          "md:ml-60", // Desktop: offset for sidebar
          "pt-14 md:pt-0", // Mobile: offset for header
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}

// Page container for consistent padding and max-width
interface PageContainerProps {
  children: ReactNode;
  maxWidth?: "chat" | "dashboard" | "full";
  className?: string;
}

export function PageContainer({
  children,
  maxWidth = "dashboard",
  className,
}: PageContainerProps) {
  const maxWidthClasses = {
    chat: "max-w-[680px]",
    dashboard: "max-w-[1024px]",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto px-4 md:px-6 py-6",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}
