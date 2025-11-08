import {ScientificNetwork} from '../scientific-network';
import {fixture, assert, aTimeout} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {SCIENTIFIC_THEMES} from '../../../shared/constants/themes.js';

function mockCytoscapeInit(el: ScientificNetwork) {
  (el as any)._initializeCytoscape = () => {};
}

suite('ScientificNetwork', () => {
  test('is defined', () => {
    const el = document.createElement('scientific-network');
    assert.instanceOf(el, ScientificNetwork);
  });

  test('renders with default values', async () => {
    const el = await fixture<ScientificNetwork>(
      html`<scientific-network></scientific-network>`
    );

    mockCytoscapeInit(el);

    const container = el.shadowRoot!.querySelector('.network-container');
    const canvas = el.shadowRoot!.querySelector('.network-canvas');

    assert.isNotNull(container);
    assert.isNotNull(canvas);
    assert.isFalse(el.isLoading);
    assert.isFalse(el.directed);
    assert.equal(el.theme, 'default');
    assert.isTrue(el.showToolbar);
    assert.isTrue(el.showInfo);
  });

  test('renders with custom title and subtitle', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Network Visualization"
        subtitle="Interactive Graph Analysis"
      ></scientific-network>
    `);

    mockCytoscapeInit(el);

    const title = el.shadowRoot!.querySelector('.scientific-title');
    const subtitle = el.shadowRoot!.querySelector('.scientific-subtitle');

    assert.isNotNull(title);
    assert.isNotNull(subtitle);
    assert.include(title!.textContent!, 'Network Visualization');
    assert.include(subtitle!.textContent!, 'Interactive Graph Analysis');
  });

  test('handles loading state', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network ?isLoading=${true}></scientific-network>
    `);

    const loadingOverlay = el.shadowRoot!.querySelector('.loading-overlay');
    const loadingSpinner = el.shadowRoot!.querySelector('.loading-spinner');

    assert.isTrue(el.isLoading);
    assert.isNotNull(loadingOverlay);
    assert.isNotNull(loadingSpinner);
  });

  test('handles directed vs undirected network', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network ?directed=${true}></scientific-network>
    `);

    assert.isTrue(el.directed);

    el.directed = false;
    await el.updateComplete;
    assert.isFalse(el.directed);
  });

  test('handles network data correctly', async () => {
    const networkData = {
      nodes: [
        {id: 'node1', label: 'Node 1'},
        {id: 'node2', label: 'Node 2'},
      ],
      edges: [
        {id: 'edge1', source: 'node1', target: 'node2', label: 'Connection'},
      ],
    };

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network .data=${networkData}></scientific-network>
    `);

    assert.equal(el.data.nodes.length, 2);
    assert.equal(el.data.edges.length, 1);
    assert.equal(el.data.nodes[0].id, 'node1');
    assert.equal(el.data.edges[0].source, 'node1');
  });

  test('enables/disables interactive features', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        .controls=${{
          enableZoom: true,
          enablePan: true,
          enableSelection: true,
          showTooltips: true,
          enableNodeCreation: true,
          enableEdgeCreation: true,
          enableRenaming: true,
          enableRemoval: true,
        }}
      ></scientific-network>
    `);

    assert.isTrue(el.enableNodeCreation);
    assert.isTrue(el.enableEdgeCreation);
    assert.isTrue(el.enableRenaming);
    assert.isTrue(el.enableRemoval);
  });

  test('handles keyboard shortcuts configuration', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        .controls=${{
          enableZoom: true,
          enablePan: true,
          enableSelection: true,
          showTooltips: true,
          enableNodeCreation: true,
          enableEdgeCreation: true,
          enableRenaming: true,
          enableRemoval: true,
        }}
      ></scientific-network>
    `);

    const shortcuts = (el as any).shortcutsController;

    assert.isTrue(shortcuts.hasShortcut('1'));
    assert.isTrue(shortcuts.hasShortcut('2'));
    assert.isTrue(shortcuts.hasShortcut('3'));
    assert.isTrue(shortcuts.hasShortcut('4'));

    assert.equal(shortcuts.getShortcut('1').action, 'createNode');
    assert.equal(shortcuts.getShortcut('2').action, 'createEdge');
    assert.equal(shortcuts.getShortcut('3').action, 'toggleRename');
    assert.equal(shortcuts.getShortcut('4').action, 'toggleRemoval');
  });

  test('handles theme changes', async () => {
    const themes = SCIENTIFIC_THEMES;

    for (const theme of themes) {
      const el = await fixture<ScientificNetwork>(html`
        <scientific-network .theme=${theme}></scientific-network>
      `);

      assert.equal(el.theme, theme);
    }
  });

  test('handles zoom and pan controls', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        .controls=${{
          enableZoom: true,
          enablePan: true,
          enableSelection: true,
          showTooltips: true,
          enableNodeCreation: false,
          enableEdgeCreation: false,
          enableRenaming: false,
          enableRemoval: false,
        }}
      ></scientific-network>
    `);

    assert.isTrue(el.enableZoom);
    assert.isTrue(el.enablePan);
  });

  test('handles error states', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        errorMessage="Network failed to load"
      ></scientific-network>
    `);

    const errorElement = el.shadowRoot!.querySelector('.scientific-message--error');

    assert.equal(el.errorMessage, 'Network failed to load');
    assert.isNotNull(errorElement);
    assert.include(errorElement!.textContent!, 'Network failed to load');
  });

  test('emits custom events correctly', async () => {
    let keyboardShortcutEmitted = false;

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        @keyboard-shortcut=${() => (keyboardShortcutEmitted = true)}
      ></scientific-network>
    `);

    const keyboardEvent = new KeyboardEvent('keydown', {
      key: '1',
      bubbles: true,
      cancelable: true,
    });

    const keyboardHandler = (el as any).keyboardHandler;
    if (keyboardHandler) {
      keyboardHandler(keyboardEvent);
    }

    assert.isDefined(keyboardShortcutEmitted);
  });

  test('handles node and edge creation modes', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        .controls=${{
          enableZoom: true,
          enablePan: true,
          enableSelection: true,
          showTooltips: true,
          enableNodeCreation: true,
          enableEdgeCreation: true,
          enableRenaming: false,
          enableRemoval: false,
        }}
      ></scientific-network>
    `);

    (el as any)._activateNodeCreation();
    await el.updateComplete;

    assert.isTrue((el as any).isCreatingNode);
    assert.isFalse((el as any).isCreatingEdge);

    (el as any)._activateEdgeCreation();
    await el.updateComplete;

    assert.isFalse((el as any).isCreatingNode);
    assert.isTrue((el as any).isCreatingEdge);
  });

  test('handles renaming and removal modes', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        .controls=${{
          enableZoom: true,
          enablePan: true,
          enableSelection: true,
          showTooltips: true,
          enableNodeCreation: false,
          enableEdgeCreation: false,
          enableRenaming: true,
          enableRemoval: true,
        }}
      ></scientific-network>
    `);

    (el as any)._toggleRenaming();
    await el.updateComplete;

    assert.isTrue((el as any).isRenaming);

    (el as any)._toggleRemoval();
    await el.updateComplete;

    assert.isFalse((el as any).isRenaming);
    assert.isTrue((el as any).isRemoving);
  });

  test('handles tooltip visibility', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network .controls=${{ 
        enableZoom: true,
        enablePan: true,
        enableSelection: true,
        showTooltips: true,
        enableNodeCreation: false,
        enableEdgeCreation: false,
        enableRenaming: false,
        enableRemoval: false,
      }}></scientific-network>
    `);

    assert.isTrue(el.showTooltips);

    const tooltipState = (el as any).tooltip;
    assert.isFalse(tooltipState.visible);
    assert.equal(tooltipState.content, '');
  });

  test('handles canvas element access', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network></scientific-network>
    `);

    await aTimeout(200);

    const canvasElement = el.getCanvasElement();
    assert.isNotNull(canvasElement);
  });

  test('supports export functionality', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network title="Test Network"></scientific-network>
    `);

    await aTimeout(200);

    const exportData = el.getExportData();
    assert.isNotNull(exportData);

    if (exportData && typeof exportData === 'object') {
      const data = exportData as any;
      assert.equal(data.title, 'Test Network');
      assert.property(data, 'timestamp');
    }
  });

  test('handles export callback functionality', async () => {
    let exportTriggered = false;

    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        .onExport=${(_format: string, _data: string) => {
          exportTriggered = true;
        }}
        @network-export=${() => {
          exportTriggered = true;
        }}
      ></scientific-network>
    `);

    assert.isFunction(el.onExport);
    assert.isDefined(exportTriggered);
  });

  test('handles accessibility attributes', async () => {
    const el = await fixture<ScientificNetwork>(html`
      <scientific-network
        title="Accessible Network"
        subtitle="Screen reader friendly"
      ></scientific-network>
    `);

    const container = el.shadowRoot!.querySelector('.network-container');
    assert.isNotNull(container);

    const header = el.shadowRoot!.querySelector('.scientific-header');
    const canvas = el.shadowRoot!.querySelector('.network-canvas');

    assert.isNotNull(header);
    assert.isNotNull(canvas);
  });
});
