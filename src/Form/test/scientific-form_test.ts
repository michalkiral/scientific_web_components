import {ScientificForm} from '../scientific-form';
import {fixture, assert, aTimeout} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('ScientificForm', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-form');
    assert.instanceOf(el, ScientificForm);
  });

  test('renders with default values', async () => {
    const el = await fixture<ScientificForm>(
      html`<scientific-form></scientific-form>`
    );
    const container = el.shadowRoot!.querySelector('.form-container');
    const form = el.shadowRoot!.querySelector('form');

    assert.isNotNull(container);
    assert.isNotNull(form);
    assert.isFalse(el.isLoading);
    assert.isFalse(el.disabled);
    assert.equal(el.submitLabel, 'Submit');
    assert.equal(el.cancelLabel, 'Cancel');
  });

  test('renders with custom title and subtitle', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form
        title="Custom Title"
        subtitle="Custom Subtitle"
      ></scientific-form>
    `);

    const title = el.shadowRoot!.querySelector('.form-title');
    const subtitle = el.shadowRoot!.querySelector('.form-subtitle');

    assert.isNotNull(title);
    assert.isNotNull(subtitle);
    assert.include(title!.textContent!, 'Custom Title');
    assert.include(subtitle!.textContent!, 'Custom Subtitle');
  });

  test('applies variant classes correctly', async () => {
    const variants = ['default', 'compact', 'elevated'] as const;

    for (const variant of variants) {
      const el = await fixture<ScientificForm>(html`
        <scientific-form variant=${variant}></scientific-form>
      `);
      const container = el.shadowRoot!.querySelector('.form-container');

      if (variant !== 'default') {
        assert.include(
          container!.className,
          variant,
          `Container should have ${variant} class`
        );
      }
    }
  });

  test('handles loading state', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form loadingLabel="Processing Data..."></scientific-form>
    `);

    el.isLoading = true;
    await el.updateComplete;

    const container = el.shadowRoot!.querySelector('.form-container');
    const loadingOverlay = el.shadowRoot!.querySelector('.loading-overlay');
    const loadingSpinner = el.shadowRoot!.querySelector('.loading-spinner');

    assert.include(container!.className, 'loading');
    assert.isNotNull(loadingOverlay || loadingSpinner);
    assert.equal(el.loadingLabel, 'Processing Data...');
  });

  test('handles disabled state', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form disabled></scientific-form>
    `);

    const container = el.shadowRoot!.querySelector('.form-container');

    assert.include(container!.className, 'disabled');
    assert.isTrue(el.disabled);
  });

  test('handles a submit action', async () => {
    let submitted = false;
    let formData: FormData | null = null;

    const el = await fixture<ScientificForm>(html`
      <scientific-form
        .onSubmit=${async (data: FormData) => {
          submitted = true;
          formData = data;
          await new Promise((resolve) => setTimeout(resolve, 50));
        }}
      ></scientific-form>
    `);

    const form = el.shadowRoot!.querySelector('form')!;
    const submitEvent = new Event('submit', {bubbles: true, cancelable: true});
    form.dispatchEvent(submitEvent);

    await el.updateComplete;
    assert.isTrue(
      el.isLoading,
      'Form should be loading after submit is triggered'
    );

    await aTimeout(100);

    assert.isFalse(
      el.isLoading,
      'Form should not be loading after submit is completed'
    );
    assert.isTrue(submitted, 'onSubmit should have been called');
    assert.isNotNull(formData, 'FormData should be passed to onSubmit');
  });

  test('handles a cancel action', async () => {
    let cancelled = false;

    const el = await fixture<ScientificForm>(html`
      <scientific-form
        .onCancel=${() => {
          cancelled = true;
        }}
      ></scientific-form>
    `);

    const cancelButton = el.shadowRoot!.querySelector(
      'scientific-button:not([type="submit"])'
    )! as HTMLElement;
    cancelButton.click();

    assert.isTrue(cancelled, 'onCancel should have been called');
  });

  test('emits form events correctly', async () => {
    let submitStartEmitted = false;
    let submitSuccessEmitted = false;
    let cancelEmitted = false;

    const el = await fixture<ScientificForm>(html`
      <scientific-form
        .onSubmit=${async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }}
        @form-submit-start=${() => (submitStartEmitted = true)}
        @form-submit-success=${() => (submitSuccessEmitted = true)}
        @form-cancel=${() => (cancelEmitted = true)}
      ></scientific-form>
    `);

    const form = el.shadowRoot!.querySelector('form')!;
    const submitEvent = new Event('submit', {bubbles: true, cancelable: true});
    form.dispatchEvent(submitEvent);

    await aTimeout(50);

    assert.isTrue(submitStartEmitted, 'form-submit-start should be emitted');
    assert.isTrue(
      submitSuccessEmitted,
      'form-submit-success should be emitted'
    );

    const cancelButton = el.shadowRoot!.querySelector(
      'scientific-button:not([type="submit"])'
    )! as HTMLElement;
    cancelButton.click();

    assert.isTrue(cancelEmitted, 'form-cancel should be emitted');
  });

  test('handles submit errors gracefully', async () => {
    let errorEmitted = false;
    let errorMessage = '';

    const el = await fixture<ScientificForm>(html`
      <scientific-form
        .onSubmit=${async () => {
          throw new Error('Submit failed');
        }}
        @form-submit-error=${(e: CustomEvent) => {
          errorEmitted = true;
          errorMessage = e.detail.error.message;
        }}
      ></scientific-form>
    `);

    const form = el.shadowRoot!.querySelector('form')!;
    const submitEvent = new Event('submit', {bubbles: true, cancelable: true});
    form.dispatchEvent(submitEvent);

    await aTimeout(50);

    assert.isFalse(el.isLoading, 'Form should not be loading after error');
    assert.isTrue(errorEmitted, 'form-submit-error should be emitted');
    assert.equal(errorMessage, 'Submit failed');
  });

  test('handles progress display', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form ?showProgress=${true} progress="75"></scientific-form>
    `);

    const progressContainer = el.shadowRoot!.querySelector('.form-progress');
    const progressBar = el.shadowRoot!.querySelector('.form-progress-bar');

    assert.isNotNull(progressContainer);
    assert.isNotNull(progressBar);
    assert.equal(el.progress, 75);
  });

  test('handles footer layout options', async () => {
    const layouts = [
      'end',
      'start',
      'center',
      'space-between',
      'full-width',
    ] as const;

    for (const layout of layouts) {
      const el = await fixture<ScientificForm>(html`
        <scientific-form footerLayout=${layout}></scientific-form>
      `);

      const footer = el.shadowRoot!.querySelector('.form-footer');
      assert.isNotNull(footer);
      assert.equal(el.footerLayout, layout);
    }
  });

  test('handles button variants correctly', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form
        submitVariant="success"
        cancelVariant="danger"
      ></scientific-form>
    `);

    const submitButton = el.shadowRoot!.querySelector(
      'scientific-button[type="submit"]'
    );
    const cancelButton = el.shadowRoot!.querySelector(
      'scientific-button[type="button"]'
    );

    assert.equal(el.submitVariant, 'success');
    assert.equal(el.cancelVariant, 'danger');

    assert.isNotNull(submitButton);
    assert.isNotNull(cancelButton);
  });

  test('hides cancel button when showCancel is false', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form .showCancel=${false}></scientific-form>
    `);

    await el.updateComplete;

    const buttons = el.shadowRoot!.querySelectorAll('scientific-button');
    const submitButton = el.shadowRoot!.querySelector(
      'scientific-button[type="submit"]'
    );
    const cancelButton = el.shadowRoot!.querySelector(
      'scientific-button[type="button"]'
    );

    assert.isFalse(el.showCancel, 'showCancel property should be false');
    assert.isNotNull(submitButton, 'Submit button should be present');
    assert.isNull(
      cancelButton,
      'Cancel button should not be present when showCancel=false'
    );
    assert.equal(buttons.length, 1, 'Should only show submit button');
  });

  test('displays error and success messages', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form
        errorMessage="Something went wrong"
        successMessage="Form submitted successfully"
      ></scientific-form>
    `);

    el.errorMessage = 'Something went wrong';
    await el.updateComplete;

    const errorElement = el.shadowRoot!.querySelector('.form-error');
    assert.isNotNull(errorElement);
    assert.include(errorElement!.textContent!, 'Something went wrong');

    el.errorMessage = '';
    el.successMessage = 'Form submitted successfully';
    await el.updateComplete;

    const successElement = el.shadowRoot!.querySelector('.form-success');
    assert.isNotNull(successElement);
    assert.include(successElement!.textContent!, 'Form submitted successfully');
  });

  test('handles form attributes correctly', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form
        method="GET"
        action="/submit"
        enctype="multipart/form-data"
        ?noValidate=${true}
      ></scientific-form>
    `);

    const form = el.shadowRoot!.querySelector('form')!;

    assert.equal(form.method, 'get');
    assert.equal(form.action, 'http://localhost:8000/submit');
    assert.equal(form.enctype, 'multipart/form-data');
    assert.isTrue(form.noValidate);
  });

  test('handles auto-focus functionality', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form ?autoFocus=${true}></scientific-form>
    `);

    assert.isTrue(el.autoFocus);
  });

  test('supports custom CSS properties', async () => {
    const el = await fixture<ScientificForm>(html`
      <scientific-form
        style="--form-bg-color: rgb(255, 0, 0); --form-border-radius: 20px;"
      ></scientific-form>
    `);

    const container = el.shadowRoot!.querySelector(
      '.form-container'
    ) as HTMLElement;
    const computedStyle = getComputedStyle(container);

    assert.isNotNull(computedStyle.backgroundColor);
    assert.isNotNull(computedStyle.borderRadius);
  });
});
