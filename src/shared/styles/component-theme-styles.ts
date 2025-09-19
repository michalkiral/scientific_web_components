import {css} from 'lit';

/**
 * Component-specific theme styles
 * These styles provide theme variations for specific components
 * Previously these were in common-styles.ts but moved here for better organization
 */

export const networkThemeStyles = css`
  /* Network specific styles */
  :host([theme='dark']) .network-toolbar,
  :host([theme='dark']) .network-info {
    background: var(--scientific-bg-secondary, rgba(31, 41, 55, 0.95));
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .info-row {
    color: var(--scientific-text-secondary);
  }

  :host([theme='dark']) .info-row span:first-child {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .network-toolbar scientific-dropdown {
    --dropdown-bg-color: var(--scientific-bg-secondary);
    --dropdown-color: var(--scientific-text-secondary);
    --dropdown-border: var(--scientific-border);
    --dropdown-options-bg-color: var(--scientific-bg-secondary);
    --dropdown-option-color: var(--scientific-text-secondary);
    --dropdown-option-hover-bg-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .network-toolbar scientific-button {
    --button-bg-color: var(--scientific-bg-secondary);
    --button-color: var(--scientific-text-secondary);
    --button-border: var(--scientific-border);
    --button-hover-bg-color: var(--scientific-bg-tertiary);
  }

  :host([theme='scientific']) .network-toolbar,
  :host([theme='scientific']) .network-info {
    background: var(--scientific-bg-primary, rgba(248, 250, 252, 0.98));
  }
`;

export const sliderThemeStyles = css`
  /* Slider specific styles */
  :host([theme='dark']) .slider-value-display {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-primary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .slider-track {
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .slider-mark-tick {
    background-color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .slider-mark-label {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .slider-range-labels {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .slider-tooltip {
    background-color: var(--scientific-bg-tertiary);
    color: var(--scientific-text-primary);
  }

  :host([theme='dark']) .slider-tooltip::after {
    border-top-color: var(--scientific-bg-tertiary);
  }

  :host([theme='scientific']) .slider-value-display {
    background-color: var(--scientific-bg-secondary);
    border: var(--scientific-border);
  }

  :host([theme='scientific']) .slider-tooltip {
    background-color: var(--scientific-text-primary);
    color: #ffffff;
    box-shadow: var(--scientific-shadow-lg);
  }

  :host([theme='scientific']) .slider-tooltip::after {
    border-top-color: var(--scientific-text-primary);
  }

  :host([theme='default']) .slider-tooltip,
  :host(:not([theme])) .slider-tooltip {
    background-color: #374151;
    color: #ffffff;
  }

  :host([theme='default']) .slider-tooltip::after,
  :host(:not([theme])) .slider-tooltip::after {
    border-top-color: #374151;
  }
`;

