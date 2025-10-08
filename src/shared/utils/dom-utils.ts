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