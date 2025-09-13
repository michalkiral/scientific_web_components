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
A highly customizable autocomplete input component with advanced features:

## Features
- **Autocomplete functionality** with customizable options
- **Multiple size variants** (small, medium, large)
- **State management** (default, error, success) with visual feedback
- **Clearable input** with optional clear button
- **Custom value support** allowing users to add new options
- **Grouped options** for better organization
- **Keyboard navigation** with arrow keys and Enter/Escape support
- **Accessible** with proper ARIA attributes
- **Responsive design** that works on all devices
- **Highly customizable** with CSS custom properties

## CSS Custom Properties
The component supports extensive customization through CSS custom properties:
- \`--input-width\`: Component width
- \`--input-border\`: Border style
- \`--input-border-radius\`: Border radius
- \`--input-bg-color\`: Background color
- \`--input-padding\`: Internal padding
- \`--input-font-size\`: Text size
- \`--input-focus-border-color\`: Focus border color
- \`--input-focus-shadow\`: Focus shadow effect
- And many more...

## Events
- \`input\`: Fired when the input value changes
- \`change\`: Fired when the input value changes
- \`option-selected\`: Fired when an option is selected from dropdown
- \`custom-value-selected\`: Fired when a custom value is added
- \`clear\`: Fired when the input is cleared
- \`focus\`: Fired when the input gains focus
- \`blur\`: Fired when the input loses focus
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
