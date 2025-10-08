
export interface ScientificCustomEvent<T = unknown> extends CustomEvent<T> {
  detail: T;
}

export function dispatchCustomEvent<T>(
  element: HTMLElement,
  eventName: string,
  detail: T,
  options: {
    bubbles?: boolean;
    composed?: boolean;
    cancelable?: boolean;
  } = {}
): boolean {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: options.bubbles ?? true,
    composed: options.composed ?? true,
    cancelable: options.cancelable ?? false,
  });

  return element.dispatchEvent(event);
}

export function dispatchMultipleEvents<T>(
  element: HTMLElement,
  events: Array<{
    name: string;
    detail: T;
    options?: {
      bubbles?: boolean;
      composed?: boolean;
      cancelable?: boolean;
    };
  }>
): void {
  events.forEach(({name, detail, options}) => {
    dispatchCustomEvent(element, name, detail, options);
  });
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
