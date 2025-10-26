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

A **highly configurable**, **accessible** autocomplete/combobox built on the scientific design system.

---

## Props

- \`theme\` - Applies design-system theming tokens (\`default\`, \`dark\`, \`scientific\`)
- \`label\` - Text label rendered above the field
- \`placeholder\` - Placeholder text when no value is present
- \`value\` - Current value (kept in sync with the rendered input)
- \`type\` - Input type (default \`text\`; supports scientific \`InputType\` union)
- \`options\` - Array of \`DropdownOption\` objects (label, value, optional \`disabled\`, optional \`group\`) used for autocomplete
- \`disabled\` - Disables interaction and styling
- \`required\` - Marks the label and adds required styling
- \`clearable\` - Shows the clear button when a value exists (default: true)
- \`state\` - Visual state: \`default\`, \`error\`, or \`success\`
- \`helperText\` - Supporting helper copy below the field
- \`errorMessage\` - Message rendered when \`state='error'\`
- \`successMessage\` - Message rendered when \`state='success'\`
- \`icon\` - Optional trailing icon/text rendered when the clear button is hidden
- \`allowCustomValues\` - Allows selecting values not present in \`options\`
- \`maxLength\` - Maximum input length (\`-1\` means unlimited)
- \`noOptionsText\` - Message shown when no results match
- \`autoComplete\` - Enables dropdown filtering, hinting, and auto-open behaviour (default: true)
- \`autoFocus\` - Focuses the input after the component renders

## Events

- \`input\` - detail: {value}; fired on every keystroke (bubbles, composed)
- \`change\` - detail: {value, label?}; emitted alongside other selection/clear events for form integration (bubbles, composed)
- \`option-selected\` - detail: {option, value, label}; fired when a dropdown option is chosen
- \`custom-value-selected\` - detail: {value}; fired when a custom value is accepted
- \`option-cleared\` - detail: {value: '', label: '', timestamp}; fired after the clear button resets the field
- \`focus\` - detail: {value}; emitted when the input gains focus
- \`blur\` - detail: {value}; emitted after focus leaves the input

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

- **Debounced Autocomplete**: Filters options as you type (150 ms) and auto-opens the list when appropriate
- **Predictive Hinting**: Displays an inline completion hint and accepts it with Tab
- **Keyboard Navigation**: Dropdown controller handles arrow keys, Enter, Escape, and Tab selection semantics
- **Custom Values & Clearing**: Optional custom-value flow plus a reusable clear button that focuses the field again
- **Stateful Messaging**: Helper, error, and success copy share scientific message styling and roles
- **Grouped Options**: Supports grouped datasets via each option's \`group\` field
- **Theme Ready**: Integrates with design-system themes and shared typography/spacing tokens

## Accessibility Features

- **Combobox Semantics**: Uses \`role="combobox"\`, \`aria-expanded\`, \`aria-autocomplete\`, and \`aria-haspopup\` for assistive tech
- **Visible Feedback**: Required indicator, state styling, and helper/error messages announced with appropriate roles
- **Keyboard-First Design**: All interactions are reachable with the keyboard; Tab accepts hints or closes the list
- **Live Hint Layer**: Autocomplete hint renders as plain text so screen readers echo forthcoming input
- **Consistent Focus**: Clear actions return focus to the input and dropdown closing preserves context

## Option Shape

Each option object can include:

    {
      label: string;    // Visible text
      value: string;    // Submitted value
      disabled?: boolean;
      group?: string;   // Optional grouping header
    }

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
\`\`\`css
scientific-input {
  --input-width: 100%;
  --input-border: var(--scientific-border);
  --input-border-radius: var(--scientific-border-radius);
  --input-padding: var(--scientific-spacing-md) var(--scientific-spacing-lg);
  --input-font-size: var(--scientific-text-base);
  --input-focus-border-color: var(--scientific-border-focus);
  --input-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
}
\`\`\`

**Complete Variable List:**

\`\`\`css
scientific-input {
  /* Dimensions */
  --input-width: 100%;
  --input-min-width: auto;
  --input-max-width: none;
  --input-min-height: 48px;
  --input-container-z-index: 1;

  /* Labels */
  --input-label-color: var(--scientific-text-primary);
  --input-label-margin-bottom: var(--scientific-spacing-sm);

  /* Field */
  --input-font-size: var(--scientific-text-base);
  --input-border: var(--scientific-border);
  --input-border-radius: var(--scientific-border-radius);
  --input-bg-color: var(--scientific-bg-primary);
  --input-color: var(--scientific-text-secondary);
  --input-shadow: var(--scientific-shadow-sm);
  --input-transition: var(--scientific-transition);

  /* States */
  --input-hover-border-color: var(--scientific-border-hover);
  --input-focus-border-color: var(--scientific-border-focus);
  --input-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
  --input-disabled-bg-color: var(--scientific-bg-tertiary);
  --input-disabled-border-color: var(--scientific-border-color);
  --input-disabled-color: var(--scientific-text-muted);
  --input-error-border-color: var(--scientific-danger-color);
  --input-success-border-color: var(--scientific-success-color);

  /* Icons & Clear Button */
  --input-icon-color: var(--scientific-text-muted);
  --input-icon-size: 20px;
  --input-clear-size: 20px;

  /* Dropdown */
  --input-dropdown-min-width: 100%;
  --input-dropdown-max-width: none;
  --input-dropdown-shadow: var(--scientific-shadow);
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
