import {html, LitElement} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {expect} from '@storybook/jest';
import {waitFor} from '@storybook/testing-library';
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

## Features

- **Keyboard Navigation**: Arrow keys, Enter, Escape, Tab
- **Search/Filter**: Type to filter options
- **Accessibility**: ARIA attributes and screen reader support
- **Click Outside**: Closes dropdown when clicking outside
- **Visual States**: Hover, focus, selected, disabled states

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

    scientific-dropdown {
      /* Container & Layout */
      --dropdown-width: 100%;
      --dropdown-font-family: system-ui, -apple-system, sans-serif;
      
      /* Label Styling */
      --dropdown-label-margin-bottom: 8px;
      --dropdown-label-font-size: 14px;
      --dropdown-label-font-weight: 500;
      --dropdown-label-color: #374151;
      
      /* Main Select Styling */
      --dropdown-padding: 12px 16px;
      --dropdown-border: 2px solid #d1d5db;
      --dropdown-border-radius: 8px;
      --dropdown-bg-color: #ffffff;
      --dropdown-color: #374151;
      --dropdown-font-size: 16px;
      --dropdown-transition: all 0.2s ease-in-out;
      --dropdown-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      --dropdown-min-height: 48px;
      
      /* Hover States */
      --dropdown-hover-border-color: #9ca3af;
      --dropdown-hover-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      
      /* Focus States */
      --dropdown-focus-border-color: #007bff;
      --dropdown-focus-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
      
      /* Open State */
      --dropdown-open-border-color: #007bff;
      
      /* Disabled States */
      --dropdown-disabled-bg-color: #f9fafb;
      --dropdown-disabled-border-color: #e5e7eb;
      --dropdown-disabled-color: #9ca3af;
      
      /* Arrow */
      --dropdown-arrow-color: #6b7280;
      
      /* Placeholder */
      --dropdown-placeholder-color: #9ca3af;
      
      /* Options Container */
      --dropdown-options-border: 2px solid #d1d5db;
      --dropdown-options-border-radius: 0 0 8px 8px;
      --dropdown-options-bg-color: #ffffff;
      --dropdown-options-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      --dropdown-z-index: 1000;
      --dropdown-max-height: 200px;
      --dropdown-animation: slideDown 0.15s ease-out;
      
      /* Individual Options */
      --dropdown-option-padding: 12px 16px;
      --dropdown-option-border: 1px solid #f3f4f6;
      --dropdown-option-color: #374151;
      --dropdown-option-font-size: 16px;
      
      /* Option Hover State */
      --dropdown-option-hover-bg-color: #f9fafb;
      
      /* Option Selected State */
      --dropdown-option-selected-bg-color: #eff6ff;
      --dropdown-option-selected-color: #007bff;
      --dropdown-option-selected-font-weight: 500;
      
      /* Option Focused State */
      --dropdown-option-focused-bg-color: #f3f4f6;
      
      /* Search Input */
      --dropdown-search-padding: 12px 16px;
      --dropdown-search-border: 1px solid #e5e7eb;
      --dropdown-search-bg-color: #f9fafb;
      --dropdown-search-font-size: 14px;
      --dropdown-search-focus-bg-color: #ffffff;
      
      /* No Options State */
      --dropdown-no-options-padding: 16px;
      --dropdown-no-options-color: #9ca3af;
    }
        `,
      },
    },
  },
  argTypes: {
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

export const InteractionTest: Story = {
  args: {
    label: 'Test Dropdown',
    searchable: true,
    clearable: true,
    options: [
      {label: 'Alpha', value: 'alpha'},
      {label: 'Beta', value: 'beta'},
      {label: 'Gamma', value: 'gamma'},
    ],
  },
  play: async ({canvasElement}) => {
    const dropdown = canvasElement.querySelector('scientific-dropdown');
    if (!dropdown) throw new Error('Dropdown not found');

    const selectElement =
      dropdown.shadowRoot?.querySelector('.dropdown-select');
    if (selectElement) {
      (selectElement as HTMLElement).click();
      await (dropdown as LitElement).updateComplete;
    }

    await waitFor(() => {
      const optionsContainer =
        dropdown.shadowRoot?.querySelector('.options-container');
      expect(optionsContainer).toBeTruthy();
    });

    const firstOption = dropdown.shadowRoot?.querySelector('.option');
    if (firstOption) {
      (firstOption as HTMLElement).click();
      await (dropdown as LitElement).updateComplete;
      expect(dropdown.selectedValue).toBe('alpha');
    }
  },
};
