import {ReactiveController, ReactiveControllerHost} from 'lit';
import cytoscape, {
  Core,
  ElementDefinition,
  LayoutOptions,
  StylesheetStyle,
} from 'cytoscape';
import {NetworkData} from '../../Network/scientific-network.js';
import {NetworkMetricsCalculator, NetworkMetrics} from './network-metrics-calculator.js';
import {getThemeColors, ScientificThemeColors, DATA_VISUALIZATION_PALETTE, createColorVariants} from '../utils/theme-utils.js';

export interface NetworkGraphControllerHost extends ReactiveControllerHost {
  theme?: string;
  errorMessage?: string;
  directed: boolean;
  enableZoom: boolean;
  enablePan: boolean;
  enableSelection: boolean;
}

export class NetworkGraphController implements ReactiveController {
  private host: NetworkGraphControllerHost;
  private cy: Core | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private resizeTimeout: number | null = null;
  private currentMetrics: NetworkMetrics | null = null;

  constructor(host: NetworkGraphControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    this.setupResizeObserver();
  }

  hostDisconnected(): void {
    this.destroy();
  }

  async initialize(
    canvasElement: HTMLElement,
    data: NetworkData,
    options: {
      layout?: LayoutOptions;
      autoFit?: boolean;
    } = {}
  ): Promise<void> {
    if (this.cy) {
      return;
    }

    try {
      const canvasRect = canvasElement.getBoundingClientRect();
      if (!canvasRect || (canvasRect.width === 0 && canvasRect.height === 0)) {
        return new Promise(resolve => {
          setTimeout(() => {
            this.initialize(canvasElement, data, options).then(resolve);
          }, 250);
        });
      }

      const elements = this.convertDataToCytoscapeElements(data);
      const isLargeNetwork = elements.length > 1000;

      const cytoscapeOptions: Record<string, unknown> = {
        container: canvasElement,
        elements: isLargeNetwork ? [] : elements,
        style: this.getCytoscapeStyles(),
        zoomingEnabled: this.host.enableZoom,
        panningEnabled: this.host.enablePan,
        userZoomingEnabled: this.host.enableZoom,
        userPanningEnabled: this.host.enablePan,
        boxSelectionEnabled: this.host.enableSelection,
        selectionType: 'single',
        minZoom: 0.1,
        maxZoom: 3,
        hideEdgesOnViewport: isLargeNetwork,
        textureOnViewport: isLargeNetwork,
        pixelRatio: isLargeNetwork ? 1 : 'auto',
      };

      this.cy = cytoscape(cytoscapeOptions);

      await new Promise<void>(resolve => {
        this.cy!.ready(async () => {
          if (isLargeNetwork) {
            await this.addElementsInBatches(elements);
            
            await new Promise<void>(layoutResolve => {
              setTimeout(() => {
                const layoutOptions = options.layout || this.getDefaultLayoutOptions();
                const layout = this.cy!.layout(layoutOptions);
                
                layout.run();
                
                layout.one('layoutstop', () => {
                  if (options.autoFit !== false) {
                    this.cy!.fit();
                  }
                  this.calculateMetrics();
                  layoutResolve();
                });
              }, 10);
            });
          } else {
            const layoutOptions = options.layout || this.getDefaultLayoutOptions();
            this.cy!.layout(layoutOptions).run();
            
            if (options.autoFit !== false) {
              this.cy!.fit();
            }
            
            this.calculateMetrics();
          }
          
          resolve();
        });
      });

    } catch (error) {
      console.error('Failed to initialize Cytoscape:', error);
      this.host.errorMessage = 'Failed to initialize network visualization';
      throw error;
    }
  }

