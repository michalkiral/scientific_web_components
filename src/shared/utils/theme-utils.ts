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