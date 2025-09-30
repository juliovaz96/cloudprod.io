export type ComponentCategory =
  | "inputs"
  | "data-display"
  | "feedback"
  | "layout"
  | "navigation"
  | "overlay"
  | "utility";

export type ComponentStatus = "stable" | "planned" | "legacy";

export interface ComponentMeta {
  name: string;
  members: string[];
  path: string;
  category: ComponentCategory;
  status: ComponentStatus;
  description: string;
  notes?: string;
}

export const componentRegistry: ComponentMeta[] = [
  {
    name: "Button",
    members: ["Button", "buttonVariants"],
    path: "@/components/ui/button",
    category: "inputs",
    status: "stable",
    description:
      "Primary interactive trigger used for all actions across website and platform surfaces.",
  },
  {
    name: "Badge",
    members: ["Badge", "badgeVariants"],
    path: "@/components/ui/badge",
    category: "data-display",
    status: "stable",
    description:
      "Compact pill component for statuses, filters, and metadata chips.",
  },
  {
    name: "Card",
    members: [
      "Card",
      "CardHeader",
      "CardFooter",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardAction",
    ],
    path: "@/components/ui/card",
    category: "layout",
    status: "stable",
    description:
      "Surface container for dashboards, marketing highlights, and configuration panels.",
  },
  {
    name: "Input",
    members: ["Input", "controlVariants"],
    path: "@/components/ui/input",
    category: "inputs",
    status: "stable",
    description:
      "Text input for forms across authentication, platform settings, and modals.",
  },
  {
    name: "Textarea",
    members: ["Textarea", "textareaVariants"],
    path: "@/components/ui/textarea",
    category: "inputs",
    status: "stable",
    description:
      "Multi-line text entry for prompts, descriptions, and configuration notes.",
  },
  {
    name: "Select",
    members: [
      "Select",
      "SelectTrigger",
      "SelectValue",
      "SelectContent",
      "SelectItem",
    ],
    path: "@/components/ui/select",
    category: "inputs",
    status: "stable",
    description:
      "Listbox primitive for choosing providers, regions, and templates.",
  },
  {
    name: "Tabs",
    members: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
    path: "@/components/ui/tabs",
    category: "navigation",
    status: "stable",
    description:
      "Switches between contextual views across the marketing site and builder surface.",
  },
  {
    name: "Switch",
    members: ["Switch"],
    path: "@/components/ui/switch",
    category: "inputs",
    status: "stable",
    description: "Binary toggle for feature gates and preference settings.",
  },
  {
    name: "Checkbox",
    members: ["Checkbox"],
    path: "@/components/ui/checkbox",
    category: "inputs",
    status: "stable",
    description: "Selection control for multi-select lists and agreements.",
  },
  {
    name: "RadioGroup",
    members: [
      "RadioGroup",
      "RadioGroupItem",
      "RadioGroupIndicator",
    ],
    path: "@/components/ui/radio-group",
    category: "inputs",
    status: "planned",
    description:
      "Segmented selections for deployment targets and plan tiers.",
    notes: "Not referenced yet; keep scaffolded for pricing comparisons.",
  },
  {
    name: "Command",
    members: [
      "Command",
      "CommandInput",
      "CommandList",
      "CommandEmpty",
      "CommandGroup",
      "CommandItem",
    ],
    path: "@/components/ui/command",
    category: "navigation",
    status: "planned",
    description:
      "Command palette pattern for quick switching between projects and resources.",
  },
  {
    name: "Dialog",
    members: [
      "Dialog",
      "DialogTrigger",
      "DialogContent",
      "DialogHeader",
      "DialogTitle",
      "DialogDescription",
      "DialogFooter",
    ],
    path: "@/components/ui/dialog",
    category: "overlay",
    status: "stable",
    description:
      "Modal overlay for onboarding flows, confirmations, and contextual actions.",
  },
  {
    name: "Drawer",
    members: [
      "Drawer",
      "DrawerTrigger",
      "DrawerContent",
      "DrawerHeader",
      "DrawerTitle",
      "DrawerDescription",
      "DrawerFooter",
    ],
    path: "@/components/ui/drawer",
    category: "overlay",
    status: "planned",
    description: "Responsive overlay used for mobile navigation and quick actions.",
  },
  {
    name: "Sheet",
    members: [
      "Sheet",
      "SheetTrigger",
      "SheetContent",
      "SheetFooter",
      "SheetHeader",
      "SheetTitle",
      "SheetDescription",
    ],
    path: "@/components/ui/sheet",
    category: "overlay",
    status: "stable",
    description:
      "Desktop side panels used for resource details and configuration drawers.",
  },
  {
    name: "Popover",
    members: ["Popover", "PopoverTrigger", "PopoverContent"],
    path: "@/components/ui/popover",
    category: "overlay",
    status: "stable",
    description:
      "Inline overlay for quick filters, date pickers, and contextual helpers.",
  },
  {
    name: "Tooltip",
    members: ["Tooltip", "TooltipTrigger", "TooltipContent"],
    path: "@/components/ui/tooltip",
    category: "feedback",
    status: "stable",
    description:
      "Microcopy surface for iconography, controls, and status indicators.",
  },
  {
    name: "Alert",
    members: ["Alert", "AlertTitle", "AlertDescription"],
    path: "@/components/ui/alert",
    category: "feedback",
    status: "planned",
    description:
      "Inline messaging for success, warning, and error states.",
  },
  {
    name: "AlertDialog",
    members: [
      "AlertDialog",
      "AlertDialogTrigger",
      "AlertDialogContent",
      "AlertDialogHeader",
      "AlertDialogTitle",
      "AlertDialogDescription",
      "AlertDialogFooter",
    ],
    path: "@/components/ui/alert-dialog",
    category: "overlay",
    status: "planned",
    description: "Critical confirmation pattern for destructive actions.",
  },
  {
    name: "Progress",
    members: ["Progress"],
    path: "@/components/ui/progress",
    category: "feedback",
    status: "stable",
    description: "Progress indicator for uploads, provisioning, and AI tasks.",
  },
  {
    name: "Skeleton",
    members: ["Skeleton"],
    path: "@/components/ui/skeleton",
    category: "feedback",
    status: "stable",
    description: "Loading placeholder for cards, tables, and charts.",
  },
  {
    name: "Table",
    members: [
      "Table",
      "TableBody",
      "TableCell",
      "TableHead",
      "TableHeader",
      "TableRow",
    ],
    path: "@/components/ui/table",
    category: "data-display",
    status: "stable",
    description: "Structured data table for resources, environments, and usage.",
  },
  {
    name: "Sidebar",
    members: [
      "Sidebar",
      "SidebarInset",
      "SidebarRail",
      "SidebarTrigger",
      "SidebarContent",
    ],
    path: "@/components/ui/sidebar",
    category: "navigation",
    status: "stable",
    description:
      "Internal navigation built for the platform workspace layout.",
  },
  {
    name: "NavigationMenu",
    members: [
      "NavigationMenu",
      "NavigationMenuList",
      "NavigationMenuItem",
      "NavigationMenuLink",
    ],
    path: "@/components/ui/navigation-menu",
    category: "navigation",
    status: "stable",
    description:
      "Global website navigation with desktop mega menu affordances.",
  },
  {
    name: "Carousel",
    members: ["Carousel", "CarouselContent", "CarouselItem"],
    path: "@/components/ui/carousel",
    category: "data-display",
    status: "planned",
    description:
      "Motion-enabled carousel for testimonials and feature galleries.",
  },
  {
    name: "Chart",
    members: ["Chart"],
    path: "@/components/ui/chart",
    category: "data-display",
    status: "planned",
    description: "Custom chart wrapper for analytics visualizations.",
    notes: "Requires product validation before GA rollout.",
  },
  {
    name: "Calendar",
    members: ["Calendar"],
    path: "@/components/ui/calendar",
    category: "utility",
    status: "planned",
    description:
      "Date selection utility for scheduling deployments and audits.",
  },
  {
    name: "Accordion",
    members: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
    path: "@/components/ui/accordion",
    category: "layout",
    status: "planned",
    description: "Expandable disclosure for FAQs and long-form content.",
  },
  {
    name: "Menubar",
    members: ["Menubar", "MenubarTrigger", "MenubarContent"],
    path: "@/components/ui/menubar",
    category: "navigation",
    status: "legacy",
    description:
      "Desktop menu pattern retained for legacy console parity.",
    notes: "No longer used in the redesigned IA; slated for removal if unused by end of phase 2.",
  },
  {
    name: "Pagination",
    members: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink"],
    path: "@/components/ui/pagination",
    category: "navigation",
    status: "planned",
    description: "Pagination controls for data-heavy tables and logs.",
  },
  {
    name: "HoverCard",
    members: ["HoverCard", "HoverCardTrigger", "HoverCardContent"],
    path: "@/components/ui/hover-card",
    category: "feedback",
    status: "planned",
    description:
      "Preview content for people, services, and quick metadata.",
  },
  {
    name: "ContextMenu",
    members: ["ContextMenu", "ContextMenuTrigger", "ContextMenuContent"],
    path: "@/components/ui/context-menu",
    category: "navigation",
    status: "planned",
    description:
      "Right-click contextual actions in the canvas and resource tree.",
  },
  {
    name: "InputOTP",
    members: ["InputOTP", "InputOTPGroup", "InputOTPSlot"],
    path: "@/components/ui/input-otp",
    category: "inputs",
    status: "legacy",
    description:
      "Retained for future MFA flows but not part of the current onboarding.",
  },
  {
    name: "Resizable",
    members: ["ResizablePanel", "ResizableHandle", "ResizablePanelGroup"],
    path: "@/components/ui/resizable",
    category: "layout",
    status: "planned",
    description: "Split-pane interaction for advanced workspace layouts.",
  },
  {
    name: "Form",
    members: ["Form", "FormField", "FormItem", "FormLabel", "FormMessage"],
    path: "@/components/ui/form",
    category: "inputs",
    status: "stable",
    description: "React Hook Form primitives powering complex workflows.",
  },
  {
    name: "Sonner",
    members: ["Toaster", "toast"],
    path: "@/components/ui/sonner",
    category: "feedback",
    status: "planned",
    description:
      "Toast notifications for async jobs and system feedback.",
  },
  {
    name: "Slider",
    members: ["Slider"],
    path: "@/components/ui/slider",
    category: "inputs",
    status: "planned",
    description: "Range slider for resource sizing, budgets, and thresholds.",
  },
  {
    name: "Toggle",
    members: ["Toggle"],
    path: "@/components/ui/toggle",
    category: "inputs",
    status: "stable",
    description: "Icon toggle used for toolbar controls and formatting actions.",
  },
  {
    name: "ToggleGroup",
    members: ["ToggleGroup", "ToggleGroupItem"],
    path: "@/components/ui/toggle-group",
    category: "inputs",
    status: "stable",
    description: "Tool grouping for the architecture canvas and dashboards.",
  },
  {
    name: "Avatar",
    members: ["Avatar", "AvatarImage", "AvatarFallback"],
    path: "@/components/ui/avatar",
    category: "data-display",
    status: "stable",
    description: "User identity primitive for account switchers and lists.",
  },
  {
    name: "Breadcrumb",
    members: [
      "Breadcrumb",
      "BreadcrumbList",
      "BreadcrumbItem",
      "BreadcrumbLink",
      "BreadcrumbPage",
      "BreadcrumbSeparator",
    ],
    path: "@/components/ui/breadcrumb",
    category: "navigation",
    status: "stable",
    description: "Hierarchical navigation component for the platform chrome.",
  },
  {
    name: "DropdownMenu",
    members: [
      "DropdownMenu",
      "DropdownMenuTrigger",
      "DropdownMenuContent",
      "DropdownMenuItem",
    ],
    path: "@/components/ui/dropdown-menu",
    category: "navigation",
    status: "stable",
    description: "Overflow actions used in tables, cards, and list items.",
  },
];

export const stableComponents = componentRegistry.filter(
  (component) => component.status === "stable",
);

export const plannedComponents = componentRegistry.filter(
  (component) => component.status === "planned",
);

export const legacyComponents = componentRegistry.filter(
  (component) => component.status === "legacy",
);