export const tableThemeStyles = css`
  /* Table specific styles */
  :host([theme='dark']) .table-container {
    background-color: var(--scientific-bg-primary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .table-header {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .table-title {
    color: var(--scientific-text-primary);
  }

  :host([theme='dark']) .table-description {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .table {
    background-color: var(--scientific-bg-primary);
  }

  :host([theme='dark']) .table-head {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='dark']) .table-header-cell {
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .table-header-cell.sortable:hover {
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .table-row {
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .table-row:hover {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='dark']) .table-row.selected {
    background-color: rgba(96, 165, 250, 0.1);
    border-color: var(--scientific-primary-color);
  }

  :host([theme='dark']) .table-cell {
    color: var(--scientific-text-secondary);
  }

  :host([theme='dark']) .table-footer {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .table-info {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .pagination-button {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .pagination-button:hover:not(:disabled) {
    background-color: var(--scientific-bg-tertiary);
    border-color: var(--scientific-border-hover);
  }

  :host([theme='dark']) .pagination-button.active {
    background-color: var(--scientific-primary-color);
    color: #ffffff;
    border-color: var(--scientific-primary-color);
  }

  :host([theme='dark']) .page-size-selector {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .empty-state {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .empty-title {
    color: var(--scientific-text-secondary);
  }

  :host([theme='dark']) .empty-description {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .sort-indicator {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .sort-indicator.active {
    color: var(--scientific-primary-color);
  }

  :host([theme='scientific']) .table-container {
    background-color: var(--scientific-bg-primary);
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow);
  }

  :host([theme='scientific']) .table-header {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .table-title {
    color: var(--scientific-text-primary);
    font-weight: var(--scientific-font-weight-semibold);
  }

  :host([theme='scientific']) .table-description {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .table-head {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='scientific']) .table-header-cell {
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
    font-weight: var(--scientific-font-weight-semibold);
  }

  :host([theme='scientific']) .table-header-cell.sortable:hover {
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='scientific']) .table-row {
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .table-row:hover {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='scientific']) .table-row.selected {
    background-color: rgba(59, 130, 246, 0.1);
    border-color: var(--scientific-primary-color);
  }

  :host([theme='scientific']) .table-cell {
    color: var(--scientific-text-secondary);
  }

  :host([theme='scientific']) .table-footer {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .table-info {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .pagination-button {
    background-color: var(--scientific-bg-primary);
    color: var(--scientific-text-secondary);
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .pagination-button:hover:not(:disabled) {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-hover);
    box-shadow: var(--scientific-shadow);
  }

  :host([theme='scientific']) .pagination-button.active {
    background-color: var(--scientific-primary-color);
    color: #ffffff;
    border-color: var(--scientific-primary-color);
    box-shadow: var(--scientific-shadow);
  }

  :host([theme='scientific']) .page-size-selector {
    background-color: var(--scientific-bg-primary);
    color: var(--scientific-text-secondary);
    border: var(--scientific-border);
  }

  :host([theme='scientific']) .sort-indicator {
    color: var(--scientific-text-muted);
  }

  :host([theme='scientific']) .sort-indicator.active {
    color: var(--scientific-primary-color);
  }
`;

export const dropdownThemeStyles = css`
  /* Dropdown specific styles */
  :host([theme='dark']) .dropdown-select {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .dropdown-select:hover {
    border-color: var(--scientific-border-hover);
  }

  :host([theme='dark']) .dropdown-select:focus {
    border-color: var(--scientific-primary-color);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }

  :host([theme='dark']) .dropdown-label {
    color: var(--scientific-text-secondary);
  }

  :host([theme='dark']) .dropdown-arrow {
    border-top-color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .dropdown-placeholder {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .options-container {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
    box-shadow: var(--scientific-shadow-lg);
  }

  :host([theme='dark']) .option {
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .option:hover {
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .option.selected {
    background-color: rgba(96, 165, 250, 0.1);
    color: var(--scientific-primary-color);
  }

  :host([theme='dark']) .option.focused {
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .search-input {
    background-color: var(--scientific-bg-tertiary);
    border-color: var(--scientific-border-color);
    color: var(--scientific-text-secondary);
  }

  :host([theme='dark']) .search-input:focus {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='dark']) .no-options {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .clear-button {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .clear-button:hover {
    color: var(--scientific-danger-color);
  }

  :host([theme='scientific']) .dropdown-select {
    background-color: var(--scientific-bg-primary);
    color: var(--scientific-text-secondary);
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .dropdown-select:hover {
    border-color: var(--scientific-border-hover);
    box-shadow: var(--scientific-shadow);
  }

  :host([theme='scientific']) .dropdown-select:focus {
    border-color: var(--scientific-primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  :host([theme='scientific']) .dropdown-label {
    color: var(--scientific-text-secondary);
    font-weight: var(--scientific-font-weight-medium);
  }

  :host([theme='scientific']) .dropdown-arrow {
    border-top-color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .options-container {
    background-color: var(--scientific-bg-primary);
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow-lg);
  }

  :host([theme='scientific']) .option {
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .option:hover {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='scientific']) .option.selected {
    background-color: rgba(59, 130, 246, 0.1);
    color: var(--scientific-primary-color);
    font-weight: var(--scientific-font-weight-medium);
  }

  :host([theme='scientific']) .option.focused {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='scientific']) .search-input {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
    color: var(--scientific-text-secondary);
  }

  :host([theme='scientific']) .search-input:focus {
    background-color: var(--scientific-bg-primary);
  }

  :host([theme='scientific']) .clear-button {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .clear-button:hover {
    color: var(--scientific-danger-color);
  }
`;

