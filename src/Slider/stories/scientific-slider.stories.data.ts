import {SCIENTIFIC_THEMES} from '../../shared/constants/themes.js';

export const sliderThemes = SCIENTIFIC_THEMES;
export const sliderStates = ['default', 'error'] as const;

export const defaultSliderArgs = {
  label: 'Volume Control',
  description: 'Adjust the volume level',
  theme: 'default' as const,
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  disabled: false,
  required: false,
  showTooltip: true,
  showValue: true,
  showRangeLabels: true,
  marks: [],
  unit: '%',
  helperText: 'Use the slider to adjust volume',
  errorMessage: '',
  state: 'default' as const,
};

export const markExamples = [
  {
    title: 'Simple Marks',
    label: 'Performance Level',
    min: 0,
    max: 100,
    step: 5,
    value: 60,
    unit: '%',
    showValue: true,
    marks: [
      {value: 0},
      {value: 25},
      {value: 50},
      {value: 75},
      {value: 100},
    ],
    helperText: 'Marks show key reference points',
  },
  {
    title: 'Labeled Marks',
    label: 'Quality Setting',
    min: 0,
    max: 4,
    step: 1,
    value: 2,
    showValue: true,
    marks: [
      {value: 0, label: 'Low'},
      {value: 1, label: 'Medium'},
      {value: 2, label: 'High'},
      {value: 3, label: 'Ultra'},
      {value: 4, label: 'Max'},
    ],
    formatValue: (value: number) => {
      const labels = ['Low', 'Medium', 'High', 'Ultra', 'Max'];
      return labels[value] || value.toString();
    },
  },
  {
    title: 'Scientific Marks',
    label: 'pH Level',
    min: 0,
    max: 14,
    step: 0.1,
    value: 7.0,
    showValue: true,
    marks: [
      {value: 0, label: 'Acid'},
      {value: 7, label: 'Neutral'},
      {value: 14, label: 'Base'},
    ],
    helperText: 'pH scale from acidic to basic',
  },
] as const;

export const stateExamples = [
  {
    title: 'Default State',
    label: 'Normal Slider',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    unit: '%',
    showValue: true,
    helperText: 'This is a helper text',
  },
  {
    title: 'Required Field',
    label: 'Required Setting',
    required: true,
    min: 1,
    max: 10,
    step: 1,
    value: 5,
    showValue: true,
    helperText: 'This field is required',
  },
  {
    title: 'Error State',
    label: 'Invalid Range',
    state: 'error' as const,
    min: 0,
    max: 100,
    step: 1,
    value: 150,
    unit: '%',
    showValue: true,
    errorMessage: 'Value exceeds maximum allowed range',
  },
  {
    title: 'Disabled State',
    label: 'Disabled Slider',
    disabled: true,
    min: 0,
    max: 100,
    step: 1,
    value: 30,
    unit: '%',
    showValue: true,
    helperText: 'This slider is disabled',
  },
] as const;

export const customFormattingExamples = [
  {
    title: 'Currency Formatting',
    label: 'Budget Allocation',
    min: 0,
    max: 10000,
    step: 100,
    value: 2500,
    showValue: true,
    formatValue: (value: number) => `$${value.toLocaleString()}`,
    helperText: 'Budget in USD',
  },
  {
    title: 'Time Formatting',
    label: 'Duration',
    min: 0,
    max: 3600,
    step: 60,
    value: 1800,
    showValue: true,
    formatValue: (value: number) => {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      const seconds = value % 60;
      if (hours > 0) return `${hours}h ${minutes}m`;
      if (minutes > 0) return `${minutes}m ${seconds}s`;
      return `${seconds}s`;
    },
    helperText: 'Duration in seconds',
  },
  {
    title: 'Scientific Notation',
    label: 'Concentration',
    min: 0.000001,
    max: 0.001,
    step: 0.000001,
    value: 0.0005,
    showValue: true,
    formatValue: (value: number) => `${value.toExponential(2)} mol/L`,
    helperText: 'Molecular concentration',
  },
  {
    title: 'Percentage with Precision',
    label: 'Success Rate',
    min: 0,
    max: 1,
    step: 0.001,
    value: 0.856,
    showValue: true,
    formatValue: (value: number) => `${(value * 100).toFixed(1)}%`,
    helperText: 'Precision to one decimal place',
  },
] as const;

