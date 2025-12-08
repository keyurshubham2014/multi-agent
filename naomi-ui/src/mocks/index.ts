// Mock Data Exports
import messagesData from "./messages.json";
import journalData from "./journal.json";
import auraData from "./aura.json";
import onboardingData from "./onboarding.json";

import type {
  Message,
  JournalEntry,
  AuraScore,
  WeeklyTrend,
  AuraInsight,
  OnboardingStep,
  Emotion,
} from "@/types";

// Chat Messages
export const mockMessages: Message[] = messagesData.messages as Message[];

// Journal Entries
export const mockJournalEntries: JournalEntry[] = journalData.entries.map(
  (entry) => ({
    ...entry,
    dominantEmotion: entry.dominantEmotion as Emotion,
    emotionBreakdown: entry.emotionBreakdown,
  })
) as JournalEntry[];

// Aura Scores
export const mockAuraScores: AuraScore[] = auraData.dailyScores.map(
  (score) => ({
    ...score,
    dominantEmotion: score.dominantEmotion as Emotion,
    emotionBreakdown: score.emotionBreakdown,
  })
) as AuraScore[];

// Weekly Trend
export const mockWeeklyTrend: WeeklyTrend = {
  ...auraData.weeklyTrend,
  trend: auraData.weeklyTrend.trend as "improving" | "stable" | "declining",
};

// Aura Insights
export const mockAuraInsights: AuraInsight[] = auraData.insights.map(
  (insight) => ({
    ...insight,
    type: insight.type as "tip" | "observation" | "encouragement",
  })
) as AuraInsight[];

// Onboarding Steps
export const mockOnboardingSteps: OnboardingStep[] = onboardingData.steps.map(
  (step) => ({
    ...step,
    type: step.type as "welcome" | "input" | "select" | "multi-select" | "complete",
  })
) as OnboardingStep[];

// Helper function to get today's aura score
export function getTodayAuraScore(): AuraScore | undefined {
  return mockAuraScores[0];
}

// Helper function to get latest journal entry
export function getLatestJournalEntry(): JournalEntry | undefined {
  return mockJournalEntries[0];
}

// Helper function to simulate Naomi's typing delay
export async function simulateTypingDelay(messageLength: number): Promise<void> {
  // Base delay + variable delay based on message length
  const baseDelay = 500;
  const variableDelay = Math.min(messageLength * 10, 2000);
  await new Promise((resolve) => setTimeout(resolve, baseDelay + variableDelay));
}
