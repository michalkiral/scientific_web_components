import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('scientific-slider')
export class ScientificSlider extends LitElement {
  static override styles = css`
    :host {
      --slider-container-width: 100%;
      --slider-container-max-width: 600px;

      --slider-label-font-size: 14px;
      --slider-label-font-weight: bold;

      --slider-track-color: #ddd;
      --slider-track-border-radius: 4px;

      --slider-fill-color: #4c8eaf;
      --slider-fill-border-radius: 4px;

      --slider-thumb-color: #d0342c;
      --slider-thumb-width: 20px;
      --slider-thumb-height: 20px;
      --slider-thumb-border-radius: 50%;

      --tooltip-background: #fff;
      --tooltip-color: #333;
      --tooltip-font-size: 14px;

      --ticks-font-size: 10px;
      --ticks-color: #666;
    }

    .slider-container {
      width: var(--slider-container-width);
      max-width: var(--slider-container-max-width);
      margin: auto;
      position: relative;
    }

    .label {
      font-size: var(--slider-label-font-size);
      font-weight: var(--slider-label-font-weight);
      margin-bottom: 8px;
    }

    .range-container {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
    }

    .slider-track {
      width: 100%;
      height: 8px;
      background: var(--slider-track-color);
      border-radius: var(--slider-track-border-radius);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }

    .slider-fill {
      height: 100%;
      background: var(--slider-fill-color);
      border-radius: var(--slider-fill-border-radius);
      z-index: 0;
    }

    .range-input {
      width: 100%;
      height: 8px;
      background: transparent;
      outline: none;
      border-radius: 4px;
      margin: 0 16px;
      opacity: 0;
    }

    .custom-thumb {
      width: var(--slider-thumb-width);
      height: var(--slider-thumb-height);
      background-color: var(--slider-thumb-color);
      border-radius: var(--slider-thumb-border-radius);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
      z-index: 2;
    }

    .value-display {
      position: absolute;
      top: -30px;
      font-size: var(--tooltip-font-size);
      font-weight: bold;
      color: var(--tooltip-color);
      background-color: var(--tooltip-background);
      padding: 2px 6px;
      border-radius: 4px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .range-container:hover .value-display {
      opacity: 1;
    }

    .ticks {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      font-size: var(--ticks-font-size);
      color: var(--ticks-color);
    }
  `;

  @property({ type: Number })
  min = 0;
  @property({ type: Number })
  max = 100;
  @property({ type: Number })
  step = 1;
  @property({ type: Number })
  tickCount = 2;
  @property({ type: String })
  tooltipPosition = 'top';
  @property({ type: String })
  valueLabel = "Value";

  @property({ type: Number })
  value = 0;

  @state()
  private ticks: number[] = [];

  override connectedCallback() {
    super.connectedCallback();

    if (this.value < this.min) {
      this.value = this.min;
    } else if (this.value > this.max) {
      this.value = this.max;
    }

    this.calculateTicks();
  }

  private calculateTicks() {
    const tickStep = (this.max - this.min) / (this.tickCount - 1);
    this.ticks = Array.from({ length: this.tickCount }, (_, i) =>
      Math.round(this.min + i * tickStep)
    );
  }

  private _onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.dispatchEvent(new CustomEvent('value-changed', { detail: this.value }));
  }

  private _onThumbDrag(event: MouseEvent) {
    const initialX = event.clientX;

    const sliderContainer = this.shadowRoot?.querySelector('.slider-container');
    const thumb = this.shadowRoot?.querySelector('.custom-thumb');

    if (!sliderContainer || !thumb) return;

    const sliderRect = sliderContainer.getBoundingClientRect();
    const startLeft = parseFloat(getComputedStyle(thumb).left);

    const mouseMoveHandler = (e: MouseEvent) => {
      const deltaX = e.clientX - initialX;
      let newLeft = startLeft + deltaX;

      newLeft = Math.max(0, Math.min(newLeft, sliderRect.width));

      const newPercentage = (newLeft / sliderRect.width) * 100;
      this.value = Math.round(this.min + (newPercentage / 100) * (this.max - this.min));

      this.dispatchEvent(new CustomEvent('value-changed', { detail: this.value }));
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  private _onTrackClick(event: MouseEvent) {
    const sliderRect = this.shadowRoot?.querySelector('.slider-container')?.getBoundingClientRect();

    if (!sliderRect) return;

    const clickX = event.clientX - sliderRect.left;
    const newPercentage = (clickX / sliderRect.width) * 100;
    this.value = Math.round(this.min + (newPercentage / 100) * (this.max - this.min));

    this.dispatchEvent(new CustomEvent('value-changed', { detail: this.value }));
  }

  override render() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    const tooltipStyle = this.tooltipPosition === 'top'
      ? 'top: -30px;'
      : 'bottom: -30px;';
  
    const tickPositions = this.ticks.map(tick => (tick - this.min) / (this.max - this.min) * 100);
  
    return html`
      <div class="slider-container">
        <div class="label">${this.valueLabel}</div>
        <div class="range-container">
          <div
            class="slider-track"
            @click="${this._onTrackClick}"
          >
            <div class="slider-fill" style="width: ${percentage}%"></div>
          </div>
  
          <div
            class="custom-thumb"
            style="left: calc(${percentage}% - 10px);"
            @mousedown="${(e: MouseEvent) => this._onThumbDrag(e)}"
          ></div>
  
          <input
            type="range"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            .value="${String(this.value)}"
            @input="${this._onInput}"
            class="range-input"
          />
  
          <div class="value-display" style="left: calc(${percentage}%); ${tooltipStyle}">
            ${this.value}
          </div>
        </div>
  
        <div class="ticks">
          ${this.ticks.map((tick, index) => {
            const tickPosition = tickPositions[index];
            return html`<span style="left: ${tickPosition}%">${tick}</span>`;
          })}
        </div>
      </div>
    `;
  }  
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-slider': ScientificSlider;
  }
}
