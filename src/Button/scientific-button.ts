import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  sharedVariables,
  loadingSpinnerStyles,
  responsiveStyles,
  themeStyles,
  type ScientificTheme,
} from '../shared/styles/common-styles.js';
import {buttonThemeStyles} from '../shared/styles/component-theme-styles.js';
import {buttonStyles} from './button-styles.js';
import {baseComponentStyles} from '../shared/styles/base-component-styles.js';
import {classNames} from '../shared/utils/dom-utils.js';
import {dispatchMultipleEvents} from '../shared/utils/event-utils.js';
import {renderIcon} from '../shared/utils/icon-utils.js';

export type ButtonTheme = ScientificTheme;

@customElement('scientific-button')
export class ScientificButton extends LitElement {
  static override styles = [
    baseComponentStyles,
    sharedVariables,
    themeStyles,
    buttonThemeStyles,
    buttonStyles,
    loadingSpinnerStyles,
    responsiveStyles,
    css`
      :host {
        display: inline-block;
      }

      :host([fullwidth]) {
        display: block;
        width: 100%;
      }

      :host([fullwidth]) button {
        width: 100%;
      }

      .scientific-button .loading-spinner {
        --loading-spinner-size: 18px;
      }

      .scientific-button.primary .loading-spinner {
        border-color: rgba(255, 255, 255, 0.3);
        border-top-color: #ffffff;
      }

      .scientific-button.outline .loading-spinner,
      .scientific-button.ghost .loading-spinner {
        border-color: rgba(0, 123, 255, 0.3);
        border-top-color: #007bff;
      }

      .button-content {
        display: flex;
        align-items: center;
        gap: var(--scientific-spacing-xs);
      }

      .button-icon {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .button-icon-only {
        gap: 0;
      }

      @media (max-width: 768px) {
        .scientific-button {
          font-size: var(
            --button-mobile-font-size,
            var(--scientific-text-base)
          );
          min-height: var(--button-mobile-min-height, 44px);
        }

        .scientific-button.small {
          min-height: var(--button-small-mobile-min-height, 32px);
        }

        .scientific-button.large {
          min-height: var(--button-large-mobile-min-height, 52px);
        }
      }
    `,
  ];

  @property({type: String, reflect: true})
  theme: ScientificTheme = 'default';

  @property({attribute: false})
  action: (() => Promise<void>) | (() => void) | undefined;

  @property({type: Boolean})
  loading = false;

  @property({type: String})
  label = '';

  @property({type: String})
  icon = '';

  @property({type: String})
  loadingLabel = 'Processing...';

  @property({type: Boolean})
  showSpinner = true;

  @property({type: String})
  variant:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success' = 'primary';

  @property({type: String})
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({type: Boolean})
  disabled = false;

  @property({type: Boolean, reflect: true})
  fullWidth = false;



  @property({type: String})
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({type: String})
  href = '';

  @property({type: String})
  target: '_self' | '_blank' | '_parent' | '_top' | '' = '';

  @property({type: Boolean})
  autoFocus = false;

  @property({type: String})
  form = '';

  @property({type: String})
  name = '';

  @property({type: String})
  value = '';

  private async _onClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
    }

    if (this.href) {
      return;
    }

    if (this.type === 'submit' || this.type === 'reset') {
      if (!this.action) {
        return;
      }
    }

    if (!this.action) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('button-click-start', {
        detail: {originalEvent: e},
      })
    );

    this.loading = true;

    try {
      await this.action();

      dispatchMultipleEvents(this, [
        {name: 'button-click-complete', detail: null, options: {bubbles: false, composed: false}},
        {name: 'success', detail: null, options: {bubbles: false, composed: false}},
      ]);
    } catch (error) {
      dispatchMultipleEvents(this, [
        {name: 'button-click-error', detail: {error}, options: {bubbles: false, composed: false}},
        {name: 'error', detail: {error}, options: {bubbles: false, composed: false}},
      ]);
    } finally {
      this.loading = false;
    }
  }

  private _getButtonClasses() {
    const hasIcon = Boolean(this.icon);
    const hasLabel = Boolean(this.label);
    const isIconOnly = hasIcon && !hasLabel;

    return classNames({
      'scientific-button': true,
      [this.variant]: this.variant !== 'primary',
      [this.size]: this.size !== 'medium',
      loading: this.loading && this.showSpinner,
      'loading-text-only': this.loading && !this.showSpinner,
      'full-width': this.fullWidth,
      'button-icon-only': isIconOnly,
    });
  }

  private _renderContent() {
    const label = this.loading ? this.loadingLabel : this.label;
    const hasIcon = Boolean(this.icon);
    const hasLabel = Boolean(label);

    return html`
      ${this.loading && this.showSpinner
        ? html`<div class="loading-spinner"></div>`
        : ''}
      <div class="button-content ${hasIcon && !hasLabel ? 'button-icon-only' : ''}" 
           style="${this.loading && this.showSpinner ? 'visibility: hidden;' : ''}">
        ${hasIcon ? html`<span class="button-icon">${renderIcon(this.icon, {size: 16})}</span>` : ''}
        ${hasLabel ? html`<span class="button-text">${label}</span>` : ''}
      </div>
    `;
  }

  override firstUpdated() {
    if (this.autoFocus) {
      this.focus();
    }
  }

  override focus() {
    const button = this.shadowRoot?.querySelector('button, a');
    (button as HTMLElement)?.focus();
  }

  override render() {
    if (this.href) {
      return html`
        <a
          href="${this.disabled || this.loading ? '#' : this.href}"
          target="${this.target || '_self'}"
          class="${this._getButtonClasses()}"
          role="button"
          tabindex="${this.disabled || this.loading ? '-1' : '0'}"
          @click="${(e: Event) => {
            if (this.disabled || this.loading) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}"
        >
          ${this._renderContent()}
        </a>
      `;
    }

    return html`
      <button
        type="${this.type}"
        class="${this._getButtonClasses()}"
        ?disabled="${this.disabled || this.loading}"
        form="${ifDefined(this.form || undefined)}"
        name="${ifDefined(this.name || undefined)}"
        value="${ifDefined(this.value || undefined)}"
        @click="${this._onClick}"
        aria-label="${this.loading ? this.loadingLabel : this.label}"
        aria-busy="${this.loading}"
      >
        ${this._renderContent()}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-button': ScientificButton;
  }
}
