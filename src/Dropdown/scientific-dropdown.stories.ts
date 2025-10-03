import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-dropdown.js';
import {
  dropdownThemes,
  defaultDropdownArgs,
  preselectedExample,
  searchableExample,
  searchableWithClearExample,
  disabledExample,
  emptyStateExample,
  customStyleThemes,
  dynamicThemeOptions,
  widthComparisonExamples,
  themeComparisonExamples,
} from './scientific-dropdown.stories.data.js';

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
      options: dropdownThemes,
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
  args: defaultDropdownArgs,
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
  args: preselectedExample,
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
  args: searchableExample,
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
  args: searchableWithClearExample,
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
  args: disabledExample,
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
  args: emptyStateExample,
  render: ({label, options, searchable, noOptionsText, isOpen}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .searchable=${searchable}
      .noOptionsText=${noOptionsText}
      .isOpen=${isOpen}
      style="--dropdown-width: 300px;"
    ></scientific-dropdown>`,
};

export const CustomStyles: Story = {
  render: () => {
    let selectedTheme = '';

    const handleThemeChange = (e: CustomEvent) => {
      selectedTheme = e.detail.value;
      const dropdown = e.target as HTMLElement;
      
      const themeStyles = customStyleThemes[selectedTheme as keyof typeof customStyleThemes];
      if (themeStyles) {
        Object.entries(themeStyles).forEach(([property, value]) => {
          dropdown.style.setProperty(property, value);
        });
      }
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <scientific-dropdown
          label="Dynamic Theme Dropdown"
          .options=${dynamicThemeOptions}
          .clearable=${true}
          @change=${handleThemeChange}
          style="
            --dropdown-width: 350px;
            --dropdown-border-radius: 12px;
            --dropdown-shadow: 0 4px 12px rgba(0,0,0,0.15);
          "
        ></scientific-dropdown>
        
        <p style="margin: 0; font-style: italic; color: #666; font-size: 14px;">
          Select a theme option to see the dropdown colors change dynamically!
        </p>
      </div>
    `;
  },
};

export const WidthSynchronization: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: flex-start;">
      <div style="flex: 1;">
        <h4 style="margin-top: 0;">${widthComparisonExamples[0].title}</h4>
        <scientific-dropdown
          label=${widthComparisonExamples[0].label}
          .options=${widthComparisonExamples[0].options}
          .searchable=${widthComparisonExamples[0].searchable}
          .clearable=${widthComparisonExamples[0].clearable}
        ></scientific-dropdown>
      </div>

      <div style="flex: 1;">
        <h4 style="margin-top: 0;">${widthComparisonExamples[1].title}</h4>
        <scientific-dropdown
          label=${widthComparisonExamples[1].label}
          .options=${widthComparisonExamples[1].options}
          .searchable=${widthComparisonExamples[1].searchable}
          .clearable=${widthComparisonExamples[1].clearable}
          style=${widthComparisonExamples[1].style}
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
    <div style="display: flex; flex-direction: column; gap: 25px;">
      ${themeComparisonExamples.map(
        (example) => html`
          <div>
            <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
              ${example.title}
            </h3>
            <scientific-dropdown
              label=${example.label}
              theme=${example.theme}
              .options=${example.options}
              placeholder=${example.placeholder}
              .clearable=${example.clearable}
              style=${example.style}
            ></scientific-dropdown>
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
