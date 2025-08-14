import type {Meta, StoryObj} from '@storybook/web-components-vite';
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
# Scientific Table Component

A comprehensive data table component designed for scientific applications with advanced features including:

## Key Features
- **Advanced Sorting**: Multi-type sorting (text, number, date, boolean)
- **Search & Filtering**: Global search with column-specific filters
- **Pagination**: Configurable page sizes and navigation
- **Selection**: Single and multi-row selection capabilities
- **Data Types**: Support for various data types with custom formatters
- **Responsive Design**: Mobile-optimized layout
- **CSV Loading**: Direct CSV file loading capability
- **Customizable Styling**: Extensive CSS custom properties
- **Accessibility**: ARIA labels and keyboard navigation

## Data Format
The table accepts data in the \`TableData\` format with optional \`TableColumn\` definitions for enhanced functionality.

## Styling
Customize appearance using CSS custom properties prefixed with \`--table-\`.
        `,
      },
    },
  },
  argTypes: {
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
    variant: {
      control: {type: 'select'},
      options: ['default', 'compact'],
      description: 'Table size variant',
      table: {
        type: {summary: "'default' | 'compact'"},
        defaultValue: {summary: "'default'"},
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

export const Compact: Story = {
  args: {
    title: 'Compact Scientific Data',
    columns: sampleColumns,
    data: sampleData.slice(0, 6),
    variant: 'compact',
    pageSize: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact table variant with reduced padding and spacing for dense data display.',
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
