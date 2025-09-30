import * as React from "react";

import { cn } from "./utils";
import {
  textareaVariants,
  type TextareaVariantProps,
} from "./system/variants";

type TextareaProps = React.ComponentProps<"textarea"> & TextareaVariantProps;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, variant, radius, state, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        textareaVariants({ size, variant, radius, state }),
        "field-sizing-content min-h-24",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
