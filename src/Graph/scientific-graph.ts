import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Chart, ChartType, ChartOptions} from 'chart.js/auto';
import '../Button/scientific-button.js';
import '../Dropdown/scientific-dropdown.js';

export interface GraphDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  tension?: number;
  fill?: boolean;
  pointRadius?: number;
  pointHoverRadius?: number;
}

export interface GraphStatistics {
  mean: number;
  median: number;
  min: number;
  max: number;
  standardDeviation: number;
  variance: number;
}

@customElement('scientific-graph')
export class ScientificGraph extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(
        --graph-font-family,
        system-ui,
        -apple-system,
        sans-serif
      );
    }

    .graph-container {
      position: relative;
      background-color: var(--graph-bg-color, #ffffff);
      border: var(--graph-border, 2px solid #e5e7eb);
      border-radius: var(--graph-border-radius, 12px);
      padding: var(--graph-padding, 24px);
      margin: var(--graph-margin, 0);
      max-width: var(--graph-max-width, 100%);
      width: var(--graph-width, 100%);
      min-height: var(--graph-min-height, 400px);
      box-shadow: var(--graph-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
      transition: var(--graph-transition, all 0.2s ease-in-out);
      display: flex;
      flex-direction: column;
      gap: var(--graph-gap, 20px);
    }

    .graph-container:hover {
      box-shadow: var(--graph-hover-shadow, 0 8px 12px rgba(0, 0, 0, 0.15));
    }

    .graph-container.loading {
      position: relative;
    }

    .graph-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(
        --graph-loading-overlay-bg,
        rgba(255, 255, 255, 0.8)
      );
      border-radius: var(--graph-border-radius, 12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--graph-loading-z-index, 10);
    }

    .graph-loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--graph-loading-spinner-color, #e5e7eb);
      border-top: 3px solid var(--graph-loading-spinner-active-color, #007bff);
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

    .graph-header {
      display: flex;
      flex-direction: column;
      gap: var(--graph-header-gap, 8px);
      padding-bottom: var(--graph-header-padding-bottom, 16px);
      border-bottom: var(--graph-header-border, 1px solid #f3f4f6);
    }

    .graph-title {
      font-size: var(--graph-title-font-size, 24px);
      font-weight: var(--graph-title-font-weight, 600);
      color: var(--graph-title-color, #111827);
      margin: 0;
      line-height: var(--graph-title-line-height, 1.2);
    }

    .graph-subtitle {
      font-size: var(--graph-subtitle-font-size, 16px);
      font-weight: var(--graph-subtitle-font-weight, 400);
      color: var(--graph-subtitle-color, #6b7280);
      margin: 0;
      line-height: var(--graph-subtitle-line-height, 1.4);
    }

    .graph-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--graph-toolbar-gap, 12px);
      padding: var(--graph-toolbar-padding, 12px 0);
      flex-wrap: wrap;
      position: relative;
      z-index: var(--graph-toolbar-z-index, 100);
    }

    .graph-controls {
      display: flex;
      gap: var(--graph-controls-gap, 8px);
      align-items: center;
      flex-wrap: wrap;
      position: relative;
      z-index: var(--graph-controls-z-index, 101);
    }

    .graph-actions {
      display: flex;
      gap: var(--graph-actions-gap, 8px);
      align-items: center;
    }

    .graph-canvas-container {
      position: relative;
      flex: 1;
      min-height: var(--graph-canvas-min-height, 300px);
      background-color: var(--graph-canvas-bg-color, #ffffff);
      border-radius: var(--graph-canvas-border-radius, 8px);
      overflow: hidden;
    }

    canvas {
      display: block;
      max-width: 100%;
      height: auto;
    }

    .graph-error {
      background-color: var(--graph-error-bg-color, #fef2f2);
      border: var(--graph-error-border, 1px solid #fecaca);
      border-radius: var(--graph-error-border-radius, 8px);
      padding: var(--graph-error-padding, 12px 16px);
      color: var(--graph-error-color, #dc2626);
      font-size: var(--graph-error-font-size, 14px);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .graph-statistics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: var(--graph-stats-gap, 12px);
      padding: var(--graph-stats-padding, 16px 0 0 0);
      border-top: var(--graph-stats-border, 1px solid #f3f4f6);
    }

    .graph-stat-item {
      text-align: center;
      padding: var(--graph-stat-padding, 12px);
      background-color: var(--graph-stat-bg-color, #f9fafb);
      border-radius: var(--graph-stat-border-radius, 8px);
      border: var(--graph-stat-border, 1px solid #f3f4f6);
    }

    .graph-stat-label {
      font-size: var(--graph-stat-label-font-size, 12px);
      font-weight: var(--graph-stat-label-font-weight, 500);
      color: var(--graph-stat-label-color, #6b7280);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .graph-stat-value {
      font-size: var(--graph-stat-value-font-size, 18px);
      font-weight: var(--graph-stat-value-font-weight, 600);
      color: var(--graph-stat-value-color, #111827);
    }

    .graph-legend {
      display: flex;
      flex-wrap: wrap;
      gap: var(--graph-legend-gap, 12px);
      padding: var(--graph-legend-padding, 12px 0);
      border-top: var(--graph-legend-border, 1px solid #f3f4f6);
      justify-content: center;
    }

    .graph-legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: var(--graph-legend-font-size, 14px);
      color: var(--graph-legend-color, #374151);
    }

    .graph-legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .graph-container {
        padding: var(--graph-mobile-padding, 16px);
        gap: var(--graph-mobile-gap, 16px);
      }

      .graph-toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .graph-controls,
      .graph-actions {
        justify-content: center;
      }

      .graph-statistics {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: var(--graph-mobile-stats-gap, 8px);
      }
    }

    /* Compact variant */
    .graph-container.compact {
      padding: var(--graph-compact-padding, 16px);
      gap: var(--graph-compact-gap, 12px);
      min-height: var(--graph-compact-min-height, 250px);
    }

    .graph-container.compact .graph-canvas-container {
      min-height: var(--graph-compact-canvas-min-height, 200px);
    }

    .graph-container.compact .graph-statistics {
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    }
  `;

  @property({type: String})
  override title = 'Scientific Graph';

  @property({type: String})
  subtitle = '';

  @property({type: String})
  variant: 'default' | 'compact' = 'default';

  @property({type: String})
  type: ChartType = 'line';

  @property({type: Array})
  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  @property({type: Array})
  datasets: GraphDataset[] = [
    {
      label: 'Sample Data',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#007bff',
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
      borderWidth: 2,
      tension: 0.1,
    },
  ];

  @property({type: Boolean})
  showStatistics = true;

  @property({type: Boolean})
  showLegend = true;

  @property({type: Boolean})
  showToolbar = true;

  @property({type: Boolean})
  isLoading = false;

  @property({type: Boolean})
  responsive = true;

  @property({type: Boolean})
  maintainAspectRatio = false;

  @property({type: Boolean})
  showGrid = true;

  @property({type: Boolean})
  showAxes = true;

  @property({type: Boolean})
  enableZoom = false;

  @property({type: Boolean})
  enablePan = false;

  @property({type: Boolean})
  animateOnLoad = true;

  @property({type: String})
  errorMessage = '';

  @property({type: String})
  xAxisTitle = '';

  @property({type: String})
  yAxisTitle = '';

  @property({type: Object})
  customOptions: Partial<ChartOptions> = {};

  @property({attribute: false})
  onDataClick?: (
    dataPoint: number,
    datasetIndex: number,
    index: number
  ) => void;

  @property({attribute: false})
  onExport?: (format: 'png' | 'jpg' | 'pdf') => void;

  private chart: Chart | null = null;

  // Chart type options for dropdown
  private chartTypeOptions = [
    {label: 'Line Chart', value: 'line'},
    {label: 'Bar Chart', value: 'bar'},
    {label: 'Pie Chart', value: 'pie'},
    {label: 'Doughnut Chart', value: 'doughnut'},
    {label: 'Scatter Plot', value: 'scatter'},
    {label: 'Area Chart', value: 'area'},
    {label: 'Radar Chart', value: 'radar'},
  ];

  override firstUpdated() {
    this._createChart();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('type') ||
      changedProperties.has('labels') ||
      changedProperties.has('datasets') ||
      changedProperties.has('customOptions') ||
      changedProperties.has('showGrid') ||
      changedProperties.has('showAxes') ||
      changedProperties.has('xAxisTitle') ||
      changedProperties.has('yAxisTitle')
    ) {
      this._recreateChart();
    }
  }

  private _createChart() {
    const canvas = this.shadowRoot?.querySelector(
      'canvas'
    ) as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    try {
      const chartData = {
        labels: this.labels,
        datasets: this.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor:
            dataset.backgroundColor || this._getDefaultColor(index, 0.2),
          borderColor: dataset.borderColor || this._getDefaultColor(index, 1),
          borderWidth: dataset.borderWidth || 2,
        })),
      };

      const chartOptions: ChartOptions = {
        responsive: this.responsive,
        maintainAspectRatio: this.maintainAspectRatio,
        animation: this.animateOnLoad
          ? {
              duration: 1000,
              easing: 'easeInOutQuart',
            }
          : false,
        plugins: {
          legend: {
            display: this.showLegend && this.showToolbar,
            position: 'top',
            labels: {
              padding: 20,
              usePointStyle: true,
            },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#007bff',
            borderWidth: 1,
          },
        },
        scales: this.showAxes
          ? {
              x: {
                display: true,
                grid: {
                  display: this.showGrid,
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                title: {
                  display: !!this.xAxisTitle,
                  text: this.xAxisTitle,
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                },
              },
              y: {
                display: true,
                grid: {
                  display: this.showGrid,
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                title: {
                  display: !!this.yAxisTitle,
                  text: this.yAxisTitle,
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                },
              },
            }
          : {},
        onClick: (_event, elements) => {
          if (elements.length > 0 && this.onDataClick) {
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const index = element.index;
            const dataPoint = this.datasets[datasetIndex]?.data[index];
            this.onDataClick(dataPoint, datasetIndex, index);
          }
        },
        ...this.customOptions,
      };

      this.chart = new Chart(ctx, {
        type: this.type,
        data: chartData,
        options: chartOptions,
      });

      this.errorMessage = '';
    } catch (error) {
      this.errorMessage =
        error instanceof Error ? error.message : 'Failed to create chart';
      console.error('Chart creation error:', error);
    }
  }

  private _recreateChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this._createChart();
  }

  private _getDefaultColor(index: number, alpha: number): string {
    const colors = [
      '#007bff',
      '#28a745',
      '#dc3545',
      '#ffc107',
      '#17a2b8',
      '#6f42c1',
      '#e83e8c',
      '#fd7e14',
      '#20c997',
      '#6c757d',
    ];
    const color = colors[index % colors.length];

    // Convert hex to rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private _calculateStatistics(): GraphStatistics | null {
    if (!this.datasets.length || !this.datasets[0]?.data.length) {
      return null;
    }

    // Calculate statistics for the first dataset
    const data = this.datasets[0].data;
    const sortedData = [...data].sort((a, b) => a - b);

    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / data.length;

    const median =
      sortedData.length % 2 === 0
        ? (sortedData[sortedData.length / 2 - 1] +
            sortedData[sortedData.length / 2]) /
          2
        : sortedData[Math.floor(sortedData.length / 2)];

    const min = Math.min(...data);
    const max = Math.max(...data);

    const variance =
      data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
    const standardDeviation = Math.sqrt(variance);

    return {
      mean: Number(mean.toFixed(2)),
      median: Number(median.toFixed(2)),
      min,
      max,
      standardDeviation: Number(standardDeviation.toFixed(2)),
      variance: Number(variance.toFixed(2)),
    };
  }

  private _handleTypeChange(e: CustomEvent) {
    const {value} = e.detail;
    this.type = value as ChartType;
    this.dispatchEvent(
      new CustomEvent('graph-type-changed', {
        detail: {type: this.type},
      })
    );
  }

  private _handleExport = (format: 'png' | 'jpg' | 'pdf') => {
    return () => {
      if (!this.chart) return;

      try {
        if (format === 'pdf') {
          // For PDF export, you'd typically use a library like jsPDF
          this.onExport?.(format);
        } else {
          const url = this.chart.toBase64Image('image/' + format, 1.0);
          const link = document.createElement('a');
          link.download = `${this.title
            .replace(/\s+/g, '_')
            .toLowerCase()}.${format}`;
          link.href = url;
          link.click();
        }

        this.dispatchEvent(
          new CustomEvent('graph-exported', {
            detail: {format, title: this.title},
          })
        );
      } catch (error) {
        console.error('Export error:', error);
        this.errorMessage = 'Failed to export chart';
      }
    };
  };

  private _handleDataRefresh = () => {
    return () => {
      this._recreateChart();
      this.dispatchEvent(new CustomEvent('graph-refreshed'));
    };
  };

  private _getContainerClasses() {
    const classes = ['graph-container'];

    if (this.variant !== 'default') {
      classes.push(this.variant);
    }

    if (this.isLoading) {
      classes.push('loading');
    }

    return classes.join(' ');
  }

  private _renderStatistics() {
    if (!this.showStatistics) return '';

    const stats = this._calculateStatistics();
    if (!stats) return '';

    return html`
      <div class="graph-statistics">
        <div class="graph-stat-item">
          <div class="graph-stat-label">Mean</div>
          <div class="graph-stat-value">${stats.mean}</div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Median</div>
          <div class="graph-stat-value">${stats.median}</div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Min</div>
          <div class="graph-stat-value">${stats.min}</div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Max</div>
          <div class="graph-stat-value">${stats.max}</div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Std Dev</div>
          <div class="graph-stat-value">${stats.standardDeviation}</div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Variance</div>
          <div class="graph-stat-value">${stats.variance}</div>
        </div>
      </div>
    `;
  }

  private _renderLegend() {
    if (!this.showLegend || !this.datasets.length) return '';

    return html`
      <div class="graph-legend">
        ${this.datasets.map(
          (dataset, index) => html`
            <div class="graph-legend-item">
              <div
                class="graph-legend-color"
                style="background-color: ${dataset.borderColor ||
                this._getDefaultColor(index, 1)}"
              ></div>
              <span>${dataset.label}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  override render() {
    return html`
      <div class="${this._getContainerClasses()}">
        ${this.isLoading
          ? html`
              <div class="graph-loading-overlay">
                <div class="graph-loading-spinner"></div>
              </div>
            `
          : ''}
        ${this.title || this.subtitle
          ? html`
              <div class="graph-header">
                <slot name="header">
                  ${this.title
                    ? html`<h2 class="graph-title">${this.title}</h2>`
                    : ''}
                  ${this.subtitle
                    ? html`<p class="graph-subtitle">${this.subtitle}</p>`
                    : ''}
                </slot>
              </div>
            `
          : ''}
        ${this.showToolbar
          ? html`
              <div class="graph-toolbar">
                <div class="graph-controls">
                  <scientific-dropdown
                    .label=${'Chart Type'}
                    .options=${this.chartTypeOptions}
                    .selectedValue=${this.type}
                    .disabled=${this.isLoading}
                    .placeholder=${'Select chart type'}
                    style="min-width: 150px;"
                    @option-selected=${this._handleTypeChange}
                  ></scientific-dropdown>
                </div>

                <div class="graph-actions">
                  <scientific-button
                    .label=${'📊 PNG'}
                    .variant=${'outline'}
                    .size=${'small'}
                    .disabled=${this.isLoading || !this.chart}
                    .action=${this._handleExport('png')}
                    title="Export as PNG"
                  ></scientific-button>
                  <scientific-button
                    .label=${'🖼️ JPG'}
                    .variant=${'outline'}
                    .size=${'small'}
                    .disabled=${this.isLoading || !this.chart}
                    .action=${this._handleExport('jpg')}
                    title="Export as JPG"
                  ></scientific-button>
                  <scientific-button
                    .label=${'🔄 Refresh'}
                    .variant=${'outline'}
                    .size=${'small'}
                    .disabled=${this.isLoading}
                    .action=${this._handleDataRefresh()}
                    title="Refresh Chart"
                  ></scientific-button>
                </div>
              </div>
            `
          : ''}
        ${this.errorMessage
          ? html`
              <div class="graph-error" role="alert">
                <span>⚠️</span>
                <span>${this.errorMessage}</span>
              </div>
            `
          : ''}

        <div class="graph-canvas-container">
          <canvas></canvas>
        </div>

        ${this._renderStatistics()} ${this._renderLegend()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-graph': ScientificGraph;
  }
}
