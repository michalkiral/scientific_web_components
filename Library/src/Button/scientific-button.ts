import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('scientific-button')
export class ScientificButton extends LitElement {
  static override styles = css`
    button {
      transition: .5s ease-in-out;
      font-size: var(--button-font-size, 16px);
      padding: var(--button-padding, 8px 16px);
      background-color: var(--button-bg-color, #007bff);
      color: var(--button-color, white);
      cursor: pointer;
      border: none;
      border-radius: var(--button-border-radius, 4px);
    }

    button:hover {
      transition: .5s ease-in-out;
      background-color: var(--button-hover-bg-color, #034994);
    }

    button[disabled] {
      background-color: var(--button-disabled-bg-color, #cccccc);
      cursor: not-allowed;
    }
  `;

  @property({attribute: false})
  action: (() => void) | undefined;

  @property({type: Boolean})
  loading = false;

  @property({type: String})
  label = 'Click Me';

  private async _onClick() {
    if (this.action) {
      this.dispatchEvent(new CustomEvent('custom-button-action-start'));
      this.loading = true;
      try {
        await this.action();
        this.dispatchEvent(
          new CustomEvent('custom-button-action-complete')
        );
      } finally {
        this.loading = false;
      }
    }
  }

  override render() {
    return html`
      <button @click=${this._onClick}>
        ${this.loading ? 'Processing...' : this.label}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-button': ScientificButton;
  }
}
