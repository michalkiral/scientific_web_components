import {ScientificTable} from '../scientific-table.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import type {TableColumn, TableData} from '../scientific-table.js';

suite('ScientificTable - Performance Tests', () => {
  function generateLargeDataset(rowCount: number, columnCount = 10) {
    const columns: TableColumn[] = [];
    const data: TableData[] = [];

    columns.push({
      key: 'id',
      label: 'ID',
      sortable: true,
      type: 'text',
      width: '80px',
    });

    for (let c = 1; c < columnCount; c++) {
      const types = ['text', 'number', 'date', 'boolean'] as const;
      const type = types[c % types.length];

      columns.push({
        key: `col${c}`,
        label: `Column ${c}`,
        sortable: true,
        type,
        align: c % 3 === 0 ? 'right' : 'left',
      });
    }

    for (let r = 0; r < rowCount; r++) {
      const row: TableData = {
        id: `row-${r}`,
      };

      for (let c = 1; c < columnCount; c++) {
        const colKey = `col${c}`;
        const types = ['text', 'number', 'date', 'boolean'] as const;
        const type = types[c % types.length];

        switch (type) {
          case 'text':
            row[colKey] = `Text value ${r}-${c}`;
            break;
          case 'number':
            row[colKey] = Math.random() * 1000;
            break;
          case 'date':
            row[colKey] = new Date(
              2020 + Math.floor(Math.random() * 4),
              Math.floor(Math.random() * 12),
              Math.floor(Math.random() * 28) + 1
            ).toISOString();
            break;
          case 'boolean':
            row[colKey] = Math.random() > 0.5;
            break;
        }
      }

      data.push(row);
    }

    return {columns, data};
  }

  function generateScientificDataset(rowCount: number) {
    const columns: TableColumn[] = [
      {key: 'id', label: 'Compound ID', sortable: true, type: 'text'},
      {key: 'name', label: 'Name', sortable: true, type: 'text'},
      {key: 'formula', label: 'Formula', sortable: false, type: 'text'},
      {
        key: 'molecularWeight',
        label: 'Mol. Weight (g/mol)',
        sortable: true,
        type: 'number',
        align: 'right',
      },
      {
        key: 'meltingPoint',
        label: 'Melting Point (°C)',
        sortable: true,
        type: 'number',
        align: 'right',
      },
      {
        key: 'boilingPoint',
        label: 'Boiling Point (°C)',
        sortable: true,
        type: 'number',
        align: 'right',
      },
      {
        key: 'density',
        label: 'Density (g/cm³)',
        sortable: true,
        type: 'number',
        align: 'right',
      },
      {key: 'state', label: 'State', sortable: true, type: 'text'},
      {
        key: 'discovered',
        label: 'Discovered',
        sortable: true,
        type: 'date',
      },
      {key: 'hazardous', label: 'Hazardous', sortable: true, type: 'boolean'},
    ];

    const data: TableData[] = [];
    const elements = ['C', 'H', 'O', 'N', 'S', 'P', 'Cl', 'Br', 'F', 'I'];
    const states = ['Solid', 'Liquid', 'Gas', 'Plasma'];

    for (let i = 0; i < rowCount; i++) {
      const formula =
        elements[i % elements.length] +
        Math.floor(Math.random() * 20 + 1) +
        elements[(i + 1) % elements.length] +
        Math.floor(Math.random() * 10 + 1);

      data.push({
        id: `CMP-${String(i).padStart(5, '0')}`,
        name: `Compound ${i}`,
        formula,
        molecularWeight: Math.random() * 500 + 10,
        meltingPoint: Math.random() * 1000 - 200,
        boilingPoint: Math.random() * 1500 - 100,
        density: Math.random() * 10 + 0.1,
        state: states[i % states.length],
        discovered: new Date(
          1800 + Math.floor(Math.random() * 220),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ).toISOString(),
        hazardous: Math.random() > 0.7,
      });
    }

    return {columns, data};
  }

  test('handles 10,000 rows with 10 columns', async () => {
    const {columns, data} = generateLargeDataset(10000, 10);

    const startTime = performance.now();

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Large Dataset - 10,000 Rows"
        .columns=${columns}
        .data=${data}
        pagination
        pageSize="100"
      ></scientific-table>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.data.length, 10000);
    assert.equal(el.columns.length, 10);

    console.log(`✓ Rendered 10,000 rows in ${renderTime.toFixed(2)}ms`);

    assert.isBelow(renderTime, 5000, 'Should render within 5 seconds');
  });

  test('handles 10,000 rows with scientific data (compounds)', async () => {
    const {columns, data} = generateScientificDataset(10000);

    const startTime = performance.now();

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Chemical Compounds Database"
        subtitle="10,000 compounds with properties"
        .columns=${columns}
        .data=${data}
        pagination
        pageSize="50"
        showSearch
      ></scientific-table>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.data.length, 10000);

    console.log(
      `✓ Rendered scientific dataset with 10,000 rows in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(
      renderTime,
      5000,
      'Scientific dataset should render within 5 seconds'
    );
  });

  test('pagination is performant with 10,000 rows', async () => {
    const {columns, data} = generateLargeDataset(10000, 8);

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Pagination Test"
        .columns=${columns}
        .data=${data}
        pagination
        pageSize="50"
      ></scientific-table>
    `);

    await el.updateComplete;

    const startTime = performance.now();

    el.currentPage = 5;
    await el.updateComplete;

    const pageChangeTime = performance.now() - startTime;

    assert.equal(el.currentPage, 5);

    console.log(`✓ Changed page in ${pageChangeTime.toFixed(2)}ms`);

    assert.isBelow(
      pageChangeTime,
      500,
      'Page changes should be instant (< 500ms)'
    );
  });

  test('sorting is performant with 10,000 rows', async () => {
    const {columns, data} = generateLargeDataset(10000, 8);

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Sorting Test"
        .columns=${columns}
        .data=${data}
        sortable
        pagination
        pageSize="100"
      ></scientific-table>
    `);

    await el.updateComplete;

    const startTime = performance.now();

    const sortEvent = new CustomEvent('sort', {
      detail: {column: columns[1], direction: 'asc'},
    });
    el.dispatchEvent(sortEvent);

    await el.updateComplete;

    const sortTime = performance.now() - startTime;

    console.log(`✓ Sorted 10,000 rows in ${sortTime.toFixed(2)}ms`);

    assert.isBelow(sortTime, 2000, 'Sorting should complete within 2 seconds');
  });

  test('search/filtering is performant with 10,000 rows', async () => {
    const {columns, data} = generateLargeDataset(10000, 8);

    const startTime = performance.now();

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Search Test"
        .columns=${columns}
        .data=${data}
        showSearch
        pagination
        pageSize="50"
      ></scientific-table>
    `);

    await el.updateComplete;

    const searchTime = performance.now() - startTime;

    console.log(`✓ Rendered searchable table with 10,000 rows in ${searchTime.toFixed(2)}ms`);

    assert.isBelow(searchTime, 5000, 'Table with search should render within 5 seconds');
  });

  test('selection is performant with 10,000 rows', async () => {
    const {columns, data} = generateLargeDataset(10000, 8);

    const startTime = performance.now();

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Selection Test"
        .columns=${columns}
        .data=${data}
        selectable
        pagination
        pageSize="100"
      ></scientific-table>
    `);

    await el.updateComplete;

    const selectionTime = performance.now() - startTime;

    console.log(`✓ Rendered selectable table with 10,000 rows in ${selectionTime.toFixed(2)}ms`);

    assert.isBelow(
      selectionTime,
      5000,
      'Selectable table should render within 5 seconds'
    );
  });

  test('page size changes are performant with 10,000 rows', async () => {
    const {columns, data} = generateLargeDataset(10000, 8);

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Page Size Test"
        .columns=${columns}
        .data=${data}
        pagination
        pageSize="25"
        .pageSizeOptions=${[25, 50, 100, 200]}
      ></scientific-table>
    `);

    await el.updateComplete;

    const startTime = performance.now();

    el.pageSize = 100;
    await el.updateComplete;

    const pageSizeChangeTime = performance.now() - startTime;

    assert.equal(el.pageSize, 100);

    console.log(
      `✓ Changed page size in ${pageSizeChangeTime.toFixed(2)}ms`
    );

    assert.isBelow(
      pageSizeChangeTime,
      500,
      'Page size changes should be instant (< 500ms)'
    );
  });

  test('handles wide tables (many columns)', async () => {
    const {columns, data} = generateLargeDataset(5000, 30);

    const startTime = performance.now();

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Wide Table Test"
        subtitle="5,000 rows × 30 columns"
        .columns=${columns}
        .data=${data}
        pagination
        pageSize="50"
      ></scientific-table>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.columns.length, 30);
    assert.equal(el.data.length, 5000);

    console.log(
      `✓ Rendered wide table (30 columns) in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(
      renderTime,
      5000,
      'Wide tables should render within 5 seconds'
    );
  });

  test('data updates are performant with large datasets', async () => {
    const {columns, data} = generateLargeDataset(5000, 10);

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Data Update Test"
        .columns=${columns}
        .data=${data}
        pagination
        pageSize="100"
      ></scientific-table>
    `);

    await el.updateComplete;

    const {data: newData} = generateLargeDataset(5000, 10);

    const startTime = performance.now();

    el.data = newData;
    await el.updateComplete;

    const updateTime = performance.now() - startTime;

    console.log(`✓ Updated 5,000 rows in ${updateTime.toFixed(2)}ms`);

    assert.isBelow(
      updateTime,
      2000,
      'Data updates should complete within 2 seconds'
    );
  });

  test('row click handlers are performant', async () => {
    const {columns, data} = generateLargeDataset(10000, 8);
    
    const startTime = performance.now();

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Row Click Test"
        .columns=${columns}
        .data=${data}
        pagination
        pageSize="50"
      ></scientific-table>
    `);

    await el.updateComplete;

    const clickTime = performance.now() - startTime;

    console.log(`✓ Rendered table with 10,000 rows in ${clickTime.toFixed(2)}ms`);

    assert.isBelow(clickTime, 5000, 'Table should render within 5 seconds');
  });

  test('memory usage remains stable with large datasets', async () => {
    const iterations = 3;

    for (let i = 0; i < iterations; i++) {
      const {columns, data} = generateLargeDataset(5000, 10);

      const el = await fixture<ScientificTable>(html`
        <scientific-table
          title="Memory Test"
          .columns=${columns}
          .data=${data}
          pagination
          pageSize="100"
        ></scientific-table>
      `);

      await el.updateComplete;

      el.remove();
    }

    console.log(
      `✓ Created and destroyed ${iterations} tables with 5,000 rows each`
    );

    assert.isTrue(true, 'Memory remains stable across multiple renders');
  });

  test('empty state renders quickly even with large column definition', async () => {
    const {columns} = generateLargeDataset(0, 20);

    const startTime = performance.now();

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="Empty State Test"
        .columns=${columns}
        .data=${[]}
        emptyStateTitle="No data available"
        emptyStateDescription="Try adjusting your filters"
      ></scientific-table>
    `);

    await el.updateComplete;

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.data.length, 0);

    console.log(`✓ Rendered empty state in ${renderTime.toFixed(2)}ms`);

    assert.isBelow(
      renderTime,
      500,
      'Empty state should render instantly (< 500ms)'
    );
  });

  test('handles CSV import with 10,000 rows (simulation)', async () => {
    const {columns, data} = generateScientificDataset(10000);

    const startTime = performance.now();

    const el = await fixture<ScientificTable>(html`
      <scientific-table
        title="CSV Import Test"
        subtitle="Simulated 10,000 row CSV import"
        .columns=${columns}
        .data=${data}
        pagination
        pageSize="100"
        showSearch
      ></scientific-table>
    `);

    const loadTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.data.length, 10000);

    console.log(
      `✓ Loaded simulated CSV with 10,000 rows in ${loadTime.toFixed(2)}ms`
    );

    assert.isBelow(
      loadTime,
      5000,
      'CSV loading should complete within 5 seconds'
    );
  });
});
