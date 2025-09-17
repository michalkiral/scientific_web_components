import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Chart, ChartType, ChartOptions} from 'chart.js/auto';
import '../Button/scientific-button.js';
import '../Dropdown/scientific-dropdown.js';
import {
  sharedVariables,
  containerStyles,
  headerStyles,
  messageStyles,
  loadingSpinnerStyles,
  responsiveStyles,
} from '../shared/styles/common-styles.js';
import {dispatchCustomEvent} from '../shared/utils/event-utils.js';
import {
  classNames,
  formatValue,
  roundToDecimals,
} from '../shared/utils/dom-utils.js';
import {getDefaultColor} from '../shared/utils/color-utils.js';

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
  static override styles = [
    sharedVariables,
    containerStyles,
    headerStyles,
    messageStyles,
    loadingSpinnerStyles,
    responsiveStyles,
    css`
      :host {
        display: block;
        font-family: var(--scientific-font-family);
      }

      .graph-container {
        width: var(--graph-width, 100%);
        max-width: var(--graph-max-width, 100%);
        min-height: var(--graph-min-height, 400px);
      }

      .graph-container.loading {
        position: relative;
      }

      .graph-header {
        border-bottom: var(--graph-header-border, 1px solid #f3f4f6);
      }

      .graph-title {
        font-size: var(--graph-title-font-size, var(--scientific-text-2xl));
      }

      .graph-subtitle {
        font-size: var(--graph-subtitle-font-size, var(--scientific-text-base));
      }

      .graph-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--graph-toolbar-gap, var(--scientific-spacing-md));
        padding: var(--graph-toolbar-padding, var(--scientific-spacing-md) 0);
        flex-wrap: wrap;
        position: relative;
        z-index: var(--graph-toolbar-z-index, 100);
      }

      .graph-controls {
        display: flex;
        gap: var(--graph-controls-gap, var(--scientific-spacing-sm));
        align-items: center;
        flex-wrap: wrap;
        position: relative;
        z-index: var(--graph-controls-z-index, 101);
      }

      .graph-controls scientific-dropdown {
        --dropdown-min-height: 36px;
        --dropdown-padding: var(--scientific-spacing-sm)
          var(--scientific-spacing-md);
        --dropdown-font-size: var(--scientific-text-sm);
        --dropdown-label-font-size: var(--scientific-text-xs);
        --dropdown-label-margin-bottom: var(--scientific-spacing-xs);
        --dropdown-options-border-radius: var(--scientific-border-radius);
        --dropdown-z-index: 1100;
        --dropdown-width: 180px;
        --dropdown-options-width: 180px;
        --dropdown-options-min-width: 180px;
        --dropdown-options-max-width: 180px;
        width: 180px;
        display: block;
      }

      .graph-actions {
        display: flex;
        gap: var(--graph-actions-gap, var(--scientific-spacing-sm));
        align-items: center;
      }

      .graph-canvas-container {
        position: relative;
        flex: 1;
        min-height: var(--graph-canvas-min-height, 300px);
        background-color: var(--graph-canvas-bg-color, #ffffff);
        border-radius: var(
          --graph-canvas-border-radius,
          var(--scientific-border-radius)
        );
        overflow: hidden;
      }

      canvas {
        display: block;
        max-width: 100%;
        height: auto;
      }

      .graph-error {
        display: flex;
        align-items: center;
        gap: var(--scientific-spacing-sm);
      }

      .graph-statistics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: var(--graph-stats-gap, var(--scientific-spacing-md));
        padding: var(--graph-stats-padding, var(--scientific-spacing-lg) 0 0 0);
        border-top: var(--graph-stats-border, 1px solid #f3f4f6);
      }

      .graph-stat-item {
        text-align: center;
        padding: var(--graph-stat-padding, var(--scientific-spacing-md));
        background-color: var(--graph-stat-bg-color, #f9fafb);
        border-radius: var(
          --graph-stat-border-radius,
          var(--scientific-border-radius)
        );
        border: var(--graph-stat-border, 1px solid #f3f4f6);
      }

      .graph-stat-label {
        font-size: var(--graph-stat-label-font-size, var(--scientific-text-xs));
        font-weight: var(--graph-stat-label-font-weight, 500);
        color: var(--graph-stat-label-color, #6b7280);
        margin-bottom: var(--scientific-spacing-xs);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .graph-stat-value {
        font-size: var(--graph-stat-value-font-size, var(--scientific-text-lg));
        font-weight: var(--graph-stat-value-font-weight, 600);
        color: var(--graph-stat-value-color, #111827);
      }

      .graph-legend {
        display: flex;
        flex-wrap: wrap;
        gap: var(--graph-legend-gap, var(--scientific-spacing-md));
        padding: var(--graph-legend-padding, var(--scientific-spacing-md) 0);
        border-top: var(--graph-legend-border, 1px solid #f3f4f6);
        justify-content: center;
      }

      .graph-legend-item {
        display: flex;
        align-items: center;
        gap: var(--scientific-spacing-sm);
        font-size: var(--graph-legend-font-size, var(--scientific-text-sm));
        color: var(--graph-legend-color, #374151);
      }

      .graph-legend-color {
        width: var(--scientific-spacing-md);
        height: var(--scientific-spacing-md);
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      @media (max-width: 768px) {
        .graph-container {
          min-height: var(--graph-mobile-min-height, 300px);
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
          gap: var(--graph-mobile-stats-gap, var(--scientific-spacing-sm));
        }
      }

      .graph-container.compact {
        min-height: var(--graph-compact-min-height, 250px);
      }

      .graph-container.compact .graph-canvas-container {
        min-height: var(--graph-compact-canvas-min-height, 200px);
      }

      .graph-container.compact .graph-statistics {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      }
    `,
  ];

  @property({type: String})
  override title = 'Scientific Graph';

  @property({type: String})
  subtitle = '';

  @property({type: String})
  variant: 'default' | 'compact' = 'default';

  @property({type: String})
  type: ChartType = 'line';

  @property({type: Boolean})
  isAreaChart = false;

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
  showExportButtons = false;

  @property({type: Array})
  exportFormats: ('png' | 'jpg' | 'pdf')[] = ['png', 'jpg', 'pdf'];

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
    setTimeout(() => {
      this._createChart();
    }, 50);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._destroyChart();
  }

  private _destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('type') ||
      changedProperties.has('isAreaChart') ||
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

    if (!canvas) {
      console.warn('Canvas element not found in shadow DOM');
      return;
    }

    if (!ctx) {
      console.warn('Could not get 2D context from canvas');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const existingChart = (canvas as HTMLCanvasElement & {chart?: Chart}).chart;
    if (existingChart) {
      console.warn('Canvas already has a chart, destroying it first');
      existingChart.destroy();
    }

    try {
      const ChartClass = (window as unknown as {Chart?: typeof Chart}).Chart;
      if (ChartClass && 'getChart' in ChartClass) {
        const existingChartInstance = (
          ChartClass as unknown as {
            getChart: (canvas: HTMLCanvasElement) => Chart | undefined;
          }
        ).getChart(canvas);
        if (existingChartInstance) {
          existingChartInstance.destroy();
        }
      }
    } catch (error) {
      // Ignore errors during cleanup
    }

    try {
      const chartData = {
        labels: this.labels,
        datasets: this.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor:
            dataset.backgroundColor ||
            getDefaultColor(index, this.isAreaChart ? 0.3 : 0.2),
          borderColor: dataset.borderColor || getDefaultColor(index, 1),
          borderWidth: dataset.borderWidth || 2,
          fill: this.isAreaChart ? true : dataset.fill ?? false,
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

      this.requestUpdate();
    } catch (error) {
      this.errorMessage =
        error instanceof Error ? error.message : 'Failed to create chart';
      console.error('Chart creation error:', error);
    }
  }

  private _recreateChart() {
    this._destroyChart();
    setTimeout(() => {
      this._createChart();
    }, 50);
  }

  private _calculateStatistics(): GraphStatistics | null {
    if (!this.datasets.length || !this.datasets[0]?.data.length) {
      return null;
    }

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
      mean: roundToDecimals(mean, 2),
      median: roundToDecimals(median, 2),
      min,
      max,
      standardDeviation: roundToDecimals(standardDeviation, 2),
      variance: roundToDecimals(variance, 2),
    };
  }

  private _handleTypeChange(e: CustomEvent) {
    const {value} = e.detail;

    this.isAreaChart = value === 'area';
    this.type = this.isAreaChart ? 'line' : (value as ChartType);

    dispatchCustomEvent(this, 'graph-type-changed', {
      type: this.type,
      isAreaChart: this.isAreaChart,
    });
  }

  private _handleExport = (format: 'png' | 'jpg' | 'pdf') => {
    return () => {
      if (!this.chart) {
        return;
      }

      try {
        if (this.onExport) {
          this.onExport(format);
        } else {
          if (format === 'pdf') {
            this._exportToPDF();
          } else {
            this._exportToImage(format);
          }
        }

        dispatchCustomEvent(this, 'graph-exported', {
          format,
          title: this.title,
        });
      } catch (error) {
        console.error('Export error:', error);
        this.errorMessage = `Failed to export chart as ${format.toUpperCase()}`;
      }
    };
  };

  private _exportToImage(format: 'png' | 'jpg') {
    if (!this.chart) return;

    if (format === 'jpg') {
      const canvas = this.chart.canvas;
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');

      if (!tempCtx) return;

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      tempCtx.fillStyle = '#ffffff';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      tempCtx.drawImage(canvas, 0, 0);

      const url = tempCanvas.toDataURL('image/jpeg', 0.95);
      this._downloadFile(url, format);
    } else {
      const url = this.chart.toBase64Image('image/png', 1.0);
      this._downloadFile(url, format);
    }
  }

  private async _exportToPDF() {
    if (!this.chart) return;

    try {
      const {jsPDF} = await import('jspdf');

      const canvas = this.chart.canvas;
      const imgData = canvas.toDataURL('image/png', 1.0);

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgHeight / imgWidth;

      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 40;

      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2 - 60;

      let finalWidth = maxWidth;
      let finalHeight = finalWidth * ratio;

      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight / ratio;
      }

      const pdf = new jsPDF('p', 'pt', 'a4');

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      const titleWidth = pdf.getTextWidth(this.title);
      const titleX = (pageWidth - titleWidth) / 2;
      pdf.text(this.title, titleX, margin + 20);

      if (this.subtitle) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        const subtitleWidth = pdf.getTextWidth(this.subtitle);
        const subtitleX = (pageWidth - subtitleWidth) / 2;
        pdf.text(this.subtitle, subtitleX, margin + 40);
      }

      const imgX = (pageWidth - finalWidth) / 2;
      const imgY = margin + (this.subtitle ? 60 : 40);

      pdf.addImage(imgData, 'PNG', imgX, imgY, finalWidth, finalHeight);

      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      const timestamp = new Date().toLocaleString();
      pdf.text(`Generated on ${timestamp}`, margin, pageHeight - 20);

      const fileName = `${this.title.replace(/\s+/g, '_').toLowerCase()}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF export error:', error);

      const message = `PDF export requires jsPDF library. Please install it with: npm install jspdf`;
      console.warn(message);
      this.errorMessage =
        'PDF export not available. Check console for installation instructions.';

      this._exportToImage('png');
    }
  }

  getChartDataURL(format: 'png' | 'jpg' = 'png', quality = 1.0): string | null {
    if (!this.chart) return null;

    if (format === 'jpg') {
      const canvas = this.chart.canvas;
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');

      if (!tempCtx) return null;

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      tempCtx.fillStyle = '#ffffff';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(canvas, 0, 0);

      return tempCanvas.toDataURL('image/jpeg', quality);
    } else {
      return this.chart.toBase64Image('image/png', quality);
    }
  }

  getChart(): Chart | null {
    return this.chart;
  }

  private _downloadFile(dataUrl: string, format: string) {
    const link = document.createElement('a');
    const fileName = `${this.title
      .replace(/\s+/g, '_')
      .toLowerCase()}.${format}`;

    link.download = fileName;
    link.href = dataUrl;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private _handleDataRefresh = () => {
    return () => {
      this._recreateChart();
      dispatchCustomEvent(this, 'graph-refreshed', {
        timestamp: new Date().toISOString(),
      });
    };
  };

  private _getContainerClasses() {
    return classNames(
      'scientific-container',
      'graph-container',
      this.variant !== 'default' && this.variant,
      this.isLoading && 'loading'
    );
  }

  private _renderStatistics() {
    if (!this.showStatistics) return '';

    const stats = this._calculateStatistics();
    if (!stats) return '';

    return html`
      <div class="graph-statistics">
        <div class="graph-stat-item">
          <div class="graph-stat-label">Mean</div>
          <div class="graph-stat-value">
            ${formatValue(stats.mean, {decimals: 2})}
          </div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Median</div>
          <div class="graph-stat-value">
            ${formatValue(stats.median, {decimals: 2})}
          </div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Min</div>
          <div class="graph-stat-value">
            ${formatValue(stats.min, {decimals: 0})}
          </div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Max</div>
          <div class="graph-stat-value">
            ${formatValue(stats.max, {decimals: 0})}
          </div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Std Dev</div>
          <div class="graph-stat-value">
            ${formatValue(stats.standardDeviation, {decimals: 2})}
          </div>
        </div>
        <div class="graph-stat-item">
          <div class="graph-stat-label">Variance</div>
          <div class="graph-stat-value">
            ${formatValue(stats.variance, {decimals: 2})}
          </div>
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
                getDefaultColor(index, 1)}"
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
              <div class="loading-overlay">
                <div class="loading-spinner"></div>
              </div>
            `
          : ''}
        ${this.title || this.subtitle
          ? html`
              <div class="scientific-header graph-header">
                <slot name="header">
                  ${this.title
                    ? html`<h2 class="scientific-title graph-title">
                        ${this.title}
                      </h2>`
                    : ''}
                  ${this.subtitle
                    ? html`<p class="scientific-subtitle graph-subtitle">
                        ${this.subtitle}
                      </p>`
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
                    .selectedValue=${this.isAreaChart ? 'area' : this.type}
                    .disabled=${this.isLoading}
                    .placeholder=${'Select chart type'}
                    @option-selected=${this._handleTypeChange}
                  ></scientific-dropdown>
                </div>

                <div class="graph-actions">
                  ${this.showExportButtons
                    ? html`
                        ${this.exportFormats.includes('png')
                          ? html`
                              <scientific-button
                                .label=${'PNG'}
                                .variant=${'outline'}
                                .size=${'small'}
                                .disabled=${this.isLoading || !this.chart}
                                .action=${this._handleExport('png')}
                                title="Export chart as PNG image"
                              ></scientific-button>
                            `
                          : ''}
                        ${this.exportFormats.includes('jpg')
                          ? html`
                              <scientific-button
                                .label=${'JPG'}
                                .variant=${'outline'}
                                .size=${'small'}
                                .disabled=${this.isLoading || !this.chart}
                                .action=${this._handleExport('jpg')}
                                title="Export chart as JPG image"
                              ></scientific-button>
                            `
                          : ''}
                        ${this.exportFormats.includes('pdf')
                          ? html`
                              <scientific-button
                                .label=${'PDF'}
                                .variant=${'outline'}
                                .size=${'small'}
                                .disabled=${this.isLoading || !this.chart}
                                .action=${this._handleExport('pdf')}
                                title="Export chart as PDF document"
                              ></scientific-button>
                            `
                          : ''}
                      `
                    : ''}
                  <scientific-button
                    .label=${'Refresh'}
                    .variant=${'outline'}
                    .size=${'small'}
                    .disabled=${this.isLoading}
                    .action=${this._handleDataRefresh()}
                    title="Refresh Chart"
                  ></scientific-button>

                  <slot name="actions"></slot>
                </div>
              </div>
            `
          : ''}
        ${this.errorMessage
          ? html`
              <div class="scientific-error graph-error" role="alert">
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
