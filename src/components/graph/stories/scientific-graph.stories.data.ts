import type {GraphDataset} from '../scientific-graph';
import type {GraphToolbarConfig} from '../../../shared/utils/toolbar-config-utils';

interface GraphData {
  labels: string[];
  datasets: GraphDataset[];
}

export const temperatureData: GraphData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Average Temperature (degC)',
      data: [-2, 1, 6, 12, 18, 23, 26, 25, 20, 14, 7, 2],
      borderColor: '#dc3545',
      backgroundColor: 'rgba(220, 53, 69, 0.1)',
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
    {
      label: 'Max Temperature (degC)',
      data: [2, 5, 11, 18, 24, 29, 32, 31, 26, 19, 11, 6],
      borderColor: '#fd7e14',
      backgroundColor: 'rgba(253, 126, 20, 0.1)',
      borderWidth: 2,
      tension: 0.3,
    },
  ],
};

export const experimentData: GraphData = {
  labels: ['Control', 'Treatment A', 'Treatment B', 'Treatment C', 'Treatment D'],
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

export const problematicDatasets: GraphDataset[] = [
  {
    label: 'Problematic Data',
    data: [
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NaN,
      Number.MAX_VALUE * 2,
    ],
    borderColor: '#dc3545',
  },
];

export const graphToolbarConfig: GraphToolbarConfig = {
  chartTypeOptions: [
    {label: 'Line Chart', value: 'line'},
    {label: 'Bar Chart', value: 'bar'},
    {label: 'Pie Chart', value: 'pie'},
    {label: 'Doughnut Chart', value: 'doughnut'},
    {label: 'Scatter Plot', value: 'scatter'},
    {label: 'Area Chart', value: 'area'},
    {label: 'Radar Chart', value: 'radar'},
  ],
  exportButtons: {
    png: {
      id: 'export-png',
      label: 'PNG',
      title: 'Export chart as PNG image',
      icon: 'image',
    },
    jpg: {
      id: 'export-jpg',
      label: 'JPG',
      title: 'Export chart as JPG image',
      icon: 'image',
    },
    pdf: {
      id: 'export-pdf',
      label: 'PDF',
      title: 'Export chart as PDF document',
      icon: 'pdf',
    },
    refresh: {
      id: 'refresh',
      label: 'Refresh',
      title: 'Refresh Chart',
      icon: 'refresh',
    },
  },
};
