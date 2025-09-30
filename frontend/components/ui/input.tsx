import * as React from "react";

import { cn } from "./utils";
import {
  controlVariants,
  type ControlVariantProps,
} from "./system/variants";

type InputProps = React.ComponentProps<"input"> & ControlVariantProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", size, variant, radius, state, ...props },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          controlVariants({ size, variant, radius, state }),
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, controlVariants };
