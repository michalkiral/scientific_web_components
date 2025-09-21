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

A **powerful**, **customizable** scientific graph component with Chart.js integration featuring multiple chart types, statistics, and export capabilities.

---

## Props

- \`title\` — Graph title text
- \`subtitle\` — Graph subtitle/description text
- \`type\` — Chart type: line, bar, pie, doughnut, scatter, area, radar
- \`isAreaChart\` — Internal flag for area chart rendering (automatically set when type is 'area')
- \`labels\` — Array of labels for data points
- \`datasets\` — Array of dataset objects with data, styling, and configuration
- \`showStatistics\` — Shows/hides statistical calculations
- \`showLegend\` — Shows/hides chart legend
- \`showToolbar\` — Shows/hides toolbar with controls
- \`showExportButtons\` — Shows/hides export buttons in toolbar (default: false)
- \`exportFormats\` — Array of export formats to show: ['png', 'jpg', 'pdf'] (default: all)
- \`showGrid\` — Shows/hides grid lines
- \`showAxes\` — Shows/hides axes
- \`animateOnLoad\` — Enables/disables chart animation on load
- \`responsive\` — Makes chart responsive to container size
- \`maintainAspectRatio\` — Maintains chart aspect ratio
- \`enableZoom\` — Enables chart zoom functionality
- \`enablePan\` — Enables chart pan functionality
- \`isLoading\` — Shows loading overlay
- \`errorMessage\` — Error message to display
- \`xAxisTitle\` — Title for X-axis
- \`yAxisTitle\` — Title for Y-axis
- \`customOptions\` — Custom Chart.js options object
- \`onExport\` — Custom export handler function (format: string) => void
- \`onDataClick\` — Click handler for chart data points

## Events

- \`graph-type-changed\` — Fired when chart type is changed via dropdown
- \`graph-exported\` — Fired when chart is exported
- \`graph-refreshed\` — Fired when chart is refreshed

## Basic Usage

\`\`\`html
<scientific-graph
  title="Sample Scientific Data"
  subtitle="Basic line chart with default settings"
  type="line"
  .labels="\${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}"
  .datasets="\${[{
    label: 'Sample Data',
    data: [12, 19, 3, 5, 2, 3],
    borderColor: '#007bff',
    backgroundColor: 'rgba(0, 123, 255, 0.1)'
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
  showExportButtons
  .exportFormats="\${['png', 'pdf']}"
  xAxisTitle="Month"
  yAxisTitle="Temperature (°C)"
  @graph-exported="\${handleExport}"
></scientific-graph>
\`\`\`

## Features

- **Multiple Chart Types**: Line, bar, pie, doughnut, scatter, area, radar
- **Interactive Toolbar**: Chart type selector and export options
- **Statistical Analysis**: Automatic calculation and display of key statistics
- **Export Capabilities**: PNG, JPG, PDF export with automatic filename generation
- **Loading States**: Built-in loading overlay and error handling
- **Responsive Design**: Adapts to container size changes
- **Interactive Charts**: Click handlers and zoom/pan functionality
- **Form Integration**: Chart data updates and real-time rendering
- **Customizable**: Extensive CSS variable system for styling
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support

## Accessibility Features

- **ARIA Labels**: Descriptive labels for chart components and controls
- **Keyboard Navigation**: Full keyboard support for toolbar controls and interactions
- **Screen Reader Support**: Chart data accessible through ARIA descriptions
- **Focus Management**: Proper focus handling for interactive elements
- **Color Contrast**: Meets WCAG guidelines with customizable color schemes
- **Loading States**: Accessible loading indicators with aria-busy attributes
- **Error Handling**: Screen reader accessible error messages

## Dataset Configuration

Each dataset object supports these properties:

    {
      label: string;              // Dataset name
      data: number[];            // Data points
      backgroundColor?: string | string[];  // Fill colors
      borderColor?: string | string[];      // Border colors
      borderWidth?: number;      // Border thickness
      tension?: number;          // Line curve tension (0-1)
      fill?: boolean;           // Fill area under line
      pointRadius?: number;      // Point size
      pointHoverRadius?: number; // Point hover size
    }

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
    scientific-graph {
      --graph-bg-color: #ffffff;
      --graph-border: 2px solid #e5e7eb;
      --graph-border-radius: 12px;
      --graph-padding: 24px;
      --graph-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

**Available CSS Variables:**

    scientific-graph {
      /* Container dimensions */
      --graph-width: 100%;
      --graph-max-width: 100%;
      --graph-min-height: 400px;
      
      /* Component spacing */
      --graph-toolbar-gap: 12px;
      --graph-toolbar-padding: 12px 0;
      --graph-controls-gap: 8px;
      --graph-actions-gap: 8px;
      --graph-stats-gap: 12px;
      --graph-stats-padding: 16px 0 0 0;
      --graph-stat-padding: 12px;
      
      /* Headers */
      --graph-header-border: 1px solid #f3f4f6;
      --graph-title-font-size: 24px;
      --graph-subtitle-font-size: 16px;
      
      /* Canvas */
      --graph-canvas-min-height: 300px;
      --graph-canvas-bg-color: #ffffff;
      
      /* Statistics styling */
      --graph-stats-border: 1px solid #f3f4f6;
      --graph-stat-bg-color: #f9fafb;
      --graph-stat-border: 1px solid #f3f4f6;
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

// Sample scientific datasets
const temperatureData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'Average Temperature (°C)',
      data: [-2, 1, 6, 12, 18, 23, 26, 25, 20, 14, 7, 2],
      borderColor: '#dc3545',
      backgroundColor: 'rgba(220, 53, 69, 0.1)',
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
    {
      label: 'Max Temperature (°C)',
      data: [2, 5, 11, 18, 24, 29, 32, 31, 26, 19, 11, 6],
      borderColor: '#fd7e14',
      backgroundColor: 'rgba(253, 126, 20, 0.1)',
      borderWidth: 2,
      tension: 0.3,
    },
  ],
};

const experimentData = {
  labels: [
    'Control',
    'Treatment A',
    'Treatment B',
    'Treatment C',
    'Treatment D',
  ],
  datasets: [
    {
      label: 'Response Rate (%)',
      data: [65, 78, 82, 71, 88],
      backgroundColor: [
        'rgba(0, 123, 255, 0.7)',
        'rgba(40, 167, 69, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(220, 53, 69, 0.7)',
        'rgba(108, 117, 125, 0.7)',
      ],
      borderColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6c757d'],
      borderWidth: 2,
    },
  ],
};

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
        label: 'Min Temperature (°C)',
        data: [-8, -5, 1, 6, 12, 17, 20, 19, 14, 8, 2, -4],
        borderColor: '#17a2b8',
        backgroundColor: 'rgba(23, 162, 184, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
    xAxisTitle: 'Month',
    yAxisTitle: 'Temperature (°C)',
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
    subtitle: 'Demonstrating error handling when chart fails to render',
    type: 'line',
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        label: 'Malformed Data',
        data: [1, 2, 3, 4],
        borderColor: '#dc3545',
      },
    ],
    showToolbar: true,
    showStatistics: true,
  },
  render: ({
    title,
    subtitle,
    type,
    labels,
    showToolbar,
    showStatistics,
  }) => {
    const problematicDatasets = [
      {
        label: 'Problematic Data',
        data: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NaN, Number.MAX_VALUE * 2],
        borderColor: '#dc3545',
      },
    ];
    
    return html`<scientific-graph
      .title=${title}
      .subtitle=${subtitle}
      .type=${type}
      .labels=${labels}
      .datasets=${problematicDatasets}
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
