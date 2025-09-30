import { cva, type VariantProps } from "class-variance-authority";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring";
export const invalidRing =
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40";
export const disabledState =
  "disabled:pointer-events-none disabled:opacity-50";
export const interactiveBase =
  "outline-none transition-[color,background,box-shadow,transform] duration-200 ease-out";
export const iconBase =
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const surfaceBase =
  "relative flex flex-col rounded-xl border bg-card text-card-foreground";

export const surfaceVariants = cva(
  `${surfaceBase} ${interactiveBase}`,
  {
    variants: {
      tone: {
        default: "bg-card text-card-foreground",
        muted: "bg-muted/60 text-muted-foreground",
        contrast: "bg-background text-foreground",
        brand: "bg-primary text-primary-foreground",
        // Logo-aligned brand tones (Phase 3)
        "brand-orange": "bg-orange-500/5 text-foreground border-orange-500/20 hover:bg-orange-500/10",
        "brand-amber": "bg-amber-500/5 text-foreground border-amber-500/20 hover:bg-amber-500/10",
        feature: "bg-blue-500/5 text-foreground border-blue-500/20 hover:bg-blue-500/10",
        success: "bg-green-500/5 text-foreground border-green-500/20 hover:bg-green-500/10",
        warning: "bg-amber-500/5 text-foreground border-amber-500/20 hover:bg-amber-500/10",
      },
      elevation: {
        none: "shadow-none border-border/60",
        sm: "shadow-sm border-border/50",
        md: "shadow-md border-border/40",
        lg: "shadow-lg border-border/30",
      },
      padding: {
        none: "gap-0",
        sm: "gap-4 p-4",
        md: "gap-6 p-6",
        lg: "gap-8 p-8",
      },
      interactive: {
        false: "",
        true: `hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-0.5 ${focusRing}`,
      },
      bleed: {
        false: "",
        true: "rounded-none border-x-0",
      },
    },
    compoundVariants: [
      {
        interactive: true,
        tone: "brand",
        class: "hover:shadow-primary/40 focus-visible:ring-primary/40",
      },
      // Logo-aligned brand compound variants (Phase 3)
      {
        interactive: true,
        tone: "brand-orange",
        class: "hover:shadow-orange-500/20 focus-visible:ring-orange-500/30 hover:-translate-y-1",
      },
      {
        interactive: true,
        tone: "feature",
        class: "hover:shadow-blue-500/20 focus-visible:ring-blue-500/30 hover:-translate-y-1",
      },
      {
        interactive: true,
        tone: "success",
        class: "hover:shadow-green-500/20 focus-visible:ring-green-500/30 hover:-translate-y-1",
      },
    ],
    defaultVariants: {
      tone: "default",
      elevation: "sm",
      padding: "md",
      interactive: false,
      bleed: false,
    },
  },
);

export type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;

const controlBase =
  `w-full min-w-0 border bg-input-background text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground ${interactiveBase} ${focusRing} ${invalidRing} ${disabledState}`;

export const controlVariants = cva(controlBase, {
  variants: {
    size: {
      sm: "h-8 text-xs px-3",
      md: "h-10 text-sm px-4",
      lg: "h-12 text-base px-5",
    },
    variant: {
      default: "border-input",
      subtle:
        "border-transparent bg-muted/50 hover:bg-muted/60 focus-visible:border-input/70",
      ghost:
        "border-transparent bg-transparent hover:bg-muted/30 focus-visible:bg-background/80",
    },
    radius: {
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    },
    state: {
      default: "",
      success: "border-emerald-500 focus-visible:ring-emerald-500/30",
      error: "border-destructive focus-visible:ring-destructive/30",
    },
  },
  compoundVariants: [
    {
      variant: "ghost",
      class: "shadow-none backdrop-blur-sm",
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "default",
    radius: "md",
    state: "default",
  },
});

export type ControlVariantProps = VariantProps<typeof controlVariants>;

const textareaBase =
  `w-full min-w-0 border bg-input-background text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground ${interactiveBase} ${focusRing} ${invalidRing} ${disabledState} resize-none`;

export const textareaVariants = cva(textareaBase, {
  variants: {
    size: {
      sm: "text-xs px-3 py-2",
      md: "text-sm px-4 py-3",
      lg: "text-base px-5 py-4",
    },
    variant: {
      default: "border-input",
      subtle:
        "border-transparent bg-muted/50 hover:bg-muted/60 focus-visible:border-input/70",
      ghost:
        "border-transparent bg-transparent hover:bg-muted/30 focus-visible:bg-background/80",
    },
    radius: {
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-3xl",
    },
    state: {
      default: "",
      success: "border-emerald-500 focus-visible:ring-emerald-500/30",
      error: "border-destructive focus-visible:ring-destructive/30",
    },
  },
  compoundVariants: [
    {
      variant: "ghost",
      class: "shadow-none backdrop-blur-sm",
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "default",
    radius: "md",
    state: "default",
  },
});

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;
