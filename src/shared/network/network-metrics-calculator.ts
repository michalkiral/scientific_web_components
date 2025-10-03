import {Core, NodeSingular, NodeCollection} from 'cytoscape';

export interface NetworkMetrics {
  nodeCount: number;
  edgeCount: number;
  density: number;
  averageDegree: number;
  degreeCentrality: Record<string, number>;
  betweennessCentrality: Record<string, number>;
  connectedComponents: number;
}

export class NetworkMetricsCalculator {
  static calculateMetrics(cy: Core, directed = false): NetworkMetrics {
    const nodes = cy.nodes();
    const edges = cy.edges();
    const nodeCount = nodes.length;
    const edgeCount = edges.length;

    const density = this.calculateDensity(nodeCount, edgeCount, directed);
    const averageDegree = this.calculateAverageDegree(nodeCount, edgeCount, directed);
    const degreeCentrality = this.calculateDegreeCentrality(nodes, nodeCount);
    const betweennessCentrality = this.calculateBetweennessCentrality(cy, nodes, directed);
    const connectedComponents = this.calculateConnectedComponents(cy);

    return {
      nodeCount,
      edgeCount,
      density,
      averageDegree,
      degreeCentrality,
      betweennessCentrality,
      connectedComponents,
    };
  }

  private static calculateDensity(nodeCount: number, edgeCount: number, directed: boolean): number {
    if (nodeCount <= 1) {
        return 0;
    }
    
    const maxEdges = directed
      ? nodeCount * (nodeCount - 1)
      : (nodeCount * (nodeCount - 1)) / 2;
    
    const density = maxEdges > 0 ? edgeCount / maxEdges : 0;
    return Math.round(density * 1000) / 1000;
  }

  private static calculateAverageDegree(nodeCount: number, edgeCount: number, directed: boolean): number {
    if (nodeCount === 0) {
        return 0;
    }
    
    const averageDegree = directed ? edgeCount : (2 * edgeCount);
    return Math.round((averageDegree / nodeCount) * 100) / 100;
  }

  private static calculateDegreeCentrality(nodes: NodeCollection, nodeCount: number): Record<string, number> {
    const degreeCentrality: Record<string, number> = {};
    
    nodes.forEach((node: NodeSingular) => {
      const degree = node.degree();
      const normalizedDegree = nodeCount > 1 ? degree / (nodeCount - 1) : 0;
      degreeCentrality[node.id()] = Math.round(normalizedDegree * 1000) / 1000;
    });

    return degreeCentrality;
  }

  private static calculateBetweennessCentrality(
    cy: Core, 
    nodes: NodeCollection, 
    directed: boolean
  ): Record<string, number> {
    const betweennessCentrality: Record<string, number> = {};
    
    try {
      const betweennessResult = cy.elements().betweennessCentrality({
        directed,
      });
      
      nodes.forEach((node: NodeSingular) => {
        const centrality = betweennessResult.betweenness(node);
        betweennessCentrality[node.id()] = Math.round(centrality * 1000) / 1000;
      });
    } catch (error) {
      console.warn('Betweenness centrality calculation failed:', error);
      nodes.forEach((node: NodeSingular) => {
        betweennessCentrality[node.id()] = 0;
      });
    }

    return betweennessCentrality;
  }

  private static calculateConnectedComponents(cy: Core): number {
    try {
      const components = cy.elements().components();
      return components.length;
    } catch (error) {
      console.warn('Connected components calculation failed:', error);
      return 1;
    }
  }

  static getNodeCentralityStats(
    cy: Core, 
    nodeId: string, 
    metrics?: NetworkMetrics
  ): {
    degree: number;
    degreeCentrality: number;
    betweennessCentrality: number;
  } {
    const node = cy.getElementById(nodeId);
    
    if (!node.length) {
      return {
        degree: 0,
        degreeCentrality: 0,
        betweennessCentrality: 0,
      };
    }

    const degree = node.degree();
    const degreeCentrality = metrics?.degreeCentrality[nodeId] ?? 0;
    const betweennessCentrality = metrics?.betweennessCentrality[nodeId] ?? 0;

    return {
      degree,
      degreeCentrality,
      betweennessCentrality,
    };
  }

  static getTopNodesByCentrality(
    metrics: NetworkMetrics,
    measure: 'degree' | 'betweenness',
    limit = 5
  ): Array<{nodeId: string; value: number}> {
    const centralityMap = measure === 'degree' 
      ? metrics.degreeCentrality 
      : metrics.betweennessCentrality;

    return Object.entries(centralityMap)
      .map(([nodeId, value]) => ({nodeId, value}))
      .sort((a, b) => b.value - a.value)
      .slice(0, limit);
  }
}