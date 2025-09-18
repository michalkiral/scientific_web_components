import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-form.js';

const meta: Meta = {
  title: 'Scientific/Form',
  component: 'scientific-form',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Scientific Form

A **modern**, **accessible** form component for scientific web apps with advanced features and professional styling.

---

## Props

- \`title\` — Form title text
- \`subtitle\` — Form subtitle/description text
- \`variant\` — Form style: default, compact, elevated
- \`submitLabel\` — Submit button text
- \`cancelLabel\` — Cancel button text
- \`loadingLabel\` — Loading state text
- \`submitVariant\` — Submit button variant
- \`cancelVariant\` — Cancel button variant
- \`isLoading\` — Shows loading state
- \`disabled\` — Disables the form
- \`showCancel\` — Shows/hides cancel button
- \`showProgress\` — Shows progress bar
- \`progress\` — Progress percentage (0-100)
- \`errorMessage\` — Error message to display
- \`successMessage\` — Success message to display
- \`footerLayout\` — Footer button alignment: end, start, center, space-between, full-width
- \`autoFocus\` — Auto-focuses first input
- \`method\` — Form HTTP method: get, post
- \`action\` — Form action URL
- \`enctype\` — Form encoding type: application/x-www-form-urlencoded, multipart/form-data, text/plain
- \`noValidate\` — Disables HTML5 validation
- \`onSubmit\` — Async callback function called on form submission (receives FormData)
- \`onCancel\` — Callback function called when cancel button is clicked
- \`onReset\` — Callback function called when form is reset

## Events

- \`form-submit-start\` — Fired when form submission starts
- \`form-submit-success\` — Fired when form submission succeeds
- \`form-submit-error\` — Fired when form submission fails
- \`form-cancel\` — Fired when cancel button is clicked
- \`form-reset\` — Fired when form is reset

## Basic Usage

\`\`\`html
<scientific-form
  title="User Registration"
  subtitle="Create your account"
  @form-submit-success="\${handleSuccess}"
  @form-submit-error="\${handleError}"
>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <input type="text" name="name" placeholder="Full Name" required />
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
  </div>
</scientific-form>
\`\`\`

## Advanced Usage

**With async submit handler:**
\`\`\`html
<scientific-form
  title="Data Upload"
  .onSubmit="\${async (formData) => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Upload failed');
  }}"
  enctype="multipart/form-data"
  showProgress
  .progress="\${uploadProgress}"
>
  <input type="file" name="dataFile" accept=".csv,.json" required />
</scientific-form>
\`\`\`

---

## Features

- **Modern Design**: Clean, professional styling with hover effects and transitions
- **Loading States**: Built-in loading overlay and button states with customizable loading text
- **Progress Tracking**: Optional progress bar for multi-step forms with percentage display
- **Error Handling**: Built-in error and success message display with ARIA announcements
- **Flexible Layout**: Multiple footer layouts (end, start, center, space-between, full-width)
- **Form Integration**: Native HTML form features with custom async enhancement
- **Responsive Design**: Mobile-friendly responsive design with touch optimization  
- **Accessibility**: ARIA attributes, screen reader support, and keyboard navigation
- **Variant System**: Default, compact, and elevated visual variants
- **Auto Focus**: Optional automatic focus on first form input
- **Validation**: HTML5 validation with optional disable and custom error display
- **Scientific Design System**: Full integration with design tokens and shared styles

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
    scientific-form {
      --form-bg-color: #ffffff;
      --form-border: 2px solid #e5e7eb;
      --form-border-radius: 12px;
      --form-padding: 24px;
      --form-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

**Complete Variable List:**

All CSS custom properties available for customization with their default values:

    scientific-form {
      /* Container & Layout */
      --form-max-width: 600px;
      --form-width: 100%;
      --form-min-height: auto;
      
      /* Header Styling */
      --form-header-border: 1px solid #f3f4f6;
      --form-title-font-size: var(--scientific-text-2xl);
      --form-subtitle-font-size: var(--scientific-text-base);
      
      /* Content Layout */
      --form-content-gap: var(--scientific-spacing-lg);
      --form-section-gap: var(--scientific-spacing-md);
      --form-section-title-font-size: var(--scientific-text-lg);
      --form-section-title-font-weight: 500;
      --form-section-title-color: #374151;
      --form-section-title-padding-bottom: var(--scientific-spacing-xs);
      --form-section-title-border: 1px solid #f3f4f6;
      
      /* Footer Layout */
      --form-footer-justify: flex-end;
      --form-footer-gap: var(--scientific-spacing-md);
      --form-footer-padding-top: var(--scientific-spacing-lg);
      --form-footer-border: 1px solid #f3f4f6;
      
      /* Progress Bar */
      --form-progress-height: var(--scientific-spacing-xs);
      --form-progress-bg-color: #f3f4f6;
      --form-progress-color: var(--scientific-primary-color);
      --form-progress-border-radius: var(--scientific-border-radius);
      
      /* Compact Variant */
      --form-compact-min-height: auto;
      --form-compact-content-gap: var(--scientific-spacing-md);
      --form-compact-footer-padding-top: var(--scientific-spacing-sm);
    }
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: {type: 'select'},
      options: ['default', 'dark', 'scientific'],
      description: 'Form theme variant',
      table: {
        type: {summary: "'default' | 'dark' | 'scientific'"},
        defaultValue: {summary: "'default'"},
      },
    },
    title: {control: 'text', description: 'Form title'},
    subtitle: {control: 'text', description: 'Form subtitle'},
    variant: {
      control: 'select',
      options: ['default', 'compact', 'elevated'],
      description: 'Form variant',
    },
    submitLabel: {control: 'text', description: 'Submit button label'},
    cancelLabel: {control: 'text', description: 'Cancel button label'},
    loadingLabel: {control: 'text', description: 'Loading state label'},
    submitVariant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'danger',
        'success',
      ],
      description: 'Submit button variant',
    },
    cancelVariant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'danger',
        'success',
      ],
      description: 'Cancel button variant',
    },
    isLoading: {control: 'boolean', description: 'Loading state'},
    disabled: {control: 'boolean', description: 'Disabled state'},
    showCancel: {control: 'boolean', description: 'Show cancel button'},
    showProgress: {control: 'boolean', description: 'Show progress bar'},
    progress: {
      control: {type: 'range', min: 0, max: 100},
      description: 'Progress percentage',
    },
    errorMessage: {control: 'text', description: 'Error message'},
    successMessage: {control: 'text', description: 'Success message'},
    footerLayout: {
      control: 'select',
      options: ['end', 'start', 'center', 'space-between', 'full-width'],
      description: 'Footer layout',
    },
    autoFocus: {control: 'boolean', description: 'Auto focus first input'},
    method: {
      control: 'select',
      options: ['get', 'post'],
      description: 'Form method',
    },
    action: {control: 'text', description: 'Form action URL'},
    noValidate: {control: 'boolean', description: 'Disable validation'},
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    title: 'User Registration',
    subtitle: 'Please fill out the form below to create your account',
    theme: 'default',
    submitLabel: 'Create Account',
    cancelLabel: 'Cancel',
    loadingLabel: 'Creating account...',
    submitVariant: 'primary',
    cancelVariant: 'outline',
    isLoading: false,
    disabled: false,
    showCancel: true,
    showProgress: false,
    progress: 0,
    errorMessage: '',
    successMessage: '',
    footerLayout: 'end',
    autoFocus: false,
    method: 'post',
    action: '',
    noValidate: false,
    variant: 'default',
  },
  render: ({
    title,
    subtitle,
    theme,
    submitLabel,
    cancelLabel,
    loadingLabel,
    submitVariant,
    cancelVariant,
    isLoading,
    disabled,
    showCancel,
    showProgress,
    progress,
    errorMessage,
    successMessage,
    footerLayout,
    autoFocus,
    method,
    action,
    noValidate,
    variant,
  }) =>
    html`<scientific-form
      .title=${title}
      .subtitle=${subtitle}
      .theme=${theme}
      .submitLabel=${submitLabel}
      .cancelLabel=${cancelLabel}
      .loadingLabel=${loadingLabel}
      .submitVariant=${submitVariant}
      .cancelVariant=${cancelVariant}
      .isLoading=${isLoading}
      .disabled=${disabled}
      .showCancel=${showCancel}
      .showProgress=${showProgress}
      .progress=${progress}
      .errorMessage=${errorMessage}
      .successMessage=${successMessage}
      .footerLayout=${footerLayout}
      .autoFocus=${autoFocus}
      .method=${method}
      .action=${action}
      .noValidate=${noValidate}
      .variant=${variant}
      .onSubmit=${async (formData: FormData) => {
        console.log('Form submitted with data:', Object.fromEntries(formData));
        // Simulate async processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert('Registration successful! Check console for form data.');
      }}
      .onCancel=${() => {
        console.log('Form cancelled');
        alert('Registration cancelled');
      }}
    >
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px;">
          <label
            style="flex: 1; display: flex; flex-direction: column; gap: 4px;"
          >
            <span style="font-weight: 500; color: #374151;">First Name</span>
            <input
              type="text"
              name="firstName"
              required
              style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
              placeholder="Enter your first name"
            />
          </label>
          <label
            style="flex: 1; display: flex; flex-direction: column; gap: 4px;"
          >
            <span style="font-weight: 500; color: #374151;">Last Name</span>
            <input
              type="text"
              name="lastName"
              required
              style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
              placeholder="Enter your last name"
            />
          </label>
        </div>
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-weight: 500; color: #374151;">Email Address</span>
          <input
            type="email"
            name="email"
            required
            style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
            placeholder="Enter your email address"
          />
        </label>
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-weight: 500; color: #374151;">Password</span>
          <input
            type="password"
            name="password"
            required
            minlength="8"
            style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
            placeholder="Enter a secure password"
          />
        </label>
      </div>
    </scientific-form>`,
};

export const Variants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 800px;"
    >
      <h3 style="margin: 0;">Default Variant</h3>
      <scientific-form
        title="Default Form"
        subtitle="Standard form styling with full features"
        variant="default"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>

      <h3 style="margin: 0;">Compact Variant</h3>
      <scientific-form
        title="Compact Form"
        subtitle="Reduced spacing for dense layouts"
        variant="compact"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 8px; border: 1px solid #e5e7eb; border-radius: 6px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>

      <h3 style="margin: 0;">Elevated Variant</h3>
      <scientific-form
        title="Elevated Form"
        subtitle="Enhanced shadow and depth"
        variant="elevated"
        style="--form-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); --form-hover-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>
    </div>
  `,
};

