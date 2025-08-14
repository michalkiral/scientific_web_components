import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

export interface SliderMark {
  value: number;
  label?: string;
}

@customElement('scientific-slider')
export class ScientificSlider extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(
        --slider-font-family,
        system-ui,
        -apple-system,
        sans-serif
      );
      width: var(--slider-width, 100%);
      max-width: var(--slider-max-width, 100%);
    }

    .slider-container {
      position: relative;
      padding: var(--slider-padding, 20px);
      background-color: var(--slider-bg-color, #ffffff);
      border: var(--slider-border, 2px solid #e5e7eb);
      border-radius: var(--slider-border-radius, 12px);
      box-shadow: var(--slider-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
      transition: var(--slider-transition, all 0.2s ease-in-out);
      display: flex;
      flex-direction: column;
      gap: var(--slider-gap, 16px);
    }

    .slider-container:hover {
      box-shadow: var(--slider-hover-shadow, 0 8px 12px rgba(0, 0, 0, 0.15));
    }

    .slider-container.disabled {
      opacity: 0.6;
      pointer-events: none;
      background-color: var(--slider-disabled-bg-color, #f9fafb);
    }

    .slider-container.compact {
      padding: var(--slider-compact-padding, 12px);
      gap: var(--slider-compact-gap, 8px);
    }

    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--slider-header-gap, 12px);
    }

    .slider-label-section {
      display: flex;
      flex-direction: column;
      gap: var(--slider-label-gap, 4px);
      flex: 1;
    }

    .slider-label {
      font-size: var(--slider-label-font-size, 16px);
      font-weight: var(--slider-label-font-weight, 600);
      color: var(--slider-label-color, #111827);
      margin: 0;
      line-height: var(--slider-label-line-height, 1.2);
    }

    .slider-label.required::after {
      content: ' *';
      color: var(--slider-required-color, #dc2626);
    }

    .slider-description {
      font-size: var(--slider-description-font-size, 14px);
      font-weight: var(--slider-description-font-weight, 400);
      color: var(--slider-description-color, #6b7280);
      margin: 0;
      line-height: var(--slider-description-line-height, 1.4);
    }

    .slider-value-display {
      display: flex;
      align-items: center;
      gap: var(--slider-value-gap, 8px);
      padding: var(--slider-value-padding, 8px 12px);
      background-color: var(--slider-value-bg-color, #f3f4f6);
      border: var(--slider-value-border, 1px solid #d1d5db);
      border-radius: var(--slider-value-border-radius, 6px);
      font-size: var(--slider-value-font-size, 14px);
      font-weight: var(--slider-value-font-weight, 600);
      color: var(--slider-value-color, #374151);
      min-width: var(--slider-value-min-width, 60px);
      justify-content: center;
    }

    .slider-track-container {
      position: relative;
      display: flex;
      align-items: center;
      padding: var(--slider-track-padding, 12px 0);
      margin: var(--slider-track-margin, 8px 0);
    }

    .slider-track {
      position: relative;
      width: 100%;
      height: var(--slider-track-height, 8px);
      background-color: var(--slider-track-color, #e5e7eb);
      border-radius: var(--slider-track-border-radius, 4px);
      overflow: hidden;
      cursor: pointer;
      transition: var(--slider-track-transition, all 0.2s ease-in-out);
    }

    .slider-track:hover {
      background-color: var(--slider-track-hover-color, #d1d5db);
    }

    .slider-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(
        --slider-fill-color,
        linear-gradient(90deg, #007bff 0%, #0056b3 100%)
      );
      border-radius: var(--slider-fill-border-radius, 4px);
      transition: var(--slider-fill-transition, width 0.15s ease-out);
      z-index: 1;
    }

    .slider-thumb {
      position: absolute;
      top: 50%;
      width: var(--slider-thumb-size, 20px);
      height: var(--slider-thumb-size, 20px);
      background-color: var(--slider-thumb-color, #007bff);
      border: var(--slider-thumb-border, 3px solid #ffffff);
      border-radius: var(--slider-thumb-border-radius, 50%);
      box-shadow: var(--slider-thumb-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
      cursor: grab;
      transform: translate(-50%, -50%);
      transition: var(--slider-thumb-transition, all 0.15s ease-out);
      z-index: 3;
      user-select: none;
    }

    .slider-thumb:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: var(
        --slider-thumb-hover-shadow,
        0 4px 12px rgba(0, 0, 0, 0.2)
      );
    }

    .slider-thumb:active,
    .slider-thumb.dragging {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.15);
      box-shadow: var(
        --slider-thumb-active-shadow,
        0 6px 16px rgba(0, 0, 0, 0.25)
      );
    }

    .slider-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      outline: none;
    }

    .slider-tooltip {
      position: absolute;
      bottom: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%);
      padding: var(--slider-tooltip-padding, 6px 10px);
      background-color: var(--slider-tooltip-bg-color, #111827);
      color: var(--slider-tooltip-color, #ffffff);
      font-size: var(--slider-tooltip-font-size, 12px);
      font-weight: var(--slider-tooltip-font-weight, 500);
      border-radius: var(--slider-tooltip-border-radius, 6px);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: var(--slider-tooltip-transition, opacity 0.15s ease-out);
      z-index: 4;
    }

    .slider-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: var(--slider-tooltip-bg-color, #111827);
    }

    .slider-thumb:hover .slider-tooltip,
    .slider-thumb.dragging .slider-tooltip,
    .show-tooltip .slider-tooltip {
      opacity: 1;
    }

    .slider-marks {
      position: relative;
      margin-top: var(--slider-marks-margin-top, 8px);
      height: var(--slider-marks-height, 20px);
    }

    .slider-mark {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .slider-mark-tick {
      width: var(--slider-mark-tick-width, 2px);
      height: var(--slider-mark-tick-height, 8px);
      background-color: var(--slider-mark-tick-color, #9ca3af);
      border-radius: var(--slider-mark-tick-border-radius, 1px);
    }

    .slider-mark-label {
      font-size: var(--slider-mark-label-font-size, 11px);
      font-weight: var(--slider-mark-label-font-weight, 500);
      color: var(--slider-mark-label-color, #6b7280);
      white-space: nowrap;
      user-select: none;
    }

    .slider-range-labels {
      display: flex;
      justify-content: space-between;
      margin-top: var(--slider-range-labels-margin-top, 4px);
      font-size: var(--slider-range-labels-font-size, 12px);
      color: var(--slider-range-labels-color, #9ca3af);
      font-weight: var(--slider-range-labels-font-weight, 500);
    }

    .slider-helper {
      font-size: var(--slider-helper-font-size, 12px);
      color: var(--slider-helper-color, #6b7280);
      margin-top: var(--slider-helper-margin-top, 4px);
    }

    .slider-error {
      font-size: var(--slider-error-font-size, 12px);
      color: var(--slider-error-color, #dc2626);
      margin-top: var(--slider-error-margin-top, 4px);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .slider-container.error .slider-track {
      background-color: var(--slider-error-track-color, #fecaca);
    }

    .slider-container.error .slider-fill {
      background: var(--slider-error-fill-color, #dc2626);
    }

    .slider-container.error .slider-thumb {
      background-color: var(--slider-error-thumb-color, #dc2626);
      border-color: var(--slider-error-thumb-border-color, #fecaca);
    }

    @media (max-width: 768px) {
      .slider-container {
        padding: var(--slider-mobile-padding, 16px);
        gap: var(--slider-mobile-gap, 12px);
      }

      .slider-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--slider-mobile-header-gap, 8px);
      }

      .slider-value-display {
        align-self: flex-end;
      }

      .slider-thumb {
        width: var(--slider-mobile-thumb-size, 24px);
        height: var(--slider-mobile-thumb-size, 24px);
      }
    }

    .slider-container.small {
      padding: var(--slider-small-padding, 12px);
      gap: var(--slider-small-gap, 8px);
    }

    .slider-container.small .slider-track {
      height: var(--slider-small-track-height, 6px);
    }

    .slider-container.small .slider-thumb {
      width: var(--slider-small-thumb-size, 16px);
      height: var(--slider-small-thumb-size, 16px);
    }

    .slider-container.large {
      padding: var(--slider-large-padding, 24px);
      gap: var(--slider-large-gap, 20px);
    }

    .slider-container.large .slider-track {
      height: var(--slider-large-track-height, 12px);
    }

    .slider-container.large .slider-thumb {
      width: var(--slider-large-thumb-size, 24px);
      height: var(--slider-large-thumb-size, 24px);
    }
  `;

  @property({type: String})
  label = '';

  @property({type: String})
  description = '';

  @property({type: Number})
  min = 0;

  @property({type: Number})
  max = 100;

  @property({type: Number})
  step = 1;

  @property({type: Number})
  value = 0;

  @property({type: Boolean})
  disabled = false;

  @property({type: Boolean})
  required = false;

  @property({type: String})
  variant: 'default' | 'compact' = 'default';

  @property({type: String})
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({type: Boolean})
  showTooltip = true;

  @property({type: Boolean})
  showValue = true;

  @property({type: Boolean})
  showRangeLabels = true;

  @property({type: Array})
  marks: SliderMark[] = [];

  @property({type: String})
  unit = '';

  @property({type: String})
  helperText = '';

  @property({type: String})
  errorMessage = '';

  @property({type: String})
  state: 'default' | 'error' = 'default';

  @property({attribute: false})
  formatValue?: (value: number) => string;

  @property({attribute: false})
  onValueChange?: (value: number) => void;

  @state()
  private isDragging = false;

  @state()
  private showTooltipState = false;

  override connectedCallback() {
    super.connectedCallback();
    this._clampValue();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._clampValue();
    }
  }

  private _clampValue() {
    const clampedValue = Math.max(this.min, Math.min(this.max, this.value));
    if (clampedValue !== this.value) {
      this.value = clampedValue;
    }
  }

  private _getPercentage(): number {
    if (this.max === this.min) return 0;
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  private _getValueFromPercentage(percentage: number): number {
    const rawValue = this.min + (percentage / 100) * (this.max - this.min);
    return Math.round(rawValue / this.step) * this.step;
  }

  private _formatDisplayValue(value: number): string {
    if (this.formatValue) {
      return this.formatValue(value);
    }
    return `${value}${this.unit}`;
  }

  private _handleInput(event: Event) {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);

    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  private _handleTrackClick(event: MouseEvent) {
    if (this.disabled) return;

    const track = this.shadowRoot?.querySelector(
      '.slider-track'
    ) as HTMLElement;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const percentage = ((event.clientX - rect.left) / rect.width) * 100;
    const newValue = this._getValueFromPercentage(
      Math.max(0, Math.min(100, percentage))
    );

    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  private _handleThumbMouseDown(event: MouseEvent) {
    if (this.disabled) return;

    event.preventDefault();
    this.isDragging = true;
    this.showTooltipState = true;

    const track = this.shadowRoot?.querySelector(
      '.slider-track'
    ) as HTMLElement;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const startX = event.clientX;
    const startPercentage = this._getPercentage();

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaPercentage = (deltaX / rect.width) * 100;
      const newPercentage = startPercentage + deltaPercentage;
      const newValue = this._getValueFromPercentage(
        Math.max(0, Math.min(100, newPercentage))
      );

      if (newValue !== this.value) {
        this.value = newValue;
        this._dispatchChange();
      }
    };

    const handleMouseUp = () => {
      this.isDragging = false;
      this.showTooltipState = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    let newValue = this.value;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = Math.max(this.min, this.value - this.step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = Math.min(this.max, this.value + this.step);
        break;
      case 'Home':
        event.preventDefault();
        newValue = this.min;
        break;
      case 'End':
        event.preventDefault();
        newValue = this.max;
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = Math.max(this.min, this.value - this.step * 10);
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = Math.min(this.max, this.value + this.step * 10);
        break;
    }

    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  private _dispatchChange() {
    this.onValueChange?.(this.value);

    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  private _getContainerClasses(): string {
    const classes = ['slider-container'];

    if (this.variant !== 'default') {
      classes.push(this.variant);
    }

    if (this.size !== 'medium') {
      classes.push(this.size);
    }

    if (this.disabled) {
      classes.push('disabled');
    }

    if (this.state !== 'default') {
      classes.push(this.state);
    }

    return classes.join(' ');
  }

  private _getThumbClasses(): string {
    const classes = ['slider-thumb'];

    if (this.isDragging) {
      classes.push('dragging');
    }

    if (this.showTooltip && (this.showTooltipState || this.isDragging)) {
      classes.push('show-tooltip');
    }

    return classes.join(' ');
  }

  override render() {
    const percentage = this._getPercentage();
    const displayValue = this._formatDisplayValue(this.value);

    return html`
      <div class="${this._getContainerClasses()}">
        ${this._renderHeader()} ${this._renderSlider(percentage, displayValue)}
        ${this._renderMarks()} ${this._renderRangeLabels()}
        ${this._renderMessages()}
      </div>
    `;
  }

  private _renderHeader() {
    if (!this.label && !this.description && !this.showValue) {
      return '';
    }

    return html`
      <div class="slider-header">
        <div class="slider-label-section">
          ${this.label
            ? html`
                <h3 class="slider-label ${this.required ? 'required' : ''}">
                  ${this.label}
                </h3>
              `
            : ''}
          ${this.description
            ? html` <p class="slider-description">${this.description}</p> `
            : ''}
        </div>
        ${this.showValue
          ? html`
              <div class="slider-value-display">
                ${this._formatDisplayValue(this.value)}
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _renderSlider(percentage: number, displayValue: string) {
    return html`
      <div class="slider-track-container">
        <div class="slider-track" @click="${this._handleTrackClick}">
          <div class="slider-fill" style="width: ${percentage}%"></div>
        </div>

        <div
          class="${this._getThumbClasses()}"
          style="left: ${percentage}%"
          @mousedown="${this._handleThumbMouseDown}"
          tabindex="${this.disabled ? -1 : 0}"
          role="slider"
          aria-valuemin="${this.min}"
          aria-valuemax="${this.max}"
          aria-valuenow="${this.value}"
          aria-valuetext="${displayValue}"
          aria-label="${this.label || 'Slider'}"
          aria-disabled="${this.disabled}"
          @keydown="${this._handleKeyDown}"
        >
          ${this.showTooltip
            ? html` <div class="slider-tooltip">${displayValue}</div> `
            : ''}
        </div>

        <input
          type="range"
          class="slider-input"
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
          .value="${String(this.value)}"
          .disabled="${this.disabled}"
          @input="${this._handleInput}"
          tabindex="-1"
          aria-hidden="true"
        />
      </div>
    `;
  }

  private _renderMarks() {
    if (!this.marks.length) {
      return '';
    }

    return html`
      <div class="slider-marks">
        ${this.marks.map((mark) => {
          const markPercentage =
            ((mark.value - this.min) / (this.max - this.min)) * 100;
          return html`
            <div class="slider-mark" style="left: ${markPercentage}%">
              <div class="slider-mark-tick"></div>
              ${mark.label
                ? html` <div class="slider-mark-label">${mark.label}</div> `
                : ''}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderRangeLabels() {
    if (!this.showRangeLabels) {
      return '';
    }

    return html`
      <div class="slider-range-labels">
        <span>${this._formatDisplayValue(this.min)}</span>
        <span>${this._formatDisplayValue(this.max)}</span>
      </div>
    `;
  }

  private _renderMessages() {
    return html`
      ${this.helperText
        ? html`<div class="slider-helper">${this.helperText}</div>`
        : ''}
      ${this.state === 'error' && this.errorMessage
        ? html`<div class="slider-error">⚠️ ${this.errorMessage}</div>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-slider': ScientificSlider;
  }
}
