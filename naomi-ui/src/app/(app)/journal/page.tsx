"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { PageContainer } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { EmotionTag } from "@/components/ui/emotion-tag";
import { Button } from "@/components/ui/button";
import { mockJournalEntries } from "@/mocks";
import { cn, formatDate } from "@/lib/utils";
import type { JournalEntry } from "@/types";

type ViewMode = "daily" | "weekly" | "monthly";

export default function JournalPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(
    mockJournalEntries[0]
  );

  const tabs: { id: ViewMode; label: string; badge?: string }[] = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly", badge: "Coming Soon" },
  ];

  return (
    <PageContainer maxWidth="dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
              Journal
            </h1>
            <p className="text-[var(--text-secondary)] naomi-text">
              your emotional diary, captured by our conversations
            </p>
          </div>
          <Button variant="secondary" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Jump to Date
          </Button>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 border-b border-[var(--border)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => tab.id !== "monthly" && setViewMode(tab.id)}
              className={cn(
                "relative px-4 py-3 text-sm font-medium transition-colors",
                viewMode === tab.id
                  ? "text-[var(--aurora-purple)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                tab.id === "monthly" && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {tab.badge && (
                  <span className="px-1.5 py-0.5 text-xs bg-[var(--border)] rounded-full">
                    {tab.badge}
                  </span>
                )}
              </span>
              {viewMode === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--aurora-purple)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {viewMode === "daily" && (
          <DailyView
            entries={mockJournalEntries}
            selectedEntry={selectedEntry}
            onSelectEntry={setSelectedEntry}
          />
        )}

        {viewMode === "weekly" && <WeeklyView entries={mockJournalEntries} />}
      </div>
    </PageContainer>
  );
}

// Daily View Component
function DailyView({
  entries,
  selectedEntry,
  onSelectEntry,
}: {
  entries: JournalEntry[];
  selectedEntry: JournalEntry | null;
  onSelectEntry: (entry: JournalEntry) => void;
}) {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Entry List */}
      <div className="md:col-span-1 space-y-3">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              hoverable
              padding="sm"
              className={cn(
                "cursor-pointer",
                selectedEntry?.id === entry.id &&
                  "ring-2 ring-[var(--aurora-purple)]"
              )}
              onClick={() => onSelectEntry(entry)}
            >
              <CardContent className="flex items-center gap-3">
                <span className="text-2xl">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text-primary)] truncate naomi-text">
                    {entry.title}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {formatDate(entry.date)}
                  </p>
                </div>
                <EmotionTag emotion={entry.dominantEmotion} size="sm" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Entry Detail */}
      <div className="md:col-span-2">
        <AnimatePresence mode="wait">
          {selectedEntry && (
            <motion.div
              key={selectedEntry.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card padding="lg">
                <CardContent className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{selectedEntry.emoji}</span>
                      <div>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] naomi-text">
                          {selectedEntry.title}
                        </h2>
                        <p className="text-sm text-[var(--text-muted)]">
                          {formatDate(selectedEntry.date)}
                        </p>
                      </div>
                    </div>
                    <EmotionTag emotion={selectedEntry.dominantEmotion} />
                  </div>

                  <p className="text-[var(--text-secondary)] leading-relaxed naomi-text">
                    {selectedEntry.summary}
                  </p>

                  {/* Topics */}
                  <div>
                    <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2">
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 text-sm bg-[var(--background)] text-[var(--text-secondary)] rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Emotion Breakdown */}
                  <div>
                    <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      Emotion Breakdown
                    </h3>
                    <div className="space-y-2">
                      {(
                        Object.entries(selectedEntry.emotionBreakdown) as [
                          string,
                          number
                        ][]
                      )
                        .sort(([, a], [, b]) => b - a)
                        .map(([emotion, value]) => (
                          <div key={emotion} className="flex items-center gap-3">
                            <span className="w-16 text-sm capitalize text-[var(--text-secondary)]">
                              {emotion}
                            </span>
                            <div className="flex-1 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className={cn(
                                  "h-full rounded-full",
                                  `emotion-${emotion}`
                                )}
                              />
                            </div>
                            <span className="w-10 text-sm text-[var(--text-muted)] text-right">
                              {value}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Weekly View Component
function WeeklyView({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="grid gap-4">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card hoverable padding="md">
            <CardContent className="flex items-center gap-4">
              <span className="text-3xl">{entry.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-[var(--text-primary)] naomi-text">
                    {entry.title}
                  </h3>
                  <EmotionTag emotion={entry.dominantEmotion} size="sm" />
                </div>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 naomi-text">
                  {entry.summary}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <Card padding="lg" className="text-center">
      <CardContent className="py-12">
        <div className="text-6xl mb-4">👀</div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 naomi-text">
          no aura yet… you ghosted me today
        </h3>
        <p className="text-[var(--text-secondary)] max-w-sm mx-auto naomi-text">
          start a conversation with me and i'll capture your emotional journey
          here.
        </p>
        <Button className="mt-6">Start Chatting</Button>
      </CardContent>
    </Card>
  );
}