export const WithProgress: Story = {
  args: {
    title: 'Multi-Step Process',
    subtitle: 'Step 2 of 5: Personal Information',
    showProgress: true,
    progress: 40,
    submitLabel: 'Next Step',
    cancelLabel: 'Previous',
  },
  render: ({
    title,
    subtitle,
    showProgress,
    progress,
    submitLabel,
    cancelLabel,
  }) =>
    html`<scientific-form
      .title=${title}
      .subtitle=${subtitle}
      .showProgress=${showProgress}
      .progress=${progress}
      .submitLabel=${submitLabel}
      .cancelLabel=${cancelLabel}
      .onSubmit=${async (formData: FormData) => {
        console.log('Step 2 data:', Object.fromEntries(formData));
        alert('Moving to step 3...');
      }}
      .onCancel=${() => {
        console.log('Going back to step 1');
        alert('Returning to previous step...');
      }}
    >
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-weight: 500; color: #374151;">Job Title</span>
          <input
            type="text"
            name="jobTitle"
            required
            style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
            placeholder="Enter your job title"
          />
        </label>
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-weight: 500; color: #374151;">Company</span>
          <input
            type="text"
            name="company"
            style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
            placeholder="Enter your company name"
          />
        </label>
      </div>
    </scientific-form>`,
};

