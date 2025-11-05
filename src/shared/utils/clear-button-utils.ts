import {html, TemplateResult} from 'lit';
import {renderIcon} from './icon-utils.js';
import {dispatchMultipleEvents} from './event-utils.js';

export interface ClearButtonConfig {
  onClear: () => void;
  ariaLabel?: string;
  title?: string;
  tabIndex?: number;
  className?: string;
  stopPropagation?: boolean;
}

export interface ClearEventConfig {
  host: HTMLElement;
  value?: string;
  label?: string;
  eventPrefix?: string;
}

export function renderClearButton(config: ClearButtonConfig): TemplateResult {
  const {
    onClear,
    ariaLabel = 'Clear',
    title = 'Clear',
    tabIndex = -1,
    className = 'clear-button',
    stopPropagation = true,
  } = config;

  return html`
    <button
      class="${className}"
      @click="${(e: Event) => {
        if (stopPropagation) {
          e.stopPropagation();
        }
        onClear();
      }}"
      type="button"
      tabindex="${tabIndex}"
      title="${title}"
      aria-label="${ariaLabel}"
    >
      ${renderIcon('close', {size: 12})}
    </button>
  `;
}

export function dispatchClearEvents(config: ClearEventConfig): void {
  const {host, value = '', label = '', eventPrefix = ''} = config;

  const eventName = eventPrefix ? `${eventPrefix}-cleared` : 'cleared';
  
  dispatchMultipleEvents(host, [
    {
      name: eventName,
      detail: {
        value,
        label,
        timestamp: Date.now(),
      },
      options: {bubbles: true, composed: true},
    },
    {
      name: 'change',
      detail: {
        value,
        label,
        timestamp: Date.now(),
      },
      options: {bubbles: true, composed: true},
    },
  ]);
}

export function createClearHandler<T extends HTMLElement>(
  host: T,
  config: {
    resetValue: () => void;
    additionalReset?: () => void;
    eventPrefix?: string;
    onComplete?: () => void;
  }
): () => void {
  const {
    resetValue,
    additionalReset,
    eventPrefix,
    onComplete,
  } = config;

  return () => {
    resetValue();
    additionalReset?.();
    
    dispatchClearEvents({
      host,
      value: '',
      eventPrefix,
    });

    if ('requestUpdate' in host && typeof host.requestUpdate === 'function') {
      host.requestUpdate();
    }
    
    onComplete?.();
  };
}