export const buttonThemeStyles = css`
  /* Button specific styles */
  :host([theme='dark']) .scientific-button {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='dark']) .scientific-button:hover {
    background-color: var(--scientific-bg-tertiary);
    border-color: var(--scientific-border-hover);
    box-shadow: var(--scientific-shadow);
  }

  :host([theme='dark']) .scientific-button:focus {
    border-color: var(--scientific-primary-color);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }

  :host([theme='dark']) .scientific-button.secondary {
    background-color: var(--scientific-bg-tertiary);
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .scientific-button.secondary:hover {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-hover);
  }

  :host([theme='dark']) .scientific-button.outline {
    background-color: transparent;
    color: var(--scientific-primary-color);
    border-color: var(--scientific-primary-color);
  }

  :host([theme='dark']) .scientific-button.outline:hover {
    background-color: var(--scientific-primary-color);
    color: #ffffff;
  }

  :host([theme='dark']) .scientific-button.ghost {
    background-color: transparent;
    color: var(--scientific-primary-color);
    border-color: transparent;
  }

  :host([theme='dark']) .scientific-button.ghost:hover {
    background-color: rgba(96, 165, 250, 0.1);
    border-color: transparent;
  }

  :host([theme='dark']) .scientific-button.danger {
    background-color: var(--scientific-danger-color);
    color: #ffffff;
    border-color: var(--scientific-danger-color);
  }

  :host([theme='dark']) .scientific-button.danger:hover {
    background-color: #dc2626;
    border-color: #dc2626;
  }

  :host([theme='dark']) .scientific-button.success {
    background-color: var(--scientific-success-color);
    color: #ffffff;
    border-color: var(--scientific-success-color);
  }

  :host([theme='dark']) .scientific-button.success:hover {
    background-color: #059669;
    border-color: #059669;
  }

  :host([theme='dark']) .scientific-button:disabled {
    background-color: var(--scientific-bg-tertiary);
    color: var(--scientific-text-muted);
    border-color: var(--scientific-border-color);
    box-shadow: none;
  }

  :host([theme='scientific']) .scientific-button {
    background-color: var(--scientific-primary-color);
    color: #ffffff;
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow);
    font-weight: var(--scientific-font-weight-medium);
  }

  :host([theme='scientific']) .scientific-button:hover {
    background-color: var(--scientific-primary-hover);
    border-color: var(--scientific-primary-hover);
    box-shadow: var(--scientific-shadow-lg);
    transform: translateY(-1px);
  }

  :host([theme='scientific']) .scientific-button:focus {
    border-color: var(--scientific-primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), var(--scientific-shadow);
  }

  :host([theme='scientific']) .scientific-button:active {
    transform: translateY(0);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .scientific-button.secondary {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-secondary);
    border: var(--scientific-border);
  }

  :host([theme='scientific']) .scientific-button.secondary:hover {
    background-color: var(--scientific-bg-tertiary);
    border-color: var(--scientific-border-hover);
    color: var(--scientific-text-primary);
  }

  :host([theme='scientific']) .scientific-button.outline {
    background-color: transparent;
    color: var(--scientific-primary-color);
    border: 2px solid var(--scientific-primary-color);
  }

  :host([theme='scientific']) .scientific-button.outline:hover {
    background-color: var(--scientific-primary-color);
    color: #ffffff;
    border-color: var(--scientific-primary-color);
  }

  :host([theme='scientific']) .scientific-button.ghost {
    background-color: transparent;
    color: var(--scientific-primary-color);
    border: 2px solid transparent;
    box-shadow: none;
  }

  :host([theme='scientific']) .scientific-button.ghost:hover {
    background-color: rgba(59, 130, 246, 0.1);
    border-color: transparent;
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .scientific-button.danger {
    background-color: var(--scientific-danger-color);
    color: #ffffff;
    border: 2px solid var(--scientific-danger-color);
  }

  :host([theme='scientific']) .scientific-button.danger:hover {
    background-color: #dc2626;
    border-color: #dc2626;
  }

  :host([theme='scientific']) .scientific-button.success {
    background-color: var(--scientific-success-color);
    color: #ffffff;
    border: 2px solid var(--scientific-success-color);
  }

  :host([theme='scientific']) .scientific-button.success:hover {
    background-color: #059669;
    border-color: #059669;
  }

  :host([theme='scientific']) .scientific-button:disabled {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-muted);
    border-color: var(--scientific-border-color);
    box-shadow: none;
    transform: none;
  }
`;