export const LoadingStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 800px;"
    >
      <h3 style="margin: 0;">Normal State</h3>
      <scientific-form
        title="Contact Form"
        subtitle="Send us a message"
        .isLoading=${false}
      >
        <textarea
          placeholder="Your message..."
          style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; width: 100%; height: 100px; box-sizing: border-box; resize: vertical;"
        ></textarea>
      </scientific-form>

      <h3 style="margin: 0;">Loading State</h3>
      <scientific-form
        title="Contact Form"
        subtitle="Send us a message"
        .isLoading=${true}
        loadingLabel="Sending message..."
      >
        <textarea
          placeholder="Your message..."
          style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; width: 100%; height: 100px; box-sizing: border-box; resize: vertical;"
        ></textarea>
      </scientific-form>
    </div>
  `,
};

export const WithMessages: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 800px;"
    >
      <h3 style="margin: 0;">Error State</h3>
      <scientific-form
        title="Login Form"
        subtitle="Sign in to your account"
        errorMessage="Invalid email or password. Please try again."
      >
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <input
            type="email"
            placeholder="Email"
            style="padding: 12px; border: 2px solid #fecaca; border-radius: 8px; width: 100%; box-sizing: border-box;"
          />
          <input
            type="password"
            placeholder="Password"
            style="padding: 12px; border: 2px solid #fecaca; border-radius: 8px; width: 100%; box-sizing: border-box;"
          />
        </div>
      </scientific-form>

      <h3 style="margin: 0;">Success State</h3>
      <scientific-form
        title="Newsletter Signup"
        subtitle="Stay updated with our latest news"
        successMessage="Thank you! You've been successfully subscribed to our newsletter."
      >
        <input
          type="email"
          placeholder="Your email address"
          style="padding: 12px; border: 2px solid #bbf7d0; border-radius: 8px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>
    </div>
  `,
};

