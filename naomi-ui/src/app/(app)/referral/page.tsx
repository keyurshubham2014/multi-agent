"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Gift, Users, Star, Share2 } from "lucide-react";
import { PageContainer } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimpleProgress } from "@/components/ui/progress-stepper";
import { cn } from "@/lib/utils";

// Mock referral data
const referralData = {
  code: "NAOMI-FRIEND-2024",
  totalReferrals: 3,
  successfulReferrals: 2,
  nextRewardAt: 5,
  rewards: [
    { tier: 1, referrals: 1, reward: "1 Week Premium", unlocked: true },
    { tier: 2, referrals: 3, reward: "1 Month Premium", unlocked: false },
    { tier: 3, referrals: 5, reward: "3 Months Premium", unlocked: false },
    { tier: 4, referrals: 10, reward: "Lifetime Access", unlocked: false },
  ],
};

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(referralData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Join me on Naomi",
      text: "I've been using Naomi for emotional wellness and it's been amazing. Join me using my referral code!",
      url: `https://naomi.app/join?ref=${referralData.code}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyCode();
    }
  };

  const progress =
    (referralData.successfulReferrals / referralData.nextRewardAt) * 100;

  return (
    <PageContainer maxWidth="dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Referrals
          </h1>
          <p className="text-[var(--text-secondary)] naomi-text">
            share the love and earn rewards
          </p>
        </div>

        {/* Referral Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="aura" padding="lg">
            <CardContent className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full aurora-gradient flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  Your Referral Code
                </h2>
                <p className="text-[var(--text-secondary)] naomi-text">
                  share this with friends and earn premium features
                </p>
              </div>

              {/* Code Display */}
              <div className="flex items-center justify-center gap-3">
                <code className="px-6 py-3 bg-[var(--background)] rounded-xl text-lg font-mono font-semibold text-[var(--text-primary)] tracking-wider">
                  {referralData.code}
                </code>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleCopyCode}
                  className={cn(
                    copied && "bg-[var(--emotion-calm)] border-[var(--emotion-calm)]"
                  )}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <Button size="lg" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share with Friends
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card padding="md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">
                    {referralData.successfulReferrals}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    successful referrals
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--text-muted)]">
                    Next reward at
                  </p>
                  <p className="text-lg font-semibold text-[var(--aurora-purple)]">
                    {referralData.nextRewardAt} referrals
                  </p>
                </div>
              </div>

              <SimpleProgress value={progress} showLabel />

              <p className="text-sm text-[var(--text-secondary)] text-center naomi-text">
                {referralData.nextRewardAt - referralData.successfulReferrals}{" "}
                more referrals until your next reward!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rewards Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card padding="md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Reward Tiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {referralData.rewards.map((tier, index) => (
                  <motion.div
                    key={tier.tier}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all",
                      tier.unlocked
                        ? "bg-[var(--emotion-calm)]/10 border-[var(--emotion-calm)]/30"
                        : referralData.successfulReferrals >= tier.referrals - 1
                        ? "bg-[var(--aurora-purple)]/5 border-[var(--aurora-purple)]/30"
                        : "bg-[var(--background)] border-[var(--border)]"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold",
                          tier.unlocked
                            ? "bg-[var(--emotion-calm)] text-white"
                            : "bg-[var(--border)] text-[var(--text-muted)]"
                        )}
                      >
                        {tier.unlocked ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          tier.tier
                        )}
                      </div>
                      <div>
                        <p
                          className={cn(
                            "font-medium",
                            tier.unlocked
                              ? "text-[var(--emotion-calm)]"
                              : "text-[var(--text-primary)]"
                          )}
                        >
                          {tier.reward}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {tier.referrals} referral{tier.referrals > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {tier.unlocked && (
                      <span className="px-3 py-1 text-xs font-medium bg-[var(--emotion-calm)] text-white rounded-full">
                        Unlocked!
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
}
