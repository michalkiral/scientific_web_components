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
        component: `
# Scientific Button

A **customizable**, **accessible** button component for scientific web apps with extensive features.

---

## Props

- \`label\` — Button text
- \`loading\` — Shows loading state
- \`loadingLabel\` — Text when loading
- \`showSpinner\` — Shows spinner when loading (default: true)
- \`action\` — Async function on click
- \`variant\` — Button style: primary, secondary, outline, ghost, danger, success
- \`size\` — Button size: small, medium, large
- \`disabled\` — Disables the button
- \`fullWidth\` — Makes button take full width
- \`type\` — Button type: button, submit, reset
- \`form\` — Associates button with a form by ID
- \`name\` — Name attribute for form submission
- \`value\` — Value attribute for form submission
- \`href\` — Renders as link when provided
- \`target\` — Link target when href is used
- \`autoFocus\` — Auto-focuses the button

## Events

- \`button-click-start\` — Fired when action starts
- \`button-click-complete\` — Fired when action completes
- \`button-click-error\` — Fired when action fails
- \`success\` — Simplified success event
- \`error\` — Simplified error event

## Features

- **Multiple Variants**: Different visual styles for different contexts (primary, secondary, outline, ghost, danger, success)
- **Size Options**: Small, medium, and large sizes with responsive behavior
- **Loading States**: Animated spinner with accessible loading state and customizable text
- **Link Mode**: Can render as a link with href and target attributes
- **Form Integration**: Submit, reset, and button types with form association
- **Full Width Support**: Can expand to fill container width
- **Accessibility**: ARIA attributes, focus management, keyboard support, screen reader compatible
- **Async Actions**: Built-in support for async functions with automatic loading states
- **Event Handling**: Comprehensive event system for interaction tracking
- **Responsive Design**: Mobile-optimized with touch-friendly sizing
- **CSS Custom Properties**: Extensive customization through CSS variables

## Accessibility Features

- **ARIA Labels**: Dynamic aria-label updates based on loading state
- **Loading States**: aria-busy attribute for screen readers during async operations
- **Focus Management**: Proper focus handling and visual focus indicators
- **Keyboard Navigation**: Full keyboard support with Enter and Space activation
- **Color Contrast**: Meets WCAG contrast requirements across all variants
- **Touch Targets**: Mobile-optimized touch target sizes (44px minimum)
- **Semantic HTML**: Uses proper button/link elements with correct roles

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**

    scientific-button {
      --button-bg-color: #007bff;
      --button-color: #ffffff;
      --button-border: var(--scientific-border);
      --button-border-radius: var(--scientific-border-radius);
      --button-padding: var(--scientific-spacing-md) var(--scientific-spacing-2xl);
      --button-shadow: var(--scientific-shadow-sm);
      --button-hover-bg-color: var(--scientific-primary-hover);
      --button-transition: var(--scientific-transition);
    }

**Loading Spinner Customization:**

    scientific-button {
      /* Spinner size and colors */
      --loading-spinner-size: 18px;
      
      /* Primary variant spinner (white on colored background) */
      --loading-spinner-color: rgba(255, 255, 255, 0.3);
      --loading-spinner-active-color: #ffffff;
      
      /* Outline/Ghost variant spinner (colored on transparent background) */
      --loading-spinner-color: rgba(0, 123, 255, 0.3);
      --loading-spinner-active-color: #007bff;
    }

**Complete Variable List:**

    scientific-button {
      /* Layout & Sizing */
      --button-width: auto;
      --button-max-width: 100%;
      --button-min-height: 48px;
      --button-padding: 12px 24px;
      --button-gap: 8px;
      
      /* Typography */
      --button-font-family: var(--scientific-font-family);
      --button-font-size: var(--scientific-text-base);
      --button-font-weight: 500;
      --button-line-height: 1.5;
      
      /* Colors & Appearance */
      --button-bg-color: var(--scientific-primary-color);
      --button-color: #ffffff;
      --button-border: var(--scientific-border);
      --button-border-radius: var(--scientific-border-radius);
      --button-shadow: var(--scientific-shadow-sm);
      
      /* Interactions */
      --button-transition: var(--scientific-transition);
      --button-hover-bg-color: var(--scientific-primary-hover);
      --button-hover-shadow: var(--scientific-shadow);
      --button-hover-transform: translateY(-1px);
      --button-focus-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      --button-focus-border-color: var(--scientific-border-focus);
      --button-active-transform: translateY(0);
      --button-active-shadow: var(--scientific-shadow-sm);
      
      /* Disabled States */
      --button-disabled-bg-color: #e9ecef;
      --button-disabled-color: #6c757d;
      --button-disabled-border-color: #dee2e6;
      
      /* Variant Colors */
      --button-secondary-bg-color: var(--scientific-secondary-color);
      --button-secondary-color: #ffffff;
      --button-secondary-hover-bg-color: #545b62;
      
      --button-outline-bg-color: transparent;
      --button-outline-color: var(--scientific-primary-color);
      --button-outline-border-color: var(--scientific-primary-color);
      --button-outline-hover-bg-color: var(--scientific-primary-color);
      --button-outline-hover-color: #ffffff;
      
      --button-ghost-bg-color: transparent;
      --button-ghost-color: var(--scientific-primary-color);
      --button-ghost-border-color: transparent;
      --button-ghost-hover-bg-color: rgba(0, 123, 255, 0.1);
      
      --button-danger-bg-color: var(--scientific-danger-color);
      --button-danger-color: #ffffff;
      --button-danger-hover-bg-color: #c82333;
      
      --button-success-bg-color: var(--scientific-success-color);
      --button-success-color: #ffffff;
      --button-success-hover-bg-color: #218838;
      
      /* Size Variants */
      --button-small-font-size: var(--scientific-text-sm);
      --button-small-padding: 8px 16px;
      --button-small-min-height: 36px;
      
      --button-large-font-size: var(--scientific-text-lg);
      --button-large-padding: 16px 24px;
      --button-large-min-height: 56px;
      
      /* Loading */
      
      /* Mobile Responsive */
      --button-mobile-font-size: var(--scientific-text-base);
      --button-mobile-min-height: 44px;
      --button-small-mobile-min-height: 32px;
      --button-large-mobile-min-height: 52px;
    }

**Loading Spinner Variables:**

    scientific-button {
      /* Loading spinner customization */
      --loading-spinner-size: 18px;
      --loading-spinner-color: #e5e7eb;
      --loading-spinner-active-color: #007bff;
      --loading-overlay-bg: rgba(255, 255, 255, 0.8);
      --loading-z-index: 10;
    }

**Scientific Design System Variables:**

    :host {
      /* Colors */
      --scientific-primary-color: #007bff;
      --scientific-primary-hover: #0056b3;
      --scientific-secondary-color: #6c757d;
      --scientific-success-color: #28a745;
      --scientific-danger-color: #dc3545;
      --scientific-warning-color: #ffc107;
      --scientific-info-color: #17a2b8;
      
      /* Typography */
      --scientific-font-family: system-ui, -apple-system, sans-serif;
      --scientific-text-xs: 12px;
      --scientific-text-sm: 14px;
      --scientific-text-base: 16px;
      --scientific-text-lg: 18px;
      --scientific-text-xl: 20px;
      --scientific-text-2xl: 24px;
      
      /* Spacing */
      --scientific-spacing-xs: 4px;
      --scientific-spacing-sm: 8px;
      --scientific-spacing-md: 12px;
      --scientific-spacing-lg: 16px;
      --scientific-spacing-xl: 20px;
      --scientific-spacing-2xl: 24px;
      
      /* Borders & Radius */
      --scientific-border-radius: 8px;
      --scientific-border-radius-lg: 12px;
      --scientific-border: 2px solid #e5e7eb;
      --scientific-border-color: #e5e7eb;
      --scientific-border-hover: #d1d5db;
      --scientific-border-focus: #007bff;
      
      /* Shadows */
      --scientific-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --scientific-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      --scientific-shadow-lg: 0 8px 12px rgba(0, 0, 0, 0.15);
      --scientific-shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.1);
      
      /* Transitions */
      --scientific-transition: all 0.2s ease-in-out;
      --scientific-transition-fast: all 0.15s ease-out;
      --scientific-transition-slow: all 0.3s ease-in-out;
    }
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: {type: 'select'},
      options: ['default', 'dark', 'scientific'],
      description: 'Button theme variant',
      table: {
        type: {summary: "'default' | 'dark' | 'scientific'"},
        defaultValue: {summary: "'default'"},
      },
    },
    label: {control: 'text', description: 'Button label'},
    loading: {control: 'boolean', description: 'Loading state'},
    loadingLabel: {control: 'text', description: 'Label when loading'},
    showSpinner: {control: 'boolean', description: 'Show spinner when loading'},
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'danger',
        'success',
      ],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {control: 'boolean', description: 'Disabled state'},
    fullWidth: {control: 'boolean', description: 'Full width button'},
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type',
    },
    form: {control: 'text', description: 'Form ID to associate with'},
    name: {control: 'text', description: 'Name for form submission'},
    value: {control: 'text', description: 'Value for form submission'},
    href: {control: 'text', description: 'Link URL'},
    target: {control: 'text', description: 'Link target'},
    autoFocus: {control: 'boolean', description: 'Auto focus'},
    action: {control: false, description: 'Async action function'},
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Click Me',
    theme: 'default',
    variant: 'primary',
    size: 'medium',
    loading: false,
    loadingLabel: 'Loading...',
    showSpinner: true,
    disabled: false,
    fullWidth: false,
    type: 'button',
    form: '',
    name: '',
    value: '',
    href: '',
    target: '',
    autoFocus: false,
  },
  render: ({
    label,
    theme,
    variant,
    size,
    loading,
    loadingLabel,
    showSpinner,
    disabled,
    fullWidth,
    type,
    form,
    name,
    value,
    href,
    target,
    autoFocus,
  }) =>
    html`<scientific-button
      .label=${label}
      .theme=${theme}
      .variant=${variant}
      .size=${size}
      .loading=${loading}
      .loadingLabel=${loadingLabel}
      .showSpinner=${showSpinner}
      .disabled=${disabled}
      .fullWidth=${fullWidth}
      .type=${type}
      .form=${form}
      .name=${name}
      .value=${value}
      .href=${href}
      .target=${target}
      .autoFocus=${autoFocus}
    ></scientific-button>`,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <scientific-button label="Primary" variant="primary"></scientific-button>
      <scientific-button
        label="Secondary"
        variant="secondary"
      ></scientific-button>
      <scientific-button label="Outline" variant="outline"></scientific-button>
      <scientific-button label="Ghost" variant="ghost"></scientific-button>
      <scientific-button label="Danger" variant="danger"></scientific-button>
      <scientific-button label="Success" variant="success"></scientific-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;"
    >
      <scientific-button label="Small" size="small"></scientific-button>
      <scientific-button label="Medium" size="medium"></scientific-button>
      <scientific-button label="Large" size="large"></scientific-button>
    </div>
  `,
};



