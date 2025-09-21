import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './scientific-slider.js';
import type {ScientificSlider} from './scientific-slider.js';

const meta: Meta<ScientificSlider> = {
  title: 'Scientific/Slider',
  component: 'scientific-slider',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Scientific Slider

A **highly customizable**, **accessible** slider component for scientific web apps with advanced features.

---

## Props

- \`label\` — Label text displayed above the slider
- \`description\` — Description text displayed below the label
- \`theme\` — Theme variant: default, dark, scientific
- \`min\` — Minimum value of the slider range
- \`max\` — Maximum value of the slider range
- \`step\` — Step increment for value changes
- \`value\` — Current value of the slider
- \`disabled\` — Whether the slider is disabled
- \`required\` — Whether the slider is required (shows asterisk)
- \`variant\` — Visual variant: default, compact
- \`size\` — Size variant: small, medium, large
- \`showTooltip\` — Whether to show tooltip on hover/drag
- \`showValue\` — Whether to show current value in header
- \`showRangeLabels\` — Whether to show min/max labels below slider
- \`marks\` — Array of mark objects with value and optional label
- \`unit\` — Unit suffix for displayed values (e.g., "px", "%", "°C")
- \`helperText\` — Helper text displayed below the slider
- \`errorMessage\` — Error message displayed when state is error
- \`state\` — Visual state: default, error
- \`formatValue\` — Custom function to format displayed values
- \`onValueChange\` — Callback function fired when value changes

## Events

- \`value-changed\` — Fired when value changes with detail.value
- \`change\` — Standard change event for form integration

## Basic Usage

\`\`\`html
<scientific-slider
  label="Volume Control"
  description="Adjust the volume level"
  min="0"
  max="100"
  step="1"
  value="50"
  unit="%"
  showValue
  showTooltip
  @value-changed="\${handleVolumeChange}"
></scientific-slider>
\`\`\`

**Advanced Usage with Marks:**
\`\`\`html
<scientific-slider
  label="Quality Setting"
  min="0"
  max="4"
  step="1"
  value="2"
  showValue
  .marks="\${[
    {value: 0, label: 'Low'},
    {value: 2, label: 'Medium'},
    {value: 4, label: 'High'}
  ]}"
  .formatValue="\${(value) => qualityLabels[value]}"
></scientific-slider>
\`\`\`

## Features

- **Range Control**: Configurable min/max values with custom step sizes
- **Multiple Variants**: Default and compact layouts for different use cases
- **Size Options**: Small, medium, and large sizes for various contexts
- **Visual States**: Error state with custom styling and validation messages
- **Custom Marks**: Add labeled marks at specific values for reference points
- **Tooltips**: Show current value on hover or during interaction
- **Custom Formatting**: Format display values with units or custom functions
- **Form Integration**: Standard form events and validation support
- **Event Handling**: Comprehensive event system for value changes
- **Responsive Design**: Optimized for mobile and desktop interactions
- **Scientific Applications**: Perfect for parameter adjustment and data filtering

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with arrow keys, Page Up/Down, Home/End
- **ARIA Support**: Proper ARIA roles, labels, and value announcements
- **Screen Reader Compatible**: Value changes announced to assistive technologies
- **Focus Management**: Clear visual focus indicators and logical focus flow
- **Touch Friendly**: Optimized touch targets for mobile devices
- **High Contrast**: Supports high contrast mode and custom color schemes
- **Reduced Motion**: Respects user preferences for reduced motion

## Keyboard Navigation

- **Arrow Keys**: Increase/decrease by step value
- **Page Up/Down**: Increase/decrease by 10x step value
- **Home/End**: Jump to min/max values
- **Tab**: Focus navigation

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
    scientific-slider {
      --slider-width: 100%;
      --slider-bg-color: #ffffff;
      --slider-border: 2px solid #e5e7eb;
      --slider-border-radius: 8px;
      --slider-track-color: #f3f4f6;
      --slider-fill-color: #007bff;
      --slider-thumb-color: #007bff;
      --slider-thumb-size: 20px;
    }

**Complete Variable List:**

    scientific-slider {
      /* Container & Layout */
      --slider-width: 100%;
      --slider-max-width: 100%;
      --slider-height: auto;
      --slider-padding: 16px;
      --slider-margin: 0;
      --slider-gap: 12px;
      
      /* Container Styling */
      --slider-bg-color: #ffffff;
      --slider-border: 2px solid #e5e7eb;
      --slider-border-radius: 8px;
      --slider-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      --slider-transition: all 0.2s ease-in-out;
      
      /* Label & Description */
      --slider-label-font-size: 14px;
      --slider-label-font-weight: 500;
      --slider-label-color: #374151;
      --slider-label-margin-bottom: 6px;
      --slider-description-font-size: 12px;
      --slider-description-color: #6b7280;
      
      /* Value Display */
      --slider-value-bg-color: #f3f4f6;
      --slider-value-border: 1px solid #e5e7eb;
      --slider-value-border-radius: 6px;
      --slider-value-padding: 4px 8px;
      --slider-value-font-size: 14px;
      --slider-value-font-weight: 500;
      --slider-value-color: #374151;
      
      /* Track Styling */
      --slider-track-height: 8px;
      --slider-track-color: #f3f4f6;
      --slider-track-border-radius: 4px;
      --slider-track-border: 1px solid #e5e7eb;
      
      /* Fill/Progress Styling */
      --slider-fill-color: #007bff;
      --slider-fill-height: 8px;
      --slider-fill-border-radius: 4px;
      --slider-fill-transition: width 0.1s ease-out;
      
      /* Thumb Styling */
      --slider-thumb-size: 20px;
      --slider-thumb-color: #007bff;
      --slider-thumb-border: 3px solid #ffffff;
      --slider-thumb-border-radius: 50%;
      --slider-thumb-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      --slider-thumb-hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      --slider-thumb-active-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
      --slider-thumb-transition: all 0.2s ease-in-out;
      
      /* Hover States */
      --slider-hover-thumb-color: #0056b3;
      --slider-hover-fill-color: #0056b3;
      
      /* Focus States */
      --slider-focus-thumb-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
      --slider-focus-outline: none;
      
      /* Disabled States */
      --slider-disabled-bg-color: #f9fafb;
      --slider-disabled-border-color: #e5e7eb;
      --slider-disabled-track-color: #f3f4f6;
      --slider-disabled-fill-color: #9ca3af;
      --slider-disabled-thumb-color: #9ca3af;
      --slider-disabled-color: #9ca3af;
      
      /* Error States */
      --slider-error-border-color: #ef4444;
      --slider-error-fill-color: #ef4444;
      --slider-error-thumb-color: #ef4444;
      --slider-error-focus-shadow: 0 0 0 4px rgba(239, 68, 68, 0.25);
      
      /* Range Labels */
      --slider-range-label-font-size: 12px;
      --slider-range-label-color: #6b7280;
      --slider-range-label-margin-top: 8px;
      
      /* Marks */
      --slider-mark-tick-size: 8px;
      --slider-mark-tick-color: #d1d5db;
      --slider-mark-tick-active-color: #007bff;
      --slider-mark-label-font-size: 11px;
      --slider-mark-label-color: #6b7280;
      --slider-mark-label-margin-top: 4px;
      
      /* Tooltip */
      --slider-tooltip-bg-color: #374151;
      --slider-tooltip-color: #ffffff;
      --slider-tooltip-border-radius: 4px;
      --slider-tooltip-padding: 4px 8px;
      --slider-tooltip-font-size: 12px;
      --slider-tooltip-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      --slider-tooltip-z-index: 1000;
      
      /* Helper Text */
      --slider-helper-font-size: 12px;
      --slider-helper-color: #6b7280;
      --slider-helper-margin-top: 6px;
      
      /* Error Messages */
      --slider-error-message-color: #dc2626;
      --slider-error-message-font-size: 12px;
      --slider-error-message-margin-top: 6px;
      
      /* Size Variants */
      --slider-small-track-height: 6px;
      --slider-small-thumb-size: 16px;
      --slider-small-fill-height: 6px;
      --slider-small-padding: 12px;
      
      --slider-large-track-height: 12px;
      --slider-large-thumb-size: 24px;
      --slider-large-fill-height: 12px;
      --slider-large-padding: 20px;
      
      /* Compact Variant */
      --slider-compact-padding: 12px;
      --slider-compact-gap: 8px;
      
      /* Mobile Responsive */
      --slider-mobile-thumb-size: 22px;
      --slider-mobile-track-height: 10px;
      --slider-mobile-padding: 16px;
    }

## Use Cases

- Parameter adjustment in scientific simulations
- Range selection for data filtering
- Volume/intensity controls
- Progress indicators with user control
- Configuration sliders in dashboards
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the slider',
    },
    description: {
      control: 'text',
      description: 'Description text displayed below the label',
    },
    theme: {
      control: {type: 'select'},
      options: ['default', 'dark', 'scientific'],
      description: 'Theme variant for the slider component',
    },
    min: {
      control: 'number',
      description: 'Minimum value of the slider range',
    },
    max: {
      control: 'number',
      description: 'Maximum value of the slider range',
    },
    step: {
      control: 'number',
      description: 'Step increment for value changes',
    },
    value: {
      control: 'number',
      description: 'Current value of the slider',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the slider is required (shows asterisk)',
    },
    variant: {
      control: {type: 'select'},
      options: ['default', 'compact'],
      description: 'Visual variant of the slider',
    },
    size: {
      control: {type: 'select'},
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the slider',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Whether to show tooltip on hover/drag',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show current value in header',
    },
    showRangeLabels: {
      control: 'boolean',
      description: 'Whether to show min/max labels below slider',
    },
    marks: {
      control: 'object',
      description: 'Array of mark objects with value and optional label',
    },
    unit: {
      control: 'text',
      description: 'Unit suffix for displayed values (e.g., "px", "%", "°C")',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the slider',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when state is error',
    },
    state: {
      control: {type: 'select'},
      options: ['default', 'error'],
      description: 'Visual state of the slider',
    },
    formatValue: {
      control: false,
      description: 'Custom function to format displayed values',
    },
    onValueChange: {
      control: false,
      description: 'Callback function fired when value changes',
    },
  },
};

export default meta;
type Story = StoryObj<ScientificSlider>;

export const Default: Story = {
  args: {
    label: 'Volume Control',
    description: 'Adjust the volume level',
    theme: 'default',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    disabled: false,
    required: false,
    variant: 'default',
    size: 'medium',
    showTooltip: true,
    showValue: true,
    showRangeLabels: true,
    marks: [],
    unit: '%',
    helperText: 'Use arrow keys for precise control',
    errorMessage: '',
    state: 'default',
  },
  render: ({
    label,
    description,
    min,
    max,
    step,
    value,
    disabled,
    required,
    variant,
    size,
    showTooltip,
    showValue,
    showRangeLabels,
    marks,
    unit,
    helperText,
    errorMessage,
    state,
  }) =>
    html`<div style="width: 400px;">
      <scientific-slider
        .label=${label}
        .description=${description}
        .min=${min}
        .max=${max}
        .step=${step}
        .value=${value}
        .disabled=${disabled}
        .required=${required}
        .variant=${variant}
        .size=${size}
        .showTooltip=${showTooltip}
        .showValue=${showValue}
        .showRangeLabels=${showRangeLabels}
        .marks=${marks}
        .unit=${unit}
        .helperText=${helperText}
        .errorMessage=${errorMessage}
        .state=${state}
      ></scientific-slider>
    </div>`,
};

export const Variants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 32px; width: 500px;"
    >
      <div>
        <h3 style="margin: 0 0 16px 0;">Default Variant</h3>
        <scientific-slider
          label="Temperature"
          description="Set the target temperature for the experiment"
          min="0"
          max="100"
          step="0.5"
          value="37.5"
          unit="°C"
          showValue
          helperText="Normal room temperature is around 20-25°C"
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0;">Compact Variant</h3>
        <scientific-slider
          label="Opacity"
          variant="compact"
          min="0"
          max="1"
          step="0.01"
          value="0.75"
          unit=""
          showValue
          .formatValue=${(value: number) => `${Math.round(value * 100)}%`}
        ></scientific-slider>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 500px;"
    >
      <div>
        <h3 style="margin: 0 0 12px 0;">Small Size</h3>
        <scientific-slider
          label="Zoom Level"
          size="small"
          min="1"
          max="10"
          step="0.1"
          value="2.5"
          unit="x"
          showValue
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0;">Medium Size (Default)</h3>
        <scientific-slider
          label="Brightness"
          size="medium"
          min="0"
          max="100"
          step="1"
          value="75"
          unit="%"
          showValue
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0;">Large Size</h3>
        <scientific-slider
          label="Master Volume"
          size="large"
          min="0"
          max="100"
          step="1"
          value="60"
          unit="dB"
          showValue
          helperText="Large size for primary controls"
        ></scientific-slider>
      </div>
    </div>
  `,
};

