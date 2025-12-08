// ========================================
// NAOMI MVP Type Definitions
// ========================================

// Emotion types - matches the strict emotion color palette
export type Emotion = "joy" | "calm" | "stress" | "sadness" | "anxiety";

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notificationsEnabled: boolean;
  reminderTime?: string;
  timezone?: string;
}

// Chat/Message types
export interface Message {
  id: string;
  content: string;
  sender: "user" | "naomi";
  timestamp: string;
  emotions?: Emotion[];
}

export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// Journal types
export interface JournalEntry {
  id: string;
  date: string;
  emoji: string;
  title: string;
  dominantEmotion: Emotion;
  summary: string;
  topics: string[];
  emotionBreakdown: EmotionBreakdown;
}

export interface EmotionBreakdown {
  joy: number;
  calm: number;
  stress: number;
  sadness: number;
  anxiety: number;
}

// Aura/Analytics types
export interface AuraScore {
  date: string;
  score: number;
  dominantEmotion: Emotion;
  insight: string;
  emotionBreakdown: EmotionBreakdown;
}

export interface WeeklyTrend {
  dates: string[];
  scores: number[];
  averageScore: number;
  trend: "improving" | "stable" | "declining";
}

export interface AuraInsight {
  id: string;
  title: string;
  description: string;
  type: "tip" | "observation" | "encouragement";
}

// Onboarding types
export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  type: "welcome" | "input" | "select" | "multi-select" | "complete";
  options?: string[];
  placeholder?: string;
}

export interface OnboardingData {
  name: string;
  goals: string[];
  interests: string[];
  reminderTime?: string;
  currentMood?: Emotion;
}

// Settings types
export interface Settings {
  notifications: boolean;
  emailUpdates: boolean;
  dataExport: boolean;
  deleteAccount: boolean;
}

// Referral types
export interface ReferralInfo {
  code: string;
  totalReferrals: number;
  successfulReferrals: number;
  rewardTier: number;
  rewards: string[];
}

// Navigation types
export type NavItem = {
  name: string;
  href: string;
  icon: string;
  active?: boolean;
};
