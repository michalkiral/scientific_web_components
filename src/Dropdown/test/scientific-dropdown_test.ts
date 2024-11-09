import { ScientificDropdown } from '../scientific-dropdown';
import { fixture, assert, aTimeout, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('scientific-dropdown', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-dropdown');
    assert.instanceOf(el, ScientificDropdown);
  });

  test('renders with default label and options', async () => {
    const el = await fixture(html`<scientific-dropdown></scientific-dropdown>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="dropdown-container">
        <label class="dropdown-label">Select an option</label>
        <div class="dropdown-select">Select an option</div>
      </div>
    `
    );
  });

  test('toggles dropdown options on click', async () => {
    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown></scientific-dropdown>
    `);

    const dropdownSelect = el.shadowRoot!.querySelector('.dropdown-select')! as HTMLButtonElement;
    dropdownSelect.click();

    await aTimeout(0);

    let optionsContainer = el.shadowRoot!.querySelector('.options-container');
    assert.ok(optionsContainer, 'Dropdown options should be visible');

    dropdownSelect.click();
    await aTimeout(0);

    optionsContainer = el.shadowRoot!.querySelector('.options-container');
    assert.isNull(optionsContainer, 'Dropdown options should be hidden');
  });

  test('selects an option and updates selectedValue', async () => {
    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown></scientific-dropdown>
    `);

    el.isOpen = true;
    await el.updateComplete;

    const optionToSelect = el.shadowRoot!.querySelector('.option')! as HTMLButtonElement;
    optionToSelect.click();

    assert.equal(el.selectedValue, 'Option 1', 'selectedValue should update to the clicked option');
  });

  test('dispatches "option-selected" event with correct detail', async () => {
    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown></scientific-dropdown>
    `);

    el.isOpen = true;
    await el.updateComplete;

    const optionToSelect = el.shadowRoot!.querySelector('.option')! as HTMLButtonElement;

    setTimeout(() => optionToSelect.click());
    const event = await oneEvent(el, 'option-selected');

    assert.equal(event.detail, 'Option 1', 'event detail should contain the selected option value');
  });
});
