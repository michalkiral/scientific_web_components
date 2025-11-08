import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {baseComponentStyles} from '../../shared/styles/base-component-styles.js';
import {renderMessage} from '../../shared/utils/message-utils.js';
import {
  sharedVariables,
  containerStyles,
  headerStyles,
  messageStyles,
  responsiveStyles,
  themeStyles,
  type ScientificTheme,
} from '../../shared/styles/common-styles.js';
import {sliderThemeStyles} from '../../shared/styles/component-theme-styles.js';
import {dispatchMultipleEvents} from '../../shared/utils/event-utils.js';
import {classNames, formatValue, clamp} from '../../shared/utils/dom-utils.js';
import {SimpleValidationState} from '../../shared/types/common-types.js';

export interface SliderMark {
  value: number;
  label?: string;
}

export type SliderTheme = ScientificTheme;

@customElement('scientific-slider')
export class ScientificSlider extends LitElement {
  static override styles = [
    baseComponentStyles,
    sharedVariables,
    themeStyles,
    sliderThemeStyles,
    containerStyles,
    headerStyles,
    messageStyles,
    responsiveStyles,
    css`
      :host {
        width: var(--slider-width, 100%);
        max-width: var(--slider-max-width, 100%);
      }

      .slider-container.disabled {
        background-color: var(--slider-disabled-bg-color, #f9fafb);
      }

      .slider-label.required::after {
        content: ' *';
        color: var(--scientific-danger-color);
      }

      .slider-value-display {
        display: flex;
        align-items: center;
        gap: var(--scientific-spacing-sm);
        padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
        background-color: var(
          --slider-value-bg-color,
          var(--scientific-bg-secondary, #f3f4f6)
        );
        border: var(--scientific-border);
        border-radius: var(--scientific-border-radius);
        font-size: var(--scientific-text-sm);
        font-weight: 600;
        color: var(--slider-value-color, var(--scientific-text-primary));
        min-width: var(--slider-value-min-width, 60px);
        justify-content: center;
      }

      .slider-track-container {
        position: relative;
        display: flex;
        align-items: center;
        padding: var(--scientific-spacing-md) 0;
        margin: var(--scientific-spacing-sm) 0;
        outline: none;
        border-radius: var(--scientific-border-radius);
      }

      .slider-track-container:focus-visible {
        outline: 2px solid var(--scientific-primary-color);
        outline-offset: 2px;
      }

      .slider-track {
        position: relative;
        width: 100%;
        height: var(--slider-track-height, 8px);
        background-color: var(
          --slider-track-color,
          var(--scientific-border-color)
        );
        overflow: hidden;
        cursor: pointer;
        transition: var(--scientific-transition);
      }

      .slider-track:hover {
        background-color: var(
          --slider-track-hover-color,
          var(--scientific-border-hover)
        );
      }

      .slider-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: var(--slider-fill-color, var(--scientific-primary-color));
        border-radius: var(--scientific-border-radius-sm);
        transition: var(--scientific-transition-fast);
        z-index: 1;
      }

      .slider-thumb {
        position: absolute;
        top: 50%;
        width: var(--slider-thumb-size, 20px);
        height: var(--slider-thumb-size, 20px);
        background-color: var(
          --slider-thumb-color,
          var(--scientific-primary-color)
        );
        border: var(--slider-thumb-border, 3px solid #ffffff);
        border-radius: 50%;
        box-shadow: var(--scientific-shadow);
        cursor: grab;
        transform: translate(-50%, -50%);
        transition: var(--scientific-transition-fast);
        z-index: 3;
        user-select: none;
      }

      .slider-thumb:hover {
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: var(--scientific-shadow-lg);
      }

      .slider-thumb:active,
      .slider-thumb.dragging {
        cursor: grabbing;
        transform: translate(-50%, -50%) scale(1.15);
        box-shadow: var(--scientific-shadow-xl);
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
        bottom: calc(100% + 16px);
        left: 50%;
        transform: translateX(-50%);
        padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
        background-color: var(
          --slider-tooltip-bg-color,
          var(--scientific-text-primary, #374151)
        );
        color: var(--slider-tooltip-color, #ffffff);
        font-size: var(--scientific-text-xs);
        font-weight: 600;
        border-radius: var(--scientific-border-radius);
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: var(--scientific-transition-fast);
        z-index: 4;
        box-shadow: var(--scientific-shadow);
        min-width: max-content;
      }

      .slider-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: var(
          --slider-tooltip-bg-color,
          var(--scientific-text-primary, #374151)
        );
      }

      .slider-thumb:hover .slider-tooltip,
      .slider-thumb.dragging .slider-tooltip,
      .show-tooltip .slider-tooltip {
        opacity: 1;
      }

      .slider-marks {
        position: relative;
        margin-top: var(--scientific-spacing-sm);
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
        background-color: var(
          --slider-mark-tick-color,
          var(--scientific-text-muted)
        );
        border-radius: 1px;
      }

      .slider-mark-label {
        font-size: var(--scientific-text-xs);
        font-weight: 500;
        color: var(--slider-mark-label-color, var(--scientific-text-muted));
        white-space: nowrap;
        user-select: none;
      }

      .slider-range-labels {
        display: flex;
        justify-content: space-between;
        margin-top: var(--scientific-spacing-xs);
        font-size: var(--scientific-text-xs);
        color: var(--scientific-text-muted);
        font-weight: 500;
      }

      .slider-container.error .slider-track {
        background-color: var(--slider-error-track-color, #fecaca);
      }

      .slider-container.error .slider-fill {
        background: var(
          --slider-error-fill-color,
          var(--scientific-danger-color)
        );
      }

      .slider-container.error .slider-thumb {
        background-color: var(
          --slider-error-thumb-color,
          var(--scientific-danger-color)
        );
        border-color: var(--slider-error-thumb-border-color, #fecaca);
      }

      .slider-helper {
        font-size: var(--slider-helper-font-size, var(--scientific-text-sm));
        color: var(--slider-helper-color, var(--scientific-text-muted));
        margin-top: var(--slider-helper-margin-top, var(--scientific-spacing-xs));
        line-height: var(--slider-helper-line-height, 1.4);
      }

      @media (max-width: 768px) {
        .slider-thumb {
          width: var(--slider-mobile-thumb-size, 24px);
          height: var(--slider-mobile-thumb-size, 24px);
        }
      }
    `,
  ];

