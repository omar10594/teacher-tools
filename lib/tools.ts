export type ToolDefinition = {
  slug: string;
  title: string;
  description: string;
  href: string;
  badge: string;
};

export const tools: ToolDefinition[] = [
  {
    slug: "weekly-plan",
    title: "Weekly Planning Trigger",
    description:
      "Send week start date and manual week number to create the planning files on Google Drive.",
    href: "/tools/weekly-plan",
    badge: "Available now",
  },
  {
    slug: "word-list-helper",
    title: "Word List Helper",
    description:
      "Future tool for adding definitions and meanings to planning files.",
    href: "/",
    badge: "Coming next",
  },
];
