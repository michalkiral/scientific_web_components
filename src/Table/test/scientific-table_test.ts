import { ScientificTable } from '../scientific-table';
import { fixture, assert, aTimeout } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('scientific-table', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-table');
    assert.instanceOf(el, ScientificTable);
  });

  test('renders with provided columns and data', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table .columns=${['Name', 'Age']} .data=${[{ Name: 'John', Age: '30' }, { Name: 'Alice', Age: '25' }]}></scientific-table>
    `);

    assert.shadowDom.equal(
      el,
      `<div class="scroll-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Alice</td>
              <td>25</td>
            </tr>
          </tbody>
        </table>
      </div>`
    );
  });

  test('sorts data when clicking on column header', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table .columns=${['Name', 'Age']} .data=${[{ Name: 'John', Age: '30' }, { Name: 'Alice', Age: '25' }]}></scientific-table>
    `);
  
    const rowsBeforeSort = Array.from(el.shadowRoot!.querySelectorAll('tbody tr')).map((row) =>
      row.textContent!.trim().replace(/\s+/g, ' ')
    );
    assert.deepEqual(rowsBeforeSort, ['John30', 'Alice25'], 'Data should match the initial order');
  
    const ageHeader = el.shadowRoot!.querySelector('th:nth-child(2)')! as HTMLElement;
    ageHeader.click();
    await aTimeout(0);
  
    const rowsAfterSort = Array.from(el.shadowRoot!.querySelectorAll('tbody tr')).map((row) =>
      row.textContent!.trim().replace(/\s+/g, ' ')
    );
    assert.deepEqual(rowsAfterSort, ['Alice25', 'John30'], 'Data should be sorted by Age in ascending order');
  
    ageHeader.click();
    await aTimeout(0);
  
    const rowsAfterToggleSort = Array.from(el.shadowRoot!.querySelectorAll('tbody tr')).map((row) =>
      row.textContent!.trim().replace(/\s+/g, ' ')
    );
    assert.deepEqual(rowsAfterToggleSort, ['John30', 'Alice25'], 'Data should be sorted by Age in descending order');
  });

  test('fetches and renders CSV data', async () => {
    const mockCSV = 'Name,Age\nJohn,30\nAlice,25';
    window.fetch = () => Promise.resolve({
      ok: true,
      body: {
        getReader: () => {
          const stream = new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode(mockCSV));
              controller.close();
            }
          });
          return stream.getReader();
        }
      }
    }) as any;
  
    const el = await fixture<ScientificTable>(html`
      <scientific-table .csvPath=${'mock.csv'}></scientific-table>
    `);
  
    await aTimeout(50);
  
    const rows = Array.from(el.shadowRoot!.querySelectorAll('tbody tr')).map((row) =>
      row.textContent!.trim().replace(/\s+/g, ' ')
    );
    assert.deepEqual(rows, ['John30', 'Alice25'], 'Table data should be rendered from the CSV file');
  });

  test('displays sorting arrows correctly', async () => {
    const el = await fixture<ScientificTable>(html`
      <scientific-table .columns=${['Name', 'Age']} .data=${[{ Name: 'John', Age: '30' }, { Name: 'Alice', Age: '25' }]}></scientific-table>
    `);

    const nameHeader = el.shadowRoot!.querySelector('th:nth-child(1)')! as HTMLElement;
    const ageHeader = el.shadowRoot!.querySelector('th:nth-child(2)')! as HTMLElement;

    assert.notInclude(nameHeader.innerHTML, '▲');
    assert.notInclude(nameHeader.innerHTML, '▼');
    assert.notInclude(ageHeader.innerHTML, '▲');
    assert.notInclude(ageHeader.innerHTML, '▼');

    nameHeader.click();
    await aTimeout(0);
    assert.include(nameHeader.innerHTML, '▲', 'Name column should show an ascending arrow after click');
    assert.notInclude(ageHeader.innerHTML, '▲');
    assert.notInclude(ageHeader.innerHTML, '▼');

    nameHeader.click();
    await aTimeout(0);
    assert.include(nameHeader.innerHTML, '▼', 'Name column should show a descending arrow after second click');
  });

  test('handles empty CSV file gracefully', async () => {
    window.fetch = () => Promise.resolve({
      ok: true,
      body: {
        getReader: () => {
          const stream = new ReadableStream({
            start(controller) {
              controller.close();
            }
          });
          return stream.getReader();
        }
      }
    }) as any;

    const el = await fixture<ScientificTable>(html`
      <scientific-table .csvPath=${'empty.csv'}></scientific-table>
    `);

    await aTimeout(50);
    assert.deepEqual(el.data, [], 'Table data should be empty for an empty CSV file');
  });
});
