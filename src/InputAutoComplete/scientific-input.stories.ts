import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './scientific-input.js';
import type {ScientificInput} from './scientific-input.js';
import {
  inputThemes,
  inputStates,
  defaultInputArgs,
  stateExamples,
  iconExamples,
  groupedOptionsExample,
  customValuesExample,
  disabledRequiredExamples,
  themeComparisonExamples,
  fruitOptions,
  countryOptions,
} from './scientific-input.stories.data.js';

const meta: Meta<ScientificInput> = {
  title: 'Scientific/Input',
  component: 'scientific-input',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Scientific Input

A **highly customizable**, **accessible** autocomplete input component for scientific web apps with advanced features.

---

## Props

- \`label\` — Label text displayed above the input
- \`placeholder\` — Placeholder text shown when input is empty  
- \`value\` — Current value of the input
- \`options\` — Array of available options for autocomplete
- \`disabled\` — Whether the input is disabled
- \`required\` — Whether the input is required (shows asterisk)
- \`clearable\` — Whether to show a clear button when input has value
- \`state\` — Visual state: default, error, success
- \`helperText\` — Helper text displayed below the input
- \`errorMessage\` — Error message displayed when state is error
- \`successMessage\` — Success message displayed when state is success
- \`icon\` — Icon displayed on the right side (emoji or text)
- \`allowCustomValues\` — Whether users can add custom values not in options
- \`maxLength\` — Maximum length of input value (-1 for unlimited)
- \`noOptionsText\` — Text shown when no options match the search
- \`autoComplete\` — Whether to enable autocomplete functionality
- \`autoFocus\` — Whether to focus the input on mount

## Events

- \`input\` — Fired when the input value changes
- \`change\` — Fired when the input value changes
- \`option-selected\` — Fired when an option is selected from dropdown
- \`custom-value-selected\` — Fired when a custom value is added
- \`clear\` — Fired when the input is cleared
- \`focus\` — Fired when the input gains focus
- \`blur\` — Fired when the input loses focus

## Basic Usage

\`\`\`html
<scientific-input
  label="Search Countries"
  placeholder="Type to search countries..."
  .options="\${[
    {label: 'United States', value: 'us'},
    {label: 'United Kingdom', value: 'uk'},
    {label: 'Canada', value: 'ca'}
  ]}"
  clearable
  @option-selected="\${handleSelection}"
></scientific-input>
\`\`\`

**Advanced Usage with Custom Values:**
\`\`\`html
<scientific-input
  label="Tags"
  placeholder="Type to add a tag..."
  allowCustomValues
  .options="\${existingTags}"
  @custom-value-selected="\${handleCustomValue}"
  @option-selected="\${handleTagSelection}"
></scientific-input>
\`\`\`

## Features

- **Autocomplete functionality** with customizable options
- **State management** (default, error, success) with visual feedback
- **Clearable input** with optional clear button
- **Custom value support** allowing users to add new options
- **Grouped options** for better organization
- **Keyboard navigation** with arrow keys and Enter/Escape support
- **Tab autocompletion** for quick selection
- **Length validation** with max length constraints
- **Form integration** with proper form submission support
- **Responsive design** that works on all devices
- **Highly customizable** with CSS custom properties

## Accessibility Features

- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Escape, Tab
- **Screen Reader Support**: Proper announcements for option selection and changes
- **Focus Management**: Logical focus flow and visible focus indicators
- **Role Attributes**: Correct ARIA roles for combobox functionality
- **Live Regions**: Dynamic content updates announced to screen readers
- **Error Handling**: Accessible error messages and validation states
- **Required Field Indicators**: Clear visual and programmatic required field marking

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
\`\`\`css
scientific-input {
  --input-width: 100%;
  --input-border: 2px solid #e5e7eb;
  --input-border-radius: 8px;
  --input-bg-color: #ffffff;
  --input-padding: 12px 16px;
  --input-font-size: 16px;
  --input-focus-border-color: #007bff;
  --input-focus-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}
\`\`\`

**Complete Variable List:**

All CSS custom properties available for customization with their default values:

\`\`\`css
scientific-input {
  /* Container & Layout */
  --input-width: 100%;
  --input-min-width: auto;
  --input-max-width: none;
  --input-container-z-index: 1;
  
  /* Label Styling */
  --input-label-margin-bottom: var(--scientific-spacing-sm);
  --input-label-font-size: var(--scientific-text-sm);
  --input-label-font-weight: 500;
  --input-label-color: #374151;
  
  /* Main Input Field Styling */
  --input-padding: var(--scientific-spacing-md) var(--scientific-spacing-lg);
  --input-border: var(--scientific-border);
  --input-border-radius: var(--scientific-border-radius);
  --input-bg-color: #ffffff;
  --input-color: #374151;
  --input-font-size: var(--scientific-text-base);
  --input-transition: var(--scientific-transition);
  --input-shadow: var(--scientific-shadow-sm);
  --input-min-height: 48px;
  
  /* Hover States */
  --input-hover-border-color: var(--scientific-border-hover);
  --input-hover-shadow: var(--scientific-shadow);
  
  /* Focus States */
  --input-focus-border-color: var(--scientific-border-focus);
  --input-focus-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  
  /* Disabled States */
  --input-disabled-bg-color: #f9fafb;
  --input-disabled-border-color: #e5e7eb;
  --input-disabled-color: #9ca3af;
  
  /* Error States */
  --input-error-border-color: var(--scientific-danger-color);
  --input-error-color: var(--scientific-danger-color);
  --input-error-bg-color: #fef2f2;
  
  /* Success States */
  --input-success-border-color: var(--scientific-success-color);
  --input-success-color: var(--scientific-success-color);
  --input-success-bg-color: #f0fdf4;
  
  /* Placeholder */
  --input-placeholder-color: #9ca3af;
  
  /* Icon Styling */
  --input-icon-color: #6b7280;
  --input-icon-size: 20px;
  
  /* Clear Button */
  --input-clear-color: #6b7280;
  --input-clear-hover-color: var(--scientific-danger-color);
  --input-clear-size: 18px;
  
  /* Autocomplete Dropdown */
  --input-dropdown-min-width: 100%;
  --input-dropdown-max-width: none;
  --input-dropdown-border: var(--scientific-border);
  --input-dropdown-border-radius: 0 0 var(--scientific-border-radius) var(--scientific-border-radius);
  --input-dropdown-bg-color: #ffffff;
  --input-dropdown-shadow: var(--scientific-shadow-lg);
  --input-dropdown-z-index: 1000;
  --input-dropdown-max-height: 200px;
  --input-dropdown-animation: slideDown 0.15s ease-out;
  
  /* Autocomplete Options */
  --input-option-padding: var(--scientific-spacing-md) var(--scientific-spacing-lg);
  --input-option-border: 1px solid #f3f4f6;
  --input-option-color: #374151;
  --input-option-font-size: var(--scientific-text-base);
  --input-option-hover-bg-color: #f9fafb;
  --input-option-selected-bg-color: #eff6ff;
  --input-option-selected-color: var(--scientific-primary-color);
  --input-option-selected-font-weight: 500;
  --input-option-highlighted-bg-color: #f3f4f6;
  --input-option-disabled-color: #9ca3af;
  --input-option-disabled-bg-color: #f9fafb;
  
  /* Group Headers */
  --input-group-header-padding: var(--scientific-spacing-sm) var(--scientific-spacing-lg);
  --input-group-header-font-size: var(--scientific-text-xs);
  --input-group-header-font-weight: 600;
  --input-group-header-color: #6b7280;
  --input-group-header-bg-color: #f9fafb;
  --input-group-header-border: 1px solid #e5e7eb;
  
  /* Helper Text */
  --input-helper-font-size: var(--scientific-text-sm);
  --input-helper-color: #6b7280;
  --input-helper-margin-top: var(--scientific-spacing-xs);
  
  /* Error/Success Messages */
  --input-message-font-size: var(--scientific-text-sm);
  --input-message-margin-top: var(--scientific-spacing-xs);
  --input-error-message-color: var(--scientific-danger-color);
  --input-success-message-color: var(--scientific-success-color);
  
  /* Autocomplete Hint */
  --input-hint-color: #9ca3af;
  --input-hint-font-style: italic;
  
  /* No Options State */
  --input-no-options-padding: var(--scientific-spacing-lg);
  --input-no-options-color: #9ca3af;
  --input-no-options-font-style: italic;
  
  /* Mobile Responsive */
  --input-mobile-font-size: var(--scientific-text-base);
  --input-mobile-min-height: 44px;
  --input-mobile-max-height: 150px;
  --input-mobile-option-padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: {type: 'select'},
      options: inputThemes,
      description: 'Input theme variant',
      table: {
        type: {summary: "'default' | 'dark' | 'scientific'"},
        defaultValue: {summary: "'default'"},
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    value: {
      control: 'text',
      description: 'Current value of the input',
    },
    options: {
      control: 'object',
      description: 'Array of available options for autocomplete',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required (shows asterisk)',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button when input has value',
    },
    state: {
      control: {type: 'select'},
      options: inputStates,
      description: 'Visual state of the input',
      table: {
        type: {summary: "'default' | 'error' | 'success'"},
        defaultValue: {summary: "'default'"},
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when state is error',
    },
    successMessage: {
      control: 'text',
      description: 'Success message displayed when state is success',
    },
    icon: {
      control: 'text',
      description: 'Icon displayed on the right side (emoji or text)',
    },
    allowCustomValues: {
      control: 'boolean',
      description: 'Whether users can add custom values not in options',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum length of input value (-1 for unlimited)',
    },
    noOptionsText: {
      control: 'text',
      description: 'Text shown when no options match the search',
    },
    autoComplete: {
      control: 'boolean',
      description: 'Whether to enable autocomplete functionality',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to focus the input on mount',
    },
  },
};

export default meta;
type Story = StoryObj<ScientificInput>;

export const Default: Story = {
  args: defaultInputArgs,
  render: ({
    label,
    placeholder,
    value,
    options,
    disabled,
    required,
    clearable,
    state,
    helperText,
    errorMessage,
    successMessage,
    icon,
    allowCustomValues,
    maxLength,
    noOptionsText,
    autoComplete,
    autoFocus,
  }) =>
    html`<scientific-input
      .label=${label}
      .placeholder=${placeholder}
      .value=${value}
      .options=${options}
      .disabled=${disabled}
      .required=${required}
      .clearable=${clearable}
      .state=${state}
      .helperText=${helperText}
      .errorMessage=${errorMessage}
      .successMessage=${successMessage}
      .icon=${icon}
      .allowCustomValues=${allowCustomValues}
      .maxLength=${maxLength}
      .noOptionsText=${noOptionsText}
      .autoComplete=${autoComplete}
      .autoFocus=${autoFocus}
    ></scientific-input>`,
};

export const States: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 400px;"
    >
      <div>
        <h3 style="margin: 0 0 16px 0;">${stateExamples[0].title}</h3>
        <scientific-input
          .label=${stateExamples[0].label}
          .placeholder=${stateExamples[0].placeholder}
          .state=${stateExamples[0].state}
          .helperText=${stateExamples[0].helperText}
          .options=${stateExamples[0].options}
        ></scientific-input>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0;">${stateExamples[1].title}</h3>
        <scientific-input
          .label=${stateExamples[1].label}
          .placeholder=${stateExamples[1].placeholder}
          .state=${stateExamples[1].state}
          .errorMessage=${stateExamples[1].errorMessage}
          .value=${stateExamples[1].value}
          .options=${stateExamples[1].options}
        ></scientific-input>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0;">${stateExamples[2].title}</h3>
        <scientific-input
          .label=${stateExamples[2].label}
          .placeholder=${stateExamples[2].placeholder}
          .state=${stateExamples[2].state}
          .successMessage=${stateExamples[2].successMessage}
          .value=${stateExamples[2].value}
          .options=${stateExamples[2].options}
        ></scientific-input>
      </div>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 400px;"
    >
      ${iconExamples.map(
        (example) => html`
          <scientific-input
            .label=${example.label}
            .placeholder=${example.placeholder}
            .icon=${example.icon}
            .options=${example.options}
          ></scientific-input>
        `
      )}
    </div>
  `,
};

