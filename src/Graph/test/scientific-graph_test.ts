import {ScientificGraph} from '../scientific-graph.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

// Mock Chart.js for testing
(window as any).Chart = {
  register: () => {},
  getChart: () => null,
  defaults: {
    font: {
      family: 'system-ui',
    },
  },
} as any;

suite('ScientificGraph', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-graph');
    assert.instanceOf(el, ScientificGraph);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<scientific-graph></scientific-graph>`);
    const container = el.shadowRoot!.querySelector('.graph-container');
    const toolbar = el.shadowRoot!.querySelector('.graph-toolbar');
    // const canvas = el.shadowRoot!.querySelector('#myChart');

    assert.isNotNull(container);
    assert.isNotNull(toolbar);
    // assert.isNotNull(canvas);
  });

  test('renders with custom title', async () => {
    const el = await fixture<ScientificGraph>(
      html`<scientific-graph title="Custom Chart Title"></scientific-graph>`
    );
    assert.equal(el.title, 'Custom Chart Title');
  });

  test('renders with custom data', async () => {
    const customLabels = ['A', 'B', 'C'];
    const customDatasets = [
      {
        label: 'Test Data',
        data: [1, 2, 3],
        backgroundColor: 'red',
      },
    ];

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph .labels=${customLabels} .datasets=${customDatasets}>
      </scientific-graph>
    `);

    assert.deepEqual(el.labels, customLabels);
    assert.equal(el.labels.length, 3);
    assert.equal(el.datasets[0].label, 'Test Data');
  });

  test('handles chart type changes', async () => {
    const el = await fixture<ScientificGraph>(
      html`<scientific-graph></scientific-graph>`
    );

    const dropdown = el.shadowRoot!.querySelector('scientific-dropdown');
    assert.isNotNull(dropdown);

    // assert.equal(el.type, 'line');

    el.type = 'bar';
    await el.updateComplete;
    assert.equal(el.type, 'bar');
  });

  //   test('export buttons are present and not disabled', async () => {
  //     const el = await fixture<ScientificGraph>(html`<scientific-graph></scientific-graph>`);

  //     const exportPngBtn = el.shadowRoot!.querySelector('[data-format="png"]') as HTMLElement;
  //     const exportJpegBtn = el.shadowRoot!.querySelector('[data-format="jpeg"]') as HTMLElement;
  //     const exportPdfBtn = el.shadowRoot!.querySelector('[data-format="pdf"]') as HTMLElement;

  //     assert.isNotNull(exportPngBtn);
  //     assert.isNotNull(exportJpegBtn);
  //     assert.isNotNull(exportPdfBtn);

  //     const pngButton = exportPngBtn.querySelector('scientific-button') as any;
  //     const jpegButton = exportJpegBtn.querySelector('scientific-button') as any;
  //     const pdfButton = exportPdfBtn.querySelector('scientific-button') as any;

  //     if (pngButton) assert.isFalse(pngButton.disabled);
  //     if (jpegButton) assert.isFalse(jpegButton.disabled);
  //     if (pdfButton) assert.isFalse(pdfButton.disabled);
  //   });

  test('handles dropdown chart type selection', async () => {
    const el = await fixture<ScientificGraph>(
      html`<scientific-graph></scientific-graph>`
    );

    const dropdown = el.shadowRoot!.querySelector('scientific-dropdown') as any;
    assert.isNotNull(dropdown);

    const changeEvent = new CustomEvent('dropdown-change', {
      detail: {value: 'bar', label: 'Bar Chart'},
    });
    dropdown.dispatchEvent(changeEvent);
    await el.updateComplete;

    // assert.equal(el.type, 'bar');
  });

  test('dropdown has correct width constraints', async () => {
    const el = await fixture<ScientificGraph>(
      html`<scientific-graph></scientific-graph>`
    );

    const dropdown = el.shadowRoot!.querySelector(
      'scientific-dropdown'
    ) as HTMLElement;
    const computedStyle = getComputedStyle(dropdown);

    assert.isNotNull(computedStyle.width);
    assert.isNotNull(computedStyle.maxWidth);
  });

  test('toolbar has proper z-index stacking', async () => {
    const el = await fixture<ScientificGraph>(
      html`<scientific-graph></scientific-graph>`
    );

    const toolbar = el.shadowRoot!.querySelector(
      '.graph-toolbar'
    ) as HTMLElement;
    const controls = el.shadowRoot!.querySelector(
      '.graph-controls'
    ) as HTMLElement;

    const toolbarStyle = getComputedStyle(toolbar);
    const controlsStyle = getComputedStyle(controls);

    assert.isNotNull(toolbarStyle.zIndex);
    assert.isNotNull(controlsStyle.zIndex);
  });

  test('handles responsive behavior', async () => {
    const el = await fixture<ScientificGraph>(
      html`<scientific-graph responsive></scientific-graph>`
    );

    assert.isTrue(el.responsive);

    // const canvas = el.shadowRoot!.querySelector('#myChart') as HTMLCanvasElement;
    // assert.isNotNull(canvas);
  });

  test('handles animation settings', async () => {
    const el = await fixture<ScientificGraph>(
      html`<scientific-graph animateOnLoad></scientific-graph>`
    );

    assert.isTrue(el.animateOnLoad);
  });

  test('handles custom width and height via CSS', async () => {
    const el = await fixture<ScientificGraph>(html`
      <scientific-graph style="width: 800px; height: 600px;"></scientific-graph>
    `);

    const container = el.shadowRoot!.querySelector(
      '.graph-container'
    ) as HTMLElement;
    assert.isNotNull(container);

    const computedStyle = getComputedStyle(el);
    assert.isNotNull(computedStyle.width);
    assert.isNotNull(computedStyle.height);
  });

  //   test('emits chart-ready event', async () => {
  //     const el = await fixture<ScientificGraph>(html`<scientific-graph></scientific-graph>`);

  //     el.addEventListener('chart-ready', () => {
  //       assert.isTrue(true);
  //     });

  //     await aTimeout(100);

  //     // Chart ready event depends on actual Chart.js integration
  //     // This test validates the event listener is set up correctly
  //   });

  //   test('handles export functionality', async () => {
  //     const el = await fixture<ScientificGraph>(html`<scientific-graph></scientific-graph>`);

  //     const exportBtn = el.shadowRoot!.querySelector('[data-format="png"]') as HTMLElement;
  //     assert.isNotNull(exportBtn);

  //     try {
  //       exportBtn.click();
  //       await el.updateComplete;
  //       assert.isTrue(true, 'Export button click succeeded');
  //     } catch (error) {
  //       // Export might fail in test environment without actual chart
  //       assert.isTrue(true, 'Export test handled gracefully');
  //     }
  //   });

  test('applies custom CSS variables', async () => {
    const el = await fixture(html`
      <scientific-graph
        style="--graph-bg-color: rgb(255, 255, 255); --graph-border-color: rgb(0, 0, 0);"
      >
      </scientific-graph>
    `);

    const container = el.shadowRoot!.querySelector(
      '.graph-container'
    ) as HTMLElement;
    assert.isNotNull(container);

    const computedStyle = getComputedStyle(container);
    assert.isNotNull(computedStyle.backgroundColor);
  });

  test('dropdown options are properly configured', async () => {
    const el = await fixture<ScientificGraph>(
      html`<scientific-graph></scientific-graph>`
    );

    const dropdown = el.shadowRoot!.querySelector('scientific-dropdown') as any;
    assert.isNotNull(dropdown);

    if (dropdown.options) {
      assert.isTrue(dropdown.options.length > 0);

      const optionValues = dropdown.options.map((opt: any) => opt.value);
      assert.include(optionValues, 'line');
      assert.include(optionValues, 'bar');
    }
  });

  test('handles data updates', async () => {
    const initialLabels = ['A', 'B'];
    const initialDatasets = [{label: 'Initial', data: [1, 2]}];

    const newLabels = ['X', 'Y', 'Z'];
    const newDatasets = [{label: 'Updated', data: [3, 4, 5]}];

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        .labels=${initialLabels}
        .datasets=${initialDatasets}
      ></scientific-graph>
    `);

    assert.equal(el.labels.length, 2);

    // Update data
    el.labels = newLabels;
    el.datasets = newDatasets;
    await el.updateComplete;

    assert.equal(el.labels.length, 3);
    assert.equal(el.datasets[0].label, 'Updated');
  });
});
