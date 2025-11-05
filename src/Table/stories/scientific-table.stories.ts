import {
  sampleColumns,
  sampleData,
  minimalColumns,
  minimalData,
  customFormattingColumns,
  customFormattingData,
  createLargeCompoundDataset,
} from './scientific-table.stories.data.js';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {SCIENTIFIC_THEMES} from '../../shared/constants/themes.js';
import '../scientific-table.js';
import type {ScientificTable} from '../scientific-table.js';

const meta: Meta<ScientificTable> = {
  title: 'Scientific/Table/Scientific Table',
  component: 'scientific-table',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Scientific Table

A **feature-rich**, **accessible** data table component built on the scientific surface foundation.

---

## Props

- \`theme\` - Applies design-system theming tokens (\`default\`, \`dark\`, \`scientific\`)
- \`title\` / \`subtitle\` - Header text rendered by the surface base component
- \`columns\` - Array of column definitions (see Table Column shape below)
- \`data\` - Array of row objects rendered in the table (see Table Data shape below)
- \`csvPath\` - Optional URL; when provided, the table streams and parses CSV data into \`columns\`/\`data\`
- \`sortable\` - Enables column sorting (default: true)
- \`selectable\` - Adds selection checkboxes and exposes selected rows via callbacks
- \`pagination\` - Toggles pagination (default: true)
- \`pageSize\` / \`pageSizeOptions\` - Controls current page size and the selectable options
- \`currentPage\` - Current page index (1-based)
- \`showSearch\` - Displays a debounced search input above the table (default: true)
- \`searchPlaceholder\` - Placeholder text for the search input
- \`emptyStateTitle\` / \`emptyStateDescription\` / \`emptyStateIcon\` - Customises the empty view when no rows exist
- \`onRowClick\` - Optional callback \`(row, index)\` invoked when a row is clicked
- \`onSelectionChange\` - Optional callback receiving the currently selected rows
- \`onSort\` - Optional callback receiving \`{column, direction}\` when sorting changes

## Events

- \`sort\` - detail: {column, direction}; emitted when a sortable header is activated (bubbles)

## Basic Usage

\`\`\`html
<scientific-table
  title="Sample Dataset"
  .columns="\${[
    {key: 'id', label: 'ID', sortable: true},
    {key: 'name', label: 'Name'},
    {key: 'value', label: 'Value', type: 'number'}
  ]}"
  .data="\${[
    {id: 'row-1', name: 'Alpha', value: 42},
    {id: 'row-2', name: 'Beta', value: 17}
  ]}"
  selectable
  pagination
  showSearch
></scientific-table>
\`\`\`

## Table Column Shape

\`\`\`ts
interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'boolean';
  formatter?: (value: unknown, row: TableData) => string | TemplateResult;
}
\`\`\`

## Table Data Shape

\`\`\`ts
interface TableData {
  [key: string]: unknown;
  _id?: string; // auto-generated when omitted
}
\`\`\`

## Features

- **Streaming CSV Support**: Provide \`csvPath\` to fetch and parse large CSV files progressively
- **Searching & Sorting**: Built-in text search and sortable columns with callback hooks and events
- **Selection & Pagination**: Optional row selection state plus configurable pagination controls
- **Column Formatting**: Numeric/date types, alignment, and custom formatter functions per column
- **Empty States & Messages**: Customisable empty-state content alongside helper and error messaging from the surface base
- **Theme Integration**: Inherits scientific design tokens for light/dark/scientific themes

## Accessibility Features

- **Semantic Markup**: Uses native \`<table>\`, \`<thead>\`, \`<tbody>\`, and \`<th>\` elements for assistive technologies
- **Keyboard Friendly**: Search input, pagination controls, and selectable checkboxes are all keyboard accessible
- **Status Messaging**: Loading, helper, and error regions leverage \`ScientificSurfaceBase\` semantics
- **Focus Management**: Interactive controls are focusable and respect the surface's focus outlines

## Styling

Key CSS variables for layout and appearance:

\`\`\`css
scientific-table {
  --table-width: 100%;
  --table-max-width: 100%;
  --table-bg-color: var(--scientific-bg-primary);
  --table-border: var(--scientific-border);
  --table-header-bg-color: var(--scientific-bg-secondary);
  --table-row-hover-bg-color: var(--scientific-bg-tertiary);
  --table-row-selected-bg-color: color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
  --table-cell-padding: var(--scientific-spacing-md);
  --table-font-size: var(--scientific-text-sm);
}
\`\`\`
        `,

      },
    },
  },
  argTypes: {
    theme: {
      control: {type: 'select'},
      options: SCIENTIFIC_THEMES,
      description: 'Table theme style',
      table: {
        type: {summary: "'default' | 'dark' | 'scientific'"},
        defaultValue: {summary: "'default'"},
      },
    },
    title: {
      control: 'text',
      description: 'Table title displayed in header',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'undefined'},
      },
    },
    subtitle: {
      control: 'text',
      description: 'Table subtitle displayed below title',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'undefined'},
      },
    },
    columns: {
      control: 'object',
      description:
        'Array of column definitions with sorting, filtering, and formatting options',
      table: {
        type: {summary: 'TableColumn[]'},
        defaultValue: {summary: '[]'},
      },
    },
    data: {
      control: 'object',
      description: 'Array of data objects to display in the table',
      table: {
        type: {summary: 'TableData[]'},
        defaultValue: {summary: '[]'},
      },
    },
    csvPath: {
      control: 'text',
      description: 'Path to CSV file for automatic data loading',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'undefined'},
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner overlay',
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: 'false'},
      },
    },
    sortable: {
      control: 'boolean',
      description: 'Enable column sorting functionality',
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: 'true'},
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: 'false'},
      },
    },
    pagination: {
      control: 'boolean',
      description: 'Enable pagination controls',
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: 'true'},
      },
    },
    pageSize: {
      control: {type: 'select'},
      options: [5, 10, 25, 50, 100],
      description: 'Number of rows per page',
      table: {
        type: {summary: 'number'},
        defaultValue: {summary: '10'},
      },
    },
    currentPage: {
      control: {type: 'number', min: 1},
      description: 'Current active page',
      table: {
        type: {summary: 'number'},
        defaultValue: {summary: '1'},
      },
    },
    pageSizeOptions: {
      control: 'object',
      description: 'Available page size options',
      table: {
        type: {summary: 'number[]'},
        defaultValue: {summary: '[10, 25, 50, 100]'},
      },
    },
    showSearch: {
      control: 'boolean',
      description: 'Show global search input',
      table: {
        type: {summary: 'boolean'},
        defaultValue: {summary: 'true'},
      },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: "'Search...'"},
      },
    },
    emptyStateTitle: {
      control: 'text',
      description: 'Title shown when no data is available',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: "'No data available'"},
      },
    },
    emptyStateDescription: {
      control: 'text',
      description: 'Description shown when no data is available',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: "'No data to display'"},
      },
    },
    emptyStateIcon: {
      control: 'text',
      description: 'Icon shown in empty state',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: "'📊'"},
      },
    },
    onRowClick: {
      control: false,
      description: 'Callback fired when a row is clicked',
      table: {
        type: {summary: '(row: TableData, index: number) => void'},
        defaultValue: {summary: 'undefined'},
      },
    },
    onSelectionChange: {
      control: false,
      description: 'Callback fired when selection changes',
      table: {
        type: {summary: '(selectedRows: TableData[]) => void'},
        defaultValue: {summary: 'undefined'},
      },
    },
    onSort: {
      control: false,
      description: 'Callback fired when sorting changes',
      table: {
        type: {summary: '(sort: TableSort) => void'},
        defaultValue: {summary: 'undefined'},
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ScientificTable>;

export const Default: Story = {
  args: {
    title: 'Chemical Compounds Database',
    subtitle:
      'A comprehensive table of chemical compounds with their properties and characteristics.',
    columns: sampleColumns,
    data: sampleData,
    theme: 'default',
    sortable: true,
    pagination: true,
    pageSize: 10,
    showSearch: true,
    searchPlaceholder: 'Search compounds...',
  },
  render: (args) => html`
    <div
      style="
        width: 1200px;
        padding-top: 24px;
        margin: 0 auto;
      "
    >
      <scientific-table
        title=${args.title}
        subtitle=${args.subtitle}
        .columns=${args.columns}
        .data=${args.data}
        theme=${args.theme}
        .sortable=${args.sortable}
        .pagination=${args.pagination}
        .pageSize=${args.pageSize}
        .showSearch=${args.showSearch}
        searchPlaceholder=${args.searchPlaceholder}
      ></scientific-table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Complete scientific table with all features enabled, showing chemical compound data with various data types and formatting.',
      },
    },
  },
};

export const Basic: Story = {
  args: {
    columns: minimalColumns,
    data: minimalData,
    pagination: false,
    showSearch: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic table configuration with minimal data and disabled features for simple use cases.',
      },
    },
  },
};

export const WithSelection: Story = {
  args: {
    title: 'Selectable Compounds',
    subtitle: 'Select multiple compounds for batch operations.',
    columns: sampleColumns,
    data: sampleData.slice(0, 8),
    selectable: true,
    pagination: false,
    onSelectionChange: (selectedRows) => {
      console.log('Selected rows:', selectedRows);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table with row selection enabled. Check the browser console to see selection events.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Data',
    subtitle: 'Fetching compound data from server...',
    columns: sampleColumns,
    data: customFormattingData,
    isLoading: true,
    showSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table in loading state with spinner overlay while data is being fetched.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'The database currently contains no compound records.',
    columns: sampleColumns,
    data: [],
    emptyStateTitle: 'No compounds found',
    emptyStateDescription:
      'Try adjusting your search criteria or add new compounds to the database.',
    emptyStateIcon: '🧪',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table empty state with customizable title, description, and icon.',
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    title: 'Extended Compound Database',
    subtitle: 'Large dataset demonstrating pagination and performance.',
    columns: sampleColumns,
    data: createLargeCompoundDataset(50),
    pageSize: 8,
    pageSizeOptions: [5, 8, 15, 25, 50],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table with large dataset showing pagination controls and performance with 50+ rows.',
      },
    },
  },
};

export const CustomFormatting: Story = {
  args: {
    title: 'Custom Formatted Data',
    subtitle:
      'Demonstrating custom formatters and column alignment options.',
    columns: customFormattingColumns,
    data: customFormattingData,
    pagination: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table with custom formatting functions and various column alignments. Note: HTML formatting in formatters requires trusted content.',
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    columns: minimalColumns,
    data: minimalData,
    pagination: false,
    showSearch: false,
    sortable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal table with no search, pagination, or sorting - just basic data display.',
      },
    },
  },
};

export const CSVLoading: Story = {
  args: {
    title: 'CSV Data Import',
    subtitle: 'Table automatically loading data from a CSV file.',
    csvPath: './public/test_data.csv',
    showSearch: true,
    pagination: true,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table configured to load data from a CSV file. The CSV file needs to exist in the public directory.',
      },
    },
  },
};

export const WithEvents: Story = {
  args: {
    title: 'Interactive Table',
    subtitle: 'Table with event handlers for user interactions.',
    columns: minimalColumns,
    data: minimalData,
    selectable: true,
    onRowClick: (row, index) => {
      console.log('Row clicked:', row, 'at index:', index);
    },
    onSelectionChange: (selectedRows) => {
      console.log('Selection changed:', selectedRows);
    },
    onSort: (sort) => {
      console.log('Sort changed:', sort);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table with event handlers for row clicks, selection changes, and sorting. Check the browser console for event logs.',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    title: 'Accessible Scientific Data Table',
    subtitle:
      'This table is designed with accessibility in mind, featuring proper ARIA labels and keyboard navigation.',
    columns: sampleColumns.slice(0, 4),
    data: sampleData.slice(0, 5),
    pagination: false,
    searchPlaceholder: 'Search for chemical compounds by name or formula',
    theme: 'scientific',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table optimized for accessibility with proper semantic markup, ARIA labels, and keyboard navigation support.',
      },
    },
  },
};

export const ThemeComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Default Theme
        </h3>
        <scientific-table
          title="Default Theme Table"
          subtitle="Standard light theme with clean styling"
          .columns=${sampleColumns.slice(0, 4)}
          .data=${sampleData.slice(0, 5)}
          theme="default"
          .pagination=${false}
          .showSearch=${false}
        ></scientific-table>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Dark Theme
        </h3>
        <scientific-table
          title="Dark Theme Table"
          subtitle="Dark theme optimized for low-light environments"
          .columns=${sampleColumns.slice(0, 4)}
          .data=${sampleData.slice(0, 5)}
          theme="dark"
          .pagination=${false}
          .showSearch=${false}
        ></scientific-table>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Scientific Theme
        </h3>
        <scientific-table
          title="Scientific Theme Table"
          subtitle="Professional theme for research and scientific applications"
          .columns=${sampleColumns.slice(0, 4)}
          .data=${sampleData.slice(0, 5)}
          theme="scientific"
          .pagination=${false}
          .showSearch=${false}
        ></scientific-table>
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
