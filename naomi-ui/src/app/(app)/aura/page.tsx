"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Lightbulb } from "lucide-react";
import { PageContainer } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmotionTag } from "@/components/ui/emotion-tag";
import {
  WeeklyTrendChart,
  EmotionBreakdownChart,
} from "@/components/aura/emotion-chart";
import {
  mockAuraScores,
  mockWeeklyTrend,
  mockAuraInsights,
  getTodayAuraScore,
} from "@/mocks";
import { cn } from "@/lib/utils";
import type { AuraInsight } from "@/types";

export default function AuraPage() {
  const todayScore = getTodayAuraScore();
  const [selectedDay, setSelectedDay] = useState(0);
  const selectedScore = mockAuraScores[selectedDay];

  const getTrendIcon = () => {
    switch (mockWeeklyTrend.trend) {
      case "improving":
        return <TrendingUp className="w-5 h-5 text-[var(--emotion-calm)]" />;
      case "declining":
        return <TrendingDown className="w-5 h-5 text-[var(--emotion-stress)]" />;
      default:
        return <Minus className="w-5 h-5 text-[var(--text-muted)]" />;
    }
  };

  const getTrendLabel = () => {
    switch (mockWeeklyTrend.trend) {
      case "improving":
        return "Trending up";
      case "declining":
        return "Trending down";
      default:
        return "Stable";
    }
  };

  if (!todayScore) {
    return (
      <PageContainer maxWidth="dashboard">
        <EmptyState />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Aura
          </h1>
          <p className="text-[var(--text-secondary)] naomi-text">
            your emotional insights and patterns
          </p>
        </div>

        {/* Hero Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card variant="aura" padding="lg">
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* Score Circle */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full aurora-gradient flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[var(--surface)] flex items-center justify-center">
                        <span className="text-3xl font-bold text-[var(--text-primary)]">
                          {selectedScore.score.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Today's Aura
                      </h2>
                      <EmotionTag emotion={selectedScore.dominantEmotion} />
                    </div>
                    <p className="text-[var(--text-secondary)] naomi-text max-w-sm">
                      {selectedScore.insight}
                    </p>
                  </div>
                </div>

                {/* Weekly Average */}
                <div className="flex items-center gap-3 px-4 py-3 bg-[var(--background)] rounded-xl">
                  {getTrendIcon()}
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">
                      Weekly Average
                    </p>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">
                      {mockWeeklyTrend.averageScore.toFixed(1)}{" "}
                      <span className="text-sm font-normal text-[var(--text-muted)]">
                        • {getTrendLabel()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Weekly Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card padding="md">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <WeeklyTrendChart
                  data={mockWeeklyTrend.dates.map((date, i) => ({
                    date,
                    score: mockWeeklyTrend.scores[i],
                  }))}
                  height={200}
                />

                {/* Day Selector */}
                <div className="flex justify-between mt-4 px-2">
                  {mockAuraScores.slice(0, 7).reverse().map((score, index) => {
                    const dayIndex = 6 - index;
                    return (
                      <button
                        key={score.date}
                        onClick={() => setSelectedDay(dayIndex)}
                        className={cn(
                          "flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors",
                          selectedDay === dayIndex
                            ? "bg-[var(--aurora-purple)]/10"
                            : "hover:bg-[var(--background)]"
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs",
                            selectedDay === dayIndex
                              ? "text-[var(--aurora-purple)]"
                              : "text-[var(--text-muted)]"
                          )}
                        >
                          {mockWeeklyTrend.dates[index]}
                        </span>
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full",
                            `emotion-${score.dominantEmotion}`
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emotion Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card padding="md">
              <CardHeader>
                <CardTitle className="text-lg">Emotion Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <EmotionBreakdownChart
                  data={selectedScore.emotionBreakdown}
                  height={200}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {mockAuraInsights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
}

// Insight Card Component
function InsightCard({
  insight,
  index,
}: {
  insight: AuraInsight;
  index: number;
}) {
  const getInsightIcon = () => {
    switch (insight.type) {
      case "tip":
        return "💡";
      case "observation":
        return "🔍";
      case "encouragement":
        return "✨";
    }
  };

  const getInsightColor = () => {
    switch (insight.type) {
      case "tip":
        return "border-[var(--emotion-joy)]/30 bg-[var(--emotion-joy)]/5";
      case "observation":
        return "border-[var(--emotion-anxiety)]/30 bg-[var(--emotion-anxiety)]/5";
      case "encouragement":
        return "border-[var(--emotion-calm)]/30 bg-[var(--emotion-calm)]/5";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <Card
        hoverable
        padding="md"
        className={cn("border", getInsightColor())}
      >
        <CardContent className="space-y-2">
          <span className="text-2xl">{getInsightIcon()}</span>
          <h3 className="font-medium text-[var(--text-primary)] naomi-text">
            {insight.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] naomi-text">
            {insight.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Aura
        </h1>
        <p className="text-[var(--text-secondary)] naomi-text">
          your emotional insights and patterns
        </p>
      </div>

      <Card padding="lg" className="text-center">
        <CardContent className="py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 naomi-text">
            i need a few more days with you…
          </h3>
          <p className="text-[var(--text-secondary)] max-w-sm mx-auto naomi-text">
            chat with me for a few days and i'll start showing you patterns in
            your emotional journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
