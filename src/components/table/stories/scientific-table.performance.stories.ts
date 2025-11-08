import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import '../scientific-table.js';
import type {TableColumn} from '../scientific-table.js';

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

export const SelectionPerformance: Story = {
  name: 'Selection Performance',
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
  name: 'Wide Table',
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