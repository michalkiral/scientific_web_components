import {temperatureData, experimentData} from './scientific-graph.stories.data.js';
import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-graph.js';
import '../Button/scientific-button.js';
import '../Dropdown/scientific-dropdown.js';

const meta: Meta = {
  title: 'Scientific/Graph',
  component: 'scientific-graph',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Scientific Graph

A **theme-aware**, **exportable** Chart.js surface for scientific dashboards with statistics, toolbar controls, and dataset utilities.

---

## Props

- \`theme\` - Applies design-system theming tokens (\`default\`, \`dark\`, \`scientific\`)
- \`title\` - Header text rendered above the chart
- \`subtitle\` - Supporting description text beneath the header
- \`showToolbar\` - Toggles the surface toolbar; also controls legend visibility
- \`isLoading\` - Displays the loading overlay while data is being prepared
- \`errorMessage\` - Message rendered with \`role="alert"\`
- \`successMessage\` - Message rendered with \`role="status"\`
- \`type\` - Chart.js chart type (e.g. 'line', 'bar', 'pie', 'doughnut', 'radar', 'scatter')
- \`isAreaChart\` - Fills line datasets to render an area chart while keeping \`type='line'\`
- \`labels\` - Array of category labels for the X axis
- \`datasets\` - Array of \`GraphDataset\` objects describing the plotted series
- \`showStatistics\` - Displays the statistics grid derived from the first dataset
- \`showLegend\` - Shows the legend (requires \`showToolbar\` to be true)
- \`showExportButtons\` - Adds export buttons to the toolbar (default: false)
- \`exportFormats\` - Ordered list of export formats to expose ('png', 'jpg', 'pdf')
- \`responsive\` - Enables Chart.js responsive resizing (default: true)
- \`maintainAspectRatio\` - Preserves the original aspect ratio on resize (default: false)
- \`showGrid\` - Toggles grid line rendering for visible axes
- \`showAxes\` - Toggles axes entirely
- \`animateOnLoad\` - Enables the 1s ease-in-out animation the first time the chart renders
- \`xAxisTitle\` - Optional X axis title text
- \`yAxisTitle\` - Optional Y axis title text
- \`customOptions\` - Partial Chart.js options merged into the generated configuration
- \`onExport\` - Optional callback invoked before built-in export handling (\`format\`) => void
- \`onDataClick\` - Optional callback fired when a data point is clicked (\`value\`, \`datasetIndex\`, \`index\`)
- \`enableZoom\` / \`enablePan\` - Reserved for future zoom and pan support (currently no effect)

## Events

- \`graph-type-changed\` - detail: {type, isAreaChart}; emitted when the toolbar type selector changes (bubbles, composed)
- \`graph-exported\` - detail: {format, title}; emitted after a successful export (bubbles, composed)
- \`graph-refreshed\` - detail: {timestamp}; emitted when the refresh action rebuilds the chart (bubbles, composed)

## Basic Usage

\`\`\`html
<scientific-graph
  title="Sample Scientific Data"
  subtitle="Basic line chart with default settings"
  type="line"
  .labels="\${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}"
  .datasets="\${[{
    label: 'Sample Data',
    data: [12, 19, 3, 5, 2, 3]
  }]}"
  showStatistics
  showLegend
  showToolbar
></scientific-graph>
\`\`\`

**Advanced Usage with Export:**
\`\`\`html
<scientific-graph
  title="Temperature Data"
  type="line"
  .labels="\${monthLabels}"
  .datasets="\${temperatureDatasets}"
  showToolbar
  showExportButtons
  .exportFormats="\${['png', 'pdf']}"
  xAxisTitle="Month"
  yAxisTitle="Temperature (degC)"
  @graph-exported="\${handleExport}"
></scientific-graph>
\`\`\`

## Features

- **Chart.js Integration**: Generates theme-aware datasets, fills area charts automatically, and accepts additional Chart.js options
- **Toolbar Controls**: Built-in scientific toolbar handles type switching, refresh, and optional exports
- **Statistics Panel**: Calculates mean, median, min, max, standard deviation, and variance for the first dataset
- **Legend & Theming**: Legend items, axes, and tooltips inherit the active design-system palette
- **Exports & Callbacks**: Supports PNG/JPG/PDF export, programmatic hooks (\`onExport\`, \`getDataURL\`, \`getExportData\`), and data-point click callbacks
- **Surface Messaging**: Inherits loading, error, and success messaging utilities from \`ScientificSurfaceBase\`
- **Programmatic API**: Exposes \`getChart()\` and \`getCanvasElement()\` helpers for integrations and testing

## Accessibility Features

- **Surface Alerts**: Error and success states use \`role="alert"\` and \`role="status"\` for assistive technologies
- **Visible Loading**: Overlay displays text alongside the spinner while \`isLoading\` is true
- **Keyboard-Friendly Toolbar**: Toolbar actions rely on native buttons/selects for predictable keyboard navigation
- **Textual Legends & Stats**: Legend entries and statistics grid render as plain text for screen-reader consumption
- **Theme Contrast**: Design-system tokens adjust tooltip, grid, and axis colors for light and dark themes

## Dataset Configuration

Each dataset object supports these properties:

    {
      label: string;              // Dataset name
      data: number[];             // Data points
      backgroundColor?: string | string[];  // Fill colors (auto-generated when omitted)
      borderColor?: string | string[];      // Stroke colors (auto-generated when omitted)
      borderWidth?: number;       // Stroke thickness (default 2)
      tension?: number;           // Line curve tension (0-1)
      fill?: boolean;             // Override area fill behaviour
      pointRadius?: number;       // Point size
      pointHoverRadius?: number;  // Point hover size
    }

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
    scientific-graph {
      --container-border: var(--scientific-border);
      --container-shadow: var(--scientific-shadow);
      --graph-max-width: 960px;
      --graph-min-height: 360px;
      --graph-canvas-bg-color: #ffffff;
    }

**Available CSS Variables:**

    scientific-graph {
      /* Dimensions & layout */
      --graph-width: 100%;
      --graph-max-width: 100%;
      --graph-min-height: 400px;
      --graph-canvas-min-height: 300px;
      --graph-canvas-bg-color: var(--scientific-bg-primary);

      /* Header & toolbar */
      --graph-header-border: 1px solid #f3f4f6;
      --graph-title-font-size: var(--scientific-text-2xl);
      --graph-subtitle-font-size: var(--scientific-text-base);
      --graph-toolbar-gap: var(--scientific-spacing-sm);
      --graph-toolbar-padding: var(--scientific-spacing-md) 0;

      /* Legend & stats */
      --graph-stats-gap: var(--scientific-spacing-md);
      --graph-stats-padding: var(--scientific-spacing-lg) 0 0 0;
      --graph-stat-padding: var(--scientific-spacing-md);
      --graph-stats-border: 1px solid #f3f4f6;
      --graph-stat-bg-color: var(--scientific-bg-tertiary);
      --graph-stat-border: 1px solid #f3f4f6;
      --graph-stat-label-color: var(--scientific-text-secondary);
      --graph-stat-value-color: var(--scientific-text-primary);
    }
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the graph',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle of the graph',
    },
    type: {
      control: 'select',
      options: ['line', 'bar', 'pie', 'doughnut', 'scatter', 'area', 'radar'],
      description: 'The type of chart to display',
    },
    isAreaChart: {
      control: 'boolean',
      description:
        'Internal flag for area chart rendering (automatically managed)',
    },
    labels: {
      control: 'object',
      description: 'Array of labels for data points',
    },
    datasets: {
      control: 'object',
      description: 'Array of dataset objects with data and styling',
    },
    showStatistics: {
      control: 'boolean',
      description: 'Whether to show statistical calculations',
    },
    showLegend: {
      control: 'boolean',
      description: 'Whether to show the legend',
    },
    showToolbar: {
      control: 'boolean',
      description: 'Whether to show the toolbar with controls',
    },
    showExportButtons: {
      control: 'boolean',
      description: 'Whether to show export buttons in toolbar',
    },
    exportFormats: {
      control: {type: 'check'},
      options: ['png', 'jpg', 'pdf'],
      description: 'Which export formats to show',
    },
    showGrid: {
      control: {type: 'boolean'},
      description: 'Whether to show grid lines',
    },
    showAxes: {
      control: 'boolean',
      description: 'Whether to show axes',
    },
    animateOnLoad: {
      control: 'boolean',
      description: 'Whether to animate the chart on load',
    },
    responsive: {
      control: 'boolean',
      description: 'Whether the chart should be responsive',
    },
    maintainAspectRatio: {
      control: 'boolean',
      description: 'Whether to maintain chart aspect ratio',
    },
    enableZoom: {
      control: 'boolean',
      description: 'Whether to enable chart zoom functionality',
    },
    enablePan: {
      control: 'boolean',
      description: 'Whether to enable chart pan functionality',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    xAxisTitle: {
      control: 'text',
      description: 'Title for the X-axis',
    },
    yAxisTitle: {
      control: {type: 'text'},
      description: 'Title for the Y-axis',
    },
    customOptions: {
      control: 'object',
      description: 'Custom Chart.js options object',
    },
    onDataClick: {
      control: false,
      description: 'Click handler for chart data points',
    },
    onExport: {
      control: false,
      description: 'Custom export handler function',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    title: 'Sample Scientific Data',
    subtitle: 'Basic line chart with default settings',
    theme: 'default',
    type: 'line',
    labels: temperatureData.labels,
    datasets: temperatureData.datasets,
    showStatistics: true,
    showLegend: true,
    showToolbar: true,
    showExportButtons: false,
    exportFormats: ['png', 'jpg', 'pdf'],
    showGrid: true,
    showAxes: true,
    animateOnLoad: true,
    responsive: true,
    isLoading: false,
    errorMessage: '',
    xAxisTitle: '',
    yAxisTitle: '',
  },
  render: ({
    title,
    subtitle,
    theme,
    type,
    labels,
    datasets,
    showStatistics,
    showLegend,
    showToolbar,
    showExportButtons,
    exportFormats,
    showGrid,
    showAxes,
    animateOnLoad,
    responsive,
    isLoading,
    errorMessage,
    xAxisTitle,
    yAxisTitle,
  }) =>
    html`<scientific-graph
      .title=${title}
      .subtitle=${subtitle}
      .theme=${theme}
      .type=${type}
      .labels=${labels}
      .datasets=${datasets}
      .showStatistics=${showStatistics}
      .showLegend=${showLegend}
      .showToolbar=${showToolbar}
      .showExportButtons=${showExportButtons}
      .exportFormats=${exportFormats}
      .showGrid=${showGrid}
      .showAxes=${showAxes}
      .animateOnLoad=${animateOnLoad}
      .responsive=${responsive}
      .isLoading=${isLoading}
      .errorMessage=${errorMessage}
      .xAxisTitle=${xAxisTitle}
      .yAxisTitle=${yAxisTitle}
      .onDataClick=${(
        dataPoint: number,
        datasetIndex: number,
        index: number
      ) => {
        console.log(
          'Data point clicked:',
          dataPoint,
          'Dataset:',
          datasetIndex,
          'Index:',
          index
        );
        alert(
          `Clicked data point: ${dataPoint} (Dataset ${datasetIndex}, Index ${index})`
        );
      }}
      style="width: 100%; max-width: 880px; height: 500px;"
    ></scientific-graph>`,
};

export const BarChart: Story = {
  args: {
    title: 'Experimental Results',
    subtitle: 'Comparing treatment effectiveness',
    type: 'bar',
    labels: experimentData.labels,
    datasets: experimentData.datasets,
    showStatistics: true,
    showLegend: false,
    yAxisTitle: 'Response Rate (%)',
    xAxisTitle: 'Treatment Groups',
  },
  render: ({
    title,
    subtitle,
    type,
    labels,
    datasets,
    showStatistics,
    showLegend,
    yAxisTitle,
    xAxisTitle,
  }) =>
    html`<scientific-graph
      .title=${title}
      .subtitle=${subtitle}
      .type=${type}
      .labels=${labels}
      .datasets=${datasets}
      .showStatistics=${showStatistics}
      .showLegend=${showLegend}
      .yAxisTitle=${yAxisTitle}
      .xAxisTitle=${xAxisTitle}
      style="width: 100%; max-width: 880px;"
    ></scientific-graph>`,
};

export const ScatterPlot: Story = {
  args: {
    title: 'Correlation Analysis',
    subtitle: 'Variable X vs Variable Y relationship',
    type: 'scatter',
    labels: [],
    datasets: [
      {
        label: 'Data Points',
        data: [
          {x: 10, y: 20},
          {x: 15, y: 25},
          {x: 20, y: 22},
          {x: 25, y: 30},
          {x: 30, y: 28},
          {x: 35, y: 35},
          {x: 40, y: 32},
          {x: 45, y: 40},
          {x: 50, y: 38},
          {x: 55, y: 45},
          {x: 60, y: 42},
          {x: 65, y: 50},
        ],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        pointRadius: 6,
      },
    ],
    xAxisTitle: 'Variable X',
    yAxisTitle: 'Variable Y',
    showStatistics: false,
  },
  render: ({
    title,
    subtitle,
    type,
    labels,
    datasets,
    xAxisTitle,
    yAxisTitle,
    showStatistics,
  }) =>
    html`<scientific-graph
      .title=${title}
      .subtitle=${subtitle}
      .type=${type}
      .labels=${labels}
      .datasets=${datasets}
      .xAxisTitle=${xAxisTitle}
      .yAxisTitle=${yAxisTitle}
      .showStatistics=${showStatistics}
      style="width: 100%; max-width: 880px;"
    ></scientific-graph>`,
};

export const MultipleDatasets: Story = {
  args: {
    title: 'Temperature Monitoring',
    subtitle: 'Annual temperature variations with multiple metrics',
    type: 'line',
    labels: temperatureData.labels,
    datasets: [
      ...temperatureData.datasets,
      {
        label: 'Min Temperature (degC)',
        data: [-8, -5, 1, 6, 12, 17, 20, 19, 14, 8, 2, -4],
        borderColor: '#17a2b8',
        backgroundColor: 'rgba(23, 162, 184, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
    xAxisTitle: 'Month',
    yAxisTitle: 'Temperature (degC)',
    showStatistics: true,
    showLegend: true,
  },
  render: ({
    title,
    subtitle,
    type,
    labels,
    datasets,
    xAxisTitle,
    yAxisTitle,
    showStatistics,
    showLegend,
  }) =>
    html`<scientific-graph
      .title=${title}
      .subtitle=${subtitle}
      .type=${type}
      .labels=${labels}
      .datasets=${datasets}
      .xAxisTitle=${xAxisTitle}
      .yAxisTitle=${yAxisTitle}
      .showStatistics=${showStatistics}
      .showLegend=${showLegend}
      style="width: 100%; max-width: 880px;"
    ></scientific-graph>`,
};

export const LoadingState: Story = {
  args: {
    title: 'Loading Graph',
    subtitle: 'Demonstrating loading state',
    isLoading: true,
    type: 'line',
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        label: 'Data',
        data: [1, 2, 3],
        borderColor: '#007bff',
      },
    ],
  },
  render: ({title, subtitle, isLoading, type, labels, datasets}) =>
    html`<scientific-graph
      .title=${title}
      .subtitle=${subtitle}
      .isLoading=${isLoading}
      .type=${type}
      .labels=${labels}
      .datasets=${datasets}
      style="width: 100%; max-width: 880px;"
    ></scientific-graph>`,
};

export const ErrorState: Story = {
  args: {
    title: 'Error State Graph',
    subtitle: 'Demonstrating error handling via errorMessage property',
    errorMessage: 'Failed to load chart data. Please check your data source and try again.',
    type: 'line',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sample Data',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        borderWidth: 2,
      },
    ],
    showToolbar: true,
    showStatistics: true,
  },
  render: ({
    title,
    subtitle,
    errorMessage,
    type,
    labels,
    datasets,
    showToolbar,
    showStatistics,
  }) => {
    return html`<scientific-graph
      .title=${title}
      .subtitle=${subtitle}
      .errorMessage=${errorMessage}
      .type=${type}
      .labels=${labels}
      .datasets=${datasets}
      .showToolbar=${showToolbar}
      .showStatistics=${showStatistics}
      style="width: 100%; max-width: 880px;"
    ></scientific-graph>`;
  },
};

export const CustomExportFormats: Story = {
  args: {
    title: 'Limited Export Options',
    subtitle: 'Only PNG and PDF export available',
    type: 'bar',
    labels: experimentData.labels,
    datasets: experimentData.datasets,
    showStatistics: true,
    showToolbar: true,
    showExportButtons: true,
    exportFormats: ['png', 'pdf'],
    yAxisTitle: 'Response Rate (%)',
  },
  render: ({
    title,
    subtitle,
    type,
    labels,
    datasets,
    showStatistics,
    showToolbar,
    showExportButtons,
    exportFormats,
    yAxisTitle,
  }) =>
    html`<scientific-graph
      .title=${title}
      .subtitle=${subtitle}
      .type=${type}
      .labels=${labels}
      .datasets=${datasets}
      .showStatistics=${showStatistics}
      .showToolbar=${showToolbar}
      .showExportButtons=${showExportButtons}
      .exportFormats=${exportFormats}
      .yAxisTitle=${yAxisTitle}
      style="width: 100%; max-width: 880px;"
    ></scientific-graph>`,
};

export const CustomExportHandler: Story = {
  args: {
    title: 'Custom Export Handler',
    subtitle: 'Using external export functionality',
    type: 'line',
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
      {
        label: 'Custom Data',
        data: [10, 20, 15, 25, 18],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
      },
    ],
    showExportButtons: true,
    exportFormats: ['png', 'jpg'],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) =>
    html`<scientific-graph
      .title=${args.title}
      .subtitle=${args.subtitle}
      .type=${args.type}
      .labels=${args.labels}
      .datasets=${args.datasets}
      .showExportButtons=${args.showExportButtons}
      .exportFormats=${args.exportFormats}
      .onExport=${(format: string) => {
        alert(`Custom export handler called for format: ${format}`);
      }}
      @graph-exported=${(e: CustomEvent) => {
        console.log('Export event fired:', e.detail);
      }}
      style="width: 100%; max-width: 880px;"
    ></scientific-graph>`,
};

export const ThemeComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 48px;">
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Default Theme
        </h3>
        <scientific-graph
          title="Default Theme Graph"
          subtitle="Standard theme with clean, modern styling"
          theme="default"
          type="line"
          .labels=${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          .datasets=${[
            {
              label: 'Dataset 1',
              data: [12, 19, 8, 15, 22, 18],
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              borderWidth: 2,
            },
          ]}
          showStatistics
          style="max-width: 600px;"
        ></scientific-graph>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Dark Theme
        </h3>
        <scientific-graph
          title="Dark Theme Graph"
          subtitle="Dark theme optimized for low-light environments"
          theme="dark"
          type="line"
          .labels=${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          .datasets=${[
            {
              label: 'Dataset 1',
              data: [12, 19, 8, 15, 22, 18],
              borderColor: '#60a5fa',
              backgroundColor: 'rgba(96, 165, 250, 0.1)',
              borderWidth: 2,
            },
          ]}
          showStatistics
          style="max-width: 600px;"
        ></scientific-graph>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Scientific Theme
        </h3>
        <scientific-graph
          title="Scientific Theme Graph"
          subtitle="Professional theme for scientific applications"
          theme="scientific"
          type="line"
          .labels=${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          .datasets=${[
            {
              label: 'Dataset 1',
              data: [12, 19, 8, 15, 22, 18],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 2,
            },
          ]}
          showStatistics
          style="max-width: 600px;"
        ></scientific-graph>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of all available themes showing the visual differences and styling approaches.',
      },
    },
  },
};
