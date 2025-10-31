import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-table.js';
import type {TableColumn, ScientificTable} from './scientific-table.js';

function generateLargeDataset(rows: number, columns: number) {
  const cols: TableColumn[] = Array.from({length: columns}, (_, i) => ({
    key: `col${i}`,
    label: `Column ${i + 1}`,
    sortable: true,
  }));

  const data = Array.from({length: rows}, (_, rowIndex) => {
    const row: Record<string, string | number> = {id: rowIndex};
    cols.forEach((col) => {
      row[col.key] = `Value ${rowIndex}-${col.key}`;
    });
    return row;
  });

  return {columns: cols, data};
}

function generateScientificDataset(rows: number) {
  const columns: TableColumn[] = [
    {key: 'id', label: 'Sample ID', sortable: true},
    {key: 'compound', label: 'Compound', sortable: true},
    {key: 'formula', label: 'Formula', sortable: true},
    {key: 'molWeight', label: 'Mol. Weight', sortable: true},
    {key: 'concentration', label: 'Conc. (μM)', sortable: true},
    {key: 'activity', label: 'Activity (%)', sortable: true},
    {key: 'ic50', label: 'IC50 (nM)', sortable: true},
    {key: 'date', label: 'Test Date', sortable: true},
  ];

  const compoundNames = ['Aspirin', 'Ibuprofen', 'Paracetamol', 'Caffeine', 'Glucose', 'Sucrose'];
  const formulas = ['C9H8O4', 'C13H18O2', 'C8H9NO2', 'C8H10N4O2', 'C6H12O6', 'C12H22O11'];

  const data = Array.from({length: rows}, (_, i) => {
    const compoundIndex = i % compoundNames.length;
    return {
      id: `S${i + 1000}`,
      compound: `${compoundNames[compoundIndex]}-${i}`,
      formula: formulas[compoundIndex],
      molWeight: (Math.random() * 500 + 50).toFixed(2),
      concentration: (Math.random() * 1000).toFixed(2),
      activity: (Math.random() * 100).toFixed(1),
      ic50: (Math.random() * 10000).toFixed(2),
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        .toISOString()
        .split('T')[0],
    };
  });

  return {columns, data};
}

const meta: Meta = {
  title: 'Scientific/Table/Performance Tests',
  component: 'scientific-table',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Table Performance Tests

Visual tests demonstrating the Table component's ability to handle large datasets efficiently.
These stories can be used for visual regression testing and performance validation.

**Performance Benchmarks:**
- 10,000 rows: < 5 seconds render time
- Pagination: < 500ms page changes
- Sorting: < 2 seconds with 10,000 rows
- Search/filtering: < 1 second response
- Wide tables (30+ columns): < 5 seconds render

All tests validate the component's ability to handle real-world scientific data tables.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const TenThousandRows: Story = {
  name: '10,000 Rows Table',
  render: () => {
    const {columns, data} = generateLargeDataset(10000, 8);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 10,000 rows with pagination.
          Expected render time: &lt;5 seconds.
        </p>
        <scientific-table
          title="10,000 Rows Performance Test"
          subtitle="Large dataset with pagination"
          .columns=${columns}
          .data=${data}
          pagination
          pageSize="100"
          showSearch
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests table rendering with 10,000 rows. Pagination should make initial render fast.',
      },
    },
  },
};

export const ScientificData: Story = {
  name: 'Scientific Dataset (10,000 rows)',
  render: () => {
    const {columns, data} = generateScientificDataset(10000);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Scientific compound data with 10,000 rows.
          Expected render time: &lt;5 seconds.
        </p>
        <scientific-table
          title="Compound Screening Results"
          subtitle="10,000 compound test results"
          .columns=${columns}
          .data=${data}
          pagination
          pageSize="50"
          sortable
          showSearch
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests with realistic scientific data including chemical formulas, concentrations, and activity values.',
      },
    },
  },
};

export const PaginationPerformance: Story = {
  name: 'Pagination Performance (10,000 rows)',
  render: () => {
    const {columns, data} = generateLargeDataset(10000, 8);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Pagination with 10,000 rows.
          Navigate through pages - expected: &lt;500ms per page change.
        </p>
        <scientific-table
          title="Pagination Test"
          subtitle="Navigate through pages to test performance"
          .columns=${columns}
          .data=${data}
          pagination
          pageSize="50"
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests pagination performance. Page changes should be near-instantaneous even with 10,000 rows.',
      },
    },
  },
};

export const SortingPerformance: Story = {
  name: 'Sorting Performance (10,000 rows)',
  render: () => {
    const {columns, data} = generateLargeDataset(10000, 8);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Sorting 10,000 rows.
          Click column headers to sort - expected: &lt;2 seconds.
        </p>
        <scientific-table
          title="Sorting Performance Test"
          subtitle="Click column headers to test sorting with 10,000 rows"
          .columns=${columns}
          .data=${data}
          sortable
          pagination
          pageSize="100"
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests sorting performance with large datasets. Click any column header to trigger sorting.',
      },
    },
  },
};

export const SearchPerformance: Story = {
  name: 'Search Performance (10,000 rows)',
  render: () => {
    const {columns, data} = generateLargeDataset(10000, 8);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Search/filter 10,000 rows.
          Try searching for "value 100" - expected: &lt;1 second.
        </p>
        <scientific-table
          title="Search Performance Test"
          subtitle="Search through 10,000 rows"
          .columns=${columns}
          .data=${data}
          showSearch
          pagination
          pageSize="50"
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests search/filtering performance. Search should be responsive with debouncing.',
      },
    },
  },
};