export const LoadingStates: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;"
    >
      <div
        style="display: flex; flex-direction: column; gap: 8px; align-items: center;"
      >
        <h4 style="margin: 0; font-size: 14px;">With Spinner</h4>
        <scientific-button
          label="Save"
          loading
          showSpinner
          variant="primary"
        ></scientific-button>
      </div>
      <div
        style="display: flex; flex-direction: column; gap: 8px; align-items: center;"
      >
        <h4 style="margin: 0; font-size: 14px;">Text Only</h4>
        <scientific-button
          label="Delete"
          loading
          loadingLabel="Deleting..."
          .showSpinner=${false}
          variant="danger"
        ></scientific-button>
      </div>
      <div
        style="display: flex; flex-direction: column; gap: 8px; align-items: center;"
      >
        <h4 style="margin: 0; font-size: 14px;">Custom Loading Text</h4>
        <scientific-button
          label="Upload"
          loading
          loadingLabel="Uploading file..."
          .showSpinner=${false}
          variant="outline"
        ></scientific-button>
      </div>
    </div>
  `,
};

export const LoadingModes: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <scientific-button
        label="Spinner Only"
        loading
        variant="primary"
      ></scientific-button>
      <scientific-button
        label="Text Change"
        loading
        loadingLabel="Processing..."
        .showSpinner=${false}
        variant="secondary"
      ></scientific-button>
    </div>
  `,
};

