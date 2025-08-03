import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../Button/scientific-button';

@customElement('scientific-form')
export class ScientificForm extends LitElement {
  static override styles = css`
    .form-container {
      position: relative;
      background-color: var(--form-bg-color, #ffffff);
      border: var(--form-border, 2px solid #e5e7eb);
      border-radius: var(--form-border-radius, 12px);
      padding: var(--form-padding, 24px);
      margin: var(--form-margin, 0);
      max-width: var(--form-max-width, 600px);
      width: var(--form-width, 100%);
      min-height: var(--form-min-height, auto);
      box-shadow: var(--form-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
      transition: var(--form-transition, all 0.2s ease-in-out);
      font-family: var(
        --form-font-family,
        system-ui,
        -apple-system,
        sans-serif
      );
      display: flex;
      flex-direction: column;
      gap: var(--form-gap, 20px);
    }

    .form-container:hover {
      box-shadow: var(--form-hover-shadow, 0 8px 12px rgba(0, 0, 0, 0.15));
    }

    .form-container.disabled {
      opacity: var(--form-disabled-opacity, 0.6);
      pointer-events: none;
    }

    .form-container.loading {
      position: relative;
    }

    .form-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(
        --form-loading-overlay-bg,
        rgba(255, 255, 255, 0.8)
      );
      border-radius: var(--form-border-radius, 12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--form-loading-z-index, 10);
    }

    .form-loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--form-loading-spinner-color, #e5e7eb);
      border-top: 3px solid var(--form-loading-spinner-active-color, #007bff);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .form-header {
      display: flex;
      flex-direction: column;
      gap: var(--form-header-gap, 8px);
      padding-bottom: var(--form-header-padding-bottom, 16px);
      border-bottom: var(--form-header-border, 1px solid #f3f4f6);
    }

    .form-title {
      font-size: var(--form-title-font-size, 24px);
      font-weight: var(--form-title-font-weight, 600);
      color: var(--form-title-color, #111827);
      margin: 0;
      line-height: var(--form-title-line-height, 1.2);
    }

    .form-subtitle {
      font-size: var(--form-subtitle-font-size, 16px);
      font-weight: var(--form-subtitle-font-weight, 400);
      color: var(--form-subtitle-color, #6b7280);
      margin: 0;
      line-height: var(--form-subtitle-line-height, 1.4);
    }

    .form-content {
      display: flex;
      flex-direction: column;
      gap: var(--form-content-gap, 16px);
      flex: 1;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: var(--form-section-gap, 12px);
    }

    .form-section-title {
      font-size: var(--form-section-title-font-size, 18px);
      font-weight: var(--form-section-title-font-weight, 500);
      color: var(--form-section-title-color, #374151);
      margin: 0 0 8px 0;
      padding-bottom: var(--form-section-title-padding-bottom, 4px);
      border-bottom: var(--form-section-title-border, 1px solid #f3f4f6);
    }

    .form-error {
      background-color: var(--form-error-bg-color, #fef2f2);
      border: var(--form-error-border, 1px solid #fecaca);
      border-radius: var(--form-error-border-radius, 8px);
      padding: var(--form-error-padding, 12px 16px);
      color: var(--form-error-color, #dc2626);
      font-size: var(--form-error-font-size, 14px);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-success {
      background-color: var(--form-success-bg-color, #f0fdf4);
      border: var(--form-success-border, 1px solid #bbf7d0);
      border-radius: var(--form-success-border-radius, 8px);
      padding: var(--form-success-padding, 12px 16px);
      color: var(--form-success-color, #16a34a);
      font-size: var(--form-success-font-size, 14px);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-footer {
      display: flex;
      justify-content: var(--form-footer-justify, flex-end);
      align-items: center;
      gap: var(--form-footer-gap, 12px);
      padding-top: var(--form-footer-padding-top, 16px);
      border-top: var(--form-footer-border, 1px solid #f3f4f6);
      flex-wrap: wrap;
    }

    .form-footer.full-width {
      flex-direction: column;
      align-items: stretch;
    }

    .form-footer.full-width scientific-button {
      width: 100%;
      display: block;
    }

    .form-footer.center {
      justify-content: center;
    }

    .form-footer.start {
      justify-content: flex-start;
    }

    .form-footer.space-between {
      justify-content: space-between;
    }

    .form-progress {
      width: 100%;
      height: var(--form-progress-height, 4px);
      background-color: var(--form-progress-bg-color, #f3f4f6);
      border-radius: var(--form-progress-border-radius, 2px);
      overflow: hidden;
      margin-bottom: 8px;
    }

    .form-progress-bar {
      height: 100%;
      background-color: var(--form-progress-color, #007bff);
      transition: width 0.3s ease-in-out;
      border-radius: var(--form-progress-border-radius, 2px);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .form-container {
        padding: var(--form-mobile-padding, 16px);
        margin: var(--form-mobile-margin, 0);
        border-radius: var(--form-mobile-border-radius, 8px);
      }

      .form-footer {
        flex-direction: column-reverse;
        align-items: stretch;
      }

      .form-footer scientific-button {
        width: 100%;
      }
    }

    /* Compact variant */
    .form-container.compact {
      padding: var(--form-compact-padding, 16px);
      gap: var(--form-compact-gap, 12px);
    }

    .form-container.compact .form-header {
      padding-bottom: var(--form-compact-header-padding-bottom, 8px);
    }

    .form-container.compact .form-content {
      gap: var(--form-compact-content-gap, 12px);
    }

    .form-container.compact .form-footer {
      padding-top: var(--form-compact-footer-padding-top, 8px);
    }
  `;

