import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {
  sharedVariables,
  inputStyles,
  messageStyles,
  responsiveStyles,
  themeStyles,
  type ScientificTheme,
} from '../shared/styles/common-styles.js';
import {dropdownContainerStyles} from '../shared/styles/dropdown-styles.js';
import {
  inputContainerStyles,
  autocompleteStyles,
  inputClearButtonStyles,
} from '../shared/styles/input-styles.js';
import {inputThemeStyles} from '../shared/styles/component-theme-styles.js';
import {renderIcon} from '../shared/icons/index.js';
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
    themeStyles,
    inputThemeStyles,
    inputStyles,
    messageStyles,
    responsiveStyles,
    inputContainerStyles,
    autocompleteStyles,
    dropdownContainerStyles,
    inputClearButtonStyles,
    css`
      :host {
        display: block;
        width: var(--input-width, 100%);
        font-family: var(--scientific-font-family);
      }

      :host(.dropdown-open) {
        position: relative;
        z-index: 10;
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
      <div class="input-container">
        ${this.label
          ? html`<label
              class="${classNames('input-label', this.required && 'required')}"
              >${this.label}</label
            >`
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
                  ${renderIcon('close', {size: 12})}
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
                ${this.errorMessage}
              </div>
            `
          : ''}
        ${this.state === 'success' && this.successMessage
          ? html`
              <div class="scientific-message scientific-message--success">
                ${this.successMessage}
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
