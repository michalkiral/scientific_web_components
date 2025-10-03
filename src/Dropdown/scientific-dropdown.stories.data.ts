export const dropdownThemes = ['default', 'dark', 'scientific'] as const;

export const basicOptions = [
  {label: 'Option 1', value: '1'},
  {label: 'Option 2', value: '2'},
  {label: 'Option 3', value: '3'},
] as const;

export const fruitOptions = [
  {label: 'Apple', value: 'apple'},
  {label: 'Banana', value: 'banana'},
  {label: 'Cherry', value: 'cherry'},
  {label: 'Orange', value: 'orange'},
  {label: 'Grape', value: 'grape'},
] as const;

export const countryOptions = [
  {label: 'United States', value: 'us'},
  {label: 'United Kingdom', value: 'uk'},
  {label: 'Germany', value: 'de'},
  {label: 'France', value: 'fr'},
  {label: 'Spain', value: 'es'},
  {label: 'Italy', value: 'it'},
  {label: 'Netherlands', value: 'nl'},
  {label: 'Belgium', value: 'be'},
  {label: 'Austria', value: 'at'},
  {label: 'Switzerland', value: 'ch'},
] as const;

export const programmingLanguageOptions = [
  {label: 'JavaScript', value: 'js'},
  {label: 'TypeScript', value: 'ts'},
  {label: 'Python', value: 'py'},
  {label: 'Java', value: 'java'},
  {label: 'C++', value: 'cpp'},
  {label: 'C#', value: 'cs'},
  {label: 'Go', value: 'go'},
  {label: 'Rust', value: 'rust'},
] as const;

export const defaultDropdownArgs = {
  label: 'Select an option',
  theme: 'default' as const,
  options: basicOptions,
  selectedValue: '',
  isOpen: false,
  disabled: false,
  searchable: false,
  clearable: false,
  placeholder: 'Choose an option...',
  noOptionsText: 'No options available',
  searchPlaceholder: 'Search options...',
};

export const preselectedExample = {
  label: 'Choose a fruit',
  options: fruitOptions,
  selectedValue: 'banana',
  clearable: true,
};

export const searchableExample = {
  label: 'Search for a country',
  searchable: true,
  placeholder: 'Type to search...',
  searchPlaceholder: 'Search countries...',
  options: countryOptions,
};

export const searchableWithClearExample = {
  label: 'Programming Languages',
  searchable: true,
  clearable: true,
  selectedValue: 'js',
  options: programmingLanguageOptions,
};

export const disabledExample = {
  label: 'Disabled Dropdown',
  disabled: true,
  selectedValue: 'option1',
  options: [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
  ],
};

export const emptyStateExample = {
  label: 'No Options Available',
  searchable: true,
  noOptionsText: 'No items found. Try a different search.',
  options: [],
  isOpen: true,
};

export const customStyleThemes = {
  red: {
    '--dropdown-focus-border-color': '#dc2626',
    '--dropdown-option-selected-bg-color': '#fef2f2',
    '--dropdown-option-selected-color': '#dc2626',
    '--dropdown-open-border-color': '#dc2626',
  },
  blue: {
    '--dropdown-focus-border-color': '#2563eb',
    '--dropdown-option-selected-bg-color': '#eff6ff',
    '--dropdown-option-selected-color': '#2563eb',
    '--dropdown-open-border-color': '#2563eb',
  },
  green: {
    '--dropdown-focus-border-color': '#16a34a',
    '--dropdown-option-selected-bg-color': '#f0fdf4',
    '--dropdown-option-selected-color': '#16a34a',
    '--dropdown-open-border-color': '#16a34a',
  },
} as const;

export const dynamicThemeOptions = [
  {label: 'Red Theme', value: 'red'},
  {label: 'Blue Theme', value: 'blue'},
  {label: 'Green Theme', value: 'green'},
] as const;

export const widthComparisonExamples = [
  {
    title: 'Standard Width',
    label: 'Standard Dropdown',
    options: [
      {label: 'Short', value: 'short'},
      {label: 'Medium Length Option', value: 'medium'},
      {
        label: 'Very Long Option Name That Extends Beyond Normal Width',
        value: 'long',
      },
    ],
    searchable: true,
    clearable: true,
  },
  {
    title: 'Custom Width (300px)',
    label: 'Custom Width Dropdown',
    options: [
      {label: 'Option A', value: 'a'},
      {label: 'Option B with longer text', value: 'b'},
      {label: 'Option C that is quite long indeed', value: 'c'},
    ],
    searchable: true,
    clearable: true,
    style: '--dropdown-width: 300px;',
  },
] as const;

export const themeComparisonExamples = [
  {
    theme: 'default',
    title: 'Default Theme',
    label: 'Default Theme Dropdown',
    options: basicOptions,
    placeholder: 'Select an option...',
    clearable: true,
    style: '--dropdown-width: 300px;',
  },
  {
    theme: 'dark',
    title: 'Dark Theme',
    label: 'Dark Theme Dropdown',
    options: basicOptions,
    placeholder: 'Select an option...',
    clearable: true,
    style: '--dropdown-width: 300px;',
  },
  {
    theme: 'scientific',
    title: 'Scientific Theme',
    label: 'Scientific Theme Dropdown',
    options: basicOptions,
    placeholder: 'Select an option...',
    clearable: true,
    style: '--dropdown-width: 300px;',
  },
] as const;