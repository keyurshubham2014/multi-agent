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
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NaomiAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Aura", href: "/aura", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <NaomiAvatar size="sm" />
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              naomi
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-50 bg-black/50"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[var(--surface)] shadow-xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <NaomiAvatar size="md" />
                  <span className="text-xl font-semibold text-[var(--text-primary)]">
                    naomi
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-[var(--aurora-purple)]/10 text-[var(--aurora-purple)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Chat FAB (shown on non-chat screens) */}
      {pathname !== "/chat" && (
        <Link
          href="/chat"
          className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-[var(--aurora-purple)] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#9775f0] transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </Link>
      )}
    </>
  );
}
