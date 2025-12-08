"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  index?: number;
}

export function MessageBubble({ message, index = 0 }: MessageBubbleProps) {
  const isNaomi = message.sender === "naomi";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={cn(
        "flex w-full",
        isNaomi ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] px-4 py-3 rounded-2xl",
          isNaomi
            ? "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] rounded-bl-md"
            : "bg-[var(--aurora-purple)] text-white rounded-br-md",
          isNaomi && "naomi-text"
        )}
        style={{
          fontSize: "15px",
          lineHeight: 1.4,
        }}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

// Typing indicator component
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start"
    >
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="typing-dot h-2 w-2 rounded-full bg-[var(--text-muted)]" />
          <span className="typing-dot h-2 w-2 rounded-full bg-[var(--text-muted)]" />
          <span className="typing-dot h-2 w-2 rounded-full bg-[var(--text-muted)]" />
        </div>
      </div>
    </motion.div>
  );
}

// Date separator for chat
export function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex items-center justify-center py-4">
      <span className="px-3 py-1 text-xs text-[var(--text-muted)] bg-[var(--background)] rounded-full">
        {date}
      </span>
    </div>
  );
}
