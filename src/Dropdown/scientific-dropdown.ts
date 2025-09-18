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
import {dispatchCustomEvent} from '../shared/utils/event-utils.js';
import {classNames} from '../shared/utils/dom-utils.js';

export type DropdownTheme = ScientificTheme;

@customElement('scientific-dropdown')
export class ScientificDropdown extends LitElement {
  static override styles = [
    sharedVariables,
    themeStyles,
    inputStyles,
    messageStyles,
    responsiveStyles,
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

      .options-container {
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--dropdown-border-color, #d1d5db);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: var(--scientific-border-radius);
        border-bottom-right-radius: var(--scientific-border-radius);
        background-color: var(--dropdown-options-bg-color, #ffffff);
        box-shadow: var(--scientific-shadow-lg);
        z-index: 1000;
        max-height: 200px;
        overflow: hidden;
        animation: slideDown 0.15s ease-out;
        display: flex;
        flex-direction: column;
      }

      .options-list {
        overflow-y: auto;
        flex: 1;
        max-height: inherit;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .option {
        padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
        cursor: pointer;
        transition: background-color var(--scientific-transition-fast);
        border-bottom: 1px solid #f3f4f6;
        color: var(--dropdown-option-color, #374151);
        font-size: var(--scientific-text-sm);
      }

      .option:last-child {
        border-bottom: none;
      }

      .option:hover {
        background-color: var(--dropdown-option-hover-bg-color, #f9fafb);
      }

      .option.selected {
        background-color: var(--dropdown-option-selected-bg-color, #eff6ff);
        color: var(
          --dropdown-option-selected-color,
          var(--scientific-primary-color)
        );
        font-weight: 500;
      }

      .option.focused {
        background-color: var(--dropdown-option-focused-bg-color, #f3f4f6);
      }

      .search-input {
        width: 100%;
        border: none;
        border-bottom: 1px solid #e5e7eb;
        background-color: #f9fafb;
        font-size: var(--scientific-text-sm);
        padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
        box-sizing: border-box;
        outline: none;
        font-family: inherit;
        color: #374151;
      }

      .search-input:focus {
        background-color: #ffffff;
      }

      .no-options {
        padding: var(--scientific-spacing-md);
        text-align: center;
        color: #9ca3af;
        font-style: italic;
        font-size: var(--scientific-text-sm);
      }

      .clear-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0 var(--scientific-spacing-xs);
        color: #6b7280;
        font-size: 14px;
        line-height: 1;
        transition: color var(--scientific-transition);
      }

      .clear-button:hover {
        color: var(--scientific-danger-color);
      }

      @media (max-width: 768px) {
        .dropdown-select {
          min-height: 44px;
        }

        .options-container {
          max-height: 150px;
        }
      }
    `,
  ];

  @property({type: String})
  label = 'Select an option';

  @property({type: String, reflect: true})
  theme: ScientificTheme = 'default';

  @property({type: Array})
  options: {label: string; value: string}[] = [
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

  private toggleDropdown() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.focusedOptionIndex = -1;
    if (this.isOpen) {
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

  private selectOption(value: string, label: string) {
    this.selectedValue = value;
    this.isOpen = false;
    this.focusedOptionIndex = -1;

    dispatchCustomEvent(this, 'option-selected', {
      value,
      label,
      timestamp: Date.now(),
    });

    dispatchCustomEvent(this, 'change', {
      value,
      label,
      timestamp: Date.now(),
    });
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

    const filteredOptions = this.getFilteredOptions();

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
        } else if (
          this.focusedOptionIndex >= 0 &&
          filteredOptions[this.focusedOptionIndex]
        ) {
          const option = filteredOptions[this.focusedOptionIndex];
          this.selectOption(option.value, option.label);
        }
        break;

      case 'Escape':
        this.isOpen = false;
        this.focusedOptionIndex = -1;
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
        } else {
          this.focusedOptionIndex = Math.min(
            this.focusedOptionIndex + 1,
            filteredOptions.length - 1
          );
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (this.isOpen) {
          this.focusedOptionIndex = Math.max(this.focusedOptionIndex - 1, -1);
        }
        break;

      case 'Tab':
        this.isOpen = false;
        this.focusedOptionIndex = -1;
        break;
    }
  }

  private getFilteredOptions() {
    if (!this.searchable || !this.searchTerm) {
      return this.options;
    }
    return this.options.filter((option) =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  private getSelectedLabel() {
    const selectedOption = this.options.find(
      (option) => option.value === this.selectedValue
    );
    return selectedOption?.label || '';
  }

  private handleClickOutside = (e: Event) => {
    const path = e.composedPath();
    const clickedInsideDropdown = path.includes(this);

    if (!clickedInsideDropdown) {
      this.isOpen = false;
      this.focusedOptionIndex = -1;
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  override render() {
    const filteredOptions = this.getFilteredOptions();
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

        ${this.isOpen
          ? html`
              <div class="options-container" role="listbox">
                ${this.searchable
                  ? html`
                      <input
                        class="search-input"
                        type="text"
                        placeholder="${this.searchPlaceholder}"
                        .value="${this.searchTerm}"
                        @input="${this.handleSearch}"
                        @click="${(e: Event) => e.stopPropagation()}"
                      />
                    `
                  : ''}
                <div class="options-list">
                  ${filteredOptions.length > 0
                    ? filteredOptions.map(
                        (option, index) => html`
                          <div
                            class="${classNames({
                              option: true,
                              selected: option.value === this.selectedValue,
                              focused: index === this.focusedOptionIndex,
                            })}"
                            @click="${() =>
                              this.selectOption(option.value, option.label)}"
                            role="option"
                            aria-selected="${option.value ===
                            this.selectedValue}"
                          >
                            ${option.label}
                          </div>
                        `
                      )
                    : html`<div class="no-options">${this.noOptionsText}</div>`}
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-dropdown': ScientificDropdown;
  }
}
