import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Chart, ChartType, ChartData } from 'chart.js/auto';

@customElement('scientific-graph')
export class ScientificGraph extends LitElement {
  static override styles = css`
    .graph-container {
      border: var(--graph-border, 1px solid #ddd);
      padding: var(--graph-padding, 16px);
      background-color: var(--graph-bg-color, #f9f9f9);
      border-radius: var(--graph-border-radius, 8px);
      max-width: var(--graph-max-width, 800px);
      margin: 20px auto;
      box-shadow: var(--graph-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .graph-header {
      font-size: var(--graph-header-font-size, 24px);
      text-align: center;
      margin-bottom: 16px;
      color: var(--graph-header-color, #333);
    }

    canvas {
      display: block;
      max-width: 100%;
      height: auto;
    }
  `;

  @property({ type: String }) graphTitle = 'Scientific Graph';
  @property({ type: String }) type: ChartType = 'line';
  @property({ type: Array }) labels: string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  @property({ type: Array }) datasets: ChartData['datasets'] = [{label: '# of Votes', data: [12, 19, 3, 5, 2, 3], borderWidth: 1}]; 

  private chart: Chart | null = null;

  override firstUpdated() {
    this._createChart();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('type') || changedProperties.has('labels') || changedProperties.has('datasets')) {
      this._recreateChart();
    }
  }

  private _createChart() {
    const canvas = this.shadowRoot?.querySelector('canvas');
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  private _recreateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this._createChart();
  }

  override render() {
    return html`
      <div class="graph-container">
        <canvas id='canvas' width="400" height="400"></canvas>
      </div>
    `;
  }
}
