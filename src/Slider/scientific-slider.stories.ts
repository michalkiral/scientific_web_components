import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './scientific-slider.js';
import type {ScientificSlider} from './scientific-slider.js';
import {
  sliderThemes,
  sliderStates,
  defaultSliderArgs,
  markExamples,
  stateExamples,
  customFormattingExamples,
  scientificUseCaseExamples,
  interactiveDemoExample,
  themeComparisonExamples,
  customStylingExample,
} from './scientific-slider.stories.data.js';

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

An **interactive**, **accessible** single-value slider built for the scientific design system.

---

## Props

- \`theme\` - Applies design-system theming tokens (\`default\`, \`dark\`, \`scientific\`)
- \`label\` - Text label rendered above the slider
- \`description\` - Optional helper text displayed under the label
- \`min\` - Minimum value for the range (default: 0)
- \`max\` - Maximum value for the range (default: 100)
- \`step\` - Increment applied when the value changes (default: 1)
- \`value\` - Current numeric value (clamped between \`min\` and \`max\`)
- \`disabled\` - Disables pointer and keyboard interaction
- \`required\` - Adds required styling to the label
- \`showTooltip\` - Toggles the floating value tooltip while hovering or dragging (default: true)
- \`showValue\` - Renders the formatted value in the header actions (default: true)
- \`showRangeLabels\` - Displays min/max labels beneath the track (default: true)
- \`marks\` - Array of \`{value, label?}\` objects rendered along the track
- \`unit\` - Optional unit suffix appended in the formatted display
- \`helperText\` - Additional helper copy shown below the slider
- \`errorMessage\` - Message rendered when \`state\` is set to \`error\`
- \`state\` - Visual state: \`default\` or \`error\`
- \`formatValue\` - Optional formatter \`(value: number) => string\` used for display
- \`onValueChange\` - Optional callback invoked after a value update

## Events

- \`value-changed\` - detail: {value}; fired whenever the slider value changes (bubbles, composed)
- \`change\` - detail: {value}; mirrored event for form integrations (bubbles, composed)

## Basic Usage

\`\`\`html
<scientific-slider
  label="Volume"
  description="Adjust the playback level"
  min="0"
  max="100"
  step="5"
  value="50"
  unit="%"
  showTooltip
  showValue
  @value-changed="\${handleVolumeChange}"
></scientific-slider>
\`\`\`

**With Marks and Custom Formatting:**
\`\`\`html
<scientific-slider
  label="Quality"
  min="0"
  max="4"
  step="1"
  value="2"
  .marks="\${[
    {value: 0, label: 'Low'},
    {value: 2, label: 'Medium'},
    {value: 4, label: 'High'}
  ]}"
  .formatValue="\${(val) => qualityLabels[val] || String(val)}"
></scientific-slider>
\`\`\`

## Marks Shape

\`\`\`ts
interface SliderMark {
  value: number;
  label?: string;
}
\`\`\`

## Features

- **Precision Control**: Configurable min, max, and step values with clamping of incoming updates
- **Live Feedback**: Optional tooltip and header value display stay in sync with pointer and keyboard input
- **Labeled Marks**: Render reference ticks with optional text using the \`marks\` array
- **Custom Formatting**: Provide \`unit\` or a \`formatValue\` callback to tailor the displayed number
- **Stateful Messaging**: Helper text and error messages reuse the scientific message styles
- **Form Friendly**: Emits \`value-changed\` and \`change\` events and accepts programmatic updates via the \`value\` prop
- **Theme Ready**: Inherits palette-aware tokens and respects scientific light, dark, and scientific themes

## Accessibility Features

- **ARIA Slider Role**: The track container exposes role="slider" with \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\`, and \`aria-valuetext\`
- **Keyboard Support**: Left/Right and Up/Down arrows adjust the value by \`step\`
- **Visible Focus**: Focus styling is applied to the track container for keyboard users
- **Tooltip Awareness**: Tooltip content mirrors the formatted value for both mouse and keyboard interactions

## Styling

Common CSS variables for customising appearance:

\`\`\`css
scientific-slider {
  --slider-width: 100%;
  --slider-max-width: 100%;
  --slider-track-height: 8px;
  --slider-track-color: var(--scientific-border-color);
  --slider-fill-color: var(--scientific-primary-color);
  --slider-thumb-size: 20px;
  --slider-thumb-color: var(--scientific-primary-color);
  --slider-value-bg-color: var(--scientific-bg-secondary);
  --slider-value-color: var(--scientific-text-primary);
  --slider-error-color: var(--scientific-danger-color);
}
\`\`\`
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
      options: sliderThemes,
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
      description: 'Unit suffix for displayed values (e.g., "px", "%", "degC")',
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
      options: sliderStates,
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
  args: defaultSliderArgs,
  render: ({
    label,
    description,
    min,
    max,
    step,
    value,
    disabled,
    required,
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

export const WithMarks: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 32px; width: 500px;"
    >
      ${markExamples.map(
        (example) => html`
          <div>
            <h3 style="margin: 0 0 16px 0;">${example.title}</h3>
            <scientific-slider
              .label=${example.label}
              .min=${example.min}
              .max=${example.max}
              .step=${example.step}
              .value=${example.value}
              .unit=${'unit' in example ? example.unit : ''}
              .showValue=${example.showValue}
              .marks=${example.marks}
              .formatValue=${'formatValue' in example ? example.formatValue : undefined}
              .helperText=${'helperText' in example ? example.helperText : ''}
            ></scientific-slider>
          </div>
        `
      )}
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 500px;"
    >
      ${stateExamples.map(
        (example) => html`
          <div>
            <h3 style="margin: 0 0 12px 0;">${example.title}</h3>
            <scientific-slider
              .label=${example.label}
              .required=${'required' in example ? example.required : false}
              .state=${'state' in example ? example.state : 'default'}
              .disabled=${'disabled' in example ? example.disabled : false}
              .min=${example.min}
              .max=${example.max}
              .step=${example.step}
              .value=${example.value}
              .unit=${'unit' in example ? example.unit : ''}
              .showValue=${example.showValue}
              .helperText=${'helperText' in example ? example.helperText : ''}
              .errorMessage=${'errorMessage' in example ? example.errorMessage : ''}
            ></scientific-slider>
          </div>
        `
      )}
    </div>
  `,
};

