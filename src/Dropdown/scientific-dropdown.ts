import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('scientific-dropdown')
export class ScientificDropdown extends LitElement {
  static override styles = css`
    .dropdown-container {
      position: relative;
      display: inline-block;
      width: var(--dropdown-width, 100%);
      font-family: var(
        --dropdown-font-family,
        system-ui,
        -apple-system,
        sans-serif
      );
      z-index: var(--dropdown-container-z-index, 1);
    }

    .dropdown-label {
      margin-bottom: var(--dropdown-label-margin-bottom, 8px);
      display: block;
      font-size: var(--dropdown-label-font-size, 14px);
      font-weight: var(--dropdown-label-font-weight, 500);
      color: var(--dropdown-label-color, #374151);
    }

    .dropdown-select {
      width: 100%;
      padding: var(--dropdown-padding, 12px 16px);
      border: var(--dropdown-border, 2px solid #d1d5db);
      border-radius: var(--dropdown-border-radius, 8px);
      background-color: var(--dropdown-bg-color, #ffffff);
      color: var(--dropdown-color, #374151);
      font-size: var(--dropdown-font-size, 16px);
      cursor: pointer;
      transition: var(--dropdown-transition, all 0.2s ease-in-out);
      box-shadow: var(--dropdown-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: var(--dropdown-min-height, 48px);
    }

    .dropdown-select:hover {
      border-color: var(--dropdown-hover-border-color, #9ca3af);
      box-shadow: var(--dropdown-hover-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
    }

    .dropdown-select:focus {
      outline: none;
      border-color: var(--dropdown-focus-border-color, #007bff);
      box-shadow: var(
        --dropdown-focus-shadow,
        0 0 0 3px rgba(0, 123, 255, 0.1)
      );
    }

    .dropdown-select.open {
      border-color: var(--dropdown-open-border-color, #007bff);
    }

    .dropdown-select.disabled {
      background-color: var(--dropdown-disabled-bg-color, #f9fafb);
      border-color: var(--dropdown-disabled-border-color, #e5e7eb);
      color: var(--dropdown-disabled-color, #9ca3af);
      cursor: not-allowed;
    }

    .dropdown-arrow {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid var(--dropdown-arrow-color, #6b7280);
      transition: transform 0.2s ease-in-out;
      margin-left: 8px;
    }

    .dropdown-arrow.open {
      transform: rotate(180deg);
    }

    .dropdown-placeholder {
      color: var(--dropdown-placeholder-color, #9ca3af);
    }

    .options-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      border: var(--dropdown-options-border, 2px solid #d1d5db);
      border-top: none;
      border-radius: var(--dropdown-options-border-radius, 0 0 8px 8px);
      background-color: var(--dropdown-options-bg-color, #ffffff);
      box-shadow: var(
        --dropdown-options-shadow,
        0 10px 15px rgba(0, 0, 0, 0.1)
      );
      z-index: var(--dropdown-z-index, 1000);
      max-height: var(--dropdown-max-height, 200px);
      overflow-y: auto;
      animation: var(--dropdown-animation, slideDown 0.15s ease-out);
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
      padding: var(--dropdown-option-padding, 12px 16px);
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;
      border-bottom: var(--dropdown-option-border, 1px solid #f3f4f6);
      color: var(--dropdown-option-color, #374151);
      font-size: var(--dropdown-option-font-size, 16px);
    }

    .option:last-child {
      border-bottom: none;
    }

    .option:hover {
      background-color: var(--dropdown-option-hover-bg-color, #f9fafb);
    }

    .option.selected {
      background-color: var(--dropdown-option-selected-bg-color, #eff6ff);
      color: var(--dropdown-option-selected-color, #007bff);
      font-weight: var(--dropdown-option-selected-font-weight, 500);
    }

    .option.focused {
      background-color: var(--dropdown-option-focused-bg-color, #f3f4f6);
    }

    .search-input {
      width: 100%;
      padding: var(--dropdown-search-padding, 12px 16px);
      border: none;
      border-bottom: var(--dropdown-search-border, 1px solid #e5e7eb);
      background-color: var(--dropdown-search-bg-color, #f9fafb);
      font-size: var(--dropdown-search-font-size, 14px);
      outline: none;
    }

    .search-input:focus {
      background-color: var(--dropdown-search-focus-bg-color, #ffffff);
    }

    .no-options {
      padding: var(--dropdown-no-options-padding, 16px);
      text-align: center;
      color: var(--dropdown-no-options-color, #9ca3af);
      font-style: italic;
    }
  `;

  @property({type: String})
  label = 'Select an option';

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
      }, 0);
    }
  }

  private selectOption(value: string, label: string) {
    this.selectedValue = value;
    this.isOpen = false;
    this.focusedOptionIndex = -1;
    this.dispatchEvent(
      new CustomEvent('option-selected', {
        detail: {value, label},
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value, label},
        bubbles: true,
        composed: true,
      })
    );
  }

  private clearSelection() {
    this.selectedValue = '';
    this.dispatchEvent(
      new CustomEvent('option-cleared', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: '', label: ''},
        bubbles: true,
        composed: true,
      })
    );
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
          class="dropdown-select ${this.isOpen ? 'open' : ''} ${this.disabled
            ? 'disabled'
            : ''}"
          @click="${this.toggleDropdown}"
          role="combobox"
          aria-expanded="${this.isOpen}"
          aria-haspopup="listbox"
        >
          <span class="${!selectedLabel ? 'dropdown-placeholder' : ''}">
            ${selectedLabel || this.placeholder}
          </span>

          <div style="display: flex; align-items: center;">
            ${this.clearable && selectedLabel
              ? html`
                  <button
                    @click="${(e: Event) => {
                      e.stopPropagation();
                      this.clearSelection();
                    }}"
                    style="background: none; border: none; cursor: pointer; padding: 0 4px; color: #6b7280;"
                    title="Clear selection"
                  >
                    ✕
                  </button>
                `
              : ''}
            <div class="dropdown-arrow ${this.isOpen ? 'open' : ''}"></div>
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
                ${filteredOptions.length > 0
                  ? filteredOptions.map(
                      (option, index) => html`
                        <div
                          class="option ${option.value === this.selectedValue
                            ? 'selected'
                            : ''} ${index === this.focusedOptionIndex
                            ? 'focused'
                            : ''}"
                          @click="${() =>
                            this.selectOption(option.value, option.label)}"
                          role="option"
                          aria-selected="${option.value === this.selectedValue}"
                        >
                          ${option.label}
                        </div>
                      `
                    )
                  : html`<div class="no-options">${this.noOptionsText}</div>`}
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
