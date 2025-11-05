export const SCIENTIFIC_THEMES = ['default', 'dark', 'scientific'] as const;

export type ScientificTheme = typeof SCIENTIFIC_THEMES[number];