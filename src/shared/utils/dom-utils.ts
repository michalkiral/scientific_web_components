export function classNames(
  ...args: (string | Record<string, boolean> | false | null | undefined)[]
): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) {
      continue;
    }

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

export function getContainerClasses(
  baseClass: string,
  variant?: string,
  size?: string,
  disabled?: boolean,
  state?: string,
  additional?: string[]
): string {
  const classes = [baseClass];

  if (variant && variant !== 'default') {
    classes.push(variant);
  }

  if (size && size !== 'medium') {
    classes.push(size);
  }

  if (disabled) {
    classes.push('disabled');
  }

  if (state && state !== 'default') {
    classes.push(state);
  }

  if (additional) {
    classes.push(...additional);
  }

  return classes.join(' ');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function roundToDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function formatValue(
  value: number,
  options: {
    unit?: string;
    decimals?: number;
    formatter?: (value: number) => string;
  } = {}
): string {
  const {unit = '', decimals = 2, formatter} = options;

  if (formatter) {
    return formatter(value);
  }

  const formattedValue =
    decimals > 0
      ? roundToDecimals(value, decimals).toString()
      : Math.round(value).toString();

  return unit ? `${formattedValue}${unit}` : formattedValue;
}

export function percentageToValue(
  percentage: number,
  min: number,
  max: number,
  step = 1
): number {
  const range = max - min;
  const rawValue = min + (percentage / 100) * range;

  if (step <= 0) {
    return rawValue;
  }

  const steppedValue = Math.round(rawValue / step) * step;
  return clamp(steppedValue, min, max);
}

export function valueToPercentage(
  value: number,
  min: number,
  max: number
): number {
  if (max <= min) {
    return 0;
  }
  const clampedValue = clamp(value, min, max);
  return ((clampedValue - min) / (max - min)) * 100;
}

export function generateId(prefix = 'scientific'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
