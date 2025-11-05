import {ScientificDropdown} from '../scientific-dropdown';
import {fixture, assert, aTimeout} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('ScientificDropdown', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-dropdown');
    assert.instanceOf(el, ScientificDropdown);
  });

  test('renders with default values', async () => {
    const el = await fixture<ScientificDropdown>(
      html`<scientific-dropdown></scientific-dropdown>`
    );

    const container = el.shadowRoot!.querySelector('.dropdown-container');
    const select = el.shadowRoot!.querySelector('.dropdown-select');

    assert.isNotNull(container);
    assert.isNotNull(select);
    assert.isFalse(el.isOpen);
    assert.isFalse(el.disabled);
    assert.equal(el.label, 'Select an option');
    assert.equal(el.placeholder, 'Select an option');
    assert.equal(el.theme, 'default');
  });

  test('renders with custom label and placeholder', async () => {
    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown
        label="Choose Option"
        placeholder="Pick something..."
      ></scientific-dropdown>
    `);

    const label = el.shadowRoot!.querySelector('.dropdown-label');
    const placeholder = el.shadowRoot!.querySelector('.dropdown-placeholder');

    assert.isNotNull(label);
    assert.include(label!.textContent!, 'Choose Option');
    assert.include(placeholder!.textContent!, 'Pick something...');
  });

  test('handles custom options correctly', async () => {
    const customOptions = [
      {label: 'First Option', value: 'first'},
      {label: 'Second Option', value: 'second'},
      {label: 'Third Option', value: 'third'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown .options=${customOptions}></scientific-dropdown>
    `);

    assert.equal(el.options.length, 3);
    assert.equal(el.options[0].label, 'First Option');
    assert.equal(el.options[0].value, 'first');
  });

  test('opens and closes dropdown on click', async () => {
    const el = await fixture<ScientificDropdown>(
      html`<scientific-dropdown></scientific-dropdown>`
    );

    const select = el.shadowRoot!.querySelector(
      '.dropdown-select'
    ) as HTMLElement;

    assert.isFalse(el.isOpen);

    select.click();
    await el.updateComplete;
    assert.isTrue(el.isOpen);

    select.click();
    await el.updateComplete;
    assert.isFalse(el.isOpen);
  });

  test('handles option selection', async () => {
    const customOptions = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown .options=${customOptions}></scientific-dropdown>
    `);

    const select = el.shadowRoot!.querySelector(
      '.dropdown-select'
    ) as HTMLElement;
    select.click();
    await el.updateComplete;

    el.selectOption(customOptions[0]);
    await el.updateComplete;

    assert.equal(el.selectedValue, 'apple');
    assert.isFalse(el.isOpen);
  });

  test('handles disabled state', async () => {
    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown disabled></scientific-dropdown>
    `);

    const select = el.shadowRoot!.querySelector('.dropdown-select');

    assert.isTrue(el.disabled);
    assert.include(select!.className, 'disabled');

    (select as HTMLElement).click();
    await el.updateComplete;
    assert.isFalse(el.isOpen);
  });

  test('handles searchable functionality', async () => {
    const customOptions = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Cherry', value: 'cherry'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown
        .options=${customOptions}
        searchable
        searchPlaceholder="Search fruits..."
      ></scientific-dropdown>
    `);

    assert.isTrue(el.searchable);
    assert.equal(el.searchPlaceholder, 'Search fruits...');

    const select = el.shadowRoot!.querySelector(
      '.dropdown-select'
    ) as HTMLElement;
    select.click();
    await el.updateComplete;
    await aTimeout(50);

    const searchInput = el.shadowRoot!.querySelector('.search-input');
    assert.isNotNull(searchInput);
  });

  test('handles clearable functionality', async () => {
    const customOptions = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown
        .options=${customOptions}
        clearable
        selectedValue="apple"
      ></scientific-dropdown>
    `);

    assert.isTrue(el.clearable);
    assert.equal(el.selectedValue, 'apple');

    await el.updateComplete;

    const clearButton = el.shadowRoot!.querySelector(
      '.clear-button'
    ) as HTMLElement;
    assert.isNotNull(clearButton);

    clearButton.click();
    await el.updateComplete;

    assert.equal(el.selectedValue, '');
  });

  test('handles keyboard navigation', async () => {
    const customOptions = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Cherry', value: 'cherry'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown .options=${customOptions}></scientific-dropdown>
    `);

    const container = el.shadowRoot!.querySelector(
      '.dropdown-container'
    ) as HTMLElement;

    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    });
    container.dispatchEvent(enterEvent);
    await el.updateComplete;

    assert.isTrue(el.isOpen);

    const escapeEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
    });
    container.dispatchEvent(escapeEvent);
    await el.updateComplete;

    assert.isFalse(el.isOpen);
  });

  test('emits option-selected event', async () => {
    let selectedOption: any = null;

    const customOptions = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown
        .options=${customOptions}
        @option-selected=${(e: CustomEvent) => {
          selectedOption = e.detail;
        }}
      ></scientific-dropdown>
    `);

    el.selectOption(customOptions[0]);
    await el.updateComplete;

    assert.isNotNull(selectedOption);
    assert.equal(selectedOption.value, 'apple');
    assert.equal(selectedOption.label, 'Apple');
    assert.property(selectedOption, 'timestamp');
  });

  test('emits change event', async () => {
    let changeEvent: any = null;

    const customOptions = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown
        .options=${customOptions}
        @change=${(e: CustomEvent) => {
          changeEvent = e.detail;
        }}
      ></scientific-dropdown>
    `);

    el.selectOption(customOptions[1]);
    await el.updateComplete;

    assert.isNotNull(changeEvent);
    assert.equal(changeEvent.value, 'banana');
    assert.equal(changeEvent.label, 'Banana');
  });

  test('handles no options scenario', async () => {
    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown
        .options=${[]}
        noOptionsText="No fruits available"
      ></scientific-dropdown>
    `);

    assert.equal(el.options.length, 0);
    assert.equal(el.noOptionsText, 'No fruits available');

    const select = el.shadowRoot!.querySelector(
      '.dropdown-select'
    ) as HTMLElement;
    select.click();
    await el.updateComplete;

    const optionsContainer = el.shadowRoot!.querySelector('.options-container');
    if (optionsContainer) {
      const noOptionsMessage = optionsContainer.querySelector('.no-options');
      assert.isNotNull(noOptionsMessage);
    }
  });

  test('handles search filtering', async () => {
    const customOptions = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Cherry', value: 'cherry'},
      {label: 'Apricot', value: 'apricot'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown
        .options=${customOptions}
        searchable
      ></scientific-dropdown>
    `);

    el.searchTerm = 'ap';
    await el.updateComplete;

    const filteredOptions = el.filteredOptions;
    assert.equal(filteredOptions.length, 2);
    assert.equal(filteredOptions[0].label, 'Apple');
    assert.equal(filteredOptions[1].label, 'Apricot');
  });

  test('handles click outside to close', async () => {
    const el = await fixture<ScientificDropdown>(
      html`<scientific-dropdown></scientific-dropdown>`
    );

    const select = el.shadowRoot!.querySelector(
      '.dropdown-select'
    ) as HTMLElement;
    select.click();
    await el.updateComplete;
    assert.isTrue(el.isOpen);

    const outsideClickEvent = new MouseEvent('click', {
      bubbles: true,
      composed: true,
    });
    document.body.dispatchEvent(outsideClickEvent);
    await el.updateComplete;

    assert.isFalse(el.isOpen);
  });

  test('displays selected value correctly', async () => {
    const customOptions = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ];

    const el = await fixture<ScientificDropdown>(html`
      <scientific-dropdown
        .options=${customOptions}
        selectedValue="banana"
      ></scientific-dropdown>
    `);

    await el.updateComplete;

    const selectText = el.shadowRoot!.querySelector('.dropdown-select span');
    assert.include(selectText!.textContent!, 'Banana');
  });

  test('supports accessibility attributes', async () => {
    const el = await fixture<ScientificDropdown>(
      html`<scientific-dropdown></scientific-dropdown>`
    );

    const select = el.shadowRoot!.querySelector('.dropdown-select');
    const container = el.shadowRoot!.querySelector('.dropdown-container');

    assert.equal(select!.getAttribute('role'), 'combobox');
    assert.equal(select!.getAttribute('aria-expanded'), 'false');
    assert.equal(select!.getAttribute('aria-haspopup'), 'true');
    assert.equal(container!.getAttribute('tabindex'), '0');
  });
});
