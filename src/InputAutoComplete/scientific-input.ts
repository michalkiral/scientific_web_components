import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {
  sharedVariables,
  containerStyles,
  headerStyles,
  inputStyles,
  messageStyles,
  responsiveStyles,
} from '../shared/styles/common-styles.js';
import {dispatchMultipleEvents, debounce} from '../shared/utils/event-utils.js';
import {classNames} from '../shared/utils/dom-utils.js';

export interface InputOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

@customElement('scientific-input')
export class ScientificInput extends LitElement {
  static override styles = [
    sharedVariables,
    containerStyles,
    headerStyles,
    inputStyles,
    messageStyles,
    responsiveStyles,
    css`
      :host {
        display: block;
        width: var(--input-width, 100%);
        font-family: var(--scientific-font-family);
      }

      .scientific-container {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--scientific-spacing-sm);
        width: 100%;
      }

      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        z-index: 1;
      }

      .autocomplete-hint {
        position: absolute;
        padding: var(
          --input-padding,
          var(--scientific-spacing-md) var(--scientific-spacing-lg)
        );
        border: none;
        border-radius: var(--scientific-border-radius);
        background: transparent;
        color: var(--input-hint-color, rgba(0, 0, 0, 0.3));
        font-size: var(--scientific-text-base);
        font-family: inherit;
        pointer-events: none;
        z-index: 1;
        white-space: nowrap;
        overflow: hidden;
      }

      .clear-button {
        position: absolute;
        right: var(--scientific-spacing-md);
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--input-clear-size, 20px);
        height: var(--input-clear-size, 20px);
        background: transparent;
        border: none;
        border-radius: var(--scientific-border-radius-sm);
        cursor: pointer;
        color: var(--scientific-text-muted);
        transition: var(--scientific-transition-fast);
        padding: 0;
        font-size: var(--scientific-text-xs);
        font-weight: 500;
      }

      .clear-button:hover {
        background-color: var(--scientific-bg-muted);
        color: var(--scientific-text-secondary);
        transform: scale(1.1);
      }

      .clear-button:active {
        transform: scale(0.95);
      }

      .dropdown-container {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          border: var(--scientific-border);
          border-top: none;
          border-radius: 0 0 var(--scientific-border-radius)
            var(--scientific-border-radius);
          background-color: var(--scientific-bg-primary, #fff);
          box-shadow: var(--scientific-shadow-lg);
          z-index: var(--input-dropdown-z-index, 1000);
          max-height: var(--input-dropdown-max-height, 200px);
          overflow-y: auto;
          animation: slideDown 0.15s ease-out;
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
        padding: var(--scientific-spacing-md) var(--scientific-spacing-lg);
        cursor: pointer;
        transition: var(--scientific-transition-fast);
        border-bottom: 1px solid var(--scientific-border-light);
        color: var(--scientific-text-primary);
        font-size: var(--scientific-text-base);
        display: flex;
        align-items: center;
        gap: var(--scientific-spacing-sm);
      }

      .option:last-child {
        border-bottom: none;
      }

      .option:hover {
        background-color: var(--scientific-bg-muted);
      }

      .option.highlighted {
        background-color: var(--scientific-bg-accent);
        color: var(--scientific-text-primary);
      }

      .option.disabled {
        background-color: var(--scientific-bg-disabled);
        color: var(--scientific-text-disabled);
        cursor: not-allowed;
      }

      .option-group {
        padding: var(--scientific-spacing-sm) var(--scientific-spacing-lg)
          var(--scientific-spacing-xs);
        font-size: var(--scientific-text-xs);
        font-weight: 600;
        color: var(--scientific-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        background-color: var(--scientific-bg-muted);
        border-bottom: 1px solid var(--scientific-border-light);
      }

      .no-options {
        padding: var(--scientific-spacing-lg);
        text-align: center;
        color: var(--scientific-text-muted);
        font-style: italic;
        font-size: var(--scientific-text-sm);
      }

      .input-field {
        padding: var(
          --input-padding,
          var(--scientific-spacing-md) var(--scientific-spacing-lg)
        );
        font-size: var(--input-font-size, var(--scientific-text-base));
        min-height: var(--input-min-height, 44px);
      }

      .autocomplete-hint {
        position: absolute;
        padding: var(
          --input-padding,
          var(--scientific-spacing-md) var(--scientific-spacing-lg)
        );
        left: 2px;
        border: none;
        border-radius: var(--scientific-border-radius);
        background: transparent;
        color: var(--input-hint-color, rgba(0, 0, 0, 0.3));
        font-size: var(--input-font-size, var(--scientific-text-base));
        font-family: inherit;
        pointer-events: none;
        z-index: 1;
        white-space: nowrap;
        overflow: hidden;
      }
    `,
  ];

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

