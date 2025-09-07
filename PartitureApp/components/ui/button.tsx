import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-white shadow-lg hover:bg-destructive/90 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 bg-background shadow-md hover:bg-accent hover:text-accent-foreground hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline transform hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-3 text-base has-[>svg]:px-5" /* 44px height for mobile */,
        sm: "h-10 rounded-lg gap-2 px-4 text-sm has-[>svg]:px-3" /* 40px height minimum */,
        lg: "h-14 rounded-lg px-8 text-lg has-[>svg]:px-6" /* 56px height for primary actions */,
        xl: "h-16 rounded-xl px-10 text-xl has-[>svg]:px-8" /* Extra large for hero buttons */,
        icon: "size-11 rounded-lg" /* Larger icon buttons for mobile */,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
