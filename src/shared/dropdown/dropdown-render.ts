import {html, TemplateResult} from 'lit';
import {classNames} from '../utils/dom-utils.js';
import {DropdownOption, groupOptions} from './dropdown-utils.js';

export interface DropdownRenderConfig {
  isOpen: boolean;
  filteredOptions: DropdownOption[];
  focusedIndex: number;
  selectedValue?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchTerm?: string;
  noOptionsText?: string;
  allowCustomValues?: boolean;
  inputValue?: string;
  onOptionClick: (option: DropdownOption) => void;
  onSearchInput?: (e: Event) => void;
  onCustomValueClick?: () => void;
}

export function renderDropdownOptions(
  config: DropdownRenderConfig
): TemplateResult | string {
  const {
    isOpen,
    filteredOptions,
    focusedIndex,
    selectedValue,
    searchable = false,
    searchPlaceholder = 'Search options...',
    searchTerm = '',
    noOptionsText = 'No options available',
    allowCustomValues = false,
    inputValue = '',
    onOptionClick,
    onSearchInput,
    onCustomValueClick,
  } = config;

  if (!isOpen) {
    return '';
  }

  if (filteredOptions.length === 0) {
    return html`
      <div class="options-container" role="listbox">
        ${searchable && onSearchInput
          ? html`
              <input
                class="search-input"
                type="text"
                placeholder="${searchPlaceholder}"
                .value="${searchTerm}"
                @input="${onSearchInput}"
                @click="${(e: Event) => e.stopPropagation()}"
              />
            `
          : ''}
        <div class="options-list">
          ${allowCustomValues && inputValue.trim() && onCustomValueClick
            ? html`
                <div
                  class="${classNames({
                    option: true,
                    focused: focusedIndex === 0,
                    highlighted: focusedIndex === 0,
                  })}"
                  @click="${onCustomValueClick}"
                  role="option"
                >
                  Add "${inputValue}"
                </div>
              `
            : html`<div class="no-options">${noOptionsText}</div>`}
        </div>
      </div>
    `;
  }

  const groupedOptions = groupOptions(filteredOptions);

  return html`
    <div class="options-container" role="listbox">
      ${searchable && onSearchInput
        ? html`
            <input
              class="search-input"
              type="text"
              placeholder="${searchPlaceholder}"
              .value="${searchTerm}"
              @input="${onSearchInput}"
              @click="${(e: Event) => e.stopPropagation()}"
              @keydown="${(e: KeyboardEvent) => e.stopPropagation()}"
            />
          `
        : ''}
      <div class="options-list">
        ${Object.entries(groupedOptions).map(
          ([group, options]) => html`
            ${group !== 'default'
              ? html`<div class="option-group">${group}</div>`
              : ''}
            ${options.map((option) => {
              const globalIndex = filteredOptions.indexOf(option);
              return html`
                <div
                  class="${classNames({
                    option: true,
                    selected: option.value === selectedValue,
                    focused: globalIndex === focusedIndex,
                    highlighted: globalIndex === focusedIndex,
                    disabled: !!option.disabled,
                  })}"
                  @click="${() => onOptionClick(option)}"
                  role="option"
                  aria-selected="${option.value === selectedValue}"
                >
                  ${option.label}
                </div>
              `;
            })}
          `
        )}
      </div>
    </div>
  `;
}
