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
  dropdownBaseStyles,
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
    dropdownBaseStyles,
    dropdownContainerStyles,
    clearButtonStyles,
    css`
      :host {
        display: block;
        font-family: var(--scientific-font-family);
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
