export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface DropdownKeyboardHandlerConfig {
  openOnNavigation?: boolean;
  allowCustomValues?: boolean;
  onCustomValue?: () => void;
  onAutocompleteHint?: () => void;
  autocompleteHint?: string;
  inputValue?: string;
}

export interface DropdownKeyboardHandler {
  isOpen: boolean;
  focusedIndex: number;
  filteredOptions: DropdownOption[];
  selectOption: (option: DropdownOption) => void;
  closeDropdown: () => void;
  openDropdown?: () => void;
}

export function handleDropdownKeyboard(
  this: DropdownKeyboardHandler,
  e: KeyboardEvent,
  config: DropdownKeyboardHandlerConfig = {}
) {
  const {
    openOnNavigation = true,
    allowCustomValues = false,
    onCustomValue,
    onAutocompleteHint,
    autocompleteHint,
    inputValue,
  } = config;

  if (
    !this.isOpen &&
    openOnNavigation &&
    ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)
  ) {
    this.isOpen = true;
    if (this.openDropdown) {
      this.openDropdown();
    }
  }

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      if (!this.isOpen && this.openDropdown) {
        this.openDropdown();
      } else if (this.focusedIndex < this.filteredOptions.length - 1) {
        this.focusedIndex++;
      }
      break;

    case 'ArrowUp':
      e.preventDefault();
      if (this.isOpen && this.focusedIndex > 0) {
        this.focusedIndex--;
      }
      break;

    case 'Enter':
      e.preventDefault();
      if (!this.isOpen && this.openDropdown) {
        this.openDropdown();
      } else if (
        this.focusedIndex >= 0 &&
        this.filteredOptions[this.focusedIndex] &&
        !this.filteredOptions[this.focusedIndex].disabled
      ) {
        this.selectOption(this.filteredOptions[this.focusedIndex]);
      } else if (allowCustomValues && onCustomValue && inputValue?.trim()) {
        onCustomValue();
      }
      break;

    case 'Escape':
      this.closeDropdown();
      break;

    case 'Tab':
      if (
        onAutocompleteHint &&
        autocompleteHint &&
        autocompleteHint !== inputValue
      ) {
        e.preventDefault();
        onAutocompleteHint();
      } else if (this.isOpen && this.filteredOptions.length > 0) {
        e.preventDefault();
        const optionToSelect =
          this.focusedIndex >= 0
            ? this.filteredOptions[this.focusedIndex]
            : this.filteredOptions[0];

        if (optionToSelect && !optionToSelect.disabled) {
          this.selectOption(optionToSelect);
        }
      } else {
        this.closeDropdown();
      }
      break;
  }
}

export function groupOptions(
  options: DropdownOption[]
): Record<string, DropdownOption[]> {
  const grouped: Record<string, DropdownOption[]> = {default: []};

  options.forEach((option) => {
    const group = option.group || 'default';
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(option);
  });

  return grouped;
}

export function filterOptions(
  options: DropdownOption[],
  searchTerm: string
): DropdownOption[] {
  if (!searchTerm.trim()) {
    return options;
  }

  return options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function generateAutocompleteHint(
  options: DropdownOption[],
  inputValue: string
): string {
  if (!inputValue.trim() || options.length === 0) {
    return '';
  }

  const firstMatch = options[0];
  const inputLower = inputValue.toLowerCase();
  const labelLower = firstMatch.label.toLowerCase();

  if (labelLower.startsWith(inputLower) && inputLower !== labelLower) {
    return firstMatch.label;
  }

  return '';
}

export function createClickOutsideHandler(
  element: HTMLElement,
  onClickOutside: () => void
): (e: Event) => void {
  return (e: Event) => {
    const path = e.composedPath();
    const clickedInside = path.includes(element);

    if (!clickedInside) {
      onClickOutside();
    }
  };
}
