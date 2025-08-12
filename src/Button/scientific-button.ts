import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

@customElement('scientific-button')
export class ScientificButton extends LitElement {
  static override styles = css`
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

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--button-gap, 8px);
      font-family: var(
        --button-font-family,
        system-ui,
        -apple-system,
        sans-serif
      );
      font-size: var(--button-font-size, 16px);
      font-weight: var(--button-font-weight, 500);
      line-height: var(--button-line-height, 1.5);
      padding: var(--button-padding, 12px 24px);
      min-height: var(--button-min-height, 48px);
      border: var(--button-border, 2px solid transparent);
      border-radius: var(--button-border-radius, 8px);
      background-color: var(--button-bg-color, #007bff);
      color: var(--button-color, #ffffff);
      cursor: pointer;
      transition: var(--button-transition, all 0.2s ease-in-out);
      box-shadow: var(--button-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      text-decoration: none;
      outline: none;
      user-select: none;
      width: var(--button-width, auto);
      max-width: var(--button-max-width, 100%);
    }

    button:hover {
      background-color: var(--button-hover-bg-color, #0056b3);
      box-shadow: var(--button-hover-shadow, 0 4px 8px rgba(0, 0, 0, 0.15));
      transform: var(--button-hover-transform, translateY(-1px));
    }

    button:focus {
      outline: none;
      box-shadow: var(--button-focus-shadow, 0 0 0 3px rgba(0, 123, 255, 0.25));
      border-color: var(--button-focus-border-color, #007bff);
    }

    button:active {
      transform: var(--button-active-transform, translateY(0));
      box-shadow: var(--button-active-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
    }

    button[disabled] {
      background-color: var(--button-disabled-bg-color, #e9ecef);
      color: var(--button-disabled-color, #6c757d);
      border-color: var(--button-disabled-border-color, #dee2e6);
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }

    button[disabled]:hover {
      background-color: var(--button-disabled-bg-color, #e9ecef);
      box-shadow: none;
      transform: none;
    }

    button.secondary {
      background-color: var(--button-secondary-bg-color, #6c757d);
      color: var(--button-secondary-color, #ffffff);
    }

    button.secondary:hover {
      background-color: var(--button-secondary-hover-bg-color, #545b62);
    }

    button.outline {
      background-color: var(--button-outline-bg-color, transparent);
      color: var(--button-outline-color, #007bff);
      border-color: var(--button-outline-border-color, #007bff);
    }

    button.outline:hover {
      background-color: var(--button-outline-hover-bg-color, #007bff);
      color: var(--button-outline-hover-color, #ffffff);
    }

    button.ghost {
      background-color: var(--button-ghost-bg-color, transparent);
      color: var(--button-ghost-color, #007bff);
      border-color: var(--button-ghost-border-color, transparent);
      box-shadow: none;
    }

    button.ghost:hover {
      background-color: var(
        --button-ghost-hover-bg-color,
        rgba(0, 123, 255, 0.1)
      );
    }

    button.danger {
      background-color: var(--button-danger-bg-color, #dc3545);
      color: var(--button-danger-color, #ffffff);
    }

    button.danger:hover {
      background-color: var(--button-danger-hover-bg-color, #c82333);
    }

    button.success {
      background-color: var(--button-success-bg-color, #28a745);
      color: var(--button-success-color, #ffffff);
    }

    button.success:hover {
      background-color: var(--button-success-hover-bg-color, #218838);
    }

    button.small {
      font-size: var(--button-small-font-size, 14px);
      padding: var(--button-small-padding, 8px 16px);
      min-height: var(--button-small-min-height, 36px);
    }

    button.large {
      font-size: var(--button-large-font-size, 18px);
      padding: var(--button-large-padding, 16px 32px);
      min-height: var(--button-large-min-height, 56px);
    }

    button.loading {
      color: transparent;
    }

    button.loading-text-only {
      color: inherit;
    }

    .loading-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid var(--button-loading-color, #000000);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    .button-icon {
      display: inline-flex;
      align-items: center;
      width: var(--button-icon-size, 18px);
      height: var(--button-icon-size, 18px);
    }

    .button-icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    button.full-width {
      width: 100%;
    }
  `;

  @property({attribute: false})
  action: (() => Promise<void>) | (() => void) | undefined;

  @property({type: Boolean})
  loading = false;

  @property({type: String})
  label = 'Click Me';

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
  iconLeft = '';

  @property({type: String})
  iconRight = '';

  @property({type: String})
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({type: String})
  href = '';

  @property({type: String})
  target = '';

  @property({type: Boolean})
  autoFocus = false;

  // Form-related properties
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

    // Handle form submission/reset without custom action
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
      this.dispatchEvent(new CustomEvent('button-click-complete'));
      this.dispatchEvent(new CustomEvent('success'));
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent('button-click-error', {
          detail: {error},
        })
      );
      this.dispatchEvent(
        new CustomEvent('error', {
          detail: {error},
        })
      );
    } finally {
      this.loading = false;
    }
  }

  private _getButtonClasses() {
    const classes = ['button'];

    if (this.variant !== 'primary') {
      classes.push(this.variant);
    }

    if (this.size !== 'medium') {
      classes.push(this.size);
    }

    if (this.loading) {
      if (this.showSpinner) {
        classes.push('loading');
      } else {
        classes.push('loading-text-only');
      }
    }

    if (this.fullWidth) {
      classes.push('full-width');
    }

    return classes.join(' ');
  }

  private _renderIcon(iconName: string, position: 'left' | 'right') {
    if (!iconName) {
      return '';
    }

    // Can extend this to support different icon systems
    // For now, it supports simple text icons or Unicode symbols
    return html`<span class="button-icon button-icon-${position}"
      >${iconName}</span
    >`;
  }

  private _renderContent() {
    const label = this.loading ? this.loadingLabel : this.label;

    return html`
      ${this.loading && this.showSpinner
        ? html`<div class="loading-spinner"></div>`
        : ''}
      ${this._renderIcon(this.iconLeft, 'left')}
      <span class="button-text">${label}</span>
      ${this._renderIcon(this.iconRight, 'right')}
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
