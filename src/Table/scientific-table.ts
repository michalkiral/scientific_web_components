/* eslint-disable no-constant-condition */
import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '../InputAutoComplete/scientific-input.js';
import {
  containerStyles,
  headerStyles,
  loadingSpinnerStyles,
  messageStyles,
  responsiveStyles,
  sharedVariables,
  themeStyles,
  type ScientificTheme,
} from '../shared/styles/common-styles.js';
import {dispatchMultipleEvents, debounce} from '../shared/utils/event-utils.js';
import {parseCSVStream} from '../shared/utils/csv-utils.js';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'boolean';
  formatter?: (value: unknown, row: TableData) => string;
}

export interface TableData {
  [key: string]: unknown;
  _id?: string;
}

export interface TableSort {
  column: string;
  direction: 'asc' | 'desc';
}

export interface TableFilter {
  column: string;
  value: string;
  operator?: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt';
}

export type TableTheme = ScientificTheme;

@customElement('scientific-table')
export class ScientificTable extends LitElement {
  static override styles = [
    sharedVariables,
    themeStyles,
    containerStyles,
    headerStyles,
    loadingSpinnerStyles,
    messageStyles,
    responsiveStyles,
    css`
      :host {
        display: block;
        font-family: var(
          --table-font-family,
          system-ui,
          -apple-system,
          sans-serif
        );
        width: var(--table-width, 100%);
        max-width: var(--table-max-width, 100%);
      }

      .table-container {
        position: relative;
        background-color: var(--table-bg-color, #ffffff);
        border: var(--table-border, 2px solid #e5e7eb);
        border-radius: var(--table-border-radius, 12px);
        box-shadow: var(--table-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: var(--table-gap, 0);
      }

      .table-header {
        padding: var(--table-header-padding, 20px 24px);
        border-bottom: var(--table-header-border, 1px solid #e5e7eb);
        background-color: var(--table-header-bg-color, #f9fafb);
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--table-header-gap, 16px);
        flex-wrap: wrap;
      }

      .table-title-section {
        display: flex;
        flex-direction: column;
        gap: var(--table-title-gap, 4px);
        flex: 1;
        min-width: 200px;
      }

      .table-title {
        font-size: var(--table-title-font-size, 18px);
        font-weight: var(--table-title-font-weight, 600);
        color: var(--table-title-color, #111827);
        margin: 0;
        line-height: var(--table-title-line-height, 1.3);
      }

      .table-description {
        font-size: var(--table-description-font-size, 14px);
        font-weight: var(--table-description-font-weight, 400);
        color: var(--table-description-color, #6b7280);
        margin: 0;
        line-height: var(--table-description-line-height, 1.4);
      }

      .table-controls {
        display: flex;
        align-items: center;
        gap: var(--table-controls-gap, 12px);
        flex-wrap: wrap;
      }

      .table-controls scientific-input {
        max-width: var(--table-search-max-width, 300px);
        min-width: var(--table-search-min-width, 200px);
      }

      .table-wrapper {
        overflow: auto;
        max-height: var(--table-max-height, 500px);
      }

      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--table-font-size, 14px);
        background-color: var(--table-content-bg-color, #ffffff);
      }

      .table-head {
        background-color: var(--table-head-bg-color, #f9fafb);
        position: sticky;
        top: 0;
        z-index: 2;
      }

      .table-header-cell {
        padding: var(--table-header-cell-padding, 12px 16px);
        border-bottom: var(--table-header-cell-border, 2px solid #e5e7eb);
        font-weight: var(--table-header-cell-font-weight, 600);
        color: var(--table-header-cell-color, #374151);
        text-align: left;
        position: relative;
        user-select: none;
        white-space: nowrap;
      }

      .table-header-cell.sortable {
        cursor: pointer;
        transition: var(--table-header-cell-transition, all 0.2s ease-in-out);
      }

      .table-header-cell.sortable:hover {
        background-color: var(--table-header-cell-hover-bg-color, #f3f4f6);
      }

      .table-header-cell.center {
        text-align: center;
      }

      .table-header-cell.right {
        text-align: right;
      }

      .sort-indicator {
        margin-left: 6px;
        font-size: 12px;
        color: var(--table-sort-indicator-color, #9ca3af);
      }

      .sort-indicator.active {
        color: var(--table-sort-indicator-active-color, #007bff);
      }

      .table-row {
        border-bottom: var(--table-row-border, 1px solid #f3f4f6);
        transition: var(--table-row-transition, all 0.15s ease-in-out);
      }

      .table-row:hover {
        background-color: var(--table-row-hover-bg-color, #f9fafb);
      }

      .table-row.selected {
        background-color: var(--table-row-selected-bg-color, #eff6ff);
        border-color: var(--table-row-selected-border-color, #3b82f6);
      }

      .table-cell {
        padding: var(--table-cell-padding, 12px 16px);
        color: var(--table-cell-color, #374151);
        vertical-align: top;
        line-height: 1.4;
      }

      .table-cell.center {
        text-align: center;
      }

      .table-cell.right {
        text-align: right;
      }

      .table-cell.number {
        font-feature-settings: 'tnum';
        font-variant-numeric: tabular-nums;
      }

      .table-checkbox {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }

      .table-footer {
        padding: var(--table-footer-padding, 16px 24px);
        border-top: var(--table-footer-border, 1px solid #e5e7eb);
        background-color: var(--table-footer-bg-color, #f9fafb);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--table-footer-gap, 16px);
        flex-wrap: wrap;
      }

      .table-info {
        font-size: var(--table-info-font-size, 14px);
        color: var(--table-info-color, #6b7280);
      }

      .table-pagination {
        display: flex;
        align-items: center;
        gap: var(--table-pagination-gap, 8px);
      }

      .pagination-button {
        padding: var(--table-pagination-button-padding, 6px 12px);
        border: var(--table-pagination-button-border, 1px solid #d1d5db);
        border-radius: var(--table-pagination-button-border-radius, 4px);
        background-color: var(--table-pagination-button-bg-color, #ffffff);
        color: var(--table-pagination-button-color, #374151);
        font-size: var(--table-pagination-button-font-size, 14px);
        cursor: pointer;
        transition: var(
          --table-pagination-button-transition,
          all 0.2s ease-in-out
        );
        user-select: none;
      }

      .pagination-button:hover:not(:disabled) {
        background-color: var(
          --table-pagination-button-hover-bg-color,
          #f3f4f6
        );
        border-color: var(
          --table-pagination-button-hover-border-color,
          #9ca3af
        );
      }

      .pagination-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .pagination-button.active {
        background-color: var(
          --table-pagination-button-active-bg-color,
          #007bff
        );
        color: var(--table-pagination-button-active-color, #ffffff);
        border-color: var(
          --table-pagination-button-active-border-color,
          #007bff
        );
      }

      .page-size-selector {
        padding: var(--table-page-size-padding, 6px 8px);
        border: var(--table-page-size-border, 1px solid #d1d5db);
        border-radius: var(--table-page-size-border-radius, 4px);
        background-color: var(--table-page-size-bg-color, #ffffff);
        color: var(--table-page-size-color, #374151);
        font-size: var(--table-page-size-font-size, 14px);
        font-family: inherit;
        cursor: pointer;
      }

      .empty-state {
        padding: var(--table-empty-padding, 48px 24px);
        text-align: center;
        color: var(--table-empty-color, #9ca3af);
      }

      .empty-icon {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
      }

      .empty-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--table-empty-title-color, #6b7280);
      }

      .empty-description {
        font-size: 14px;
        margin: 0;
        color: var(--table-empty-description-color, #9ca3af);
      }

      @media (max-width: 768px) {
        .table-header {
          padding: var(--table-mobile-header-padding, 16px);
          flex-direction: column;
          align-items: stretch;
          gap: var(--table-mobile-header-gap, 12px);
        }

        .table-controls {
          justify-content: stretch;
        }

        .table-controls scientific-input {
          min-width: unset;
          flex: 1;
        }

        .table-footer {
          padding: var(--table-mobile-footer-padding, 12px 16px);
          flex-direction: column;
          align-items: stretch;
          gap: var(--table-mobile-footer-gap, 12px);
        }

        .table-pagination {
          justify-content: center;
        }

        .table-header-cell,
        .table-cell {
          padding: var(--table-mobile-cell-padding, 8px 12px);
          font-size: var(--table-mobile-font-size, 13px);
        }
      }

      .table-container.compact .table-header {
        padding: var(--table-compact-header-padding, 12px 16px);
      }

      .table-container.compact .table-header-cell,
      .table-container.compact .table-cell {
        padding: var(--table-compact-cell-padding, 8px 12px);
      }

      .table-container.compact .table-footer {
        padding: var(--table-compact-footer-padding, 12px 16px);
      }
    `,
  ];

