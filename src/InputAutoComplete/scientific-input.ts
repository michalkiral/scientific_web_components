import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

export interface InputOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

@customElement('scientific-input')
export class ScientificInput extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: var(--input-width, 100%);
      font-family: var(
        --input-font-family,
        system-ui,
        -apple-system,
        sans-serif
      );
    }

    .input-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--input-gap, 8px);
      width: 100%;
    }

    .input-label {
      font-size: var(--input-label-font-size, 14px);
      font-weight: var(--input-label-font-weight, 500);
      color: var(--input-label-color, #374151);
      margin-bottom: var(--input-label-margin-bottom, 4px);
      display: block;
    }

    .input-label.required::after {
      content: ' *';
      color: var(--input-required-color, #dc2626);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .autocomplete-hint {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: var(--input-padding, 12px 16px);
      border: 2px solid transparent;
      border-radius: var(--input-border-radius, 8px);
      background: transparent;
      color: var(--input-hint-color, #9ca3af);
      font-size: var(--input-font-size, 16px);
      font-family: inherit;
      pointer-events: none;
      z-index: 1;
      white-space: nowrap;
      overflow: hidden;
    }

    .input-field {
      position: relative;
      z-index: 2;
      background: transparent;
      width: 100%;
      padding: var(--input-padding, 12px 16px);
      border: var(--input-border, 2px solid #d1d5db);
      border-radius: var(--input-border-radius, 8px);
      background-color: var(--input-bg-color, #ffffff);
      color: var(--input-color, #374151);
      font-size: var(--input-font-size, 16px);
      font-family: inherit;
      transition: var(--input-transition, all 0.2s ease-in-out);
      box-shadow: var(--input-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
      min-height: var(--input-min-height, 48px);
      box-sizing: border-box;
      outline: none;
    }

    .input-field::placeholder {
      color: var(--input-placeholder-color, #9ca3af);
      opacity: 1;
    }

    .input-field:hover {
      border-color: var(--input-hover-border-color, #9ca3af);
      box-shadow: var(--input-hover-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
    }

    .input-field:focus {
      border-color: var(--input-focus-border-color, #007bff);
      box-shadow: var(--input-focus-shadow, 0 0 0 3px rgba(0, 123, 255, 0.1));
    }

    .input-field:disabled {
      background-color: var(--input-disabled-bg-color, #f9fafb);
      border-color: var(--input-disabled-border-color, #e5e7eb);
      color: var(--input-disabled-color, #9ca3af);
      cursor: not-allowed;
    }

    .input-field.error {
      border-color: var(--input-error-border-color, #dc2626);
      box-shadow: var(--input-error-shadow, 0 0 0 3px rgba(220, 38, 38, 0.1));
    }

    .input-field.success {
      border-color: var(--input-success-border-color, #10b981);
      box-shadow: var(
        --input-success-shadow,
        0 0 0 3px rgba(16, 185, 129, 0.1)
      );
    }

    .input-icon {
      position: absolute;
      right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--input-icon-color, #6b7280);
      pointer-events: none;
    }

    .clear-button {
      position: absolute;
      right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--input-clear-size, 20px);
      height: var(--input-clear-size, 20px);
      background: var(--input-clear-bg, transparent);
      border: var(--input-clear-border, none);
      border-radius: var(--input-clear-border-radius, 4px);
      cursor: pointer;
      color: var(--input-clear-color, #9ca3af);
      transition: var(--input-clear-transition, all 0.2s ease-in-out);
      padding: 0;
      font-size: var(--input-clear-font-size, 12px);
      font-weight: var(--input-clear-font-weight, 500);
    }

    .clear-button:hover {
      background-color: var(--input-clear-hover-bg, #f3f4f6);
      color: var(--input-clear-hover-color, #6b7280);
      transform: var(--input-clear-hover-transform, scale(1.1));
    }

    .clear-button:active {
      transform: var(--input-clear-active-transform, scale(0.95));
    }

    .dropdown-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      border: var(
        --input-dropdown-border,
        var(--dropdown-options-border, 2px solid #d1d5db)
      );
      border-top: none;
      border-radius: var(
        --input-dropdown-border-radius,
        var(--dropdown-options-border-radius, 0 0 8px 8px)
      );
      background-color: var(
        --input-dropdown-bg-color,
        var(--dropdown-options-bg-color, #ffffff)
      );
      box-shadow: var(
        --input-dropdown-shadow,
        var(--dropdown-options-shadow, 0 10px 15px rgba(0, 0, 0, 0.1))
      );
      z-index: var(--input-dropdown-z-index, var(--dropdown-z-index, 1000));
      max-height: var(
        --input-dropdown-max-height,
        var(--dropdown-max-height, 200px)
      );
      overflow-y: auto;
      animation: var(
        --input-dropdown-animation,
        var(--dropdown-animation, slideDown 0.15s ease-out)
      );
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .option {
      padding: var(
        --input-option-padding,
        var(--dropdown-option-padding, 12px 16px)
      );
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;
      border-bottom: var(
        --input-option-border,
        var(--dropdown-option-border, 1px solid #f3f4f6)
      );
      color: var(--input-option-color, var(--dropdown-option-color, #374151));
      font-size: var(
        --input-option-font-size,
        var(--dropdown-option-font-size, 16px)
      );
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .option:last-child {
      border-bottom: none;
    }

    .option:hover {
      background-color: var(
        --input-option-hover-bg-color,
        var(--dropdown-option-hover-bg-color, #f9fafb)
      );
    }

    .option.highlighted {
      background-color: var(
        --input-option-highlighted-bg-color,
        var(--dropdown-option-focused-bg-color, #f3f4f6)
      );
      color: var(
        --input-option-highlighted-color,
        var(--dropdown-option-color, #374151)
      );
    }

    .option.disabled {
      background-color: var(--input-option-disabled-bg-color, #f9fafb);
      color: var(--input-option-disabled-color, #9ca3af);
      cursor: not-allowed;
    }

    .option-group {
      padding: var(--input-option-group-padding, 8px 16px 4px);
      font-size: var(--input-option-group-font-size, 12px);
      font-weight: var(--input-option-group-font-weight, 600);
      color: var(--input-option-group-color, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background-color: var(--input-option-group-bg-color, #f9fafb);
      border-bottom: var(--input-option-group-border, 1px solid #e5e7eb);
    }

    .no-options {
      padding: var(--input-no-options-padding, 16px);
      text-align: center;
      color: var(--input-no-options-color, #9ca3af);
      font-style: italic;
      font-size: var(--input-no-options-font-size, 14px);
    }

    .input-helper {
      font-size: var(--input-helper-font-size, 12px);
      color: var(--input-helper-color, #6b7280);
      margin-top: var(--input-helper-margin-top, 4px);
    }

    .input-error {
      font-size: var(--input-error-font-size, 12px);
      color: var(--input-error-color, #dc2626);
      margin-top: var(--input-error-margin-top, 4px);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .input-success {
      font-size: var(--input-success-font-size, 12px);
      color: var(--input-success-color, #10b981);
      margin-top: var(--input-success-margin-top, 4px);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .input-field.small {
      padding: var(--input-small-padding, 8px 12px);
      font-size: var(--input-small-font-size, 14px);
      min-height: var(--input-small-min-height, 36px);
    }

    .input-field.large {
      padding: var(--input-large-padding, 16px 20px);
      font-size: var(--input-large-font-size, 18px);
      min-height: var(--input-large-min-height, 56px);
    }

    @media (max-width: 768px) {
      .input-field {
        font-size: var(--input-mobile-font-size, 16px);
        padding: var(--input-mobile-padding, 12px 16px);
      }
    }
  `;

  @property({type: String})
  label = '';

  @property({type: String})
  placeholder = 'Type to search...';

  @property({type: String})
  value = '';

  @property({type: Array})
  options: InputOption[] = [];

  @property({type: Boolean})
  disabled = false;

  @property({type: Boolean})
  required = false;

  @property({type: Boolean})
  clearable = true;

  @property({type: String})
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({type: String})
  state: 'default' | 'error' | 'success' = 'default';

  @property({type: String})
  helperText = '';

  @property({type: String})
  errorMessage = '';

  @property({type: String})
  successMessage = '';

  @property({type: String})
  icon = '';

  @property({type: Boolean})
  allowCustomValues = false;

  @property({type: Number})
  minLength = 0;

  @property({type: Number})
  maxLength = -1;

  @property({type: String})
  noOptionsText = 'No options found';

  @property({type: Boolean})
  autoComplete = true;

  @property({type: Boolean})
  autoFocus = false;

  @state()
  private isOpen = false;

  @state()
  private filteredOptions: InputOption[] = [];

  @state()
  private highlightedIndex = -1;

  @state()
  private inputValue = '';

  @state()
  private autocompleteHint = '';

  override connectedCallback() {
    super.connectedCallback();
    this.inputValue = this.value;
    this.filteredOptions = this.options;
    document.addEventListener('click', this.handleClickOutside);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  private handleClickOutside = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this.isOpen = false;
      this.highlightedIndex = -1;
    }
  };

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.inputValue = target.value;
    this.value = target.value;

    if (this.autoComplete) {
      this.filterOptions();
      this.isOpen =
        this.filteredOptions.length > 0 || this.inputValue.trim().length > 0;
    }

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {value: this.inputValue},
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: this.inputValue},
        bubbles: true,
        composed: true,
      })
    );
  }

  private filterOptions() {
    if (!this.inputValue.trim()) {
      this.filteredOptions = this.options;
      this.autocompleteHint = '';
      return;
    }

    this.filteredOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(this.inputValue.toLowerCase())
    );
    this.highlightedIndex = -1;

    // Set autocomplete hint for the first matching option
    if (this.filteredOptions.length > 0 && this.inputValue.length > 0) {
      const firstMatch = this.filteredOptions[0];
      const inputLower = this.inputValue.toLowerCase();
      const labelLower = firstMatch.label.toLowerCase();

      if (labelLower.startsWith(inputLower)) {
        this.autocompleteHint =
          this.inputValue + firstMatch.label.slice(this.inputValue.length);
      } else {
        this.autocompleteHint = '';
      }
    } else {
      this.autocompleteHint = '';
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isOpen && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      this.isOpen = true;
      this.filterOptions();
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (this.highlightedIndex < this.filteredOptions.length - 1) {
          this.highlightedIndex++;
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.highlightedIndex > 0) {
          this.highlightedIndex--;
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (
          this.highlightedIndex >= 0 &&
          this.filteredOptions[this.highlightedIndex] &&
          !this.filteredOptions[this.highlightedIndex].disabled
        ) {
          this.selectOption(this.filteredOptions[this.highlightedIndex]);
        } else if (this.allowCustomValues && this.inputValue.trim()) {
          this.selectCustomValue();
        }
        break;
      case 'Escape':
        this.isOpen = false;
        this.highlightedIndex = -1;
        break;
      case 'Tab':
        if (
          this.autocompleteHint &&
          this.autocompleteHint !== this.inputValue
        ) {
          e.preventDefault();
          this.inputValue = this.autocompleteHint;
          this.value = this.autocompleteHint;
          this.autocompleteHint = '';
          this.filterOptions();
        } else if (this.isOpen && this.filteredOptions.length > 0) {
          e.preventDefault();
          const optionToSelect =
            this.highlightedIndex >= 0
              ? this.filteredOptions[this.highlightedIndex]
              : this.filteredOptions[0];

          if (optionToSelect && !optionToSelect.disabled) {
            this.selectOption(optionToSelect);
          }
        } else {
          this.isOpen = false;
          this.highlightedIndex = -1;
          this.autocompleteHint = '';
        }
        break;
    }
  }

  private selectOption(option: InputOption) {
    if (option.disabled) return;

    this.inputValue = option.label;
    this.value = option.value;
    this.isOpen = false;
    this.highlightedIndex = -1;
    this.autocompleteHint = '';

    this.dispatchEvent(
      new CustomEvent('option-selected', {
        detail: {option, value: option.value, label: option.label},
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: option.value, label: option.label},
        bubbles: true,
        composed: true,
      })
    );
  }

  private selectCustomValue() {
    const customValue = this.inputValue.trim();
    this.value = customValue;
    this.isOpen = false;
    this.highlightedIndex = -1;

    this.dispatchEvent(
      new CustomEvent('custom-value-selected', {
        detail: {value: customValue},
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: customValue},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleOptionClick(option: InputOption) {
    this.selectOption(option);
  }

  private handleClear() {
    this.inputValue = '';
    this.value = '';
    this.isOpen = false;
    this.highlightedIndex = -1;
    this.autocompleteHint = '';

    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: ''},
        bubbles: true,
        composed: true,
      })
    );

    const input = this.shadowRoot?.querySelector(
      '.input-field'
    ) as HTMLInputElement;
    input?.focus();
  }

  private handleFocus() {
    if (this.autoComplete) {
      this.filterOptions();
      this.isOpen =
        this.filteredOptions.length > 0 || this.inputValue.trim().length > 0;
    }

    this.dispatchEvent(
      new CustomEvent('focus', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleBlur() {
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('blur', {
          bubbles: true,
          composed: true,
        })
      );
    }, 150);
  }

  private getInputClasses() {
    const classes = ['input-field'];

    if (this.size !== 'medium') {
      classes.push(this.size);
    }

    if (this.state !== 'default') {
      classes.push(this.state);
    }

    return classes.join(' ');
  }

  private renderDropdownOptions() {
    if (!this.isOpen || this.filteredOptions.length === 0) {
      if (this.isOpen && this.allowCustomValues && this.inputValue.trim()) {
        return html`
          <div class="dropdown-container">
            <div
              class="option ${this.highlightedIndex === 0 ? 'highlighted' : ''}"
              @click="${() => this.selectCustomValue()}"
            >
              Add "${this.inputValue}"
            </div>
          </div>
        `;
      }

      if (this.isOpen) {
        return html`
          <div class="dropdown-container">
            <div class="no-options">${this.noOptionsText}</div>
          </div>
        `;
      }

      return '';
    }

    const groupedOptions = this.groupOptions(this.filteredOptions);

    return html`
      <div class="dropdown-container">
        ${Object.entries(groupedOptions).map(
          ([group, options]) => html`
            ${group !== 'default'
              ? html`<div class="option-group">${group}</div>`
              : ''}
            ${options.map((option) => {
              const globalIndex = this.filteredOptions.indexOf(option);
              return html`
                <div
                  class="option ${this.highlightedIndex === globalIndex
                    ? 'highlighted'
                    : ''} ${option.disabled ? 'disabled' : ''}"
                  @click="${() => this.handleOptionClick(option)}"
                >
                  ${option.label}
                </div>
              `;
            })}
          `
        )}
      </div>
    `;
  }

  private groupOptions(options: InputOption[]) {
    const grouped: {[key: string]: InputOption[]} = {default: []};

    options.forEach((option) => {
      const group = option.group || 'default';
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(option);
    });

    return grouped;
  }

  override firstUpdated() {
    if (this.autoFocus) {
      const input = this.shadowRoot?.querySelector(
        '.input-field'
      ) as HTMLInputElement;
      input?.focus();
    }
  }

  override render() {
    const showClear = this.clearable && this.inputValue && !this.disabled;
    const hasIcon = this.icon && !showClear;

    return html`
      <div class="input-container">
        ${this.label
          ? html`
              <label class="input-label ${this.required ? 'required' : ''}">
                ${this.label}
              </label>
            `
          : ''}

        <div class="input-wrapper">
          ${this.autocompleteHint
            ? html`
                <div class="autocomplete-hint">${this.autocompleteHint}</div>
              `
            : ''}

          <input
            type="text"
            class="${this.getInputClasses()}"
            .value="${this.inputValue}"
            .placeholder="${this.placeholder}"
            .disabled="${this.disabled}"
            .required="${this.required}"
            .minlength="${this.minLength}"
            maxlength="${this.maxLength > 0 ? this.maxLength : ''}"
            @input="${this.handleInput}"
            @keydown="${this.handleKeyDown}"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
            autocomplete="off"
            role="combobox"
            aria-expanded="${this.isOpen}"
            aria-haspopup="listbox"
            aria-autocomplete="list"
          />

          ${showClear
            ? html`
                <button
                  class="clear-button"
                  @click="${this.handleClear}"
                  type="button"
                  tabindex="-1"
                  aria-label="Clear input"
                >
                  ✕
                </button>
              `
            : ''}
          ${hasIcon ? html` <div class="input-icon">${this.icon}</div> ` : ''}
        </div>

        ${this.renderDropdownOptions()}
        ${this.helperText
          ? html` <div class="input-helper">${this.helperText}</div> `
          : ''}
        ${this.state === 'error' && this.errorMessage
          ? html` <div class="input-error">⚠️ ${this.errorMessage}</div> `
          : ''}
        ${this.state === 'success' && this.successMessage
          ? html` <div class="input-success">✓ ${this.successMessage}</div> `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-input': ScientificInput;
  }
}
