import {ScientificButton} from '../scientific-button.js';

import {fixture, assert, aTimeout} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('ScientificButton', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-button');
    assert.instanceOf(el, ScientificButton);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<scientific-button></scientific-button>`);
    const button = el.shadowRoot!.querySelector('button');
    assert.isNotNull(button);
    assert.equal(button!.getAttribute('aria-label'), 'Click Me');
    assert.include(button!.textContent!, 'Click Me');
  });

  test('renders with a set label', async () => {
    const el = await fixture(
      html`<scientific-button label="Test Label"></scientific-button>`
    );
    const button = el.shadowRoot!.querySelector('button');
    assert.isNotNull(button);
    assert.equal(button!.getAttribute('aria-label'), 'Test Label');
    assert.include(button!.textContent!, 'Test Label');
  });

  test('applies correct loading state', async () => {
    const el = await fixture<ScientificButton>(
      html`<scientific-button loading></scientific-button>`
    );
    el.loading = true;
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector('button');
    assert.isNotNull(button);
    assert.equal(button!.getAttribute('aria-busy'), 'true');
    assert.isTrue(button!.disabled);
    assert.include(button!.className, 'loading');

    const spinner = el.shadowRoot!.querySelector('.loading-spinner');
    assert.isNotNull(spinner);
  });

  test('handles a click event and emits custom events', async () => {
    let actionStarted = false;
    let actionCompleted = false;

    const el = await fixture<ScientificButton>(html`
      <scientific-button
        label="Test Action"
        .action=${() => new Promise((resolve) => setTimeout(resolve, 100))}
        @button-click-start=${() => (actionStarted = true)}
        @button-click-complete=${() => (actionCompleted = true)}
      ></scientific-button>
    `);

    const button = el.shadowRoot!.querySelector('button')!;

    button.click();

    await el.updateComplete;
    assert.equal(el.loading, true);
    assert.include(button.textContent!, 'Processing');

    await aTimeout(150);

    assert.equal(el.loading, false);
    assert.include(button.textContent!, 'Test Action');

    assert.isTrue(actionStarted, 'button-click-start was emitted');
    assert.isTrue(actionCompleted, 'button-click-complete was emitted');
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

  test('applies variant classes correctly', async () => {
    const nonPrimaryVariants = [
      'secondary',
      'outline',
      'ghost',
      'danger',
      'success',
    ] as const;

    for (const variant of nonPrimaryVariants) {
      const el = await fixture(
        html`<scientific-button
          .variant=${variant}
          label="Test"
        ></scientific-button>`
      );
      const button = el.shadowRoot!.querySelector('button')!;
      assert.isTrue(
        button.classList.contains(variant),
        `Button should have ${variant} class`
      );
    }

    const primaryEl = await fixture(
      html`<scientific-button
        .variant=${'primary'}
        label="Test"
      ></scientific-button>`
    );
    const primaryButton = primaryEl.shadowRoot!.querySelector('button')!;
    assert.isFalse(
      primaryButton.classList.contains('primary'),
      "Primary variant should not add class (it's default)"
    );
  });

  test('applies size classes correctly', async () => {
    const nonMediumSizes = ['small', 'large'] as const;

    for (const size of nonMediumSizes) {
      const el = await fixture(
        html`<scientific-button .size=${size} label="Test"></scientific-button>`
      );
      const button = el.shadowRoot!.querySelector('button')!;
      assert.isTrue(
        button.classList.contains(size),
        `Button should have ${size} class`
      );
    }

    const mediumEl = await fixture(
      html`<scientific-button
        .size=${'medium'}
        label="Test"
      ></scientific-button>`
    );
    const mediumButton = mediumEl.shadowRoot!.querySelector('button')!;
    assert.isFalse(
      mediumButton.classList.contains('medium'),
      "Medium size should not add class (it's default)"
    );
  });

  test('handles disabled state', async () => {
    const el = await fixture(
      html`<scientific-button disabled label="Disabled"></scientific-button>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    assert.isTrue(button.disabled);
    // Note: disabled doesn't add a CSS class, only the HTML disabled attribute
  });

  test('handles fullWidth property', async () => {
    const el = await fixture(
      html`<scientific-button fullWidth label="Full Width"></scientific-button>`
    );
    const button = el.shadowRoot!.querySelector('button')!;
    assert.isTrue(button.classList.contains('full-width'));
  });

  test('handles action errors gracefully', async () => {
    let errorEmitted = false;
    const errorAction = () => Promise.reject(new Error('Test error'));

    const el = await fixture<ScientificButton>(html`
      <scientific-button
        label="Error Button"
        .action=${errorAction}
        @button-click-error=${() => (errorEmitted = true)}
      ></scientific-button>
    `);

    const button = el.shadowRoot!.querySelector('button')!;
    button.click();

    await aTimeout(50);
    await el.updateComplete;

    assert.isFalse(el.loading);
    assert.isTrue(errorEmitted);
  });

  test('keyboard accessibility', async () => {
    const el = await fixture<ScientificButton>(html`
      <scientific-button label="Accessible Button"></scientific-button>
    `);

    const button = el.shadowRoot!.querySelector('button')!;

    assert.equal(button.getAttribute('type'), 'button');
    assert.isNotNull(button.textContent);
    assert.equal(button.textContent?.trim(), 'Accessible Button');
  });
});
