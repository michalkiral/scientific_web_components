import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../Button/scientific-button';

@customElement('scientific-form')
export class ScientificForm extends LitElement {
  static override styles = css`
    .form-container {
      border: var(--form-border, 1px solid #ddd);
      padding: var(--form-padding, 16px);
      background-color: var(--form-bg-color, #f9f9f9);
      border-radius: var(--form-border-radius, 8px);
      max-width: var(--form-max-width, 600px);
      margin: 20px auto;
    }

    .form-section {
      margin-bottom: 16px;
    }

    .form-header {
      font-size: var(--form-header-font-size, 24px);
      margin-bottom: 8px;
    }

    .form-footer {
      text-align: right;
      margin-top: 20px;
    }

    scientific-button {
      margin-left: 8px;
    }

    .section-title {
      font-size: var(--section-title-font-size, 18px);
      margin-bottom: 4px;
    }
  `;

  @property({type: Boolean})
  isLoading = false;

  @property({type: String})
  formTitle = 'Scientific Form';

  @property({type: String})
  submitLabel = 'Submit';

  @property({type: String})
  cancelLabel = 'Cancel';

  @property({ attribute: false })
  onSubmit?: () => Promise<void>;

  @property({ attribute: false })
  onCancel?: () => void;

  private async _handleSubmit() {
    if (this.onSubmit) {
      this.isLoading = true;
      try {
        await this.onSubmit();
      } finally {
        this.isLoading = false;
      }
    }
  }

  private _handleCancel() {
    if (this.onCancel) {
      this.onCancel();
    }
  }

  override render() {
    return html`
      <div class="form-container">
        <div class="form-header">${this.formTitle}</div>

        <div class="form-section">
          <div class="section-title">Personal Information</div>
          <slot name="personal-info"></slot>
        </div>

        <div class="form-section">
          <div class="section-title">Scientific Data</div>
          <slot name="scientific-data"></slot>
        </div>

        <div class="form-footer">
          <scientific-button 
            .label="${this.cancelLabel}" 
            @click="${() => this._handleCancel()}"
            ?loading="${this.isLoading}"
          ></scientific-button>
          <scientific-button
            .label="${this.isLoading ? 'Submitting...' : this.submitLabel}" 
            @click="${() => this._handleSubmit()}"
            ?loading="${this.isLoading}"
          ></scientific-button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-form': ScientificForm;
  }
}
