import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './scientific-input.js';
import type {ScientificInput} from './scientific-input.js';

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
- \`size\` — Input size: small, medium, large
- \`state\` — Visual state: default, error, success
- \`helperText\` — Helper text displayed below the input
- \`errorMessage\` — Error message displayed when state is error
- \`successMessage\` — Success message displayed when state is success
- \`icon\` — Icon displayed on the right side (emoji or text)
- \`allowCustomValues\` — Whether users can add custom values not in options
- \`minLength\` — Minimum length of input value
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
- **Multiple size variants** (small, medium, large)
- **State management** (default, error, success) with visual feedback
- **Clearable input** with optional clear button
- **Custom value support** allowing users to add new options
- **Grouped options** for better organization
- **Keyboard navigation** with arrow keys and Enter/Escape support
- **Tab autocompletion** for quick selection
- **Length validation** with min/max length constraints
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

**Complete Variable List:**

    scientific-input {
      /* Container & Layout */
      --input-width: 100%;
      --input-min-width: auto;
      --input-max-width: none;
      --input-height: auto;
      --input-min-height: 48px;
      
      /* Input Field Styling */
      --input-padding: 12px 16px;
      --input-border: 2px solid #e5e7eb;
      --input-border-radius: 8px;
      --input-bg-color: #ffffff;
      --input-color: #374151;
      --input-font-size: 16px;
      --input-font-weight: 400;
      --input-line-height: 1.5;
      --input-transition: all 0.2s ease-in-out;
      
      /* Label Styling */
      --input-label-font-size: 14px;
      --input-label-font-weight: 500;
      --input-label-color: #374151;
      --input-label-margin-bottom: 6px;
      
      /* Focus States */
      --input-focus-border-color: #007bff;
      --input-focus-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
      --input-focus-bg-color: #ffffff;
      
      /* Hover States */
      --input-hover-border-color: #d1d5db;
      
      /* Disabled States */
      --input-disabled-bg-color: #f9fafb;
      --input-disabled-border-color: #e5e7eb;
      --input-disabled-color: #9ca3af;
      
      /* Error States */
      --input-error-border-color: #ef4444;
      --input-error-focus-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      --input-error-color: #dc2626;
      
      /* Success States */
      --input-success-border-color: #10b981;
      --input-success-focus-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      --input-success-color: #059669;
      
      /* Placeholder */
      --input-placeholder-color: #9ca3af;
      
      /* Icon */
      --input-icon-color: #6b7280;
      --input-icon-size: 18px;
      
      /* Clear Button */
      --input-clear-color: #6b7280;
      --input-clear-hover-color: #374151;
      
      /* Dropdown */
      --input-dropdown-bg-color: #ffffff;
      --input-dropdown-border: 1px solid #e5e7eb;
      --input-dropdown-border-radius: 8px;
      --input-dropdown-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      --input-dropdown-max-height: 200px;
      --input-dropdown-z-index: 1000;
      
      /* Options */
      --input-option-padding: 12px 16px;
      --input-option-color: #374151;
      --input-option-hover-bg-color: #f9fafb;
      --input-option-selected-bg-color: #eff6ff;
      --input-option-selected-color: #2563eb;
      --input-option-highlighted-bg-color: #f3f4f6;
      --input-option-disabled-color: #9ca3af;
      --input-option-disabled-bg-color: transparent;
      
      /* Group Headers */
      --input-group-header-color: #6b7280;
      --input-group-header-font-weight: 600;
      --input-group-header-padding: 8px 16px;
      --input-group-header-bg-color: #f9fafb;
      
      /* Helper Text */
      --input-helper-font-size: 14px;
      --input-helper-color: #6b7280;
      --input-helper-margin-top: 6px;
      
      /* Size Variants */
      --input-small-font-size: 14px;
      --input-small-padding: 8px 12px;
      --input-small-min-height: 36px;
      
      --input-large-font-size: 18px;
      --input-large-padding: 16px 20px;
      --input-large-min-height: 56px;
      
      /* Mobile Responsive */
      --input-mobile-font-size: 16px;
      --input-mobile-min-height: 44px;
      --input-small-mobile-min-height: 32px;
      --input-large-mobile-min-height: 52px;
    }
        `,
      },
    },
  },
  argTypes: {
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
    size: {
      control: {type: 'select'},
      options: ['small', 'medium', 'large'],
      description: 'Size of the input field',
    },
    state: {
      control: {type: 'select'},
      options: ['default', 'error', 'success'],
      description: 'Visual state of the input',
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
    minLength: {
      control: 'number',
      description: 'Minimum length of input value',
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
  args: {
    label: 'Search Countries',
    placeholder: 'Type to search countries...',
    value: '',
    options: [
      {label: 'United States', value: 'us'},
      {label: 'United Kingdom', value: 'uk'},
      {label: 'Canada', value: 'ca'},
      {label: 'Germany', value: 'de'},
      {label: 'France', value: 'fr'},
      {label: 'Japan', value: 'jp'},
      {label: 'Australia', value: 'au'},
    ],
    disabled: false,
    required: false,
    clearable: true,
    state: 'default',
    helperText: 'Select a country from the list or type to search',
    errorMessage: '',
    successMessage: '',
    icon: '',
    allowCustomValues: false,
    minLength: 0,
    maxLength: -1,
    noOptionsText: 'No countries found',
    autoComplete: true,
    autoFocus: false,
  },
  render: ({
    label,
    placeholder,
    value,
    options,
    disabled,
    required,
    clearable,
    size,
    state,
    helperText,
    errorMessage,
    successMessage,
    icon,
    allowCustomValues,
    minLength,
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
      .size=${size}
      .state=${state}
      .helperText=${helperText}
      .errorMessage=${errorMessage}
      .successMessage=${successMessage}
      .icon=${icon}
      .allowCustomValues=${allowCustomValues}
      .minLength=${minLength}
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
      <h3 style="margin: 0;">Default State</h3>
      <scientific-input
        label="Default Input"
        placeholder="Type something..."
        state="default"
        helperText="This is a helper text"
        .options=${[
          {label: 'Apple', value: 'apple'},
          {label: 'Banana', value: 'banana'},
          {label: 'Cherry', value: 'cherry'},
        ]}
      ></scientific-input>

      <h3 style="margin: 0;">Error State</h3>
      <scientific-input
        label="Error Input"
        placeholder="Type something..."
        state="error"
        errorMessage="This field contains an error"
        value="invalid input"
        .options=${[
          {label: 'Apple', value: 'apple'},
          {label: 'Banana', value: 'banana'},
          {label: 'Cherry', value: 'cherry'},
        ]}
      ></scientific-input>

      <h3 style="margin: 0;">Success State</h3>
      <scientific-input
        label="Success Input"
        placeholder="Type something..."
        state="success"
        successMessage="Input validated successfully"
        value="valid input"
        .options=${[
          {label: 'Apple', value: 'apple'},
          {label: 'Banana', value: 'banana'},
          {label: 'Cherry', value: 'cherry'},
        ]}
      ></scientific-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 400px;"
    >
      <h3 style="margin: 0;">Small Size</h3>
      <scientific-input
        label="Small Input"
        placeholder="Small size input..."
        size="small"
        .options=${[
          {label: 'Option 1', value: '1'},
          {label: 'Option 2', value: '2'},
          {label: 'Option 3', value: '3'},
        ]}
      ></scientific-input>

      <h3 style="margin: 0;">Medium Size (Default)</h3>
      <scientific-input
        label="Medium Input"
        placeholder="Medium size input..."
        size="medium"
        .options=${[
          {label: 'Option 1', value: '1'},
          {label: 'Option 2', value: '2'},
          {label: 'Option 3', value: '3'},
        ]}
      ></scientific-input>

      <h3 style="margin: 0;">Large Size</h3>
      <scientific-input
        label="Large Input"
        placeholder="Large size input..."
        size="large"
        .options=${[
          {label: 'Option 1', value: '1'},
          {label: 'Option 2', value: '2'},
          {label: 'Option 3', value: '3'},
        ]}
      ></scientific-input>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 400px;"
    >
      <scientific-input
        label="Search with Icon"
        placeholder="Search users..."
        icon="👤"
        .options=${[
          {label: 'John Doe', value: 'john'},
          {label: 'Jane Smith', value: 'jane'},
          {label: 'Bob Johnson', value: 'bob'},
        ]}
      ></scientific-input>

      <scientific-input
        label="Email Input"
        placeholder="Enter email..."
        icon="📧"
        .options=${[
          {label: 'john@example.com', value: 'john@example.com'},
          {label: 'jane@example.com', value: 'jane@example.com'},
          {label: 'bob@example.com', value: 'bob@example.com'},
        ]}
      ></scientific-input>

      <scientific-input
        label="Location Search"
        placeholder="Search locations..."
        icon="📍"
        .options=${[
          {label: 'New York, NY', value: 'nyc'},
          {label: 'Los Angeles, CA', value: 'la'},
          {label: 'Chicago, IL', value: 'chicago'},
        ]}
      ></scientific-input>
    </div>
  `,
};

export const GroupedOptions: Story = {
  render: () => html`
    <div style="width: 400px;">
      <scientific-input
        label="Programming Languages"
        placeholder="Choose a programming language..."
        .options=${[
          {label: 'JavaScript', value: 'js', group: 'Web Development'},
          {label: 'TypeScript', value: 'ts', group: 'Web Development'},
          {label: 'HTML', value: 'html', group: 'Web Development'},
          {label: 'CSS', value: 'css', group: 'Web Development'},
          {label: 'Python', value: 'python', group: 'Backend'},
          {label: 'Java', value: 'java', group: 'Backend'},
          {label: 'C#', value: 'csharp', group: 'Backend'},
          {label: 'Go', value: 'go', group: 'Backend'},
          {label: 'Swift', value: 'swift', group: 'Mobile'},
          {label: 'Kotlin', value: 'kotlin', group: 'Mobile'},
          {label: 'React Native', value: 'rn', group: 'Mobile'},
        ]}
        helperText="Options are grouped by category"
      ></scientific-input>
    </div>
  `,
};

export const CustomValues: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Type to add a tag...',
    allowCustomValues: true,
    helperText: 'Select from existing tags or create new ones',
    options: [
      {label: 'React', value: 'react'},
      {label: 'Vue', value: 'vue'},
      {label: 'Angular', value: 'angular'},
      {label: 'Svelte', value: 'svelte'},
    ],
  },
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
      <h3 style="margin: 0;">Required Field</h3>
      <scientific-input
        label="Required Input"
        placeholder="This field is required..."
        .required=${true}
        .options=${[
          {label: 'Option 1', value: '1'},
          {label: 'Option 2', value: '2'},
          {label: 'Option 3', value: '3'},
        ]}
      ></scientific-input>

      <h3 style="margin: 0;">Disabled Field</h3>
      <scientific-input
        label="Disabled Input"
        placeholder="This field is disabled..."
        value="Disabled value"
        disabled
        .options=${[
          {label: 'Option 1', value: '1'},
          {label: 'Option 2', value: '2'},
          {label: 'Option 3', value: '3'},
        ]}
      ></scientific-input>

      <h3 style="margin: 0;">Disabled Options</h3>
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
  `,
};

export const LengthLimits: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; width: 400px;"
    >
      <scientific-input
        label="Minimum Length (3 characters)"
        placeholder="Must be at least 3 characters..."
        minLength="3"
        helperText="Minimum 3 characters required"
        .options=${[
          {label: 'Apple', value: 'apple'},
          {label: 'Banana', value: 'banana'},
          {label: 'Cherry', value: 'cherry'},
        ]}
      ></scientific-input>

      <scientific-input
        label="Maximum Length (10 characters)"
        placeholder="Maximum 10 characters..."
        maxLength="10"
        helperText="Maximum 10 characters allowed"
        .options=${[
          {label: 'Short', value: 'short'},
          {label: 'Medium', value: 'medium'},
          {label: 'Long text', value: 'long'},
        ]}
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
        .options=${[
          {label: 'These options', value: '1'},
          {label: 'Will not show', value: '2'},
          {label: 'In dropdown', value: '3'},
        ]}
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
        .options=${[
          {label: 'Custom Option 1', value: '1'},
          {label: 'Custom Option 2', value: '2'},
          {label: 'Custom Option 3', value: '3'},
        ]}
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