export const CustomFormatting: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 500px;"
    >
      ${customFormattingExamples.map(
        (example) => html`
          <div>
            <h3 style="margin: 0 0 12px 0;">${example.title}</h3>
            <scientific-slider
              .label=${example.label}
              .min=${example.min}
              .max=${example.max}
              .step=${example.step}
              .value=${example.value}
              .showValue=${example.showValue}
              .formatValue=${example.formatValue}
              .helperText=${example.helperText}
            ></scientific-slider>
          </div>
        `
      )}
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
          ${scientificUseCaseExamples.map(
            (example) => html`
              <scientific-slider
                .label=${example.label}
                .description=${example.description}
                .min=${example.min}
                .max=${example.max}
                .step=${example.step}
                .value=${example.value}
                .unit=${'unit' in example ? example.unit : ''}
                .showValue=${example.showValue}
                .marks=${'marks' in example ? example.marks : []}
                .formatValue=${'formatValue' in example ? example.formatValue : undefined}
                .helperText=${example.helperText}
              ></scientific-slider>
            `
          )}
        </div>
      </div>
    </div>
  `,
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="width: 500px;">
      <scientific-slider
        .label=${interactiveDemoExample.label}
        .description=${interactiveDemoExample.description}
        .min=${interactiveDemoExample.min}
        .max=${interactiveDemoExample.max}
        .step=${interactiveDemoExample.step}
        .value=${interactiveDemoExample.value}
        .unit=${interactiveDemoExample.unit}
        .showValue=${interactiveDemoExample.showValue}
        .showTooltip=${interactiveDemoExample.showTooltip}
        .marks=${interactiveDemoExample.marks}
        .helperText=${interactiveDemoExample.helperText}
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
        .label=${customStylingExample.label}
        .description=${customStylingExample.description}
        .min=${customStylingExample.min}
        .max=${customStylingExample.max}
        .step=${customStylingExample.step}
        .value=${customStylingExample.value}
        .unit=${customStylingExample.unit}
        .showValue=${customStylingExample.showValue}
        .showTooltip=${customStylingExample.showTooltip}
        .marks=${customStylingExample.marks}
        .helperText=${customStylingExample.helperText}
      ></scientific-slider>
    </div>
  `,
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
      ${themeComparisonExamples.map(
        (example) => html`
          <div class="theme-card ${example.theme}">
            <h3 class="theme-title">${example.title}</h3>
            <scientific-slider
              .theme=${example.theme}
              .label=${example.label}
              .min=${example.min}
              .max=${example.max}
              .step=${example.step}
              .value=${example.value}
              .unit=${example.unit}
              .showValue=${example.showValue}
              .showTooltip=${true}
              .marks=${[
                {value: 0, label: 'Min'},
                {value: 25, label: 'Room'},
                {value: 50, label: 'Warm'},
                {value: 75, label: 'Hot'},
                {value: 100, label: 'Max'},
              ]}
              .helperText=${example.helperText}
            ></scientific-slider>
          </div>
        `
      )}
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