  @property({type: String})
  override title = '';

  @property({type: String})
  description = '';

  @property({type: String, reflect: true})
  theme: ScientificTheme = 'default';

  @property({type: Array})
  columns: TableColumn[] = [];

  @property({type: Array})
  data: TableData[] = [];

  @property({type: String})
  csvPath: string | null = null;

  @property({type: Boolean})
  loading = false;

  @property({type: Boolean})
  sortable = true;

  @property({type: Boolean})
  filterable = true;

  @property({type: Boolean})
  selectable = false;

  @property({type: Boolean})
  pagination = true;

  @property({type: Number})
  pageSize = 10;

  @property({type: Number})
  currentPage = 1;

  @property({type: Array})
  pageSizeOptions = [5, 10, 25, 50, 100];

  @property({type: String})
  variant: 'default' | 'compact' = 'default';

  @property({type: Boolean})
  showSearch = true;

  @property({type: String})
  searchPlaceholder = 'Search table...';

  @property({type: String})
  emptyStateTitle = 'No data available';

  @property({type: String})
  emptyStateDescription = 'There are no records to display';

  @property({type: String})
  emptyStateIcon = '📋';

  @property({attribute: false})
  onRowClick?: (row: TableData, index: number) => void;

  @property({attribute: false})
  onSelectionChange?: (selectedRows: TableData[]) => void;

