import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {
  sharedVariables,
  containerStyles,
  headerStyles,
  inputStyles,
  messageStyles,
  responsiveStyles,
  themeStyles,
  type ScientificTheme,
} from '../shared/styles/common-styles.js';
import {
  dropdownContainerStyles,
  clearButtonStyles,
} from '../shared/styles/dropdown-styles.js';
import {dispatchMultipleEvents, debounce} from '../shared/utils/event-utils.js';
import {classNames} from '../shared/utils/dom-utils.js';
import {
  handleDropdownKeyboard,
  filterOptions,
  generateAutocompleteHint,
  createClickOutsideHandler,
  type DropdownOption,
  type DropdownKeyboardHandler,
} from '../shared/utils/dropdown-utils.js';
import {renderDropdownOptions} from '../shared/utils/dropdown-render.js';

export type InputOption = DropdownOption;

@customElement('scientific-input')
export class ScientificInput
  extends LitElement
  implements DropdownKeyboardHandler
{
  static override styles = [
    sharedVariables,
    containerStyles,
    headerStyles,
    inputStyles,
    messageStyles,
    responsiveStyles,
    themeStyles,
    dropdownContainerStyles,
    clearButtonStyles,
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

  @property({type: String, reflect: true})
  theme: ScientificTheme = 'default';

  @property({type: String})
  placeholder = 'Type to search...';

  @property({type: String})
  value = '';

  @property({type: Array})
  options: DropdownOption[] = [];

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
  isOpen = false;

  @state()
  private filteredOptionsCache: DropdownOption[] = [];

  @state()
  private highlightedIndex = -1;

  @state()
  private inputValue = '';

  @state()
  private autocompleteHint = '';

  get focusedIndex(): number {
    return this.highlightedIndex;
  }

  set focusedIndex(value: number) {
    this.highlightedIndex = value;
  }

  get filteredOptions(): DropdownOption[] {
    return this.filteredOptionsCache;
  }

  set filteredOptions(value: DropdownOption[]) {
    this.filteredOptionsCache = value;
  }

  selectOption(option: DropdownOption) {
    if (option.disabled) return;

    this.inputValue = option.label;
    this.value = option.value;
    this.closeDropdown();
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

  closeDropdown() {
    this.isOpen = false;
    this.highlightedIndex = -1;
  }

  openDropdown() {
    this.filterOptions();
    this.isOpen =
      this.filteredOptions.length > 0 || this.inputValue.trim().length > 0;
  }

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

  private handleClickOutside = createClickOutsideHandler(this, () => {
    this.closeDropdown();
  });

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.inputValue = target.value;
    this.value = target.value;

    if (this.autoComplete) {
      this._debouncedFilter();
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
    this.isOpen =
      this.filteredOptions.length > 0 || this.inputValue.trim().length > 0;
  }

  private filterOptions() {
    this.filteredOptions = filterOptions(this.options, this.inputValue);
    this.highlightedIndex = -1;

    this.autocompleteHint = generateAutocompleteHint(
      this.filteredOptions,
      this.inputValue
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    handleDropdownKeyboard.call(this, e, {
      openOnNavigation: true,
      allowCustomValues: this.allowCustomValues,
      onCustomValue: () => this.selectCustomValue(),
      onAutocompleteHint: () => {
        this.inputValue = this.autocompleteHint;
        this.value = this.autocompleteHint;
        this.autocompleteHint = '';
        this.filterOptions();
      },
      autocompleteHint: this.autocompleteHint,
      inputValue: this.inputValue,
    });
  }

  private selectCustomValue() {
    const customValue = this.inputValue.trim();
    this.value = customValue;
    this.closeDropdown();

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

  private handleOptionClick(option: DropdownOption) {
    this.selectOption(option);
  }

  private handleClear() {
    this.inputValue = '';
    this.value = '';
    this.closeDropdown();
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
      this.openDropdown();
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

  private renderDropdown() {
    return renderDropdownOptions({
      isOpen: this.isOpen,
      filteredOptions: this.filteredOptions,
      focusedIndex: this.focusedIndex,
      selectedValue: this.value,
      searchable: false,
      noOptionsText: this.noOptionsText,
      allowCustomValues: this.allowCustomValues,
      inputValue: this.inputValue,
      onOptionClick: (option) => this.handleOptionClick(option),
      onCustomValueClick: () => this.selectCustomValue(),
    });
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
              >
                ${this.label}
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
          ${this.renderDropdown()}
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
