"use client";

import { useEffect, useRef } from "react";

import {
  borderWhite10,
  radiusButton,
  radiusPanel,
  shadowElevated,
  shadowInset
} from "@/components/dashboard/dashboard-style-tokens";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    cancelButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[rgba(2,2,4,0.82)] backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        className={cn(
          radiusPanel,
          borderWhite10,
          shadowElevated,
          "relative w-full max-w-sm border",
          "bg-[linear-gradient(145deg,rgba(10,10,13,0.98),rgba(5,6,8,0.96))]",
          "p-6",
          "backdrop-blur-2xl"
        )}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <h2
          id="confirm-dialog-title"
          className="text-base font-semibold tracking-[-0.02em] text-[#F8F4FF]"
        >
          {title}
        </h2>
        <p
          id="confirm-dialog-description"
          className="mt-2 text-sm leading-6 text-[#9B89B8]/88"
        >
          {description}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className={cn(
              radiusButton,
              borderWhite10,
              shadowInset,
              "flex-1 border bg-white/[0.045] px-4 py-2.5",
              "text-sm font-medium text-[#C7B8E8]/90",
              "outline-none transition duration-150",
              "hover:bg-white/[0.07] hover:text-[#F8F4FF]",
              "focus-visible:ring-2 focus-visible:ring-[#BFA7FF]/28"
            )}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              radiusButton,
              "flex-1 border border-rose-300/20 px-4 py-2.5",
              "bg-[linear-gradient(135deg,rgba(225,29,72,0.24),rgba(190,24,93,0.18))]",
              "text-sm font-medium text-rose-100",
              "shadow-[0_12px_28px_rgba(225,29,72,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]",
              "outline-none transition duration-150",
              "hover:bg-[linear-gradient(135deg,rgba(225,29,72,0.32),rgba(190,24,93,0.24))]",
              "hover:border-rose-300/28 hover:shadow-[0_16px_32px_rgba(225,29,72,0.18)]",
              "focus-visible:ring-2 focus-visible:ring-rose-400/28"
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
