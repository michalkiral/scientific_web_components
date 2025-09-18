import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-dropdown.js';

const meta: Meta = {
  title: 'Scientific/Dropdown',
  component: 'scientific-dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Scientific Dropdown

A **customizable**, **accessible** dropdown component for scientific web apps with advanced features.

---

## Props

- \`label\` — Dropdown label text
- \`options\` — Array of { label: string, value: string } for dropdown options
- \`selectedValue\` — Currently selected value
- \`isOpen\` — Whether the dropdown is open
- \`disabled\` — Disables the dropdown
- \`searchable\` — Enables search/filter functionality
- \`clearable\` — Shows clear button when option is selected
- \`placeholder\` — Placeholder text when no option is selected
- \`noOptionsText\` — Text shown when no options match search
- \`searchPlaceholder\` — Placeholder for search input

## Events

- \`option-selected\` — Fired when an option is selected
- \`change\` — Fired when selection changes (form compatible)
- \`option-cleared\` — Fired when selection is cleared

## Basic Usage

\`\`\`html
<scientific-dropdown
  label="Select Option"
  .options="\${[
    {label: 'Option 1', value: 'opt1'},
    {label: 'Option 2', value: 'opt2'},
  ]}"
  selectedValue="opt1"
  @change="\${handleChange}"
></scientific-dropdown>
\`\`\`

## Advanced Features

**Searchable with Clear Button:**
\`\`\`html
<scientific-dropdown
  label="Programming Languages"
  searchable
  clearable
  searchPlaceholder="Search languages..."
  .options="\${languageOptions}"
  @change="\${handleLanguageChange}"
></scientific-dropdown>
\`\`\`
---

## Features

- **Keyboard Navigation**: Arrow keys, Enter, Escape, Tab
- **Search/Filter**: Type to filter options with real-time results
- **Accessibility**: ARIA attributes and screen reader support
- **Click Outside**: Closes dropdown when clicking outside
- **Visual States**: Hover, focus, selected, disabled states
- **Clear Button**: Optional clear button for selected values
- **Width Synchronization**: Options container automatically matches dropdown width
- **Mobile Responsive**: Touch-friendly design with mobile-specific styling
- **Smooth Animations**: CSS animations for open/close transitions

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
    scientific-dropdown {
      --dropdown-width: 300px;
      --dropdown-border-radius: 12px;
      --dropdown-focus-border-color: #007bff;
      --dropdown-bg-color: #ffffff;
      --dropdown-border: 2px solid #d1d5db;
    }

**Complete Variable List:**

All CSS custom properties available for customization with their default values:

    scientific-dropdown {
      /* Container & Layout */
      --dropdown-width: 100%;
      --dropdown-min-width: auto;
      --dropdown-max-width: none;
      --dropdown-container-z-index: 1;
      
      /* Label Styling */
      --dropdown-label-margin-bottom: var(--scientific-spacing-sm);
      --dropdown-label-font-size: var(--scientific-text-sm);
      --dropdown-label-font-weight: 500;
      --dropdown-label-color: #374151;
      
      /* Main Select Styling */
      --dropdown-padding: var(--scientific-spacing-md) var(--scientific-spacing-lg);
      --dropdown-border: var(--scientific-border);
      --dropdown-border-radius: var(--scientific-border-radius);
      --dropdown-bg-color: #ffffff;
      --dropdown-color: #374151;
      --dropdown-font-size: var(--scientific-text-base);
      --dropdown-transition: var(--scientific-transition);
      --dropdown-shadow: var(--scientific-shadow-sm);
      --dropdown-min-height: 48px;
      
      /* Hover States */
      --dropdown-hover-border-color: var(--scientific-border-hover);
      --dropdown-hover-shadow: var(--scientific-shadow);
      
      /* Focus States */
      --dropdown-focus-border-color: var(--scientific-border-focus);
      --dropdown-focus-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
      
      /* Open State */
      --dropdown-open-border-color: var(--scientific-border-focus);
      
      /* Disabled States */
      --dropdown-disabled-bg-color: #f9fafb;
      --dropdown-disabled-border-color: #e5e7eb;
      --dropdown-disabled-color: #9ca3af;
      
      /* Arrow */
      --dropdown-arrow-color: #6b7280;
      
      /* Placeholder */
      --dropdown-placeholder-color: #9ca3af;
      
      /* Options Container */
      --dropdown-options-min-width: 100%;
      --dropdown-options-max-width: none;
      --dropdown-options-border: var(--scientific-border);
      --dropdown-options-border-radius: 0 0 var(--scientific-border-radius) var(--scientific-border-radius);
      --dropdown-options-bg-color: #ffffff;
      --dropdown-options-shadow: var(--scientific-shadow-lg);
      --dropdown-z-index: 1000;
      --dropdown-max-height: 200px;
      --dropdown-animation: slideDown 0.15s ease-out;
      
      /* Individual Options */
      --dropdown-option-padding: var(--scientific-spacing-md) var(--scientific-spacing-lg);
      --dropdown-option-border: 1px solid #f3f4f6;
      --dropdown-option-color: #374151;
      --dropdown-option-font-size: var(--scientific-text-base);
      --dropdown-option-hover-bg-color: #f9fafb;
      --dropdown-option-selected-bg-color: #eff6ff;
      --dropdown-option-selected-color: var(--scientific-primary-color);
      --dropdown-option-selected-font-weight: 500;
      --dropdown-option-focused-bg-color: #f3f4f6;
      
      /* Search Input */
      --dropdown-search-border: 1px solid #e5e7eb;
      --dropdown-search-bg-color: #f9fafb;
      --dropdown-search-font-size: var(--scientific-text-sm);
      --dropdown-search-padding: var(--scientific-spacing-md) var(--scientific-spacing-lg);
      --dropdown-search-color: #374151;
      --dropdown-search-focus-bg-color: #ffffff;
      
      /* Clear Button */
      --dropdown-clear-color: #6b7280;
      --dropdown-clear-hover-color: var(--scientific-danger-color);
      
      /* No Options State */
      --dropdown-no-options-padding: var(--scientific-spacing-lg);
      --dropdown-no-options-color: #9ca3af;
      
      /* Mobile Responsive */
      --dropdown-mobile-font-size: var(--scientific-text-base);
      --dropdown-mobile-min-height: 44px;
      --dropdown-mobile-max-height: 150px;
      --dropdown-mobile-option-padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
    }
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: {type: 'select'},
      options: ['default', 'dark', 'scientific'],
      description: 'Dropdown theme variant',
      table: {
        type: {summary: "'default' | 'dark' | 'scientific'"},
        defaultValue: {summary: "'default'"},
      },
    },
    label: {control: 'text', description: 'Dropdown label'},
    options: {control: 'object', description: 'Dropdown options'},
    selectedValue: {control: 'text', description: 'Selected value'},
    isOpen: {control: 'boolean', description: 'Dropdown open state'},
    disabled: {control: 'boolean', description: 'Disabled state'},
    searchable: {control: 'boolean', description: 'Enable search'},
    clearable: {control: 'boolean', description: 'Show clear button'},
    placeholder: {control: 'text', description: 'Placeholder text'},
    noOptionsText: {control: 'text', description: 'No options message'},
    searchPlaceholder: {control: 'text', description: 'Search placeholder'},
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Select an option',
    theme: 'default',
    options: [
      {label: 'Option 1', value: '1'},
      {label: 'Option 2', value: '2'},
      {label: 'Option 3', value: '3'},
    ],
    selectedValue: '',
    isOpen: false,
    disabled: false,
    searchable: false,
    clearable: false,
    placeholder: 'Choose an option...',
    noOptionsText: 'No options available',
    searchPlaceholder: 'Search options...',
  },
  render: ({
    label,
    options,
    selectedValue,
    isOpen,
    disabled,
    searchable,
    clearable,
    placeholder,
    noOptionsText,
    searchPlaceholder,
  }) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .selectedValue=${selectedValue}
      .isOpen=${isOpen}
      .disabled=${disabled}
      .searchable=${searchable}
      .clearable=${clearable}
      .placeholder=${placeholder}
      .noOptionsText=${noOptionsText}
      .searchPlaceholder=${searchPlaceholder}
      style="--dropdown-width: 300px;"
    ></scientific-dropdown>`,
};

