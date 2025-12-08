"use client";

import { useEffect, type ReactNode, type HTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "relative w-full max-w-md bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] p-6",
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Modal Header
interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function ModalHeader({ className, ...props }: ModalHeaderProps) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left pr-8", className)}
      {...props}
    />
  );
}

// Modal Title
interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export function ModalTitle({ className, ...props }: ModalTitleProps) {
  return (
    <h2
      className={cn(
        "text-xl font-semibold text-[var(--text-primary)] leading-none",
        className
      )}
      {...props}
    />
  );
}

// Modal Description
interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ModalDescription({ className, ...props }: ModalDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-[var(--text-secondary)]", className)}
      {...props}
    />
  );
}

// Modal Content
interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export function ModalContent({ className, ...props }: ModalContentProps) {
  return <div className={cn("py-4", className)} {...props} />;
}

// Modal Footer
interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2",
        className
      )}
      {...props}
    />
  );
}
