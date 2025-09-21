import {LitElement, html, css, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import cytoscape, {
  Core,
  ElementDefinition,
  LayoutOptions,
  NodeSingular,
  EdgeSingular,
  EventObject,
} from 'cytoscape';
import {
  sharedVariables,
  themeStyles,
  containerStyles,
  headerStyles,
  messageStyles,
  loadingSpinnerStyles,
  responsiveStyles,
  type ScientificTheme,
} from '../shared/styles/common-styles.js';
import {networkThemeStyles} from '../shared/styles/component-theme-styles.js';
import {classNames} from '../shared/utils/dom-utils.js';
import {dispatchCustomEvent} from '../shared/utils/event-utils.js';
import {
  exportComponent,
  type ExportableComponent,
  type ExportOptions,
} from '../shared/utils/export-utils.js';
import '../Button/scientific-button.js';
import '../Dropdown/scientific-dropdown.js';

export interface NetworkNode {
  id: string;
  label?: string;
  data?: Record<string, unknown>;
  position?: {x: number; y: number};
  classes?: string;
  style?: Record<string, unknown>;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  data?: Record<string, unknown>;
  classes?: string;
  style?: Record<string, unknown>;
}

export interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

export interface NetworkMetrics {
  nodeCount: number;
  edgeCount: number;
  density: number;
  averageDegree: number;
  degreeCentrality: Record<string, number>;
  betweennessCentrality: Record<string, number>;
  connectedComponents: number;
}

export type NetworkTheme = ScientificTheme;

@customElement('scientific-network')
export class ScientificNetwork
  extends LitElement
  implements ExportableComponent
{
  static override styles = [
    sharedVariables,
    themeStyles,
    networkThemeStyles,
    containerStyles,
    headerStyles,
    messageStyles,
    loadingSpinnerStyles,
    responsiveStyles,
    css`
      :host {
        display: block;
        width: var(--network-width, 100%);
        height: var(--network-height, 400px);
        min-height: var(--network-min-height, 300px);
        font-family: var(--scientific-font-family);
      }

      .network-container {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: var(--network-container-min-height, 400px);
        border: var(--scientific-border);
        border-radius: var(--scientific-border-radius-lg);
        background: var(--container-bg-color, #ffffff);
        overflow: hidden;
      }

      .network-canvas {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: var(--network-canvas-min-height, 350px);
      }

      .scientific-header {
        display: flex;
        flex-direction: column;
        gap: var(--scientific-spacing-sm);
        margin-bottom: var(--scientific-spacing-md);
      }

      .header-content {
        display: flex;
        flex-direction: column;
        gap: var(--scientific-spacing-xs);
      }

      .network-toolbar {
        display: flex;
        flex-direction: column;
        padding: var(--network-toolbar-padding, var(--scientific-spacing-md));
        background: var(
          --network-toolbar-bg,
          var(--container-bg-color, #ffffff)
        );
        border: var(--network-toolbar-border, var(--scientific-border));
        border-radius: var(
          --network-toolbar-border-radius,
          var(--scientific-border-radius)
        );
        box-shadow: var(--network-toolbar-shadow, var(--scientific-shadow));
      }

      .toolbar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--scientific-spacing-sm);
      }

      .section-title {
        font-size: var(--scientific-text-sm);
        font-weight: 600;
        color: var(--scientific-text-secondary);
        margin-bottom: var(--scientific-spacing-xs);
        text-transform: uppercase;
      }

      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: var(--scientific-spacing-sm);
        justify-content: center;
      }

      @media (min-width: 768px) {
        .network-toolbar {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: var(--scientific-spacing-md);
          padding: var(--scientific-spacing-md);
        }

        .interactive-section .button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }

      .network-toolbar.grid-3 {
        grid-template-columns: 1fr 1fr 1fr !important;
      }

      .network-toolbar.grid-4 {
        grid-template-columns: 1fr 1fr 1fr 1fr !important;
      }

      @media (max-width: 767px) {
        .network-toolbar {
          gap: var(--scientific-spacing-lg);
        }
      }

      .network-info {
        position: absolute;
        bottom: var(--scientific-spacing-md);
        left: var(--scientific-spacing-md);
        background: rgba(255, 255, 255, 0.95);
        border: var(--scientific-border);
        border-radius: var(--scientific-border-radius);
        padding: var(--scientific-spacing-md);
        font-size: var(--scientific-text-sm);
        color: var(--scientific-text-secondary);
        box-shadow: var(--scientific-shadow);
        max-width: 250px;
        z-index: 10;
        backdrop-filter: blur(8px);
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--scientific-spacing-xs);
        font-weight: 500;
      }

      .info-row:last-child {
        margin-bottom: 0;
      }

      .info-row span:first-child {
        color: var(--scientific-text-tertiary);
      }

      .node-tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
        border-radius: var(--scientific-border-radius);
        font-size: var(--scientific-text-sm);
        pointer-events: none;
        z-index: 20;
        max-width: 200px;
        word-wrap: break-word;
        backdrop-filter: blur(4px);
      }

      .creating-nodes {
        cursor: crosshair !important;
      }

      .creating-edges {
        cursor: copy !important;
      }

      .renaming {
        cursor: text !important;
      }

      .removing {
        cursor: not-allowed !important;
      }

      .network-canvas.creating-nodes,
      .network-canvas.creating-edges,
      .network-canvas.renaming,
      .network-canvas.removing {
        cursor: inherit;
      }

      .renaming-element {
        border: 2px dashed var(--scientific-primary-color, #007bff) !important;
        background-color: rgba(0, 123, 255, 0.1) !important;
      }

      .removing-element {
        border: 2px dashed var(--scientific-danger-color, #dc3545) !important;
        background-color: rgba(220, 53, 69, 0.1) !important;
        opacity: 0.7 !important;
      }

      .rename-input {
        position: absolute;
        background: white;
        border: 2px solid var(--scientific-primary-color, #007bff);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 12px;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        outline: none;
      }

      .rename-input:focus {
        border-color: var(--scientific-primary-color, #007bff);
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }
    `,
  ];

  @property({type: String}) override title = '';
  @property({type: String}) subtitle = '';
  @property({type: Object}) data: NetworkData = {nodes: [], edges: []};
  @property({type: Boolean}) directed = false;
  @property({type: String}) theme: NetworkTheme = 'default';
  @property({type: Boolean}) interactive = true;
  @property({type: Boolean}) showToolbar = true;
  @property({type: Boolean}) showInfo = true;
  @property({type: Boolean}) showMetrics = false;
  @property({type: Boolean}) isLoading = false;
  @property({type: String}) errorMessage = '';
  @property({type: Boolean}) enableZoom = true;
  @property({type: Boolean}) enablePan = true;
  @property({type: Boolean}) enableSelection = true;
  @property({type: Boolean}) showTooltips = true;
  @property({type: Boolean}) enableNodeCreation = false;
  @property({type: Boolean}) enableEdgeCreation = false;
  @property({type: Boolean}) enableRenaming = false;
  @property({type: Boolean}) enableRemoval = false;
  @property({attribute: false}) onNodeClick?: (
    node: NetworkNode,
    event: EventObject
  ) => void;
  @property({attribute: false}) onEdgeClick?: (
    edge: NetworkEdge,
    event: EventObject
  ) => void;
  @property({attribute: false}) onExport?: (
    format: string,
    data: string
  ) => void;

  @state() private selectedNodes: string[] = [];
  @state() private selectedEdges: string[] = [];
  @state() private metrics: NetworkMetrics | null = null;
  @state() private currentZoom = 100;
  @state() private isCreatingNode = false;
  @state() private isCreatingEdge = false;
  @state() private edgeCreationSource: string | null = null;
  @state() private isRenaming = false;
  @state() private isRemoving = false;
  @state() private removalCandidate: string | null = null;
  @state() private removalCandidateType: 'node' | 'edge' | null = null;
  @state() private renamingElementId: string | null = null;
  @state() private renamingElementType: 'node' | 'edge' | null = null;
  @state() private tooltip: {
    visible: boolean;
    content: string;
    x: number;
    y: number;
  } = {
    visible: false,
    content: '',
    x: 0,
    y: 0,
  };

  private cy: Core | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private resizeTimeout: number | null = null;
  private keyboardHandler: ((event: KeyboardEvent) => void) | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._setupResizeObserver();
    setTimeout(() => {
      this._setupKeyboardListeners();
    }, 100);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.cy) {
      this.cy.destroy();
      this.cy = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
    this._removeKeyboardListeners();
  }

  override firstUpdated() {
    setTimeout(() => {
      this._initializeCytoscape();
    }, 100);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('data') && this.cy) {
      this._loadData();
    }
    if (changedProperties.has('layout') && this.cy) {
      this._applyLayout();
    }
    if (changedProperties.has('theme') && this.cy) {
      this._applyTheme();
    }
    if (changedProperties.has('directed') && this.cy) {
      this._applyTheme();
      this._calculateMetrics();
    }
  }

  private _setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      this.resizeTimeout = window.setTimeout(() => {
        if (this.cy) {
          this.cy.resize();
        }
      }, 100);
    });
  }

  private _setupKeyboardListeners() {
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
    }

    this.keyboardHandler = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement)?.contentEditable === 'true'
      ) {
        return;
      }

      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      if (event.key === '1') {
        event.preventDefault();
        event.stopPropagation();
        this._activateNodeCreation();
      } else if (event.key === '2') {
        event.preventDefault();
        event.stopPropagation();
        this._activateEdgeCreation();
      }
    };

    document.addEventListener('keydown', this.keyboardHandler, {capture: true});
  }

  private _removeKeyboardListeners() {
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
      this.keyboardHandler = null;
    }
  }

  private _initializeCytoscape() {
    const canvasElement = this.shadowRoot?.querySelector(
      '.network-canvas'
    ) as HTMLDivElement;

    if (!canvasElement) {
      console.error('Canvas element not found');
      return;
    }

    if (this.cy) {
      return;
    }

    try {
      const elements = this._convertDataToCytoscapeElements();

      this.cy = cytoscape({
        container: canvasElement,
        elements,
        style:
          this._getCytoscapeStyles() as unknown as cytoscape.StylesheetCSS[],
        zoomingEnabled: this.enableZoom,
        panningEnabled: this.enablePan,
        userZoomingEnabled: this.enableZoom,
        userPanningEnabled: this.enablePan,
        boxSelectionEnabled: this.enableSelection,
        selectionType: 'single',
        minZoom: 0.1,
        maxZoom: 3,
      });

      this.cy.ready(() => {
        this.cy!.layout(this._getLayoutOptions()).run();
        this._setupEventListeners();
        this._calculateMetrics();

        this.currentZoom = Math.round(this.cy!.zoom() * 100);

        if (this.resizeObserver) {
          this.resizeObserver.observe(this);
        }
      });
    } catch (error) {
      console.error('Failed to initialize Cytoscape:', error);
      this.errorMessage = 'Failed to initialize network visualization';
    }
  }

  private _convertDataToCytoscapeElements(): ElementDefinition[] {
    const elements: ElementDefinition[] = [];

    this.data.nodes.forEach((node) => {
      elements.push({
        data: {
          id: node.id,
          label: node.label || node.id,
          ...node.data,
        },
        position: node.position,
        classes: node.classes,
        style: node.style,
      });
    });

    this.data.edges.forEach((edge) => {
      const edgeData: Record<string, unknown> = {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        ...edge.data,
      };

      if (edge.label) {
        edgeData.label = edge.label;
      }

      elements.push({
        data: edgeData,
        classes: edge.classes,
        style: edge.style,
      });
    });

    return elements;
  }

  private _getThemeColors() {
    const style = getComputedStyle(this);
    return {
      nodeColor:
        style.getPropertyValue('--scientific-primary-color').trim() ||
        '#3b82f6',
      edgeColor:
        style.getPropertyValue('--scientific-text-muted').trim() || '#9ca3af',
      textColor:
        style.getPropertyValue('--scientific-text-secondary').trim() ||
        '#374151',
      borderColor:
        style.getPropertyValue('--scientific-primary-hover').trim() ||
        '#2563eb',
      dangerColor:
        style.getPropertyValue('--scientific-danger-color').trim() || '#ef4444',
      warningColor:
        style.getPropertyValue('--scientific-warning-color').trim() ||
        '#fbbf24',
      bgColor:
        style.getPropertyValue('--container-bg-color').trim() || '#ffffff',
    };
  }

  private _getCytoscapeStyles() {
    const colors = this._getThemeColors();

    return [
      {
        selector: 'node',
        style: {
          'background-color': colors.nodeColor,
          'border-color': colors.borderColor,
          'border-width': 2,
          label: 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          color: colors.textColor,
          'font-size': '12px',
          'font-family': 'Arial, sans-serif',
          width: 30,
          height: 30,
        },
      },
      {
        selector: 'node:selected',
        style: {
          'background-color': colors.dangerColor,
          'border-color': colors.dangerColor,
          'border-width': 3,
        },
      },
      {
        selector: 'edge',
        style: {
          width: 2,
          'line-color': colors.edgeColor,
          'target-arrow-color': colors.edgeColor,
          'target-arrow-shape': this.directed ? 'triangle' : 'none',
          'curve-style': 'bezier',
          'font-size': '10px',
          color: colors.textColor,
          'text-rotation': 'autorotate',
          'text-margin-y': -10,
          'overlay-color': 'transparent',
          'overlay-padding': '8px',
          'overlay-opacity': 0,
        },
      },
      {
        selector: 'edge[label]',
        style: {
          label: 'data(label)',
        },
      },
      {
        selector: 'edge:selected',
        style: {
          'line-color': colors.dangerColor,
          'target-arrow-color': colors.dangerColor,
          width: 3,
        },
      },
      {
        selector: '.highlighted',
        style: {
          'background-color': colors.warningColor,
          'line-color': colors.warningColor,
          'target-arrow-color': colors.warningColor,
          'transition-property':
            'background-color, line-color, target-arrow-color',
          'transition-duration': 0.3,
        },
      },
      {
        selector: '.edge-source',
        style: {
          'background-color': colors.warningColor,
          'border-color': colors.warningColor,
          'border-width': 4,
          'z-index': 999,
        },
      },
    ] as Record<string, unknown>[];
  }

  private _getLayoutOptions(): LayoutOptions {
    const baseOptions = {
      name: 'cose',
      animate: true,
      animationDuration: 500,
      fit: true,
      padding: 30,
    };

    return baseOptions as LayoutOptions;
  }

  private _setupEventListeners() {
    if (!this.cy) {
      return;
    }

    this.cy.on('tap', 'node', (event) => {
      const node = event.target;
      const nodeData = this._cytoscapeNodeToNetworkNode(node);

      if (this.isRemoving) {
        this._handleRemovalClick(node.id(), 'node');
        return;
      }

      if (this.isRenaming) {
        this._startRenaming(node.id(), 'node', event);
        return;
      }

      if (this.isCreatingEdge) {
        if (!this.edgeCreationSource) {
          this.edgeCreationSource = node.id();
          node.addClass('edge-source');
        } else if (this.edgeCreationSource !== node.id()) {
          this._addEdge(this.edgeCreationSource, node.id());
          this.cy!.nodes().removeClass('edge-source');
        }
        return;
      }

      this.selectedNodes = [node.id()];
      this.selectedEdges = [];

      if (this.onNodeClick) {
        this.onNodeClick(nodeData, event);
      }

      this.dispatchEvent(
        new CustomEvent('node-selected', {
          detail: {node: nodeData, cytoscapeEvent: event},
          bubbles: true,
        })
      );

      this._highlightNeighbors(node);
    });

    this.cy.on('tap', 'edge', (event) => {
      const edge = event.target;
      const edgeData = this._cytoscapeEdgeToNetworkEdge(edge);

      if (this.isRemoving) {
        this._handleRemovalClick(edge.id(), 'edge');
        return;
      }

      if (this.isRenaming) {
        this._startRenaming(edge.id(), 'edge', event);
        return;
      }

      this.selectedEdges = [edge.id()];
      this.selectedNodes = [];

      if (this.onEdgeClick) {
        this.onEdgeClick(edgeData, event);
      }

      this.dispatchEvent(
        new CustomEvent('edge-selected', {
          detail: {edge: edgeData, cytoscapeEvent: event},
          bubbles: true,
        })
      );
    });

    this.cy.on('tap', (event) => {
      if (event.target === this.cy) {
        if (this.isCreatingNode) {
          const position = event.position;
          this._addNode(position);
          return;
        }

        this.selectedNodes = [];
        this.selectedEdges = [];
        this._clearHighlights();

        if (this.isCreatingEdge) {
          this.edgeCreationSource = null;
          this.cy!.nodes().removeClass('edge-source');
        }

        this.dispatchEvent(
          new CustomEvent('canvas-clicked', {
            detail: {position: event.position},
            bubbles: true,
          })
        );
      }
    });

    if (this.showTooltips) {
      this.cy.on('mouseover', 'node', (event) => {
        const node = event.target;
        if (this.isRemoving) {
          node.addClass('removing-element');
          const isCandidate = this.removalCandidate === node.id();
          this._showTooltip(
            event.originalEvent,
            isCandidate
              ? 'Click again to confirm removal'
              : 'Click to mark for removal'
          );
        } else {
          this._showTooltip(
            event.originalEvent,
            this._getNodeTooltipContent(node)
          );
        }
      });

      this.cy.on('mouseover', 'edge', (event) => {
        const edge = event.target;
        if (this.isRemoving) {
          edge.addClass('removing-element');
          const isCandidate = this.removalCandidate === edge.id();
          this._showTooltip(
            event.originalEvent,
            isCandidate
              ? 'Click again to confirm removal'
              : 'Click to mark for removal'
          );
        }
      });

      this.cy.on('mouseout', 'node', (event) => {
        const node = event.target;
        if (this.removalCandidate !== node.id()) {
          node.removeClass('removing-element');
        }
        this._hideTooltip();
      });

      this.cy.on('mouseout', 'edge', (event) => {
        const edge = event.target;
        if (this.removalCandidate !== edge.id()) {
          edge.removeClass('removing-element');
        }
        this._hideTooltip();
      });
    }

    this.cy.on('zoom', () => {
      this.currentZoom = Math.round(this.cy!.zoom() * 100);
      this.dispatchEvent(
        new CustomEvent('network-zoom', {
          detail: {zoomLevel: this.cy!.zoom()},
          bubbles: true,
        })
      );
    });
  }

  private _cytoscapeNodeToNetworkNode(cyNode: NodeSingular): NetworkNode {
    return {
      id: cyNode.id(),
      label: cyNode.data('label'),
      data: cyNode.data(),
      position: cyNode.position(),
      classes: cyNode.classes().join(' '),
    };
  }

  private _cytoscapeEdgeToNetworkEdge(cyEdge: EdgeSingular): NetworkEdge {
    return {
      id: cyEdge.id(),
      source: cyEdge.source().id(),
      target: cyEdge.target().id(),
      label: cyEdge.data('label'),
      data: cyEdge.data(),
      classes: cyEdge.classes().join(' '),
    };
  }

  private _highlightNeighbors(node: NodeSingular) {
    if (!this.cy) {
      return;
    }

    this._clearHighlights();

    const neighbors = node.neighborhood();
    neighbors.addClass('highlighted');
    node.addClass('highlighted');
  }

  private _clearHighlights() {
    if (!this.cy) {
      return;
    }
    this.cy.elements().removeClass('highlighted');
  }

  private _showTooltip(event: MouseEvent, content: string) {
    this.tooltip = {
      visible: true,
      content,
      x: event.clientX + 10,
      y: event.clientY - 10,
    };
  }

  private _hideTooltip() {
    this.tooltip = {
      ...this.tooltip,
      visible: false,
    };
  }

  private _getNodeTooltipContent(node: NodeSingular): string {
    const degree = node.degree();
    const label = node.data('label') || node.id();
    return `${label}\nDegree: ${degree}`;
  }

  private _loadData() {
    if (!this.cy) {
      return;
    }

    try {
      const elements = this._convertDataToCytoscapeElements();
      this.cy.elements().remove();
      this.cy.add(elements);
      this.cy.layout(this._getLayoutOptions()).run();
      this._calculateMetrics();
    } catch (error) {
      console.warn('Failed to load data:', error);
    }
  }

  private _applyLayout() {
    if (!this.cy) {
      return;
    }

    try {
      this.cy.layout(this._getLayoutOptions()).run();
    } catch (error) {
      console.warn('Failed to apply layout:', error);
    }
  }

  private _applyTheme() {
    if (!this.cy) {
      return;
    }
    this.cy.style(
      this._getCytoscapeStyles() as unknown as cytoscape.StylesheetCSS[]
    );
  }

  private _calculateMetrics() {
    if (!this.cy) {
      this.metrics = null;
      return;
    }

    const nodes = this.cy.nodes();
    const edges = this.cy.edges();
    const nodeCount = nodes.length;
    const edgeCount = edges.length;

    const maxEdges = this.directed
      ? nodeCount * (nodeCount - 1)
      : (nodeCount * (nodeCount - 1)) / 2;
    const density = maxEdges > 0 ? edgeCount / maxEdges : 0;

    const averageDegree =
      nodeCount > 0
        ? (this.directed ? edgeCount : 2 * edgeCount) / nodeCount
        : 0;

    const degreeCentrality: Record<string, number> = {};
    nodes.forEach((node) => {
      const degree = node.degree();
      const normalizedDegree = nodeCount > 1 ? degree / (nodeCount - 1) : 0;
      degreeCentrality[node.id()] = normalizedDegree;
    });

    const betweennessCentrality: Record<string, number> = {};
    try {
      const betweennessResult = this.cy.elements().betweennessCentrality({
        directed: this.directed,
      });
      nodes.forEach((node) => {
        betweennessCentrality[node.id()] = betweennessResult.betweenness(node);
      });
    } catch (error) {
      nodes.forEach((node) => {
        betweennessCentrality[node.id()] = 0;
      });
    }

    const components = this.cy.elements().components();

    this.metrics = {
      nodeCount,
      edgeCount,
      density: Math.round(density * 1000) / 1000,
      averageDegree: Math.round(averageDegree * 100) / 100,
      degreeCentrality,
      betweennessCentrality,
      connectedComponents: components.length,
    };
  }

  private _handleZoomIn() {
    if (this.cy && this.enableZoom) {
      this.cy.zoom(this.cy.zoom() * 1.2);
      this.currentZoom = Math.round(this.cy.zoom() * 100);
    }
  }

  private _handleZoomOut() {
    if (this.cy && this.enableZoom) {
      this.cy.zoom(this.cy.zoom() / 1.2);
      this.currentZoom = Math.round(this.cy.zoom() * 100);
    }
  }

  private _handleZoomFit() {
    if (this.cy) {
      this.cy.fit();
      this.currentZoom = Math.round(this.cy.zoom() * 100);
    }
  }

  private _handleDirectedChange(event: CustomEvent) {
    const {value} = event.detail;
    this.directed = value === 'true';

    if (this.cy) {
      this._applyTheme();
    }

    this._calculateMetrics();

    dispatchCustomEvent(this, 'network-direction-changed', {
      directed: this.directed,
    });
  }

  private _handleExportChange(event: CustomEvent) {
    const {value} = event.detail;
    this._handleExport(value as ExportOptions['format']);
  }

  private _toggleNodeCreation() {
    this.isCreatingNode = !this.isCreatingNode;
    this._setExclusiveMode('isCreatingNode');

    if (this.cy) {
      this.cy.autoungrabify(this.isCreatingNode);
    }
  }

  private _toggleEdgeCreation() {
    this.isCreatingEdge = !this.isCreatingEdge;
    this._setExclusiveMode('isCreatingEdge');

    if (this.cy) {
      this.cy.autoungrabify(this.isCreatingEdge);
    }
  }

  private _activateNodeCreation() {
    this.isCreatingEdge = false;
    this.isRenaming = false;
    this.isRemoving = false;
    this.edgeCreationSource = null;
    this._cancelRenaming();
    this._clearRemovalCandidate();

    this.isCreatingNode = true;
    if (this.cy) {
      this.cy.autoungrabify(true);
    }

    this.requestUpdate();
  }

  private _activateEdgeCreation() {
    this.isCreatingNode = false;
    this.isRenaming = false;
    this.isRemoving = false;
    this.edgeCreationSource = null;
    this._cancelRenaming();
    this._clearRemovalCandidate();

    this.isCreatingEdge = true;
    if (this.cy) {
      this.cy.autoungrabify(true);
    }

    this.requestUpdate();
  }

  private _toggleRenaming() {
    this.isRenaming = !this.isRenaming;
    this._setExclusiveMode('isRenaming');

    if (this.isRenaming) {
      this._clearSelections();
    } else {
      this._cancelRenaming();
    }
  }

  private _toggleRemoval() {
    this.isRemoving = !this.isRemoving;
    this._setExclusiveMode('isRemoving');

    if (this.isRemoving) {
      this._clearSelections();
    } else {
      this._clearRemovalCandidate();
    }
  }

  private _setExclusiveMode(
    activeMode:
      | 'isCreatingNode'
      | 'isCreatingEdge'
      | 'isRenaming'
      | 'isRemoving'
  ) {
    if (activeMode !== 'isCreatingNode') this.isCreatingNode = false;
    if (activeMode !== 'isCreatingEdge') this.isCreatingEdge = false;
    if (activeMode !== 'isRenaming') this.isRenaming = false;
    if (activeMode !== 'isRemoving') this.isRemoving = false;

    this.edgeCreationSource = null;

    if (activeMode !== 'isRenaming') {
      this._cancelRenaming();
    }

    if (activeMode !== 'isRemoving') {
      this._clearRemovalCandidate();
    }

    if (
      this.cy &&
      activeMode !== 'isCreatingNode' &&
      activeMode !== 'isCreatingEdge'
    ) {
      this.cy.autoungrabify(false);
    }
  }

  private _clearSelections() {
    this.selectedNodes = [];
    this.selectedEdges = [];
    this._clearHighlights();
  }

  private _handleRemovalClick(elementId: string, elementType: 'node' | 'edge') {
    if (
      this.removalCandidate === elementId &&
      this.removalCandidateType === elementType
    ) {
      this._removeElement(elementId, elementType);
      this._clearRemovalCandidate();
    } else {
      this._setRemovalCandidate(elementId, elementType);
    }
  }

  private _setRemovalCandidate(
    elementId: string,
    elementType: 'node' | 'edge'
  ) {
    this._clearRemovalCandidate();

    this.removalCandidate = elementId;
    this.removalCandidateType = elementType;

    if (this.cy) {
      const element = this.cy.getElementById(elementId);
      element.addClass('removing-element');
    }

    setTimeout(() => {
      if (this.removalCandidate === elementId) {
        this._clearRemovalCandidate();
      }
    }, 3000);
  }

  private _clearRemovalCandidate() {
    if (this.removalCandidate && this.cy) {
      const element = this.cy.getElementById(this.removalCandidate);
      element.removeClass('removing-element');
    }

    this.removalCandidate = null;
    this.removalCandidateType = null;
  }

  private _removeElement(elementId: string, elementType: 'node' | 'edge') {
    if (!this.cy) {
      return;
    }
    try {
      const element = this.cy.getElementById(elementId);
      if (element.length === 0) {
        console.warn(`Element ${elementId} not found`);
        return;
      }

      if (elementType === 'node') {
        this._removeNodeFromData(elementId);
        this._removeConnectedEdges(elementId);
      } else {
        this._removeEdgeFromData(elementId);
      }

      element.remove();

      this._calculateMetrics();

      dispatchCustomEvent(this, `${elementType}-removed`, {
        elementId,
        elementType,
      });

      dispatchCustomEvent(this, 'network-updated', {
        action: 'remove',
        elementType,
        elementId,
      });
    } catch (error) {
      console.error(`Failed to remove ${elementType}:`, error);
    }
  }

  private _removeNodeFromData(nodeId: string) {
    const nodeIndex = this.data.nodes.findIndex((node) => node.id === nodeId);
    if (nodeIndex !== -1) {
      this.data.nodes.splice(nodeIndex, 1);
    }
  }

  private _removeEdgeFromData(edgeId: string) {
    const edgeIndex = this.data.edges.findIndex((edge) => edge.id === edgeId);
    if (edgeIndex !== -1) {
      this.data.edges.splice(edgeIndex, 1);
    }
  }

  private _removeConnectedEdges(nodeId: string) {
    const connectedEdges = this.data.edges.filter(
      (edge) => edge.source === nodeId || edge.target === nodeId
    );

    connectedEdges.forEach((edge) => {
      this._removeEdgeFromData(edge.id);
      if (this.cy) {
        const cyEdge = this.cy.getElementById(edge.id);
        if (cyEdge.length > 0) {
          cyEdge.remove();
        }
      }
    });
  }

  private _startRenaming(
    elementId: string,
    elementType: 'node' | 'edge',
    event: EventObject
  ) {
    this._cancelRenaming();

    this.renamingElementId = elementId;
    this.renamingElementType = elementType;

    const element = this.cy!.getElementById(elementId);
    const currentLabel = element.data('label') || elementId;

    const clickPos = event.renderedPosition;

    this._showRenameInput(
      clickPos.x,
      clickPos.y,
      currentLabel,
      elementId,
      elementType
    );

    element.addClass('renaming-element');
  }

  private _showRenameInput(
    x: number,
    y: number,
    currentValue: string,
    elementId: string,
    elementType: 'node' | 'edge'
  ) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.className = 'rename-input';
    input.style.left = `${x - 50}px`;
    input.style.top = `${y - 15}px`;

    const networkContainer =
      this.shadowRoot?.querySelector('.network-container');
    if (!networkContainer) return;

    networkContainer.appendChild(input);

    input.focus();
    input.select();

    const completeRename = () => {
      const newLabel = input.value.trim();
      if (newLabel && newLabel !== currentValue) {
        this._completeRenaming(elementId, elementType, newLabel);
      } else {
        this._cancelRenaming();
      }
      if (networkContainer.contains(input)) {
        networkContainer.removeChild(input);
      }
    };

    const cancelRename = () => {
      this._cancelRenaming();
      if (networkContainer.contains(input)) {
        networkContainer.removeChild(input);
      }
    };

    input.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        completeRename();
      } else if (e.key === 'Escape') {
        cancelRename();
      }
    });

    input.addEventListener('blur', completeRename);

    input.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  private _completeRenaming(
    elementId: string,
    elementType: 'node' | 'edge',
    newLabel: string
  ) {
    if (!this.cy) {
      return;
    }

    const element = this.cy.getElementById(elementId);
    element.removeClass('renaming-element');

    element.data('label', newLabel);

    if (elementType === 'node') {
      const nodeIndex = this.data.nodes.findIndex((n) => n.id === elementId);
      if (nodeIndex !== -1) {
        this.data.nodes[nodeIndex].label = newLabel;
      }
    } else {
      const edgeIndex = this.data.edges.findIndex((e) => e.id === elementId);
      if (edgeIndex !== -1) {
        this.data.edges[edgeIndex].label = newLabel;
      }
    }

    dispatchCustomEvent(this, `${elementType}-renamed`, {
      elementId,
      newLabel,
      elementType,
    });

    this.renamingElementId = null;
    this.renamingElementType = null;
  }

  private _cancelRenaming() {
    if (!this.cy || !this.renamingElementId || !this.renamingElementType) {
      return;
    }

    const element = this.cy.getElementById(this.renamingElementId);
    element.removeClass('renaming-element');

    const networkContainer =
      this.shadowRoot?.querySelector('.network-container');
    const existingInput = networkContainer?.querySelector('.rename-input');
    if (existingInput && networkContainer) {
      networkContainer.removeChild(existingInput);
    }

    this.renamingElementId = null;
    this.renamingElementType = null;
  }

  private _generateNodeId(): string {
    const existingIds = this.data.nodes.map((node) => node.id);
    let id = `node-${this.data.nodes.length + 1}`;
    let counter = this.data.nodes.length + 1;

    while (existingIds.includes(id)) {
      counter++;
      id = `node-${counter}`;
    }

    return id;
  }

  private _generateEdgeId(): string {
    const existingIds = this.data.edges.map((edge) => edge.id);
    let id = `edge-${this.data.edges.length + 1}`;
    let counter = this.data.edges.length + 1;

    while (existingIds.includes(id)) {
      counter++;
      id = `edge-${counter}`;
    }

    return id;
  }

  private _addNode(position: {x: number; y: number}) {
    const nodeId = this._generateNodeId();
    const newNode: NetworkNode = {
      id: nodeId,
      label: nodeId,
      position,
    };

    this.data.nodes.push(newNode);

    if (this.cy) {
      this.cy.add({
        data: {
          id: nodeId,
          label: nodeId,
        },
        position,
      });
    }

    dispatchCustomEvent(this, 'node-added', {
      node: newNode,
    });

    this.isCreatingNode = false;
    if (this.cy) {
      this.cy.autoungrabify(false);
    }
  }

  private _addEdge(sourceId: string, targetId: string) {
    const edgeId = this._generateEdgeId();
    const newEdge: NetworkEdge = {
      id: edgeId,
      source: sourceId,
      target: targetId,
      label: `${sourceId}-${targetId}`,
    };

    this.data.edges.push(newEdge);

    if (this.cy) {
      this.cy.add({
        data: {
          id: edgeId,
          source: sourceId,
          target: targetId,
          label: `${sourceId}-${targetId}`,
        },
      });
    }

    dispatchCustomEvent(this, 'edge-added', {
      edge: newEdge,
    });

    this.edgeCreationSource = null;
    this.isCreatingEdge = false;
    if (this.cy) {
      this.cy.autoungrabify(false);
    }
  }

  getCanvasElement(): HTMLCanvasElement | null {
    if (!this.cy) {
      return null;
    }
    const container = this.cy.container();
    return container?.querySelector('canvas') || null;
  }

  getDataURL(format: 'png' | 'jpg' = 'png', quality = 1.0): string | null {
    if (!this.cy) {
      return null;
    }
    try {
      const colors = this._getThemeColors();
      const bg = colors.bgColor;

      if (format === 'png') {
        return this.cy.png({
          output: 'base64uri',
          bg,
          full: true,
        });
      } else if (format === 'jpg') {
        return this.cy.jpg({
          output: 'base64uri',
          bg,
          full: true,
          quality: quality,
        });
      }
    } catch (error) {
      console.warn('Failed to get data URL:', error);
    }
    return null;
  }

  getExportData(): unknown {
    if (!this.cy) {
      return null;
    }
    return {
      title: this.title,
      subtitle: this.subtitle,
      network: this.cy.json(),
      theme: this.theme,
      metrics: this.metrics,
      timestamp: new Date().toISOString(),
    };
  }

  private async _handleExport(format: ExportOptions['format']) {
    if (!this.cy) {
      return;
    }
    try {
      if (
        this.onExport &&
        (format === 'png' || format === 'svg' || format === 'json')
      ) {
        const colors = this._getThemeColors();
        let exportData: string;
        switch (format) {
          case 'png':
            exportData = this.cy.png({
              output: 'base64uri',
              bg: colors.bgColor,
              full: true,
            });
            break;
          case 'svg':
            exportData = JSON.stringify(this.cy.json());
            break;
          case 'json':
            exportData = JSON.stringify(this.cy.json());
            break;
          default:
            exportData = '';
        }
        this.onExport(format, exportData);
      } else {
        const colors = this._getThemeColors();
        await exportComponent(this, {
          format,
          title: this.title || 'network',
          subtitle: this.subtitle,
          timestamp: true,
          backgroundColor: colors.bgColor,
        });
      }

      dispatchCustomEvent(this, 'network-export', {
        format,
        title: this.title,
      });
    } catch (error) {
      console.error('Export error:', error);
      this.errorMessage = `Failed to export network as ${format.toUpperCase()}`;
    }
  }

  override render() {
    return html`
      <div class="${this._getContainerClasses()}">
        ${this._renderHeader()}
        ${this.errorMessage ? this._renderError() : nothing}
        ${this._renderNetwork()}
        ${this.tooltip.visible ? this._renderTooltip() : nothing}
      </div>
    `;
  }

  private _getContainerClasses() {
    return classNames(
      'scientific-container',
      'network-wrapper',
      this.theme && `network-theme-${this.theme}`
    );
  }

  private _renderHeader() {
    return html`
      <div class="scientific-header">
        <div class="header-content">
          ${this.title
            ? html`<h2 class="scientific-title">${this.title}</h2>`
            : nothing}
          ${this.subtitle
            ? html`<p class="scientific-subtitle">${this.subtitle}</p>`
            : nothing}
        </div>
        ${this.showToolbar ? this._renderToolbar() : nothing}
      </div>
    `;
  }

  private _renderError() {
    return html`
      <div class="scientific-error" role="alert">
        <span>${this.errorMessage}</span>
      </div>
    `;
  }

  private _renderNetwork() {
    const canvasClasses = classNames(
      'network-canvas',
      this.isCreatingNode && 'creating-nodes',
      this.isCreatingEdge && 'creating-edges',
      this.isRenaming && 'renaming',
      this.isRemoving && 'removing'
    );

    return html`
      <div class="network-container">
        ${this.isLoading ? this._renderLoading() : nothing}
        <div class="${canvasClasses}"></div>
        ${this.showInfo ? this._renderInfo() : nothing}
      </div>
    `;
  }

  private _renderLoading() {
    return html`
      <div class="loading-overlay">
        <div class="loading-spinner"></div>
        <div>Loading network...</div>
      </div>
    `;
  }

  private _renderToolbar() {
    const hasInteractiveFeatures =
      this.enableNodeCreation ||
      this.enableEdgeCreation ||
      this.enableRenaming ||
      this.enableRemoval;

    const gridClass = hasInteractiveFeatures ? 'grid-4' : 'grid-3';

    return html`
      <div class="network-toolbar ${gridClass}">
        <div class="toolbar-section network-type-section">
          <div class="section-title">Network Type</div>
          <div class="button-group">
            <scientific-button
              variant="${!this.directed ? 'primary' : 'outline'}"
              size="small"
              label="Undirected"
              .theme="${this.theme}"
              @click="${() =>
                this._handleDirectedChange(
                  new CustomEvent('change', {detail: {value: 'false'}})
                )}"
            ></scientific-button>
            <scientific-button
              variant="${this.directed ? 'primary' : 'outline'}"
              size="small"
              label="Directed"
              .theme="${this.theme}"
              @click="${() =>
                this._handleDirectedChange(
                  new CustomEvent('change', {detail: {value: 'true'}})
                )}"
            ></scientific-button>
          </div>
        </div>

        ${hasInteractiveFeatures
          ? html`
              <div class="toolbar-section interactive-section">
                <div class="section-title">Interactive Mode</div>
                <div class="button-group">
                  ${this.enableNodeCreation
                    ? html`
                        <scientific-button
                          variant="${this.isCreatingNode
                            ? 'primary'
                            : 'outline'}"
                          size="small"
                          label="+ Node"
                          .theme="${this.theme}"
                          @click="${this._toggleNodeCreation}"
                          title="Add Node (Press 1 or click on canvas)"
                        ></scientific-button>
                      `
                    : ''}
                  ${this.enableEdgeCreation
                    ? html`
                        <scientific-button
                          variant="${this.isCreatingEdge
                            ? 'primary'
                            : 'outline'}"
                          size="small"
                          label="+ Edge"
                          .theme="${this.theme}"
                          @click="${this._toggleEdgeCreation}"
                          title="Add Edge (Press 2 or click two nodes)"
                        ></scientific-button>
                      `
                    : ''}
                  ${this.enableRenaming
                    ? html`
                        <scientific-button
                          variant="${this.isRenaming ? 'primary' : 'outline'}"
                          size="small"
                          label="Rename"
                          .theme="${this.theme}"
                          @click="${this._toggleRenaming}"
                          title="Rename elements (click element)"
                        ></scientific-button>
                      `
                    : ''}
                  ${this.enableRemoval
                    ? html`
                        <scientific-button
                          variant="${this.isRemoving ? 'danger' : 'outline'}"
                          size="small"
                          label="Remove"
                          .theme="${this.theme}"
                          @click="${this._toggleRemoval}"
                          title="Remove elements (double-click element to confirm)"
                        ></scientific-button>
                      `
                    : ''}
                </div>
              </div>
            `
          : ''}

        <div class="toolbar-section controls-section">
          <div class="section-title">Controls</div>
          <div class="button-group">
            ${this.enableZoom
              ? html`
                  <div class="zoom-buttons">
                    <scientific-button
                      variant="outline"
                      size="small"
                      label="+"
                      .theme="${this.theme}"
                      @click="${this._handleZoomIn}"
                      title="Zoom In"
                    ></scientific-button>
                    <scientific-button
                      variant="outline"
                      size="small"
                      label="−"
                      .theme="${this.theme}"
                      @click="${this._handleZoomOut}"
                      title="Zoom Out"
                    ></scientific-button>
                    <scientific-button
                      variant="outline"
                      size="small"
                      label="⌂"
                      .theme="${this.theme}"
                      @click="${this._handleZoomFit}"
                      title="Fit to Screen"
                    ></scientific-button>
                  </div>
                `
              : ''}
          </div>
        </div>

        <div class="toolbar-section export-section">
          <div class="section-title">Export</div>
          <div class="button-group">
            <scientific-dropdown
              .options="${[
                {value: 'png', label: 'PNG'},
                {value: 'jpg', label: 'JPG'},
                {value: 'pdf', label: 'PDF'},
                {value: 'json', label: 'JSON'},
              ]}"
              .theme="${this.theme}"
              @change="${this._handleExportChange}"
              placeholder="Select an export format"
              label=""
            ></scientific-dropdown>
          </div>
        </div>
      </div>
    `;
  }

  private _renderInfo() {
    if (!this.metrics && !this.cy) {
      return '';
    }
    return html`
      <div class="network-info">
        ${this.metrics
          ? html`
              <div class="info-row">
                <span>Nodes:</span>
                <span>${this.metrics.nodeCount}</span>
              </div>
              <div class="info-row">
                <span>Edges:</span>
                <span>${this.metrics.edgeCount}</span>
              </div>
              ${this.showMetrics
                ? html`
                    <div class="info-row">
                      <span>Density:</span>
                      <span>${this.metrics.density}</span>
                    </div>
                    <div class="info-row">
                      <span>Avg Degree:</span>
                      <span>${this.metrics.averageDegree}</span>
                    </div>
                    <div class="info-row">
                      <span>Components:</span>
                      <span>${this.metrics.connectedComponents}</span>
                    </div>
                  `
                : ''}
            `
          : ''}
        ${this.selectedNodes.length > 0
          ? html`
              <div class="info-row">
                <span>Selected Nodes:</span>
                <span>${this.selectedNodes.length}</span>
              </div>
            `
          : nothing}
        ${this.selectedEdges.length > 0
          ? html`
              <div class="info-row">
                <span>Selected Edges:</span>
                <span>${this.selectedEdges.length}</span>
              </div>
            `
          : nothing}
        ${this.enableZoom
          ? html`
              <div class="info-row">
                <span>Zoom:</span>
                <span>${this.currentZoom}%</span>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _renderTooltip() {
    return html`
      <div
        class="node-tooltip"
        style="left: ${this.tooltip.x}px; top: ${this.tooltip.y}px;"
      >
        ${this.tooltip.content
          .split('\n')
          .map((line: string) => html`<div>${line}</div>`)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-network': ScientificNetwork;
  }
}
