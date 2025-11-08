import {LitElement, html, css, nothing} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import '../scientific-form.js';
import '../../input/scientific-input.js';
import '../../dropdown/scientific-dropdown.js';
import '../../button/scientific-button.js';
import {SCIENTIFIC_THEMES} from '../../../shared/constants/themes.js';

const meta: Meta = {
  title: 'Scientific/Form',
  component: 'scientific-form',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Scientific Form

A **themed**, **accessible** form surface with built-in loading, messaging, and layout controls for scientific workflows.

---

## Props

- \`theme\` - Applies design-system theming tokens (\`default\`, \`dark\`, \`scientific\`)
- \`title\` - Heading text rendered in the surface header
- \`subtitle\` - Supporting description text beneath the title
- \`showToolbar\` - Toggles the optional toolbar area inherited from the surface base
- \`submitLabel\` - Primary action label (default: "Submit")
- \`cancelLabel\` - Secondary action label when \`showCancel\` is true (default: "Cancel")
- \`loadingLabel\` - Replaces the submit label while \`isLoading\` is true (default: "Processing...")
- \`submitVariant\` - Submit button variant: primary, secondary, outline, ghost, danger, success
- \`cancelVariant\` - Cancel button variant: primary, secondary, outline, ghost, danger, success (default: outline)
- \`isLoading\` - Shows the loading overlay and toggles button states; automatically managed during submission
- \`disabled\` - Disables the surface and keeps the submit button inactive
- \`showCancel\` - Displays the default cancel button (default: true)
- \`showProgress\` - Renders the progress bar above the form (default: false)
- \`progress\` - Progress value (0-100) used to size the progress bar; reset to 0 on form reset
- \`errorMessage\` - Error text shown with \`role="alert"\`
- \`successMessage\` - Success text shown with \`role="status"\`
- \`footerLayout\` - Footer alignment: end, start, center, space-between, full-width
- \`autoFocus\` - Focuses the first light-DOM input/select/textarea on first update
- \`method\` - Form method attribute: POST, GET, or dialog (case-insensitive)
- \`action\` - Form action URL used when no \`onSubmit\` handler is provided
- \`enctype\` - Encoding type: application/x-www-form-urlencoded, multipart/form-data, text/plain
- \`noValidate\` - Skips HTML5 validation and sets the \`novalidate\` attribute
- \`onSubmit\` - Optional async/sync callback invoked with \`FormData\`; awaited before success/error events fire
- \`onCancel\` - Optional callback run after the cancel event dispatches
- \`onReset\` - Optional callback run after the reset event dispatches

## Events

- \`form-submit-start\` - Fires before submission begins; detail: {formData, originalEvent}; bubbles and composes
- \`form-submit-success\` - Fires after a successful submit; detail: {formData}; bubbles and composes
- \`form-submit-error\` - Fires when the submit handler throws or rejects; detail: {error, formData}; bubbles and composes
- \`form-cancel\` - Fires when the cancel action is triggered; detail: {timestamp}; bubbles and composes
- \`form-reset\` - Fires after the form is reset; detail: {timestamp}; bubbles and composes

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

- **Design System Surface**: Inherits header, toolbar, theming, and shared container styling from \`ScientificSurfaceBase\`
- **Built-in Loading**: \`isLoading\` controls an overlay spinner and swaps the submit label to \`loadingLabel\`
- **Async Submission Flow**: Waits on \`onSubmit\`, clears prior messages, emits start/success/error events, and falls back to a native submission when \`action\` is set
- **Progress Indicator**: \`showProgress\` renders an accessible progress bar bound to \`progress\` and resets during form resets
- **Messaging**: Managed \`errorMessage\` and \`successMessage\` outputs use alert/status roles and default success text when none is provided
- **Footer Layout & Slots**: \`footerLayout\` adjusts alignment/stacking and the \`footer\` slot lets you replace or extend the action buttons
- **Form Integration**: Supports native \`method\`, \`action\`, \`enctype\`, \`novalidate\`, and honors built-in reset/submit semantics
- **Accessibility**: \`<form role="form">\` with \`aria-busy\`, progressbar semantics, and bubbling events for cross-component coordination
- **Auto Focus & Disabled States**: \`autoFocus\` targets the first focusable field; \`disabled\` dims the container and keeps actions inactive
- **Responsive Layout**: Footer actions stack vertically on narrow viewports and stretch when \`footerLayout="full-width"\`

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
    scientific-form {
      --form-max-width: 720px;
      --form-footer-justify: space-between;
      --form-progress-color: #2563eb;
    }

**Complete Variable List:**

All CSS custom properties available for customization with their default values:

    scientific-form {
      /* Container & Layout */
      --form-max-width: 600px;
      --form-width: 100%;
      --form-min-height: auto;

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

      /* ScientificSurfaceBase Container */
      --container-bg-color: var(--scientific-bg-primary);
      --container-border: var(--scientific-border);
      --container-border-radius: var(--scientific-border-radius-lg);
      --container-padding: var(--scientific-spacing-2xl);
      --container-shadow: var(--scientific-shadow);
    }
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: {type: 'select'},
      options: SCIENTIFIC_THEMES,
      description: 'Form theme variant',
      table: {
        type: {summary: "'default' | 'dark' | 'scientific'"},
        defaultValue: {summary: "'default'"},
      },
    },
    title: {control: 'text', description: 'Form title'},
    subtitle: {control: 'text', description: 'Form subtitle'},
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
      .onSubmit=${async (formData: FormData) => {
        console.log('Form submitted with data:', Object.fromEntries(formData));
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
    <style>
      .form-input {
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        width: 100%;
        box-sizing: border-box;
        outline: none;
        transition: all 0.2s ease;
        font-size: 16px;
      }
      
      .form-input:focus {
        border-color: var(--scientific-border-focus, #3b82f6);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      .form-input:invalid:not(:placeholder-shown) {
        border-color: #fca5a5;
      }
      
      .form-input:invalid:focus:not(:placeholder-shown) {
        border-color: #f87171;
        box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);
      }
      
      .form-input:valid:not(:placeholder-shown) {
        border-color: #86efac;
      }
      
      .form-input:valid:focus:not(:placeholder-shown) {
        border-color: #34d399;
        box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.1);
      }
    </style>
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
            name="email"
            placeholder="Email"
            class="form-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="form-input"
            required
          />
        </div>
      </scientific-form>

      <h3 style="margin: 0;">Success State</h3>
      <scientific-form
        title="Newsletter Signup"
        subtitle="Stay updated with our latest news"
        successMessage="Thank you! You've been successfully subscribed to our newsletter."
        .onSubmit=${async (formData: FormData) => {
          console.log('Newsletter signup:', Object.fromEntries(formData));
        }}
      >
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <label style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-weight: 500; color: #374151;">Email Address *</span>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              class="form-input"
              required
              value="user@example.com"
            />
          </label>
        </div>
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


class MultiStepFormDemo extends LitElement {
  static override properties = {
    step: {state: true},
    submitting: {state: true},
    completed: {state: true},
  };

  static override styles = css`
    .step-grid {
      display: grid;
      gap: 16px;
    }

    .step-hint {
      font-size: 14px;
      color: #4b5563;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px;
    }

    .footer-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
  `;

  step = 0;
  submitting = false;
  completed = false;

  get totalSteps() {
    return 2;
  }

  private _nextStep() {
    if (this.step < this.totalSteps - 1) {
      this.step += 1;
      this.completed = false;
    }
  }

  private _previousStep() {
    if (this.step > 0) {
      this.step -= 1;
      this.completed = false;
    }
  }

  private _progressValue() {
    return Math.round((this.step / (this.totalSteps - 1)) * 100);
  }

  private _subtitle() {
    const subtitles = [
      'Provide your basic information',
      'Share your project details',
      'Review & confirm submission',
    ];
    return subtitles[this.step];
  }

  private _renderStepContent() {
    switch (this.step) {
      case 0:
        return html`
          <div class="step-grid two-column">
            <scientific-input
              label="Full Name"
              placeholder="Ada Lovelace"
              required
              clearable
              .autoComplete=${false}
            ></scientific-input>
            <scientific-input
              label="Email"
              type="email"
              placeholder="ada@example.com"
              required
              clearable
              .autoComplete=${false}
            ></scientific-input>
            <scientific-input
              label="Institution"
              placeholder="FI MUNI"
              required
              clearable
              .autoComplete=${false}
            ></scientific-input>
            <scientific-dropdown
              label="Role"
              placeholder="Select your role"
              .options=${[
                {label: 'Student', value: 'student'},
                {label: 'PhD Student', value: 'phd'},
                {label: 'Postdoc', value: 'postdoc'},
                {label: 'Faculty', value: 'faculty'},
                {label: 'Researcher', value: 'researcher'},
                {label: 'Other', value: 'other'}
              ]}
              clearable
            ></scientific-dropdown>
          </div>
        `;
      default:
        return html`
          <div class="step-grid">
            <scientific-input
              label="Project Title"
              placeholder="Genome Analysis"
              required
              clearable
            ></scientific-input>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
                Research Summary *
              </label>
              <textarea
                name="summary"
                rows="4"
                placeholder="Briefly describe your research goals..."
                required
                style="
                  width: 100%;
                  padding: 12px;
                  border: 2px solid #e5e7eb;
                  border-radius: 8px;
                  font-size: 16px;
                  resize: vertical;
                  font-family: inherit;
                "
              ></textarea>
            </div>
            <div class="step-hint">
              💡 Tip: keep the summary short (2-3 sentences) so reviewers can quickly understand your project.
            </div>
          </div>
        `;
    }
  }

  private async _handleSubmit(_formData: FormData) {
    this.submitting = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.submitting = false;
    this.completed = true;
  }

  override render() {
    return html`
      <scientific-form
        title="Research Submission"
        .subtitle=${this._subtitle()}
        .showProgress=${true}
        .progress=${this._progressValue()}
        .successMessage=${this.completed ? 'All steps completed successfully!' : ''}
        .showCancel=${false}
        .footerLayout=${'full-width'}
        .onSubmit=${(formData: FormData) => this._handleSubmit(formData)}
      >
        ${this._renderStepContent()}

        <div slot="footer" class="footer-actions">
          ${this.step > 0
            ? html`
                <scientific-button
                  label="Back"
                  variant="outline"
                  type="button"
                  @click=${this._previousStep}
                ></scientific-button>
              `
            : nothing}

          ${this.step < this.totalSteps - 1
            ? html`
                <scientific-button
                  label="Next"
                  variant="primary"
                  type="button"
                  @click=${this._nextStep}
                ></scientific-button>
              `
            : html`
                <scientific-button
                  label=${this.submitting ? 'Submitting...' : 'Submit'}
                  variant="success"
                  type="submit"
                  .loading=${this.submitting}
                ></scientific-button>
              `}
        </div>
      </scientific-form>
    `;
  }
}

if (!customElements.get('multi-step-form-demo')) {
  customElements.define('multi-step-form-demo', MultiStepFormDemo);
}

export const MultiStepProgression: Story = {
  render: () => html`<multi-step-form-demo></multi-step-form-demo>`,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive multi-step form example demonstrating progress updates, step navigation, and async submission feedback.',
      },
    },
  },
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


