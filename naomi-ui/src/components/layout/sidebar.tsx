"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  BookOpen,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NaomiAvatar } from "@/components/ui/avatar";

const navItems = [
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Aura", href: "/aura", icon: Sparkles },
];

const bottomNavItems = [
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-[var(--surface)] border-r border-[var(--border)] transition-all duration-300",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
        <NaomiAvatar size="md" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-xl font-semibold text-[var(--text-primary)] overflow-hidden whitespace-nowrap"
            >
              naomi
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-[var(--aurora-purple)]/10 text-[var(--aurora-purple)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]",
                collapsed && "justify-center"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive && "text-[var(--aurora-purple)]"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium overflow-hidden whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-8 bg-[var(--aurora-purple)] rounded-r-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 space-y-1 border-t border-[var(--border)]">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-[var(--aurora-purple)]/10 text-[var(--aurora-purple)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]",
                collapsed && "justify-center"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium overflow-hidden whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] transition-all duration-200",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