export const WithMarks: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 32px; width: 500px;"
    >
      <div>
        <h3 style="margin: 0 0 16px 0;">Simple Marks</h3>
        <scientific-slider
          label="Performance Level"
          min="0"
          max="100"
          step="5"
          value="60"
          unit="%"
          showValue
          .marks=${[
            {value: 0},
            {value: 25},
            {value: 50},
            {value: 75},
            {value: 100},
          ]}
          helperText="Marks show key reference points"
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0;">Labeled Marks</h3>
        <scientific-slider
          label="Quality Setting"
          min="0"
          max="4"
          step="1"
          value="2"
          showValue
          .marks=${[
            {value: 0, label: 'Low'},
            {value: 1, label: 'Medium'},
            {value: 2, label: 'High'},
            {value: 3, label: 'Ultra'},
            {value: 4, label: 'Max'},
          ]}
          .formatValue=${(value: number) => {
            const labels = ['Low', 'Medium', 'High', 'Ultra', 'Max'];
            return labels[value] || value.toString();
          }}
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0;">Scientific Marks</h3>
        <scientific-slider
          label="pH Level"
          min="0"
          max="14"
          step="0.1"
          value="7.0"
          showValue
          .marks=${[
            {value: 0, label: 'Acid'},
            {value: 7, label: 'Neutral'},
            {value: 14, label: 'Base'},
          ]}
          helperText="pH scale from acidic to basic"
        ></scientific-slider>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 500px;"
    >
      <div>
        <h3 style="margin: 0 0 12px 0;">Default State</h3>
        <scientific-slider
          label="Normal Slider"
          min="0"
          max="100"
          step="1"
          value="50"
          unit="%"
          showValue
          helperText="This is a helper text"
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0;">Required Field</h3>
        <scientific-slider
          label="Required Setting"
          required
          min="1"
          max="10"
          step="1"
          value="5"
          showValue
          helperText="This field is required"
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0;">Error State</h3>
        <scientific-slider
          label="Invalid Range"
          state="error"
          min="0"
          max="100"
          step="1"
          value="150"
          unit="%"
          showValue
          errorMessage="Value exceeds maximum allowed range"
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0;">Disabled State</h3>
        <scientific-slider
          label="Disabled Slider"
          disabled
          min="0"
          max="100"
          step="1"
          value="30"
          unit="%"
          showValue
          helperText="This slider is disabled"
        ></scientific-slider>
      </div>
    </div>
  `,
};

export const CustomFormatting: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 500px;"
    >
      <div>
        <h3 style="margin: 0 0 12px 0;">Currency Formatting</h3>
        <scientific-slider
          label="Budget Allocation"
          min="0"
          max="10000"
          step="100"
          value="2500"
          showValue
          .formatValue=${(value: number) => `$${value.toLocaleString()}`}
          helperText="Budget in USD"
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0;">Time Formatting</h3>
        <scientific-slider
          label="Duration"
          min="0"
          max="3600"
          step="60"
          value="1800"
          showValue
          .formatValue=${(value: number) => {
            const hours = Math.floor(value / 3600);
            const minutes = Math.floor((value % 3600) / 60);
            const seconds = value % 60;
            if (hours > 0) return `${hours}h ${minutes}m`;
            if (minutes > 0) return `${minutes}m ${seconds}s`;
            return `${seconds}s`;
          }}
          helperText="Duration in seconds"
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0;">Scientific Notation</h3>
        <scientific-slider
          label="Concentration"
          min="0.000001"
          max="0.001"
          step="0.000001"
          value="0.0005"
          showValue
          .formatValue=${(value: number) => `${value.toExponential(2)} mol/L`}
          helperText="Molecular concentration"
        ></scientific-slider>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0;">Percentage with Precision</h3>
        <scientific-slider
          label="Success Rate"
          min="0"
          max="1"
          step="0.001"
          value="0.856"
          showValue
          .formatValue=${(value: number) => `${(value * 100).toFixed(1)}%`}
          helperText="Precision to one decimal place"
        ></scientific-slider>
      </div>
    </div>
  `,
};

