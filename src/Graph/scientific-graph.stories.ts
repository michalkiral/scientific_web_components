import {html} from 'lit';
import './scientific-graph.js';
import '../Button/scientific-button.js';
import '../Dropdown/scientific-dropdown.js';

const meta = {
  title: 'Scientific/Graph',
  component: 'scientific-graph',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A powerful scientific graph component with Chart.js integration, featuring multiple chart types, statistics, export capabilities, and comprehensive customization options.',
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
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'The variant of the graph container',
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
    showGrid: {
      control: 'boolean',
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
    xAxisTitle: {
      control: 'text',
      description: 'Title for the X-axis',
    },
    yAxisTitle: {
      control: 'text',
      description: 'Title for the Y-axis',
    },
  },
};

export default meta;

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

const distributionData = {
  labels: Array.from({length: 20}, (_, i) => (i * 5).toString()),
  datasets: [
    {
      label: 'Frequency',
      data: [
        2, 5, 12, 18, 25, 32, 28, 35, 42, 38, 45, 39, 33, 28, 22, 15, 8, 5, 2,
        1,
      ],
      backgroundColor: 'rgba(23, 162, 184, 0.6)',
      borderColor: '#17a2b8',
      borderWidth: 1,
    },
  ],
};

export const Default = {
  args:{
    title:'Sample Scientific Data',
    subtitle:'Basic line chart with default settings',
    type:'line',
    labels:temperatureData.labels,
    datasets:temperatureData.datasets,
    showStatistics:true,
    showLegend:true,
    showToolbar:true,
    showAxes:true,
    animateOnLoad:true,
    responsive:true,
    xAxisTitle:""
  },
};

export const BarChart = {
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
};

export const PieChart = {
  args: {
    title: 'Data Distribution',
    subtitle: 'Sample composition breakdown',
    type: 'pie',
    labels: ['Group A', 'Group B', 'Group C', 'Group D', 'Other'],
    datasets: [
      {
        label: 'Distribution',
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(0, 123, 255, 0.8)',
          'rgba(40, 167, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(108, 117, 125, 0.8)',
        ],
      },
    ],
    showStatistics: false,
    showLegend: true,
  },
};

export const ScatterPlot = {
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
};

export const MultipleDatasets = {
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
};

export const Histogram = {
  args: {
    title: 'Distribution Analysis',
    subtitle: 'Frequency distribution of measurement values',
    type: 'bar',
    labels: distributionData.labels,
    datasets: distributionData.datasets,
    xAxisTitle: 'Value Range',
    yAxisTitle: 'Frequency',
    showStatistics: true,
    showLegend: false,
  },
};

export const CompactVariant = {
  args: {
    title: 'Compact Graph',
    subtitle: 'Space-efficient visualization',
    variant: 'compact',
    type: 'line',
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
      {
        label: 'Series 1',
        data: [12, 19, 8, 15, 22],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        borderWidth: 2,
      },
    ],
    showStatistics: true,
    showToolbar: false,
  },
};

export const CustomStyling = {
  args: {
    title: 'Custom Styled Graph',
    subtitle: 'Demonstrating CSS variable customization',
    type: 'bar',
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue ($M)',
        data: [2.5, 3.8, 4.2, 5.1],
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 2,
      },
    ],
    showStatistics: true,
    showLegend: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) =>
    html`<scientific-graph
      .title=${args.title}
      .subtitle=${args.subtitle}
      .type=${args.type}
      .labels=${args.labels}
      .datasets=${args.datasets}
      .showStatistics=${args.showStatistics}
      .showLegend=${args.showLegend}
      style="
        --graph-bg-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --graph-border: none;
        --graph-border-radius: 20px;
        --graph-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        --graph-title-color: #1b28e7;
        --graph-subtitle-color: rgba(255, 255, 255, 0.8);
        --graph-header-border: 1px solid rgba(255, 255, 255, 0.2);
        --graph-stats-border: 1px solid rgba(255, 255, 255, 0.2);
        --graph-stat-bg-color: rgba(255, 255, 255, 0.1);
        --graph-stat-border: 1px solid rgba(255, 255, 255, 0.2);
        --graph-stat-label-color: rgba(255, 255, 255, 0.8);
        --graph-stat-value-color: #b41b1b;
        --graph-canvas-bg-color: rgba(255, 255, 255, 0.95);
        --graph-padding: 32px;
        max-width: 600px;
        margin: 20px auto;
      "
    ></scientific-graph>`,
};

export const InteractiveExample = {
  args: {
    title: 'Interactive Scientific Graph',
    subtitle: 'Click on data points to see interactions',
    type: 'line',
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Growth Rate (%)',
        data: [5.2, 7.8, 12.1, 15.3, 18.7, 22.4],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderWidth: 3,
        tension: 0.2,
        pointRadius: 6,
        pointHoverRadius: 10,
      },
    ],
    showStatistics: true,
    xAxisTitle: 'Time Period',
    yAxisTitle: 'Growth Rate (%)',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) =>
    html`<scientific-graph
      .title=${args.title}
      .subtitle=${args.subtitle}
      .type=${args.type}
      .labels=${args.labels}
      .datasets=${args.datasets}
      .showStatistics=${args.showStatistics}
      .xAxisTitle=${args.xAxisTitle}
      .yAxisTitle=${args.yAxisTitle}
      .onDataClick=${(
        dataPoint: number,
        datasetIndex: number,
        index: number
      ) => {
        alert(
          `Clicked on data point: ${dataPoint} at index ${index} in dataset ${datasetIndex}`
        );
      }}
      @graph-type-changed=${(e: CustomEvent) => {
        console.log('Graph type changed to:', e.detail.type);
      }}
      @graph-exported=${(e: CustomEvent) => {
        console.log('Graph exported as:', e.detail.format);
      }}
    ></scientific-graph>`,
};

export const LoadingState = {
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
};

export const ErrorState = {
  args: {
    title: 'Error State Graph',
    subtitle: 'Demonstrating error handling',
    type: 'line',
    labels: [],
    datasets: [],
    errorMessage: 'Failed to load chart data. Please try again.',
  },
};
