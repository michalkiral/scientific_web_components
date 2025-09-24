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

export function getThemeColors(element: Element): ScientificThemeColors {
  const style = getComputedStyle(element);
  
  return {
    primaryColor: style.getPropertyValue('--scientific-primary-color').trim() || '#007bff',
    primaryHover: style.getPropertyValue('--scientific-primary-hover').trim() || '#0056b3',
    secondaryColor: style.getPropertyValue('--scientific-secondary-color').trim() || '#6c757d',
    successColor: style.getPropertyValue('--scientific-success-color').trim() || '#28a745',
    dangerColor: style.getPropertyValue('--scientific-danger-color').trim() || '#dc3545',
    warningColor: style.getPropertyValue('--scientific-warning-color').trim() || '#ffc107',
    infoColor: style.getPropertyValue('--scientific-info-color').trim() || '#17a2b8',
    
    nodeColor: style.getPropertyValue('--scientific-primary-color').trim() || '#3b82f6',
    edgeColor: style.getPropertyValue('--scientific-text-muted').trim() || '#9ca3af',
    textColor: style.getPropertyValue('--scientific-text-secondary').trim() || '#374151',
    borderColor: style.getPropertyValue('--scientific-primary-hover').trim() || '#2563eb',
    bgColor: style.getPropertyValue('--container-bg-color').trim() || '#ffffff',
  };
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

// Chart.js specific theme utilities
export interface ChartThemeColors {
  gridColor: string;
  axisLabelColor: string;
  axisTitleColor: string;
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
  tooltipBorderColor: string;
}

export function getChartThemeColors(element: Element): ChartThemeColors {
  const style = getComputedStyle(element);
  
  const gridColor = style.getPropertyValue('--scientific-text-muted').trim() || '#6b7280';
  const textSecondary = style.getPropertyValue('--scientific-text-secondary').trim() || '#374151';
  const textPrimary = style.getPropertyValue('--scientific-text-primary').trim() || '#111827';
  const bgSecondary = style.getPropertyValue('--scientific-bg-secondary').trim() || '#f9fafb';
  const borderFocus = style.getPropertyValue('--scientific-border-focus').trim() || '#3b82f6';
  
  return {
    gridColor,
    axisLabelColor: textSecondary,
    axisTitleColor: textPrimary,
    tooltipBackgroundColor: bgSecondary,
    tooltipTextColor: textPrimary,
    tooltipBorderColor: borderFocus,
  };
}

export function createChartThemeConfig(element: Element) {
  const colors = getChartThemeColors(element);
  
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