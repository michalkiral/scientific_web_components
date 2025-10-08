import {ScientificInput} from '../scientific-input.js';
import {fixture, assert, aTimeout} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('ScientificInput', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-input');
    assert.instanceOf(el, ScientificInput);
  });

  test('renders with default values', async () => {
    const el = await fixture<ScientificInput>(
      html`<scientific-input></scientific-input>`
    );
    const container = el.shadowRoot!.querySelector('.input-container');
    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    assert.isNotNull(container);
    assert.isNotNull(input);
    assert.equal(input.placeholder, 'Type to search...');
    assert.equal(el.value, '');
    assert.equal(el.state, 'default');
    assert.isFalse(el.disabled);
    assert.isFalse(el.required);
    assert.isTrue(el.clearable);
    assert.isTrue(el.autoComplete);
  });

  test('renders with custom label and placeholder', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input
        label="Custom Label"
        placeholder="Custom placeholder"
      ></scientific-input>
    `);

    const label = el.shadowRoot!.querySelector('.input-label');
    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    assert.isNotNull(label);
    assert.include(label!.textContent!, 'Custom Label');
    assert.equal(input.placeholder, 'Custom placeholder');
  });

  test('applies state classes correctly', async () => {
    const states = ['default', 'error', 'success'] as const;

    for (const state of states) {
      const el = await fixture<ScientificInput>(html`
        <scientific-input .state=${state}></scientific-input>
      `);
      const input = el.shadowRoot!.querySelector('.input-field')!;

      if (state !== 'default') {
        assert.include(
          input.className,
          state,
          `Input should have ${state} class`
        );
      } else {
        assert.notInclude(
          input.className,
          'default',
          'Default state should not add class'
        );
      }
    }
  });

  test('handles disabled state', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input disabled></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;
    assert.isTrue(input.disabled);
    assert.isTrue(el.disabled);
  });

  test('shows required indicator', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input label="Required Field" required></scientific-input>
    `);

    const label = el.shadowRoot!.querySelector('.input-label');
    assert.include(label!.className, 'required');
    assert.isTrue(el.required);
  });

  test('handles input events', async () => {
    let inputEventFired = false;
    let changeEventFired = false;
    let inputValue = '';

    const el = await fixture<ScientificInput>(html`
      <scientific-input
        @input=${(e: CustomEvent) => {
          inputEventFired = true;
          inputValue = e.detail.value;
        }}
        @change=${() => (changeEventFired = true)}
      ></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.value = 'test input';
    input.dispatchEvent(new Event('input', {bubbles: true}));

    await el.updateComplete;

    assert.isTrue(inputEventFired, 'Input event should be fired');
    assert.isTrue(changeEventFired, 'Change event should be fired');
    assert.equal(inputValue, 'test input');
    assert.equal(el.value, 'test input');
  });

  test('handles option selection', async () => {
    let optionSelectedFired = false;
    let selectedOption: any = null;

    const options = [
      {label: 'Option 1', value: 'opt1'},
      {label: 'Option 2', value: 'opt2'},
      {label: 'Option 3', value: 'opt3'},
    ];

    const el = await fixture<ScientificInput>(html`
      <scientific-input
        .options=${options}
        @option-selected=${(e: CustomEvent) => {
          optionSelectedFired = true;
          selectedOption = e.detail;
        }}
      ></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    const firstOption = el.shadowRoot!.querySelector('.option') as HTMLElement;
    assert.isNotNull(firstOption, 'First option should be rendered');

    firstOption.click();
    await el.updateComplete;

    assert.isTrue(optionSelectedFired, 'Option selected event should be fired');
    assert.equal(selectedOption.value, 'opt1');
    assert.equal(selectedOption.label, 'Option 1');
    assert.equal(el.value, 'opt1');
  });

  test('filters options based on input', async () => {
    const options = [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Cherry', value: 'cherry'},
      {label: 'Apricot', value: 'apricot'},
    ];

    const el = await fixture<ScientificInput>(html`
      <scientific-input .options=${options}></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.value = 'ap';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    await el.updateComplete;
    await aTimeout(200);
    await el.updateComplete;

    const displayedOptions = el.shadowRoot!.querySelectorAll('.option');
    assert.equal(
      displayedOptions.length,
      2,
      'Should show 2 options containing "ap"'
    );
  });

  test('handles keyboard navigation', async () => {
    const options = [
      {label: 'Option 1', value: 'opt1'},
      {label: 'Option 2', value: 'opt2'},
      {label: 'Option 3', value: 'opt3'},
    ];

    const el = await fixture<ScientificInput>(html`
      <scientific-input .options=${options}></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    await el.updateComplete;

    const highlightedOption = el.shadowRoot!.querySelector(
      '.option.highlighted'
    );
    assert.isNotNull(
      highlightedOption,
      'First option should be highlighted after ArrowDown'
    );

    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp'}));
    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    await el.updateComplete;

    const dropdown = el.shadowRoot!.querySelector('.options-container');
    assert.isNull(dropdown, 'Dropdown should be closed after Escape');
  });

  test('handles Enter key selection', async () => {
    let optionSelectedFired = false;
    let selectedValue = '';

    const options = [
      {label: 'Option 1', value: 'opt1'},
      {label: 'Option 2', value: 'opt2'},
    ];

    const el = await fixture<ScientificInput>(html`
      <scientific-input
        .options=${options}
        @option-selected=${(e: CustomEvent) => {
          optionSelectedFired = true;
          selectedValue = e.detail.value;
        }}
      ></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    await el.updateComplete;

    assert.isTrue(
      optionSelectedFired,
      'Option should be selected with Enter key'
    );
    assert.equal(selectedValue, 'opt1');
  });

  test('handles clear functionality', async () => {
    let clearEventFired = false;

    const el = await fixture<ScientificInput>(html`
      <scientific-input
        value="test value"
        clearable
        @option-cleared=${() => (clearEventFired = true)}
      ></scientific-input>
    `);

    await el.updateComplete;

    const clearButton = el.shadowRoot!.querySelector(
      '.clear-button'
    ) as HTMLButtonElement;
    assert.isNotNull(
      clearButton,
      'Clear button should be visible when there is a value'
    );

    clearButton.click();
    await el.updateComplete;

    assert.isTrue(clearEventFired, 'Clear event should be fired');
    assert.equal(el.value, '', 'Value should be cleared');
  });

  test('handles custom values when allowed', async () => {
    let customValueSelectedFired = false;
    let customValue = '';

    const el = await fixture<ScientificInput>(html`
      <scientific-input
        allowCustomValues
        .options=${[{label: 'Existing', value: 'existing'}]}
        @custom-value-selected=${(e: CustomEvent) => {
          customValueSelectedFired = true;
          customValue = e.detail.value;
        }}
      ></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.value = 'custom value';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    await el.updateComplete;

    assert.isTrue(
      customValueSelectedFired,
      'Custom value selected event should be fired'
    );
    assert.equal(customValue, 'custom value');
    assert.equal(el.value, 'custom value');
  });

  test('displays helper text', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input helperText="This is helper text"></scientific-input>
    `);

    const helperText = el.shadowRoot!.querySelector('.scientific-message');
    assert.isNotNull(helperText);
    assert.include(helperText!.textContent!, 'This is helper text');
  });

  test('displays error message when in error state', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input
        state="error"
        errorMessage="This is an error"
      ></scientific-input>
    `);

    const errorMessage = el.shadowRoot!.querySelector(
      '.scientific-message.scientific-message--error'
    );
    assert.isNotNull(errorMessage);
    assert.include(errorMessage!.textContent!, 'This is an error');
  });

  test('displays success message when in success state', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input
        state="success"
        successMessage="This is success"
      ></scientific-input>
    `);

    const successMessage = el.shadowRoot!.querySelector(
      '.scientific-message.scientific-message--success'
    );
    assert.isNotNull(successMessage);
    assert.include(successMessage!.textContent!, 'This is success');
  });

  test('displays icon when provided', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input icon="🔍"></scientific-input>
    `);

    const icon = el.shadowRoot!.querySelector('.input-icon');
    assert.isNotNull(icon);
    assert.include(icon!.textContent!, '🔍');
  });

  test('handles disabled options', async () => {
    const options = [
      {label: 'Enabled Option', value: 'enabled'},
      {label: 'Disabled Option', value: 'disabled', disabled: true},
    ];

    const el = await fixture<ScientificInput>(html`
      <scientific-input .options=${options}></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    const disabledOption = el.shadowRoot!.querySelector(
      '.option.disabled'
    ) as HTMLElement;
    assert.isNotNull(
      disabledOption,
      'Disabled option should be rendered with disabled class'
    );

    disabledOption.click();
    await el.updateComplete;

    assert.equal(
      el.value,
      '',
      'Value should not change when clicking disabled option'
    );
  });

  test('handles grouped options', async () => {
    const options = [
      {label: 'Option 1', value: 'opt1', group: 'Group A'},
      {label: 'Option 2', value: 'opt2', group: 'Group A'},
      {label: 'Option 3', value: 'opt3', group: 'Group B'},
    ];

    const el = await fixture<ScientificInput>(html`
      <scientific-input .options=${options}></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    const groups = el.shadowRoot!.querySelectorAll('.option-group');
    assert.equal(groups.length, 2, 'Should render 2 group headers');
    assert.include(groups[0].textContent!.toUpperCase(), 'GROUP A');
    assert.include(groups[1].textContent!.toUpperCase(), 'GROUP B');
  });

  test('handles focus and blur events', async () => {
    let focusEventFired = false;
    let blurEventFired = false;

    const el = await fixture<ScientificInput>(html`
      <scientific-input
        @focus=${() => (focusEventFired = true)}
        @blur=${() => (blurEventFired = true)}
      ></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    assert.isTrue(focusEventFired, 'Focus event should be fired');

    input.blur();
    input.dispatchEvent(new Event('blur'));
    await aTimeout(200);

    assert.isTrue(blurEventFired, 'Blur event should be fired');
  });

  test('handles no options text', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input
        .options=${[{label: 'Option 1', value: 'opt1'}]}
        noOptionsText="No results found"
      ></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.value = 'xyz';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    await el.updateComplete;
    // Wait for debounced filtering (150ms + buffer)
    await aTimeout(200);
    await el.updateComplete;

    const noOptions = el.shadowRoot!.querySelector('.no-options');
    assert.isNotNull(noOptions);
    assert.include(noOptions!.textContent!, 'No results found');
  });

  test('handles autoFocus property', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input autoFocus></scientific-input>
    `);

    await el.updateComplete;

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;
    assert.isTrue(el.autoFocus);
    assert.isNotNull(input);
  });

  test('supports tab autocompletion', async () => {
    const options = [
      {label: 'Apple', value: 'apple'},
      {label: 'Application', value: 'app'},
      {label: 'Banana', value: 'banana'},
    ];

    const el = await fixture<ScientificInput>(html`
      <scientific-input .options=${options}></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.value = 'App';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    await el.updateComplete;
    // Wait for debounced filtering (150ms + buffer)
    await aTimeout(200);
    await el.updateComplete;

    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      })
    );
    await el.updateComplete;

    assert.equal(el.value, 'Apple');
  });

  test('respects maxLength property', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input maxLength="5"></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;
    assert.equal(input.maxLength, 5);
  });

  test('handles click outside to close dropdown', async () => {
    const el = await fixture<ScientificInput>(html`
      <scientific-input
        .options=${[{label: 'Option', value: 'opt'}]}
      ></scientific-input>
    `);

    const input = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    let dropdown = el.shadowRoot!.querySelector('.options-container');
    assert.isNotNull(dropdown, 'Dropdown should be open');

    document.dispatchEvent(new Event('click'));
    await el.updateComplete;

    dropdown = el.shadowRoot!.querySelector('.options-container');
    assert.isNull(dropdown, 'Dropdown should be closed after clicking outside');
  });
});
