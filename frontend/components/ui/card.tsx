import * as React from "react";

import { cn } from "./utils";
import {
  surfaceVariants,
  type SurfaceVariantProps,
} from "./system/variants";

type CardProps = React.ComponentProps<"div"> & SurfaceVariantProps;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, tone, elevation, padding, interactive, bleed, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          surfaceVariants({ tone, elevation, padding, interactive, bleed }),
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

type CardSectionProps = React.ComponentProps<"div">;

const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
);
CardDescription.displayName = "CardDescription";

const CardAction = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  ),
);
CardAction.displayName = "CardAction";

const CardContent = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