export const inputThemeStyles = css`
  /* Input specific theme styles */
  :host([theme='dark']) .input-container {
    background-color: var(--scientific-bg-primary);
  }

  :host([theme='dark']) .input-label {
    color: var(--scientific-text-secondary);
  }

  :host([theme='dark']) .input-field {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .input-field:hover {
    border-color: var(--scientific-border-hover);
  }

  :host([theme='dark']) .input-field:focus {
    border-color: var(--scientific-primary-color);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }

  :host([theme='dark']) .input-field::placeholder {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .input-field.error {
    border-color: var(--scientific-danger-color);
    background-color: rgba(239, 68, 68, 0.05);
  }

  :host([theme='dark']) .input-field.success {
    border-color: var(--scientific-success-color);
    background-color: rgba(34, 197, 94, 0.05);
  }

  :host([theme='dark']) .autocomplete-hint {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .options-container {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
    box-shadow: var(--scientific-shadow-lg);
  }

  :host([theme='dark']) .option {
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .option:hover {
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .option.selected {
    background-color: rgba(96, 165, 250, 0.1);
    color: var(--scientific-primary-color);
  }

  :host([theme='dark']) .option.focused {
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .option.disabled {
    color: var(--scientific-text-muted);
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .group-header {
    background-color: var(--scientific-bg-tertiary);
    color: var(--scientific-text-muted);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .no-options {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .clear-button {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .clear-button:hover {
    color: var(--scientific-danger-color);
  }

  :host([theme='dark']) .input-icon {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .scientific-message {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .scientific-message--error {
    color: var(--scientific-danger-color);
  }

  :host([theme='dark']) .scientific-message--success {
    color: var(--scientific-success-color);
  }

  :host([theme='scientific']) .input-container {
    background-color: var(--scientific-bg-primary);
  }

  :host([theme='scientific']) .input-label {
    color: var(--scientific-text-secondary);
    font-weight: var(--scientific-font-weight-medium);
  }

  :host([theme='scientific']) .input-field {
    background-color: var(--scientific-bg-primary);
    color: var(--scientific-text-secondary);
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .input-field:hover {
    border-color: var(--scientific-border-hover);
    box-shadow: var(--scientific-shadow);
  }

  :host([theme='scientific']) .input-field:focus {
    border-color: var(--scientific-primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), var(--scientific-shadow);
  }

  :host([theme='scientific']) .input-field::placeholder {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .input-field.error {
    border-color: var(--scientific-danger-color);
    background-color: rgba(239, 68, 68, 0.02);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  :host([theme='scientific']) .input-field.success {
    border-color: var(--scientific-success-color);
    background-color: rgba(34, 197, 94, 0.02);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }

  :host([theme='scientific']) .autocomplete-hint {
    color: var(--scientific-text-tertiary);
    font-style: italic;
  }

  :host([theme='scientific']) .options-container {
    background-color: var(--scientific-bg-primary);
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow-lg);
  }

  :host([theme='scientific']) .option {
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .option:hover {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='scientific']) .option.selected {
    background-color: rgba(59, 130, 246, 0.1);
    color: var(--scientific-primary-color);
    font-weight: var(--scientific-font-weight-medium);
  }

  :host([theme='scientific']) .option.focused {
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='scientific']) .option.disabled {
    color: var(--scientific-text-muted);
    background-color: var(--scientific-bg-secondary);
  }

  :host([theme='scientific']) .group-header {
    background-color: var(--scientific-bg-secondary);
    color: var(--scientific-text-tertiary);
    border-color: var(--scientific-border-color);
    font-weight: var(--scientific-font-weight-semibold);
  }

  :host([theme='scientific']) .clear-button {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .clear-button:hover {
    color: var(--scientific-danger-color);
  }

  :host([theme='scientific']) .input-icon {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .scientific-message {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .scientific-message--error {
    color: var(--scientific-danger-color);
  }

  :host([theme='scientific']) .scientific-message--success {
    color: var(--scientific-success-color);
  }
`;