  @property({type: String, reflect: true})
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

  private _debouncedFilter = debounce(() => {
    this._performFilter();
  }, 150);

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
      this._debouncedFilter();
      this.isOpen =
        this.filteredOptions.length > 0 || this.inputValue.trim().length > 0;
    }

    dispatchMultipleEvents(this, [
      {
        name: 'input',
        detail: {value: this.inputValue},
        options: {bubbles: true, composed: true},
      },
      {
        name: 'change',
        detail: {value: this.inputValue},
        options: {bubbles: true, composed: true},
      },
    ]);
  }

  private _performFilter() {
    this.filterOptions();
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

    if (this.filteredOptions.length > 0 && this.inputValue.length > 0) {
      const firstMatch = this.filteredOptions[0];
      const inputLower = this.inputValue.toLowerCase();
      const labelLower = firstMatch.label.toLowerCase();

      if (labelLower.startsWith(inputLower) && inputLower !== labelLower) {
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

    dispatchMultipleEvents(this, [
      {
        name: 'option-selected',
        detail: {option, value: option.value, label: option.label},
        options: {bubbles: true, composed: true},
      },
      {
        name: 'change',
        detail: {value: option.value, label: option.label},
        options: {bubbles: true, composed: true},
      },
    ]);
  }

  private selectCustomValue() {
    const customValue = this.inputValue.trim();
    this.value = customValue;
    this.isOpen = false;
    this.highlightedIndex = -1;

    dispatchMultipleEvents(this, [
      {
        name: 'custom-value-selected',
        detail: {value: customValue},
        options: {bubbles: true, composed: true},
      },
      {
        name: 'change',
        detail: {value: customValue},
        options: {bubbles: true, composed: true},
      },
    ]);
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

    dispatchMultipleEvents(this, [
      {
        name: 'clear',
        detail: {value: ''},
        options: {bubbles: true, composed: true},
      },
      {
        name: 'change',
        detail: {value: ''},
        options: {bubbles: true, composed: true},
      },
    ]);

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

    dispatchMultipleEvents(this, [
      {
        name: 'focus',
        detail: {value: this.inputValue},
        options: {bubbles: true, composed: true},
      },
    ]);
  }

  private handleBlur() {
    setTimeout(() => {
      dispatchMultipleEvents(this, [
        {
          name: 'blur',
          detail: {value: this.inputValue},
          options: {bubbles: true, composed: true},
        },
      ]);
    }, 150);
  }

  private getInputClasses() {
    return classNames(
      'input-field',
      'scientific-input',
      this.size !== 'medium' && this.size,
      this.state !== 'default' && this.state
    );
  }

  private renderDropdownOptions() {
    if (!this.isOpen || this.filteredOptions.length === 0) {
      if (this.isOpen && this.allowCustomValues && this.inputValue.trim()) {
        return html`
          <div class="dropdown-container">
            <div
              class="${classNames(
                'option',
                this.highlightedIndex === 0 && 'highlighted'
              )}"
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
                  class="${classNames(
                    'option',
                    this.highlightedIndex === globalIndex && 'highlighted',
                    option.disabled && 'disabled'
                  )}"
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
      <div class="scientific-container">
        ${this.label
          ? html`
              <label
                class="${classNames(
                  'scientific-header',
                  this.required && 'required'
                )}"
                >>> ${this.label}
              </label>
            `
          : ''}

        <div class="input-wrapper">
          ${this.autocompleteHint
            ? html`
                <div
                  class="autocomplete-hint ${this.size !== 'medium'
                    ? this.size
                    : ''}"
                >
                  ${this.autocompleteHint}
                </div>
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
          ${this.renderDropdownOptions()}

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

        ${this.helperText
          ? html` <div class="scientific-message">${this.helperText}</div> `
          : ''}
        ${this.state === 'error' && this.errorMessage
          ? html`
              <div class="scientific-message scientific-message--error">
                ⚠️ ${this.errorMessage}
              </div>
            `
          : ''}
        ${this.state === 'success' && this.successMessage
          ? html`
              <div class="scientific-message scientific-message--success">
                ✓ ${this.successMessage}
              </div>
            `
          : ''}
      </div>
    `;
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('isOpen')) {
      if (this.isOpen) {
        this.classList.add('dropdown-open');
      } else {
        this.classList.remove('dropdown-open');
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-input': ScientificInput;
  }
}