export const FooterLayouts: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 800px;"
    >
      <h3 style="margin: 0;">End (Default)</h3>
      <scientific-form
        title="Form Footer Layouts"
        footerLayout="end"
        style="--form-max-width: 400px;"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>

      <h3 style="margin: 0;">Start</h3>
      <scientific-form
        title="Left Aligned Buttons"
        footerLayout="start"
        style="--form-max-width: 400px;"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>

      <h3 style="margin: 0;">Center</h3>
      <scientific-form
        title="Centered Buttons"
        footerLayout="center"
        style="--form-max-width: 400px;"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>

      <h3 style="margin: 0;">Space Between</h3>
      <scientific-form
        title="Spaced Buttons"
        footerLayout="space-between"
        style="--form-max-width: 400px;"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>

      <h3 style="margin: 0;">Full Width</h3>
      <scientific-form
        title="Full Width Buttons"
        footerLayout="full-width"
        style="--form-max-width: 400px;"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>
    </div>
  `,
};

export const ButtonVariants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 800px;"
    >
      <h3 style="margin: 0;">Primary Submit / Outline Cancel</h3>
      <scientific-form
        title="Default Button Styles"
        submitVariant="primary"
        cancelVariant="outline"
        style="--form-max-width: 400px;"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>

      <h3 style="margin: 0;">Success Submit / Secondary Cancel</h3>
      <scientific-form
        title="Alternative Button Styles"
        submitLabel="Save Changes"
        submitVariant="success"
        cancelVariant="secondary"
        style="--form-max-width: 400px;"
      >
        <input
          type="text"
          placeholder="Sample input"
          style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%; box-sizing: border-box;"
        />
      </scientific-form>

      <h3 style="margin: 0;">Danger Submit / Ghost Cancel</h3>
      <scientific-form
        title="Delete Confirmation"
        submitLabel="Delete Permanently"
        cancelLabel="Keep Item"
        submitVariant="danger"
        cancelVariant="ghost"
        style="--form-max-width: 400px;"
      >
        <p style="margin: 0; color: #dc2626;">
          This action cannot be undone. Are you sure you want to proceed?
        </p>
      </scientific-form>
    </div>
  `,
};

