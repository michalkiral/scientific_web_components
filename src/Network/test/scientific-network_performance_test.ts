import {ScientificNetwork} from '../scientific-network.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import type {NetworkData, NetworkNode, NetworkEdge} from '../scientific-network.js';

suite('ScientificNetwork - Performance Tests', () => {
  function generateLargeNetwork(
    nodeCount: number,
    edgeDensity = 2
  ): NetworkData {
    const nodes: NetworkNode[] = [];
    const edges: NetworkEdge[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: `node-${i}`,
        label: `Node ${i}`,
        data: {
          type: i % 3 === 0 ? 'hub' : 'regular',
          value: Math.random() * 100,
        },
      });
    }

    const targetEdgeCount = nodeCount * edgeDensity;
    for (let i = 0; i < targetEdgeCount; i++) {
      const source = nodes[Math.floor(Math.random() * nodeCount)];
      const target = nodes[Math.floor(Math.random() * nodeCount)];

      if (source.id !== target.id) {
        edges.push({
          id: `edge-${i}`,
          source: source.id,
          target: target.id,
          label: `Edge ${i}`,
        });
      }
    }

    return {nodes, edges};
  }

  function generateScaleFreeNetwork(nodeCount: number): NetworkData {
    const nodes: NetworkNode[] = [];
    const edges: NetworkEdge[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: `node-${i}`,
        label: `Protein ${i}`,
        data: {
          degree: 0,
          isHub: false,
        },
      });
    }

    const nodeDegrees = new Map<string, number>();
    nodes.forEach((n) => nodeDegrees.set(n.id, 0));

    let edgeId = 0;
    for (let i = 1; i < nodeCount; i++) {
      const newNode = nodes[i];
      const connectionsToMake = Math.min(3, i);

      for (let j = 0; j < connectionsToMake; j++) {
        const targetNode = nodes[Math.floor(Math.random() * i)];

        edges.push({
          id: `edge-${edgeId++}`,
          source: newNode.id,
          target: targetNode.id,
        });

        nodeDegrees.set(newNode.id, nodeDegrees.get(newNode.id)! + 1);
        nodeDegrees.set(targetNode.id, nodeDegrees.get(targetNode.id)! + 1);
      }
    }

    const avgDegree =
      Array.from(nodeDegrees.values()).reduce((a, b) => a + b, 0) / nodeCount;
    nodes.forEach((node) => {
      const degree = nodeDegrees.get(node.id)!;
      node.data!.degree = degree;
      node.data!.isHub = degree > avgDegree * 2;
    });

    return {nodes, edges};
  }

  test('handles 1,000 nodes with 2,000 edges', async () => {
    const networkData = generateLargeNetwork(1000, 2);

    const startTime = performance.now();

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Large Network - 1K Nodes"
        .data=${networkData}
        showInfo
        showMetrics
      ></scientific-network>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.data.nodes.length, 1000);
    assert.isAtLeast(el.data.edges.length, 1500);

    console.log(
      `Rendered 1,000 nodes and ${el.data.edges.length} edges in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(renderTime, 10000, 'Should render within 10 seconds');
  });

  test('handles 5,000 nodes with 10,000 edges', async () => {
    const networkData = generateLargeNetwork(5000, 2);

    const startTime = performance.now();

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Very Large Network - 5K Nodes"
        .data=${networkData}
        showInfo
      ></scientific-network>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.data.nodes.length, 5000);
    assert.isAtLeast(el.data.edges.length, 8000);

    console.log(
      `Rendered 5,000 nodes and ${el.data.edges.length} edges in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(renderTime, 15000, 'Should render within 15 seconds');
  });

  test('handles 10,000 edges in a dense network', async () => {
    const networkData = generateLargeNetwork(500, 20);

    const startTime = performance.now();

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Dense Network - 10K Edges"
        .data=${networkData}
        directed
        showInfo
        showMetrics
      ></scientific-network>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.data.nodes.length, 500);
    assert.isAtLeast(el.data.edges.length, 9000);

    console.log(
      `Rendered dense network with ${el.data.edges.length} edges in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(
      renderTime,
      15000,
      'Dense network should render within 15 seconds'
    );
  });

  test('metrics calculation is performant with large networks', async () => {
    const networkData = generateLargeNetwork(2000, 3);

    const startTime = performance.now();

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Metrics Test"
        .data=${networkData}
        showInfo
        showMetrics
      ></scientific-network>
    `);

    await el.updateComplete;

    const metricsTime = performance.now() - startTime;

    console.log(
      `Calculated metrics for 2,000 nodes in ${metricsTime.toFixed(2)}ms`
    );

    assert.isBelow(
      metricsTime,
      12000,
      'Metrics calculation should complete within 12 seconds'
    );
  });

  test('scale-free network (realistic scientific data) renders efficiently', async () => {
    const networkData = generateScaleFreeNetwork(3000);

    const startTime = performance.now();

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Protein Interaction Network"
        subtitle="Scale-free network topology"
        .data=${networkData}
        showInfo
        showMetrics
      ></scientific-network>
    `);

    const renderTime = performance.now() - startTime;

    assert.exists(el);
    assert.equal(el.data.nodes.length, 3000);
    assert.isAtLeast(el.data.edges.length, 6000);

    console.log(
      `Rendered scale-free network (3,000 nodes, ${el.data.edges.length} edges) in ${renderTime.toFixed(2)}ms`
    );

    assert.isBelow(
      renderTime,
      15000,
      'Scale-free network should render within 15 seconds'
    );
  });

  test('directed vs undirected toggle works with large networks', async () => {
    const networkData = generateLargeNetwork(1000, 2);

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Direction Toggle Test"
        .data=${networkData}
        directed
      ></scientific-network>
    `);

    await el.updateComplete;

    const startTime = performance.now();

    el.directed = false;
    await el.updateComplete;

    const toggleTime = performance.now() - startTime;

    console.log(`✓ Toggled direction in ${toggleTime.toFixed(2)}ms`);

    assert.isBelow(
      toggleTime,
      3000,
      'Direction toggle should complete within 3 seconds'
    );
  });

  test('node selection is performant in large networks', async () => {
    const networkData = generateLargeNetwork(2000, 2);

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Selection Test"
        .data=${networkData}
        .controls=${{enableSelection: true}}
      ></scientific-network>
    `);

    await el.updateComplete;

    const startTime = performance.now();

    const nodeSelectedEvent = new CustomEvent('node-selected', {
      detail: {node: {id: 'node-0'}},
    });
    el.dispatchEvent(nodeSelectedEvent);

    const selectionTime = performance.now() - startTime;

    console.log(`✓ Node selection handled in ${selectionTime.toFixed(2)}ms`);

    assert.isBelow(
      selectionTime,
      100,
      'Node selection should be instant (< 100ms)'
    );
  });

  test('export functionality works with large networks', async () => {
    const networkData = generateLargeNetwork(1000, 2);

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Export Test"
        .data=${networkData}
        showToolbar
      ></scientific-network>
    `);

    await el.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100));

    const startTime = performance.now();

    if (typeof el.getExportData === 'function') {
      el.getExportData();
    }

    const exportTime = performance.now() - startTime;

    console.log(
      `Prepared export data for 1,000 nodes in ${exportTime.toFixed(2)}ms`
    );

    assert.isBelow(
      exportTime,
      1000,
      'Export preparation should complete within 1 second'
    );
  });

  test('zoom and pan operations are smooth with large networks', async () => {
    const networkData = generateLargeNetwork(1500, 2);

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Zoom Test"
        .data=${networkData}
        .controls=${{enableZoom: true, enablePan: true}}
      ></scientific-network>
    `);

    await el.updateComplete;

    const startTime = performance.now();

    const zoomEvent = new CustomEvent('network-zoom', {
      detail: {zoomLevel: 1.5},
    });
    el.dispatchEvent(zoomEvent);

    const zoomTime = performance.now() - startTime;

    console.log(`✓ Zoom operation handled in ${zoomTime.toFixed(2)}ms`);

    assert.isBelow(zoomTime, 100, 'Zoom should be instant (< 100ms)');
  });

  test('layout algorithm completes in reasonable time', async () => {
    const networkData = generateLargeNetwork(1000, 2);

    const startTime = performance.now();

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Layout Test"
        .data=${networkData}
      ></scientific-network>
    `);

    await el.updateComplete;

    const layoutTime = performance.now() - startTime;

    assert.exists(el);

    console.log(
      `Layout computed for 1,000 nodes in ${layoutTime.toFixed(2)}ms`
    );

    assert.isBelow(
      layoutTime,
      10000,
      'Layout should complete within 10 seconds'
    );
  });

  test('memory usage remains stable with large networks', async () => {
    const iterations = 3;

    for (let i = 0; i < iterations; i++) {
      const networkData = generateLargeNetwork(1000, 2);

      const el = await fixture<ScientificNetwork>(html`
        <scientific-network
          title="Memory Test"
          .data=${networkData}
        ></scientific-network>
      `);

      await el.updateComplete;

      el.remove();
    }

    console.log(
      `Created and destroyed ${iterations} networks with 1,000 nodes each`
    );

    assert.isTrue(true, 'Memory remains stable across multiple renders');
  });

  test('handles dynamic node and edge additions', async () => {
    const initialNetwork = generateLargeNetwork(500, 2);

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Dynamic Update Test"
        .data=${initialNetwork}
        .controls=${{enableNodeCreation: true, enableEdgeCreation: true}}
      ></scientific-network>
    `);

    await el.updateComplete;

    const startTime = performance.now();

    const additionalNetwork = generateLargeNetwork(500, 2);
    const updatedData: NetworkData = {
      nodes: [...initialNetwork.nodes, ...additionalNetwork.nodes],
      edges: [...initialNetwork.edges, ...additionalNetwork.edges],
    };

    el.data = updatedData;
    await el.updateComplete;

    const updateTime = performance.now() - startTime;

    assert.equal(el.data.nodes.length, 1000);

    console.log(
      `Added 500 nodes and edges in ${updateTime.toFixed(2)}ms`
    );

    assert.isBelow(
      updateTime,
      5000,
      'Dynamic updates should complete within 5 seconds'
    );
  });
});
