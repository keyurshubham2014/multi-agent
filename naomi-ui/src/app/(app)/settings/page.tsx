"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Download, Trash2, ChevronRight, Shield, User } from "lucide-react";
import { PageContainer } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    reminderTime: "Evening",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExporting(false);
    // In real app, this would trigger a download
    alert("Data export complete! Check your downloads.");
  };

  return (
    <PageContainer maxWidth="dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Settings
          </h1>
          <p className="text-[var(--text-secondary)] naomi-text">
            manage your account and preferences
          </p>
        </div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card padding="md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingsRow
                label="Name"
                value="Demo User"
                onClick={() => {}}
              />
              <SettingsRow
                label="Email"
                value="demo@example.com"
                onClick={() => {}}
              />
              <SettingsRow
                label="Password"
                value="••••••••"
                onClick={() => {}}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card padding="md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Toggle
                checked={settings.notifications}
                onChange={(checked) =>
                  setSettings({ ...settings, notifications: checked })
                }
                label="Push Notifications"
                description="Receive gentle reminders to check in"
              />
              <Toggle
                checked={settings.emailUpdates}
                onChange={(checked) =>
                  setSettings({ ...settings, emailUpdates: checked })
                }
                label="Email Updates"
                description="Weekly insights and tips delivered to your inbox"
              />
              <div className="pt-2">
                <SettingsRow
                  label="Reminder Time"
                  value={settings.reminderTime}
                  onClick={() => {}}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card padding="md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    Export Your Data
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Download all your conversations and insights
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExportData}
                  isLoading={isExporting}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="h-px bg-[var(--border)]" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--emotion-stress)]">
                    Delete Account
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card padding="md">
            <CardContent className="space-y-3">
              <SettingsRow
                label="Terms of Service"
                value=""
                onClick={() => {}}
              />
              <SettingsRow
                label="Privacy Policy"
                value=""
                onClick={() => {}}
              />
              <SettingsRow label="Help & Support" value="" onClick={() => {}} />
              <div className="pt-2 text-center">
                <p className="text-sm text-[var(--text-muted)]">
                  Naomi v1.0.0 • Made with 💜
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Delete Account Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalHeader>
          <ModalTitle>Delete Account?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. All your conversations, journal
            entries, and insights will be permanently deleted.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="p-4 bg-[var(--emotion-stress)]/10 rounded-xl">
            <p className="text-sm text-[var(--text-primary)]">
              You will lose:
            </p>
            <ul className="mt-2 text-sm text-[var(--text-secondary)] space-y-1">
              <li>• All conversation history</li>
              <li>• Journal entries and insights</li>
              <li>• Your emotional journey data</li>
              <li>• Account preferences</li>
            </ul>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(false)}>
            Yes, Delete My Account
          </Button>
        </ModalFooter>
      </Modal>
    </PageContainer>
  );
}

// Settings Row Component
function SettingsRow({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 px-1 hover:bg-[var(--background)] rounded-lg transition-colors -mx-1"
    >
      <span className="text-[var(--text-primary)]">{label}</span>
      <div className="flex items-center gap-2 text-[var(--text-muted)]">
        {value && <span className="text-sm">{value}</span>}
        <ChevronRight className="w-4 h-4" />
      </div>
    </button>
  );
}