export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Form',
    subtitle: 'Demonstrating CSS variable customization',
  },
  render: ({title, subtitle}) =>
    html`<scientific-form
      .title=${title}
      .subtitle=${subtitle}
      style="
        --form-bg-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --form-border: none;
        --form-border-radius: 20px;
        --form-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        --form-hover-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        --form-title-color: #000000;
        --form-subtitle-color: rgba(0, 0, 0, 0.8);
        --form-header-border: 1px solid rgba(255, 255, 255, 0.2);
        --form-footer-border: 1px solid rgba(255, 255, 255, 0.2);
        --form-padding: 32px;
        --form-gap: 24px;
        max-width: 500px;
        margin: 20px auto;
        
        /* Custom button styling for glassmorphism effect */
        --button-bg-color: rgba(255, 255, 255, 0.2);
        --button-color: #b92929;
        --button-border: 2px solid rgba(255, 255, 255, 0.3);
        --button-border-radius: 12px;
        --button-padding: 16px 32px;
        --button-font-weight: 600;
        --button-font-size: 16px;
        --button-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        --button-hover-bg-color: rgba(255, 255, 255, 0.3);
        --button-hover-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        --button-hover-transform: translateY(-2px);
        --button-focus-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4);
        --button-focus-border-color: rgba(255, 255, 255, 0.6);
        --button-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      "
    >
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <input
          type="text"
          placeholder="Enter your name"
          style="
            padding: 16px; 
            border: 2px solid rgba(255, 255, 255, 0.3); 
            border-radius: 12px; 
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 16px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            outline: none;
          "
          onfocus="this.style.borderColor='rgba(255, 255, 255, 0.6)'; this.style.background='rgba(255, 255, 255, 0.15)'; this.style.boxShadow='0 0 0 3px rgba(255, 255, 255, 0.2)'"
          onblur="this.style.borderColor='rgba(255, 255, 255, 0.3)'; this.style.background='rgba(255, 255, 255, 0.1)'; this.style.boxShadow='none'"
        />
        <input
          type="email"
          placeholder="Enter your email"
          style="
            padding: 16px; 
            border: 2px solid rgba(255, 255, 255, 0.3); 
            border-radius: 12px; 
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 16px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            outline: none;
          "
          onfocus="this.style.borderColor='rgba(255, 255, 255, 0.6)'; this.style.background='rgba(255, 255, 255, 0.15)'; this.style.boxShadow='0 0 0 3px rgba(255, 255, 255, 0.2)'"
          onblur="this.style.borderColor='rgba(255, 255, 255, 0.3)'; this.style.background='rgba(255, 255, 255, 0.1)'; this.style.boxShadow='none'"
        />
        <textarea
          placeholder="Tell us about your project..."
          rows="3"
          style="
            padding: 16px; 
            border: 2px solid rgba(255, 255, 255, 0.3); 
            border-radius: 12px; 
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 16px;
            backdrop-filter: blur(10px);
            resize: vertical;
            font-family: inherit;
            transition: all 0.3s ease;
            outline: none;
          "
          onfocus="this.style.borderColor='rgba(255, 255, 255, 0.6)'; this.style.background='rgba(255, 255, 255, 0.15)'; this.style.boxShadow='0 0 0 3px rgba(255, 255, 255, 0.2)'"
          onblur="this.style.borderColor='rgba(255, 255, 255, 0.3)'; this.style.background='rgba(255, 255, 255, 0.1)'; this.style.boxShadow='none'"
        ></textarea>
      </div>
    </scientific-form>`,
};