  private async addElementsInBatches(elements: ElementDefinition[]): Promise<void> {
    if (!this.cy) {
      return;
    }

    const nodes = elements.filter(el => !('source' in el.data));
    const edges = elements.filter(el => 'source' in el.data);
    
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const spacing = 100;
    
    nodes.forEach((node, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      node.position = {
        x: col * spacing,
        y: row * spacing
      };
    });

    const batchSize = 500;
    const allElements = [...nodes, ...edges];
    const totalBatches = Math.ceil(allElements.length / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const start = i * batchSize;
      const end = Math.min(start + batchSize, allElements.length);
      const batch = allElements.slice(start, end);

      this.cy.add(batch);

      if (i < totalBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
  }

  destroy(): void {
    if (this.cy) {
      this.cy.destroy();
      this.cy = null;
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }

  getCytoscapeInstance(): Core | null {
    return this.cy;
  }

  loadData(data: NetworkData): void {
    if (!this.cy) {
      return;
    }

    try {
      const elements = this.convertDataToCytoscapeElements(data);
      this.cy.elements().remove();
      this.cy.add(elements);
      this.applyLayout();
      this.calculateMetrics();
    } catch (error) {
      console.warn('Failed to load data:', error);
    }
  }

  applyLayout(layoutOptions?: LayoutOptions): void {
    if (!this.cy) {
      return;
    }

    try {
      const options = layoutOptions || this.getDefaultLayoutOptions();
      this.cy.layout(options).run();
    } catch (error) {
      console.warn('Failed to apply layout:', error);
    }
  }

  applyTheme(): void {
    if (!this.cy) {
      return;
    }
    
    try {
      this.cy.style(this.getCytoscapeStyles());
    } catch (error) {
      console.warn('Failed to apply theme:', error);
    }
  }

  calculateMetrics(): NetworkMetrics | null {
    if (!this.cy) {
      return null;
    }

    this.currentMetrics = NetworkMetricsCalculator.calculateMetrics(
      this.cy,
      this.host.directed
    );
    
    return this.currentMetrics;
  }

  getMetrics(): NetworkMetrics | null {
    return this.currentMetrics;
  }

  zoomIn(): void {
    if (this.cy && this.host.enableZoom) {
      this.cy.zoom(this.cy.zoom() * 1.2);
    }
  }

  zoomOut(): void {
    if (this.cy && this.host.enableZoom) {
      this.cy.zoom(this.cy.zoom() / 1.2);
    }
  }

  fitToScreen(): void {
    if (this.cy) {
      this.cy.fit();
    }
  }

  getCurrentZoom(): number {
    return this.cy ? Math.round(this.cy.zoom() * 100) : 100;
  }

  getDataURL(format: 'png' | 'jpg' = 'png', quality = 1.0): string | null {
    if (!this.cy) {
      return null;
    }

    try {
      const colors = this.getBasicColors();
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

  getBackgroundColor(): string {
    return this.getBasicColors().bgColor;
  }

  getNodeColor(index: number): string {
    return DATA_VISUALIZATION_PALETTE[index % DATA_VISUALIZATION_PALETTE.length];
  }

  createColorVariants(baseColor: string) {
    return createColorVariants(baseColor);
  }

  assignNodeColors(colorAttribute?: string): void {
    if (!this.cy) return;

    this.cy.nodes().forEach((node, index) => {
      let colorIndex = index;
      
      if (colorAttribute) {
        const attributeValue = node.data(colorAttribute);
        if (attributeValue !== undefined) {
          const str = String(attributeValue);
          colorIndex = (str.length + str.charCodeAt(0) + (str.charCodeAt(str.length - 1) || 0)) % DATA_VISUALIZATION_PALETTE.length;
        }
      }
      
      const color = this.getNodeColor(colorIndex);
      const variants = this.createColorVariants(color);
      
      node.style({
        'background-color': color,
        'border-color': variants.hover,
      });
    });
  }

  addElement(element: ElementDefinition): void {
    if (!this.cy) {
      return;
    }
    
    this.cy.add(element);
    this.calculateMetrics();
  }

  removeElement(elementId: string): void {
    if (!this.cy) {
      return;
    }
    
    const element = this.cy.getElementById(elementId);
    if (element.length > 0) {
      element.remove();
      this.calculateMetrics();
    }
  }

  private convertDataToCytoscapeElements(data: NetworkData): ElementDefinition[] {
    const elements: ElementDefinition[] = [];

    data.nodes.forEach((node) => {
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

    data.edges.forEach((edge) => {
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

  private getBasicColors(): ScientificThemeColors {
    const hostElement = this.host as unknown as Element;
    return getThemeColors(hostElement);
  }

  private getCytoscapeStyles(): StylesheetStyle[] {
    const colors = this.getBasicColors();
    const nodeCount = this.cy?.nodes().length || 0;
    const isVeryLarge = nodeCount > 1000;

    return [
      {
        selector: 'node',
        style: {
          'background-color': colors.nodeColor,
          'border-color': colors.borderColor,
          'border-width': 2,
          label: isVeryLarge ? '' : 'data(label)',
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
          'target-arrow-shape': this.host.directed ? 'triangle' : 'none',
          'curve-style': isVeryLarge ? 'straight' : 'bezier',
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
    ];
  }

  private getDefaultLayoutOptions(): LayoutOptions {
    const nodeCount = this.cy?.nodes().length || 0;
    
    if (nodeCount > 1000) {
      return {
        name: 'preset',
        animate: false,
        fit: true,
      } as LayoutOptions;
    } else if (nodeCount > 200) {
      return {
        name: 'grid',
        animate: false,
        fit: true,
        avoidOverlap: true,
        condense: true,
      } as LayoutOptions;
    } else {
      return {
        name: 'cose',
        animate: false,
        fit: true,
        numIter: 1000,
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        randomize: false,
      } as LayoutOptions;
    }
  }

  private setupResizeObserver(): void {
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
}