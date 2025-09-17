import {
  ScientificTable,
  type TableColumn,
  type TableData,
} from '../scientific-table';
import {fixture, assert, aTimeout} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('scientific-table', () => {
  let testColumns: TableColumn[];
  let testData: TableData[];

  setup(() => {
    testColumns = [
      {key: 'name', label: 'Name', type: 'text', sortable: true},
      {key: 'age', label: 'Age', type: 'number', sortable: true},
    ];
    testData = [
      {_id: '1', name: 'John', age: 30},
      {_id: '2', name: 'Alice', age: 25},
    ];
  });

  test('is defined', () => {
    const el = document.createElement('scientific-table');
    assert.instanceOf(el, ScientificTable);
  });

  test('renders with provided columns and data', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${testData}
      ></scientific-table>
    `);

    const tableElement = el.shadowRoot!.querySelector('.table');
    assert.exists(tableElement, 'Table should be rendered');

    const headers = el.shadowRoot!.querySelectorAll('th.table-header-cell');
    assert.equal(headers.length, 2, 'Should have 2 column headers');
    assert.include(headers[0].textContent, 'Name');
    assert.include(headers[1].textContent, 'Age');

    const rows = el.shadowRoot!.querySelectorAll('tbody tr.table-row');
    assert.equal(rows.length, 2, 'Should have 2 data rows');
  });

  test('displays empty state when no data', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table .columns=${testColumns} .data=${[]}></scientific-table>
    `);

    const emptyState = el.shadowRoot!.querySelector('.empty-state');
    assert.exists(emptyState, 'Empty state should be displayed');

    const emptyTitle = el.shadowRoot!.querySelector('.empty-title');
    assert.exists(emptyTitle, 'Empty title should be displayed');
  });

  test('sorts data when clicking on column header', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${testData}
      ></scientific-table>
    `);

    const getCellText = (rowIndex: number, cellIndex: number) => {
      const rows = el.shadowRoot!.querySelectorAll('tbody tr.table-row');
      const cells = rows[rowIndex].querySelectorAll('td.table-cell');
      return cells[cellIndex].textContent!.trim();
    };

    // Initial order
    assert.equal(getCellText(0, 0), 'John', 'First row should be John');
    assert.equal(getCellText(1, 0), 'Alice', 'Second row should be Alice');

    // Click name header to sort by name
    const nameHeader = el.shadowRoot!.querySelector(
      'th.table-header-cell'
    )! as HTMLElement;
    nameHeader.click();
    await aTimeout(50);

    // Should be sorted alphabetically (Alice, John)
    assert.equal(
      getCellText(0, 0),
      'Alice',
      'First row should be Alice after name sort'
    );
    assert.equal(
      getCellText(1, 0),
      'John',
      'Second row should be John after name sort'
    );
  });

  test('displays sorting indicators correctly', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${testData}
      ></scientific-table>
    `);

    const nameHeader = el.shadowRoot!.querySelector(
      'th.table-header-cell'
    )! as HTMLElement;
    const sortIndicator = nameHeader.querySelector('.sort-indicator');

    assert.exists(sortIndicator, 'Sort indicator should exist');
    assert.include(
      sortIndicator!.textContent,
      '⇅',
      'Should show default sort indicator'
    );

    nameHeader.click();
    await aTimeout(50);

    assert.include(
      sortIndicator!.textContent,
      '▲',
      'Should show ascending arrow after click'
    );
    assert.isTrue(
      sortIndicator!.classList.contains('active'),
      'Sort indicator should be active'
    );

    nameHeader.click();
    await aTimeout(50);

    assert.include(
      sortIndicator!.textContent,
      '▼',
      'Should show descending arrow after second click'
    );
  });

  test('shows loading state', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${[]}
        .loading=${true}
      ></scientific-table>
    `);

    const loadingOverlay = el.shadowRoot!.querySelector('.loading-overlay');
    assert.exists(loadingOverlay, 'Loading overlay should be displayed');

    const spinner = el.shadowRoot!.querySelector('.loading-spinner');
    assert.exists(spinner, 'Loading spinner should be displayed');
  });

  test('handles pagination', async () => {
    const largeData: TableData[] = Array.from({length: 15}, (_, i) => ({
      _id: `${i + 1}`,
      name: `Person ${i + 1}`,
      age: 20 + i,
    }));

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${largeData}
        .pagination=${true}
        .pageSize=${5}
      ></scientific-table>
    `);

    const rows = el.shadowRoot!.querySelectorAll('tbody tr.table-row');
    assert.equal(rows.length, 5, 'Should display only 5 rows per page');

    const pagination = el.shadowRoot!.querySelector('.table-pagination');
    assert.exists(pagination, 'Pagination controls should be displayed');

    const pageButtons = el.shadowRoot!.querySelectorAll(
      '.pagination-button:not([disabled])'
    );
    assert.isAtLeast(pageButtons.length, 2, 'Should have navigation buttons');
  });

  test('handles search functionality', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${testData}
        .showSearch=${true}
      ></scientific-table>
    `);

    const searchInput = el.shadowRoot!.querySelector('scientific-input') as any;
    assert.exists(searchInput, 'Search input should be displayed');

    // Check initial rows
    let rows = el.shadowRoot!.querySelectorAll('tbody tr.table-row');
    assert.equal(rows.length, 2, 'Should have 2 rows initially');

    // Use the public method to set search term
    el.setSearchTerm('Alice');
    await el.updateComplete;

    rows = el.shadowRoot!.querySelectorAll('tbody tr.table-row');
    assert.equal(rows.length, 1, 'Should filter to 1 row');

    const firstCell = rows[0].querySelector('td.table-cell');
    assert.include(
      firstCell!.textContent,
      'Alice',
      'Filtered row should contain Alice'
    );
  });

  test('handles selection functionality', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${testData}
        .selectable=${true}
      ></scientific-table>
    `);

    const checkboxes = el.shadowRoot!.querySelectorAll('.table-checkbox');
    assert.isAtLeast(checkboxes.length, 2, 'Should have selection checkboxes');

    const firstCheckbox = checkboxes[1] as HTMLInputElement; // Skip header checkbox
    firstCheckbox.click();
    await aTimeout(50);

    assert.isTrue(firstCheckbox.checked, 'Checkbox should be checked');

    const selectedRow = el.shadowRoot!.querySelector('tr.table-row.selected');
    assert.exists(selectedRow, 'Row should be marked as selected');
  });

  test('fetches and renders CSV data', async () => {
    const mockCSV = 'name,age\nJohn,30\nAlice,25';
    window.fetch = () =>
      Promise.resolve({
        ok: true,
        body: {
          getReader: () => {
            const stream = new ReadableStream({
              start(controller) {
                controller.enqueue(new TextEncoder().encode(mockCSV));
                controller.close();
              },
            });
            return stream.getReader();
          },
        },
      }) as any;

    const el = await fixture<ScientificTable>(html`
      <scientific-table .csvPath=${'mock.csv'}></scientific-table>
    `);

    await aTimeout(100);

    const rows = el.shadowRoot!.querySelectorAll('tbody tr.table-row');
    assert.equal(rows.length, 2, 'Should have 2 rows from CSV data');

    const headers = el.shadowRoot!.querySelectorAll('th.table-header-cell');
    assert.equal(headers.length, 2, 'Should have 2 headers from CSV');
  });

  test('handles compact variant', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${testData}
        .variant=${'compact'}
      ></scientific-table>
    `);

    const container = el.shadowRoot!.querySelector('.table-container');
    assert.isTrue(
      container!.classList.contains('compact'),
      'Should have compact class'
    );
  });

  test('displays table with title and description', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${testColumns}
        .data=${testData}
        .title=${'Test Table'}
        .description=${'A table for testing'}
      ></scientific-table>
    `);

    const title = el.shadowRoot!.querySelector('.table-title');
    assert.exists(title, 'Title should be displayed');
    assert.equal(title!.textContent, 'Test Table', 'Title should match');

    const description = el.shadowRoot!.querySelector('.table-description');
    assert.exists(description, 'Description should be displayed');
    assert.equal(
      description!.textContent,
      'A table for testing',
      'Description should match'
    );
  });

  test('handles custom formatters', async () => {
    const customColumns: TableColumn[] = [
      {
        key: 'name',
        label: 'Name',
        type: 'text',
      },
      {
        key: 'salary',
        label: 'Salary',
        type: 'number',
        formatter: (value: unknown) =>
          `$${Number(value).toLocaleString('en-US')}`,
      },
    ];

    const customData: TableData[] = [{_id: '1', name: 'John', salary: 50000}];

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        .columns=${customColumns}
        .data=${customData}
      ></scientific-table>
    `);

    const salaryCell = el.shadowRoot!.querySelectorAll('td.table-cell')[1];
    assert.include(
      salaryCell.textContent,
      '$50,000',
      'Should use custom formatter'
    );
  });

  test('handles empty CSV file gracefully', async () => {
    window.fetch = () =>
      Promise.resolve({
        ok: true,
        body: {
          getReader: () => {
            const stream = new ReadableStream({
              start(controller) {
                controller.close();
              },
            });
            return stream.getReader();
          },
        },
      }) as any;

    const el = await fixture<ScientificTable>(html`
      <scientific-table .csvPath=${'empty.csv'}></scientific-table>
    `);

    await aTimeout(100);
    assert.deepEqual(
      el.data,
      [],
      'Table data should be empty for an empty CSV file'
    );
  });
});
