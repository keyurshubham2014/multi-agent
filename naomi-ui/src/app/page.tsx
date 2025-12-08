"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, BookOpen, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NaomiAvatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const features = [
    {
      icon: MessageCircle,
      title: "Thoughtful Conversations",
      description:
        "Chat with Naomi anytime. She listens without judgment and helps you process your feelings.",
    },
    {
      icon: BookOpen,
      title: "Emotional Journal",
      description:
        "Your conversations become a beautiful journal, capturing your emotional journey over time.",
    },
    {
      icon: Sparkles,
      title: "Aura Insights",
      description:
        "Discover patterns in your emotions and receive personalized insights to support your wellbeing.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NaomiAvatar size="sm" />
            <span className="text-xl font-semibold text-[var(--text-primary)]">
              naomi
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-8">
              <NaomiAvatar size="xl" className="w-24 h-24" />
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold text-[var(--text-primary)] mb-6 leading-tight">
              your emotional companion,{" "}
              <span className="aurora-gradient bg-clip-text text-transparent">
                always here
              </span>
            </h1>

            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto naomi-text">
              naomi is a gentle AI friend who helps you understand your emotions,
              track your mood, and grow through meaningful conversations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="min-w-[200px]">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="min-w-[200px]">
                  I Have an Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-4">
              How Naomi Helps
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto naomi-text">
              three simple ways naomi supports your emotional wellbeing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hoverable padding="lg" className="h-full text-center">
                  <CardContent className="space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-2xl aurora-gradient flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] naomi-text">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-[var(--emotion-joy)] fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl text-[var(--text-primary)] mb-6 italic">
              &quot;Naomi has become part of my daily routine. It&apos;s like having a
              thoughtful friend who&apos;s always there when I need to process my
              feelings.&quot;
            </blockquote>
            <p className="text-[var(--text-muted)]">— Sarah, using Naomi for 3 months</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="aura" padding="lg" className="text-center">
              <CardContent className="py-8 space-y-6">
                <Heart className="w-12 h-12 mx-auto text-[var(--aurora-pink)]" />
                <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
                  Ready to start your journey?
                </h2>
                <p className="text-[var(--text-secondary)] max-w-md mx-auto naomi-text">
                  join thousands of people who are building a better relationship
                  with their emotions, one conversation at a time.
                </p>
                <Link href="/signup">
                  <Button size="lg" className="min-w-[200px]">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <NaomiAvatar size="sm" />
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                naomi
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
              <Link href="/privacy" className="hover:text-[var(--text-primary)]">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[var(--text-primary)]">
                Terms
              </Link>
              <Link href="/support" className="hover:text-[var(--text-primary)]">
                Support
              </Link>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              © 2024 Naomi. Made with 💜
            </p>
          </div>
        </div>
      </footer>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 right-0 h-64 aurora-gradient opacity-5 blur-3xl pointer-events-none" />
    </div>
  );
}

// Star component for ratings
function Star({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
