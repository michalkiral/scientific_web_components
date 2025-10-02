export interface ScientificThemeColors {
  nodeColor: string;
  edgeColor: string;
  textColor: string;
  borderColor: string;
  dangerColor: string;
  warningColor: string;
  bgColor: string;
  primaryColor: string;
  primaryHover: string;
  secondaryColor: string;
  successColor: string;
  infoColor: string;
}

export const THEME_COLORS = {
  default: {
    primaryColor: '#007bff',
    primaryHover: '#0056b3', 
    secondaryColor: '#6c757d',
    successColor: '#28a745',
    dangerColor: '#dc3545',
    warningColor: '#ffc107',
    infoColor: '#17a2b8',
    nodeColor: '#007bff',
    edgeColor: '#6c757d',
    textColor: '#495057',
    borderColor: '#007bff',
    bgColor: '#ffffff',
  },
  dark: {
    primaryColor: '#60a5fa',
    primaryHover: '#3b82f6',
    secondaryColor: '#6b7280',
    successColor: '#10b981',
    dangerColor: '#ef4444',
    warningColor: '#f59e0b',
    infoColor: '#60a5fa',
    nodeColor: '#60a5fa',
    edgeColor: '#6b7280',
    textColor: '#d1d5db',
    borderColor: '#60a5fa',
    bgColor: '#1f2937',
  },
  scientific: {
    primaryColor: '#3b82f6',
    primaryHover: '#2563eb',
    secondaryColor: '#64748b',
    successColor: '#059669',
    dangerColor: '#dc2626',
    warningColor: '#d97706',
    infoColor: '#0284c7',
    nodeColor: '#3b82f6',
    edgeColor: '#64748b',
    textColor: '#334155',
    borderColor: '#3b82f6',
    bgColor: '#f8fafc',
  }
} as const;

export const DATA_VISUALIZATION_PALETTE = [
  '#2563eb',
  '#059669',
  '#dc2626',
  '#d97706',
  '#0891b2',
  '#7c3aed',
  '#be185d',
  '#ea580c',
  '#0d9488',
  '#64748b',
] as const;

export function getThemeColors(element: Element, themeName: 'default' | 'dark' | 'scientific' = 'default'): ScientificThemeColors {
  const style = getComputedStyle(element);
  const fallbackColors = THEME_COLORS[themeName];
  
  return {
    primaryColor: style.getPropertyValue('--scientific-primary-color').trim() || fallbackColors.primaryColor,
    primaryHover: style.getPropertyValue('--scientific-primary-hover').trim() || fallbackColors.primaryHover,
    secondaryColor: style.getPropertyValue('--scientific-secondary-color').trim() || fallbackColors.secondaryColor,
    successColor: style.getPropertyValue('--scientific-success-color').trim() || fallbackColors.successColor,
    dangerColor: style.getPropertyValue('--scientific-danger-color').trim() || fallbackColors.dangerColor,
    warningColor: style.getPropertyValue('--scientific-warning-color').trim() || fallbackColors.warningColor,
    infoColor: style.getPropertyValue('--scientific-info-color').trim() || fallbackColors.infoColor,
    
    nodeColor: style.getPropertyValue('--scientific-primary-color').trim() || fallbackColors.nodeColor,
    edgeColor: style.getPropertyValue('--scientific-secondary-color').trim() || fallbackColors.edgeColor,
    textColor: style.getPropertyValue('--scientific-text-secondary').trim() || fallbackColors.textColor,
    borderColor: style.getPropertyValue('--scientific-primary-color').trim() || fallbackColors.borderColor,
    bgColor: style.getPropertyValue('--container-bg-color').trim() || style.getPropertyValue('--scientific-bg-primary').trim() || fallbackColors.bgColor,
  };
}

export function getThemeColorsByName(themeName: 'default' | 'dark' | 'scientific'): ScientificThemeColors {
  return THEME_COLORS[themeName];
}

export function getThemeColor(
  element: Element, 
  property: string, 
  fallback: string
): string {
  const style = getComputedStyle(element);
  const cssProperty = property.startsWith('--') ? property : `--${property}`;
  return style.getPropertyValue(cssProperty).trim() || fallback;
}

export function applyThemeColors<T extends Record<string, string>>(
  element: Element,
  colorMap: T
): T {
  const result = {} as T;
  const style = getComputedStyle(element);
  
  for (const [key, property] of Object.entries(colorMap)) {
    const cssProperty = property.startsWith('--') ? property : `--${property}`;
    const resolvedColor = style.getPropertyValue(cssProperty).trim() || property;
    (result as Record<string, string>)[key] = resolvedColor;
  }
  
  return result;
}

export function createColorVariants(baseColor: string) {
  return {
    base: baseColor,
    hover: `color-mix(in srgb, ${baseColor} 90%, black)`,
    focus: `color-mix(in srgb, ${baseColor} 85%, black)`,
    light: `color-mix(in srgb, ${baseColor} 70%, white)`,
    alpha: (alpha: number) => `color-mix(in srgb, ${baseColor} ${alpha * 100}%, transparent)`,
  };
}

export function getPaletteColor(index: number, alpha = 1): string {
  const color = DATA_VISUALIZATION_PALETTE[index % DATA_VISUALIZATION_PALETTE.length];
  return alpha === 1 ? color : `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
}

export function generateColorPalette(count: number, alpha = 1): string[] {
  return Array.from({length: count}, (_, index) =>
    getPaletteColor(index, alpha)
  );
}

// Chart.js specific theme utilities
export interface ChartThemeColors {
  gridColor: string;
  axisLabelColor: string;
  axisTitleColor: string;
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
  tooltipBorderColor: string;
}

export function getChartThemeColors(element: Element, themeName: 'default' | 'dark' | 'scientific' = 'default'): ChartThemeColors {
  const style = getComputedStyle(element);
  const fallbackColors = THEME_COLORS[themeName];
  
  const gridColor = style.getPropertyValue('--scientific-text-muted').trim() || fallbackColors.edgeColor;
  const textSecondary = style.getPropertyValue('--scientific-text-secondary').trim() || fallbackColors.textColor;
  const textPrimary = style.getPropertyValue('--scientific-text-primary').trim() || fallbackColors.textColor;
  const bgSecondary = style.getPropertyValue('--scientific-bg-secondary').trim() || fallbackColors.bgColor;
  const borderFocus = style.getPropertyValue('--scientific-border-focus').trim() || fallbackColors.primaryColor;
  
  return {
    gridColor,
    axisLabelColor: textSecondary,
    axisTitleColor: textPrimary,
    tooltipBackgroundColor: bgSecondary,
    tooltipTextColor: textPrimary,
    tooltipBorderColor: borderFocus,
  };
}

export function createChartThemeConfig(element: Element, themeName: 'default' | 'dark' | 'scientific' = 'default') {
  const colors = getChartThemeColors(element, themeName);
  
  return {
    scales: {
      x: {
        grid: {
          color: colors.gridColor,
        },
        ticks: {
          color: colors.axisLabelColor,
        },
        title: {
          color: colors.axisTitleColor,
        },
      },
      y: {
        grid: {
          color: colors.gridColor,
        },
        ticks: {
          color: colors.axisLabelColor,
        },
        title: {
          color: colors.axisTitleColor,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: colors.axisLabelColor,
        },
      },
      tooltip: {
        backgroundColor: colors.tooltipBackgroundColor,
        titleColor: colors.tooltipTextColor,
        bodyColor: colors.tooltipTextColor,
        borderColor: colors.tooltipBorderColor,
      },
    },
  };
}