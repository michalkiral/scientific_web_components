import {LitElement, html} from 'lit';
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
import {baseComponentStyles} from '../shared/styles/base-component-styles.js';
import {DropdownInteractionController} from '../shared/dropdown/dropdown-interaction-controller.js';
import {dispatchCustomEvent} from '../shared/utils/event-utils.js';
import {classNames} from '../shared/utils/dom-utils.js';
import {
  filterOptions,
  type DropdownOption,
  type DropdownKeyboardHandler,
} from '../shared/dropdown/dropdown-utils.js';
import {renderDropdownOptions} from '../shared/dropdown/dropdown-render.js';
import {
  renderClearButton,
  createClearHandler,
} from '../shared/utils/clear-button-utils.js';

@customElement('scientific-dropdown')
export class ScientificDropdown
  extends LitElement
  implements DropdownKeyboardHandler
{
  static override styles = [
    baseComponentStyles,
    sharedVariables,
    themeStyles,
    dropdownThemeStyles,
    inputStyles,
    messageStyles,
    responsiveStyles,
    dropdownBaseStyles,
    dropdownContainerStyles,
    clearButtonStyles,
  ];

  @property({type: String})
  label = '';

  @property({type: String, reflect: true})
  theme: ScientificTheme = 'default';

  @property({type: Array})
  options: DropdownOption[] = [];

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

  private clearHandler = createClearHandler(this, {
    resetValue: () => { this.selectedValue = ''; },
    eventPrefix: 'option',
  });

  private dropdownController = new DropdownInteractionController(this, {
    onBeforeOpen: () => {
      if (!this.isOpen) {
        this.searchTerm = '';
      }
      return true;
    },
    onOpen: () => {
      this.updateComplete.then(() => {
        if (this.searchable) {
          const searchInput = this.shadowRoot?.querySelector(
            '.search-input'
          ) as HTMLInputElement | null;
          searchInput?.focus();
        }
        this.syncOptionsWidth();
      });
    },
    keyboardConfig: () => ({
      openOnNavigation: true,
      allowCustomValues: false,
    }),
  });

  get focusedIndex(): number {
    return this.focusedOptionIndex;
  }

  set focusedIndex(value: number) {
    this.focusedOptionIndex = value;
  }

  get filteredOptions(): DropdownOption[] {
    return this.getFilteredOptions();
  }

  private toggleDropdown = () => {
    this.dropdownController.toggle();
  };

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
    this.dropdownController.close();
  }

  openDropdown() {
    this.dropdownController.open();
  }

  private handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    const cursorPosition = target.selectionStart;
    this.searchTerm = target.value;
    this.focusedOptionIndex = -1;
    
    this.updateComplete.then(() => {
      const searchInput = this.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
      if (searchInput && document.activeElement !== searchInput) {
        searchInput.focus();
        if (cursorPosition !== null) {
          searchInput.setSelectionRange(cursorPosition, cursorPosition);
        }
      }
    });
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }
    this.dropdownController.handleKeyDown(e);
  };

  private getFilteredOptions(): DropdownOption[] {
    return filterOptions(this.options, this.searchable ? this.searchTerm : '');
  }

  private getSelectedLabel() {
    const selectedOption = this.options.find(
      (option) => option.value === this.selectedValue
    );
    return selectedOption?.label || '';
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
          aria-haspopup="true"
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
              ? renderClearButton({
                  onClear: this.clearHandler,
                  ariaLabel: 'Clear selection',
                  title: 'Clear selection',
                })
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