export const formThemeStyles = css`
  /* Form specific theme styles */
  :host([theme='dark']) .form-header {
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .form-title {
    color: var(--scientific-text-primary);
  }

  :host([theme='dark']) .form-subtitle {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .form-section-title {
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .form-footer {
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .form-progress {
    background-color: var(--scientific-bg-tertiary);
  }

  :host([theme='dark']) .form-progress-bar {
    background-color: var(--scientific-primary-color);
  }

  :host([theme='dark']) .form-error {
    color: var(--scientific-danger-color);
  }

  :host([theme='dark']) .form-success {
    color: var(--scientific-success-color);
  }

  :host([theme='dark']) .loading-overlay {
    background-color: rgba(17, 24, 39, 0.5);
  }

  :host([theme='dark']) .loading-spinner {
    border-color: var(--scientific-text-muted);
    border-top-color: var(--scientific-primary-color);
  }

  :host([theme='scientific']) .form-header {
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .form-title {
    color: var(--scientific-text-primary);
    font-weight: var(--scientific-font-weight-semibold);
  }

  :host([theme='scientific']) .form-subtitle {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .form-section-title {
    color: var(--scientific-text-secondary);
    border-color: var(--scientific-border-color);
    font-weight: var(--scientific-font-weight-semibold);
  }

  :host([theme='scientific']) .form-footer {
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .form-progress {
    background-color: var(--scientific-bg-secondary);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .form-progress-bar {
    background-color: var(--scientific-primary-color);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .form-error {
    color: var(--scientific-danger-color);
    background-color: rgba(239, 68, 68, 0.05);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: var(--scientific-border-radius);
    padding: var(--scientific-spacing-sm);
  }

  :host([theme='scientific']) .form-success {
    color: var(--scientific-success-color);
    background-color: rgba(34, 197, 94, 0.05);
    border: 1px solid rgba(34, 197, 94, 0.2);
    border-radius: var(--scientific-border-radius);
    padding: var(--scientific-spacing-sm);
  }

  :host([theme='scientific']) .loading-overlay {
    background-color: rgba(248, 250, 252, 0.5);
    backdrop-filter: blur(2px);
  }

  :host([theme='scientific']) .loading-spinner {
    border-color: var(--scientific-text-muted);
    border-top-color: var(--scientific-primary-color);
  }
`;

export const graphThemeStyles = css`
  /* Graph specific theme styles */
  :host([theme='dark']) .graph-header {
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .graph-title {
    color: var(--scientific-text-primary);
  }

  :host([theme='dark']) .graph-subtitle {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='dark']) .graph-toolbar {
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .graph-canvas-container {
    background-color: var(--scientific-bg-secondary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .graph-statistics {
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .graph-stat-item {
    background-color: var(--scientific-bg-tertiary);
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .graph-stat-label {
    color: var(--scientific-text-muted);
  }

  :host([theme='dark']) .graph-stat-value {
    color: var(--scientific-text-primary);
  }

  :host([theme='dark']) .graph-legend {
    border-color: var(--scientific-border-color);
  }

  :host([theme='dark']) .graph-legend-item {
    color: var(--scientific-text-secondary);
  }

  :host([theme='dark']) .graph-error {
    color: var(--scientific-danger-color);
  }

  :host([theme='scientific']) .graph-header {
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .graph-title {
    color: var(--scientific-text-primary);
    font-weight: var(--scientific-font-weight-semibold);
  }

  :host([theme='scientific']) .graph-subtitle {
    color: var(--scientific-text-tertiary);
  }

  :host([theme='scientific']) .graph-toolbar {
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .graph-canvas-container {
    background-color: var(--scientific-bg-primary);
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .graph-statistics {
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .graph-stat-item {
    background-color: var(--scientific-bg-secondary);
    border: var(--scientific-border);
    box-shadow: var(--scientific-shadow-sm);
  }

  :host([theme='scientific']) .graph-stat-label {
    color: var(--scientific-text-tertiary);
    font-weight: var(--scientific-font-weight-medium);
  }

  :host([theme='scientific']) .graph-stat-value {
    color: var(--scientific-text-primary);
    font-weight: var(--scientific-font-weight-semibold);
  }

  :host([theme='scientific']) .graph-legend {
    border-color: var(--scientific-border-color);
  }

  :host([theme='scientific']) .graph-legend-item {
    color: var(--scientific-text-secondary);
  }

  :host([theme='scientific']) .graph-error {
    color: var(--scientific-danger-color);
    background-color: rgba(239, 68, 68, 0.05);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: var(--scientific-border-radius);
    padding: var(--scientific-spacing-sm);
  }
`;
