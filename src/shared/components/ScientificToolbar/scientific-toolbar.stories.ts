import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-toolbar.js';
import type {ScientificToolbar, ToolbarSection} from './scientific-toolbar.js';

const meta: Meta<ScientificToolbar> = {
  title: 'Components/ScientificToolbar',
  component: 'scientific-toolbar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible toolbar component with support for buttons and dropdowns organized in sections.',
      },
    },
  },
  argTypes: {
    theme: {
      control: {type: 'select'},
      options: ['default', 'dark', 'light'],
      description: 'Visual theme variant',
    },
    layout: {
      control: {type: 'select'},
      options: ['auto', 'grid-2', 'grid-3', 'grid-4', 'grid-5'],
      description: 'Layout arrangement of toolbar sections',
    },
    sections: {
      control: {type: 'object'},
      description: 'Array of toolbar sections containing buttons and dropdowns',
    },
  },
};

export default meta;
type Story = StoryObj<ScientificToolbar>;

const defaultSections: ToolbarSection[] = [
  {
    id: 'file-operations',
    title: 'File',
    buttons: [
      {
        id: 'new',
        label: 'New',
        variant: 'primary',
        title: 'Create new file',
        handler: () => console.log('New file'),
      },
      {
        id: 'save',
        label: 'Save',
        variant: 'outline',
        title: 'Save current file',
        handler: () => console.log('Save file'),
      },
    ],
  },
  {
    id: 'view-controls',
    title: 'View',
    dropdowns: [
      {
        id: 'zoom-level',
        label: '',
        options: [
          {value: '50', label: '50%'},
          {value: '75', label: '75%'},
          {value: '100', label: '100%'},
          {value: '125', label: '125%'},
          {value: '150', label: '150%'},
        ],
        selectedValue: '100',
        handler: (e) => console.log('Zoom changed:', e.detail.value),
      },
    ],
  },
];

export const Default: Story = {
  args: {
    theme: 'default',
    layout: 'auto',
    sections: defaultSections,
  },
};

export const WithManyButtons: Story = {
  args: {
    theme: 'default',
    layout: 'grid-3',
    sections: [
      {
        id: 'editing',
        title: 'Edit',
        buttons: [
          {
            id: 'cut',
            label: 'Cut',
            variant: 'outline',
            title: 'Cut selection',
            handler: () => console.log('Cut'),
          },
          {
            id: 'copy',
            label: 'Copy',
            variant: 'outline',
            title: 'Copy selection',
            handler: () => console.log('Copy'),
          },
          {
            id: 'paste',
            label: 'Paste',
            variant: 'outline',
            title: 'Paste from clipboard',
            handler: () => console.log('Paste'),
          },
          {
            id: 'undo',
            label: 'Undo',
            variant: 'outline',
            title: 'Undo last action',
            handler: () => console.log('Undo'),
          },
        ],
      },
      {
        id: 'formatting',
        title: 'Format',
        buttons: [
          {
            id: 'bold',
            label: 'Bold',
            variant: 'outline',
            title: 'Make text bold',
            handler: () => console.log('Bold'),
          },
          {
            id: 'italic',
            label: 'Italic',
            variant: 'outline',
            title: 'Make text italic',
            handler: () => console.log('Italic'),
          },
        ],
      },
      {
        id: 'actions',
        title: 'Actions',
        buttons: [
          {
            id: 'submit',
            label: 'Submit',
            variant: 'success',
            title: 'Submit form',
            handler: () => console.log('Submit'),
          },
          {
            id: 'delete',
            label: 'Delete',
            variant: 'danger',
            title: 'Delete item',
            handler: () => console.log('Delete'),
          },
        ],
      },
    ],
  },
};

export const WithDropdowns: Story = {
  args: {
    theme: 'default',
    layout: 'grid-2',
    sections: [
      {
        id: 'settings',
        title: 'Settings',
        dropdowns: [
          {
            id: 'language',
            label: 'Language',
            options: [
              {value: 'en', label: 'English'},
              {value: 'es', label: 'Spanish'},
              {value: 'fr', label: 'French'},
              {value: 'de', label: 'German'},
            ],
            selectedValue: 'en',
            handler: (e) => console.log('Language changed:', e.detail.value),
          },
          {
            id: 'theme-select',
            label: 'Theme',
            options: [
              {value: 'light', label: 'Light'},
              {value: 'dark', label: 'Dark'},
              {value: 'auto', label: 'Auto'},
            ],
            selectedValue: 'light',
            handler: (e) => console.log('Theme changed:', e.detail.value),
          },
        ],
      },
      {
        id: 'export',
        title: 'Export',
        dropdowns: [
          {
            id: 'format',
            label: '',
            options: [
              {value: 'pdf', label: 'PDF'},
              {value: 'png', label: 'PNG'},
              {value: 'svg', label: 'SVG'},
              {value: 'json', label: 'JSON'},
            ],
            placeholder: 'Select format',
            handler: (e) => console.log('Format selected:', e.detail.value),
          },
        ],
      },
    ],
  },
};

export const MixedContent: Story = {
  args: {
    theme: 'default',
    layout: 'auto',
    sections: [
      {
        id: 'quick-actions',
        title: 'Quick Actions',
        buttons: [
          {
            id: 'refresh',
            label: 'Refresh',
            variant: 'primary',
            title: 'Refresh data',
            handler: () => console.log('Refresh'),
          },
          {
            id: 'export-btn',
            label: 'Export',
            variant: 'outline',
            title: 'Export data',
            handler: () => console.log('Export'),
          },
        ],
      },
      {
        id: 'filters',
        title: 'Filters',
        dropdowns: [
          {
            id: 'status-filter',
            label: 'Status',
            options: [
              {value: 'all', label: 'All'},
              {value: 'active', label: 'Active'},
              {value: 'inactive', label: 'Inactive'},
              {value: 'pending', label: 'Pending'},
            ],
            selectedValue: 'all',
            handler: (e) => console.log('Status filter:', e.detail.value),
          },
        ],
        buttons: [
          {
            id: 'clear-filters',
            label: 'Clear',
            variant: 'outline',
            title: 'Clear all filters',
            handler: () => console.log('Clear filters'),
          },
        ],
      },
    ],
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    layout: 'auto',
    sections: defaultSections,
  },
};

export const DisabledElements: Story = {
  args: {
    theme: 'default',
    layout: 'auto',
    sections: [
      {
        id: 'actions',
        title: 'Actions',
        buttons: [
          {
            id: 'enabled-btn',
            label: 'Enabled',
            variant: 'primary',
            title: 'This button is enabled',
            handler: () => console.log('Enabled button clicked'),
          },
          {
            id: 'disabled-btn',
            label: 'Disabled',
            variant: 'outline',
            title: 'This button is disabled',
            disabled: true,
            handler: () => console.log('This should not fire'),
          },
        ],
        dropdowns: [
          {
            id: 'disabled-dropdown',
            label: 'Disabled Dropdown',
            options: [
              {value: 'option1', label: 'Option 1'},
              {value: 'option2', label: 'Option 2'},
            ],
            disabled: true,
            handler: (_e) => console.log('This should not fire'),
          },
        ],
      },
    ],
  },
};

export const EmptyToolbar: Story = {
  args: {
    theme: 'default',
    layout: 'auto',
    sections: [],
  },
};