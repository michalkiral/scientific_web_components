import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('scientific-slider')
export class ScientificSlider extends LitElement {
  static override styles = css`
    .slider-container {
      width: 100%;
      max-width: 600px;
      margin: auto;
    }

    .label {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .range-container {
      display: flex;
      align-items: center;
      position: relative;
    }

    .range-input {
      width: 100%;
      height: 8px;
      background: #ddd;
      outline: none;
      border-radius: 4px;
      margin: 0 16px;
    }

    .range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background-color: #d0342c;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    }

    .range-input::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background-color: #d0342c;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    }

    .value-display {
      position: absolute;
      top: -30px;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      background-color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .range-container:hover .value-display {
      opacity: 1;
    }

    .min-max-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      font-size: 12px;
      color: #666;
    }

    .ticks {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      font-size: 10px;
      color: #666;
    }
  `;

  @property({type: Number})
  min = 0;

  @property({type: Number})
  max = 100;

  @property({type: Number})
  step = 1;

  @property({type: Number})
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
    const tickCount = 10;
    const tickStep = (this.max - this.min) / (tickCount - 1);
    this.ticks = Array.from({length: tickCount}, (_, i) =>
      Math.round(this.min + i * tickStep)
    );
  }

  private _onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.dispatchEvent(new CustomEvent('value-changed', {detail: this.value}));
  }

  override render() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;

    return html`
      <div class="slider-container">
        <div class="label">Arrows Count</div>
        <div class="range-container">
          <div class="value-display" style="left: calc(${percentage}%);">
            ${this.value}
          </div>
          <input
            type="range"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            .value="${String(this.value)}"
            @input="${this._onInput}"
            class="range-input"
          />
        </div>
        <div class="min-max-labels">
          <span>${this.min}</span>
          <span>${this.max}</span>
        </div>
        <div class="ticks">
          ${this.ticks.map(
            (tick) =>
              html`<span
                style="left: ${((tick - this.min) / (this.max - this.min)) *
                100}%"
                >${tick}</span
              >`
          )}
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
