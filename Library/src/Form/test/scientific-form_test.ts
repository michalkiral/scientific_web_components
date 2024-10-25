import {ScientificForm} from '../scientific-form';
import {fixture, assert, aTimeout} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('scientific-form', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-form');
    assert.instanceOf(el, ScientificForm);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<scientific-form></scientific-form>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="form-container">
        <div class="form-header">Scientific Form</div>
        <div class="form-section">
          <div class="section-title">Personal Information</div>
          <slot name="personal-info"></slot>
        </div>
        <div class="form-section">
          <div class="section-title">Scientific Data</div>
          <slot name="scientific-data"></slot>
        </div>
        <div class="form-footer">
          <scientific-button></scientific-button>
          <scientific-button></scientific-button>
        </div>
      </div>
    `
    );
  });

  test('renders with custom title and labels', async () => {
    const el = await fixture(html`
      <scientific-form 
        formTitle="Sample Scientific Form" 
        submitLabel="Send Data" 
        cancelLabel="Reset">
      </scientific-form>
    `);
    assert.shadowDom.equal(
      el,
      `
      <div class="form-container">
        <div class="form-header">Sample Scientific Form</div>
        <div class="form-section">
          <div class="section-title">Personal Information</div>
          <slot name="personal-info"></slot>
        </div>
        <div class="form-section">
          <div class="section-title">Scientific Data</div>
          <slot name="scientific-data"></slot>
        </div>
        <div class="form-footer">
          <scientific-button></scientific-button>
          <scientific-button></scientific-button>
        </div>
      </div>
    `
    );
  });


  test('handles a submit action', async () => {
    let submitted = false;

    const el = await fixture<ScientificForm>(html`
      <scientific-form
        .onSubmit=${async () => {
          submitted = true;
          await new Promise(resolve => setTimeout(resolve, 100));
        }}
      ></scientific-form>
    `);

    const submitButton = el.shadowRoot!.querySelector('scientific-button:nth-of-type(2)')! as HTMLButtonElement;
    submitButton.click(); // Simulate a button click
    
    assert.isTrue(el.isLoading, 'Form should be loading after submit is triggered');
    
    // Wait for the promise (fake async action) to resolve
    await aTimeout(100);
    
    assert.isFalse(el.isLoading, 'Form should not be loading after submit is completed');
    assert.isTrue(submitted, 'onSubmit should have been called');
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

    const cancelButton = el.shadowRoot!.querySelector('scientific-button:nth-of-type(1)')! as HTMLButtonElement;
    cancelButton.click();

    assert.isTrue(cancelled, 'onCancel should have been called');
  });
});
