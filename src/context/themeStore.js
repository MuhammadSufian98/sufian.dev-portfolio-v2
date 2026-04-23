export const THEME_SCHEMES = [
  {
    id: "dark",
    name: "Obsidian Core",
    description: "High-density cinematic engineering interface",
    isDefault: true,
    metadata: {
      mode: "dark",
      badge: "STABLE",
      createdAt: "2026-04-23",
    },
    colors: {
      background: {
        primary: "#080808", // The "Void" (Main BG)
        secondary: "#0D0D0D", // Toolbelt/Project Cards
        elevated: "#141414", // Hover states / Sidebars
        inverse: "#F4F1EC", // Quote Section end-state
      },
      text: {
        heading: "#FFFFFF", // High-impact titles
        subheading: "#A3A3A3", // Metadata / Technical labels
        paragraph: "#737373", // Descriptions
        muted: "#404040", // Disabled / Placeholder
        inverse: "#080808", // Text on Quote section
      },
      border: {
        subtle: "rgba(255, 255, 255, 0.05)", // Grid lines
        strong: "rgba(245, 158, 11, 0.3)", // Amber glow borders
      },
      accent: {
        primary: "#F59E0B", // Amber-500 (The Rail / Nodes)
        soft: "rgba(245, 158, 11, 0.1)", // Ambient glow wash
        contrast: "#000000", // Text on Amber buttons
      },
      status: {
        success: "#10B981",
        error: "#EF4444",
      },
      overlay: {
        grid: "rgba(255, 255, 255, 0.03)",
      },
      vanta: {
        background: 0x080808,
        color: 0xf59e0b,
      },
    },
  },
  {
    id: "light",
    name: "Paper Archive",
    description: "Parchment-based technical schematic interface",
    isDefault: false,
    metadata: {
      mode: "light",
      badge: "ARCHIVE",
      createdAt: "2026-04-23",
    },
    colors: {
      background: {
        primary: "#F4F1EA",
        secondary: "#F4F1EA",
        elevated: "#F4F1EA",
        inverse: "#171717",
      },
      text: {
        heading: "#171717",
        subheading: "#3F3F3F",
        paragraph: "#525252",
        muted: "#717171",
        inverse: "#F4F1EA",
      },
      border: {
        subtle: "rgba(0, 0, 0, 0.05)",
        strong: "rgba(180, 83, 9, 0.35)",
      },
      accent: {
        primary: "#B45309",
        soft: "rgba(180, 83, 9, 0.08)",
        contrast: "#FFFFFF",
      },
      status: {
        success: "#059669",
        error: "#DC2626",
      },
      overlay: {
        grid: "rgba(0, 0, 0, 0.04)",
      },
      vanta: {
        background: 0xf5f5f5,
        color: 0xb45309,
      },
    },
  },
];

export const DEFAULT_THEME_ID =
  THEME_SCHEMES.find((theme) => theme.isDefault)?.id || "dark";

export function getThemeById(id) {
  return THEME_SCHEMES.find((theme) => theme.id === id) || THEME_SCHEMES[0];
}