export const SelectionPerformance: Story = {
  name: 'Selection Performance (10,000 rows)',
  render: () => {
    const {columns, data} = generateLargeDataset(10000, 8);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Row selection with 10,000 rows.
          Expected: &lt;500ms selection updates.
        </p>
        <scientific-table
          title="Selection Performance Test"
          subtitle="Test row selection with large dataset"
          .columns=${columns}
          .data=${data}
          selectable
          pagination
          pageSize="100"
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests row selection performance. Selection should be instantaneous.',
      },
    },
  },
};

export const WideTable: Story = {
  name: 'Wide Table (5,000 rows × 30 columns)',
  render: () => {
    const {columns, data} = generateLargeDataset(5000, 30);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Wide table with 30 columns and 5,000 rows.
          Expected render time: &lt;5 seconds.
        </p>
        <div style="overflow-x: auto;">
          <scientific-table
            title="Wide Table Performance Test"
            subtitle="30 columns × 5,000 rows"
            .columns=${columns}
            .data=${data}
            pagination
            pageSize="50"
            style="width: 100%; min-width: 2000px;"
          ></scientific-table>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests performance with many columns. Validates horizontal scrolling and column rendering.',
      },
    },
  },
};

export const DataUpdatePerformance: Story = {
  name: 'Dynamic Data Updates',
  render: () => {
    let currentData = generateLargeDataset(5000, 10);

    const updateData = () => {
      currentData = generateLargeDataset(5000, 10);
      const table = document.querySelector('scientific-table') as ScientificTable | null;
      if (table) {
        table.data = currentData.data;
      }
    };

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Dynamic data updates with 5,000 rows.
          Expected update time: &lt;2 seconds.
        </p>
        <button
          @click=${updateData}
          style="margin-bottom: 16px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Update Data (5,000 rows)
        </button>
        <scientific-table
          title="Data Update Performance Test"
          subtitle="Test dynamic data updates"
          .columns=${currentData.columns}
          .data=${currentData.data}
          pagination
          pageSize="100"
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests data update performance. Click the button to replace all 5,000 rows.',
      },
    },
  },
};

export const PageSizeChanges: Story = {
  name: 'Page Size Performance',
  render: () => {
    const {columns, data} = generateLargeDataset(10000, 8);
    const pageSizes = [25, 50, 100, 200, 500];

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Changing page size with 10,000 rows.
          Expected: &lt;1 second per size change.
        </p>
        <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
          ${pageSizes.map(
            (size) => html`
              <button
                @click=${() => {
                  const table = document.querySelector('scientific-table') as ScientificTable | null;
                  if (table) {
                    table.pageSize = size;
                  }
                }}
                style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                ${size} per page
              </button>
            `
          )}
        </div>
        <scientific-table
          title="Page Size Test"
          subtitle="Change page size to test rendering performance"
          .columns=${columns}
          .data=${data}
          pagination
          pageSize="50"
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests performance when changing page size. Larger page sizes may take longer to render.',
      },
    },
  },
};

export const RowClickHandlers: Story = {
  name: 'Row Click Performance (10,000 rows)',
  render: () => {
    const {columns, data} = generateLargeDataset(10000, 8);
    let clickCount = 0;

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Row click handlers with 10,000 rows.
          Expected: &lt;100ms per click.
        </p>
        <p style="margin-bottom: 16px; padding: 8px; background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 4px;">
          Rows clicked: <strong>${clickCount}</strong>
        </p>
        <scientific-table
          title="Row Click Performance Test"
          subtitle="Click any row to test event handler performance"
          .columns=${columns}
          .data=${data}
          pagination
          pageSize="50"
          .onRowClick=${(row: Record<string, unknown>) => {
            clickCount++;
            console.log('Row clicked:', row);
          }}
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests row click event handler performance. Clicks should be instant even with large datasets.',
      },
    },
  },
};

export const EmptyState: Story = {
  name: 'Empty State Performance',
  render: () => {
    const {columns} = generateLargeDataset(0, 20);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Empty state with 20 column definitions.
          Expected render time: &lt;500ms.
        </p>
        <scientific-table
          title="Empty State Test"
          subtitle="Table with no data"
          .columns=${columns}
          .data=${[]}
          emptyStateTitle="No data available"
          emptyStateDescription="This table has 20 columns but no rows"
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests empty state rendering performance. Should be instantaneous regardless of column count.',
      },
    },
  },
};

export const MultipleTablesMemory: Story = {
  name: 'Multiple Tables (Memory Test)',
  render: () => {
    const tables = Array.from({length: 3}, () => generateLargeDataset(5000, 10));

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Memory Test:</strong> Three tables with 5,000 rows each.
          Validates no memory leaks with multiple instances.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px;">
          ${tables.map(
            (table, i) => html`
              <scientific-table
                title="Table ${i + 1}"
                subtitle="Memory test - 5,000 rows"
                .columns=${table.columns}
                .data=${table.data}
                pagination
                pageSize="50"
                style="width: 100%;"
              ></scientific-table>
            `
          )}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests memory stability with multiple table instances. Monitor browser memory usage.',
      },
    },
  },
};

export const CSVImportSimulation: Story = {
  name: 'CSV Import Simulation (10,000 rows)',
  render: () => {
    const {columns, data} = generateScientificDataset(10000);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Simulating CSV import with 10,000 rows.
          Expected render time: &lt;10 seconds.
        </p>
        <scientific-table
          title="CSV Import - 10,000 Rows"
          subtitle="Simulated large dataset import"
          .columns=${columns}
          .data=${data}
          pagination
          pageSize="100"
          sortable
          showSearch
          style="width: 100%; max-width: 1200px;"
        ></scientific-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests performance after loading a large CSV file. All features (sort, search, pagination) should work smoothly.',
      },
    },
  },
};
