import {LitElement, html, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classNames} from '../utils/dom-utils.js';
import {renderIcon} from '../icons/index.js';
import type {ScientificTheme} from '../styles/common-styles.js';

export abstract class ScientificSurfaceBase extends LitElement {
 
  @property({type: String})
  override title = '';

  @property({type: String})
  subtitle = '';

  @property({type: String, reflect: true})
  theme: ScientificTheme = 'default';

  @property({type: Boolean})
  isLoading = false;

  @property({type: String})
  errorMessage = '';

  @property({type: Boolean})
  showToolbar = true;

  protected getContainerClasses(additionalClasses?: string): string {
    const baseClasses = [
      'scientific-container',
      this.theme && `scientific-theme-${this.theme}`,
      this.isLoading && 'loading',
      additionalClasses,
    ].filter(Boolean);

    return classNames(...baseClasses);
  }

  protected renderHeader() {
    if (!this.title && !this.subtitle && !this.shouldShowToolbar()) {
      return nothing;
    }

    return html`
      <div class="scientific-header">
        <div class="header-content">
          ${this.title
            ? html`<h2 class="scientific-title">${this.title}</h2>`
            : nothing}
          ${this.subtitle
            ? html`<p class="scientific-subtitle">${this.subtitle}</p>`
            : nothing}
        </div>
        ${this.shouldShowToolbar() ? this.renderToolbar() : nothing}
      </div>
    `;
  }

  protected renderError() {
    if (!this.errorMessage) {
      return nothing;
    }

    return html`
      <div class="scientific-message scientific-message--error" role="alert">
        <div class="message-icon">
          ${renderIcon('warning', {size: 16})}
        </div>
        <div class="message-content">
          <span>${this.errorMessage}</span>
        </div>
      </div>
    `;
  }

  protected renderLoading() {
    if (!this.isLoading) {
      return nothing;
    }

    return html`
      <div class="loading-overlay">
        <div class="loading-spinner"></div>
        <div>Loading...</div>
      </div>
    `;
  }

  protected shouldShowToolbar(): boolean {
    return this.showToolbar;
  }

  protected renderToolbar(): unknown {
    return nothing;
  }

  protected abstract renderContent(): unknown;

  override render() {
    return html`
      <div class="${this.getContainerClasses()}">
        ${this.renderHeader()}
        ${this.renderError()}
        ${!this.errorMessage ? this.renderContent() : nothing}
      </div>
    `;
  }
}