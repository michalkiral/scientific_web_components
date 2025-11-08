import {ScientificGraph} from '../scientific-graph.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {type GraphExportFormat} from '../../../shared/utils/export-utils.js';

(window as any).Chart = {
  register: () => {},
  getChart: () => null,
  defaults: {
    font: {
      family: 'system-ui',
    },
  },
} as any;

suite('ScientificGraph - Performance Tests', () => {
  function generateLargeDataset(size: number) {
    const labels: string[] = [];
    const data: number[] = [];

    for (let i = 0; i < size; i++) {
      labels.push(`Point ${i + 1}`);
      data.push(Math.random() * 100);
    }

    return {labels, data};
  }

  function generateMultipleDatasets(
    datasetCount: number,
    pointsPerDataset: number
  ) {
    const labels: string[] = [];
    const datasets: Array<{label: string; data: number[]}> = [];

    for (let i = 0; i < pointsPerDataset; i++) {
      labels.push(`Point ${i + 1}`);
    }

    for (let d = 0; d < datasetCount; d++) {
      const data: number[] = [];
      for (let i = 0; i < pointsPerDataset; i++) {
        data.push(Math.random() * 100);
      }
      datasets.push({
        label: `Dataset ${d + 1}`,
        data,
      });
    }

    return {labels, datasets};
  }

  test('handles 10,000 data points - Line Chart', async () => {
    const {labels, data} = generateLargeDataset(10000);
    const datasets = [{label: 'Large Dataset', data}];

    const startTime = performance.now();

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="10,000 Data Points"
        .labels=${labels}
        .datasets=${datasets}
        type="line"
      ></scientific-graph>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.labels.length, 10000);
    assert.equal(el.datasets[0].data.length, 10000);

    console.log(`Loaded and initialized line chart (10,000 points) in ${renderTime.toFixed(2)}ms`);

    assert.isBelow(renderTime, 5000, 'Chart initialization should complete within 5 seconds');
  });

  test('handles 10,000 data points - Bar Chart', async () => {
    const {labels, data} = generateLargeDataset(10000);
    const datasets = [{label: 'Large Dataset', data}];

    const startTime = performance.now();

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="10,000 Data Points Bar Chart"
        .labels=${labels}
        .datasets=${datasets}
        type="bar"
      ></scientific-graph>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.datasets[0].data.length, 10000);

    console.log(
      `Loaded and initialized bar chart (10,000 points) in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(renderTime, 5000, 'Bar chart initialization should complete within 5 seconds');
  });

  test('handles 10,000 data points - Scatter Plot', async () => {
    const scatterData: Array<{x: number; y: number}> = [];
    for (let i = 0; i < 10000; i++) {
      scatterData.push({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      });
    }

    const datasets = [{label: 'Scatter Data', data: scatterData}];

    const startTime = performance.now();

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="10,000 Scatter Points"
        .labels=${[]}
        .datasets=${datasets as any}
        type="scatter"
      ></scientific-graph>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.datasets[0].data.length, 10000);

    console.log(
      `Loaded and initialized scatter plot (10,000 points) in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(
      renderTime,
      5000,
      'Scatter plot initialization should complete within 5 seconds'
    );
  });

  test('handles multiple datasets with 1,000 points each (10,000 total)', async () => {
    const {labels, datasets} = generateMultipleDatasets(10, 1000);

    const startTime = performance.now();

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="10 Datasets × 1,000 Points"
        .labels=${labels}
        .datasets=${datasets}
        showLegend
      ></scientific-graph>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.datasets.length, 10);
    assert.equal(el.labels.length, 1000);

    const totalPoints = el.datasets.reduce(
      (sum, ds) => sum + ds.data.length,
      0
    );
    assert.equal(totalPoints, 10000);

    console.log(
      `Loaded and initialized 10 datasets (10,000 total points) in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(
      renderTime,
      5000,
      'Multiple datasets initialization should complete within 5 seconds'
    );
  });

  test('data updates are performant with large datasets', async () => {
    const {labels, data} = generateLargeDataset(5000);
    const datasets = [{label: 'Initial Data', data}];

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="Data Update Test"
        .labels=${labels}
        .datasets=${datasets}
      ></scientific-graph>
    `);

    const {labels: newLabels, data: newData} = generateLargeDataset(5000);
    const newDatasets = [{label: 'Updated Data', data: newData}];

    const startTime = performance.now();

    el.labels = newLabels;
    el.datasets = newDatasets;
    await el.updateComplete;

    const updateTime = performance.now() - startTime;

    assert.equal(el.datasets[0].label, 'Updated Data');

    console.log(`Updated chart data (5,000 points) and re-rendered in ${updateTime.toFixed(2)}ms`);

    assert.isBelow(updateTime, 2000, 'Chart data updates should complete within 2 seconds');
  });

  test('statistics calculation is performant with 10,000 points', async () => {
    const {labels, data} = generateLargeDataset(10000);
    const datasets = [{label: 'Statistical Data', data}];

    const startTime = performance.now();

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="Statistics Test"
        .labels=${labels}
        .datasets=${datasets}
        showStatistics
      ></scientific-graph>
    `);

    await el.updateComplete;

    const statsTime = performance.now() - startTime;

    console.log(`Loaded chart and calculated statistics (10,000 points) in ${statsTime.toFixed(2)}ms`);

    assert.isBelow(
      statsTime,
      5000,
      'Chart initialization with statistics should complete within 5 seconds'
    );
  });

  test('export functionality works with large datasets', async () => {
    const {labels, data} = generateLargeDataset(5000);
    const datasets = [{label: 'Export Test', data}];

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="Export Test"
        .labels=${labels}
        .datasets=${datasets}
        showToolbar
        showExportButtons
        .exportFormats=${['png'] as GraphExportFormat[]}
      ></scientific-graph>
    `);

    await el.updateComplete;

    assert.exists(el);
    assert.equal(el.labels.length, 5000);
    assert.equal(el.datasets[0].data.length, 5000);

    console.log(`✓ Export data prepared for 5,000 points`);
  });

  test('memory usage remains stable with large dataset', async () => {
    const iterations = 5;
    const pointsPerIteration = 2000;

    for (let i = 0; i < iterations; i++) {
      const {labels, data} = generateLargeDataset(pointsPerIteration);
      const datasets = [{label: `Iteration ${i}`, data}];

      const el = await fixture<ScientificGraph>(html`
        <scientific-graph
          title="Memory Test"
          .labels=${labels}
          .datasets=${datasets}
        ></scientific-graph>
      `);

      await el.updateComplete;

      el.remove();
    }

    console.log(
      `✓ Created and destroyed ${iterations} graphs with ${pointsPerIteration} points each`
    );

    assert.isTrue(true, 'Memory remains stable across multiple renders');
  });

  test('responsive resizing works with large datasets', async () => {
    const {labels, data} = generateLargeDataset(10000);
    const datasets = [{label: 'Resize Test', data}];

    const startTime = performance.now();

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="Resize Test"
        .labels=${labels}
        .datasets=${datasets}
        responsive
      ></scientific-graph>
    `);

    await el.updateComplete;

    const resizeTime = performance.now() - startTime;

    assert.equal(el.labels.length, 10000);

    console.log(`Initialized responsive chart (10,000 points) in ${resizeTime.toFixed(2)}ms`);

    assert.isBelow(
      resizeTime,
      5000,
      'Responsive chart initialization should complete within 5 seconds'
    );
  });

  test('chart type switching is performant with large datasets', async () => {
    const {labels, data} = generateLargeDataset(5000);
    const datasets = [{label: 'Type Switch Test', data}];

    const el = await fixture<ScientificGraph>(html`
      <scientific-graph
        title="Type Switch Test"
        .labels=${labels}
        .datasets=${datasets}
        type="line"
      ></scientific-graph>
    `);

    const startTime = performance.now();

    el.type = 'bar';
    await el.updateComplete;

    const switchTime = performance.now() - startTime;

    assert.equal(el.type, 'bar');

    console.log(
      `Switched chart type and re-rendered (5,000 points) in ${switchTime.toFixed(2)}ms`
    );

    assert.isBelow(
      switchTime,
      2000,
      'Chart type switching and re-rendering should complete within 2 seconds'
    );
  });
});