export const RealWorldExample: Story = {
  args: {
    title: 'Research Data Submission',
    subtitle: 'Upload your experimental data and analysis results',
    submitLabel: 'Submit Research',
    submitVariant: 'success',
    showProgress: true,
    progress: 0,
  },
  render: ({
    title,
    subtitle,
    submitLabel,
    submitVariant,
    showProgress,
    progress,
  }) =>
    html`<scientific-form
      .title=${title}
      .subtitle=${subtitle}
      .submitLabel=${submitLabel}
      .submitVariant=${submitVariant}
      .showProgress=${showProgress}
      .progress=${progress}
      .onSubmit=${async (formData: FormData) => {
        console.log('Form submitted with data:', Object.fromEntries(formData));
        const form = document.querySelector('scientific-form');
        if (form) {
          for (let i = 0; i <= 100; i += 10) {
            form.progress = i;
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        }
      }}
    >
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3
            style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 500;"
          >
            Research Information
          </h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-weight: 500; color: #374151;"
                >Study Title *</span
              >
              <input
                type="text"
                name="studyTitle"
                required
                style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
                placeholder="Enter the title of your research study"
              />
            </label>
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-weight: 500; color: #374151;"
                >Research Field</span
              >
              <select
                name="researchField"
                style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
              >
                <option value="">Select a field</option>
                <option value="biology">Biology</option>
                <option value="chemistry">Chemistry</option>
                <option value="physics">Physics</option>
                <option value="mathematics">Mathematics</option>
                <option value="computer-science">Computer Science</option>
                <option value="engineering">Engineering</option>
              </select>
            </label>
          </div>
        </div>

        <div>
          <h3
            style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 500;"
          >
            Data Upload
          </h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-weight: 500; color: #374151;"
                >Dataset File *</span
              >
              <input
                type="file"
                name="dataFile"
                required
                accept=".csv,.xlsx,.json"
                style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
              />
              <span style="font-size: 12px; color: #6b7280;"
                >Accepted formats: CSV, Excel, JSON (max 50MB)</span
              >
            </label>
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-weight: 500; color: #374151;"
                >Analysis Description</span
              >
              <textarea
                name="analysisDescription"
                rows="4"
                style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; resize: vertical; font-family: inherit;"
                placeholder="Describe your analysis methodology and key findings..."
              ></textarea>
            </label>
          </div>
        </div>

        <div
          style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;"
        >
          <input
            type="checkbox"
            name="agreement"
            required
            style="width: 16px; height: 16px;"
          />
          <label style="font-size: 14px; color: #059669;">
            I confirm that this data is original research and I have permission
            to share it
          </label>
        </div>
      </div>
    </scientific-form>`,
};

export const ThemeComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 48px;">
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Default Theme
        </h3>
        <scientific-form
          title="Default Theme Form"
          subtitle="Standard theme with clean, modern styling"
          theme="default"
          submitLabel="Submit"
          cancelLabel="Cancel"
          showCancel
        >
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
            />
          </div>
        </scientific-form>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Dark Theme
        </h3>
        <scientific-form
          title="Dark Theme Form"
          subtitle="Dark theme optimized for low-light environments"
          theme="dark"
          submitLabel="Submit"
          cancelLabel="Cancel"
          showCancel
        >
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              style="padding: 12px; border: 2px solid #374151; border-radius: 8px; font-size: 16px; background: #1f2937; color: #f9fafb;"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              style="padding: 12px; border: 2px solid #374151; border-radius: 8px; font-size: 16px; background: #1f2937; color: #f9fafb;"
            />
          </div>
        </scientific-form>
      </div>

      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
          Scientific Theme
        </h3>
        <scientific-form
          title="Scientific Theme Form"
          subtitle="Professional theme for scientific applications"
          theme="scientific"
          submitLabel="Submit"
          cancelLabel="Cancel"
          showCancel
        >
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;"
            />
          </div>
        </scientific-form>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of all available themes showing the visual differences and styling approaches.',
      },
    },
  },
};
