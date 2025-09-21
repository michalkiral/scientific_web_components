import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './scientific-table';
import type {ScientificTable, TableColumn, TableData} from './scientific-table';

const sampleColumns: TableColumn[] = [
  {
    key: 'id',
    label: 'ID',
    type: 'number',
    width: '80px',
    align: 'center',
    sortable: true,
  },
  {
    key: 'compound',
    label: 'Compound Name',
    type: 'text',
    sortable: true,
    filterable: true,
  },
  {
    key: 'formula',
    label: 'Chemical Formula',
    type: 'text',
    sortable: true,
    filterable: true,
    align: 'center',
  },
  {
    key: 'molarMass',
    label: 'Molar Mass (g/mol)',
    type: 'number',
    sortable: true,
    align: 'right',
    formatter: (value: unknown) => `${Number(value).toFixed(2)} g/mol`,
  },
  {
    key: 'boilingPoint',
    label: 'Boiling Point (°C)',
    type: 'number',
    sortable: true,
    align: 'right',
    formatter: (value: unknown) => `${value}°C`,
  },
  {
    key: 'soluble',
    label: 'Water Soluble',
    type: 'boolean',
    align: 'center',
    sortable: true,
  },
  {
    key: 'discovered',
    label: 'Discovery Date',
    type: 'date',
    sortable: true,
    formatter: (value: unknown) =>
      new Date(String(value)).getFullYear().toString(),
  },
];

const sampleData: TableData[] = [
  {
    _id: '1',
    id: 1,
    compound: 'Water',
    formula: 'H₂O',
    molarMass: 18.015,
    boilingPoint: 100,
    soluble: true,
    discovered: '1781-01-01',
  },
  {
    _id: '2',
    id: 2,
    compound: 'Sodium Chloride',
    formula: 'NaCl',
    molarMass: 58.44,
    boilingPoint: 1465,
    soluble: true,
    discovered: '1648-01-01',
  },
  {
    _id: '3',
    id: 3,
    compound: 'Carbon Dioxide',
    formula: 'CO₂',
    molarMass: 44.01,
    boilingPoint: -78.5,
    soluble: true,
    discovered: '1640-01-01',
  },
  {
    _id: '4',
    id: 4,
    compound: 'Ethanol',
    formula: 'C₂H₆O',
    molarMass: 46.07,
    boilingPoint: 78.4,
    soluble: true,
    discovered: '1796-01-01',
  },
  {
    _id: '5',
    id: 5,
    compound: 'Benzene',
    formula: 'C₆H₆',
    molarMass: 78.11,
    boilingPoint: 80.1,
    soluble: false,
    discovered: '1825-01-01',
  },
  {
    _id: '6',
    id: 6,
    compound: 'Methane',
    formula: 'CH₄',
    molarMass: 16.04,
    boilingPoint: -161.5,
    soluble: false,
    discovered: '1776-01-01',
  },
  {
    _id: '7',
    id: 7,
    compound: 'Ammonia',
    formula: 'NH₃',
    molarMass: 17.03,
    boilingPoint: -33.3,
    soluble: true,
    discovered: '1774-01-01',
  },
  {
    _id: '8',
    id: 8,
    compound: 'Acetone',
    formula: 'C₃H₆O',
    molarMass: 58.08,
    boilingPoint: 56.1,
    soluble: true,
    discovered: '1606-01-01',
  },
  {
    _id: '9',
    id: 9,
    compound: 'Hydrogen Sulfide',
    formula: 'H₂S',
    molarMass: 34.08,
    boilingPoint: -60.3,
    soluble: true,
    discovered: '1777-01-01',
  },
  {
    _id: '10',
    id: 10,
    compound: 'Glucose',
    formula: 'C₆H₁₂O₆',
    molarMass: 180.16,
    boilingPoint: 146,
    soluble: true,
    discovered: '1747-01-01',
  },
  {
    _id: '11',
    id: 11,
    compound: 'Acetic Acid',
    formula: 'CH₃COOH',
    molarMass: 60.05,
    boilingPoint: 118.1,
    soluble: true,
    discovered: '800-01-01',
  },
  {
    _id: '12',
    id: 12,
    compound: 'Toluene',
    formula: 'C₇H₈',
    molarMass: 92.14,
    boilingPoint: 110.6,
    soluble: false,
    discovered: '1837-01-01',
  },
  {
    _id: '13',
    id: 13,
    compound: 'Caffeine',
    formula: 'C₈H₁₀N₄O₂',
    molarMass: 194.19,
    boilingPoint: 178,
    soluble: true,
    discovered: '1819-01-01',
  },
  {
    _id: '14',
    id: 14,
    compound: 'Aspirin',
    formula: 'C₉H₈O₄',
    molarMass: 180.16,
    boilingPoint: 140,
    soluble: false,
    discovered: '1838-01-01',
  },
  {
    _id: '15',
    id: 15,
    compound: 'Vitamin C',
    formula: 'C₆H₈O₆',
    molarMass: 176.12,
    boilingPoint: 553,
    soluble: true,
    discovered: '1928-01-01',
  },
];