export const scientificUseCaseExamples = [
  {
    label: 'Temperature',
    description: 'Reaction temperature in Celsius',
    min: -50,
    max: 150,
    step: 0.5,
    value: 25,
    unit: 'degC',
    showValue: true,
    marks: [
      {value: -50, label: 'Min'},
      {value: 0, label: 'Freeze'},
      {value: 25, label: 'Room'},
      {value: 100, label: 'Boil'},
      {value: 150, label: 'Max'},
    ],
    helperText: 'Optimal range: 20-30degC',
  },
  {
    label: 'Pressure',
    description: 'System pressure in atmospheres',
    min: 0.1,
    max: 10,
    step: 0.1,
    value: 1.0,
    showValue: true,
    formatValue: (value: number) => `${value.toFixed(1)} atm`,
    marks: [
      {value: 0.1, label: 'Vacuum'},
      {value: 1.0, label: 'STP'},
      {value: 10, label: 'High'},
    ],
    helperText: 'Standard temperature and pressure = 1.0 atm',
  },
  {
    label: 'pH Level',
    description: 'Solution acidity/basicity',
    min: 0,
    max: 14,
    step: 0.1,
    value: 7.0,
    showValue: true,
    marks: [
      {value: 0, label: 'Acid'},
      {value: 7, label: 'Neutral'},
      {value: 14, label: 'Base'},
    ],
    helperText: '7.0 is neutral, <7 acidic, >7 basic',
  },
  {
    label: 'Concentration',
    description: 'Reagent concentration',
    min: 0.001,
    max: 1,
    step: 0.001,
    value: 0.1,
    showValue: true,
    formatValue: (value: number) => `${value.toFixed(3)} M`,
    helperText: 'Molarity in mol/L',
  },
] as const;

export const interactiveDemoExample = {
  label: 'Interactive Demo',
  description: 'Try dragging, clicking, or using keyboard navigation',
  min: 0,
  max: 100,
  step: 1,
  value: 25,
  unit: '%',
  showValue: true,
  showTooltip: true,
  marks: [
    {value: 0, label: 'Min'},
    {value: 25, label: 'Low'},
    {value: 50, label: 'Mid'},
    {value: 75, label: 'High'},
    {value: 100, label: 'Max'},
  ],
  helperText: 'Use arrow keys, click on track, or drag the thumb',
};

export const themeComparisonExamples = [
  {
    theme: 'default',
    title: 'Default Theme',
    label: 'Default Theme Slider',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    unit: '%',
    showValue: true,
    helperText: 'Default theme styling',
  },
  {
    theme: 'dark',
    title: 'Dark Theme',
    label: 'Dark Theme Slider',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    unit: '%',
    showValue: true,
    helperText: 'Dark theme styling',
  },
  {
    theme: 'scientific',
    title: 'Scientific Theme',
    label: 'Scientific Theme Slider',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    unit: '%',
    showValue: true,
    helperText: 'Scientific theme styling',
  },
] as const;

export const customStylingExample = {
  label: 'Custom Styled Slider',
  description: 'Slider with custom CSS properties applied',
  min: 0,
  max: 100,
  step: 1,
  value: 75,
  unit: '%',
  showValue: true,
  showTooltip: true,
  marks: [
    {value: 0, label: 'Start'},
    {value: 50, label: 'Middle'},
    {value: 100, label: 'End'},
  ],
  helperText: 'Custom colors and styling applied',
  className: 'custom-slider',
  customStyles: `
    .custom-slider {
      --slider-bg-color: #f0f9ff;
      --slider-border: 3px solid #0ea5e9;
      --slider-border-radius: 16px;
      --slider-track-color: #e0f2fe;
      --slider-fill-color: linear-gradient(90deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
      --slider-thumb-color: #0c4a6e;
      --slider-thumb-size: 24px;
      --slider-thumb-border: 4px solid #ffffff;
      --slider-thumb-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
      --slider-tooltip-bg-color: #0c4a6e;
      --slider-mark-tick-color: #0ea5e9;
      --slider-mark-label-color: #0c4a6e;
    }
  `,
};

export const responsiveExample = {
  title: 'Responsive Behavior',
  examples: [
    {
      title: 'Desktop Optimized',
      label: 'Desktop Slider',
      min: 0,
      max: 100,
      step: 1,
      value: 50,
      showValue: true,
      showTooltip: true,
      helperText: 'Optimized for desktop interaction',
    },
    {
      title: 'Mobile Optimized',
      label: 'Mobile Slider',
      min: 0,
      max: 100,
      step: 1,
      value: 50,
      showValue: true,
      showTooltip: false,
      helperText: 'Optimized for touch interaction',
    },
  ],
};

export const performanceExample = {
  title: 'High Performance',
  sliders: Array.from({length: 10}, (_, i) => ({
    label: `Parameter ${i + 1}`,
    min: 0,
    max: 100,
    step: 1,
    value: Math.floor(Math.random() * 100),
    showValue: true,
  })),
};