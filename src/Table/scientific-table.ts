import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('scientific-table')
export class ScientificTable extends LitElement {
  static override styles = css`
    :host {
      display: block;
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
      max-height: 400px;
      overflow-y: auto;
    }
  `;

  @property({ type: Array })
  columns: string[] = [];

  @property({ type: Array })
  data: Record<string, never>[] = [];

  @state()
  private sortedColumn = '';

  @state()
  private sortDirection: 'asc' | 'desc' = 'asc';
  
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