const minimalColumns: TableColumn[] = [
  {key: 'name', label: 'Name', type: 'text', sortable: true},
  {
    key: 'value',
    label: 'Value',
    type: 'number',
    sortable: true,
    align: 'right',
  },
  {key: 'status', label: 'Status', type: 'boolean', align: 'center'},
];

const minimalData: TableData[] = [
  {_id: '1', name: 'Alpha', value: 42, status: true},
  {_id: '2', name: 'Beta', value: 27, status: false},
  {_id: '3', name: 'Gamma', value: 83, status: true},
];

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
      options: ['default', 'dark', 'scientific'],
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
    loading: {
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
    data: [],
    loading: true,
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
    data: Array.from({length: 50}, (_, i) => ({
      _id: `${i + 1}`,
      id: i + 1,
      compound: `Compound ${i + 1}`,
      formula: `C${i}H${i + 1}O${Math.floor(i / 2)}`,
      molarMass: 50 + i * 2.5,
      boilingPoint: -100 + i * 10,
      soluble: i % 3 === 0,
      discovered: `${1800 + i}-01-01`,
    })),
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
    columns: [
      {
        key: 'id',
        label: 'ID',
        type: 'number',
        width: '60px',
        align: 'center',
      },
      {
        key: 'name',
        label: 'Compound Name',
        type: 'text',
        align: 'left',
      },
      {
        key: 'concentration',
        label: 'Concentration',
        type: 'number',
        align: 'right',
        formatter: (value: unknown) => `${Number(value).toFixed(3)} mol/L`,
      },
      {
        key: 'ph',
        label: 'pH Level',
        type: 'number',
        align: 'center',
        formatter: (value: unknown) => {
          const ph = Number(value);
          const color = ph < 7 ? 'red' : ph > 7 ? 'blue' : 'green';
          return `<span style="color: ${color}; font-weight: bold;">${ph.toFixed(
            1
          )}</span>`;
        },
      },
      {
        key: 'temperature',
        label: 'Temperature',
        type: 'number',
        align: 'right',
        formatter: (value: unknown) => `${value}°C`,
      },
    ],
    data: [
      {
        _id: '1',
        id: 1,
        name: 'Hydrochloric Acid',
        concentration: 0.1,
        ph: 1.0,
        temperature: 25,
      },
      {
        _id: '2',
        id: 2,
        name: 'Pure Water',
        concentration: 55.6,
        ph: 7.0,
        temperature: 20,
      },
      {
        _id: '3',
        id: 3,
        name: 'Sodium Hydroxide',
        concentration: 0.1,
        ph: 13.0,
        temperature: 25,
      },
      {
        _id: '4',
        id: 4,
        name: 'Acetic Acid',
        concentration: 0.05,
        ph: 2.9,
        temperature: 22,
      },
      {
        _id: '5',
        id: 5,
        name: 'Ammonia',
        concentration: 0.1,
        ph: 11.1,
        temperature: 18,
      },
    ],
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
    columns: [
      {key: 'element', label: 'Element', type: 'text'},
      {key: 'symbol', label: 'Symbol', type: 'text', align: 'center'},
      {key: 'atomicNumber', label: 'Atomic #', type: 'number', align: 'center'},
    ],
    data: [
      {_id: '1', element: 'Hydrogen', symbol: 'H', atomicNumber: 1},
      {_id: '2', element: 'Helium', symbol: 'He', atomicNumber: 2},
      {_id: '3', element: 'Lithium', symbol: 'Li', atomicNumber: 3},
      {_id: '4', element: 'Beryllium', symbol: 'Be', atomicNumber: 4},
    ],
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

// CSV loading example (would need actual CSV file)
export const CSVLoading: Story = {
  args: {
    title: 'CSV Data Import',
    description: 'Table automatically loading data from a CSV file.',
    csvPath: './dev/test_data.csv',
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
