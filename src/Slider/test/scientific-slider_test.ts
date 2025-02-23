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

    const rangeInput = el.shadowRoot!.querySelector('.range-input') as HTMLInputElement;
    assert.equal(rangeInput.min, '10');
    assert.equal(rangeInput.max, '50');
    assert.equal(rangeInput.step, '5');
  });

  test('updates value when slider is changed', async () => {
    const el = await fixture<ScientificSlider>(html`
      <scientific-slider min="0" max="100" step="10" value="50"></scientific-slider>
    `);
    
    const rangeInput = el.shadowRoot!.querySelector('.range-input') as HTMLInputElement;
    rangeInput.value = '70';
    rangeInput.dispatchEvent(new Event('input'));

    assert.equal(el.value, 70, 'Slider value should be updated');
    assert.equal(rangeInput.value, '70', 'Range input value should reflect the updated slider value');
  });

  test('dispatches value-changed event on slider change', async () => {
    const el = await fixture<ScientificSlider>(html`<scientific-slider></scientific-slider>`);

    let receivedValue = null;
    el.addEventListener('value-changed', (event: any) => {
      receivedValue = event.detail;
    });

    const rangeInput = el.shadowRoot!.querySelector('.range-input') as HTMLInputElement;
    rangeInput.value = '25';
    rangeInput.dispatchEvent(new Event('input'));

    assert.equal(receivedValue, 25, 'Event detail should contain the updated value');
  });

  test('calculates ticks correctly based on min and max values', async () => {
    const el = await fixture<ScientificSlider>(html`
      <scientific-slider min="0" max="50" tickCount="10"></scientific-slider>
    `);

    const expectedTicks = [0, 6, 11, 17, 22, 28, 33, 39, 44, 50];
    assert.deepEqual(el['ticks'], expectedTicks, 'Ticks should be calculated based on min and max');
  });
});
