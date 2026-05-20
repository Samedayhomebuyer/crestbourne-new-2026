import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 rounded-full border text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap [&_svg]:w-3 [&_svg]:h-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper border-ink hover:bg-transparent hover:text-ink",
        ghost:
          "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper",
        "contact-default":
          "bg-paper text-accent border-paper hover:bg-transparent hover:text-paper",
        "contact-ghost":
          "bg-transparent text-paper border-paper hover:bg-paper hover:text-accent",
      },
      size: {
        default: "px-4 py-[9px]",
        sm: "px-3 py-[7px] text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
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
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
