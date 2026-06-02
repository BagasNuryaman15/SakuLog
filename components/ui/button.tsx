import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-white/12 bg-[linear-gradient(135deg,rgba(105,118,255,0.98),rgba(210,74,255,0.78))] text-primary-foreground shadow-[0_16px_48px_rgba(120,87,255,0.32)] hover:shadow-[0_20px_60px_rgba(190,80,255,0.38)]",
        secondary:
          "border border-white/10 bg-white/[0.075] text-secondary-foreground shadow-sm hover:bg-white/[0.11]",
        ghost: "text-indigo-100/62 hover:bg-white/[0.07] hover:text-white",
        outline:
          "border border-white/12 bg-black/18 text-foreground shadow-sm hover:border-indigo-200/30 hover:bg-white/[0.07] hover:text-white"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-xl px-3 text-xs",
        lg: "h-12 rounded-2xl px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
