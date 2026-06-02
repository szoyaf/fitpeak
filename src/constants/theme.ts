/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#1f1a17",
    background: "#f8f3ea",
    backgroundElement: "#fffaf4",
    backgroundSelected: "#ece1d1",
    textSecondary: "#6e6256",
  },
  dark: {
    text: "#f6eee3",
    background: "#12110f",
    backgroundElement: "#1b1916",
    backgroundSelected: "#27231f",
    textSecondary: "#b2a89d",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-sans)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Typography = {
  h1: { fontSize: 72, lineHeight: 72 },
  h2: { fontSize: 40, lineHeight: 40 },
  h3: { fontSize: 30, lineHeight: 30 },
  h4: { fontSize: 24, lineHeight: 24 },
  h5: { fontSize: 20, lineHeight: 20 },
  h6: { fontSize: 18, lineHeight: 18 },
  h7: { fontSize: 15, lineHeight: 15 },
  h8: { fontSize: 13, lineHeight: 13 },
  h9: { fontSize: 11, lineHeight: 11 },
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
