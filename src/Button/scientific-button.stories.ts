import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-button.js';

const meta: Meta = {
  title: 'Scientific/Button',
  tags: ['autodocs'],
  component: 'scientific-button',
  parameters: {
    docs: {
      description: {
        component: `\
          A customizable, accessible button component for scientific web apps.\n\n**Props:**\n- \`label\`: Button text\n- \`loading\`: Shows loading state\n- \`loadingLabel\`: Text when loading\n- \`action\`: Async function on click\n\n**Events:**\n- \`custom-button-action-start\`\n- \`custom-button-action-complete\`\n- \`custom-button-action-error\`\n\n**Styling:**  \nUse CSS variables to customize appearance.\n        `,
      },
    },
  },
  argTypes: {
    label: {control: 'text', description: 'Button label'},
    loading: {control: 'boolean', description: 'Loading state'},
    loadingLabel: {control: 'text', description: 'Label when loading'},
    action: {control: false, description: 'Async action function'},
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {label: 'Click Me', loading: false},
  render: ({label, loading}) =>
    html`<scientific-button
      .label=${label}
      .loading=${loading}
    ></scientific-button>`,
};

export const Loading: Story = {
  args: {label: 'Click Me', loading: true, loadingLabel: 'Processing...'},
  render: ({label, loading, loadingLabel}) =>
    html`<scientific-button
      .label=${label}
      .loading=${loading}
      .loadingLabel=${loadingLabel}
    ></scientific-button>`,
};

export const CustomStyles: Story = {
  args: {label: 'Styled Button'},
  render: ({label}) =>
    html`<scientific-button
      .label=${label}
      style="--button-bg-color: #e91e63; --button-font-size: 20px"
    ></scientific-button>`,
};

export const WithAction: Story = {
  args: {label: 'Async Action'},
  render: ({label}) =>
    html`<scientific-button
      .label=${label}
      .action=${() => new Promise((res) => setTimeout(res, 500))}
      @custom-button-action-start=${() => alert('Action started')}
      @custom-button-action-complete=${() => alert('Action complete')}
      @custom-button-action-error=${(e: CustomEvent) =>
        alert('Error: ' + e.detail)}
    ></scientific-button>`,
};

