"use client";

import { type ReactNode } from "react";
import { NaomiAvatar } from "@/components/ui/avatar";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3">
          <NaomiAvatar size="lg" />
          <span className="text-2xl font-semibold text-[var(--text-primary)]">
            naomi
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Decorative Aurora Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 aurora-gradient opacity-10 blur-3xl pointer-events-none" />
    </div>
  );
}
