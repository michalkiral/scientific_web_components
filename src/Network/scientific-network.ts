import {html, nothing} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';
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
import {networkStyles} from '../shared/styles/network-styles.js';
import {classNames} from '../shared/utils/dom-utils.js';
import {dispatchCustomEvent} from '../shared/utils/event-utils.js';
import {
  exportComponent,
  type ExportableComponent,
  type ExportOptions,
} from '../shared/utils/export-utils.js';
import {
  type ToolbarSection,
  type ToolbarButtonDescriptor,
} from '../shared/components/ScientificToolbar/scientific-toolbar.js';
import {
  exportFormatOptions,
  networkTypeOptions,
  interactionModeButtons,
  controlButtons,
} from './scientific-network.stories.data.js';
import {NetworkEvents, getElementEventName} from '../shared/constants/events.js';
import {DEFAULT_NETWORK_SHORTCUTS} from '../shared/constants/shortcuts.js';
import '../Button/scientific-button.js';
import '../Dropdown/scientific-dropdown.js';
import '../shared/components/ScientificToolbar/scientific-toolbar.js';

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
    ...networkStyles,
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

  @query('.network-container') private networkContainer!: HTMLElement;

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
  @state() private removalTimeout: number | null = null;
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

  override connectedCallback() {
    super.connectedCallback();
    
    this.shortcutsController.registerShortcuts(DEFAULT_NETWORK_SHORTCUTS);
    
    this.addEventListener(NetworkEvents.SHORTCUT_CREATE_NODE, () => {
      if (this.enableNodeCreation) {
        this._activateNodeCreation();
      }
    });
    this.addEventListener(NetworkEvents.SHORTCUT_CREATE_EDGE, () => {
      if (this.enableEdgeCreation) {
        this._activateEdgeCreation();
      }
    });
    this.addEventListener(NetworkEvents.SHORTCUT_TOGGLE_RENAME, () => {
      if (this.enableRenaming) {
        this._toggleRenaming();
      }
    });
    this.addEventListener(NetworkEvents.SHORTCUT_TOGGLE_REMOVAL, () => {
      if (this.enableRemoval) {
        this._toggleRemoval();
      }
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    
    if (this.removalTimeout !== null) {
      clearTimeout(this.removalTimeout);
      this.removalTimeout = null;
    }
  }

  override async firstUpdated() {
    await this.updateComplete;
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
    if (!canvasElement || !this.networkContainer) {
      console.error('Canvas element or network container not found');
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

      const isMultiSelect = event.originalEvent?.ctrlKey || event.originalEvent?.metaKey;
      
      if (isMultiSelect) {
        const nodeId = node.id();
        if (this.selectedNodes.includes(nodeId)) {
          this.selectedNodes = this.selectedNodes.filter(id => id !== nodeId);
        } else {
          this.selectedNodes = [...this.selectedNodes, nodeId];
        }
      } else {
        this.selectedNodes = [node.id()];
        this.selectedEdges = [];
      }

      if (this.onNodeClick) {
        this.onNodeClick(nodeData, event);
      }

      dispatchCustomEvent(this, NetworkEvents.NODE_SELECTED, {
        node: nodeData,
        cytoscapeEvent: event,
      });

      this._highlightNeighbors(node);
    });

    cy.on('tap', 'edge', (event: cytoscape.EventObject) => {
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

      const isMultiSelect = event.originalEvent?.ctrlKey || event.originalEvent?.metaKey;
      
      if (isMultiSelect) {
        const edgeId = edge.id();
        if (this.selectedEdges.includes(edgeId)) {
          this.selectedEdges = this.selectedEdges.filter(id => id !== edgeId);
        } else {
          this.selectedEdges = [...this.selectedEdges, edgeId];
        }
      } else {
        this.selectedEdges = [edge.id()];
        this.selectedNodes = [];
      }

      if (this.onEdgeClick) {
        this.onEdgeClick(edgeData, event);
      }

      dispatchCustomEvent(this, NetworkEvents.EDGE_SELECTED, {
        edge: edgeData,
        cytoscapeEvent: event,
      });
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

        dispatchCustomEvent(this, NetworkEvents.CANVAS_CLICKED, {
          position: event.position,
        });
      }
    });

    cy.on('zoom', () => {
      dispatchCustomEvent(this, NetworkEvents.NETWORK_ZOOM, {
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

  private _cytoscapeEdgeToNetworkEdge(cyEdge: cytoscape.EdgeSingular): NetworkEdge {
    return {
      id: cyEdge.id(),
      source: cyEdge.source().id(),
      target: cyEdge.target().id(),
      label: cyEdge.data('label'),
      data: cyEdge.data(),
      classes: cyEdge.classes().join(' '),
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

    dispatchCustomEvent(this, NetworkEvents.NETWORK_DIRECTION_CHANGED, {
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

    if (this.removalTimeout !== null) {
      clearTimeout(this.removalTimeout);
    }

    this.removalTimeout = window.setTimeout(() => {
      if (this.removalCandidate === elementId) {
        this._clearRemovalCandidate();
      }
      this.removalTimeout = null;
    }, 3000);
  }

  private _clearRemovalCandidate() {
    const cy = this.graphController.getCytoscapeInstance();
    if (this.removalCandidate && cy) {
      const element = cy.getElementById(this.removalCandidate);
      element.removeClass('removing-element');
    }

    if (this.removalTimeout !== null) {
      clearTimeout(this.removalTimeout);
      this.removalTimeout = null;
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

      this._updateMetrics();

      dispatchCustomEvent(this, getElementEventName(elementType, 'removed'), {
        elementId,
        elementType,
      });

      dispatchCustomEvent(this, NetworkEvents.NETWORK_UPDATED, {
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

    const networkContainer = this.networkContainer;
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

    dispatchCustomEvent(this, getElementEventName(elementType, 'renamed'), {
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

    const networkContainer = this.networkContainer;
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

    dispatchCustomEvent(this, NetworkEvents.NODE_ADDED, {
      node: newNode,
    });

    this._updateMetrics();

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

    dispatchCustomEvent(this, NetworkEvents.EDGE_ADDED, {
      edge: newEdge,
    });

    this._updateMetrics();

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

      dispatchCustomEvent(this, NetworkEvents.NETWORK_EXPORT, {
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

  private _getToolbarSections(): ToolbarSection[] {
    const sections: ToolbarSection[] = [];

    sections.push({
      id: 'network-type',
      title: 'Network Type',
      className: 'network-type-section',
      buttons: [
        {
          ...networkTypeOptions.undirected,
          variant: (!this.directed ? 'primary' : 'outline') as 'primary' | 'outline',
          handler: () => this._handleDirectedChange(
            new CustomEvent('change', {detail: {value: networkTypeOptions.undirected.value}})
          ),
        },
        {
          ...networkTypeOptions.directed,
          variant: (this.directed ? 'primary' : 'outline') as 'primary' | 'outline',
          handler: () => this._handleDirectedChange(
            new CustomEvent('change', {detail: {value: networkTypeOptions.directed.value}})
          ),
        },
      ],
    });

    const interactiveButtons: ToolbarButtonDescriptor[] = [
      {
        ...interactionModeButtons.createNode,
        variant: (this.isCreatingNode ? 'primary' : 'outline') as 'primary' | 'outline',
        handler: () => this._toggleNodeCreation(),
        visible: this.enableNodeCreation,
      },
      {
        ...interactionModeButtons.createEdge,
        variant: (this.isCreatingEdge ? 'primary' : 'outline') as 'primary' | 'outline',
        handler: () => this._toggleEdgeCreation(),
        visible: this.enableEdgeCreation,
      },
      {
        ...interactionModeButtons.rename,
        variant: (this.isRenaming ? 'primary' : 'outline') as 'primary' | 'outline',
        handler: () => this._toggleRenaming(),
        visible: this.enableRenaming,
      },
      {
        ...interactionModeButtons.remove,
        variant: (this.isRemoving ? 'danger' : 'outline') as 'danger' | 'outline',
        handler: () => this._toggleRemoval(),
        visible: this.enableRemoval,
      },
    ].filter(button => button.visible);

    if (interactiveButtons.length > 0) {
      sections.push({
        id: 'interactive',
        title: 'Interactive Mode',
        className: 'interactive-section',
        buttons: interactiveButtons,
      });
    }

    const controlButtonsConfig: ToolbarButtonDescriptor[] = [
      {
        ...controlButtons.zoomIn,
        variant: 'outline' as const,
        handler: () => this._handleZoomIn(),
        visible: this.enableZoom,
      },
      {
        ...controlButtons.zoomOut,
        variant: 'outline' as const,
        handler: () => this._handleZoomOut(),
        visible: this.enableZoom,
      },
      {
        ...controlButtons.zoomFit,
        variant: 'outline' as const,
        handler: () => this._handleZoomFit(),
        visible: this.enableZoom,
      },
    ].filter(button => button.visible);

    if (controlButtonsConfig.length > 0) {
      sections.push({
        id: 'controls',
        title: 'Controls',
        className: 'controls-section',
        buttons: controlButtonsConfig,
      });
    }

    // Export Setion
    sections.push({
      id: 'export',
      title: 'Export',
      className: 'export-section',
      dropdowns: [
        {
          id: 'export-format',
          label: '',
          options: exportFormatOptions,
          placeholder: 'Select an export format',
          handler: (event: CustomEvent) => this._handleExportChange(event),
        },
      ],
    });

    return sections;
  }

  private _renderToolbar() {
    const sections = this._getToolbarSections();
    return html`
      <scientific-toolbar 
        .sections="${sections}"
        .theme="${this.theme}"
        layout="auto"
      ></scientific-toolbar>
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