export const GroupedOptions: Story = {
  render: () => html`
    <div style="width: 400px;">
      <scientific-input
        .label=${groupedOptionsExample.label}
        .placeholder=${groupedOptionsExample.placeholder}
        .options=${groupedOptionsExample.options}
        .helperText=${groupedOptionsExample.helperText}
      ></scientific-input>
    </div>
  `,
};

export const CustomValues: Story = {
  args: customValuesExample,
  render: ({label, placeholder, allowCustomValues, helperText, options}) =>
    html`<div style="width: 400px;">
      <scientific-input
        .label=${label}
        .placeholder=${placeholder}
        .allowCustomValues=${allowCustomValues}
        .helperText=${helperText}
        .options=${options}
      ></scientific-input>
    </div>`,
};

export const DisabledAndRequired: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 400px;"
    >
      <div>
        <h3 style="margin: 0 0 16px 0;">Required Field</h3>
        <scientific-input
          .label=${disabledRequiredExamples[0].label}
          .placeholder=${disabledRequiredExamples[0].placeholder}
          .required=${disabledRequiredExamples[0].required}
          .helperText=${disabledRequiredExamples[0].helperText}
          .options=${disabledRequiredExamples[0].options}
        ></scientific-input>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0;">Disabled Field</h3>
        <scientific-input
          .label=${disabledRequiredExamples[1].label}
          .placeholder=${disabledRequiredExamples[1].placeholder}
          .disabled=${disabledRequiredExamples[1].disabled}
          .value=${disabledRequiredExamples[1].value}
          .helperText=${disabledRequiredExamples[1].helperText}
          .options=${disabledRequiredExamples[1].options}
        ></scientific-input>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0;">Disabled Options</h3>
        <scientific-input
          label="Input with Disabled Options"
          placeholder="Some options are disabled..."
          .options=${[
            {label: 'Available Option 1', value: '1'},
            {label: 'Disabled Option', value: '2', disabled: true},
            {label: 'Available Option 2', value: '3'},
            {label: 'Another Disabled Option', value: '4', disabled: true},
          ]}
        ></scientific-input>
      </div>
    </div>
  `,
};

export const MaxLength: Story = {
  render: () => html`
    <div style="width: 400px;">
      <scientific-input
        label="Maximum Length (10 characters)"
        placeholder="Try typing more than 10 characters..."
        maxLength="10"
        helperText="Maximum 10 characters allowed - input will stop accepting characters after limit"
        .options=${fruitOptions}
      ></scientific-input>
    </div>
  `,
};

export const NoAutocomplete: Story = {
  render: () => html`
    <div style="width: 400px;">
      <scientific-input
        label="Regular Text Input"
        placeholder="Type anything..."
        .autoComplete=${false}
        helperText="Autocomplete is disabled - this works like a regular input"
        .options=${countryOptions}
      ></scientific-input>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <style>
      .custom-input {
        --input-border: 3px solid #6366f1;
        --input-border-radius: 16px;
        --input-bg-color: #f8fafc;
        --input-focus-border-color: #8b5cf6;
        --input-focus-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
        --input-dropdown-bg-color: #f1f5f9;
        --input-option-highlighted-bg-color: #6366f1;
        --input-option-highlighted-color: white;
        --input-padding: 16px 20px;
        --input-font-size: 18px;
      }
    </style>
    <div style="width: 400px;">
      <scientific-input
        class="custom-input"
        label="Custom Styled Input"
        placeholder="Beautifully customized..."
        .options=${fruitOptions}
        helperText="This input has custom CSS styling"
      ></scientific-input>
    </div>
  `,
};

export const TabAutocompletion: Story = {
  render: () => html`
    <div style="width: 400px;">
      <scientific-input
        label="Tab Autocompletion Demo"
        placeholder="Type 'App' and press Tab..."
        .options=${[
          {label: 'Apple', value: 'apple'},
          {label: 'Application', value: 'application'},
          {label: 'Apricot', value: 'apricot'},
          {label: 'Banana', value: 'banana'},
          {label: 'Berry', value: 'berry'},
        ]}
        helperText="Type 'App' and press Tab to autocomplete with the first match!"
      ></scientific-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the Tab autocompletion feature. Start typing and press Tab to complete with the first matching option. Also shows autocomplete hints as you type.',
      },
    },
  },
};

