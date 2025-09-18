import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  sharedVariables,
  themeStyles,
  inputStyles,
  messageStyles,
  responsiveStyles,
  type ScientificTheme,
} from '../shared/styles/common-styles.js';
import {
  dropdownContainerStyles,
  clearButtonStyles,
} from '../shared/styles/dropdown-styles.js';
import {dropdownThemeStyles} from '../shared/styles/component-theme-styles.js';
import {dispatchCustomEvent} from '../shared/utils/event-utils.js';
import {classNames} from '../shared/utils/dom-utils.js';
import {
  handleDropdownKeyboard,
  filterOptions,
  createClickOutsideHandler,
  type DropdownOption,
  type DropdownKeyboardHandler,
} from '../shared/utils/dropdown-utils.js';
import {renderDropdownOptions} from '../shared/utils/dropdown-render.js';

export type DropdownTheme = ScientificTheme;

@customElement('scientific-dropdown')
export class ScientificDropdown
  extends LitElement
  implements DropdownKeyboardHandler
{
  static override styles = [
    sharedVariables,
    themeStyles,
    dropdownThemeStyles,
    inputStyles,
    messageStyles,
    responsiveStyles,
    dropdownContainerStyles,
    clearButtonStyles,
    css`
      :host {
        display: block;
        font-family: var(--scientific-font-family);
      }

      .dropdown-container {
        position: relative;
        display: block;
        width: var(--dropdown-width, 100%);
        min-width: var(--dropdown-min-width, auto);
        max-width: var(--dropdown-max-width, none);
        box-sizing: border-box;
        z-index: var(--dropdown-container-z-index, 1);
      }

      .dropdown-label {
        margin-bottom: var(--scientific-spacing-sm);
        display: block;
        font-size: var(--scientific-text-sm);
        font-weight: 500;
        color: var(--dropdown-label-color, #374151);
      }

      .dropdown-select {
        width: 100%;
        padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
        border: 1px solid var(--dropdown-border-color, #d1d5db);
        border-radius: var(--scientific-border-radius);
        background-color: var(--dropdown-bg-color, #ffffff);
        color: var(--dropdown-color, #374151);
        font-size: var(--scientific-text-sm);
        cursor: pointer;
        transition: var(--scientific-transition);
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 40px;
        outline: none;
      }

      .dropdown-select:hover {
        border-color: var(--dropdown-hover-border-color, #9ca3af);
      }

      .dropdown-select:focus {
        border-color: var(
          --dropdown-focus-border-color,
          var(--scientific-primary-color)
        );
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .dropdown-select.open {
        border-color: var(
          --dropdown-focus-border-color,
          var(--scientific-primary-color)
        );
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      .dropdown-select.disabled {
        background-color: #f9fafb;
        border-color: #e5e7eb;
        color: #9ca3af;
        cursor: not-allowed;
      }

      .dropdown-arrow {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid var(--dropdown-arrow-color, #6b7280);
        transition: transform var(--scientific-transition);
        margin-left: var(--scientific-spacing-sm);
      }

      .dropdown-arrow.open {
        transform: rotate(180deg);
      }

      .dropdown-placeholder {
        color: var(--dropdown-placeholder-color, #9ca3af);
      }

      @media (max-width: 768px) {
        .dropdown-select {
          min-height: 44px;
        }
      }
    `,
  ];

  @property({type: String})
  label = 'Select an option';

  @property({type: String, reflect: true})
  theme: ScientificTheme = 'default';

  @property({type: Array})
  options: DropdownOption[] = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
  ];

  @property({type: String})
  selectedValue = '';

  @property({type: Boolean})
  isOpen = false;

  @property({type: Boolean})
  disabled = false;

  @property({type: Boolean})
  searchable = false;

  @property({type: String})
  placeholder = 'Select an option';

  @property({type: Boolean})
  clearable = false;

  @property({type: String})
  noOptionsText = 'No options available';

  @property({type: String})
  searchPlaceholder = 'Search options...';

  @property({type: String})
  searchTerm = '';

  @property({type: Number})
  focusedOptionIndex = -1;

  // Implement DropdownKeyboardHandler interface
  get focusedIndex(): number {
    return this.focusedOptionIndex;
  }

  set focusedIndex(value: number) {
    this.focusedOptionIndex = value;
  }

  get filteredOptions(): DropdownOption[] {
    return this.getFilteredOptions();
  }

  private toggleDropdown() {
    if (this.disabled) return;
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  private syncOptionsWidth() {
    const dropdownSelect = this.shadowRoot?.querySelector(
      '.dropdown-select'
    ) as HTMLElement;
    const optionsContainer = this.shadowRoot?.querySelector(
      '.options-container'
    ) as HTMLElement;

    if (dropdownSelect && optionsContainer) {
      const dropdownWidth = dropdownSelect.offsetWidth;
      optionsContainer.style.width = `${dropdownWidth}px`;
      optionsContainer.style.minWidth = `${dropdownWidth}px`;
    }
  }

  selectOption(option: DropdownOption) {
    this.selectedValue = option.value;
    this.isOpen = false;
    this.focusedOptionIndex = -1;

    dispatchCustomEvent(this, 'option-selected', {
      value: option.value,
      label: option.label,
      timestamp: Date.now(),
    });

    dispatchCustomEvent(this, 'change', {
      value: option.value,
      label: option.label,
      timestamp: Date.now(),
    });
  }

  closeDropdown() {
    this.isOpen = false;
    this.focusedOptionIndex = -1;
  }

  openDropdown() {
    if (this.disabled) return;
    this.isOpen = true;
    this.focusedOptionIndex = -1;
    this.searchTerm = '';
    setTimeout(() => {
      if (this.searchable) {
        const searchInput = this.shadowRoot?.querySelector(
          '.search-input'
        ) as HTMLInputElement;
        searchInput?.focus();
      }
      // Ensure options container matches dropdown width
      this.syncOptionsWidth();
    }, 0);
  }

  private clearSelection() {
    this.selectedValue = '';

    dispatchCustomEvent(this, 'option-cleared', {
      timestamp: Date.now(),
    });

    dispatchCustomEvent(this, 'change', {
      value: '',
      label: '',
      timestamp: Date.now(),
    });
  }

  private handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.focusedOptionIndex = -1;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    handleDropdownKeyboard.call(this, e, {
      openOnNavigation: true,
      allowCustomValues: false,
    });
  }

  private getFilteredOptions(): DropdownOption[] {
    return filterOptions(this.options, this.searchable ? this.searchTerm : '');
  }

  private getSelectedLabel() {
    const selectedOption = this.options.find(
      (option) => option.value === this.selectedValue
    );
    return selectedOption?.label || '';
  }

  private handleClickOutside = createClickOutsideHandler(this, () => {
    this.closeDropdown();
  });

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  override render() {
    const selectedLabel = this.getSelectedLabel();

    return html`
      <div
        class="dropdown-container"
        @keydown="${this.handleKeyDown}"
        tabindex="0"
      >
        ${this.label
          ? html`<label class="dropdown-label">${this.label}</label>`
          : ''}

        <div
          class="${classNames({
            'dropdown-select': true,
            open: this.isOpen,
            disabled: this.disabled,
          })}"
          @click="${this.toggleDropdown}"
          role="combobox"
          aria-expanded="${this.isOpen}"
          aria-haspopup="listbox"
        >
          <span
            class="${classNames({
              'dropdown-placeholder': !selectedLabel,
            })}"
          >
            ${selectedLabel || this.placeholder}
          </span>

          <div style="display: flex; align-items: center;">
            ${this.clearable && selectedLabel
              ? html`
                  <button
                    class="clear-button"
                    @click="${(e: Event) => {
                      e.stopPropagation();
                      this.clearSelection();
                    }}"
                    title="Clear selection"
                    aria-label="Clear selection"
                  >
                    ✕
                  </button>
                `
              : ''}
            <div
              class="${classNames({
                'dropdown-arrow': true,
                open: this.isOpen,
              })}"
            ></div>
          </div>
        </div>

        ${renderDropdownOptions({
          isOpen: this.isOpen,
          filteredOptions: this.filteredOptions,
          focusedIndex: this.focusedIndex,
          selectedValue: this.selectedValue,
          searchable: this.searchable,
          searchPlaceholder: this.searchPlaceholder,
          searchTerm: this.searchTerm,
          noOptionsText: this.noOptionsText,
          onOptionClick: (option) => this.selectOption(option),
          onSearchInput: this.handleSearch.bind(this),
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-dropdown': ScientificDropdown;
  }
}