export const DisabledComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
          Normal State
        </h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <scientific-button label="Primary" variant="primary"></scientific-button>
          <scientific-button label="Secondary" variant="secondary"></scientific-button>
          <scientific-button label="Outline" variant="outline"></scientific-button>
          <scientific-button label="Ghost" variant="ghost"></scientific-button>
          <scientific-button label="Danger" variant="danger"></scientific-button>
          <scientific-button label="Success" variant="success"></scientific-button>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
          Disabled State
        </h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <scientific-button label="Primary" variant="primary" disabled></scientific-button>
          <scientific-button label="Secondary" variant="secondary" disabled></scientific-button>
          <scientific-button label="Outline" variant="outline" disabled></scientific-button>
          <scientific-button label="Ghost" variant="ghost" disabled></scientific-button>
          <scientific-button label="Danger" variant="danger" disabled></scientific-button>
          <scientific-button label="Success" variant="success" disabled></scientific-button>
        </div>
      </div>
    </div>
  `,
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    fullWidth: true,
    variant: 'primary',
    size: 'large',
  },
  render: ({label, fullWidth, variant, size}) =>
    html`<div style="width: 100%; max-width: 400px;">
      <scientific-button
        .label=${label}
        .fullWidth=${fullWidth}
        .variant=${variant}
        .size=${size}
      ></scientific-button>
    </div>`,
};

export const AsLinks: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <scientific-button
        label="Open Documentation"
        href="/docs"
        variant="primary"
      >
      </scientific-button>
      <scientific-button
        label="External Link"
        href="https://example.com"
        target="_blank"
        variant="outline"
      >
      </scientific-button>
      <scientific-button
        label="Download File"
        href="/download.pdf"
        variant="ghost"
      >
      </scientific-button>
    </div>
  `,
};

