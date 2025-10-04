export const SCIENTIFIC_THEMES = ['default', 'dark', 'scientific'] as const;

export type ScientificTheme = typeof SCIENTIFIC_THEMES[number];

export {SCIENTIFIC_THEMES as THEMES};