  @property({type: String})
  label = '';

  @property({type: String})
  description = '';

  @property({type: String, reflect: true})
  theme: ScientificTheme = 'default';

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
  state: SimpleValidationState = 'default';

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
    const clampedValue = clamp(this.value, this.min, this.max);
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
    return formatValue(value, {unit: this.unit});
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

    const container = this.shadowRoot?.querySelector(
      '.slider-track-container'
    ) as HTMLElement;
    if (container) {
      container.focus();
    }

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

    const container = this.shadowRoot?.querySelector(
      '.slider-track-container'
    ) as HTMLElement;
    if (container) {
      container.focus();
    }

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
    }

    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  private _dispatchChange() {
    this.onValueChange?.(this.value);

    dispatchMultipleEvents(this, [
      {
        name: 'value-changed',
        detail: {value: this.value},
        options: {bubbles: true, composed: true},
      },
      {
        name: 'change',
        detail: {value: this.value},
        options: {bubbles: true, composed: true},
      },
    ]);
  }

  private _getContainerClasses(): string {
    return classNames(
      'slider-container',
      'scientific-container',
      this.disabled && 'disabled',
      this.state !== 'default' && this.state
    );
  }

  private _getThumbClasses(): string {
    return classNames(
      'slider-thumb',
      this.isDragging && 'dragging',
      this.showTooltip &&
        (this.showTooltipState || this.isDragging) &&
        'show-tooltip'
    );
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
      <div class="scientific-header">
        <div class="header-main">
          <div class="header-text">
            ${this.label
              ? html`
                  <h3
                    class="slider-label scientific-title ${this.required
                      ? 'required'
                      : ''}"
                  >
                    ${this.label}
                  </h3>
                `
              : ''}
            ${this.description
              ? html`
                  <p class="slider-description scientific-subtitle">
                    ${this.description}
                  </p>
                `
              : ''}
          </div>
          ${this.showValue
            ? html`
                <div class="header-actions">
                  <div class="slider-value-display">
                    ${this._formatDisplayValue(this.value)}
                  </div>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }

  private _renderSlider(percentage: number, displayValue: string) {
    return html`
      <div 
        class="slider-track-container"
        tabindex="${this.disabled ? -1 : 0}"
        role="slider"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.value}"
        aria-valuetext="${displayValue}"
        aria-label="${this.label || 'Slider'}"
        aria-disabled="${this.disabled}"
        @keydown="${this._handleKeyDown}"
        @click="${this._handleTrackClick}"
      >
        <div class="slider-track">
          <div class="slider-fill" style="width: ${percentage}%"></div>
        </div>

        <div
          class="${this._getThumbClasses()}"
          style="left: ${percentage}%"
          @mousedown="${this._handleThumbMouseDown}"
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
        ? html`<div class="slider-helper scientific-message">${this.helperText}</div>`
        : ''}
      ${this.state === 'error' && this.errorMessage
        ? html`<div class="slider-error" role="alert">
            ${renderMessage({type: 'error', content: this.errorMessage})}
          </div>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-slider': ScientificSlider;
  }
}
