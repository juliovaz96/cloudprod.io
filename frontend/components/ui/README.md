# UI Component System

This directory hosts the shared component system for the CloudProd.AI marketing website and platform workspace. The goal is to maintain a cohesive, SaaS-grade experience that balances clarity, speed, and a strong brand point of view.

## Principles

- **One source of truth** – every exported primitive lives here and is documented in `system/component-registry.ts`.
- **Composable surfaces** – primitives expose variant props (`tone`, `size`, `state`, `padding`) to adapt across the marketing site and platform UI without rewriting CSS.
- **Accessible by default** – all interactive primitives ship with focus, hover, and disabled states aligned with WCAG 2.1 AA guidance.
- **Design-token powered** – spacing, color, and motion all reference the global design tokens (`src/tokens/design-tokens.ts`).

## Key Updates (Task 1.3)

- Introduced reusable variant utilities in `system/variants.ts` for surface, control, and icon treatments.
- Standardised `Button`, `Card`, `Input`, and `Textarea` on forwardRef patterns with shared variants.
- Added a living component registry highlighting **stable**, **planned**, and **legacy** primitives.
- Created `components/ui/index.ts` for clean imports inside marketing screens and platform modules.

## Importing

```tsx
import { Button, Card, Input, Tabs } from "@/components/ui";
```

Legacy or planned components keep their individual paths but are flagged in the registry for future rationalisation.

## Governance

1. Prefer existing primitives before creating new components.
2. When extending a primitive, add variant props instead of custom class names.
3. Update the registry metadata with the component status and usage notes.
4. Run `npm run lint` and `npm run type-check` before opening a PR.

---

This system is a living asset—treat it as the UI foundation for both the public website and the authenticated platform.