export const WithActions: Story = {
  args: {
    label: 'Async Action',
    variant: 'primary',
  },
  render: ({label, variant}) =>
    html`<scientific-button
      .label=${label}
      .variant=${variant}
      .action=${() => new Promise((res) => setTimeout(res, 2000))}
      @button-click-start=${() => console.log('Action started')}
      @button-click-complete=${() => console.log('Action completed')}
      @button-click-error=${(e: CustomEvent) =>
        console.error('Action failed:', e.detail)}
    ></scientific-button>`,
};

export const StyleCustomization: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;"
    >
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h4 style="margin: 0;">Custom Styled Examples</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <scientific-button
            label="Custom"
            variant="primary"
            style="
              --button-bg-color: #667eea;
              --button-hover-bg-color: #5a6fd8;
              --button-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            "
          ></scientific-button>

          <scientific-button
            label="Neon Effect"
            variant="ghost"
            style="
              --button-color: #00ff88;
              --button-border: 2px solid #00ff88;
              --button-hover-bg-color: rgba(0, 255, 136, 0.1);
              --button-focus-shadow: 0 0 20px #00ff88;
              --button-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
            "
          ></scientific-button>

          <scientific-button
            label="Pill Shape"
            variant="primary"
            size="small"
            style="
              --button-border-radius: 50px;
              --button-padding: 8px 24px;
              --button-font-weight: 600;
            "
          ></scientific-button>
        </div>
      </div>
    </div>
  `,
};

export const ThemeComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 48px;">
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Default Theme
        </h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <scientific-button
            label="Primary"
            theme="default"
            variant="primary"
          ></scientific-button>
          <scientific-button
            label="Secondary"
            theme="default"
            variant="secondary"
          ></scientific-button>
          <scientific-button
            label="Outline"
            theme="default"
            variant="outline"
          ></scientific-button>
          <scientific-button
            label="Ghost"
            theme="default"
            variant="ghost"
          ></scientific-button>
          <scientific-button
            label="Danger"
            theme="default"
            variant="danger"
          ></scientific-button>
          <scientific-button
            label="Success"
            theme="default"
            variant="success"
          ></scientific-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Dark Theme
        </h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <scientific-button
            label="Primary"
            theme="dark"
            variant="primary"
          ></scientific-button>
          <scientific-button
            label="Secondary"
            theme="dark"
            variant="secondary"
          ></scientific-button>
          <scientific-button
            label="Outline"
            theme="dark"
            variant="outline"
          ></scientific-button>
          <scientific-button
            label="Ghost"
            theme="dark"
            variant="ghost"
          ></scientific-button>
          <scientific-button
            label="Danger"
            theme="dark"
            variant="danger"
          ></scientific-button>
          <scientific-button
            label="Success"
            theme="dark"
            variant="success"
          ></scientific-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Scientific Theme
        </h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <scientific-button
            label="Primary"
            theme="scientific"
            variant="primary"
          ></scientific-button>
          <scientific-button
            label="Secondary"
            theme="scientific"
            variant="secondary"
          ></scientific-button>
          <scientific-button
            label="Outline"
            theme="scientific"
            variant="outline"
          ></scientific-button>
          <scientific-button
            label="Ghost"
            theme="scientific"
            variant="ghost"
          ></scientific-button>
          <scientific-button
            label="Danger"
            theme="scientific"
            variant="danger"
          ></scientific-button>
          <scientific-button
            label="Success"
            theme="scientific"
            variant="success"
          ></scientific-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of all available themes showing the visual differences and styling approaches for all button variants.',
      },
    },
  },
};

export const ThemeVariantGrid: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
          Loading States Across Themes
        </h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <scientific-button
            label="Loading Default"
            theme="default"
            variant="primary"
            loading
          ></scientific-button>
          <scientific-button
            label="Loading Dark"
            theme="dark"
            variant="primary"
            loading
          ></scientific-button>
          <scientific-button
            label="Loading Scientific"
            theme="scientific"
            variant="primary"
            loading
          ></scientific-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
          Disabled States Across Themes
        </h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <scientific-button
            label="Disabled Default"
            theme="default"
            variant="primary"
            disabled
          ></scientific-button>
          <scientific-button
            label="Disabled Dark"
            theme="dark"
            variant="primary"
            disabled
          ></scientific-button>
          <scientific-button
            label="Disabled Scientific"
            theme="scientific"
            variant="primary"
            disabled
          ></scientific-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
          Size Variations with Scientific Theme
        </h3>
        <div
          style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;"
        >
          <scientific-button
            label="Small Scientific"
            theme="scientific"
            variant="primary"
            size="small"
          ></scientific-button>
          <scientific-button
            label="Medium Scientific"
            theme="scientific"
            variant="primary"
            size="medium"
          ></scientific-button>
          <scientific-button
            label="Large Scientific"
            theme="scientific"
            variant="primary"
            size="large"
          ></scientific-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Grid view showcasing various button states and sizes across different themes, demonstrating theme consistency and visual hierarchy.',
      },
    },
  },
};
