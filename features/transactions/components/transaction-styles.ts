import {
  borderWhite10,
  radiusInput,
  radiusSection,
  shadowInset,
  shadowPage
} from "@/shared/design/tokens";
import { cn } from "@/lib/utils";

export const transactionPanelClass = cn(
  radiusSection,
  borderWhite10,
  shadowPage,
  "border bg-black/24 backdrop-blur-2xl"
);

export const editControlClass = cn(
  radiusInput,
  borderWhite10,
  shadowInset,
  "w-full border bg-white/[0.045] px-3 text-sm text-white outline-none transition focus:border-indigo-200/35 focus:bg-white/[0.07] focus:ring-2 focus:ring-ring/25"
);

export const editInputClass = cn(editControlClass, "h-10");
export const editTextareaClass = cn(editControlClass, "min-h-24 py-3");
