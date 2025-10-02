import {css} from 'lit';

export const networkThemeStyles = css`
  .network-toolbar {
    background: var(--scientific-bg-secondary);
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  .network-info {
    background: color-mix(in srgb, var(--scientific-bg-primary) 95%, transparent);
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  .info-row {
    color: var(--scientific-text-secondary);
  }

  .info-row span:first-child {
    color: var(--scientific-text-tertiary);
  }

  .network-toolbar scientific-button {
    --button-bg-color: var(--scientific-bg-secondary);
    --button-color: var(--scientific-text-secondary);
    --button-border-color: var(--scientific-border-color);
    --button-hover-bg-color: var(--scientific-bg-tertiary);
  }

  .network-toolbar scientific-button[variant="primary"] {
    --button-bg-color: var(--scientific-primary-color);
    --button-color: #ffffff;
    --button-border-color: var(--scientific-primary-color);
    --button-hover-bg-color: var(--scientific-primary-hover);
  }
`;

export const sliderThemeStyles = css`
  .slider-value-display {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-primary);
    border-color: var(--scientific-border-color);
  }

  .slider-track {
    background-color: var(--scientific-bg-tertiary);
  }

  .slider-mark-tick {
    background-color: var(--scientific-text-muted);
  }

  .slider-mark-label {
    color: var(--scientific-text-muted);
  }

  .slider-range-labels {
    color: var(--scientific-text-tertiary);
  }

  .slider-tooltip {
    background-color: var(--scientific-bg-tertiary);
    color: var(--scientific-text-primary);
    box-shadow: var(--scientific-shadow-lg);
  }

  .slider-tooltip::after {
    border-top-color: var(--scientific-bg-tertiary);
  }

  :host(:not([theme])) .slider-tooltip,
  :host([theme='default']) .slider-tooltip {
    background-color: #374151;
    color: #ffffff;
  }

  :host(:not([theme])) .slider-tooltip::after,
  :host([theme='default']) .slider-tooltip::after {
    border-top-color: #374151;
  }
`;

export const tableThemeStyles = css`
  .table-row.selected {
    background-color: color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
    border-color: var(--scientific-primary-color);
  }

  .sort-indicator {
    color: var(--scientific-text-muted);
  }

  .sort-indicator.active {
    color: var(--scientific-primary-color);
  }

  .pagination-button.active {
    background-color: var(--scientific-primary-color);
    color: #ffffff;
    border-color: var(--scientific-primary-color);
  }
`;

export const dropdownThemeStyles = css`
  :host {
    --dropdown-placeholder-color: var(--scientific-text-muted);
    --dropdown-border-color: var(--scientific-border-color);
    --dropdown-bg-color: var(--scientific-bg-primary);
    --dropdown-color: var(--scientific-text-primary);
    --dropdown-options-bg-color: var(--scientific-bg-primary);
    --dropdown-option-color: var(--scientific-text-primary);
    --dropdown-option-border-color: var(--scientific-border-color);
    --dropdown-option-hover-bg-color: var(--scientific-bg-tertiary);
    --dropdown-group-bg-color: var(--scientific-bg-secondary);
    --dropdown-group-color: var(--scientific-text-tertiary);
    --dropdown-search-border-color: var(--scientific-border-color);
    --dropdown-search-bg-color: var(--scientific-bg-secondary);
    --dropdown-search-color: var(--scientific-text-primary);
  }

  .dropdown-arrow {
    border-top-color: var(--scientific-text-muted);
  }

  .option.selected {
    background-color: color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
    color: var(--scientific-primary-color);
  }

  .option.focused {
    background-color: var(--scientific-bg-tertiary);
  }

  .clear-button {
    color: var(--scientific-text-muted);
  }

  .clear-button:hover {
    color: var(--scientific-danger-color);
  }
`;

export const buttonThemeStyles = css`
  .scientific-button.ghost:hover {
    background-color: color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
  }

  :host([theme='scientific']) .scientific-button:hover {
    transform: translateY(-1px);
  }

  :host([theme='scientific']) .scientific-button:active {
    transform: translateY(0);
  }
`;

export const inputThemeStyles = css`
  .input-field.error {
    border-color: var(--scientific-danger-color);
    background-color: color-mix(in srgb, var(--scientific-danger-color) 5%, transparent);
  }

  .input-field.success {
    border-color: var(--scientific-success-color);
    background-color: color-mix(in srgb, var(--scientific-success-color) 5%, transparent);
  }

  .autocomplete-hint {
    color: color-mix(in srgb, var(--scientific-text-muted) 40%, transparent);
  }

  .option.disabled {
    color: var(--scientific-text-muted);
    background-color: var(--scientific-bg-tertiary);
  }

  .group-header {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-tertiary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .autocomplete-hint {
    font-style: italic;
  }

  :host([theme='scientific']) .input-field.error {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--scientific-danger-color) 10%, transparent);
  }

  :host([theme='scientific']) .input-field.success {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--scientific-success-color) 10%, transparent);
  }
`;

export const formThemeStyles = css`
  .form-progress-bar {
    background-color: var(--scientific-primary-color);
  }

  :host([theme='scientific']) .form-error {
    color: var(--scientific-danger-color);
    background-color: color-mix(in srgb, var(--scientific-danger-color) 5%, transparent);
    border: 1px solid color-mix(in srgb, var(--scientific-danger-color) 20%, transparent);
    border-radius: var(--scientific-border-radius);
    padding: var(--scientific-spacing-sm);
  }

  :host([theme='scientific']) .form-success {
    color: var(--scientific-success-color);
    background-color: color-mix(in srgb, var(--scientific-success-color) 5%, transparent);
    border: 1px solid color-mix(in srgb, var(--scientific-success-color) 20%, transparent);
    border-radius: var(--scientific-border-radius);
    padding: var(--scientific-spacing-sm);
  }

  :host([theme='scientific']) .loading-overlay {
    backdrop-filter: blur(2px);
  }
`;

export const graphThemeStyles = css`
  .graph-stat-item {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
  }

  .graph-stat-label {
    color: var(--scientific-text-muted);
  }

  .graph-stat-value {
    color: var(--scientific-text-primary);
  }

  :host([theme='scientific']) .graph-error {
    color: var(--scientific-danger-color);
    background-color: color-mix(in srgb, var(--scientific-danger-color) 5%, transparent);
    border: 1px solid color-mix(in srgb, var(--scientific-danger-color) 20%, transparent);
    border-radius: var(--scientific-border-radius);
    padding: var(--scientific-spacing-sm);
  }
`;
