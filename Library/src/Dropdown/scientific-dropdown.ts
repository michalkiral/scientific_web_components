import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('scientific-dropdown')
export class ScientificDropdown extends LitElement {
  static override styles = css`
    .dropdown-container {
      position: relative;
      display: inline-block;
      width: 50%;
    }

    .dropdown-label {
      margin-bottom: 8px;
      display: block;
      font-size: var(--dropdown-label-font-size, 16px);
    }

    .dropdown-select {
      width: 100%;
      padding: 8px;
      border: var(--dropdown-border, 1px solid #c5c5c5);
      border-radius: var(--dropdown-border-radius, 4px);
      background-color: var(--dropdown-bg-color, #fff);
      cursor: pointer;
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
    }

    .option {
      padding: 8px;
      cursor: pointer;
    }

    .option:hover {
      background-color: #f0f0f0;
    }
  `;

  @property({ type: String })
  label = 'Select an option';

  @property({ type: Array })
  options: { label: string; value: string }[] = [{label: "Option 1", value: "1"}, {label: "Option 2", value: "2"}];

  @property({ type: String })
  selectedValue = '';

  @property({ type: Boolean})
  isOpen = false;

  private toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  private selectOption(value: string) {
    this.selectedValue = value;
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('option-selected', { detail: value }));
  }

  override render() {
    return html`
      <div class="dropdown-container">
        <label class="dropdown-label">${this.label}</label>
        <div class="dropdown-select" @click="${this.toggleDropdown}">
          ${this.selectedValue || 'Select an option'}
        </div>
        ${this.isOpen
          ? html`<div class="options-container">
              ${this.options.map(
                (option) => html`
                  <div class="option" @click="${() => this.selectOption(option.label)}">
                    ${option.label}
                  </div>
                `
              )}
            </div>`
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