export const ThemeComparison: Story = {
  render: () => html`
    <style>
      .theme-container {
        padding: 24px;
        border-radius: 12px;
        border: 2px solid;
        margin-bottom: 24px;
        min-height: 200px;
        transition: all 0.2s ease;
      }
      
      .theme-container.default {
        background: #ffffff;
        border-color: #e5e7eb;
        color: #374151;
      }
      
      .theme-container.dark {
        background: #1f2937;
        border-color: #374151;
        color: #f3f4f6;
      }
      
      .theme-container.scientific {
        background: #f8fafc;
        border-color: #cbd5e1;
        color: #1e293b;
      }
      
      .default .theme-badge {
        background: #eff6ff;
        color: #1d4ed8;
      }
      
      .dark .theme-badge {
        background: #374151;
        color: #9ca3af;
      }
      
      .scientific .theme-badge {
        background: #ecfdf5;
        color: #059669;
      }
    </style>
    <div style="display: flex; flex-direction: column; gap: 0;">
      ${themeComparisonExamples.map(
        (example) => html`
          <div class="theme-container ${example.theme}">
            <h3 class="theme-title">
              ${example.title}
            </h3>
            <scientific-input
              .label=${example.label}
              .theme=${example.theme}
              .placeholder=${example.placeholder}
              .options=${example.options}
              .clearable=${example.clearable}
              style="--input-width: 100%; max-width: 400px;"
            ></scientific-input>
          </div>
        `
      )}
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
