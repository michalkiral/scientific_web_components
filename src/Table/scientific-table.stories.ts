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
import {SCIENTIFIC_THEMES} from '../shared/constants/themes.js';
import './scientific-table';
import type {ScientificTable} from './scientific-table';

const meta: Meta<ScientificTable> = {
  title: 'Scientific/Scientific Table',
  component: 'scientific-table',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Scientific Table

A **comprehensive**, **accessible** data table component designed for scientific web applications with advanced features.

---

## Props

- \`title\` — Table title displayed in header
- \`description\` — Table description displayed below title
- \`columns\` — Array of column definitions with sorting, filtering, and formatting options
- \`data\` — Array of data objects to display in the table
- \`csvPath\` — Path to CSV file for automatic data loading
- \`loading\` — Show loading spinner overlay
- \`sortable\` — Enable column sorting functionality
- \`filterable\` — Enable column filtering functionality
- \`selectable\` — Enable row selection with checkboxes
- \`pagination\` — Enable pagination controls
- \`pageSize\` — Number of rows per page
- \`currentPage\` — Current active page
- \`pageSizeOptions\` — Available page size options
- \`showSearch\` — Show global search input
- \`searchPlaceholder\` — Placeholder text for search input
- \`emptyStateTitle\` — Title shown when no data is available
- \`emptyStateDescription\` — Description shown when no data is available
- \`emptyStateIcon\` — Icon shown in empty state
- \`onRowClick\` — Callback fired when a row is clicked
- \`onSelectionChange\` — Callback fired when selection changes
- \`onSort\` — Callback fired when sorting changes
- \`onFilter\` — Callback fired when filters change

## Events

- \`row-click\` — Fired when a row is clicked with row data and index
- \`selection-change\` — Fired when row selection changes
- \`sort-change\` — Fired when column sorting changes
- \`filter-change\` — Fired when column filters change
- \`page-change\` — Fired when pagination changes

## Basic Usage

\`\`\`html
<scientific-table
  title="Chemical Compounds Database"
  description="A comprehensive table of chemical compounds"
  .columns="\${[
    {key: 'name', label: 'Compound Name', type: 'text', sortable: true},
    {key: 'formula', label: 'Formula', type: 'text', align: 'center'},
    {key: 'mass', label: 'Molar Mass', type: 'number', align: 'right'}
  ]}"
  .data="\${compounds}"
  sortable
  filterable
  pagination
  showSearch
></scientific-table>
\`\`\`

**Advanced Usage with Custom Formatting:**
\`\`\`html
<scientific-table
  .columns="\${[
    {
      key: 'temperature',
      label: 'Temperature',
      type: 'number',
      formatter: (value) => \`\${value}°C\`
    },
    {
      key: 'status',
      label: 'Status',
      type: 'boolean',
      formatter: (value) => value ? '✅ Active' : '❌ Inactive'
    }
  ]}"
  .data="\${experimentData}"
  selectable
  @selection-change="\${handleSelection}"
></scientific-table>
\`\`\`

## Features

- **Advanced Sorting**: Multi-type sorting (text, number, date, boolean) with custom sort functions
- **Search & Filtering**: Global search with column-specific filters and operators
- **Pagination**: Configurable page sizes and navigation with large dataset support
- **Selection**: Single and multi-row selection capabilities with selection events
- **Data Types**: Support for various data types with custom formatters and validators
- **CSV Loading**: Direct CSV file loading capability with automatic column detection
- **Custom Formatting**: Rich formatting options with HTML support and custom renderers
- **Responsive Design**: Mobile-optimized layout with horizontal scrolling and touch support
- **Performance**: Virtualized rendering for large datasets with lazy loading
- **Form Integration**: Built-in form controls and validation support
- **Export Capabilities**: CSV and JSON export functionality
- **Customizable Styling**: Extensive CSS custom properties for complete theming

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with arrow keys, Tab, Enter, Space
- **Screen Reader Support**: Proper ARIA labels, roles, and live region announcements
- **Focus Management**: Logical focus flow and visible focus indicators
- **Table Semantics**: Proper table structure with headers, captions, and data associations
- **High Contrast**: Support for high contrast mode and custom color schemes
- **Sort Announcements**: Screen reader announcements for sort direction changes
- **Selection States**: Clear indication of selected rows and selection counts
- **Error Handling**: Accessible error messages and validation feedback
- **Loading States**: Accessible loading indicators with proper ARIA attributes

## Column Configuration

Each column supports these properties:

    interface TableColumn {
      key: string;                    // Data property key
      label: string;                  // Display label
      type?: 'text' | 'number' | 'date' | 'boolean';  // Data type
      sortable?: boolean;             // Enable sorting
      filterable?: boolean;           // Enable filtering
      width?: string;                 // Column width (CSS)
      align?: 'left' | 'center' | 'right';  // Text alignment
      formatter?: (value, row) => string;   // Custom formatter
    }

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
    scientific-table {
      --table-bg-color: #ffffff;
      --table-border: 1px solid #e5e7eb;
      --table-border-radius: 8px;
      --table-header-bg-color: #f9fafb;
      --table-row-hover-bg-color: #f3f4f6;
      --table-cell-padding: 12px;
      --table-font-size: 14px;
    }

**Complete Variable List:**

    scientific-table {
      /* Container & Layout */
      --table-width: 100%;
      --table-max-width: 100%;
      --table-height: auto;
      --table-max-height: none;
      --table-overflow: auto;
      
      /* Table Container */
      --table-bg-color: #ffffff;
      --table-border: 1px solid #e5e7eb;
      --table-border-radius: 8px;
      --table-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      --table-margin: 0;
      --table-padding: 0;
      
      /* Header Styling */
      --table-header-bg-color: #f9fafb;
      --table-header-border-bottom: 2px solid #e5e7eb;
      --table-header-font-weight: 600;
      --table-header-font-size: 14px;
      --table-header-color: #374151;
      --table-header-padding: 16px 12px;
      --table-header-text-transform: none;
      
      /* Cell Styling */
      --table-cell-padding: 12px;
      --table-cell-border-bottom: 1px solid #f3f4f6;
      --table-cell-font-size: 14px;
      --table-cell-color: #374151;
      --table-cell-line-height: 1.5;
      
      /* Row Styling */
      --table-row-bg-color: #ffffff;
      --table-row-hover-bg-color: #f3f4f6;
      --table-row-selected-bg-color: #eff6ff;
      --table-row-striped-bg-color: #f9fafb;
      --table-row-transition: background-color 0.15s ease-in-out;
      
      /* Sorting */
      --table-sort-icon-color: #9ca3af;
      --table-sort-icon-active-color: #374151;
      --table-sort-hover-bg-color: #f3f4f6;
      
      /* Search & Filters */
      --table-search-bg-color: #ffffff;
      --table-search-border: 1px solid #d1d5db;
      --table-search-border-radius: 6px;
      --table-search-padding: 8px 12px;
      --table-search-font-size: 14px;
      --table-search-placeholder-color: #9ca3af;
      
      /* Filter Controls */
      --table-filter-bg-color: #f9fafb;
      --table-filter-border: 1px solid #e5e7eb;
      --table-filter-border-radius: 4px;
      --table-filter-padding: 6px 8px;
      --table-filter-font-size: 12px;
      
      /* Pagination */
      --table-pagination-bg-color: #ffffff;
      --table-pagination-border-top: 1px solid #e5e7eb;
      --table-pagination-padding: 16px;
      --table-pagination-gap: 8px;
      --table-pagination-button-bg-color: #ffffff;
      --table-pagination-button-border: 1px solid #d1d5db;
      --table-pagination-button-color: #374151;
      --table-pagination-button-hover-bg-color: #f3f4f6;
      --table-pagination-button-active-bg-color: #3b82f6;
      --table-pagination-button-active-color: #ffffff;
      
      /* Selection */
      --table-checkbox-color: #3b82f6;
      --table-selection-bg-color: #eff6ff;
      --table-selection-border-color: #3b82f6;
      
      /* Loading States */
      --table-loading-overlay-bg: rgba(255, 255, 255, 0.8);
      --table-loading-spinner-color: #3b82f6;
      --table-loading-z-index: 10;
      
      /* Empty States */
      --table-empty-bg-color: #f9fafb;
      --table-empty-color: #6b7280;
      --table-empty-font-size: 16px;
      --table-empty-padding: 48px 24px;
      --table-empty-icon-size: 48px;
      
      /* Error States */
      --table-error-bg-color: #fef2f2;
      --table-error-border-color: #fecaca;
      --table-error-color: #dc2626;
      
      /* Mobile Responsive */
      --table-mobile-font-size: 14px;
      --table-mobile-cell-padding: 8px;
      --table-mobile-header-padding: 12px 8px;
      --table-mobile-pagination-button-size: 44px;
      
      /* Scrollbar Styling */
      --table-scrollbar-width: 8px;
      --table-scrollbar-track-color: #f1f5f9;
      --table-scrollbar-thumb-color: #cbd5e1;
      --table-scrollbar-thumb-hover-color: #94a3b8;
    }

## Data Format

The table accepts data in the \`TableData\` format:

    interface TableData {
      [key: string]: unknown;    // Dynamic properties
      _id?: string;             // Optional unique identifier
    }

## Performance Tips

- Use \`_id\` property for efficient row tracking
- Implement pagination for large datasets (>100 rows)
- Use column \`width\` properties to prevent layout shifts
- Consider virtualization for extremely large datasets (>1000 rows)
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
    description: {
      control: 'text',
      description: 'Table description displayed below title',
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
    filterable: {
      control: 'boolean',
      description: 'Enable column filtering functionality',
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
    onFilter: {
      control: false,
      description: 'Callback fired when filters change',
      table: {
        type: {summary: '(filters: TableFilter[]) => void'},
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
    description:
      'A comprehensive table of chemical compounds with their properties and characteristics.',
    columns: sampleColumns,
    data: sampleData,
    theme: 'default',
    sortable: true,
    filterable: true,
    pagination: true,
    pageSize: 10,
    showSearch: true,
    searchPlaceholder: 'Search compounds...',
  },
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
    description: 'Select multiple compounds for batch operations.',
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
    description: 'Fetching compound data from server...',
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
    description: 'The database currently contains no compound records.',
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
    description: 'Large dataset demonstrating pagination and performance.',
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
    description:
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
    description: 'Table automatically loading data from a CSV file.',
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
    description: 'Table with event handlers for user interactions.',
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
    description:
      'This table is designed with accessibility in mind, featuring proper ARIA labels and keyboard navigation.',
    columns: sampleColumns.slice(0, 4),
    data: sampleData.slice(0, 5),
    pagination: false,
    searchPlaceholder: 'Search for chemical compounds by name or formula',
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
          description="Standard light theme with clean styling"
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
          description="Dark theme optimized for low-light environments"
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
          description="Professional theme for research and scientific applications"
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
