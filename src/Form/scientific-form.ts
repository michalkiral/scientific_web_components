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
      margin: var(--form-margin, 20px auto);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-header {
      font-size: var(--form-header-font-size, 24px);
      font-weight: bold;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    scientific-button {
      min-width: var(--button-min-width, 100px);
    }
  `;

  @property({type: String})
  formBgColor = '#f9f9f9';
  @property({type: String})
  formPadding = '16px';
  @property({type: String})
  formBorder = '1px solid #ddd';

  @property({type: Boolean})
  isLoading = false;

  @property({type: String})
  formTitle = 'Scientific Form';
  @property({type: String})
  submitLabel = 'Submit';
  @property({type: String})
  loadingLabel = 'Submitting...';
  @property({type: String})
  cancelLabel = 'Cancel';

  @property({ attribute: false })
  onSubmit?: () => Promise<void>;
  @property({ attribute: false })
  onCancel?: () => void;

  private async _handleSubmit() {
    if (this.isLoading || !this.onSubmit) return;
    
    this.dispatchEvent(new CustomEvent('scientific-form-submit-start'));
    this.isLoading = true;

    try {
      await this.onSubmit();
      this.dispatchEvent(new CustomEvent('scientific-form-submit-success'));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('scientific-form-submit-error', { detail: error }));
    } finally {
      this.isLoading = false;
    }
  }

  private _handleCancel() {
    this.dispatchEvent(new CustomEvent('scientific-form-cancel'));
    this.onCancel?.();
  }

  override render() {
    return html`
      <div 
        class="form-container" 
        style="
          background-color: ${this.formBgColor}; 
          padding: ${this.formPadding}; 
          border: ${this.formBorder};
        "
        role="form"
      >
        <slot name="header">
          <div class="form-header">${this.formTitle}</div>
        </slot>

        <div class="form-section">
          <slot name="form-fields"></slot>
        </div>

        <div class="form-footer">
          <slot name="actions">
            <scientific-button 
              .label="${this.cancelLabel}" 
              @click="${() => this._handleCancel()}"
            ></scientific-button>
            <scientific-button
              .label="${this.isLoading ? this.loadingLabel : this.submitLabel}" 
              @click="${() => this._handleSubmit()}"
              ?loading="${this.isLoading}"
            ></scientific-button>
          </slot>
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