  @property({attribute: false})
  onSort?: (sort: TableSort) => void;

  @property({attribute: false})
  onFilter?: (filters: TableFilter[]) => void;

  @state()
  private sortedColumn = '';

  @state()
  private sortDirection: 'asc' | 'desc' = 'asc';

  @state()
  private searchTerm = '';

  @state()
  private filters: TableFilter[] = [];

  @state()
  private selectedRows: Set<string> = new Set();

  @state()
  private processedData: TableData[] = [];

  @state()
  private isProcessing = false;

  @state()
  private paginatedData: TableData[] = [];

  @state()
  private totalPages = 1;

  private _debouncedSearch!: (term: string) => void;

  constructor() {
    super();
    this._debouncedSearch = debounce((...args: unknown[]) => {
      const term = args[0] as string;
      this.searchTerm = term;
      this.currentPage = 1;
    }, 300);
  }

  override connectedCallback() {
    super.connectedCallback();
    if (this.csvPath) {
      this._fetchCSV();
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (
      !this.isProcessing &&
      (changedProperties.has('data') ||
        changedProperties.has('searchTerm') ||
        changedProperties.has('sortedColumn') ||
        changedProperties.has('sortDirection') ||
        changedProperties.has('currentPage') ||
        changedProperties.has('pageSize'))
    ) {
      this._processData();
    }
  }

  async _fetchCSV() {
    this.loading = true;
    try {
      const response = await fetch(this.csvPath!);
      if (!response.ok) throw new Error('Failed to fetch CSV file.');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to read CSV file.');

      this._parseCSVStreaming(reader);
    } catch (error) {
      console.error('Error loading CSV:', error);
      this.loading = false;
    }
  }

  async _parseCSVStreaming(reader: ReadableStreamDefaultReader<Uint8Array>) {
    try {
      const result = await parseCSVStream(
        reader,
        undefined, // Don't use progress callback to avoid update conflicts
        {hasHeaders: true, skipEmptyLines: true}
      );

      // Update the component with complete data all at once
      this.columns = result.headers.map((col) => ({
        key: col,
        label: col,
        sortable: true,
        filterable: true,
        type: 'text' as const,
      }));

      this.data = result.data;
      this.loading = false;

      // No need to call requestUpdate() - Lit will handle this automatically
      // when reactive properties change
    } catch (error) {
      console.error('Error parsing CSV:', error);
      this.loading = false;
    }
  }

  private _processData() {
    let processed = [...this.data];

    processed = processed.map((row, index) => ({
      ...row,
      _id: row._id || `row-${index}`,
    }));

    if (this.searchTerm) {
      processed = processed.filter((row) =>
        this.columns.some((col) => {
          const value = row[col.key];
          return String(value || '')
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        })
      );
    }

    this.filters.forEach((filter) => {
      processed = processed.filter((row) => {
        const value = String(row[filter.column] || '').toLowerCase();
        const filterValue = filter.value.toLowerCase();

        switch (filter.operator) {
          case 'equals':
            return value === filterValue;
          case 'startsWith':
            return value.startsWith(filterValue);
          case 'endsWith':
            return value.endsWith(filterValue);
          case 'contains':
          default:
            return value.includes(filterValue);
        }
      });
    });

    if (this.sortedColumn && this.sortable) {
      processed.sort((a, b) => {
        const valueA = a[this.sortedColumn];
        const valueB = b[this.sortedColumn];

        const column = this.columns.find(
          (col) => col.key === this.sortedColumn
        );

        let comparison = 0;
        if (column?.type === 'number') {
          comparison = Number(valueA || 0) - Number(valueB || 0);
        } else if (column?.type === 'date') {
          comparison =
            new Date(String(valueA || '')).getTime() -
            new Date(String(valueB || '')).getTime();
        } else {
          const strA = String(valueA || '').toLowerCase();
          const strB = String(valueB || '').toLowerCase();
          comparison = strA.localeCompare(strB);
        }

        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    this.processedData = processed;

    if (this.pagination) {
      this.totalPages = Math.ceil(processed.length / this.pageSize);
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedData = processed.slice(startIndex, endIndex);
    } else {
      this.paginatedData = processed;
    }
  }

  private _sortData(columnKey: string) {
    const column = this.columns.find((col) => col.key === columnKey);
    if (!column || (column.sortable === false && this.sortable)) return;

    if (this.sortedColumn === columnKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = columnKey;
      this.sortDirection = 'asc';
    }

    dispatchMultipleEvents(this, [
      {
        name: 'sort',
        detail: {
          column: columnKey,
          direction: this.sortDirection,
        },
      },
    ]);

    this.onSort?.({
      column: columnKey,
      direction: this.sortDirection,
    });
  }

  private _handleSearch(event: Event) {
    const customEvent = event as CustomEvent;
    if (customEvent.detail && customEvent.detail.value !== undefined) {
      this._debouncedSearch(customEvent.detail.value);
    } else {
      const input = event.target as HTMLInputElement;
      this._debouncedSearch(input.value);
    }
  }

  private _handleRowClick(row: TableData, index: number) {
    if (this.selectable) {
      this._toggleRowSelection(row);
    }
    this.onRowClick?.(row, index);
  }

  private _toggleRowSelection(row: TableData) {
    const id = row._id as string;
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }

    this.selectedRows = new Set(this.selectedRows);

    const selectedData = this.processedData.filter((r) =>
      this.selectedRows.has(r._id as string)
    );
    this.onSelectionChange?.(selectedData);
  }

  private _changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  private _changePageSize(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.pageSize = Number(select.value);
    this.currentPage = 1;
  }

  private _formatCellValue(
    value: unknown,
    column: TableColumn,
    row: TableData
  ): string {
    if (column.formatter) {
      return column.formatter(value, row);
    }

    if (value === null || value === undefined) {
      return '';
    }

    switch (column.type) {
      case 'number':
        return Number(value).toLocaleString();
      case 'date':
        return new Date(String(value)).toLocaleDateString();
      case 'boolean':
        return value ? '✓' : '✗';
      default:
        return String(value);
    }
  }

  private _getCellClasses(column: TableColumn): string {
    const classes = ['table-cell'];

    if (column.align && column.align !== 'left') {
      classes.push(column.align);
    }

    if (column.type === 'number') {
      classes.push('number');
    }

    return classes.join(' ');
  }

  public setSearchTerm(term: string) {
    this.isProcessing = true;
    this.searchTerm = term;
    this.currentPage = 1;
    this._processData();
    this.isProcessing = false;
  }

  private _getHeaderClasses(column: TableColumn): string {
    const classes = ['table-header-cell'];

    if (column.sortable !== false && this.sortable) {
      classes.push('sortable');
    }

    if (column.align && column.align !== 'left') {
      classes.push(column.align);
    }

    return classes.join(' ');
  }

  private _renderPagination() {
    if (!this.pagination || this.totalPages <= 1) {
      return '';
    }

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return html`
      <div class="table-pagination">
        <button
          class="pagination-button"
          ?disabled=${this.currentPage === 1}
          @click=${() => this._changePage(this.currentPage - 1)}
        >
          ‹ Previous
        </button>

        ${startPage > 1
          ? html`
              <button
                class="pagination-button"
                @click=${() => this._changePage(1)}
              >
                1
              </button>
              ${startPage > 2 ? html`<span>...</span>` : ''}
            `
          : ''}
        ${pages.map(
          (page) => html`
            <button
              class="pagination-button ${page === this.currentPage
                ? 'active'
                : ''}"
              @click=${() => this._changePage(page)}
            >
              ${page}
            </button>
          `
        )}
        ${endPage < this.totalPages
          ? html`
              ${endPage < this.totalPages - 1 ? html`<span>...</span>` : ''}
              <button
                class="pagination-button"
                @click=${() => this._changePage(this.totalPages)}
              >
                ${this.totalPages}
              </button>
            `
          : ''}

        <button
          class="pagination-button"
          ?disabled=${this.currentPage === this.totalPages}
          @click=${() => this._changePage(this.currentPage + 1)}
        >
          Next ›
        </button>
      </div>
    `;
  }

  override render() {
    const displayData =
      this.paginatedData.length > 0 ? this.paginatedData : this.processedData;
    const hasData = displayData.length > 0;

    return html`
      <div class="table-container ${this.variant}">
        ${this.loading
          ? html`
              <div class="loading-overlay">
                <div class="loading-spinner"></div>
              </div>
            `
          : ''}
        ${this.title || this.description || this.showSearch
          ? html`
              <div class="table-header">
                <div class="table-title-section">
                  ${this.title
                    ? html`<h2 class="table-title">${this.title}</h2>`
                    : ''}
                  ${this.description
                    ? html`<p class="table-description">${this.description}</p>`
                    : ''}
                </div>

                ${this.showSearch
                  ? html`
                      <div class="table-controls">
                        <scientific-input
                          .placeholder=${this.searchPlaceholder}
                          .value=${this.searchTerm}
                          @input=${this._handleSearch}
                          .size=${'medium'}
                          .clearable=${true}
                          .autoComplete=${false}
                        ></scientific-input>
                      </div>
                    `
                  : ''}
              </div>
            `
          : ''}
        ${hasData
          ? html`
              <div class="table-wrapper">
                <table class="table">
                  <thead class="table-head">
                    <tr>
                      ${this.selectable
                        ? html`
                            <th class="table-header-cell">
                              <input type="checkbox" class="table-checkbox" />
                            </th>
                          `
                        : ''}
                      ${this.columns.map(
                        (column) => html`
                          <th
                            class="${this._getHeaderClasses(column)}"
                            style="${column.width
                              ? `width: ${column.width}`
                              : ''}"
                            @click=${() => this._sortData(column.key)}
                          >
                            ${column.label}
                            ${column.sortable !== false && this.sortable
                              ? html`
                                  <span
                                    class="sort-indicator ${this
                                      .sortedColumn === column.key
                                      ? 'active'
                                      : ''}"
                                  >
                                    ${this.sortedColumn === column.key
                                      ? this.sortDirection === 'asc'
                                        ? '▲'
                                        : '▼'
                                      : '⇅'}
                                  </span>
                                `
                              : ''}
                          </th>
                        `
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    ${displayData.map(
                      (row, index) => html`
                        <tr
                          class="table-row ${this.selectedRows.has(
                            row._id as string
                          )
                            ? 'selected'
                            : ''}"
                          @click=${() => this._handleRowClick(row, index)}
                        >
                          ${this.selectable
                            ? html`
                                <td class="table-cell">
                                  <input
                                    type="checkbox"
                                    class="table-checkbox"
                                    .checked=${this.selectedRows.has(
                                      row._id as string
                                    )}
                                    @click=${(e: Event) => e.stopPropagation()}
                                    @change=${() =>
                                      this._toggleRowSelection(row)}
                                  />
                                </td>
                              `
                            : ''}
                          ${this.columns.map(
                            (column) => html`
                              <td class="${this._getCellClasses(column)}">
                                ${this._formatCellValue(
                                  row[column.key],
                                  column,
                                  row
                                )}
                              </td>
                            `
                          )}
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              </div>

              ${this.pagination
                ? html`
                    <div class="table-footer">
                      <div class="table-info">
                        Showing ${(this.currentPage - 1) * this.pageSize + 1} to
                        ${Math.min(
                          this.currentPage * this.pageSize,
                          this.processedData.length
                        )}
                        of ${this.processedData.length} entries
                      </div>

                      <div
                        style="display: flex; align-items: center; gap: 16px;"
                      >
                        <div
                          style="display: flex; align-items: center; gap: 8px;"
                        >
                          <span>Show:</span>
                          <select
                            class="page-size-selector"
                            .value=${String(this.pageSize)}
                            @change=${this._changePageSize}
                          >
                            ${this.pageSizeOptions.map(
                              (size) => html`
                                <option value="${size}">${size}</option>
                              `
                            )}
                          </select>
                        </div>

                        ${this._renderPagination()}
                      </div>
                    </div>
                  `
                : ''}
            `
          : html`
              <div class="empty-state">
                <div class="empty-icon">${this.emptyStateIcon}</div>
                <h3 class="empty-title">${this.emptyStateTitle}</h3>
                <p class="empty-description">${this.emptyStateDescription}</p>
              </div>
            `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-table': ScientificTable;
  }
}
