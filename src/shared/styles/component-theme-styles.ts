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
`;

export const sliderThemeStyles = css`
  :host {
    --slider-value-bg-color: var(--scientific-bg-secondary);
    --slider-value-color: var(--scientific-text-primary);
    --slider-track-color: var(--scientific-bg-tertiary);
    --slider-mark-tick-color: var(--scientific-text-muted);
    --slider-mark-label-color: var(--scientific-text-muted);
    --slider-tooltip-bg-color: var(--scientific-bg-tertiary);
    --slider-tooltip-color: var(--scientific-text-primary);
  }

  :host(:not([theme])) {
    --slider-tooltip-bg-color: #374151;
    --slider-tooltip-color: #ffffff;
  }
  
  :host([theme='default']) {
    --slider-tooltip-bg-color: #374151;
    --slider-tooltip-color: #ffffff;
  }
`;

export const tableThemeStyles = css`
  :host {
    --table-bg-color: var(--scientific-bg-primary);
    --table-border: var(--scientific-border);
    --table-header-bg-color: var(--scientific-bg-secondary);
    --table-header-border: var(--scientific-border);
    --table-title-color: var(--scientific-text-primary);
    --table-description-color: var(--scientific-text-secondary);
    --table-content-bg-color: var(--scientific-bg-primary);
    --table-head-bg-color: var(--scientific-bg-secondary);
    --table-header-cell-color: var(--scientific-text-primary);
    --table-header-cell-border: var(--scientific-border);
    --table-header-cell-hover-bg-color: var(--scientific-bg-tertiary);
    --table-sort-indicator-color: var(--scientific-text-muted);
    --table-sort-indicator-active-color: var(--scientific-primary-color);
    --table-row-border: var(--scientific-border);
    --table-row-hover-bg-color: var(--scientific-bg-secondary);
    --table-row-selected-bg-color: color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
    --table-cell-color: var(--scientific-text-primary);
    --table-footer-bg-color: var(--scientific-bg-secondary);
    --table-footer-border: var(--scientific-border);
    --table-info-color: var(--scientific-text-secondary);
    --table-empty-color: var(--scientific-text-muted);
    --table-empty-title-color: var(--scientific-text-secondary);
    --table-empty-description-color: var(--scientific-text-muted);
  }

  .table-row.selected {
    border-color: var(--scientific-primary-color);
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
  :host {
    --button-ghost-hover-bg-color: color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
  }

  :host([theme='scientific']) .scientific-button:hover {
    transform: translateY(-1px);
  }

  :host([theme='scientific']) .scientific-button:active {
    transform: translateY(0);
  }
`;

export const inputThemeStyles = css`
  :host {
    --input-error-border-color: var(--scientific-danger-color);
    --input-error-bg-color: color-mix(in srgb, var(--scientific-danger-color) 5%, transparent);
    --input-success-border-color: var(--scientific-success-color);
    --input-success-bg-color: color-mix(in srgb, var(--scientific-success-color) 5%, transparent);
    --input-hint-color: color-mix(in srgb, var(--scientific-text-muted) 40%, transparent);
    --input-option-disabled-color: var(--scientific-text-muted);
    --input-option-disabled-bg-color: var(--scientific-bg-tertiary);
    --input-group-header-bg-color: var(--scientific-bg-secondary);
    --input-group-header-color: var(--scientific-text-tertiary);
    --input-group-header-border-color: var(--scientific-border-color);
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
  :host {
    --form-progress-bar-bg-color: var(--scientific-primary-color);
  }

  :host([theme='scientific']) .loading-overlay {
    backdrop-filter: blur(2px);
  }
`;

export const graphThemeStyles = css`
  :host {
    --graph-stat-label-color: var(--scientific-text-secondary);
    --graph-stat-item-bg-color: var(--scientific-bg-secondary);
    --graph-stat-item-border-color: var(--scientific-border-color);
    --graph-stat-value-color: var(--scientific-text-primary);
  }
`;
