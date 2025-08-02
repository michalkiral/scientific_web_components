import {ScientificButton} from '../scientific-button.js';

import {fixture, assert, aTimeout} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('my-element', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-button');
    assert.instanceOf(el, ScientificButton);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<scientific-button></scientific-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button>Click Me</button>
    `
    );
  });

  test('renders with a set label', async () => {
    const el = await fixture(html`<scientific-button label="Test Label"></scientific-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button>Test Label</button>
    `
    );
  });

  test('applies correct loading state', async () => {
    const el = await fixture<ScientificButton>(html`<scientific-button loading></scientific-button>`);
    el.loading = true;
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <button>Processing...</button>
    `
    );
  });

  test('handles a click event and emits custom events', async () => {
    let actionStarted = false;
    let actionCompleted = false;

    const el = await fixture<ScientificButton>(html`
      <scientific-button
        label="Test Action"
        .action=${() => new Promise(resolve => setTimeout(resolve, 100))}
        @custom-button-action-start=${() => actionStarted = true}
        @custom-button-action-complete=${() => actionCompleted = true}
      ></scientific-button>
    `);

    const button = el.shadowRoot!.querySelector('button')!;
    
    button.click();
    
    await el.updateComplete;
    assert.equal(el.loading, true);
    assert.equal(button.textContent?.trim(), 'Processing...');

    await aTimeout(100);

    assert.equal(el.loading, false);
    assert.equal(button.textContent?.trim(), 'Test Action');
    
    assert.isTrue(actionStarted, 'custom-button-action-start was emitted');
    assert.isTrue(actionCompleted, 'custom-button-action-complete was emitted');
  });

  test('renders with custom styles', async () => {
    const el = await fixture(html`
      <scientific-button
        style="--button-bg-color: red; --button-font-size: 20px"
        label="Styled Button"
      ></scientific-button>
    `);

    const button = el.shadowRoot!.querySelector('button')!;
    
    assert.equal(getComputedStyle(button).backgroundColor, 'rgb(255, 0, 0)');
    assert.equal(getComputedStyle(button).fontSize, '20px');
  });
});