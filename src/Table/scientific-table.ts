/* eslint-disable no-constant-condition */
import {html, css, TemplateResult, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '../InputAutoComplete/scientific-input.js';
import '../Button/scientific-button.js';
import '../Dropdown/scientific-dropdown.js';
import {baseComponentStyles} from '../shared/styles/base-component-styles.js';
import {ScientificSurfaceBase} from '../shared/components/scientific-surface-base.js';
import {renderIcon} from '../shared/utils/icon-utils.js';
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
import {tableThemeStyles} from '../shared/styles/component-theme-styles.js';
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
  formatter?: (value: unknown, row: TableData) => string | TemplateResult;
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
export class ScientificTable extends ScientificSurfaceBase {
  static override styles = [
    baseComponentStyles,
    sharedVariables,
    themeStyles,
    tableThemeStyles,
    containerStyles,
    headerStyles,
    loadingSpinnerStyles,
    messageStyles,
    responsiveStyles,
    css`
      :host {
        width: var(--table-width, 100%);
        max-width: var(--table-max-width, 100%);
      }

      .scientific-header {
        padding: var(--scientific-header-padding, 20px 24px);
        background-color: var(--table-header-bg-color);
      }

      .scientific-header--empty {
        padding: 0;
        min-height: 0;
      }

      :host([theme='scientific']) .scientific-header {
        margin-bottom: 0;
        border-bottom: none;
      }

      .header-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--header-main-gap, 16px);
      }

      .scientific-title {
        font-size: var(--scientific-title-font-size, 20px);
        font-weight: var(--scientific-title-font-weight, 600);
        color: var(--table-title-color);
        margin: 0 0 var(--scientific-title-margin-bottom, 4px) 0;
        line-height: var(--scientific-title-line-height, 1.3);
      }

      .scientific-subtitle {
        font-size: var(--scientific-subtitle-font-size, 14px);
        color: var(--table-description-color);
        margin: 0;
        line-height: var(--scientific-subtitle-line-height, 1.4);
      }

      .table-container {
        position: relative;
        background-color: var(--table-bg-color);
        border: var(--table-border);
        border-radius: var(--table-border-radius, 12px);
        box-shadow: var(--table-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
        display: flex;
        flex-direction: column;
        gap: 0;
        overflow: hidden;
      }

      .table-search {
        min-width: var(--table-search-min-width, 300px);
        width: 100%;
      }

      .table-search scientific-input {
        width: 100%;
      }

      .table-wrapper {
        overflow: auto;
        max-height: var(--table-max-height, 500px);
        margin: 0;
        padding: 0;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--table-font-size, 14px);
        background-color: var(--table-content-bg-color);
        margin: 0;
        padding: 0;
      }

      .table-head {
        background-color: var(--table-head-bg-color);
        position: sticky;
        top: 0;
        z-index: 2;
      }

      .table-header-cell {
        padding: var(--table-header-cell-padding, 12px 16px);
        font-weight: var(--table-header-cell-font-weight, 600);
        color: var(--table-header-cell-color);
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
        background-color: var(--table-header-cell-hover-bg-color);
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
        color: var(--table-sort-indicator-color);
      }

      .sort-indicator.active {
        color: var(--table-sort-indicator-active-color);
      }

      .table-row {
        border-bottom: var(--table-row-border);
        transition: var(--table-row-transition, all 0.15s ease-in-out);
      }

      .table-row:hover {
        background-color: var(--table-row-hover-bg-color);
      }

      .table-row.selected {
        background-color: var(--table-row-selected-bg-color);
      }

      .table-cell {
        padding: var(--table-cell-padding, 12px 16px);
        color: var(--table-cell-color);
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
        border-top: var(--table-footer-border);
        background-color: var(--table-footer-bg-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--table-footer-gap, 16px);
        flex-wrap: wrap;
      }

      .table-info {
        font-size: var(--table-info-font-size, 14px);
        color: var(--table-info-color);
      }

      .table-pagination {
        display: flex;
        align-items: center;
        gap: var(--table-pagination-gap, 8px);
        flex-wrap: wrap;
        justify-content: center;
      }

      .table-pagination scientific-button {
        --button-width: 40px;
      }

      .table-pagination scientific-button:first-child,
      .table-pagination scientific-button:last-child {
        --button-width: auto;
      }

      .empty-state {
        padding: var(--table-empty-padding, 48px 24px);
        text-align: center;
        color: var(--table-empty-color);
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
        color: var(--table-empty-title-color);
      }

      .empty-description {
        font-size: 14px;
        margin: 0;
        color: var(--table-empty-description-color);
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
          flex-wrap: wrap;
          gap: var(--table-mobile-pagination-gap, 6px);
        }

        .table-header-cell,
        .table-cell {
          padding: var(--table-mobile-cell-padding, 8px 12px);
          font-size: var(--table-mobile-font-size, 13px);
        }
      }
    `,
  ];

  @property({type: String})
  override title = '';

  @property({type: Array})
  columns: TableColumn[] = [];

  @property({type: Array})
  data: TableData[] = [];

  @property({type: String})
  csvPath: string | null = null;

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
    this.isLoading = true;
    try {
      const response = await fetch(this.csvPath!);
      if (!response.ok) {
        throw new Error('Failed to fetch CSV file.');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to read CSV file.');
      }

      this._parseCSVStreaming(reader);
    } catch (error) {
      console.error('Error loading CSV:', error);
      this.isLoading = false;
    }
  }

  async _parseCSVStreaming(reader: ReadableStreamDefaultReader<Uint8Array>) {
    try {
      const result = await parseCSVStream(reader, undefined, {
        hasHeaders: true,
        skipEmptyLines: true,
      });

      this.columns = result.headers.map((col) => ({
        key: col,
        label: col,
        sortable: true,
        filterable: true,
        type: 'text' as const,
      }));

      this.data = result.data;
      this.isLoading = false;
    } catch (error) {
      console.error('Error parsing CSV:', error);
      this.isLoading = false;
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
    if (!column || (column.sortable === false && this.sortable)) {
      return;
    }

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

  private _changePageSize(event: CustomEvent) {
    this.pageSize = Number(event.detail.value);
    this.currentPage = 1;
  }

  private _formatCellValue(
    value: unknown,
    column: TableColumn,
    row: TableData
  ): string | TemplateResult {
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
        return value ? 'true' : 'false';
      default:
        return String(value);
    }
  }

  private _renderCellContent(
    value: unknown,
    column: TableColumn,
    row: TableData
  ) {
    if (column.type === 'boolean' && !column.formatter) {
      return value 
        ? renderIcon('check-circle', {size: 14, color: 'var(--scientific-success-color)'}) 
        : renderIcon('x-circle', {size: 14, color: 'var(--scientific-danger-color)'});
    }
    
    return this._formatCellValue(value, column, row);
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
        <scientific-button
          .label=${'Previous'}
          .variant=${'outline'}
          .size=${'small'}
          .disabled=${this.currentPage === 1}
          .action=${() => this._changePage(this.currentPage - 1)}
          .theme=${this.theme}
        ></scientific-button>

        ${startPage > 1
          ? html`
              <scientific-button
                .label=${'1'}
                .variant=${'outline'}
                .size=${'small'}
                .action=${() => this._changePage(1)}
                .theme=${this.theme}
              ></scientific-button>
              ${startPage > 2 ? html`<span>...</span>` : ''}
            `
          : ''}
        ${pages.map(
          (page) => html`
            <scientific-button
              .label=${String(page)}
              .variant=${page === this.currentPage ? 'primary' : 'outline'}
              .size=${'small'}
              .action=${() => this._changePage(page)}
              .theme=${this.theme}
            ></scientific-button>
          `
        )}
        ${endPage < this.totalPages
          ? html`
              ${endPage < this.totalPages - 1 ? html`<span>...</span>` : ''}
              <scientific-button
                .label=${String(this.totalPages)}
                .variant=${'outline'}
                .size=${'small'}
                .action=${() => this._changePage(this.totalPages)}
                .theme=${this.theme}
              ></scientific-button>
            `
          : ''}

        <scientific-button
          .label=${'Next'}
          .variant=${'outline'}
          .size=${'small'}
          .disabled=${this.currentPage === this.totalPages}
          .action=${() => this._changePage(this.currentPage + 1)}
          .theme=${this.theme}
        ></scientific-button>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="table-container">
        ${this.renderLoading()}
        ${this.renderHeader()}
        ${this.renderContent()}
      </div>
    `;
  }

  protected override hasHeaderContent(): boolean {
    return this.showSearch;
  }

  protected override renderHeaderContent(): typeof nothing | TemplateResult {
    if (!this.showSearch) {
      return nothing;
    }

    return html`
      <div class="table-search">
        <scientific-input
          .placeholder=${this.searchPlaceholder}
          .value=${this.searchTerm}
          @input=${this._handleSearch}
          .clearable=${true}
          .autoComplete=${false}
        ></scientific-input>
      </div>
    `;
  }

  protected override renderContent() {
    const displayData =
      this.paginatedData.length > 0 ? this.paginatedData : this.processedData;
    const hasData = displayData.length > 0;

    return html`
      ${hasData
        ? html`
            <div class="table-wrapper">
              <table class="table">
                <thead class="table-head">
                  <tr>
                    ${this.selectable
                      ? html`
                          <th class="table-header-cell">
                            <input
                              type="checkbox"
                              class="table-checkbox"
                              .checked=${this.allSelected}
                              @change=${this._toggleSelectAll}
                            />
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
                                      ? renderIcon('chevron-up', {size: 12})
                                      : renderIcon('chevron-down', {size: 12})
                                    : renderIcon('sort', {size: 12})}
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
                              ${this._renderCellContent(
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
                        <scientific-dropdown
                          .options=${this.pageSizeOptions.map((size) => ({
                            label: String(size),
                            value: String(size),
                          }))}
                          .selectedValue=${String(this.pageSize)}
                          .theme=${this.theme}
                          @option-selected=${this._changePageSize}
                          style="min-width: 80px;"
                          label=""
                        ></scientific-dropdown>
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
    `;
  }

  get allSelected(): boolean {
    const displayData =
      this.paginatedData.length > 0 ? this.paginatedData : this.processedData;
    return displayData.length > 0 && displayData.every(row => this.selectedRows.has(row._id as string));
  }

  private _toggleSelectAll() {
    const displayData =
      this.paginatedData.length > 0 ? this.paginatedData : this.processedData;
    
    if (this.allSelected) {
      displayData.forEach(row => this.selectedRows.delete(row._id as string));
    } else {
      displayData.forEach(row => this.selectedRows.add(row._id as string));
    }
    
    this.requestUpdate();
    const selectedData = this.processedData.filter((r) =>
      this.selectedRows.has(r._id as string)
    );
    this.onSelectionChange?.(selectedData);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-table': ScientificTable;
  }
}
