/* eslint-disable no-constant-condition */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('scientific-table')
export class ScientificTable extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: var(--custom-width, 50%);
      height: var(--custom-height, auto);
      max-width: 100%;
      overflow-x: auto;
      border: 1px solid #ddd;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
      cursor: pointer;
    }

    .scroll-container {
      max-height: var(--custom-height, 400px);
      overflow-y: auto;
    }
  `;

  @property({ type: Array })
  columns: string[] = [];

  @property({ type: Array })
  data: Record<string, string>[] = [];

  @property({ type: String })
  csvPath: string | null = null;

  @state()
  private sortedColumn = '';

  @state()
  private sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();
    if (this.csvPath) {
      this._fetchCSV();
    }
  }

  async _fetchCSV() {
    try {
      const response = await fetch(this.csvPath!);
      if (!response.ok) throw new Error('Failed to fetch CSV file.');
      
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to read CSV file.');

      this._parseCSVStreaming(reader);
    } catch (error) {
      console.error('Error loading CSV:', error);
    }
  }

  async _parseCSVStreaming(reader: ReadableStreamDefaultReader<Uint8Array>) {
    const decoder = new TextDecoder();
    let partialChunk = '';
    let isFirstLine = true;
    
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      const lines = (partialChunk + text).split('\n');

      partialChunk = lines.pop() || '';

      for (const line of lines) {
        const row = line.trim().split(',');

        if (isFirstLine) {
          this.columns = row;
          isFirstLine = false;
        } else {
          const rowData = this.columns.reduce((acc, col, index) => {
            acc[col] = row[index] || '';
            return acc;
          }, {} as Record<string, string>);

          this.data = [...this.data, rowData];
        }
      }

      await this.requestUpdate();
    }

    if (partialChunk.trim()) {
      const lastRow = partialChunk.split(',');
      const rowData = this.columns.reduce((acc, col, index) => {
        acc[col] = lastRow[index] || '';
        return acc;
      }, {} as Record<string, string>);

      this.data = [...this.data, rowData];
      await this.requestUpdate();
    }
  }
  
  private _sortData(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.data = [...this.data].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  override render() {
    return html`
      <div class="scroll-container">
        <table>
          <thead>
            <tr>
              ${this.columns.map(
                (col) => html`
                  <th @click="${() => this._sortData(col)}">
                    ${col} ${this.sortedColumn === col ? (this.sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                `
              )}
            </tr>
          </thead>
          <tbody>
            ${this.data.map(
              (row) => html`
                <tr>
                  ${this.columns.map((col) => html`<td>${row[col]}</td>`)}
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-table': ScientificTable;
  }
}