  @property({type: String})
  override title = '';

  @property({type: String})
  subtitle = '';

  @property({type: String})
  variant: 'default' | 'compact' | 'elevated' = 'default';

  @property({type: String})
  submitLabel = 'Submit';

  @property({type: String})
  cancelLabel = 'Cancel';

  @property({type: String})
  loadingLabel = 'Processing...';

  @property({type: String})
  submitVariant:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success' = 'primary';

  @property({type: String})
  cancelVariant:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success' = 'outline';

  @property({type: Boolean})
  isLoading = false;

  @property({type: Boolean})
  disabled = false;

  @property({type: Boolean})
  showCancel = true;

  @property({type: Boolean})
  showProgress = false;

  @property({type: Number})
  progress = 0;

  @property({type: String})
  errorMessage = '';

  @property({type: String})
  successMessage = '';

  @property({type: String})
  footerLayout: 'end' | 'start' | 'center' | 'space-between' | 'full-width' =
    'end';

  @property({type: Boolean})
  autoFocus = false;

  @property({type: String})
  method: 'get' | 'post' = 'post';

  @property({type: String})
  action = '';

  @property({type: String})
  enctype:
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain' = 'application/x-www-form-urlencoded';

  @property({type: Boolean})
  noValidate = false;

  @property({attribute: false})
  onSubmit?: (formData: FormData) => Promise<void>;

  @property({attribute: false})
  onCancel?: () => void;

  @property({attribute: false})
  onReset?: () => void;

  private async _handleSubmit(e?: Event) {
    e?.preventDefault();

    if (this.isLoading || this.disabled) return;

    const form = this.shadowRoot?.querySelector('form') as HTMLFormElement;
    if (!form) return;

    // Validate form if not noValidate
    if (!this.noValidate && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    this.dispatchEvent(
      new CustomEvent('form-submit-start', {
        detail: {formData, originalEvent: e},
      })
    );

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      if (this.onSubmit) {
        await this.onSubmit(formData);
      } else if (this.action) {
        // Native form submission
        form.submit();
        return;
      }

      this.successMessage = 'Form submitted successfully!';
      this.dispatchEvent(
        new CustomEvent('form-submit-success', {
          detail: {formData},
        })
      );
    } catch (error) {
      this.errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      this.dispatchEvent(
        new CustomEvent('form-submit-error', {
          detail: {error, formData},
        })
      );
    } finally {
      this.isLoading = false;
    }
  }