export const ScientificUseCase: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 600px;"
    >
      <div>
        <h3 style="margin: 0 0 16px 0;">Experiment Parameters</h3>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <scientific-slider
            label="Temperature"
            description="Reaction temperature in Celsius"
            min="-50"
            max="150"
            step="0.5"
            value="25"
            unit="°C"
            showValue
            .marks=${[
              {value: -50, label: 'Min'},
              {value: 0, label: 'Freeze'},
              {value: 25, label: 'Room'},
              {value: 100, label: 'Boil'},
              {value: 150, label: 'Max'},
            ]}
            helperText="Optimal range: 20-30°C"
          ></scientific-slider>

          <scientific-slider
            label="Pressure"
            description="System pressure in atmospheres"
            min="0.1"
            max="10"
            step="0.1"
            value="1.0"
            showValue
            .formatValue=${(value: number) => `${value.toFixed(1)} atm`}
            .marks=${[
              {value: 0.1, label: 'Vacuum'},
              {value: 1.0, label: 'STP'},
              {value: 10, label: 'High'},
            ]}
            helperText="Standard temperature and pressure = 1.0 atm"
          ></scientific-slider>

          <scientific-slider
            label="pH Level"
            description="Solution acidity/basicity"
            min="0"
            max="14"
            step="0.1"
            value="7.0"
            showValue
            .marks=${[
              {value: 0, label: 'Acid'},
              {value: 7, label: 'Neutral'},
              {value: 14, label: 'Base'},
            ]}
            helperText="7.0 is neutral, <7 acidic, >7 basic"
          ></scientific-slider>

          <scientific-slider
            label="Concentration"
            description="Reagent concentration"
            min="0.001"
            max="1"
            step="0.001"
            value="0.1"
            showValue
            .formatValue=${(value: number) => `${value.toFixed(3)} M`}
            helperText="Molarity in mol/L"
          ></scientific-slider>
        </div>
      </div>
    </div>
  `,
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="width: 500px;">
      <scientific-slider
        label="Interactive Demo"
        description="Try dragging, clicking, or using keyboard navigation"
        min="0"
        max="100"
        step="1"
        value="25"
        unit="%"
        showValue
        showTooltip
        .marks=${[
          {value: 0, label: 'Min'},
          {value: 25, label: 'Low'},
          {value: 50, label: 'Mid'},
          {value: 75, label: 'High'},
          {value: 100, label: 'Max'},
        ]}
        helperText="Use arrow keys, click on track, or drag the thumb"
        @value-changed=${(e: CustomEvent) => {
          console.log('Value changed:', e.detail.value);
        }}
      ></scientific-slider>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing all interaction methods. Check the browser console to see value change events.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => html`
    <style>
      .custom-slider {
        --slider-bg-color: #f0f9ff;
        --slider-border: 3px solid #0ea5e9;
        --slider-border-radius: 16px;
        --slider-track-color: #e0f2fe;
        --slider-fill-color: linear-gradient(
          90deg,
          #0ea5e9 0%,
          #0284c7 50%,
          #0369a1 100%
        );
        --slider-thumb-color: #0c4a6e;
        --slider-thumb-size: 24px;
        --slider-thumb-border: 4px solid #ffffff;
        --slider-thumb-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
        --slider-tooltip-bg-color: #0c4a6e;
        --slider-mark-tick-color: #0ea5e9;
        --slider-mark-label-color: #0c4a6e;
      }
    </style>
    <div style="width: 500px;">
      <scientific-slider
        class="custom-slider"
        label="Custom Styled Slider"
        description="Beautifully customized with CSS variables"
        min="0"
        max="100"
        step="5"
        value="60"
        unit="%"
        showValue
        showTooltip
        .marks=${[
          {value: 0, label: 'Start'},
          {value: 50, label: 'Middle'},
          {value: 100, label: 'End'},
        ]}
        helperText="Custom blue theme with enhanced shadows"
      ></scientific-slider>
    </div>
  `,
};

export const ResponsiveDemo: Story = {
  render: () => html`
    <div
      style="width: 100%; max-width: 800px; padding: 20px; border: 1px dashed #ccc;"
    >
      <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
        Resize this container to see responsive behavior
      </p>
      <scientific-slider
        label="Responsive Slider"
        description="Adapts to container width and mobile viewports"
        min="0"
        max="100"
        step="1"
        value="45"
        unit="%"
        showValue
        .marks=${[
          {value: 0},
          {value: 25},
          {value: 50},
          {value: 75},
          {value: 100},
        ]}
        helperText="Try resizing your browser window"
      ></scientific-slider>
    </div>
  `,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const ThemeComparison: Story = {
  render: () => html`
    <style>
      .theme-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 1rem;
        max-width: 1200px;
      }
      .theme-card {
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }
      .theme-card.dark {
        background: #1f2937;
        border-color: #374151;
      }
      .theme-card.scientific {
        background: #f8fafc;
        border: 2px solid #e2e8f0;
      }
      .theme-title {
        margin: 0 0 1rem 0;
        font-size: 1.125rem;
        font-weight: 600;
      }
      .theme-card.dark .theme-title {
        color: #f9fafb;
      }
    </style>
    <div class="theme-grid">
      <div class="theme-card">
        <h3 class="theme-title">Default Theme</h3>
        <scientific-slider
          theme="default"
          label="Temperature"
          description="Ambient temperature reading"
          min="0"
          max="100"
          step="1"
          value="23"
          unit="°C"
          showValue
          showTooltip
          .marks=${[
            {value: 0, label: 'Min'},
            {value: 25, label: 'Room'},
            {value: 50, label: 'Warm'},
            {value: 75, label: 'Hot'},
            {value: 100, label: 'Max'},
          ]}
          helperText="Standard theme with default colors"
        ></scientific-slider>
      </div>

      <div class="theme-card dark">
        <h3 class="theme-title">Dark Theme</h3>
        <scientific-slider
          theme="dark"
          label="Temperature"
          description="Ambient temperature reading"
          min="0"
          max="100"
          step="1"
          value="23"
          unit="°C"
          showValue
          showTooltip
          .marks=${[
            {value: 0, label: 'Min'},
            {value: 25, label: 'Room'},
            {value: 50, label: 'Warm'},
            {value: 75, label: 'Hot'},
            {value: 100, label: 'Max'},
          ]}
          helperText="Dark theme optimized for low-light environments"
        ></scientific-slider>
      </div>

      <div class="theme-card scientific">
        <h3 class="theme-title">Scientific Theme</h3>
        <scientific-slider
          theme="scientific"
          label="Temperature"
          description="Ambient temperature reading"
          min="0"
          max="100"
          step="1"
          value="23"
          unit="°C"
          showValue
          showTooltip
          .marks=${[
            {value: 0, label: 'Min'},
            {value: 25, label: 'Room'},
            {value: 50, label: 'Warm'},
            {value: 75, label: 'Hot'},
            {value: 100, label: 'Max'},
          ]}
          helperText="Enhanced theme with professional styling and better contrast"
        ></scientific-slider>
      </div>
    </div>
  `,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Compare all available themes side by side to see the visual differences.',
      },
    },
  },
};