export const WithPreselected: Story = {
  args: {
    label: 'Choose a fruit',
    options: [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Cherry', value: 'cherry'},
      {label: 'Orange', value: 'orange'},
      {label: 'Grape', value: 'grape'},
    ],
    selectedValue: 'banana',
    clearable: true,
  },
  render: ({label, options, selectedValue, clearable}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .selectedValue=${selectedValue}
      .clearable=${clearable}
      style="--dropdown-width: 300px;"
    ></scientific-dropdown>`,
};

export const Searchable: Story = {
  args: {
    label: 'Search for a country',
    searchable: true,
    placeholder: 'Type to search...',
    searchPlaceholder: 'Search countries...',
    options: [
      {label: 'United States', value: 'us'},
      {label: 'United Kingdom', value: 'uk'},
      {label: 'Germany', value: 'de'},
      {label: 'France', value: 'fr'},
      {label: 'Spain', value: 'es'},
      {label: 'Italy', value: 'it'},
      {label: 'Netherlands', value: 'nl'},
      {label: 'Belgium', value: 'be'},
      {label: 'Austria', value: 'at'},
      {label: 'Switzerland', value: 'ch'},
    ],
  },
  render: ({label, options, searchable, placeholder, searchPlaceholder}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .searchable=${searchable}
      .placeholder=${placeholder}
      .searchPlaceholder=${searchPlaceholder}
      style="--dropdown-width: 300px;"
    ></scientific-dropdown>`,
};

export const SearchableWithClear: Story = {
  args: {
    label: 'Programming Languages',
    searchable: true,
    clearable: true,
    selectedValue: 'js',
    options: [
      {label: 'JavaScript', value: 'js'},
      {label: 'TypeScript', value: 'ts'},
      {label: 'Python', value: 'py'},
      {label: 'Java', value: 'java'},
      {label: 'C++', value: 'cpp'},
      {label: 'C#', value: 'cs'},
      {label: 'Go', value: 'go'},
      {label: 'Rust', value: 'rust'},
    ],
  },
  render: ({label, options, searchable, clearable, selectedValue}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .searchable=${searchable}
      .clearable=${clearable}
      .selectedValue=${selectedValue}
      style="--dropdown-width: 300px;"
    ></scientific-dropdown>`,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    disabled: true,
    selectedValue: 'option1',
    options: [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
    ],
  },
  render: ({label, options, disabled, selectedValue}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .disabled=${disabled}
      .selectedValue=${selectedValue}
      style="--dropdown-width: 300px;"
    ></scientific-dropdown>`,
};

export const EmptyState: Story = {
  args: {
    label: 'No Options Available',
    searchable: true,
    noOptionsText: 'No items found. Try a different search.',
    options: [],
  },
  render: ({label, options, searchable, noOptionsText}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .searchable=${searchable}
      .noOptionsText=${noOptionsText}
      .isOpen=${true}
      style="--dropdown-width: 300px;"
    ></scientific-dropdown>`,
};

export const CustomStyles: Story = {
  args: {
    label: 'Custom Styled Dropdown',
    options: [
      {label: 'Red Theme', value: 'red'},
      {label: 'Blue Theme', value: 'blue'},
      {label: 'Green Theme', value: 'green'},
    ],
    clearable: true,
  },
  render: ({label, options, clearable}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .clearable=${clearable}
      style="
        --dropdown-width: 350px;
        --dropdown-border-radius: 12px;
        --dropdown-focus-border-color: #e91e63;
        --dropdown-option-selected-bg-color: #fce4ec;
        --dropdown-option-selected-color: #e91e63;
        --dropdown-shadow: 0 4px 12px rgba(0,0,0,0.15);
      "
    ></scientific-dropdown>`,
};

export const WidthSynchronization: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: flex-start;">
      <div style="flex: 1;">
        <h4 style="margin-top: 0;">Standard Width</h4>
        <scientific-dropdown
          label="Standard Dropdown"
          .options=${[
            {label: 'Short', value: 'short'},
            {label: 'Medium Length Option', value: 'medium'},
            {
              label: 'Very Long Option Name That Extends Beyond Normal Width',
              value: 'long',
            },
          ]}
          searchable
          clearable
        ></scientific-dropdown>
      </div>

      <div style="flex: 1;">
        <h4 style="margin-top: 0;">Custom Width (300px)</h4>
        <scientific-dropdown
          label="Custom Width Dropdown"
          .options=${[
            {label: 'Option A', value: 'a'},
            {label: 'Option B with longer text', value: 'b'},
            {label: 'Option C that is quite long indeed', value: 'c'},
          ]}
          searchable
          clearable
          style="--dropdown-width: 300px;"
        ></scientific-dropdown>
      </div>
    </div>

    <p style="margin-top: 24px; font-style: italic; color: #666;">
      Notice how the options container automatically matches the width of each
      dropdown, ensuring perfect alignment regardless of the dropdown width.
    </p>
  `,
};

export const ThemeComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 150px;">
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Default Theme
        </h3>
        <scientific-dropdown
          label="Default Theme Dropdown"
          theme="default"
          .options=${[
            {label: 'Option 1', value: '1'},
            {label: 'Option 2', value: '2'},
            {label: 'Option 3', value: '3'},
          ]}
          placeholder="Select an option..."
          clearable
          style="--dropdown-width: 300px;"
        ></scientific-dropdown>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Dark Theme
        </h3>
        <scientific-dropdown
          label="Dark Theme Dropdown"
          theme="dark"
          .options=${[
            {label: 'Option 1', value: '1'},
            {label: 'Option 2', value: '2'},
            {label: 'Option 3', value: '3'},
          ]}
          placeholder="Select an option..."
          clearable
          style="--dropdown-width: 300px;"
        ></scientific-dropdown>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Scientific Theme
        </h3>
        <scientific-dropdown
          label="Scientific Theme Dropdown"
          theme="scientific"
          .options=${[
            {label: 'Option 1', value: '1'},
            {label: 'Option 2', value: '2'},
            {label: 'Option 3', value: '3'},
          ]}
          placeholder="Select an option..."
          clearable
          style="--dropdown-width: 300px;"
        ></scientific-dropdown>
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
