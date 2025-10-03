import {html, css, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {baseComponentStyles} from '../shared/styles/base-component-styles.js';
import {ScientificSurfaceBase} from '../shared/components/scientific-surface-base.js';
import {EventObject} from 'cytoscape';
import {NetworkGraphController} from '../shared/network/network-graph-controller.js';
import {NetworkShortcutsController} from '../shared/network/network-shortcuts-controller.js';
import {NetworkMetrics} from '../shared/network/network-metrics-calculator.js';
import {
  sharedVariables,
  themeStyles,
  containerStyles,
  headerStyles,
  messageStyles,
  loadingSpinnerStyles,
  responsiveStyles,
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

export interface ToolbarButtonDescriptor {
  id: string;
  label: string;
  variant: 'primary' | 'outline' | 'danger' | 'success' | 'warning';
  title: string;
  handler: () => void;
  icon?: string;
  visible?: boolean;
}

export interface ToolbarSection {
  networkTypeButtons: ToolbarButtonDescriptor[];
  interactiveButtons: ToolbarButtonDescriptor[];
  controlButtons: ToolbarButtonDescriptor[];
  exportOptions: Array<{value: string; label: string}>;
}

@customElement('scientific-network')
export class ScientificNetwork
  extends ScientificSurfaceBase
  implements ExportableComponent
{
  private graphController = new NetworkGraphController(this);
  private shortcutsController = new NetworkShortcutsController(this);

  static override styles = [
    baseComponentStyles,
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
        width: var(--network-width, 100%);
        height: var(--network-height, 400px);
        min-height: var(--network-min-height, 300px);
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

      .network-toolbar {
        display: flex;
        flex-direction: column;
        padding: var(--scientific-spacing-md);
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
        background: color-mix(in srgb, var(--scientific-bg-primary) 95%, transparent);
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
        background: var(--scientific-bg-primary);
        color: var(--scientific-text-primary);
        border: 2px solid var(--scientific-primary-color, #007bff);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 12px;
        z-index: 1000;
        box-shadow: var(--scientific-shadow);
        outline: none;
      }

      .rename-input:focus {
        border-color: var(--scientific-primary-color, #007bff);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--scientific-primary-color) 25%, transparent);
      }
    `,
  ];

  @property({type: String}) override title = '';
  
  @property({type: Object, attribute: false}) data: NetworkData = {nodes: [], edges: []};
  
  @property({type: Boolean}) directed = false;
  @property({type: Boolean}) interactive = true;
  @property({type: Boolean}) showInfo = true;
  @property({type: Boolean}) showMetrics = false;
  
  @property({type: Object, attribute: false}) controls = {
    enableZoom: true,
    enablePan: true,
    enableSelection: true,
    showTooltips: true,
    enableNodeCreation: false,
    enableEdgeCreation: false,
    enableRenaming: false,
    enableRemoval: false,
  };
  
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

  get enableZoom() { return this.controls.enableZoom; }
  get enablePan() { return this.controls.enablePan; }
  get enableSelection() { return this.controls.enableSelection; }
  get enableNodeCreation() { return this.controls.enableNodeCreation; }
  get enableEdgeCreation() { return this.controls.enableEdgeCreation; }
  get enableRenaming() { return this.controls.enableRenaming; }
  get enableRemoval() { return this.controls.enableRemoval; }
  get showTooltips() { return this.controls.showTooltips; }

  get currentZoom(): number {
    const cy = this.graphController.getCytoscapeInstance();
    return cy ? Math.round(cy.zoom() * 100) : 100;
  }

  override connectedCallback() {
    super.connectedCallback();
    
    this.shortcutsController.registerShortcuts(
      NetworkShortcutsController.createDefaultNetworkShortcuts()
    );
    
    this.addEventListener('shortcut-createNode', () => this._activateNodeCreation());
    this.addEventListener('shortcut-createEdge', () => this._activateEdgeCreation());
    this.addEventListener('shortcut-toggleRename', () => this._toggleRenaming());
    this.addEventListener('shortcut-toggleRemoval', () => this._toggleRemoval());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
  }

  override firstUpdated() {
    this._initializeNetwork();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('data')) {
      this.graphController.loadData(this.data);
      this._updateMetrics();
    }
    
    if (changedProperties.has('theme')) {
      this.graphController.applyTheme();
    }
    
    if (changedProperties.has('directed')) {
      this.graphController.applyTheme();
      this._updateMetrics();
    }
  }

  private async _initializeNetwork() {
    const canvasElement = this.shadowRoot?.querySelector('.network-canvas') as HTMLElement;
    if (!canvasElement) {
      console.error('Canvas element not found');
      return;
    }

    try {
      await this.graphController.initialize(canvasElement, this.data);
      this._setupEventListeners();
      this._updateMetrics();
    } catch (error) {
      console.error('Failed to initialize network:', error);
      this.errorMessage = 'Failed to initialize network visualization';
    }
  }

  private _updateMetrics() {
    this.metrics = this.graphController.calculateMetrics();
  }

  private _setupEventListeners() {
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy) return;

    cy.on('tap', 'node', (event: cytoscape.EventObject) => {
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
          cy.nodes().removeClass('edge-source');
        }
        return;
      }

      this.selectedNodes = [node.id()];
      this.selectedEdges = [];

      if (this.onNodeClick) {
        this.onNodeClick(nodeData, event);
      }

      dispatchCustomEvent(this, 'node-selected', {
        node: nodeData,
        cytoscapeEvent: event,
      });

      this._highlightNeighbors(node);
    });

    cy.on('tap', (event: cytoscape.EventObject) => {
      if (event.target === cy) {
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
          cy.nodes().removeClass('edge-source');
        }

        dispatchCustomEvent(this, 'canvas-clicked', {
          position: event.position,
        });
      }
    });

    cy.on('zoom', () => {
      dispatchCustomEvent(this, 'network-zoom', {
        zoomLevel: cy.zoom(),
      });
    });
  }

  private _cytoscapeNodeToNetworkNode(cyNode: cytoscape.NodeSingular): NetworkNode {
    return {
      id: cyNode.id(),
      label: cyNode.data('label'),
      data: cyNode.data(),
      position: cyNode.position(),
      classes: cyNode.classes().join(' '),
    };
  }

  private _highlightNeighbors(node: cytoscape.NodeSingular) {
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy) return;

    this._clearHighlights();

    const neighbors = node.neighborhood();
    neighbors.addClass('highlighted');
    node.addClass('highlighted');
  }

  private _clearHighlights() {
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy) return;
    cy.elements().removeClass('highlighted');
  }

  private _handleZoomIn() {
    this.graphController.zoomIn();
  }

  private _handleZoomOut() {
    this.graphController.zoomOut();
  }

  private _handleZoomFit() {
    this.graphController.fitToScreen();
  }

  private _handleDirectedChange(event: CustomEvent) {
    const {value} = event.detail;
    this.directed = value === 'true';

    this.graphController.applyTheme();
    this._updateMetrics();

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

    const cy = this.graphController.getCytoscapeInstance();
    if (cy) {
      cy.autoungrabify(this.isCreatingNode);
    }
  }

  private _toggleEdgeCreation() {
    this.isCreatingEdge = !this.isCreatingEdge;
    this._setExclusiveMode('isCreatingEdge');

    const cy = this.graphController.getCytoscapeInstance();
    if (cy) {
      cy.autoungrabify(this.isCreatingEdge);
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
    const cy = this.graphController.getCytoscapeInstance();
    if (cy) {
      cy.autoungrabify(true);
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
    const cy = this.graphController.getCytoscapeInstance();
    if (cy) {
      cy.autoungrabify(true);
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
    if (activeMode !== 'isCreatingNode') {
      this.isCreatingNode = false;
    }
    if (activeMode !== 'isCreatingEdge') {
      this.isCreatingEdge = false;
    }
    if (activeMode !== 'isRenaming') {
      this.isRenaming = false;
    }
    if (activeMode !== 'isRemoving') {
      this.isRemoving = false;
    }

    this.edgeCreationSource = null;

    if (activeMode !== 'isRenaming') {
      this._cancelRenaming();
    }

    if (activeMode !== 'isRemoving') {
      this._clearRemovalCandidate();
    }

    const cy = this.graphController.getCytoscapeInstance();
    if (
      cy &&
      activeMode !== 'isCreatingNode' &&
      activeMode !== 'isCreatingEdge'
    ) {
      cy.autoungrabify(false);
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

    const cy = this.graphController.getCytoscapeInstance();
    if (cy) {
      const element = cy.getElementById(elementId);
      element.addClass('removing-element');
    }

    setTimeout(() => {
      if (this.removalCandidate === elementId) {
        this._clearRemovalCandidate();
      }
    }, 3000);
  }

  private _clearRemovalCandidate() {
    const cy = this.graphController.getCytoscapeInstance();
    if (this.removalCandidate && cy) {
      const element = cy.getElementById(this.removalCandidate);
      element.removeClass('removing-element');
    }

    this.removalCandidate = null;
    this.removalCandidateType = null;
  }

  private _removeElement(elementId: string, elementType: 'node' | 'edge') {
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy) {
      return;
    }
    try {
      const element = cy.getElementById(elementId);
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

      this.graphController.calculateMetrics();

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

    const cy = this.graphController.getCytoscapeInstance();
    connectedEdges.forEach((edge) => {
      this._removeEdgeFromData(edge.id);
      if (cy) {
        const cyEdge = cy.getElementById(edge.id);
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

    const cy = this.graphController.getCytoscapeInstance();
    const element = cy!.getElementById(elementId);
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
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy) {
      return;
    }

    const element = cy.getElementById(elementId);
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
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy || !this.renamingElementId || !this.renamingElementType) {
      return;
    }

    const element = cy.getElementById(this.renamingElementId);
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

    const cy = this.graphController.getCytoscapeInstance();
    if (cy) {
      cy.add({
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
    if (cy) {
      cy.autoungrabify(false);
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

    const cy = this.graphController.getCytoscapeInstance();
    if (cy) {
      cy.add({
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
    if (cy) {
      cy.autoungrabify(false);
    }
  }

  getCanvasElement(): HTMLCanvasElement | null {
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy) {
      return null;
    }
    const container = cy.container();
    return container?.querySelector('canvas') || null;
  }

  getDataURL(format: 'png' | 'jpg' = 'png', quality = 1.0): string | null {
    return this.graphController.getDataURL(format, quality);
  }

  getExportData(): unknown {
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy) {
      return null;
    }
    return {
      title: this.title,
      subtitle: this.subtitle,
      network: cy.json(),
      theme: this.theme,
      metrics: this.metrics,
      timestamp: new Date().toISOString(),
    };
  }

  private async _handleExport(format: ExportOptions['format']) {
    const cy = this.graphController.getCytoscapeInstance();
    if (!cy) {
      return;
    }
    try {
      if (
        this.onExport &&
        (format === 'png' || format === 'svg' || format === 'json')
      ) {
        let exportData: string;
        switch (format) {
          case 'png':
            exportData = this.graphController.getDataURL('png') || '';
            break;
          case 'svg':
            exportData = JSON.stringify(cy.json());
            break;
          case 'json':
            exportData = JSON.stringify(cy.json());
            break;
          default:
            exportData = '';
        }
        this.onExport(format, exportData);
      } else {
        await exportComponent(this, {
          format,
          title: this.title || 'network',
          subtitle: this.subtitle,
          timestamp: true,
          backgroundColor: this.graphController.getBackgroundColor(),
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

  protected override getContainerClasses(additionalClasses?: string): string {
    return super.getContainerClasses(
      classNames(
        'network-wrapper',
        this.theme && `network-theme-${this.theme}`,
        additionalClasses
      )
    );
  }

  protected override renderToolbar() {
    return this._renderToolbar();
  }

  protected override renderContent() {
    return html`
      ${this.renderLoading()}
      ${this._renderNetwork()}
      ${this.tooltip.visible ? this._renderTooltip() : nothing}
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
        <div class="${canvasClasses}"></div>
        ${this.showInfo ? this._renderInfo() : nothing}
      </div>
    `;
  }

  private _getToolbarButtonDescriptors(): ToolbarSection {
    const networkTypeButtons: ToolbarButtonDescriptor[] = [
      {
        id: 'undirected',
        label: 'Undirected',
        variant: (!this.directed ? 'primary' : 'outline') as 'primary' | 'outline',
        title: 'Set network to undirected mode',
        handler: () => this._handleDirectedChange(
          new CustomEvent('change', {detail: {value: 'false'}})
        ),
      },
      {
        id: 'directed',
        label: 'Directed',
        variant: (this.directed ? 'primary' : 'outline') as 'primary' | 'outline',
        title: 'Set network to directed mode',
        handler: () => this._handleDirectedChange(
          new CustomEvent('change', {detail: {value: 'true'}})
        ),
      },
    ];

    const interactiveButtons: ToolbarButtonDescriptor[] = [
      {
        id: 'create-node',
        label: '+ Node',
        variant: (this.isCreatingNode ? 'primary' : 'outline') as 'primary' | 'outline',
        title: 'Add Node (Press 1 or click on canvas)',
        handler: () => this._toggleNodeCreation(),
        visible: this.enableNodeCreation,
      },
      {
        id: 'create-edge',
        label: '+ Edge',
        variant: (this.isCreatingEdge ? 'primary' : 'outline') as 'primary' | 'outline',
        title: 'Add Edge (Press 2 or click two nodes)',
        handler: () => this._toggleEdgeCreation(),
        visible: this.enableEdgeCreation,
      },
      {
        id: 'rename',
        label: 'Rename',
        variant: (this.isRenaming ? 'primary' : 'outline') as 'primary' | 'outline',
        title: 'Rename elements (click element)',
        handler: () => this._toggleRenaming(),
        visible: this.enableRenaming,
      },
      {
        id: 'remove',
        label: 'Remove',
        variant: (this.isRemoving ? 'danger' : 'outline') as 'danger' | 'outline',
        title: 'Remove elements (double-click element to confirm)',
        handler: () => this._toggleRemoval(),
        visible: this.enableRemoval,
      },
    ].filter(button => button.visible);

    const controlButtons: ToolbarButtonDescriptor[] = [
      {
        id: 'zoom-in',
        label: '+',
        icon: 'zoom-in',
        variant: 'outline' as const,
        title: 'Zoom In',
        handler: () => this._handleZoomIn(),
        visible: this.enableZoom,
      },
      {
        id: 'zoom-out',
        label: '−',
        icon: 'zoom-out', 
        variant: 'outline' as const,
        title: 'Zoom Out',
        handler: () => this._handleZoomOut(),
        visible: this.enableZoom,
      },
      {
        id: 'zoom-fit',
        label: '⌂',
        icon: 'fit-screen',
        variant: 'outline' as const,
        title: 'Fit to Screen',
        handler: () => this._handleZoomFit(),
        visible: this.enableZoom,
      },
    ].filter(button => button.visible);

    const exportOptions = [
      {value: 'png', label: 'PNG'},
      {value: 'jpg', label: 'JPG'},
      {value: 'pdf', label: 'PDF'},
      {value: 'json', label: 'JSON'},
    ];

    return {
      networkTypeButtons,
      interactiveButtons,
      controlButtons,
      exportOptions,
    };
  }

  private _renderButtonGroup(buttons: ToolbarButtonDescriptor[]) {
    return buttons.map(button => html`
      <scientific-button
        variant="${button.variant}"
        size="small"
        label="${button.label}"
        .theme="${this.theme}"
        @click="${button.handler}"
        title="${button.title}"
      ></scientific-button>
    `);
  }

  private _renderToolbar() {
    const buttonDescriptors = this._getToolbarButtonDescriptors();
    const hasInteractiveFeatures = buttonDescriptors.interactiveButtons.length > 0;
    const gridClass = hasInteractiveFeatures ? 'grid-4' : 'grid-3';

    return html`
      <div class="network-toolbar ${gridClass}">
        <div class="toolbar-section network-type-section">
          <div class="section-title">Network Type</div>
          <div class="button-group">
            ${this._renderButtonGroup(buttonDescriptors.networkTypeButtons)}
          </div>
        </div>

        ${hasInteractiveFeatures
          ? html`
              <div class="toolbar-section interactive-section">
                <div class="section-title">Interactive Mode</div>
                <div class="button-group">
                  ${this._renderButtonGroup(buttonDescriptors.interactiveButtons)}
                </div>
              </div>
            `
          : ''}

        <div class="toolbar-section controls-section">
          <div class="section-title">Controls</div>
          <div class="button-group">
            ${buttonDescriptors.controlButtons.length > 0
              ? html`
                  <div class="zoom-buttons">
                    ${this._renderButtonGroup(buttonDescriptors.controlButtons)}
                  </div>
                `
              : ''}
          </div>
        </div>

        <div class="toolbar-section export-section">
          <div class="section-title">Export</div>
          <div class="button-group">
            <scientific-dropdown
              .options="${buttonDescriptors.exportOptions}"
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
    const cy = this.graphController.getCytoscapeInstance();
    if (!this.metrics && !cy) {
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
