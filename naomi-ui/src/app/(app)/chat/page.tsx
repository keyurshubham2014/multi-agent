"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { NaomiAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageBubble, TypingIndicator, DateSeparator } from "@/components/chat/message-bubble";
import { mockMessages, simulateTypingDelay } from "@/mocks";
import type { Message } from "@/types";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Simulate Naomi typing
    setIsTyping(true);
    await simulateTypingDelay(userMessage.content.length);

    // Generate mock response
    const naomiResponses = [
      "i hear you. that sounds like a lot to process. what stands out most to you right now?",
      "thank you for sharing that with me. how does it feel to put that into words?",
      "that's really insightful. what do you think is driving that feeling?",
      "i appreciate you opening up. is there anything specific you'd like to explore further?",
      "it sounds like you're being really thoughtful about this. what would feel supportive right now?",
    ];

    const naomiMessage: Message = {
      id: `msg-${Date.now() + 1}`,
      content: naomiResponses[Math.floor(Math.random() * naomiResponses.length)],
      sender: "naomi",
      timestamp: new Date().toISOString(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, naomiMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by date
  const groupMessagesByDate = (msgs: Message[]) => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = "";

    msgs.forEach((msg) => {
      const msgDate = new Date(msg.timestamp).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: msgDate, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <NaomiAvatar size="md" />
        <div>
          <h1 className="font-semibold text-[var(--text-primary)]">naomi</h1>
          <p className="text-xs text-[var(--emotion-calm)]">online</p>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-[680px] mx-auto space-y-4">
          {messageGroups.map((group, groupIndex) => (
            <div key={group.date}>
              <DateSeparator date={group.date} />
              <div className="space-y-3">
                {group.messages.map((message, msgIndex) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    index={groupIndex === messageGroups.length - 1 ? msgIndex : 0}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="max-w-[680px] mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="say something..."
                rows={1}
                className={cn(
                  "w-full px-4 py-3 bg-[var(--background)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border)] rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--aurora-purple)] focus:ring-offset-1 focus:border-[var(--aurora-purple)] resize-none overflow-hidden",
                  "min-h-[48px] max-h-[150px]"
                )}
              />
            </div>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className={cn(
                  "h-12 w-12 rounded-full",
                  !inputValue.trim() && "opacity-50"
                )}
              >
                <Send className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          <p className="text-xs text-[var(--text-muted)] text-center mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
