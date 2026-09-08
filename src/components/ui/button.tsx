import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sea",
  {
    variants: {
      variant: {
        ink: "bg-ink text-cream hover:bg-ink-soft",
        cream: "bg-cream text-ink hover:bg-paper",
        sea: "bg-sea text-cream hover:bg-sea-deep",
        ghost:
          "bg-transparent text-ink hover:text-sea underline-offset-[5px] hover:underline",
        ghostLight:
          "bg-transparent text-cream/90 hover:text-cream underline-offset-[5px] hover:underline",
        line: "bg-transparent text-ink border border-line hover:border-ink",
      },
      size: {
        md: "h-12 px-5 text-[0.9375rem] rounded-sm",
        lg: "h-14 px-6 text-base rounded-sm",
        sm: "h-10 px-4 text-sm rounded-xs",
      },
    },
    defaultVariants: {
      variant: "ink",
      size: "md",
    },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
