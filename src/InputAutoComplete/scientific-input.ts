import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Option {
  label: string;
  value: string;
}

@customElement('autocomplete-dropdown')
export class AutocompleteDropdown extends LitElement {
  static override styles = css`
    .dropdown-container {
      position: relative;
      display: inline-block;
      width: 100%;
    }
    .dropdown-label {
      margin-bottom: 8px;
      display: block;
      font-size: var(--dropdown-label-font-size, 16px);
    }
    .dropdown-input {
      width: 100%;
      padding: 8px;
      border: var(--dropdown-border, 1px solid #c5c5c5);
      border-radius: var(--dropdown-border-radius, 4px);
      background-color: var(--dropdown-bg-color, #fff);
      cursor: pointer;
      font-size: 16px;
    }
    .options-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      border: 1px solid #000000;
      background-color: #fff;
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .option {
      padding: 8px;
      cursor: pointer;
      font-size: 16px;
    }
    .option[aria-selected='true'],
    .option:hover {
      background-color: #007bff;
      color: white;
    }
  `;

  @property({type: String})
  label = 'Select an option';

  @property({ type: Array })
  options: Option[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  @state()
  private inputValue = '';

  @state()
  private filteredOptions: Option[] = [];

  @state()
  private highlightedIndex = -1;

  @state()
  private isOpen = false;

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    this.filterOptions();
    this.isOpen = true;
  }

  private filterOptions() {
    this.filteredOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(this.inputValue.toLowerCase())
    );
    this.highlightedIndex = -1;
  }

  private handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        if (this.highlightedIndex < this.filteredOptions.length - 1) {
          this.highlightedIndex++;
        }
        break;
      case 'ArrowUp':
        if (this.highlightedIndex > 0) {
          this.highlightedIndex--;
        }
        break;
      case 'Enter':
        if (
          this.highlightedIndex >= 0 &&
          this.filteredOptions[this.highlightedIndex]
        ) {
          this.selectOption(this.filteredOptions[this.highlightedIndex]);
        }
        break;
      case 'Escape':
        this.isOpen = false;
        break;
    }
  }

  private selectOption(option: Option) {
    this.inputValue = option.label;
    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent('option-selected', { detail: option.value })
    );
  }

  private handleItemClick(option: Option) {
    this.selectOption(option);
  }

  override render() {
    return html`
      <div class="dropdown-container">
        <label class="dropdown-label">${this.label}</label>
        <input
          type="text"
          class="dropdown-input"
          .value="${this.inputValue}"
          @input="${this.handleInput}"
          @keydown="${this.handleKeydown}"
          placeholder="Type to search..."
        />
        ${this.isOpen && this.filteredOptions.length > 0
          ? html`
              <div class="options-container">
                ${this.filteredOptions.map(
                  (option, index) => html`
                    <div
                      class="option"
                      aria-selected="${this.highlightedIndex === index}"
                      @click="${() => this.handleItemClick(option)}"
                    >
                      ${option.label}
                    </div>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'autocomplete-dropdown': AutocompleteDropdown;
  }
}
