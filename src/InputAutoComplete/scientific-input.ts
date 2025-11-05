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
} from './input-styles.js';
import {inputThemeStyles} from '../shared/styles/component-theme-styles.js';
import {baseComponentStyles} from '../shared/styles/base-component-styles.js';
import {DropdownInteractionController} from '../shared/dropdown/dropdown-interaction-controller.js';
import {dispatchMultipleEvents, debounce} from '../shared/utils/event-utils.js';
import {classNames} from '../shared/utils/dom-utils.js';
import {renderMessage} from '../shared/utils/message-utils.js';
import {
  filterOptions,
  generateAutocompleteHint,
  type DropdownOption,
  type DropdownKeyboardHandler,
} from '../shared/dropdown/dropdown-utils.js';
import {renderDropdownOptions} from '../shared/dropdown/dropdown-render.js';
import {
  renderClearButton,
  createClearHandler,
} from '../shared/utils/clear-button-utils.js';

export type InputType =
  | 'hidden' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password'
  | 'datetime' | 'date' | 'month' | 'week' | 'time' | 'datetime-local'
  | 'number' | 'range' | 'color' | 'checkbox' | 'radio' | 'file'
  | 'submit' | 'image' | 'reset' | 'button';

@customElement('scientific-input')
export class ScientificInput
  extends LitElement
  implements DropdownKeyboardHandler
{
  static override styles = [
    baseComponentStyles,
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
        width: var(--input-width, 100%);
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

  @property({type: String})
  type: InputType = 'text';

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

  private clearHandler = createClearHandler(this, {
    resetValue: () => {
      this.inputValue = '';
      this.value = '';
    },
    additionalReset: () => {
      this.closeDropdown();
      this.autocompleteHint = '';
    },
    eventPrefix: 'option',
    onComplete: () => {
      const input = this.shadowRoot?.querySelector(
        '.input-field'
      ) as HTMLInputElement;
      input?.focus();
    },
  });

  private dropdownController = new DropdownInteractionController(this, {
    onBeforeOpen: () => {
      this.filterOptions();
      return (
        this.filteredOptions.length > 0 || this.inputValue.trim().length > 0
      );
    },
    onClose: () => {
      this.autocompleteHint = '';
    },
    keyboardConfig: () => ({
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
    }),
  });

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
    if (option.disabled) {
      return;
    }

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
    this.dropdownController.close();
  }

  openDropdown() {
    this.dropdownController.open();
  }

  private _debouncedFilter = debounce(() => {
    this._performFilter();
  }, 150);

  override connectedCallback() {
    super.connectedCallback();
    this.inputValue = this.value;
    this.filteredOptions = this.options;
  }

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

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }
    this.dropdownController.handleKeyDown(e);
  };

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

  private getValidationState(): 'default' | 'error' | 'success' {
    if (this.required && !this.inputValue.trim()) {
      return 'error';
    }

    if (this.state === 'success') {
      return 'success';
    }

    if (this.state === 'error' && this.errorMessage) {
      return 'error';
    }

    return 'default';
  }

  private getInputClasses() {
    const validationState = this.getValidationState();
    return classNames(
      'input-field',
      'scientific-input',
      this.required && 'required',
      validationState !== 'default' && validationState
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
            type="${this.type}"
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
            aria-haspopup="true"
            aria-autocomplete="list"
          />

          ${this.renderDropdown()}
          ${showClear
            ? renderClearButton({
                onClear: this.clearHandler,
                ariaLabel: 'Clear input',
                stopPropagation: false,
              })
            : ''}
          ${hasIcon ? html` <div class="input-icon">${this.icon}</div> ` : ''}
        </div>

        ${this.getValidationState() === 'error' && this.errorMessage
          ? html`
              ${renderMessage({type: 'error', content: this.errorMessage})}
            `
          : ''}
        ${this.getValidationState() === 'error' && !this.errorMessage && this.required && !this.inputValue.trim()
          ? html`
              ${renderMessage({type: 'error', content: 'This field is required'})}
            `
          : ''}
        ${this.getValidationState() === 'success' && this.successMessage
          ? html`
              ${renderMessage({type: 'success', content: this.successMessage})}
            `
          : ''}
      </div>
    `;
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('value')) {
      const selectedOption = this.options.find(opt => opt.value === this.value);
      if (selectedOption && this.inputValue !== selectedOption.label) {
        this.inputValue = selectedOption.label;
      } else if (!selectedOption && this.inputValue !== this.value) {
        this.inputValue = this.value;
      }
    }
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
