export const inputThemes = ['default', 'dark', 'scientific'] as const;
export const inputStates = ['default', 'error', 'success'] as const;

export const countryOptions = [
  {label: 'United States', value: 'us'},
  {label: 'United Kingdom', value: 'uk'},
  {label: 'Canada', value: 'ca'},
  {label: 'Germany', value: 'de'},
  {label: 'France', value: 'fr'},
  {label: 'Japan', value: 'jp'},
  {label: 'Australia', value: 'au'},
];

export const fruitOptions = [
  {label: 'Apple', value: 'apple'},
  {label: 'Banana', value: 'banana'},
  {label: 'Cherry', value: 'cherry'},
] as const;

export const userOptions = [
  {label: 'John Doe', value: 'john'},
  {label: 'Jane Smith', value: 'jane'},
  {label: 'Bob Johnson', value: 'bob'},
] as const;

export const emailOptions = [
  {label: 'john@example.com', value: 'john@example.com'},
  {label: 'jane@example.com', value: 'jane@example.com'},
  {label: 'bob@example.com', value: 'bob@example.com'},
] as const;

export const locationOptions = [
  {label: 'New York, NY', value: 'nyc'},
  {label: 'Los Angeles, CA', value: 'la'},
  {label: 'Chicago, IL', value: 'chicago'},
] as const;

export const groupedProgrammingOptions = [
  {label: 'JavaScript', value: 'js', group: 'Web Development'},
  {label: 'TypeScript', value: 'ts', group: 'Web Development'},
  {label: 'HTML', value: 'html', group: 'Web Development'},
  {label: 'CSS', value: 'css', group: 'Web Development'},
  {label: 'Python', value: 'python', group: 'Backend'},
  {label: 'Java', value: 'java', group: 'Backend'},
  {label: 'C#', value: 'csharp', group: 'Backend'},
  {label: 'Go', value: 'go', group: 'Backend'},
  {label: 'Swift', value: 'swift', group: 'Mobile'},
  {label: 'Kotlin', value: 'kotlin', group: 'Mobile'},
  {label: 'React Native', value: 'rn', group: 'Mobile'},
] as const;

export const tagOptions = [
  {label: 'React', value: 'react'},
  {label: 'Vue', value: 'vue'},
  {label: 'Angular', value: 'angular'},
  {label: 'Svelte', value: 'svelte'},
];

export const defaultInputArgs = {
  label: 'Search Countries',
  placeholder: 'Type to search countries...',
  value: '',
  options: countryOptions,
  disabled: false,
  required: false,
  clearable: true,
  state: 'default' as const,
  helperText: 'Select a country from the list or type to search',
  errorMessage: '',
  successMessage: '',
  icon: '',
  allowCustomValues: false,
  maxLength: -1,
  noOptionsText: 'No countries found',
  autoComplete: true,
  autoFocus: false,
};

export const stateExamples = [
  {
    title: 'Default State',
    label: 'Default Input',
    placeholder: 'Type something...',
    state: 'default' as const,
    helperText: 'This is a helper text',
    options: fruitOptions,
  },
  {
    title: 'Error State',
    label: 'Error Input',
    placeholder: 'Type something...',
    state: 'error' as const,
    errorMessage: 'This field contains an error',
    value: 'invalid input',
    options: fruitOptions,
  },
  {
    title: 'Success State',
    label: 'Success Input',
    placeholder: 'Type something...',
    state: 'success' as const,
    successMessage: 'Input validated successfully',
    value: 'valid input',
    options: fruitOptions,
  },
] as const;

export const iconExamples = [
  {
    label: 'Search with Icon',
    placeholder: 'Search users...',
    icon: '👤',
    options: userOptions,
  },
  {
    label: 'Email Input',
    placeholder: 'Enter email...',
    icon: '📧',
    options: emailOptions,
  },
  {
    label: 'Location Search',
    placeholder: 'Search locations...',
    icon: '📍',
    options: locationOptions,
  },
] as const;

export const groupedOptionsExample = {
  label: 'Programming Languages',
  placeholder: 'Choose a programming language...',
  options: groupedProgrammingOptions,
  helperText: 'Options are grouped by category',
};

export const customValuesExample = {
  label: 'Tags',
  placeholder: 'Type to add a tag...',
  allowCustomValues: true,
  helperText: 'Select from existing tags or create new ones',
  options: tagOptions,
};

export const disabledRequiredExamples = [
  {
    title: 'Required Input',
    label: 'Required Field',
    placeholder: 'This field is required...',
    required: true,
    helperText: 'This field must be filled out',
    options: fruitOptions,
  },
  {
    title: 'Disabled Input',
    label: 'Disabled Field',
    placeholder: 'This field is disabled...',
    disabled: true,
    value: 'Disabled value',
    helperText: 'This field cannot be edited',
    options: fruitOptions,
  },
] as const;

export const lengthValidationExamples = [
  {
    title: 'Character Limit (20)',
    label: 'Short Input',
    placeholder: 'Max 20 characters...',
    maxLength: 20,
    helperText: 'Limited to 20 characters',
    options: [],
  },
  {
    title: 'Character Limit (50)',
    label: 'Medium Input',
    placeholder: 'Max 50 characters...',
    maxLength: 50,
    helperText: 'Limited to 50 characters',
    options: [],
  },
] as const;

export const autocompleteExamples = [
  {
    title: 'With Autocomplete',
    label: 'Countries',
    placeholder: 'Type to see suggestions...',
    autoComplete: true,
    options: countryOptions,
    helperText: 'Autocomplete suggestions enabled',
  },
  {
    title: 'Without Autocomplete',
    label: 'Free Text',
    placeholder: 'Type freely...',
    autoComplete: false,
    options: countryOptions,
    helperText: 'No autocomplete suggestions',
  },
] as const;

export const themeComparisonExamples = [
  {
    theme: 'default',
    title: 'Default Theme',
    label: 'Default Theme Input',
    placeholder: 'Type something...',
    options: fruitOptions,
    clearable: true,
  },
  {
    theme: 'dark',
    title: 'Dark Theme',
    label: 'Dark Theme Input',
    placeholder: 'Type something...',
    options: fruitOptions,
    clearable: true,
  },
  {
    theme: 'scientific',
    title: 'Scientific Theme',
    label: 'Scientific Theme Input',
    placeholder: 'Type something...',
    options: fruitOptions,
    clearable: true,
  },
] as const;

export const formIntegrationExample = {
  title: 'Form Integration',
  inputs: [
    {
      label: 'Country',
      name: 'country',
      placeholder: 'Select your country...',
      required: true,
      options: countryOptions,
    },
    {
      label: 'Skills',
      name: 'skills',
      placeholder: 'Add your skills...',
      allowCustomValues: true,
      options: tagOptions,
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your email...',
      icon: '📧',
      state: 'success' as const,
      successMessage: 'Email format is valid',
      options: [],
    },
  ],
};

export const realTimeValidationExample = {
  label: 'Email Validation',
  placeholder: 'Enter your email address...',
  icon: '📧',
  helperText: 'Enter a valid email address',
  options: emailOptions,
};