  private _handleCancel() {
    if (this.isLoading) return;

    this.dispatchEvent(new CustomEvent('form-cancel'));
    this.onCancel?.();
  }

  private _handleReset() {
    if (this.isLoading) return;

    const form = this.shadowRoot?.querySelector('form') as HTMLFormElement;
    form?.reset();

    this.errorMessage = '';
    this.successMessage = '';
    this.progress = 0;

    this.dispatchEvent(new CustomEvent('form-reset'));
    this.onReset?.();
  }

  private _getFormClasses() {
    const classes = ['form-container'];

    if (this.variant !== 'default') {
      classes.push(this.variant);
    }

    if (this.disabled) {
      classes.push('disabled');
    }

    if (this.isLoading) {
      classes.push('loading');
    }

    return classes.join(' ');
  }

  private _getFooterClasses() {
    const classes = ['form-footer'];

    if (this.footerLayout !== 'end') {
      classes.push(this.footerLayout);
    }

    return classes.join(' ');
  }

  override firstUpdated() {
    if (this.autoFocus) {
      // Focus first form input
      const firstInput = this.querySelector(
        'input, select, textarea'
      ) as HTMLElement;
      firstInput?.focus();
    }
  }

  override render() {
    return html`
      <form
        class="${this._getFormClasses()}"
        method="${this.method}"
        action="${ifDefined(this.action || undefined)}"
        enctype="${this.enctype}"
        ?novalidate="${this.noValidate}"
        @submit="${this._handleSubmit}"
        @reset="${this._handleReset}"
        role="form"
        aria-busy="${this.isLoading}"
      >
        ${this.isLoading
          ? html`
              <div class="form-loading-overlay">
                <div class="form-loading-spinner"></div>
              </div>
            `
          : ''}
        ${this.title || this.subtitle
          ? html`
              <div class="form-header">
                <slot name="header">
                  ${this.title
                    ? html`<h2 class="form-title">${this.title}</h2>`
                    : ''}
                  ${this.subtitle
                    ? html`<p class="form-subtitle">${this.subtitle}</p>`
                    : ''}
                </slot>
              </div>
            `
          : ''}
        ${this.showProgress
          ? html`
              <div class="form-progress">
                <div
                  class="form-progress-bar"
                  style="width: ${this.progress}%"
                  role="progressbar"
                  aria-valuenow="${this.progress}"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            `
          : ''}
        ${this.errorMessage
          ? html`
              <div class="form-error" role="alert">
                <span>⚠️</span>
                <span>${this.errorMessage}</span>
              </div>
            `
          : ''}
        ${this.successMessage
          ? html`
              <div class="form-success" role="status">
                <span>✅</span>
                <span>${this.successMessage}</span>
              </div>
            `
          : ''}

        <div class="form-content">
          <slot></slot>
        </div>

        <div class="${this._getFooterClasses()}">
          <slot name="footer">
            ${this.showCancel
              ? html`
                  <scientific-button
                    .label="${this.cancelLabel}"
                    .variant="${this.cancelVariant}"
                    .disabled="${this.isLoading}"
                    .fullWidth="${this.footerLayout === 'full-width'}"
                    type="button"
                    @click="${this._handleCancel}"
                  ></scientific-button>
                `
              : ''}
            <scientific-button
              .label="${this.isLoading ? this.loadingLabel : this.submitLabel}"
              .variant="${this.submitVariant}"
              .loading="${this.isLoading}"
              .disabled="${this.disabled}"
              .fullWidth="${this.footerLayout === 'full-width'}"
              type="submit"
            ></scientific-button>
          </slot>
        </div>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-form': ScientificForm;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-form': ScientificForm;
  }
}
