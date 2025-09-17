import {ScientificSlider} from '../scientific-slider';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('scientific-slider', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-slider');
    assert.instanceOf(el, ScientificSlider);
  });

  test('sets custom min, max, and step properties', async () => {
    const el = await fixture<ScientificSlider>(html`
      <scientific-slider min="10" max="50" step="5"></scientific-slider>
    `);
    assert.equal(el.min, 10);
    assert.equal(el.max, 50);
    assert.equal(el.step, 5);

    const rangeInput = el.shadowRoot!.querySelector(
      '.slider-input'
    ) as HTMLInputElement;
    assert.equal(rangeInput.min, '10');
    assert.equal(rangeInput.max, '50');
    assert.equal(rangeInput.step, '5');
  });

  test('updates value when slider is changed', async () => {
    const el = await fixture<ScientificSlider>(html`
      <scientific-slider
        min="0"
        max="100"
        step="10"
        value="50"
      ></scientific-slider>
    `);

    const rangeInput = el.shadowRoot!.querySelector(
      '.slider-input'
    ) as HTMLInputElement;
    rangeInput.value = '70';
    rangeInput.dispatchEvent(new Event('input'));

    assert.equal(el.value, 70, 'Slider value should be updated');
    assert.equal(
      rangeInput.value,
      '70',
      'Range input value should reflect the updated slider value'
    );
  });

  test('dispatches value-changed event on slider change', async () => {
    const el = await fixture<ScientificSlider>(
      html`<scientific-slider></scientific-slider>`
    );

    let receivedValue = null;
    el.addEventListener('value-changed', (event: any) => {
      receivedValue = event.detail.value;
    });

    const rangeInput = el.shadowRoot!.querySelector(
      '.slider-input'
    ) as HTMLInputElement;
    rangeInput.value = '25';
    rangeInput.dispatchEvent(new Event('input'));

    assert.equal(
      receivedValue,
      25,
      'Event detail should contain the updated value'
    );
  });

  test('displays label and description correctly', async () => {
    const el = await fixture<ScientificSlider>(html`
      <scientific-slider label="Test Label" description="Test Description">
      </scientific-slider>
    `);

    const label = el.shadowRoot!.querySelector('.slider-label');
    const description = el.shadowRoot!.querySelector('.slider-description');

    assert.equal(
      label?.textContent?.trim(),
      'Test Label',
      'Label should be displayed'
    );
    assert.equal(
      description?.textContent?.trim(),
      'Test Description',
      'Description should be displayed'
    );
  });

  test('handles keyboard navigation', async () => {
    const el = await fixture<ScientificSlider>(html`
      <scientific-slider
        min="0"
        max="100"
        step="10"
        value="50"
      ></scientific-slider>
    `);

    const thumb = el.shadowRoot!.querySelector('.slider-thumb') as HTMLElement;

    thumb.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight'}));
    assert.equal(el.value, 60, 'Arrow right should increase value by step');

    thumb.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft'}));
    assert.equal(el.value, 50, 'Arrow left should decrease value by step');

    thumb.dispatchEvent(new KeyboardEvent('keydown', {key: 'Home'}));
    assert.equal(el.value, 0, 'Home key should set value to minimum');

    thumb.dispatchEvent(new KeyboardEvent('keydown', {key: 'End'}));
    assert.equal(el.value, 100, 'End key should set value to maximum');
  });

  test('respects disabled state', async () => {
    const el = await fixture<ScientificSlider>(html`
      <scientific-slider disabled value="50"></scientific-slider>
    `);

    const initialValue = el.value;
    const rangeInput = el.shadowRoot!.querySelector(
      '.slider-input'
    ) as HTMLInputElement;

    rangeInput.value = '70';
    rangeInput.dispatchEvent(new Event('input'));

    assert.equal(
      el.value,
      initialValue,
      'Value should not change when disabled'
    );
    assert.isTrue(rangeInput.disabled, 'Range input should be disabled');
  });

  test('formats values with custom formatter', async () => {
    const el = await fixture<ScientificSlider>(html`
      <scientific-slider value="50" unit="%" showValue></scientific-slider>
    `);

    el.formatValue = (value: number) => `${value}% Custom`;
    el.requestUpdate();
    await el.updateComplete;

    const valueDisplay = el.shadowRoot!.querySelector('.slider-value-display');
    assert.include(
      valueDisplay?.textContent,
      'Custom',
      'Custom formatter should be used'
    );
  });

  test('handles marks correctly', async () => {
    const marks = [
      {value: 0, label: 'Min'},
      {value: 50, label: 'Mid'},
      {value: 100, label: 'Max'},
    ];

    const el = await fixture<ScientificSlider>(html`
      <scientific-slider .marks=${marks}></scientific-slider>
    `);

    const markElements = el.shadowRoot!.querySelectorAll('.slider-mark');
    assert.equal(markElements.length, 3, 'Should render all marks');

    const markLabels = el.shadowRoot!.querySelectorAll('.slider-mark-label');
    assert.equal(
      markLabels[0]?.textContent,
      'Min',
      'First mark label should be correct'
    );
    assert.equal(
      markLabels[1]?.textContent,
      'Mid',
      'Second mark label should be correct'
    );
    assert.equal(
      markLabels[2]?.textContent,
      'Max',
      'Third mark label should be correct'
    );
  });
});
