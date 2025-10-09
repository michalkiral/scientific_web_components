import {html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../Button/scientific-button';
import {ScientificSurfaceBase} from '../shared/components/scientific-surface-base.js';
import {
  sharedVariables,
  containerStyles,
  headerStyles,
  messageStyles,
  loadingSpinnerStyles,
  responsiveStyles,
  themeStyles,
} from '../shared/styles/common-styles.js';
import {formThemeStyles} from '../shared/styles/component-theme-styles.js';
import {baseComponentStyles} from '../shared/styles/base-component-styles.js';

type FormMethod = 'GET' | 'POST' | 'dialog';

import {dispatchCustomEvent} from '../shared/utils/event-utils.js';
import {classNames} from '../shared/utils/dom-utils.js';

@customElement('scientific-form')
export class ScientificForm extends ScientificSurfaceBase {
  static override styles = [
    baseComponentStyles,
    sharedVariables,
    themeStyles,
    formThemeStyles,
    containerStyles,
    headerStyles,
    messageStyles,
    loadingSpinnerStyles,
    responsiveStyles,
    css`
      .form-container {
        max-width: var(--form-max-width, 600px);
        width: var(--form-width, 100%);
        min-height: var(--form-min-height, auto);
      }

      .form-container.loading {
        position: relative;
      }

      .form-content {
        display: flex;
        flex-direction: column;
        gap: var(--form-content-gap, var(--scientific-spacing-lg));
        flex: 1;
      }

      .form-section {
        display: flex;
        flex-direction: column;
        gap: var(--form-section-gap, var(--scientific-spacing-md));
      }

      .form-section-title {
        font-size: var(
          --form-section-title-font-size,
          var(--scientific-text-lg)
        );
        font-weight: var(--form-section-title-font-weight, 500);
        color: var(--form-section-title-color, #374151);
        margin: 0 0 var(--scientific-spacing-sm) 0;
        padding-bottom: var(
          --form-section-title-padding-bottom,
          var(--scientific-spacing-xs)
        );
        border-bottom: var(--form-section-title-border, 1px solid #f3f4f6);
      }

      .form-footer {
        display: flex;
        justify-content: var(--form-footer-justify, flex-end);
        align-items: center;
        gap: var(--form-footer-gap, var(--scientific-spacing-md));
        padding-top: var(
          --form-footer-padding-top,
          var(--scientific-spacing-lg)
        );
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
        height: var(--form-progress-height, var(--scientific-spacing-xs));
        background-color: var(--form-progress-bg-color, #f3f4f6);
        border-radius: var(
          --form-progress-border-radius,
          var(--scientific-border-radius)
        );
        overflow: hidden;
        margin-bottom: var(--scientific-spacing-sm);
      }

      .form-progress-bar {
        height: 100%;
        background-color: var(
          --form-progress-color,
          var(--scientific-primary-color)
        );
        transition: width var(--scientific-transition-slow);
        border-radius: var(
          --form-progress-border-radius,
          var(--scientific-border-radius)
        );
      }

      @media (max-width: 768px) {
        .form-footer {
          flex-direction: column-reverse;
          align-items: stretch;
        }

        .form-footer scientific-button {
          width: 100%;
        }
      }
    `,
  ];

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
  disabled = false;

  @property({type: Boolean})
  showCancel = true;

  @property({type: Boolean})
  showProgress = false;

  @property({type: Number})
  progress = 0;

  @property({type: String})
  footerLayout: 'end' | 'start' | 'center' | 'space-between' | 'full-width' =
    'end';

  @property({type: Boolean})
  autoFocus = false;

  private _method: FormMethod = 'POST';

  @property({type: String})
  get method(): FormMethod {
    return this._method;
  }

  set method(value: FormMethod | string) {
    const nextValue = (value ?? 'POST').toString();
    const lower = nextValue.toLowerCase();
    let next: FormMethod;
    if (lower === 'get') {
      next = 'GET';
    } else if (lower === 'dialog') {
      next = 'dialog';
    } else {
      next = 'POST';
    }
    const old = this._method;
    if (old !== next) {
      this._method = next;
      this.requestUpdate('method', old);
    }
  }


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

    if (this.isLoading || this.disabled) {
      return;
    }

    const form = this.shadowRoot?.querySelector('form') as HTMLFormElement;
    if (!form) {
      return;
    }

    if (!this.noValidate && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    dispatchCustomEvent(this, 'form-submit-start', {
      formData,
      originalEvent: e,
    });

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      if (this.onSubmit) {
        await this.onSubmit(formData);
      } else if (this.action) {
        form.submit();
        return;
      }

      if (!this.successMessage) {
        this.successMessage = 'Form submitted successfully!';
      }
      
      dispatchCustomEvent(this, 'form-submit-success', {
        formData,
      });
    } catch (error) {
      this.errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      dispatchCustomEvent(this, 'form-submit-error', {
        error,
        formData,
      });
    } finally {
      this.isLoading = false;
    }
  }

  private _handleCancel() {
    if (this.isLoading) {
      return;
    }

    dispatchCustomEvent(this, 'form-cancel', {
      timestamp: new Date().toISOString(),
    });
    this.onCancel?.();
  }

  private _handleReset() {
    if (this.isLoading) {
      return;
    }

    const form = this.shadowRoot?.querySelector('form') as HTMLFormElement;
    form?.reset();

    this.errorMessage = '';
    this.successMessage = '';
    this.progress = 0;

    dispatchCustomEvent(this, 'form-reset', {
      timestamp: new Date().toISOString(),
    });
    this.onReset?.();
  }

  protected override getContainerClasses(additionalClasses?: string): string {
    const formClasses = [
      'form-container',
      this.disabled && 'disabled',
      additionalClasses,
    ].filter(Boolean).join(' ');
    
    return super.getContainerClasses(formClasses);
  }

  private _getFooterClasses() {
    return classNames(
      'form-footer',
      this.footerLayout !== 'end' && this.footerLayout
    );
  }

  override firstUpdated() {
    if (this.autoFocus) {
      const firstInput = this.querySelector(
        'input, select, textarea'
      ) as HTMLElement;
      firstInput?.focus();
    }
  }

  protected override renderContent() {
    return html`
      <form
        method="${this.method}"
        action="${ifDefined(this.action || undefined)}"
        enctype="${this.enctype}"
        ?novalidate="${this.noValidate}"
        @submit="${this._handleSubmit}"
        @reset="${this._handleReset}"
        role="form"
        aria-busy="${this.isLoading}"
      >
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


  protected override shouldHideContentOnError(): boolean {
    return false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-form': ScientificForm;
  }
}
