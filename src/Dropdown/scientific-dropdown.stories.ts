import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-dropdown.js';

const meta: Meta = {
  title: 'Scientific/Dropdown',
  component: 'scientific-dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Scientific Dropdown

A **customizable**, **accessible** dropdown component for scientific web apps.

---

## Props

- \`label\` — Dropdown label text  
- \`options\` — Array of \`{ label: string, value: string }\` for dropdown options  
- \`selectedValue\` — Currently selected value  
- \`isOpen\` — Whether the dropdown is open

## Events

- \`option-selected\` — Fired when an option is selected, with the value as detail

## Styling

Use CSS variables to customize appearance, e.g.:

\`\`\`css
div.dropdown-container {
  --dropdown-width: 60%;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {control: 'text', description: 'Dropdown label'},
    options: {control: 'object', description: 'Dropdown options'},
    selectedValue: {control: 'text', description: 'Selected value'},
    isOpen: {control: 'boolean', description: 'Dropdown open state'},
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Select an option',
    options: [
      {label: 'Option 1', value: '1'},
      {label: 'Option 2', value: '2'},
      {label: 'Option 3', value: '3'},
    ],
    selectedValue: '',
    isOpen: false,
  },
  render: ({label, options, selectedValue, isOpen}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .selectedValue=${selectedValue}
      .isOpen=${isOpen}
    ></scientific-dropdown>`,
};

export const WithPreselected: Story = {
  args: {
    label: 'Choose a fruit',
    options: [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Cherry', value: 'cherry'},
    ],
    selectedValue: 'banana',
    isOpen: false,
  },
  render: ({label, options, selectedValue, isOpen}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .selectedValue=${selectedValue}
      .isOpen=${isOpen}
    ></scientific-dropdown>`,
};

export const OpenByDefault: Story = {
  args: {
    label: 'Open on load',
    options: [
      {label: 'Red', value: 'red'},
      {label: 'Green', value: 'green'},
      {label: 'Blue', value: 'blue'},
    ],
    selectedValue: '',
    isOpen: true,
  },
  render: ({label, options, selectedValue, isOpen}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .selectedValue=${selectedValue}
      .isOpen=${isOpen}
    ></scientific-dropdown>`,
};

export const CustomStyles: Story = {
  args: {
    label: 'Styled Dropdown',
    options: [
      {label: 'A', value: 'a'},
      {label: 'B', value: 'b'},
    ],
    selectedValue: '',
    isOpen: false,
  },
  render: ({label, options, selectedValue, isOpen}) =>
    html`<scientific-dropdown
      .label=${label}
      .options=${options}
      .selectedValue=${selectedValue}
      .isOpen=${isOpen}
      style="--dropdown-width: 300px; --dropdown-label-font-size: 20px;"
    ></scientific-dropdown>`,
};

// export const InteractionTest: Story = {
//   args: {
//     label: 'Test Dropdown',
//     options: [
//       { label: 'Alpha', value: 'alpha' },
//       { label: 'Beta', value: 'beta' },
//     ],
//     selectedValue: '',
//     isOpen: false,
//   },
//   play: async ({ canvasElement }) => {
//     const dropdown = canvasElement.querySelector('scientific-dropdown');
//     if (!dropdown) throw new Error('Dropdown not found');
//     // Open dropdown
//     dropdown.isOpen = true;
//     await (dropdown as any).updateComplete;
//     // Select the first option
//     const option = dropdown.shadowRoot?.querySelector('.option');
//     if (!option) throw new Error('Option not found');
//     (option as HTMLElement).click();
//     await (dropdown as any).updateComplete;
//     // Check if selectedValue updated
//     expect(dropdown.selectedValue).toBe('Alpha');
//   },
// };
