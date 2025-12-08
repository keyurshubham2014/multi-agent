"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { NaomiAvatar } from "@/components/ui/avatar";
import { mockOnboardingSteps } from "@/mocks";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string | string[]>>({
    name: "",
    goals: [],
    currentMood: "",
    interests: [],
    preferredTime: "",
    frequency: "",
  });

  const totalSteps = mockOnboardingSteps.length;
  const step = mockOnboardingSteps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      router.push("/chat");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value: string) => {
    setFormData({ ...formData, name: value });
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMultiSelectToggle = (value: string, field: string) => {
    const current = (formData[field] as string[]) || [];
    if (current.includes(value)) {
      setFormData({
        ...formData,
        [field]: current.filter((v) => v !== value),
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...current, value],
      });
    }
  };

  const isStepValid = () => {
    switch (step.type) {
      case "input":
        return (formData.name as string).trim().length > 0;
      case "select":
        if (currentStep === 4) return !!formData.currentMood;
        if (currentStep === 6) return !!formData.preferredTime;
        if (currentStep === 7) return !!formData.frequency;
        return true;
      case "multi-select":
        if (currentStep === 3) return (formData.goals as string[])?.length > 0;
        if (currentStep === 5) return (formData.interests as string[])?.length > 0;
        return true;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (step.type) {
      case "welcome":
      case "complete":
        return (
          <div className="flex flex-col items-center text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <NaomiAvatar size="xl" className="mb-6" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
              {step.title}
            </h2>
            <p className="text-[var(--text-secondary)] naomi-text max-w-sm">
              {step.description}
            </p>
            {step.type === "complete" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 w-16 h-16 rounded-full bg-[var(--emotion-calm)] flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </div>
        );

      case "input":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                {step.title}
              </h2>
              <p className="text-[var(--text-secondary)] naomi-text">
                {step.description}
              </p>
            </div>
            <Input
              placeholder={step.placeholder}
              value={formData.name as string}
              onChange={(e) => handleInputChange(e.target.value)}
              inputSize="lg"
              className="text-center"
            />
          </div>
        );

      case "select":
        const selectField =
          currentStep === 4
            ? "currentMood"
            : currentStep === 6
            ? "preferredTime"
            : "frequency";
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                {step.title}
              </h2>
              <p className="text-[var(--text-secondary)] naomi-text">
                {step.description}
              </p>
            </div>
            <div className="space-y-2">
              {step.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectChange(option, selectField)}
                  className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all duration-200",
                    formData[selectField] === option
                      ? "border-[var(--aurora-purple)] bg-[var(--aurora-purple)]/5 text-[var(--text-primary)]"
                      : "border-[var(--border)] hover:border-[var(--aurora-purple)]/50 text-[var(--text-secondary)]"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "multi-select":
        const multiField = currentStep === 3 ? "goals" : "interests";
        const selectedValues = (formData[multiField] as string[]) || [];
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                {step.title}
              </h2>
              <p className="text-[var(--text-secondary)] naomi-text">
                {step.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {step.options?.map((option) => {
                const isSelected = selectedValues.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => handleMultiSelectToggle(option, multiField)}
                    className={cn(
                      "px-4 py-2 rounded-full border transition-all duration-200",
                      isSelected
                        ? "border-[var(--aurora-purple)] bg-[var(--aurora-purple)] text-white"
                        : "border-[var(--border)] hover:border-[var(--aurora-purple)] text-[var(--text-secondary)]"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Progress Header */}
      <header className="p-4 md:p-6">
        <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-32">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card variant="glass" padding="lg">
                <CardContent>{renderStepContent()}</CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--background)]/80 backdrop-blur-md border-t border-[var(--border)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="min-w-[120px]"
          >
            {currentStep === totalSteps ? (
              "Get Started"
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
